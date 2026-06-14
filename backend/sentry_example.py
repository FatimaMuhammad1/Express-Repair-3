"""
Sentry initialization example for backend. Configure SENTRY_DSN in environment.
"""
import os
import sentry_sdk

def init_sentry():
    dsn = os.environ.get("SENTRY_DSN")
    if not dsn:
        return
    sentry_sdk.init(dsn=dsn)

if __name__ == "__main__":
    init_sentry()
    print("Sentry initialized (if SENTRY_DSN set)")
