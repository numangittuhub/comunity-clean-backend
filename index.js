import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import issueRoutes from "./routes/issueRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/issues", issueRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Community Server is Running!");
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: "communityDB" })
  .then(() => console.log("📦 MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ DB Connection Failed:", err));

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
