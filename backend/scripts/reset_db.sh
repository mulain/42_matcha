#!/bin/bash

set -e

if [ -f ../.env ]; then
    DATABASE_URL=$(grep -v '^#' ../.env | grep '^DATABASE_URL=' | cut -d '=' -f2-)
fi

if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL is not set"
    echo "Make sure .env exists and contains DATABASE_URL"
    exit 1
fi

# Extract password for PGPASSWORD
DB_PASS=$(echo "$DATABASE_URL" | sed -n 's/.*:\([^@]*\)@.*/\1/p')
export PGPASSWORD="$DB_PASS"

# Extract database info from URL
DB_NAME=$(echo "$DATABASE_URL" | sed -n 's/.*\/\([^?]*\).*/\1/p')
DB_HOST=$(echo "$DATABASE_URL" | sed -n 's/.*@\([^:]*\):.*/\1/p')
DB_USER=$(echo "$DATABASE_URL" | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')

# Create connection string without database name (to connect to postgres)
BASE_URL=$(echo "$DATABASE_URL" | sed 's/\/[^?]*\([?].*\)\?/\1/')
POSTGRES_URL="postgresql://$DB_USER@$DB_HOST:5432/postgres"

echo "⚠️  WARNING: 
This will destroy the database '$DB_NAME' on '$DB_HOST'"
echo "⚠️  All data will be permanently deleted!"
echo ""
read -p "Are you sure you want to continue? Type 'NUKE' to confirm: " confirm

if [ "$confirm" != "NUKE" ]; then
    echo "❌ Aborted. Database was not destroyed."
    exit 1
fi

# Drop and recreate the database (connect to postgres database to drop target)
echo "Terminating all connections to '$DB_NAME'..."
psql "$POSTGRES_URL" -q -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$DB_NAME' AND pid <> pg_backend_pid();"

echo "Dropping database '$DB_NAME'..."
psql "$POSTGRES_URL" -q -c "DROP DATABASE IF EXISTS $DB_NAME;"

echo "Creating fresh database '$DB_NAME'..."
psql "$POSTGRES_URL" -q -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"

echo "Running setup database migration..."
psql "$DATABASE_URL" -q -f ../migrations/001_create_users_table.sql

echo "✅ Database nuked and recreated successfully."