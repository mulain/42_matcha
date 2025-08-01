use super::core::{Schema, ValidationError, ValidationResult};

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
            return Err(ValidationError::new("string", "Field is required"));
        }

        if value.is_empty() && !self.required {
            return Ok(value.to_string());
        }

        if let Some(min_len) = self.min_length {
            if value.len() < min_len {
                return Err(ValidationError::new(
                    "string",
                    &format!("Minimum length is {} characters", min_len),
                ));
            }
        }

        if let Some(max_len) = self.max_length {
            if value.len() > max_len {
                return Err(ValidationError::new(
                    "string",
                    &format!("Maximum length is {} characters", max_len),
                ));
            }
        }

        if let Some(ref _pattern) = self.pattern {
            // TODO: Implement regex pattern matching
        }

        if let Some(ref allowed_values) = self.allowed_values {
            if !allowed_values.contains(&value.to_string()) {
                return Err(ValidationError::new(
                    "string",
                    &format!("Value must be one of: {:?}", allowed_values),
                ));
            }
        }

        Ok(value.to_string())
    }
}

pub fn string() -> StringSchema {
    StringSchema::new()
}
