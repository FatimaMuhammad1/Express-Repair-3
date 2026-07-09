import os
import subprocess

# Delete the invalid merge migration
migration_file = "alembic/versions/17f2fbe51cda_merge_multiple_heads.py"
if os.path.exists(migration_file):
    os.remove(migration_file)
    print(f"Deleted {migration_file}")
else:
    print(f"File {migration_file} not found (may not exist locally)")

# Generate proper merge migration
print("Generating merge migration for heads: 83ea0c6ae92c, change_category_to_string")
result = subprocess.run(
    ["alembic", "merge", "-m", "merge migration branches", "83ea0c6ae92c", "change_category_to_string"],
    capture_output=True,
    text=True
)
print(result.stdout)
if result.stderr:
    print(result.stderr)
