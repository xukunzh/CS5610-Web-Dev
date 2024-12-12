import React, { useState } from "react";

const PokemonManager = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const updatePokemon = async () => {
    try {
      const response = await fetch(`http://localhost:3000/pokemon/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type }),
      });
      const data = await response.json();
      console.log("Update Response:", data);
      alert(`Pokemon Updated: ${JSON.stringify(data.data)}`);
    } catch (error) {
      console.error("Error updating Pokemon:", error);
      alert("Failed to update Pokemon!");
    }
  };

  const deletePokemon = async () => {
    try {
      const response = await fetch(`http://localhost:3000/pokemon/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log("Delete Response:", data);
      alert(`Pokemon Deleted: ${JSON.stringify(data.data)}`);
    } catch (error) {
      console.error("Error deleting Pokemon:", error);
      alert("Failed to delete Pokemon!");
    }
  };

  return (
    <div>
      <h2>Manage Pokemon</h2>
      <input
        type="text"
        placeholder="Enter ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <button onClick={updatePokemon}>Update Pokemon</button>
      <button onClick={deletePokemon}>Delete Pokemon</button>
    </div>
  );
};

export default PokemonManager;
