use axum::response::Json;
use serde_json::{json, Value};

pub async fn get_conversations() -> Json<Value> {
    Json(json!({
        "message": "Get conversations endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn get_messages() -> Json<Value> {
    Json(json!({
        "message": "Get messages endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn send_message() -> Json<Value> {
    Json(json!({
        "message": "Send message endpoint - to be implemented",
        "status": "not_implemented"
    }))
} 