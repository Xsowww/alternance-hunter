import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [domaine, setDomaine] = useState("");
  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmail(res.data.email);
        setPhone(res.data.phone || "");
        setDomaine(res.data.domaine || "");
        setCv(res.data.cv || null);
      })
      .catch(() => setMessage("❌ Erreur chargement du profil."));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("domaine", domaine);
    if (cv && typeof cv !== "string") formData.append("cv", cv);

    try {
      await axios.put("http://localhost:4000/api/user/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Profil mis à jour !");
    } catch {
      setMessage("❌ Erreur lors de la mise à jour.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Mon Profil</h2>
      {message && <p className="text-sm mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-gray-700">Email : {email}</p>
        <input
          type="text"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Domaine recherché"
          value={domaine}
          onChange={(e) => setDomaine(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input type="file" onChange={(e) => setCv(e.target.files[0])} />
        {cv && typeof cv === "string" && (
          <a href={cv} target="_blank" className="text-blue-600 underline block">
            📄 Ouvrir mon CV
          </a>
        )}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default Profile;
