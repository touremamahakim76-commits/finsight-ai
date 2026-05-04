from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from datetime import datetime

app = FastAPI()

# Autoriser le frontend à communiquer avec le backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Charger le modèle ML
model = joblib.load("../ML/model.pkl")

@app.get("/")
def home():
    return {"message": "Bienvenue sur l'API FinSight AI"}

@app.get("/predict")
def predict(
    type_transaction: str = "depense",
    categorie: int = 1,
    date: str = "2026-05-01"
):
    # transformer revenu/depense en nombre
    type_value = 1 if type_transaction == "revenu" else 0

    # transformer date
    date_value = pd.to_datetime(date).toordinal()

    # créer les données pour prédiction
    data = [[type_value, categorie, date_value]]

    # prédire le montant
    prediction = model.predict(data)[0]

    return {
        "type": type_transaction,
        "categorie_code": categorie,
        "date": date,
        "montant_predit": round(float(prediction), 2)
    }

@app.get("/health")
def health():
    return {"status": "API opérationnelle"}