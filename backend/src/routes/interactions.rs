use axum::{routing::post, Router};

use crate::api::interactions;
use crate::middleware::auth::require_auth;
use crate::AppState;

pub fn create_router(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/:id/like", post(interactions::like_user))
        .route("/:id/unlike", post(interactions::unlike_user))
        .route("/:id/block", post(interactions::block_user))
        .route("/:id/report", post(interactions::report_user))
        .layer(axum::middleware::from_fn_with_state(state, require_auth))
}
