use super::core::{ValidationError, ValidationResult, Validator};

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

    fn allowed_local_char(c: char) -> bool {
        c.is_ascii_alphanumeric() || ".-_+".contains(c)
    }

    fn allowed_domain_char(c: char) -> bool {
        c.is_ascii_alphanumeric() || "-.".contains(c)
    }

    fn is_valid_local_part(local: &str) -> bool {
        if local.is_empty() || local.len() > 64 {
            return false;
        }
        if local.starts_with('.') || local.ends_with('.') {
            return false;
        }
        // Allowed by RFC 5322, but generally disallowed
        if local.starts_with('-') || local.ends_with('-') {
            return false;
        }
        if local.contains("..") {
            return false;
        }
        local.chars().all(Self::allowed_local_char)
    }

    fn is_valid_domain_part(domain: &str) -> bool {
        if domain.is_empty() || domain.len() > 253 {
            return false;
        }
        if domain.starts_with('.') || domain.ends_with('.') {
            return false;
        }
        if domain.contains("..") {
            return false;
        }
        if !domain.chars().all(Self::allowed_domain_char) {
            return false;
        }

        let labels: Vec<&str> = domain.split('.').collect();
        if labels.len() < 2 {
            return false;
        }

        labels.into_iter().all(Self::is_valid_domain_label)
    }

    fn is_valid_domain_label(label: &str) -> bool {
        if label.is_empty() || label.len() > 63 {
            return false;
        }
        if label.starts_with('-') || label.ends_with('-') {
            return false;
        }
        label.chars().all(|c| c.is_ascii_alphanumeric() || c == '-')
    }
}

impl Validator<String> for EmailSchema {
    fn validate(&self, value: &str) -> ValidationResult<Option<String>> {
        if value.is_empty() {
            if self.required {
                return Err(ValidationError::new("email", "Email is required"));
            } else {
                return Ok(None);
            }
        }

        if value.len() > 254 {
            return Err(ValidationError::new("email", "Email is too long"));
        }

        if !value.is_ascii() {
            return Err(ValidationError::new("email", "Email contains non-ASCII characters"));
        }

        if value.chars().any(|c| c.is_control()) {
            return Err(ValidationError::new("email", "Email contains control characters"));
        }

        if !value.contains('@') || !value.contains('.') {
            return Err(ValidationError::new("email", "Invalid email format"));
        }

        let parts: Vec<&str> = value.split('@').collect();
        if parts.len() != 2 {
            return Err(ValidationError::new(
                "email",
                "Invalid email format: missing local part or domain",
            ));
        }

        let local_part = parts[0];
        let domain_part = parts[1];

        if !Self::is_valid_local_part(local_part) {
            return Err(ValidationError::new("email", "Invalid local part"));
        }

        if !Self::is_valid_domain_part(domain_part) {
            return Err(ValidationError::new("email", "Invalid domain part"));
        }

        Ok(Some(value.to_string()))
    }
}

