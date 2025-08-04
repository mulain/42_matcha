use axum::{
    extract::{Request, State},
    http::StatusCode,
    middleware::Next,
    response::Response,
};
use axum_extra::extract::cookie::CookieJar;

use crate::database::user_repository::UserRepository;
use crate::models::User;
use crate::AppState;

#[derive(Clone)]
pub struct AuthUser {
    pub user: User,
}

pub async fn auth_middleware(
    State(state): State<AppState>,
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
            let user_repo = UserRepository::new(state.db);

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
    State(state): State<AppState>,
    request: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    // Extract auth token from cookie
    let auth_token = request.headers().get("cookie").and_then(|cookie_header| {
        cookie_header.to_str().ok().and_then(|cookies| {
            cookies
                .split(';')
                .find(|cookie| cookie.trim().starts_with("auth_token="))
                .map(|cookie| cookie.trim().replace("auth_token=", ""))
        })
    });

    if let Some(token) = auth_token {
        // Verify JWT token and extract user ID
        match state.jwt_service.extract_user_id(&token) {
            Ok(user_id) => {
                // Quick database check to ensure user is still active
                let user_repo = UserRepository::new(state.db);

                if let Ok(Some(user)) = user_repo.find_by_id(user_id).await {
                    if user.is_active() {
                        // Add user to request extensions
                        let mut request = request;
                        request.extensions_mut().insert(AuthUser { user });
                        return Ok(next.run(request).await);
                    }
                }
            }
            Err(_) => {
                // Invalid JWT token
                return Err(StatusCode::UNAUTHORIZED);
            }
        }
    }

    // If no valid auth token, return unauthorized
    Err(StatusCode::UNAUTHORIZED)
}


