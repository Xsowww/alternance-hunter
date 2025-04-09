import express from "express";
import { db } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.all("SELECT * FROM applications WHERE user_id = ?", [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "Erreur récupération candidatures." });
    res.json(rows);
  });
});

router.post("/", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { name, description, link } = req.body;

  db.run(
    "INSERT INTO applications (user_id, name, description, link) VALUES (?, ?, ?, ?)",
    [userId, name, description, link],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur ajout candidature." });
      res.json({ message: "✅ Candidature enregistrée." });
    }
  );
});

router.delete("/:id", authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.run(
    "DELETE FROM applications WHERE id = ? AND user_id = ?",
    [req.params.id, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur suppression candidature." });
      res.json({ message: "✅ Supprimée." });
    }
  );
});

export default router;
