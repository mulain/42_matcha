use anyhow::Result;
use std::str::FromStr;

/// Validation error with field name and message
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

/// Result type for validation operations
pub type ValidationResult<T> = Result<T, ValidationError>;

/// Base schema trait
pub trait Schema<T> {
    fn validate(&self, value: &str) -> ValidationResult<T>;
}

/// String schema with validation rules
pub struct StringSchema {
    pub required: bool,
    pub min_length: Option<usize>,
    pub max_length: Option<usize>,
    pub pattern: Option<String>,
    pub allowed_values: Option<Vec<String>>,
}

impl StringSchema {
    pub fn new() -> Self {
        Self {
            required: true,
            min_length: None,
            max_length: None,
            pattern: None,
            allowed_values: None,
        }
    }

    pub fn optional(mut self) -> Self {
        self.required = false;
        self
    }

    pub fn min_length(mut self, length: usize) -> Self {
        self.min_length = Some(length);
        self
    }

    pub fn max_length(mut self, length: usize) -> Self {
        self.max_length = Some(length);
        self
    }

    pub fn pattern(mut self, pattern: &str) -> Self {
        self.pattern = Some(pattern.to_string());
        self
    }

    pub fn allowed_values(mut self, values: Vec<&str>) -> Self {
        self.allowed_values = Some(values.iter().map(|s| s.to_string()).collect());
        self
    }
}

impl Schema<String> for StringSchema {
    fn validate(&self, value: &str) -> ValidationResult<String> {
        if value.is_empty() && self.required {
            return Err(ValidationError::new("value", "Field is required"));
        }

        if value.is_empty() && !self.required {
            return Ok(value.to_string());
        }

        if let Some(min_len) = self.min_length {
            if value.len() < min_len {
                return Err(ValidationError::new(
                    "value",
                    &format!("Minimum length is {} characters", min_len),
                ));
            }
        }

        if let Some(max_len) = self.max_length {
            if value.len() > max_len {
                return Err(ValidationError::new(
                    "value",
                    &format!("Maximum length is {} characters", max_len),
                ));
            }
        }

        if let Some(ref _pattern) = self.pattern {
            // TODO: Implement regex pattern matching
            // For now, we'll skip pattern validation
        }

        if let Some(ref allowed_values) = self.allowed_values {
            if !allowed_values.contains(&value.to_string()) {
                return Err(ValidationError::new(
                    "value",
                    &format!("Value must be one of: {:?}", allowed_values),
                ));
            }
        }

        Ok(value.to_string())
    }
}

/// Number schema with validation rules
pub struct NumberSchema {
    pub required: bool,
    pub min_value: Option<f64>,
    pub max_value: Option<f64>,
    pub integer_only: bool,
}

impl NumberSchema {
    pub fn new() -> Self {
        Self {
            required: true,
            min_value: None,
            max_value: None,
            integer_only: false,
        }
    }

    pub fn optional(mut self) -> Self {
        self.required = false;
        self
    }

    pub fn min_value(mut self, value: f64) -> Self {
        self.min_value = Some(value);
        self
    }

    pub fn max_value(mut self, value: f64) -> Self {
        self.max_value = Some(value);
        self
    }

    pub fn integer(mut self) -> Self {
        self.integer_only = true;
        self
    }
}

impl Schema<f64> for NumberSchema {
    fn validate(&self, value: &str) -> ValidationResult<f64> {
        if value.is_empty() && self.required {
            return Err(ValidationError::new("value", "Field is required"));
        }

        if value.is_empty() && !self.required {
            return Ok(0.0);
        }

        let parsed = value.parse::<f64>().map_err(|_| {
            ValidationError::new("value", "Value must be a valid number")
        })?;

        if self.integer_only && parsed.fract() != 0.0 {
            return Err(ValidationError::new("value", "Value must be an integer"));
        }

        if let Some(min_val) = self.min_value {
            if parsed < min_val {
                return Err(ValidationError::new(
                    "value",
                    &format!("Value must be at least {}", min_val),
                ));
            }
        }

        if let Some(max_val) = self.max_value {
            if parsed > max_val {
                return Err(ValidationError::new(
                    "value",
                    &format!("Value must be at most {}", max_val),
                ));
            }
        }

        Ok(parsed)
    }
}

