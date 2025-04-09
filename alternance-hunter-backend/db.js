import Database from 'better-sqlite3';
const db = new Database('database.db');

// 🧑 USERS
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    phone TEXT,
    cv TEXT,
    domaine TEXT
  )
`);

// 📄 APPLICATIONS
db.run(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    description TEXT,
    link TEXT
  )
`);

export { db };
