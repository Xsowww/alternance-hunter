import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import appRoutes from "./routes/applications.js";
import searchRoutes from "./routes/search.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // fichiers CV

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/applications", appRoutes);
app.use("/api/search", searchRoutes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
