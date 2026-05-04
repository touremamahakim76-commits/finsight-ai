# Architecture technique — FinSight AI

## 1. Vue globale

FinSight AI repose sur une architecture web composée de quatre parties principales :

- Frontend : interface utilisateur
- Backend : API et logique métier
- Base de données : stockage des utilisateurs et transactions
- Module Machine Learning : prédiction et détection d’anomalies

## 2. Schéma d’architecture

Utilisateur
↓
Frontend React.js
↓
Backend FastAPI
↓
Base de données MySQL / PostgreSQL
↓
Module Machine Learning Python

## 3. Frontend

Le frontend sera développé avec React.js.

Il permettra à l’utilisateur de :

- se connecter
- ajouter ses transactions
- consulter son dashboard
- visualiser les prédictions
- consulter les anomalies détectées

## 4. Backend

Le backend sera développé avec FastAPI.

Il aura pour rôle de :

- gérer les requêtes du frontend
- gérer l’authentification
- enregistrer les transactions
- communiquer avec la base de données
- appeler les modèles Machine Learning

## 5. Base de données

La base de données stockera :

- les utilisateurs
- les transactions
- les prédictions
- les anomalies
- les recommandations

## 6. Module Machine Learning

Le module ML sera développé en Python avec Scikit-learn.

Deux modèles seront utilisés :

- prédiction de trésorerie
- détection d’anomalies financières

## 7. Flux de fonctionnement

1. L’utilisateur se connecte
2. Il ajoute ses revenus et dépenses
3. Les données sont stockées en base
4. Le backend appelle le module ML
5. Le modèle prédit le solde futur
6. Le modèle détecte les anomalies
7. Le frontend affiche les résultats