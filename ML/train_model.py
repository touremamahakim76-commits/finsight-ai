import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Charger dataset
df = pd.read_csv("dataset_transactions_finsight_ai.csv")

# Convertir type
df["type"] = df["type"].map({"revenu": 1, "depense": 0})

# Convertir catégorie
df["categorie"] = df["categorie"].astype("category").cat.codes

# Convertir date
df["date"] = pd.to_datetime(df["date"])
df["date"] = df["date"].map(pd.Timestamp.toordinal)

# Variables (on utilise aussi le solde)
X = df[["type", "categorie", "date"]]
y = df["montant"]

# Modèle
model = LinearRegression()
model.fit(X, y)

# Sauvegarde
joblib.dump(model, "model.pkl")

print("Modèle entraîné avec succès ✅")