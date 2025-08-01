use super::core::{ValidationError, ValidationResult, Validator};

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

    fn validate_common(&self, value: &str) -> Result<Option<f64>, ValidationError> {
        if value.is_empty() {
            if self.required {
                return Err(ValidationError::new("number", "Field is required"));
            } else {
                return Ok(None);
            }
        }

        let parsed = value
            .parse::<f64>()
            .map_err(|_| ValidationError::new("number", "Value must be a valid number"))?;

        if self.integer_only && parsed.fract() != 0.0 {
            return Err(ValidationError::new("number", "Value must be an integer"));
        }

        if let Some(min_val) = self.min_value {
            if parsed < min_val {
                return Err(ValidationError::new(
                    "number",
                    &format!("Value must be at least {}", min_val),
                ));
            }
        }

        if let Some(max_val) = self.max_value {
            if parsed > max_val {
                return Err(ValidationError::new(
                    "number",
                    &format!("Value must be at most {}", max_val),
                ));
            }
        }

        Ok(Some(parsed))
    }

    fn validate_u16_bounds(&self, value: f64) -> Result<u16, ValidationError> {
        if value < 0.0 || value > 65535.0 {
            return Err(ValidationError::new("value", "Value must be between 0 and 65535"));
        }
        Ok(value as u16)
    }

    fn validate_u32_bounds(&self, value: f64) -> Result<u32, ValidationError> {
        if value < 0.0 || value > 4294967295.0 {
            return Err(ValidationError::new("value", "Value must be between 0 and 4294967295"));
        }
        Ok(value as u32)
    }
}

impl Validator<f64> for NumberSchema {
    fn validate(&self, value: &str) -> ValidationResult<Option<f64>> {
        self.validate_common(value)
    }
}

impl Validator<u16> for NumberSchema {
    fn validate(&self, value: &str) -> ValidationResult<Option<u16>> {
        let float_value = self.validate_common(value)?;
        match float_value {
            Some(value) => self.validate_u16_bounds(value).map(Some),
            None => Ok(None),
        }
    }
}

impl Validator<u32> for NumberSchema {
    fn validate(&self, value: &str) -> ValidationResult<Option<u32>> {
        let float_value = self.validate_common(value)?;
        match float_value {
            Some(value) => self.validate_u32_bounds(value).map(Some),
            None => Ok(None),
        }
    }
}

