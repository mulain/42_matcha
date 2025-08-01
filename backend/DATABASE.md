# Database Setup for Matcha Backend

## Overview

The database uses PostgreSQL without an ORM.

## Users Table Design

### Core Fields (Immutable)
- `id`: UUID primary key (immutable)
- `email`: User email address (immutable once set)
- `username`: Display name (immutable once set)

### Security & Authentication
- `password_hash`: Argon2 hashed password
- `email_verified_at`: Timestamp when email was verified
- `account_status`: Enum (active, suspended, banned, deleted)

### Metadata
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp (auto-updated)
- `deleted_at`: Soft delete timestamp (NULL = not deleted)

## Best Practices Implemented

### Immutable Core Fields
- Email and username cannot be changed once set
- Prevents confusion and maintains data integrity

### Soft Deletes
- Users are never permanently deleted
- `deleted_at` field for soft deletion
- All queries filter out soft-deleted records

### Proper Indexing
- Indexes on frequently queried fields
- Partial indexes that exclude soft-deleted records
- Optimized for performance

### Data Validation
- Database-level constraints for basic integrity
- Email format validation as fallback
- Username length constraints (3-50 characters)
- Non-empty field constraints
- Main validation is handled by the backend. Only enforces basic integrity at the db level



## Ready for Future Extensions

The users table is designed as the foundation for:
- User profiles (separate table)
- User photos (separate table)
- User preferences (separate table)
- User locations (separate table)
- User verification (separate table)

All related tables will reference `users.id` as foreign keys.

## Setup Instructions

### Prerequisites
- PostgreSQL installed and running
- Access to create databases and users

### 1. Create Database and User

**Option A: Using existing postgres user**
```bash
sudo -u postgres psql
```

```sql
ALTER USER postgres WITH PASSWORD 'password';
CREATE DATABASE matcha_db OWNER postgres;
\q
```

**Option B: Create new user**
```bash
sudo -u postgres psql
```

```sql
CREATE USER postgres WITH PASSWORD 'password' SUPERUSER;
CREATE DATABASE matcha_db OWNER postgres;
\q
```

### 2. Configure Environment

Create or update `.env` file in the project root:
```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/matcha_db
```

### 3. Run Database Setup
```bash
cd backend
./scripts/setup_db.sh
```

### 4. Verify Setup
```bash
cargo check
```

## Migration Strategy

The users table is designed to be **migration-free**:
- Contains only core fields (id, email, username, etc.)
- New fields should be added via new tables
- Soft deletes prevent data loss

## Performance Considerations

- Indexes on frequently queried fields
- Partial indexes exclude soft-deleted records
- UUID primary keys for distributed systems
