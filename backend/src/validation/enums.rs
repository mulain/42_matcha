use super::core::{ValidationError, ValidationResult, Validator};
use std::str::FromStr;

pub struct EnumValidator<T: FromStr> {
    _phantom: std::marker::PhantomData<T>,
}

impl<T: FromStr> EnumValidator<T> {
    pub fn new() -> Self {
        Self {
            _phantom: std::marker::PhantomData,
        }
    }
}

impl<T: FromStr> Validator<T> for EnumValidator<T> {
    fn validate(&self, value: &str) -> ValidationResult<Option<T>> {
        if value.is_empty() {
            return Err(ValidationError::new("enums", "Value is required"));
        }

        T::from_str(value)
            .map(Some)
            .map_err(|_| ValidationError::new("enums", &format!("Invalid enum value: {}", value)))
    }
}

pub fn enums<T: FromStr>() -> EnumValidator<T> {
    EnumValidator::new()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::enums::Environment;

    #[test]
    fn validates_environment_enum() {
        let schema = enums::<Environment>();

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
        let schema = enums::<Environment>();

        // Test that strum's FromStr implementation works correctly
        assert_eq!(schema.validate("development").unwrap(), Some(Environment::Development));
        assert_eq!(schema.validate("production").unwrap(), Some(Environment::Production));
        assert_eq!(schema.validate("test").unwrap(), Some(Environment::Test));

        // Test error messages
        let result = schema.validate("invalid");
        assert!(result.is_err());
        if let Err(error) = result {
            assert_eq!(error.field, "enums");
            assert!(error.message.contains("Invalid enum value"));
        }
    }

    #[test]
    fn test_enum_validation_error_messages() {
        let schema = enums::<Environment>();

        let result = schema.validate("invalid");
        assert!(result.is_err());

        if let Err(error) = result {
            assert_eq!(error.field, "enums");
            assert!(error.message.contains("Invalid enum value"));
        }
    }
}
