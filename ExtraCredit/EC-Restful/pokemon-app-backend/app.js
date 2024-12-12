const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pokemonRoutes = require("./pokemonRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/pokemon", pokemonRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
