use super::core::{ValidationError, ValidationResult, Validator};

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

impl Validator<String> for UrlSchema {
    fn validate(&self, value: &str) -> ValidationResult<Option<String>> {
        if value.is_empty() {
            if self.required {
                return Err(ValidationError::new("url", "URL is required"));
            } else {
                return Ok(None);
            }
        }

        if !value.contains("://") {
            return Err(ValidationError::new("value", "Invalid URL format"));
        }

        Ok(Some(value.to_string()))
    }
}

pub fn url() -> UrlSchema {
    UrlSchema::new()
}
