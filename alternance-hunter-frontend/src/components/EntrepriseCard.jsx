import axios from "axios";
import { useState, useEffect } from "react";

function EntrepriseCard({ nom, email, description, tel, dejaPostule, onPostulerSuccess }) {
  const [isSubmitted, setIsSubmitted] = useState(dejaPostule);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsSubmitted(dejaPostule);
  }, [dejaPostule]);

  const handlePostuler = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/applications/apply",
        {
          entreprise: nom,
          email,
          description,
          phone: tel,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsSubmitted(true);
      setError(null);
      onPostulerSuccess && onPostulerSuccess();
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Déjà postulé à cette entreprise.");
        setIsSubmitted(true);
      } else {
        setError("Erreur lors de la candidature.");
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-lg animate-fade-in">
      <div className="mb-2">
        <h3 className="text-xl font-bold text-gray-800">{nom}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <p className="text-sm mt-2">📧 {email}</p>
        {tel && <p className="text-sm">📞 {tel}</p>}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        {isSubmitted ? (
          <p className="text-green-600 font-semibold text-sm sm:text-base">✅ Candidature envoyée</p>
        ) : (
          <button
            onClick={handlePostuler}
            className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition-all duration-200"
          >
            📤 Postuler
          </button>
        )}
        {error && <p className="text-red-600 text-xs">{error}</p>}
      </div>
    </div>
  );
}

export default EntrepriseCard;
