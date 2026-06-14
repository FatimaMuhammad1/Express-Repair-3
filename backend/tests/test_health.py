from fastapi.testclient import TestClient
from app.main import app


def test_root_health():
    client = TestClient(app)
    res = client.get("/")
    assert res.status_code == 200
    data = res.json()
    assert data.get("success") is True
    assert "version" in data
