use std::result::Result;

#[derive(Debug, Clone)]
pub struct ValidationError {
    pub field: String,
    pub message: String,
}

impl std::error::Error for ValidationError {}

impl std::fmt::Display for ValidationError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Validation error in field '{}': {}", self.field, self.message)
    }
}

impl ValidationError {
    pub fn new(field: &str, message: &str) -> Self {
        Self {
            field: field.to_string(),
            message: message.to_string(),
        }
    }
}

pub type ValidationResult<T> = Result<T, ValidationError>;

pub trait Validator<T> {
    fn validate(&self, value: &str) -> ValidationResult<Option<T>>;
}
