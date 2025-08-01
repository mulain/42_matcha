-- Create account_status enum
CREATE TYPE account_status AS ENUM ('active', 'suspended', 'banned');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    account_status account_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE,
    
    -- Essential data integrity constraints
    CONSTRAINT users_email_not_empty CHECK (email != ''),
    CONSTRAINT users_username_not_empty CHECK (username != ''),
    CONSTRAINT users_password_hash_not_empty CHECK (password_hash != ''),
    CONSTRAINT users_username_length CHECK (LENGTH(username) >= 3 AND LENGTH(username) <= 50),
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_username ON users(username) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_account_status ON users(account_status) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_created_at ON users(created_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_email_verified ON users(email_verified_at) WHERE deleted_at IS NULL;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE users IS 'Core user data';
COMMENT ON COLUMN users.id IS 'Unique identifier for the user';
COMMENT ON COLUMN users.email IS 'User email address (immutable once set)';
COMMENT ON COLUMN users.username IS 'User display name (immutable once set)';
COMMENT ON COLUMN users.password_hash IS 'Argon2 hashed password';
COMMENT ON COLUMN users.email_verified_at IS 'Timestamp when email was verified';
COMMENT ON COLUMN users.account_status IS 'Current account status';
COMMENT ON COLUMN users.created_at IS 'Account creation timestamp';
COMMENT ON COLUMN users.updated_at IS 'Last update timestamp';
COMMENT ON COLUMN users.deleted_at IS 'Soft delete timestamp (NULL = not deleted)'; 