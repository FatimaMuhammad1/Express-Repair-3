import os

# Delete the invalid merge migration
migration_file = "alembic/versions/17f2fbe51cda_merge_multiple_heads.py"
if os.path.exists(migration_file):
    os.remove(migration_file)
    print(f"Deleted {migration_file}")
else:
    print(f"File {migration_file} not found")
