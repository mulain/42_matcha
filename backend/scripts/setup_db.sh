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
echo "Setting up Matcha Backend Database..."

psql "$DATABASE_URL" -q -f ../migrations/001_create_users_table.sql

echo "✅ Database setup complete."
