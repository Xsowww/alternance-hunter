import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/api/search", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCompanies(res.data))
      .catch((err) => {
        console.error("❌ ERREUR IA :", err);
        setMessage("❌ Erreur chargement entreprises IA.");
      });
  }, []);

  const handleApply = async (company) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:4000/api/applications", company, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Candidature enregistrée !");
    } catch {
      alert("❌ Erreur lors de la candidature.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🔎 Suggestions IA</h2>
      {message && <p className="text-red-500">{message}</p>}
      {companies.length === 0 ? (
        <p className="text-gray-600">Aucune entreprise suggérée pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {companies.map((c, i) => (
            <li key={i} className="border p-4 rounded bg-white">
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm">{c.description}</p>
              <a href={c.link} target="_blank" className="text-blue-600 underline">
                Voir l’entreprise
              </a>
              <button
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                onClick={() => handleApply(c)}
              >
                Postuler
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
