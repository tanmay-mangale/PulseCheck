
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import HeartData
from .predict import make_prediction

app = FastAPI()

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        frontend_url
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Heart Disease API running"}

@app.post("/predict")
def predict(data: HeartData):
    return make_prediction(data.model_dump())