pub fn number() -> NumberSchema {
    NumberSchema::new()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_f64_validation() {
        let schema = number();

        // Valid numbers
        let result: ValidationResult<Option<f64>> = schema.validate("42.5");
        assert_eq!(result.unwrap(), Some(42.5));
        let result: ValidationResult<Option<f64>> = schema.validate("0");
        assert_eq!(result.unwrap(), Some(0.0));
        let result: ValidationResult<Option<f64>> = schema.validate("-10.5");
        assert_eq!(result.unwrap(), Some(-10.5));

        // Invalid numbers
        let result: ValidationResult<Option<f64>> = schema.validate("not_a_number");
        assert!(result.is_err());
        let result: ValidationResult<Option<f64>> = schema.validate("");
        assert!(result.is_err()); // Required field
    }

    #[test]
    fn test_u16_validation() {
        let schema = number().integer();

        // Valid u16 values
        let result: ValidationResult<Option<u16>> = schema.validate("42");
        assert_eq!(result.unwrap(), Some(42u16));
        let result: ValidationResult<Option<u16>> = schema.validate("0");
        assert_eq!(result.unwrap(), Some(0u16));
        let result: ValidationResult<Option<u16>> = schema.validate("65535");
        assert_eq!(result.unwrap(), Some(65535u16));

        // Invalid values
        let result: ValidationResult<Option<u16>> = schema.validate("65536");
        assert!(result.is_err()); // Out of range
        let result: ValidationResult<Option<u16>> = schema.validate("-1");
        assert!(result.is_err()); // Negative
        let result: ValidationResult<Option<u16>> = schema.validate("42.5");
        assert!(result.is_err()); // Not integer
        let result: ValidationResult<Option<u16>> = schema.validate("not_a_number");
        assert!(result.is_err()); // Invalid format
    }

    #[test]
    fn test_u32_validation() {
        let schema = number().integer();

        // Valid u32 values
        let result: ValidationResult<Option<u32>> = schema.validate("42");
        assert_eq!(result.unwrap(), Some(42u32));
        let result: ValidationResult<Option<u32>> = schema.validate("0");
        assert_eq!(result.unwrap(), Some(0u32));
        let result: ValidationResult<Option<u32>> = schema.validate("4294967295");
        assert_eq!(result.unwrap(), Some(4294967295u32));

        // Invalid values
        let result: ValidationResult<Option<u32>> = schema.validate("4294967296");
        assert!(result.is_err()); // Out of range
        let result: ValidationResult<Option<u32>> = schema.validate("-1");
        assert!(result.is_err()); // Negative
        let result: ValidationResult<Option<u32>> = schema.validate("42.5");
        assert!(result.is_err()); // Not integer
        let result: ValidationResult<Option<u32>> = schema.validate("not_a_number");
        assert!(result.is_err()); // Invalid format
    }

    #[test]
    fn test_min_max_validation() {
        let schema = number().min_value(10.0).max_value(100.0);

        // Valid values
        let result: ValidationResult<Option<f64>> = schema.validate("50");
        assert_eq!(result.unwrap(), Some(50.0));
        let result: ValidationResult<Option<f64>> = schema.validate("10");
        assert_eq!(result.unwrap(), Some(10.0));
        let result: ValidationResult<Option<f64>> = schema.validate("100");
        assert_eq!(result.unwrap(), Some(100.0));

        // Invalid values
        let result: ValidationResult<Option<f64>> = schema.validate("5");
        assert!(result.is_err()); // Below min
        let result: ValidationResult<Option<f64>> = schema.validate("150");
        assert!(result.is_err()); // Above max
    }

    #[test]
    fn test_integer_validation() {
        let schema = number().integer();

        // Valid integers
        let result: ValidationResult<Option<f64>> = schema.validate("42");
        assert_eq!(result.unwrap(), Some(42.0));
        let result: ValidationResult<Option<f64>> = schema.validate("0");
        assert_eq!(result.unwrap(), Some(0.0));
        let result: ValidationResult<Option<f64>> = schema.validate("-10");
        assert_eq!(result.unwrap(), Some(-10.0));

        // Invalid non-integers
        let result: ValidationResult<Option<f64>> = schema.validate("42.5");
        assert!(result.is_err());
        let result: ValidationResult<Option<f64>> = schema.validate("3.14");
        assert!(result.is_err());
    }

    #[test]
    fn test_optional_validation() {
        let schema = number().optional();

        // Empty value should return None for optional fields
        let result: ValidationResult<Option<f64>> = schema.validate("");
        assert!(result.is_ok(), "Empty value should be valid for optional number");
        assert_eq!(result.unwrap(), None);

        // Valid number should return Some(value)
        let result: ValidationResult<Option<f64>> = schema.validate("42.5");
        assert!(result.is_ok(), "Valid number should be valid");
        assert_eq!(result.unwrap(), Some(42.5));

        // Invalid number should still be rejected
        let result: ValidationResult<Option<f64>> = schema.validate("not_a_number");
        assert!(result.is_err(), "Invalid number should be rejected");
    }

    #[test]
    fn test_optional_u16_validation() {
        let schema = number().integer().optional();

        // Empty value should return None
        let result: ValidationResult<Option<u16>> = schema.validate("");
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), None);

        // Valid u16 should return Some(value)
        let result: ValidationResult<Option<u16>> = schema.validate("42");
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), Some(42u16));

        // Invalid values should be rejected
        let result: ValidationResult<Option<u16>> = schema.validate("65536");
        assert!(result.is_err()); // Out of range
        let result: ValidationResult<Option<u16>> = schema.validate("42.5");
        assert!(result.is_err()); // Not integer
    }
}
