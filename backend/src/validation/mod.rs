// Core validation types and trait
pub mod core;
pub use core::{Schema, ValidationError, ValidationResult};

// Individual schema modules
pub mod email;
pub mod enum_schema;
pub mod number;
pub mod string;
pub mod url;

// Re-export convenience functions and schemas
pub use email::{email, EmailSchema};
pub use enum_schema::enum_value;
pub use number::{number, NumberSchema};
pub use string::{string, StringSchema};
pub use url::{url, UrlSchema};
