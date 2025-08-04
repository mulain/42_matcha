use axum::{routing::get, Router};

use crate::{middleware::auth::require_auth, websocket};
use crate::AppState;

pub fn create_router(state: AppState) -> Router<AppState> {
    Router::new().route("/", get(websocket::handle_websocket))
    .layer(axum::middleware::from_fn_with_state(state, require_auth))
}
