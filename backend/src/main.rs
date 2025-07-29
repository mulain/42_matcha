use axum::{
    extract::DefaultBodyLimit,
    http::{Method, StatusCode},
    response::Json,
    routing::{get, post, put, delete},
    Router,
};
use serde_json::{json, Value};
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
mod models;
mod services;
mod utils;
mod websocket;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let config = config::Config::load().expect("Failed to load configuration");
    
    let max_level = match config.environment {
        config::Environment::Development => Level::DEBUG,
        config::Environment::Production => Level::INFO,
        config::Environment::Test => Level::ERROR, 
    };

    let subscriber = FmtSubscriber::builder()
        .with_max_level(max_level)
        .with_target(false)
        .with_thread_ids(true)
        .with_thread_names(true)
        .with_file(true)
        .with_line_number(true)
        .init();

    info!("Starting Matcha Backend Server...");

    let database_pool = database::create_pool(&config.database_url).await?;

    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST, Method::PUT, Method::DELETE, Method::OPTIONS])
        .allow_headers(Any)
        .allow_origin(Any);

    let app = Router::new()
        // Health check
        .route("/health", get(health_check))
        
        // Authentication routes
        .route("/api/auth/register", post(api::auth::register))
        .route("/api/auth/login", post(api::auth::login))
        .route("/api/auth/logout", post(api::auth::logout))
        .route("/api/auth/verify-email", post(api::auth::verify_email))
        .route("/api/auth/reset-password", post(api::auth::reset_password))
        
        // User profile routes
        .route("/api/users/profile", get(api::users::get_profile))
        .route("/api/users/profile", put(api::users::update_profile))
        .route("/api/users/profile/pictures", post(api::users::upload_pictures))
        .route("/api/users/profile/pictures/:id", delete(api::users::delete_picture))
        
        // User browsing and search routes
        .route("/api/users/browse", get(api::users::browse_users))
        .route("/api/users/search", get(api::users::search_users))
        .route("/api/users/:id", get(api::users::get_user_profile))
        .route("/api/users/:id/visit", post(api::users::record_visit))
        
        // User interactions
        .route("/api/users/:id/like", post(api::interactions::like_user))
        .route("/api/users/:id/unlike", post(api::interactions::unlike_user))
        .route("/api/users/:id/block", post(api::interactions::block_user))
        .route("/api/users/:id/report", post(api::interactions::report_user))
        
        // Chat routes
        .route("/api/chat/conversations", get(api::chat::get_conversations))
        .route("/api/chat/conversations/:user_id/messages", get(api::chat::get_messages))
        .route("/api/chat/conversations/:user_id/messages", post(api::chat::send_message))
        
        // Notification routes
        .route("/api/notifications", get(api::notifications::get_notifications))
        .route("/api/notifications/read", post(api::notifications::mark_as_read))
        .route("/api/notifications/read/:id", post(api::notifications::mark_single_as_read))
        
        // WebSocket
        .route("/ws", get(websocket::handle_websocket))
        
        // Database state
        .with_state(database_pool)
        
        // Middleware layers
        .layer(
            ServiceBuilder::new()
                .layer(TraceLayer::new_for_http())
                .layer(cors)
                .layer(DefaultBodyLimit::max(10 * 1024 * 1024)), // 10MB limit
        );

    let addr = SocketAddr::from(([127, 0, 0, 1], config.port));
    info!("Server listening on {}", addr);

    axum::serve(
        tokio::net::TcpListener::bind(addr).await?,
        app.into_make_service()
    )
    .await?;

    Ok(())
}

async fn health_check() -> Json<Value> {
    Json(json!({
        "status": "healthy",
        "service": "matcha-backend",
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
} 