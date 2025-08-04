use axum::{
    routing::{delete, get, post, put},
    Router,
};

use crate::api::users;
use crate::middleware::auth::require_auth;
use crate::AppState;

pub fn create_router(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/profile", get(users::get_profile))
        .route("/profile", put(users::update_profile))
        .route("/profile/pictures", post(users::upload_pictures))
        .route("/profile/pictures/:id", delete(users::delete_picture))
        .route("/browse", get(users::browse_users))
        .route("/search", get(users::search_users))
        .route("/:id", get(users::get_user_profile))
        .route("/:id/visit", post(users::record_visit))
        .layer(axum::middleware::from_fn_with_state(state, require_auth))
}
