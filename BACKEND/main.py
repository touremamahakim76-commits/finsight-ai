from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
from pathlib import Path

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR.parent / "ML" / "model.pkl"
DATASET_PATH = BASE_DIR.parent / "ML" / "dataset_transactions_finsight_ai.csv"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load(MODEL_PATH)

@app.get("/")
def home():
    return {"message": "FinSight AI API"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/predict")
def predict(type_transaction: str = "depense", categorie: str = "nourriture", date: str = "2026-05-01"):
    categories = {
        "nourriture": 12,
        "loyer": 11,
        "transport": 18,
        "shopping": 16,
        "loisirs": 10,
        "restaurant": 13,
        "abonnement": 0,
        "salaire": 14,
        "job_etudiant": 9,
        "freelance": 7
    }

    type_value = 1 if type_transaction == "revenu" else 0
    categorie_code = categories.get(categorie, 12)
    date_value = pd.to_datetime(date).toordinal()

    data = [[type_value, categorie_code, date_value]]
    prediction = model.predict(data)[0]

    return {
        "type": type_transaction,
        "categorie": categorie,
        "date": date,
        "montant_predit": round(float(prediction), 2)
    }

@app.get("/dashboard")
def dashboard():
    df = pd.read_csv(DATASET_PATH)

    depenses = df[df["type"] == "depense"]
    revenus = df[df["type"] == "revenu"]

    depenses_par_categorie = (
        depenses.groupby("categorie")["montant"]
        .sum()
        .reset_index()
        .rename(columns={"categorie": "name", "montant": "value"})
        .to_dict(orient="records")
    )

    df["date"] = pd.to_datetime(df["date"])
    df["month"] = df["date"].dt.strftime("%b")

    evolution_data = []

    for month in df["month"].unique():
        mois_df = df[df["month"] == month]

        revenus_total = mois_df[mois_df["type"] == "revenu"]["montant"].sum()
        depenses_total = mois_df[mois_df["type"] == "depense"]["montant"].sum()

        evolution_data.append({
            "month": month,
            "revenus": float(revenus_total),
            "depenses": float(depenses_total)
        })

    total_revenus = float(revenus["montant"].sum())
    total_depenses = float(depenses["montant"].sum())
    solde = total_revenus - total_depenses

    return {
        "total_revenus": round(total_revenus, 2),
        "total_depenses": round(total_depenses, 2),
        "solde": round(solde, 2),
        "depenses_par_categorie": depenses_par_categorie,
        "evolution": evolution_data
    }