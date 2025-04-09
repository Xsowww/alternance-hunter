// resetUser.js
import { db } from './db.js';

// ✅ Remplace cette adresse par celle que tu veux supprimer
const emailToDelete = 'test1@email.com';

db.run("DELETE FROM users WHERE email = ?", [emailToDelete], (err) => {
  if (err) {
    console.error("❌ Erreur suppression :", err.message);
  } else {
    console.log(`✅ Utilisateur ${emailToDelete} supprimé avec succès`);
    process.exit(0);
  }
});
