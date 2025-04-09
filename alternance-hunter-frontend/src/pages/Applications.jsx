import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Applications() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/applications/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApplications(res.data);
    } catch (err) {
      alert("Erreur récupération candidatures");
      navigate("/login");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer cette candidature ?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/applications/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">📋 Mes Candidatures</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 underline"
        >
          ← Retour au Dashboard
        </button>
      </div>

      {applications.length === 0 ? (
        <p className="text-gray-500">Aucune candidature pour le moment.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-4 rounded shadow-md flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold">{app.entreprise}</h2>
                <p className="text-sm text-gray-600">{app.description}</p>
                <p className="text-sm mt-1">📧 {app.email}</p>
                <p className="text-sm">📞 {app.phone}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Postulé le {new Date(app.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <button
                onClick={() => handleDelete(app.id)}
                className="text-red-500 font-bold hover:underline text-sm"
              >
                🗑 Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;
