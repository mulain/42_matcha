use crate::enums::AccountStatus;
use crate::models::User;
use anyhow::Result;
use sqlx::{PgPool, Row};
use uuid::Uuid;

#[derive(Debug)]
pub struct UserRepository {
    pool: PgPool,
}

impl UserRepository {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }

    pub async fn create_user(
        &self,
        email: &str,
        username: &str,
        password_hash: &str,
    ) -> Result<User> {
        let row = sqlx::query!(
            r#"
            INSERT INTO users (email, username, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            "#,
            email,
            username,
            password_hash
        )
        .fetch_one(&self.pool)
        .await?;

        User::from_row(
            row.id,
            row.email,
            row.username,
            row.password_hash,
            row.email_verified_at,
            Some(row.account_status),
            row.created_at,
            row.updated_at,
            row.deleted_at,
        )
    }

    pub async fn find_by_id(&self, id: Uuid) -> Result<Option<User>> {
        let row = sqlx::query!(
            r#"
            SELECT id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            FROM users 
            WHERE id = $1 AND deleted_at IS NULL
            "#,
            id
        )
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(row) => {
                let user = User::from_row(
                    row.id,
                    row.email,
                    row.username,
                    row.password_hash,
                    row.email_verified_at,
                    Some(row.account_status),
                    row.created_at,
                    row.updated_at,
                    row.deleted_at,
                )?;
                Ok(Some(user))
            }
            None => Ok(None),
        }
    }

    pub async fn find_by_email(&self, email: &str) -> Result<Option<User>> {
        let row = sqlx::query!(
            r#"
            SELECT id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            FROM users 
            WHERE email = $1 AND deleted_at IS NULL
            "#,
            email
        )
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(row) => {
                let user = User::from_row(
                    row.id,
                    row.email,
                    row.username,
                    row.password_hash,
                    row.email_verified_at,
                    Some(row.account_status),
                    row.created_at,
                    row.updated_at,
                    row.deleted_at,
                )?;
                Ok(Some(user))
            }
            None => Ok(None),
        }
    }

    pub async fn find_by_username(&self, username: &str) -> Result<Option<User>> {
        let row = sqlx::query!(
            r#"
            SELECT id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            FROM users 
            WHERE username = $1 AND deleted_at IS NULL
            "#,
            username
        )
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(row) => {
                let user = User::from_row(
                    row.id,
                    row.email,
                    row.username,
                    row.password_hash,
                    row.email_verified_at,
                    Some(row.account_status),
                    row.created_at,
                    row.updated_at,
                    row.deleted_at,
                )?;
                Ok(Some(user))
            }
            None => Ok(None),
        }
    }

    pub async fn update_password_hash(&self, id: Uuid, password_hash: &str) -> Result<User> {
        let row = sqlx::query!(
            r#"
            UPDATE users 
            SET password_hash = $2
            WHERE id = $1 AND deleted_at IS NULL
            RETURNING id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            "#,
            id,
            password_hash
        )
        .fetch_one(&self.pool)
        .await?;

        User::from_row(
            row.id,
            row.email,
            row.username,
            row.password_hash,
            row.email_verified_at,
            Some(row.account_status),
            row.created_at,
            row.updated_at,
            row.deleted_at,
        )
    }

    pub async fn verify_email(&self, id: Uuid) -> Result<User> {
        let row = sqlx::query!(
            r#"
            UPDATE users 
            SET email_verified_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL
            RETURNING id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            "#,
            id
        )
        .fetch_one(&self.pool)
        .await?;

        User::from_row(
            row.id,
            row.email,
            row.username,
            row.password_hash,
            row.email_verified_at,
            Some(row.account_status),
            row.created_at,
            row.updated_at,
            row.deleted_at,
        )
    }

    pub async fn update_account_status(&self, id: Uuid, status: AccountStatus) -> Result<User> {
        let status_str = status.to_string();
        
        // Use raw query to avoid SQLx enum type checking
        let query = format!(
            r#"
            UPDATE users 
            SET account_status = '{}'::account_status
            WHERE id = $1 AND deleted_at IS NULL
            RETURNING id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            "#,
            status_str
        );
        
        let row = sqlx::query(&query)
            .bind(id)
            .fetch_one(&self.pool)
            .await?;

        User::from_row(
            row.get("id"),
            row.get("email"),
            row.get("username"),
            row.get("password_hash"),
            row.get("email_verified_at"),
            Some(row.get::<String, _>("account_status")),
            row.get("created_at"),
            row.get("updated_at"),
            row.get("deleted_at"),
        )
    }

    pub async fn soft_delete(&self, id: Uuid) -> Result<User> {
        let row = sqlx::query!(
            r#"
            UPDATE users 
            SET deleted_at = NOW()
            WHERE id = $1 AND deleted_at IS NULL
            RETURNING id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            "#,
            id
        )
        .fetch_one(&self.pool)
        .await?;

        User::from_row(
            row.id,
            row.email,
            row.username,
            row.password_hash,
            row.email_verified_at,
            Some(row.account_status),
            row.created_at,
            row.updated_at,
            row.deleted_at,
        )
    }

    pub async fn find_active_users(&self, limit: i64, offset: i64) -> Result<Vec<User>> {
        let rows = sqlx::query!(
            r#"
            SELECT id, email, username, password_hash, email_verified_at, account_status::text as "account_status!", created_at, updated_at, deleted_at
            FROM users 
            WHERE account_status = 'active' 
            AND deleted_at IS NULL
            ORDER BY created_at DESC
            LIMIT $1 OFFSET $2
            "#,
            limit,
            offset
        )
        .fetch_all(&self.pool)
        .await?;

        let mut users = Vec::new();
        for row in rows {
            let user = User::from_row(
                row.id,
                row.email,
                row.username,
                row.password_hash,
                row.email_verified_at,
                Some(row.account_status),
                row.created_at,
                row.updated_at,
                row.deleted_at,
            )?;
            users.push(user);
        }

        Ok(users)
    }

    pub async fn count_active_users(&self) -> Result<i64> {
        let count = sqlx::query_scalar!(
            r#"
            SELECT COUNT(*) FROM users 
            WHERE account_status = 'active' 
            AND deleted_at IS NULL
            "#
        )
        .fetch_one(&self.pool)
        .await?
        .unwrap_or(0);

        Ok(count)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::Utc;
    use uuid::Uuid;

    #[test]
    fn test_user_struct_creation() {
        let user = User {
            id: Uuid::new_v4(),
            email: "test@example.com".to_string(),
            username: "testuser".to_string(),
            password_hash: "hashed_password".to_string(),
            email_verified_at: Some(Utc::now()),
            account_status: AccountStatus::Active,
            created_at: Utc::now(),
            updated_at: Utc::now(),
            deleted_at: None,
        };

        assert!(user.is_active());
        assert!(user.is_email_verified());
    }

    #[test]
    fn test_account_status_comparison() {
        assert_eq!(AccountStatus::Active, AccountStatus::Active);
        assert_ne!(AccountStatus::Active, AccountStatus::Suspended);
    }
} 