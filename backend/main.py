from fastapi import FastAPI

app = FastAPI(title="CAIA API", version="0.1.0")

@app.get("/")
def read_root():
    return {"status": "online", "system": "CAIA - Central de Artefatos de IA"}

@app.get("/health")
def health_check():
    """
    RF 3.1.1: Health check simples para validar operação local.
    """
    return {"status": "ok"}