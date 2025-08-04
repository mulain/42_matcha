use axum::{routing::post, Router};

use crate::api::notifications;
use crate::middleware::auth::require_auth;
use crate::AppState;

pub fn create_router(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/read", post(notifications::mark_as_read))
        .route("/read/:id", post(notifications::mark_single_as_read))
        .layer(axum::middleware::from_fn_with_state(state, require_auth))
}