pub fn email() -> EmailSchema {
    EmailSchema::new()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_valid_emails() {
        let schema = email();

        let valid_emails = vec![
            "user@example.com",
            "user.name@domain.co.uk",
            "user-name@test.org",
            "user+tag@example.com",
            "user_name@domain.com",
            "123@example.com",
            "a@b.c",
            "test@example-domain.com",
        ];

        for email in valid_emails {
            assert!(schema.validate(email).is_ok(), "Email '{}' should be valid", email);
        }
    }

    #[test]
    fn test_injection_attacks() {
        let schema = email();

        let injection_attempts = vec![
            // SQL injection attempts
            "user'; DROP TABLE users; --@example.com",
            "user' OR '1'='1@example.com",
            "user' UNION SELECT * FROM users@example.com",
            "user' AND 1=1@example.com",
            // XSS injection attempts
            "<script>alert('xss')</script>@example.com",
            "user<img src=x onerror=alert(1)>@example.com",
            "user\"<script>alert('xss')</script>@example.com",
            // Command injection attempts
            "user; rm -rf /@example.com",
            "user`rm -rf /`@example.com",
            "user$(rm -rf /)@example.com",
            "user|rm -rf /@example.com",
            // Path traversal attempts
            "../../../etc/passwd@example.com",
            "..\\..\\..\\windows\\system32@example.com",
            // HTML injection attempts
            "user<iframe src=javascript:alert(1)>@example.com",
            "user<object data=javascript:alert(1)>@example.com",
            "user<embed src=javascript:alert(1)>@example.com",
        ];

        for email in injection_attempts {
            let result = schema.validate(email);
            assert!(result.is_err(), "Injection attempt '{}' should be rejected", email);
        }
    }

    #[test]
    fn test_illegal_characters() {
        let schema = email();

        let illegal_chars = vec![
            '(', ')', '<', '>', '[', ']', ':', ';', '@', '\\', ',', '"', ' ', '\t', '\n', '\r',
            '\0', '\x1b', // Control characters
        ];

        for &char in &illegal_chars {
            let test_email = format!("user{}char@example.com", char);
            let result = schema.validate(&test_email);
            assert!(result.is_err(), "Email with illegal char '{}' should be rejected", char);
        }
    }

    #[test]
    fn test_control_characters() {
        let schema = email();

        let control_chars = vec![
            '\x00', '\x01', '\x02', '\x03', '\x04', '\x05', '\x06', '\x07', '\x08', '\x09', '\x0a',
            '\x0b', '\x0c', '\x0d', '\x0e', '\x0f', '\x10', '\x11', '\x12', '\x13', '\x14', '\x15',
            '\x16', '\x17', '\x18', '\x19', '\x1a', '\x1b', '\x1c', '\x1d', '\x1e', '\x1f', '\x7f',
        ];

        for &char in &control_chars {
            let test_email = format!("user{}@example.com", char);
            let result = schema.validate(&test_email);
            assert!(
                result.is_err(),
                "Email with control char '0x{:02x}' should be rejected",
                char as u8
            );
        }
    }

    #[test]
    fn test_non_ascii_characters() {
        let schema = email();

        let non_ascii_chars = vec![
            'é', 'ñ', 'ü', 'ß', 'α', 'β', 'γ', 'あ', 'い', 'う', '😀', '🎉',
        ];

        for &char in &non_ascii_chars {
            let test_email = format!("user{}@example.com", char);
            let result = schema.validate(&test_email);
            assert!(result.is_err(), "Email with non-ASCII char '{}' should be rejected", char);
        }
    }

    #[test]
    fn test_length_limits() {
        let schema = email();

        // Test maximum email length (254 characters)
        let long_local = "a".repeat(64);
        // Create a domain with valid labels (max 63 chars each) and proper structure
        // We need: 254 - 64 - 1 = 189 characters for domain
        // Split into valid labels: 63 + 1 (dot) + 63 + 1 (dot) + 61 = 189 characters
        let label1 = "a".repeat(63);
        let label2 = "a".repeat(63);
        let label3 = "a".repeat(61);
        let long_domain = format!("{}.{}.{}", label1, label2, label3);
        let max_length_email = format!("{}@{}", long_local, long_domain);
        assert!(schema.validate(&max_length_email).is_ok(), "Email at max length should be valid");

        // Test email exceeding maximum length
        let too_long_domain = format!("{}a", long_domain);
        let too_long_email = format!("{}@{}.com", long_local, too_long_domain);
        assert!(
            schema.validate(&too_long_email).is_err(),
            "Email exceeding max length should be rejected"
        );
    }

    #[test]
    fn test_local_part_validation() {
        let schema = email();

        let invalid_local_parts = vec![
            "",                       // Empty local part
            ".user@example.com",      // Starts with dot
            "user.@example.com",      // Ends with dot
            "user..name@example.com", // Consecutive dots
            "user name@example.com",  // Contains space
            "user<name@example.com",  // Contains illegal char
            "user(name@example.com",  // Contains illegal char
        ];

        for local_part in invalid_local_parts {
            let test_email = format!("{}@example.com", local_part);
            let result = schema.validate(&test_email);
            assert!(result.is_err(), "Invalid local part '{}' should be rejected", local_part);
        }

        // Test local part that's too long
        let long_local = "a".repeat(65);
        let test_email = format!("{}@example.com", long_local);
        let result = schema.validate(&test_email);
        assert!(result.is_err(), "Local part that's too long should be rejected");
    }

    #[test]
    fn test_domain_part_validation() {
        let schema = email();

        let invalid_domain_parts = vec![
            "",             // Empty domain
            ".example.com", // Starts with dot
            "example.com.", // Ends with dot
            "example..com", // Consecutive dots
            "example com",  // Contains space
            "example<com",  // Contains illegal char
            "example(com",  // Contains illegal char
            "example",      // No TLD
            "example-.com", // Ends with hyphen
            "-example.com", // Starts with hyphen
        ];

        for domain_part in invalid_domain_parts {
            let test_email = format!("user@{}", domain_part);
            let result = schema.validate(&test_email);
            assert!(result.is_err(), "Invalid domain part '{}' should be rejected", domain_part);
        }

        // Test domain part that's too long
        let long_domain = "a".repeat(254);
        let test_email = format!("user@{}", long_domain);
        let result = schema.validate(&test_email);
        assert!(result.is_err(), "Domain part that's too long should be rejected");
    }

    #[test]
    fn test_domain_label_validation() {
        let schema = email();

        let invalid_labels = vec![
            "",           // Empty label
            "-label.com", // Starts with hyphen
            "label-.com", // Ends with hyphen
            "label<.com", // Contains illegal char
            "label(.com", // Contains illegal char
        ];

        for label in invalid_labels {
            let test_email = format!("user@{}", label);
            let result = schema.validate(&test_email);
            assert!(result.is_err(), "Invalid domain label '{}' should be rejected", label);
        }

        // Test domain label that's too long
        let long_label = "a".repeat(64);
        let test_email = format!("user@{}.com", long_label);
        let result = schema.validate(&test_email);
        assert!(result.is_err(), "Domain label that's too long should be rejected");
    }

    #[test]
    fn test_edge_cases() {
        let schema = email();

        let edge_cases = vec![
            "@example.com",           // Missing local part
            "user@",                  // Missing domain
            "user@@example.com",      // Multiple @ symbols
            "user@example@com",       // Multiple @ symbols
            "user@example..com",      // Consecutive dots in domain
            "user..name@example.com", // Consecutive dots in local part
            "user@-example.com",      // Domain label starts with hyphen
            "user@example-.com",      // Domain label ends with hyphen
            "user@example.com-",      // Domain ends with hyphen
            "-user@example.com",      // Local part starts with hyphen
            "user-@example.com",      // Local part ends with hyphen
        ];

        for email in edge_cases {
            let result = schema.validate(email);
            assert!(result.is_err(), "Edge case '{}' should be rejected", email);
        }
    }

    #[test]
    fn test_optional_validation() {
        let schema = email().optional();

        // Empty email should return None when optional
        let result: ValidationResult<Option<String>> = schema.validate("");
        assert!(result.is_ok(), "Empty email should be valid when optional");
        assert_eq!(result.unwrap(), None);

        // Valid email should return Some(email) when optional
        let result: ValidationResult<Option<String>> = schema.validate("user@example.com");
        assert!(result.is_ok(), "Valid email should be valid when optional");
        assert_eq!(result.unwrap(), Some("user@example.com".to_string()));

        // Invalid email should still be rejected
        let result: ValidationResult<Option<String>> = schema.validate("invalid");
        assert!(result.is_err(), "Invalid email should be rejected even when optional");
    }

    #[test]
    fn test_unicode_normalization_attacks() {
        let schema = email();

        // Test for Unicode normalization attacks
        let unicode_attacks = vec![
            "user\u{0300}@example.com", // Combining grave accent
            "user\u{200B}@example.com", // Zero-width space
            "user\u{FEFF}@example.com", // Zero-width no-break space
            "user\u{200C}@example.com", // Zero-width non-joiner
            "user\u{200D}@example.com", // Zero-width joiner
        ];

        for email in unicode_attacks {
            let result = schema.validate(email);
            assert!(result.is_err(), "Unicode attack '{}' should be rejected", email);
        }
    }

    #[test]
    fn test_null_byte_injection() {
        let schema = email();

        let null_byte_emails = vec![
            "user\0@example.com",
            "user@\0example.com",
            "user@example\0.com",
            "\0user@example.com",
        ];

        for email in null_byte_emails {
            let result = schema.validate(email);
            assert!(result.is_err(), "Email with null byte '{}' should be rejected", email);
        }
    }
}
