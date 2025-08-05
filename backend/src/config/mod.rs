use crate::enums::Environment;
use crate::validation::{self, Validator};
use std::env;
use tracing::Level;

#[derive(Debug, Clone)]
pub struct Config {
    pub environment: Environment,
    pub port: u16,
    pub frontend_url: String,
    pub database_url: String,
    pub jwt_secret: String,
    pub smtp_host: String,
    pub smtp_port: u16,
    pub smtp_user: String,
    pub smtp_pass: String,
    pub from_email: String,
    pub ethereal_user: String,
    pub ethereal_pass: String,
    pub log_level: Level,
}

impl Config {
    pub fn load() -> anyhow::Result<Self> {
        dotenvy::dotenv().ok();

        fn get_env_var(name: &str) -> anyhow::Result<String> {
            env::var(name).map_err(|_| anyhow::anyhow!("'{}' env variable must be set", name))
        }

        let environment = validation::enums::<Environment>()
            .validate(&get_env_var("ENVIRONMENT")?)?
            .ok_or_else(|| anyhow::anyhow!("ENVIRONMENT is required"))?;

        let log_level = match environment {
            Environment::Development => Level::DEBUG,
            Environment::Production => Level::INFO,
            Environment::Test => Level::ERROR,
        };

        let config = Config {
            environment,
            port: validation::number()
                .min_value(1.0)
                .max_value(65535.0)
                .integer()
                .validate(&get_env_var("PORT")?)?
                .ok_or_else(|| anyhow::anyhow!("PORT is required"))?,

            frontend_url: validation::url()
                .validate(&get_env_var("FRONTEND_URL")?)?
                .ok_or_else(|| anyhow::anyhow!("FRONTEND_URL is required"))?,

            database_url: validation::url()
                .validate(&get_env_var("DATABASE_URL")?)?
                .ok_or_else(|| anyhow::anyhow!("DATABASE_URL is required"))?,

            jwt_secret: validation::string()
                .min_length(32)
                .validate(&get_env_var("JWT_SECRET")?)?
                .ok_or_else(|| anyhow::anyhow!("JWT_SECRET is required"))?,

            smtp_host: validation::string()
                .validate(&get_env_var("SMTP_HOST")?)?
                .ok_or_else(|| anyhow::anyhow!("SMTP_HOST is required"))?,

            smtp_port: validation::number()
                .min_value(1.0)
                .max_value(65535.0)
                .integer()
                .validate(&get_env_var("SMTP_PORT")?)?
                .ok_or_else(|| anyhow::anyhow!("SMTP_PORT is required"))?,

            smtp_user: validation::string()
                .validate(&get_env_var("SMTP_USER")?)?
                .ok_or_else(|| anyhow::anyhow!("SMTP_USER is required"))?,

            smtp_pass: validation::string()
                .validate(&get_env_var("SMTP_PASS")?)?
                .ok_or_else(|| anyhow::anyhow!("SMTP_PASS is required"))?,

            from_email: validation::email()
                .validate(&get_env_var("FROM_EMAIL")?)?
                .ok_or_else(|| anyhow::anyhow!("FROM_EMAIL is required"))?,

            ethereal_user: validation::string()
                .validate(&get_env_var("ETHEREAL_USER")?)?
                .ok_or_else(|| anyhow::anyhow!("ETHEREAL_USER is required"))?,

            ethereal_pass: validation::string()
                .validate(&get_env_var("ETHEREAL_PASS")?)?
                .ok_or_else(|| anyhow::anyhow!("ETHEREAL_PASS is required"))?,

            log_level,
        };

        Ok(config)
    }
}
