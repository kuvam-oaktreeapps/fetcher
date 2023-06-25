const express = require("express");
const cors = require("cors");
const data = require("./data.json");

const dinos = JSON.parse(JSON.stringify(data));

// Helper function to find a dinosaur by name
function findDinoByName(name) {
  return dinos.find((dino) => dino.name.toLowerCase() === name.toLowerCase());
}

const app = express();

// Middleware
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// GET route to fetch all dinos
app.get("/dinos", (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const take = parseInt(req.query.take) || dinos.length;
  const result = dinos.slice(offset, offset + take);
  res.status(200).json(result);
});

// GET route to fetch one dino
app.get("/dinos/:name", (req, res) => {
  const dinoName = req.params.name;
  const dino = findDinoByName(dinoName);
  if (dino) {
    res.status(200).json(dino);
  } else {
    res.status(404).json({ error: "Dinosaur not found" });
  }
});

// PATCH route to update one dino
app.patch("/dinos/:name", (req, res) => {
  const dinoName = req.params.name;
  const dino = findDinoByName(dinoName);
  if (dino) {
    const updateData = req.body;
    Object.assign(dino, updateData);
    res.status(200).json(dino);
  } else {
    res.status(404).json({ error: "Dinosaur not found" });
  }
});

// DELETE route to delete one dino
app.delete("/dinos/:name", (req, res) => {
  const dinoName = req.params.name;
  const dinoIndex = dinos.findIndex((dino) => dino.name.toLowerCase() === dinoName.toLowerCase());
  if (dinoIndex !== -1) {
    const [deletedDino] = dinos.splice(dinoIndex, 1);
    res.status(200).json(deletedDino);
  } else {
    res.status(404).json({ error: "Dinosaur not found" });
  }
});

// PUT route to create one dino
app.put("/dinos", (req, res) => {
  const newDino = req.body;
  dinos.push(newDino);
  res.status(201).json(newDino);
});

// Handle invalid requests
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
