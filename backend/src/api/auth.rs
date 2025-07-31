use axum::response::Json;
use serde_json::{json, Value};

pub async fn register() -> Json<Value> {
    Json(json!({
        "message": "Register endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn login() -> Json<Value> {
    Json(json!({
        "message": "Login endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn logout() -> Json<Value> {
    Json(json!({
        "message": "Logout endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn verify_email() -> Json<Value> {
    Json(json!({
        "message": "Verify email endpoint - to be implemented",
        "status": "not_implemented"
    }))
}

pub async fn reset_password() -> Json<Value> {
    Json(json!({
        "message": "Reset password endpoint - to be implemented",
        "status": "not_implemented"
    }))
}
