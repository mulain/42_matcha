use serde::{Deserialize, Serialize};
use strum::{Display, EnumIter, EnumString};

#[derive(Debug, Clone, PartialEq, Display, EnumIter, EnumString, Serialize, Deserialize)]
#[strum(serialize_all = "lowercase")]
pub enum AccountStatus {
    Active,
    Suspended,
    Banned,
}

#[derive(Debug, Clone, PartialEq, Display, EnumIter, EnumString, Serialize, Deserialize)]
#[strum(serialize_all = "lowercase")]
pub enum Gender {
    Male,
    Female,
    Other,
}

#[derive(Debug, Clone, PartialEq, Display, EnumIter, EnumString, Serialize, Deserialize)]
#[strum(serialize_all = "lowercase")]
pub enum SexualPreference {
    Heterosexual,
    Homosexual,
    Bisexual,
}

#[cfg(test)]
mod tests {
    use super::*;
    use strum::IntoEnumIterator;

    #[test]
    fn parses_enum_from_str() {
        assert_eq!("active".parse(), Ok(AccountStatus::Active));
        assert_eq!("suspended".parse(), Ok(AccountStatus::Suspended));
        assert_eq!("banned".parse(), Ok(AccountStatus::Banned));
        assert!("invalid".parse::<AccountStatus>().is_err());
    }

    #[test]
    fn displays_all_values() {
        assert_eq!(AccountStatus::Active.to_string(), "active");
        assert_eq!(AccountStatus::Suspended.to_string(), "suspended");
        assert_eq!(AccountStatus::Banned.to_string(), "banned");
    }

    #[test]
    fn iterates_all_values() {
        let values: Vec<AccountStatus> = AccountStatus::iter().collect();
        assert_eq!(values.len(), 3);
        assert!(values.contains(&AccountStatus::Active));
        assert!(values.contains(&AccountStatus::Suspended));
        assert!(values.contains(&AccountStatus::Banned));
    }
}
