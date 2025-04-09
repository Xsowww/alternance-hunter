import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
        Alternance Hunter
      </h1>
      {isLoggedIn && (
        <div className="flex gap-4">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/my-applications")}>Candidatures</button>
          <button onClick={() => navigate("/profile")}>Profil</button>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-600">
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
