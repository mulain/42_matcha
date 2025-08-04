use axum::{
    routing::{get, post},
    Router,
};

use crate::api::chat;
use crate::middleware::auth::require_auth;
use crate::AppState;

pub fn create_router(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/conversations", get(chat::get_conversations))
        .route("/conversations/:user_id/messages", get(chat::get_messages))
        .route("/conversations/:user_id/messages", post(chat::send_message))
        .layer(axum::middleware::from_fn_with_state(state, require_auth))
}
