use strum::{Display, EnumIter, EnumString};

#[derive(Debug, Clone, PartialEq, Display, EnumIter, EnumString)]
#[strum(serialize_all = "lowercase")]
pub enum Environment {
    Development,
    Production,
    Test,
}

#[cfg(test)]
mod tests {
    use super::*;
    use strum::IntoEnumIterator;

    #[test]
    fn parses_enum_from_str() {
        assert_eq!("development".parse(), Ok(Environment::Development));
        assert_eq!("production".parse(), Ok(Environment::Production));
        assert_eq!("test".parse(), Ok(Environment::Test));
        assert!("invalid".parse::<Environment>().is_err());
    }

    #[test]
    fn displays_all_values() {
        assert_eq!(Environment::Development.to_string(), "development");
        assert_eq!(Environment::Production.to_string(), "production");
        assert_eq!(Environment::Test.to_string(), "test");
    }

    #[test]
    fn iterates_all_values() {
        let values: Vec<Environment> = Environment::iter().collect();
        assert_eq!(values.len(), 3);
        assert!(values.contains(&Environment::Development));
        assert!(values.contains(&Environment::Production));
        assert!(values.contains(&Environment::Test));
    }


} 