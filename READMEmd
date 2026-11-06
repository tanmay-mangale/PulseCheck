# PulseCheck ❤️
### Heart Disease Prediction System

PulseCheck is a machine learning-powered web application that predicts the presence of heart disease based on user-provided health parameters.

The project uses a **K-Nearest Neighbors (KNN) classification algorithm** to analyze input features and classify them into two categories: heart disease (1) and no heart disease (0).

It combines a React-based frontend with a FastAPI backend to provide an interactive prediction experience.

## ✨ Features

- Heart disease prediction using a trained KNN classifier.
- Interactive form to enter health parameters.
- Data preprocessing using a trained StandardScaler.
- Categorical feature encoding consistent with model training.
- Prediction results with YES/NO classification.
- KNN class voting information.
- REST API built using FastAPI.
- Responsive user interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Python, FastAPI |
| Machine Learning | Scikit-learn, Pandas, NumPy |
| Model | K-Nearest Neighbors (KNN) |
| Preprocessing | StandardScaler |
| Model Storage | Joblib, Pickle |
| Deployment | Vercel, Render |

## 🏗️ Project Structure

```text
PulseCheck/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── model.py
│   │   ├── predict.py
│   │   └── schemas.py
│   │
│   ├── models/
│   │   ├── KNN_heart.pkl
│   │   ├── scaler.pkl
│   │   └── columns.pkl
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── notebooks/
│   └── Heart_Disease_Prediction.ipynb
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tanmay-mangale/PulseCheck
cd PulseCheck
```

### 2. Setup the backend

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

Explore the API documentation:

```text
http://localhost:8000/docs
```

### 3. Setup the frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## 🧠 Machine Learning Workflow

1. Load and explore the heart disease dataset.
2. Perform data preprocessing and categorical encoding.
3. Split the dataset into training and testing sets.
4. Apply feature scaling using StandardScaler.
5. Train a K-Nearest Neighbors classifier.
6. Save the trained model, scaler, and feature columns.
7. Load the saved artifacts in the FastAPI backend.
8. Accept user input and apply the same preprocessing.
9. Generate predictions using the trained KNN model.

### Prediction Classes

| Output | Meaning |
|---|---|
| 0 | No heart disease predicted |
| 1 | Heart disease predicted |

The model uses K = 5 nearest neighbours. Its `predict_proba` output represents the proportion of neighbours voting for each class. It is not a clinically calibrated probability of having heart disease.

## 🔌 API Endpoint

### POST `/predict`

Accepts health parameters and returns a prediction.

Example response:

```json
{
  "prediction": 1,
  "probability": 0.8
}
```

Here, `probability` represents the fraction of the five nearest neighbours voting for class 1, not an individual's medical risk.

## 🚀 Deployment

- **Frontend:** Vercel
- **Backend:** Render

The frontend communicates with the deployed FastAPI backend through the configured API URL.

## ⚠️ Disclaimer

PulseCheck is an educational machine learning project developed for learning and demonstration purposes.

It is not a medical device and must not be used for medical diagnosis, treatment decisions, or assessing an individual's actual risk of heart disease. Always consult a qualified healthcare professional for medical advice.

## 👨‍💻 Author

**Tanmay**

---

⭐ If you find this project interesting, consider giving the repository a star!