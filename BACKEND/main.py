from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR.parent / "ML" / "model.pkl"

# Autoriser le frontend à communiquer avec le backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Charger le modèle ML
model = joblib.load(MODEL_PATH)

@app.get("/")
def home():
    return {"message": "Bienvenue sur l'API FinSight AI"}

@app.get("/predict")
def predict(
    type_transaction: str = "depense",
    categorie: str = "nourriture",
    date: str = "2026-05-01"
):
    categories = {
        "abonnement": 0,
        "aide_familiale": 1,
        "assurance": 2,
        "banque": 3,
        "bourse": 4,
        "energie": 5,
        "formation": 6,
        "freelance": 7,
        "fournitures": 8,
        "job_etudiant": 9,
        "loisirs": 10,
        "loyer": 11,
        "nourriture": 12,
        "restaurant": 13,
        "salaire": 14,
        "sante": 15,
        "shopping": 16,
        "telephone": 17,
        "transport": 18
    }

    type_transaction = type_transaction.lower()
    categorie = categorie.lower()
    type_value = 1 if type_transaction == "revenu" else 0
    categorie_code = categories.get(categorie, categories["nourriture"])
    date_value = pd.to_datetime(date).toordinal()

    data = [[type_value, categorie_code, date_value]]
    prediction = model.predict(data)[0]

    return {
        "type": type_transaction,
        "categorie": categorie,
        "categorie_code": categorie_code,
        "date": date,
        "montant_predit": round(float(prediction), 2)
    }

@app.get("/health")
def health():
    return {"status": "API opérationnelle"}