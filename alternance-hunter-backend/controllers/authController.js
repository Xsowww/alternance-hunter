const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email et mot de passe requis" });

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.run(query, [email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ message: "Erreur lors de l'inscription", error: err.message });
    }
    res.status(201).json({ message: "Compte créé avec succès", userId: this.lastID });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.get(query, [email], (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.json({ message: "Connexion réussie", token });
  });
};

module.exports = { register, login };
