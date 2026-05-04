# Base de données — FinSight AI

## 1. Objectif

La base de données permet de stocker les informations nécessaires au fonctionnement de FinSight AI.

Elle stocke les utilisateurs, les transactions, les prédictions, les anomalies et les recommandations.

## 2. Tables principales

## Table users

| Champ | Type | Description |
|---|---|---|
| id | integer | identifiant utilisateur |
| name | varchar | nom de l’utilisateur |
| email | varchar | email |
| password_hash | varchar | mot de passe sécurisé |
| created_at | datetime | date de création |

## Table transactions

| Champ | Type | Description |
|---|---|---|
| id | integer | identifiant transaction |
| user_id | integer | utilisateur lié |
| type | varchar | revenu ou dépense |
| category | varchar | catégorie |
| amount | float | montant |
| description | varchar | description |
| date | date | date de transaction |

## Table predictions

| Champ | Type | Description |
|---|---|---|
| id | integer | identifiant prédiction |
| user_id | integer | utilisateur lié |
| predicted_balance | float | solde prédit |
| risk_level | varchar | faible, moyen ou élevé |
| prediction_date | date | date de prédiction |

## Table anomalies

| Champ | Type | Description |
|---|---|---|
| id | integer | identifiant anomalie |
| user_id | integer | utilisateur lié |
| transaction_id | integer | transaction concernée |
| anomaly_score | float | score d’anomalie |
| message | varchar | explication |
| created_at | datetime | date de détection |

## Table recommendations

| Champ | Type | Description |
|---|---|---|
| id | integer | identifiant recommandation |
| user_id | integer | utilisateur lié |
| message | text | conseil généré |
| priority | varchar | priorité |
| created_at | datetime | date de création |

## 3. Relations

- un utilisateur peut avoir plusieurs transactions
- un utilisateur peut avoir plusieurs prédictions
- une transaction peut être liée à une anomalie
- un utilisateur peut recevoir plusieurs recommandations