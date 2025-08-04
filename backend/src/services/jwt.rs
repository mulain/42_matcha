use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, Algorithm, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub sub: String, // user_id
    pub exp: i64,    // expiration
    pub iat: i64,    // issued at
}

#[derive(Clone)]
pub struct JwtService {
    encoding_key: EncodingKey,
    decoding_key: DecodingKey,
}

impl JwtService {
    pub fn new(secret: &str) -> Self {
        Self {
            encoding_key: EncodingKey::from_secret(secret.as_ref()),
            decoding_key: DecodingKey::from_secret(secret.as_ref()),
        }
    }

    pub fn generate_token(&self, user_id: Uuid) -> Result<String, jsonwebtoken::errors::Error> {
        let now = Utc::now();
        let expires_at = now + Duration::days(30);

        let claims = Claims {
            sub: user_id.to_string(),
            exp: expires_at.timestamp(),
            iat: now.timestamp(),
        };

        encode(&Header::default(), &claims, &self.encoding_key)
    }

    pub fn verify_token(&self, token: &str) -> Result<Claims, jsonwebtoken::errors::Error> {
        let token_data = decode::<Claims>(token, &self.decoding_key, &Validation::default())?;

        Ok(token_data.claims)
    }

    pub fn extract_user_id(&self, token: &str) -> Result<Uuid, jsonwebtoken::errors::Error> {
        let claims = self.verify_token(token)?;
        Uuid::parse_str(&claims.sub).map_err(|_| {
            jsonwebtoken::errors::Error::from(jsonwebtoken::errors::ErrorKind::InvalidToken)
        })
    }
}
