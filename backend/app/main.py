import sys
import os

# Add backend directory to sys.path so `app` module resolves when running `python app/main.py`
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.endpoints import router as api_router
from app.database.seed import seed_db

app = FastAPI(
    title="AgriVision API",
    description="Multilingual AI-Powered Precision Agriculture Platform Backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists and serve static files
os.makedirs("./static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include API routes
app.include_router(api_router, prefix="/api")

@app.on_event("startup")
def on_startup():
    seed_db()

@app.get("/")
def root():
    return {
        "app": "AgriVision AI Platform API",
        "status": "online",
        "docs": "/docs",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
