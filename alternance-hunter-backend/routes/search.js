import express from "express";
import axios from "axios";
import { db } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.get("SELECT domaine FROM users WHERE id = ?", [userId], async (err, user) => {
    if (err || !user?.domaine) return res.status(400).json({ message: "Aucun domaine défini." });

    try {
      const serp = await axios.get("https://serpapi.com/search.json", {
        params: {
          engine: "google",
          q: `${user.domaine} alternance entreprise informatique`,
          location: "France",
          api_key: process.env.SERPAPI_KEY,
        },
      });

      const results = serp.data.organic_results || [];
      const companies = results.map((r) => ({
        name: r.title,
        description: r.snippet,
        link: r.link,
      }));

      res.json(companies);
    } catch (e) {
      console.error("❌ SerpAPI error :", e.message);
      res.status(500).json({ message: "Erreur recherche IA." });
    }
  });
});

export default router;
