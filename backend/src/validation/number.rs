use super::core::{Schema, ValidationError, ValidationResult};

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

        let parsed = value
            .parse::<f64>()
            .map_err(|_| ValidationError::new("value", "Value must be a valid number"))?;

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

/// Convenience function for creating number schemas
pub fn number() -> NumberSchema {
    NumberSchema::new()
}
