pub mod auth;
pub mod chat;
pub mod interactions;
pub mod notifications;
pub mod users;
pub mod websocket;

use crate::AppState;
use axum::{response::Json, Router};
use serde_json::{json, Value};

pub fn create_router(state: AppState) -> Router<AppState> {
    Router::new()
        .nest("/auth", auth::create_router())
        .nest("/users", users::create_router(state.clone()))
        .nest("/interactions", interactions::create_router(state.clone()))
        .nest("/chat", chat::create_router(state.clone()))
        .nest("/notifications", notifications::create_router(state.clone()))
}

pub async fn health_check() -> Json<Value> {
    Json(json!({
        "status": "healthy",
        "service": "matcha-backend",
        "shmisms": "shmanged",
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}
