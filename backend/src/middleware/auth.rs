use axum::{
    extract::{Request, State},
    http::StatusCode,
    middleware::Next,
    response::Response,
};
use axum_extra::extract::cookie::CookieJar;
use sqlx::PgPool;

use crate::database::user_repository::UserRepository;
use crate::models::User;

#[derive(Clone)]
pub struct AuthUser {
    pub user: User,
}

pub async fn auth_middleware(
    State(pool): State<PgPool>,
    jar: CookieJar,
    request: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    // Extract auth token from cookie
    let auth_token = jar
        .get("auth_token")
        .map(|cookie| cookie.value().to_string());

    if let Some(token) = auth_token {
        // For now, we'll use a simple approach where the token is the user ID
        // In a real implementation, you'd want to store tokens in a separate table
        // and validate them properly
        
        // Try to parse the token as a UUID (user ID)
        if let Ok(user_id) = uuid::Uuid::parse_str(&token) {
            let user_repo = UserRepository::new(pool);
            
            if let Ok(Some(user)) = user_repo.find_by_id(user_id).await {
                if user.is_active() {
                    // Add user to request extensions
                    let mut request = request;
                    request.extensions_mut().insert(AuthUser { user });
                    return Ok(next.run(request).await);
                }
            }
        }
    }

    // If no valid auth token, continue without user
    Ok(next.run(request).await)
}

pub async fn require_auth(
    State(pool): State<PgPool>,
    jar: CookieJar,
    request: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    // Extract auth token from cookie
    let auth_token = jar
        .get("auth_token")
        .map(|cookie| cookie.value().to_string());

    if let Some(token) = auth_token {
        // Try to parse the token as a UUID (user ID)
        if let Ok(user_id) = uuid::Uuid::parse_str(&token) {
            let user_repo = UserRepository::new(pool);
            
            if let Ok(Some(user)) = user_repo.find_by_id(user_id).await {
                if user.is_active() {
                    // Add user to request extensions
                    let mut request = request;
                    request.extensions_mut().insert(AuthUser { user });
                    return Ok(next.run(request).await);
                }
            }
        }
    }

    // If no valid auth token, return unauthorized
    Err(StatusCode::UNAUTHORIZED)
} 