from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import artifacts

app = FastAPI(title="CAIA API", version="0.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(artifacts.router)

@app.get("/")
def read_root():
    return {"status": "online", "system": "CAIA - Central de Artefatos de IA"}

@app.get("/health")
def health_check():
    """
    RF 3.1.1: Health check simples para validar operação local.
    """
    return {"status": "ok"}