pub mod auth;
pub mod chat;
pub mod interactions;
pub mod notifications;
pub mod users;
pub mod websocket;

use crate::AppState;
use axum::Router;

pub fn create_router(state: AppState) -> Router<AppState> {
    Router::new()
        // Public routes (no authentication required)
        .nest("/auth", auth::create_router())
        // Protected routes (require authentication)
        .nest("/users", users::create_router(state.clone()))
        .nest("/interactions", interactions::create_router(state.clone()))
        .nest("/chat", chat::create_router(state.clone()))
        .nest("/notifications", notifications::create_router(state.clone()))
}
