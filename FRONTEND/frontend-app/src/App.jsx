import { useState } from "react";
import "./App.css";

function App() {
  const [type, setType] = useState("depense");
  const [categorie, setCategorie] = useState("nourriture");
  const [date, setDate] = useState("2026-05-01");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const callAPI = async () => {
    setLoading(true);
    const url = `http://127.0.0.1:8000/predict?type_transaction=${type}&categorie=${categorie}&date=${date}`;
    const res = await fetch(url);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>FinSight AI</h2>
        <p>Finance Intelligence</p>
        <nav>
          <span>Dashboard</span>
          <span>Prédiction</span>
          <span>Analyse</span>
          <span>Rapports</span>
        </nav>
      </aside>

      <main className="main">
        <section className="hero">
          <div>
            <h1>Dashboard financier intelligent</h1>
            <p>
              Analysez vos données financières, prédisez vos transactions et
              améliorez vos décisions grâce au Machine Learning.
            </p>
          </div>
          <div className="badge">ML Active</div>
        </section>

        <section className="cards">
          <div className="card">
            <span>Revenus estimés</span>
            <h3>1 850 €</h3>
          </div>
          <div className="card">
            <span>Dépenses estimées</span>
            <h3>920 €</h3>
          </div>
          <div className="card">
            <span>Solde projeté</span>
            <h3>930 €</h3>
          </div>
        </section>

        <section className="panel">
          <div className="form-box">
            <h2>Prédiction Machine Learning</h2>

            <label>Type de transaction</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="depense">Dépense</option>
              <option value="revenu">Revenu</option>
            </select>

            <label>Catégorie</label>
            <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
              <option value="nourriture">Nourriture</option>
              <option value="loyer">Loyer</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="loisirs">Loisirs</option>
              <option value="restaurant">Restaurant</option>
              <option value="abonnement">Abonnement</option>
              <option value="salaire">Salaire</option>
              <option value="job_etudiant">Job étudiant</option>
              <option value="freelance">Freelance</option>
            </select>

            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <button onClick={callAPI}>
              {loading ? "Analyse en cours..." : "Lancer la prédiction"}
            </button>
          </div>

          <div className="result-box">
            <h2>Résultat IA</h2>

            {!result && (
              <p className="empty">
                Lance une prédiction pour afficher le résultat du modèle.
              </p>
            )}

            {result && (
              <>
                <div className="result-main">
                  <span>Montant prédit</span>
                  <h1>{result.montant_predit} €</h1>
                </div>

                <div className="result-grid">
                  <div>
                    <span>Type</span>
                    <strong>{result.type}</strong>
                  </div>
                  <div>
                    <span>Catégorie</span>
                    <strong>{result.categorie}</strong>
                  </div>
                  <div>
                    <span>Date</span>
                    <strong>{result.date}</strong>
                  </div>
                  <div>
                    <span>Code ML</span>
                    <strong>{result.categorie_code}</strong>
                  </div>
                </div>

                <p className="explain">
                  Le modèle analyse le type, la catégorie et la date afin de
                  prédire un montant probable à partir du dataset financier.
                </p>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;