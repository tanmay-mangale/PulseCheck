from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import HeartData
from .predict import make_prediction

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Heart Disease API running"}

@app.post("/predict")
def predict(data: HeartData):
    return make_prediction(data.model_dump())