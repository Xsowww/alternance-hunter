const db = require('../db');

const createUser = (email, password) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password], function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = { createUser, findUserByEmail };
