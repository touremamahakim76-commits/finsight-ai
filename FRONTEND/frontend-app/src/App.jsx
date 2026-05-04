import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./App.css";

function App() {
  const [type, setType] = useState("depense");
  const [categorie, setCategorie] = useState("nourriture");
  const [date, setDate] = useState("2026-05-01");

  const [result, setResult] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  const COLORS = ["#0b63ce", "#13a8a8", "#f59e0b", "#ef4444", "#8b5cf6", "#10b981"];

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/dashboard");
      const data = await res.json();
      setDashboard(data);
    } catch (error) {
      console.error("Erreur dashboard :", error);
    }
  };

  const callAPI = async () => {
    setLoading(true);

    const url = `http://127.0.0.1:8000/predict?type_transaction=${type}&categorie=${categorie}&date=${date}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("Erreur : vérifie que le backend FastAPI est lancé.");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div>
          <h2>FinSight AI</h2>
          <p>Finance Intelligence</p>
        </div>

        <nav>
          <span className="active">Dashboard</span>
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
              Analysez vos données financières, visualisez vos dépenses et
              prédisez vos transactions grâce au Machine Learning.
            </p>
          </div>
          <div className="badge">ML Active</div>
        </section>

        <section className="cards">
          <div className="card">
            <span>Total revenus</span>
            <h3>{dashboard ? dashboard.total_revenus : "..."} €</h3>
          </div>

          <div className="card">
            <span>Total dépenses</span>
            <h3>{dashboard ? dashboard.total_depenses : "..."} €</h3>
          </div>

          <div className="card">
            <span>Solde global</span>
            <h3>{dashboard ? dashboard.solde : "..."} €</h3>
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
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
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
              <option value="assurance">Assurance</option>
              <option value="energie">Énergie</option>
              <option value="sante">Santé</option>
            </select>

            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

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
                    <span>Modèle</span>
                    <strong>Régression</strong>
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

        <section className="charts">
          <div className="chart-box">
            <h3>Dépenses par catégorie</h3>

            {dashboard && (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dashboard.depenses_par_categorie}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0b63ce" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="chart-box">
            <h3>Répartition des dépenses</h3>

            {dashboard && (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={dashboard.depenses_par_categorie}
                    dataKey="value"
                    outerRadius={95}
                    label
                  >
                    {dashboard.depenses_par_categorie.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="wide-chart">
          <h3>Évolution revenus / dépenses</h3>

          {dashboard && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboard.evolution}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenus" fill="#13a8a8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="depenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;