# Celery & Redis Setup Guide

This guide explains how to set up and run Celery with Redis for background tasks in the Electronics Repair Shop application.

## Prerequisites

- Redis server installed and running
- Python dependencies installed (see requirements.txt)

## Installation

### 1. Install Redis

**Windows:**
```bash
# Download Redis for Windows from https://github.com/microsoftarchive/redis/releases
# Or use WSL2 with Linux Redis
```

**macOS:**
```bash
brew install redis
brew services start redis
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### 2. Verify Redis is Running

```bash
redis-cli ping
# Should return: PONG
```

## Configuration

Redis is already configured in `.env`:
```
REDIS_URL=redis://localhost:6379/0
```

## Running Celery Workers

### Start the Celery Worker

In the backend directory:

```bash
# Terminal 1: Start the FastAPI server
uvicorn app.main:app --reload

# Terminal 2: Start the Celery worker
celery -A app.worker.celery_app worker --loglevel=info

# Terminal 3 (Optional): Start Celery beat for scheduled tasks
celery -A app.worker.celery_app beat --loglevel=info
```

### Production Deployment

For production, use a process manager like Supervisor or systemd:

**Using Supervisor:**

Create `/etc/supervisor/conf.d/celery_worker.conf`:
```ini
[program:celery_worker]
command=/path/to/venv/bin/celery -A app.worker.celery_app worker --loglevel=info
directory=/path/to/backend
user=www-data
numprocs=1
autostart=true
autorestart=true
startsecs=10
stopwaitsecs=600
stdout_logfile=/var/log/celery/worker.log
stderr_logfile=/var/log/celery/worker_error.log
```

**Using systemd:**

Create `/etc/systemd/system/celery.service`:
```ini
[Unit]
Description=Celery Worker
After=network.target

[Service]
Type=forking
User=www-data
Group=www-data
WorkingDirectory=/path/to/backend
ExecStart=/path/to/venv/bin/celery -A app.worker.celery_app worker --loglevel=info --logfile=/var/log/celery/worker.log --pidfile=/var/run/celery/worker.pid
Restart=always

[Install]
WantedBy=multi-user.target
```

## Monitoring Celery

### Flower (Celery Monitoring Tool)

Install Flower:
```bash
pip install flower
```

Run Flower:
```bash
celery -A app.worker.celery_app flower --port=5555
```

Access Flower at: http://localhost:5555

### Check Worker Status

```bash
celery -A app.worker.celery_app inspect active
celery -A app.worker.celery_app inspect registered
celery -A app.worker.celery_app inspect stats
```

## Background Tasks

The application currently uses Celery for:

1. **SMS Sending** (`send_sms_task`) - Sends SMS via Telnyx
2. **Email Sending** (`send_email_task`) - Sends emails via SMTP
3. **WhatsApp Sending** (`send_whatsapp_task`) - Sends WhatsApp messages

## Troubleshooting

### Redis Connection Issues

If you see connection errors:
1. Verify Redis is running: `redis-cli ping`
2. Check the REDIS_URL in `.env`
3. Ensure Redis is accessible from your application

### Tasks Not Executing

1. Check Celery worker logs for errors
2. Verify tasks are registered: `celery -A app.worker.celery_app inspect registered`
3. Check if tasks are being sent to the correct queue

### Task Failures

1. Check Celery worker logs
2. Verify task dependencies (Telnyx API key, SMTP settings)
3. Test tasks manually in Python shell:
```python
from app.worker import send_email_task
result = send_email_task.delay("test@example.com", "Test Subject", "Test message")
print(result.id)
```

## Security Notes

- In production, use Redis password authentication
- Use TLS/SSL for Redis connections
- Keep Celery broker URL secure
- Use environment variables for sensitive configuration

## Performance Tips

- Adjust worker concurrency based on your needs: `--concurrency=4`
- Use task routing for different task types
- Implement task rate limiting for external APIs
- Monitor Celery memory usage
