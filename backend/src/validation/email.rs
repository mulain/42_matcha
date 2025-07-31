use super::core::{Schema, ValidationError, ValidationResult};

pub struct EmailSchema {
    pub required: bool,
}

impl EmailSchema {
    pub fn new() -> Self {
        Self { required: true }
    }

    pub fn optional(mut self) -> Self {
        self.required = false;
        self
    }
}

impl Schema<String> for EmailSchema {
    fn validate(&self, value: &str) -> ValidationResult<String> {
        if value.is_empty() {
            if self.required {
                return Err(ValidationError::new("email", "Email is required"));
            } else {
                return Ok(value.to_string());
            }
        }

        if !value.contains('@') || !value.contains('.') {
            return Err(ValidationError::new("email", "Invalid email format"));
        }

        let parts: Vec<&str> = value.split('@').collect();
        if parts.len() != 2 {
            return Err(ValidationError::new("email", "Invalid email format"));
        }

        let domain_parts: Vec<&str> = parts[1].split('.').collect();
        if domain_parts.len() < 2 {
            return Err(ValidationError::new("email", "Invalid email domain"));
        }

        Ok(value.to_string())
    }
}

/// Convenience function for creating email schemas
pub fn email() -> EmailSchema {
    EmailSchema::new()
}
