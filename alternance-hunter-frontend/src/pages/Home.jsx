import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/auth/register", {
        email,
        password,
      });
      setMessage("✅ Compte créé ! Connecte-toi.");
      navigate("/login");
    } catch (err) {
      setMessage("❌ " + err.response?.data?.message || "Erreur.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      {message && <p className="text-sm mb-2">{message}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Créer un compte
        </button>
        <button
          type="button"
          className="w-full text-blue-600 underline"
          onClick={() => navigate("/login")}
        >
          J’ai déjà un compte
        </button>
      </form>
    </div>
  );
}

export default Home;
