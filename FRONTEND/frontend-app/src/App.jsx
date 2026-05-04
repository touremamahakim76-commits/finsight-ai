import { useState } from "react";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const callAPI = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/predict");
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>FinSight AI 💰</h1>
        <p style={styles.subtitle}>
          Plateforme intelligente d’analyse financière avec Machine Learning
        </p>

        <div style={styles.infoBox}>
          <h3>Objectif</h3>
          <p>
            FinSight AI analyse les données financières afin de prédire des
            transactions futures et aider à la prise de décision.
          </p>
        </div>

        <button onClick={callAPI} style={styles.button}>
          {loading ? "Analyse en cours..." : "Tester la prédiction ML"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h2>Résultat de prédiction</h2>

            <div style={styles.grid}>
              <div style={styles.stat}>
                <span>Type</span>
                <strong>{result.type}</strong>
              </div>

              <div style={styles.stat}>
                <span>Catégorie</span>
                <strong>{result.categorie_code}</strong>
              </div>

              <div style={styles.stat}>
                <span>Date</span>
                <strong>{result.date}</strong>
              </div>

              <div style={styles.stat}>
                <span>Montant prédit</span>
                <strong>{result.montant_predit} €</strong>
              </div>
            </div>

            <p style={styles.explanation}>
              Cette prédiction est générée par un modèle de Machine Learning
              entraîné sur un dataset de transactions financières.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "850px",
    background: "white",
    padding: "40px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    marginBottom: "10px",
    color: "#102a43",
  },
  subtitle: {
    fontSize: "18px",
    color: "#627d98",
    marginBottom: "30px",
  },
  infoBox: {
    background: "#eef6ff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    color: "#243b53",
  },
  button: {
    padding: "14px 28px",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    background: "#0b63ce",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  resultBox: {
    marginTop: "30px",
    padding: "25px",
    borderRadius: "14px",
    background: "#f8fafc",
    border: "1px solid #d9e2ec",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
    marginTop: "20px",
  },
  stat: {
    background: "white",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  explanation: {
    marginTop: "20px",
    color: "#627d98",
  },
};

export default App;