use super::core::{Schema, ValidationError, ValidationResult};
use std::str::FromStr;

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
    fn validates_environment_enum() {
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
