import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

model = joblib.load(MODEL_DIR / "KNN_heart.pkl")
scaler = joblib.load(MODEL_DIR / "scaler.pkl")
columns = joblib.load(MODEL_DIR / "columns.pkl")