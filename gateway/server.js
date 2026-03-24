// Gateway Service - Express.js Microservice
// This service acts as the API gateway for the Azure Microservices Demo

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (configure as needed in production)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// ─── Health Check Endpoint ───────────────────────────────────────────────────
// Returns service health status — used by Azure Container Apps health probes
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── Message Endpoint ────────────────────────────────────────────────────────
// Returns a greeting message from the gateway service
app.get("/api/message", (_req, res) => {
  res.json({ message: "Hello from Gateway Service" });
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Gateway service is running on port ${PORT}`);
});
