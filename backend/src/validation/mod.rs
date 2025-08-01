// Core validation types and trait
pub mod core;
pub use core::Validator;

// Individual modules
pub mod email;
pub mod enums;
pub mod number;
pub mod string;
pub mod url;

// Re-export convenience functions
pub use email::email;
pub use enums::enums;
pub use number::number;
pub use string::string;
pub use url::url;