impl Schema<u16> for NumberSchema {
    fn validate(&self, value: &str) -> ValidationResult<u16> {
        let float_value: f64 = self.validate(value)?;
        if float_value.fract() != 0.0 {
            return Err(ValidationError::new("value", "Value must be an integer"));
        }
        Ok(float_value as u16)
    }
}

impl Schema<u32> for NumberSchema {
    fn validate(&self, value: &str) -> ValidationResult<u32> {
        let float_value: f64 = self.validate(value)?;
        if float_value.fract() != 0.0 {
            return Err(ValidationError::new("value", "Value must be an integer"));
        }
        Ok(float_value as u32)
    }
}

/// URL schema
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

/// Email schema
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
        if value.is_empty() && self.required {
            return Err(ValidationError::new("value", "Email is required"));
        }

        if value.is_empty() && !self.required {
            return Ok(value.to_string());
        }

        // Basic email validation
        if !value.contains('@') || !value.contains('.') {
            return Err(ValidationError::new("value", "Invalid email format"));
        }

        let parts: Vec<&str> = value.split('@').collect();
        if parts.len() != 2 {
            return Err(ValidationError::new("value", "Invalid email format"));
        }

        let domain_parts: Vec<&str> = parts[1].split('.').collect();
        if domain_parts.len() < 2 {
            return Err(ValidationError::new("value", "Invalid email domain"));
        }

        Ok(value.to_string())
    }
}





/// Convenience functions for creating schemas
pub fn string() -> StringSchema {
    StringSchema::new()
}

pub fn number() -> NumberSchema {
    NumberSchema::new()
}

pub fn url() -> UrlSchema {
    UrlSchema::new()
}

pub fn email() -> EmailSchema {
    EmailSchema::new()
}

/// Simple enum validation using FromStr trait (preferred for strum enums)
pub fn enum_value<T: FromStr + Clone + PartialEq + ToString>() -> impl Schema<T> {
    struct SimpleEnumSchema<T> {
        _phantom: std::marker::PhantomData<T>,
    }

    impl<T: FromStr + Clone + PartialEq + ToString> Schema<T> for SimpleEnumSchema<T> {
        fn validate(&self, value: &str) -> ValidationResult<T> {
            if value.is_empty() {
                return Err(ValidationError::new("value", "Value is required"));
            }

            T::from_str(value).map_err(|_| {
                ValidationError::new("value", &format!("Invalid enum value: {}", value))
            })
        }
    }

    SimpleEnumSchema {
        _phantom: std::marker::PhantomData,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::enums::Environment;

    #[test]
    fn test_enum_validation_with_environment() {
        let schema = enum_value::<Environment>();
        
        // Test valid lowercase values (strum serialization)
        assert!(schema.validate("development").is_ok());
        assert!(schema.validate("production").is_ok());
        assert!(schema.validate("test").is_ok());
        
        // Test invalid values
        assert!(schema.validate("invalid").is_err());
        assert!(schema.validate("dev").is_err());
        assert!(schema.validate("").is_err());
    }

    #[test]
    fn test_enum_validation_with_strum() {
        let schema = enum_value::<Environment>();
        
        // Test that strum's FromStr implementation works correctly
        assert_eq!(schema.validate("development").unwrap(), Environment::Development);
        assert_eq!(schema.validate("production").unwrap(), Environment::Production);
        assert_eq!(schema.validate("test").unwrap(), Environment::Test);
        
        // Test error messages
        let result = schema.validate("invalid");
        assert!(result.is_err());
        if let Err(error) = result {
            assert_eq!(error.field, "value");
            assert!(error.message.contains("Invalid enum value"));
        }
    }

    #[test]
    fn test_enum_validation_error_messages() {
        let schema = enum_value::<Environment>();
        
        let result = schema.validate("invalid");
        assert!(result.is_err());
        
        if let Err(error) = result {
            assert_eq!(error.field, "value");
            assert!(error.message.contains("Invalid enum value"));
        }
    }
} 