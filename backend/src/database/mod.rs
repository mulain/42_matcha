use sqlx::PgPool;

pub mod user_repository;

pub use user_repository::UserRepository;

pub async fn create_pool(database_url: &str) -> anyhow::Result<PgPool> {
    let pool = PgPool::connect(database_url).await?;
    Ok(pool)
}
