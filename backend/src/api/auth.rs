use argon2::{password_hash::SaltString, Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use axum::{
    extract::State,
    http::{Response, StatusCode},
    response::{IntoResponse, Json},
    Form,
};
use axum_extra::extract::cookie::{Cookie, CookieJar};
use chrono::{Duration, Utc};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::PgPool;
use std::time;
use uuid::Uuid;

use crate::database::user_repository::UserRepository;
use crate::models::User;

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub email: String,
    pub username: String,
    pub password: String,
    pub first_name: String,
    pub last_name: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponse {
    pub user: User,
    pub message: String,
}

#[derive(Debug, Deserialize)]
pub struct EmailVerificationRequest {
    pub token: String,
}

pub async fn register(
    State(state): State<crate::AppState>,
    jar: CookieJar,
    Form(data): Form<RegisterRequest>,
) -> impl IntoResponse {
    let user_repo = UserRepository::new(state.db);

    // Validate input
    if data.email.is_empty() || data.username.is_empty() || data.password.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({
                "error": "Email, username, and password are required"
            })),
        )
            .into_response();
    }

    // Check if user already exists
    if let Ok(Some(_)) = user_repo.find_by_email(&data.email).await {
        return (
            StatusCode::CONFLICT,
            Json(json!({
                "error": "User with this email already exists"
            })),
        )
            .into_response();
    }

    if let Ok(Some(_)) = user_repo.find_by_username(&data.username).await {
        return (
            StatusCode::CONFLICT,
            Json(json!({
                "error": "Username already taken"
            })),
        )
            .into_response();
    }

    // Hash password with Argon2
    let salt = SaltString::generate(&mut rand::thread_rng());
    let password_hash = match Argon2::default().hash_password(data.password.as_bytes(), &salt) {
        Ok(hash) => hash.to_string(),
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "error": "Failed to hash password"
                })),
            )
                .into_response();
        }
    };

    // Create user
    let user = match user_repo
        .create_user(&data.email, &data.username, &password_hash)
        .await
    {
        Ok(user) => user,
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "error": "Failed to create user"
                })),
            )
                .into_response();
        }
    };

    // Generate JWT token
    let auth_token = match state.jwt_service.generate_token(user.id) {
        Ok(token) => token,
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "error": "Failed to generate authentication token"
                })),
            )
                .into_response();
        }
    };

    // Create secure cookie
    let mut cookie = Cookie::new("auth_token", auth_token);
    cookie.set_http_only(true);
    cookie.set_secure(false); // Set to true in production with HTTPS
    cookie.set_same_site(axum_extra::extract::cookie::SameSite::Strict);
    cookie.set_path("/");
    // cookie.set_max_age(chrono::Duration::days(30));

    let jar = jar.add(cookie);

    (
        StatusCode::CREATED,
        jar,
        Json(json!({
            "message": "User registered successfully. Please check your email for verification.",
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "email_verified": user.is_email_verified()
            }
        })),
    )
        .into_response()
}

pub async fn login(
    State(state): State<crate::AppState>,
    jar: CookieJar,
    Form(data): Form<LoginRequest>,
) -> impl IntoResponse {
    let user_repo = UserRepository::new(state.db);

    // Find user by email
    let user = match user_repo.find_by_email(&data.email).await {
        Ok(Some(user)) => user,
        Ok(None) => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({
                    "error": "Invalid username or password"
                })),
            )
                .into_response();
        }
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "error": "Database error"
                })),
            )
                .into_response();
        }
    };

    // Verify password with Argon2
    let parsed_hash = match PasswordHash::new(&user.password_hash) {
        Ok(hash) => hash,
        Err(_) => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({
                    "error": "Invalid username or password"
                })),
            )
                .into_response();
        }
    };

    if !Argon2::default()
        .verify_password(data.password.as_bytes(), &parsed_hash)
        .is_ok()
    {
        return (
            StatusCode::UNAUTHORIZED,
            Json(json!({
                "error": "Invalid username or password"
            })),
        )
            .into_response();
    }

    // Check if user is active
    if !user.is_active() {
        return (
            StatusCode::FORBIDDEN,
            Json(json!({
                "error": "Account is not active"
            })),
        )
            .into_response();
    }

    // Generate JWT token
    let auth_token = match state.jwt_service.generate_token(user.id) {
        Ok(token) => token,
        Err(_) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({
                    "error": "Failed to generate authentication token"
                })),
            )
                .into_response();
        }
    };

    // Create secure cookie
    let mut cookie = Cookie::new("auth_token", auth_token);
    cookie.set_http_only(true);
    cookie.set_secure(false); // Set to true in production with HTTPS
    cookie.set_same_site(axum_extra::extract::cookie::SameSite::Strict);
    cookie.set_path("/");
    // cookie.set_max_age(time::Duration::from_secs(30 * 24 * 60 * 60).into()); // 30 days

    let jar = jar.add(cookie);

    (
        StatusCode::OK,
        jar,
        Json(json!({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "email_verified": user.is_email_verified()
            }
        })),
    )
        .into_response()
}

pub async fn logout(jar: CookieJar) -> impl IntoResponse {
    // Remove auth cookie
    let mut cookie = Cookie::new("auth_token", "");
    cookie.set_http_only(true);
    cookie.set_secure(false);
    cookie.set_same_site(axum_extra::extract::cookie::SameSite::Strict);
    cookie.set_path("/");
    // cookie.set_max_age(chrono::Duration::seconds(0)); // Expire immediately

    let jar = jar.add(cookie);

    (
        StatusCode::OK,
        jar,
        Json(json!({
            "message": "Logout successful"
        })),
    )
        .into_response()
}

pub async fn verify_email(
    State(state): State<crate::AppState>,
    Form(data): Form<EmailVerificationRequest>,
) -> impl IntoResponse {
    let user_repo = UserRepository::new(state.db);

    // For now, we'll implement a simple token verification
    // In a real implementation, you'd store verification tokens in the database
    // and verify them properly

    // This is a placeholder implementation
    // You should implement proper email verification token storage and validation

    (
        StatusCode::OK,
        Json(json!({
            "message": "Email verification endpoint - token validation to be implemented"
        })),
    )
        .into_response()
}

pub async fn reset_password() -> Json<Value> {
    Json(json!({
        "message": "Reset password endpoint - to be implemented",
        "status": "not_implemented"
    }))
}
