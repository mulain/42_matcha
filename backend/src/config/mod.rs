use std::env;
use crate::utils::validation::{self, Schema};
use crate::enums::Environment;

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
}

impl Config {
    pub fn load() -> anyhow::Result<Self> {
        dotenvy::dotenv().ok();

        fn get_env_var(name: &str) -> String {
            env::var(name).expect(&format!("'{}' env variable must be set", name))
        }

        let config = Config {
            environment: validation::enum_value::<Environment>()
                .validate(&get_env_var("ENVIRONMENT"))?,

            port: validation::number()
                .min_value(1.0)
                .max_value(65535.0)
                .integer()
                .validate(&get_env_var("PORT"))?,

            frontend_url: validation::url()
                .validate(&get_env_var("FRONTEND_URL"))?,

            database_url: validation::url()
                .validate(&get_env_var("DATABASE_URL"))?,

            jwt_secret: validation::string()
                .min_length(32)
                .validate(&get_env_var("JWT_SECRET"))?,

            smtp_host: validation::string()
                .validate(&get_env_var("SMTP_HOST"))?,

            smtp_port: validation::number()
                .min_value(1.0)
                .max_value(65535.0)
                .integer()
                .validate(&get_env_var("SMTP_PORT"))?,

            smtp_user: validation::string()
                .validate(&get_env_var("SMTP_USER"))?,

            smtp_pass: validation::string()
                .validate(&get_env_var("SMTP_PASS"))?,

            from_email: validation::email()
                .validate(&get_env_var("FROM_EMAIL"))?,

            ethereal_user: validation::string()
                .validate(&get_env_var("ETHEREAL_USER"))?,

            ethereal_pass: validation::string()
                .validate(&get_env_var("ETHEREAL_PASS"))?,
        };

        Ok(config)
    }

    pub fn is_development(&self) -> bool {
        matches!(self.environment, Environment::Development)
    }

    pub fn is_production(&self) -> bool {
        matches!(self.environment, Environment::Production)
    }

    pub fn is_test(&self) -> bool {
        matches!(self.environment, Environment::Test)
    }
} 