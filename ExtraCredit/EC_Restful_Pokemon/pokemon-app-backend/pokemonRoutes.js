const express = require("express");
const router = express.Router();

// Sample data
let pokemonData = [
  { id: 1, name: "Bulbasaur", type: "Grass" },
  { id: 2, name: "Charmander", type: "Fire" },
  { id: 3, name: "Squirtle", type: "Water" },
];

// PUT: Update a Pokémon by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  const pokemonIndex = pokemonData.findIndex((p) => p.id === parseInt(id));
  if (pokemonIndex === -1) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  if (name) pokemonData[pokemonIndex].name = name;
  if (type) pokemonData[pokemonIndex].type = type;

  res.json({ message: "Pokemon updated", data: pokemonData[pokemonIndex] });
});

// DELETE: Remove a Pokémon by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const pokemonIndex = pokemonData.findIndex((p) => p.id === parseInt(id));
  if (pokemonIndex === -1) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  const removedPokemon = pokemonData.splice(pokemonIndex, 1);
  res.json({ message: "Pokemon deleted", data: removedPokemon });
});

module.exports = router;
