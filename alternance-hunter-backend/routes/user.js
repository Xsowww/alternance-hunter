import express from "express";
import multer from "multer";
import { db } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads/"),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.get("/me", authenticateToken, (req, res) => {
  const userId = req.user.id;
  db.get(
    "SELECT email, phone, domaine, cv FROM users WHERE id = ?",
    [userId],
    (err, user) => {
      if (err || !user) return res.status(500).json({ message: "Erreur chargement du profil." });
      user.cv = user.cv ? `http://localhost:4000/uploads/${user.cv}` : null;
      res.json(user);
    }
  );
});

router.put("/update", authenticateToken, upload.single("cv"), (req, res) => {
  const { phone, domaine } = req.body;
  const userId = req.user.id;
  const cv = req.file ? req.file.filename : null;

  db.run(
    "UPDATE users SET phone = ?, domaine = ?, cv = COALESCE(?, cv) WHERE id = ?",
    [phone, domaine, cv, userId],
    (err) => {
      if (err) return res.status(500).json({ message: "Erreur mise à jour." });
      res.json({ message: "✅ Profil mis à jour." });
    }
  );
});

export default router;
