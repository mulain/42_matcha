use axum::{extract::DefaultBodyLimit, http::{Method, HeaderValue, HeaderName}, response::Json, routing::get, Router};
use serde_json::{json, Value};
use sqlx::PgPool;
use std::net::SocketAddr;
use tower::ServiceBuilder;
use tower_http::{
    cors::{Any, CorsLayer},
    trace::TraceLayer,
};
use tracing::{info, Level};
use tracing_subscriber::FmtSubscriber;

// Module declarations
mod api;
mod config;
mod database;
mod enums;
mod middleware;
mod models;
mod routes;
mod services;
mod utils;
mod validation;
mod websocket;

#[derive(Clone)]
pub struct AppState {
    pub db: PgPool,
    pub jwt_service: services::jwt::JwtService,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let config = config::Config::load()?;

    let max_level = match config.environment {
        enums::Environment::Development => Level::DEBUG,
        enums::Environment::Production => Level::INFO,
        enums::Environment::Test => Level::ERROR,
    };

    FmtSubscriber::builder()
        .with_max_level(max_level)
        .with_target(false)
        .with_thread_ids(true)
        .with_thread_names(true)
        .with_file(true)
        .with_line_number(true)
        .init();

    info!("Starting Matcha Backend Server...");

    let database_pool = database::create_pool(&config.database_url).await?;
    let jwt_service = services::jwt::JwtService::new(&config.jwt_secret);
    let app_state = AppState {
        db: database_pool,
        jwt_service,
    };

    let cors = CorsLayer::new()
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
            Method::OPTIONS,
        ])
        .allow_headers([
            "content-type".parse::<HeaderName>().unwrap(),
            "authorization".parse::<HeaderName>().unwrap(),
            "accept".parse::<HeaderName>().unwrap(),
            "origin".parse::<HeaderName>().unwrap(),
            "x-requested-with".parse::<HeaderName>().unwrap(),
        ])
        .allow_origin(config.frontend_url.parse::<HeaderValue>().unwrap())
        .allow_credentials(true);

    let app = Router::new()
        // Health check
        .route("/health", get(health_check))
        // API routes
        .nest("/api", routes::create_router(app_state.clone()))
        // WebSocket routes
        .nest("/ws", routes::websocket::create_router(app_state.clone()))
        // Middleware layers
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
                .layer(cors)
                .layer(DefaultBodyLimit::max(10 * 1024 * 1024)), // 10MB limit
        )
        .with_state(app_state);

    let addr = SocketAddr::from(([127, 0, 0, 1], config.port));
    info!("Server listening on {}", addr);

    axum::serve(tokio::net::TcpListener::bind(addr).await?, app.into_make_service()).await?;

    Ok(())
}

async fn health_check() -> Json<Value> {
    Json(json!({
        "status": "healthy",
        "service": "matcha-backend",
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}
