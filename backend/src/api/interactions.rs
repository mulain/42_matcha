use axum::response::Json;
use serde_json::{json, Value};

pub async fn like_user() -> Json<Value> {
    Json(json!({
        "message": "Like user endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn unlike_user() -> Json<Value> {
    Json(json!({
        "message": "Unlike user endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn block_user() -> Json<Value> {
    Json(json!({
        "message": "Block user endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn report_user() -> Json<Value> {
    Json(json!({
        "message": "Report user endpoint - to be implemented",
        "status": "not_implemented"
    }))
} 