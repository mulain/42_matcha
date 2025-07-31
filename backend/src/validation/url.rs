use super::core::{Schema, ValidationError, ValidationResult};

pub struct UrlSchema {
    pub required: bool,
}

impl UrlSchema {
    pub fn new() -> Self {
        Self { required: true }
    }

    pub fn optional(mut self) -> Self {
        self.required = false;
        self
    }
}

impl Schema<String> for UrlSchema {
    fn validate(&self, value: &str) -> ValidationResult<String> {
        if value.is_empty() && self.required {
            return Err(ValidationError::new("value", "URL is required"));
        }

        if value.is_empty() && !self.required {
            return Ok(value.to_string());
        }

        // Basic URL validation
        if !value.contains("://") {
            return Err(ValidationError::new("value", "Invalid URL format"));
        }

        Ok(value.to_string())
    }
}

/// Convenience function for creating URL schemas
pub fn url() -> UrlSchema {
    UrlSchema::new()
}
