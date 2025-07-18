// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import eventRoutes from "./routes/EventRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

// Root endpoint for debugging
app.get("/", (req, res) => {
  res.json({
    message: "EventMaster API is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.1",
    endpoints: {
      health: "/api/health",
      events: "/api/events",
      auth: "/api/auth",
    },
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.1",
  });
});

// Export the app for Vercel
export default app;

// Start the server - needed for Render and other deployment services
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `MongoDB URI: ${process.env.MONGO_URI ? "Connected" : "Not configured"}`
  );
});
