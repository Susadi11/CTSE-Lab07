// Gateway Service - Weather Dashboard API
// This service acts as the backend for the Azure Microservices Demo

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (configure as needed in production)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// ─── Mock Data ───────────────────────────────────────────────────────────────
const weatherData = {
  cities: [
    { city: "Colombo", temp: 30, condition: "Sunny" },
    { city: "Kandy", temp: 25, condition: "Cloudy" },
    { city: "Galle", temp: 28, condition: "Rainy" }
  ]
};

// ─── Health Check Endpoint ───────────────────────────────────────────────────
// Returns service health status — used by Azure Container Apps health probes
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── Weather Data Endpoints ──────────────────────────────────────────────────

// Get list of all weather data
app.get("/api/weather", (_req, res) => {
  res.json(weatherData.cities);
});

// Get weather for a specific city
app.get("/api/weather/:city", (req, res) => {
  const city = weatherData.cities.find(
    c => c.city.toLowerCase() === req.params.city.toLowerCase()
  );
  if (city) {
    res.json(city);
  } else {
    res.status(404).json({ error: "City not found" });
  }
});

// ─── Service Info Endpoint ───────────────────────────────────────────────────
// Returns information about this microservice
app.get("/api/info", (_req, res) => {
  res.json({
    service: "Weather Gateway",
    version: "1.0.0",
    description: "API Gateway for Weather Dashboard Microservice"
  });
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Weather Gateway service is running on port ${PORT}`);
});
