import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashed],
    (err) => {
      if (err) {
        return res.status(400).json({ message: "Email déjà utilisé." });
      }
      res.json({ message: "✅ Compte créé." });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Utilisateur invalide." });
    }

    if (!user.password) {
      return res.status(500).json({ message: "Mot de passe manquant en BDD." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(403).json({ message: "Mot de passe incorrect." });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  });
});

export default router;
