import React, { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  const fetchData = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/api/applications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplications(res.data))
      .catch(() => {
        setMessage("❌ Erreur récupération candidatures.");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Supprimer cette candidature ?")) {
      await axios.delete(`http://localhost:4000/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📄 Mes Candidatures</h2>
      {message && <p className="text-red-500">{message}</p>}
      {applications.length === 0 ? (
        <p className="text-gray-600">Aucune candidature enregistrée.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li
              key={app.id}
              className="border p-4 rounded shadow-sm bg-white relative"
            >
              <h3 className="font-semibold">{app.name}</h3>
              <p>{app.description}</p>
              <a href={app.link} target="_blank" className="text-blue-600 underline">
                Voir l’entreprise
              </a>
              <button
                onClick={() => handleDelete(app.id)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyApplications;
