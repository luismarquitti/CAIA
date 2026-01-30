from fastapi.testclient import TestClient
from main import app
import os

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "online"

def test_read_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_get_file_tree():
    response = client.get("/api/tree")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    # Check if known directories exist
    filenames = [item["name"] for item in data]
    assert "backend" in filenames
    assert "frontend" in filenames
    assert "SPEC.md" in filenames

def test_get_spec_file():
    # Attempt to read SPEC.md
    response = client.get("/api/file/SPEC.md")
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "markdown"
    assert "content" in data
    assert "# **CAIA" in data["content"] or "# CAIA" in data["content"] # Check for title

def test_get_nonexistent_file():
    response = client.get("/api/file/nonexistent_file.xyz")
    assert response.status_code == 404
