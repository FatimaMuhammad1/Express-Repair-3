#!/usr/bin/env bash
set -euo pipefail

echo "Seeding database..."
cd "$(dirname "$0")"
python seed.py
echo "Seeding complete."
