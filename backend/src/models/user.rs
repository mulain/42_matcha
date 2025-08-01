use crate::enums::AccountStatus;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub username: String,
    pub password_hash: String,
    pub email_verified_at: Option<DateTime<Utc>>,
    pub account_status: AccountStatus,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub deleted_at: Option<DateTime<Utc>>,
}

impl User {
    pub fn from_row(
        id: Uuid,
        email: String,
        username: String,
        password_hash: String,
        email_verified_at: Option<DateTime<Utc>>,
        account_status: Option<String>,
        created_at: DateTime<Utc>,
        updated_at: DateTime<Utc>,
        deleted_at: Option<DateTime<Utc>>,
    ) -> Result<Self, anyhow::Error> {
        let account_status = account_status
            .ok_or_else(|| anyhow::anyhow!("Account status is required"))?;
        let account_status = account_status
            .parse::<AccountStatus>()
            .map_err(|_| anyhow::anyhow!("Invalid account status: {}", account_status))?;

        Ok(User {
            id,
            email,
            username,
            password_hash,
            email_verified_at,
            account_status,
            created_at,
            updated_at,
            deleted_at,
        })
    }

    pub fn is_active(&self) -> bool {
        self.account_status == AccountStatus::Active && self.deleted_at.is_none()
    }

    pub fn is_email_verified(&self) -> bool {
        self.email_verified_at.is_some()
    }
}

 