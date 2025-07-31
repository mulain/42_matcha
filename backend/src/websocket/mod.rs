use axum::response::Json;
use serde_json::{json, Value};

pub async fn handle_websocket() -> Json<Value> {
    Json(json!({
        "message": "WebSocket endpoint - to be implemented",
        "status": "not_implemented"
    }))
}
