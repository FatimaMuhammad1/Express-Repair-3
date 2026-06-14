#!/usr/bin/env bash
set -euo pipefail

echo "Running alembic migrations..."
if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is not set. Please set it or source backend/.env"
  exit 1
fi

cd "$(dirname "$0")"
alembic upgrade head
echo "Migrations applied."
