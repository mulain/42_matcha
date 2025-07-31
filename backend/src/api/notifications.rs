use axum::response::Json;
use serde_json::{json, Value};

pub async fn get_notifications() -> Json<Value> {
    Json(json!({
        "message": "Get notifications endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn mark_as_read() -> Json<Value> {
    Json(json!({
        "message": "Mark as read endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn mark_single_as_read() -> Json<Value> {
    Json(json!({
        "message": "Mark single as read endpoint - to be implemented",
        "status": "not_implemented"
    }))
}
