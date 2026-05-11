const express = require("express");
const cors = require("cors");
const developers = require("./data/developers.json");
const metricDefinitions = require("./data/metric-definitions.json");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Developer Productivity API is running" });
});

// Get all developers
app.get("/api/developers", (req, res) => {
  res.json(developers);
});

// Get a single developer by ID
app.get("/api/developers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const developer = developers.find((d) => d.id === id);

  if (!developer) {
    return res.status(404).json({ error: "Developer not found" });
  }

  res.json(developer);
});

// Get metric definitions (educational content)
app.get("/api/metrics/definitions", (req, res) => {
  res.json(metricDefinitions);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
