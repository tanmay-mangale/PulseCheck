import pandas as pd
from .model import model, scaler, columns


def make_prediction(data):

    row = {
        "Age": data["Age"],
        "RestingBP": data["RestingBP"],
        "Cholesterol": data["Cholesterol"],
        "FastingBS": data["FastingBS"],
        "MaxHR": data["MaxHR"],
        "Oldpeak": data["Oldpeak"],

        "Sex_M": 1 if data["Sex"] == "M" else 0,

        "ChestPainType_ATA": 1 if data["ChestPainType"] == "ATA" else 0,
        "ChestPainType_NAP": 1 if data["ChestPainType"] == "NAP" else 0,
        "ChestPainType_TA": 1 if data["ChestPainType"] == "TA" else 0,

        "RestingECG_Normal": 1 if data["RestingECG"] == "Normal" else 0,
        "RestingECG_ST": 1 if data["RestingECG"] == "ST" else 0,

        "ExerciseAngina_Y": 1 if data["ExerciseAngina"] == "Y" else 0,

        "ST_Slope_Flat": 1 if data["ST_Slope"] == "Flat" else 0,
        "ST_Slope_Up": 1 if data["ST_Slope"] == "Up" else 0,
    }

    # Match the exact training column order
    input_df = pd.DataFrame([row]).reindex(columns=columns)

    # Scale using the already-fitted scaler
    scaled_data = scaler.transform(input_df)

    prediction = int(model.predict(scaled_data)[0])

    probabilities = model.predict_proba(scaled_data)[0]
    class_index = list(model.classes_).index(1)
    probability = float(probabilities[class_index])

    return {
        "prediction": prediction,
        "probability": probability
    }