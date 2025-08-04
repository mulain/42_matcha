use axum::{routing::post, Router};

use crate::api::auth;
use crate::AppState;

pub fn create_router() -> Router<AppState> {
    Router::new()
        .route("/register", post(auth::register))
        .route("/login", post(auth::login))
        .route("/logout", post(auth::logout))
        .route("/verify-email", post(auth::verify_email))
        .route("/reset-password", post(auth::reset_password))
}
