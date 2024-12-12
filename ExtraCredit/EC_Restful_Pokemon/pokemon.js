const express = require('express');
const router = express.Router();
const pokemonDB = [
    {
        id: 1,
        name: 'Pikachu',
        health: 100,
        level: 10,
    },
    {
        id: 2,
        name: 'Charizard',
        health: 200,
        level: 50,
    },
    {
        id: 3,
        name: "Pikachard",
        health: 300,
        level: 99,
    },
]

// http://localhost:3000/api/pokemon/
router.get('/', function(req, res) {
    /*
    http://localhost:3000/api/pokemon/?name=Pika
    req.query = {
        name: 'Pika
    }
    */
    console.log(req.query);
    const nameSearchQuery = req.query.name;
    if(!nameSearchQuery) {
        res.send(pokemonDB);
        return;
    }
    const pokemonResponseList = [];
    for(let i = 0; i < pokemonDB.length; i++) {
        if(pokemonDB[i].name.includes(nameSearchQuery)) {
            pokemonResponseList.push(pokemonDB[i])
        }
    }
    res.send(pokemonResponseList)
})

// http://localhost:3000/api/pokemon/1 => Pikachu
router.get('/:pokemonId', function(req, res) {
    /*
    http://localhost:3000/api/pokemon/1
    req.params = {
        pokemonId: 1,
    }
    */
    console.log(req.params);
    for(let i = 0; i < pokemonDB.length; i++) {
        if(pokemonDB[i].id.toString() === req.params.pokemonId) {
            return res.send(pokemonDB[i]);
        }
    }
    res.status(404)
    res.send("No pokemon with ID " + req.params.pokemonId + " found :(");
})

router.post('/', function(req, res) {
    let health = req.body.health;
    let level = req.body.level;
    const name = req.body.name;
    if(!name) {
        res.status(401);
        return res.send('Some values for new pokemone missing: ' + JSON.stringify(req.body));
    }
    if(!health) {
        health = 100;
    }
    if(!level) {
        level = 1;
    }
    const id = pokemonDB.length + 1;
    const newPokemon = {
        name: name,
        level: level,
        health: health,
        id: id,
    }
    pokemonDB.push(newPokemon);
    res.send("Created new Pokemon with ID "  + id);
})

// PUT route to update a pokemon
router.put('/:pokemonId', function(req, res) {
    const pokemonId = req.params.pokemonId;
    const { name, health, level } = req.body;
    
    if(!name) {
        res.status(401);
        return res.send('Name is required for update: ' + JSON.stringify(req.body));
    }

    for(let i = 0; i < pokemonDB.length; i++) {
        if(pokemonDB[i].id.toString() === pokemonId) {
            pokemonDB[i].name = name;
            pokemonDB[i].health = health || pokemonDB[i].health;
            pokemonDB[i].level = level || pokemonDB[i].level;
            return res.send(pokemonDB[i]);
        }
    }
    
    res.status(404);
    res.send("No pokemon with ID " + pokemonId + " found to update");
})

// DELETE route to remove a pokemon
router.delete('/:pokemonId', function(req, res) {
    const pokemonId = req.params.pokemonId;
    
    for(let i = 0; i < pokemonDB.length; i++) {
        if(pokemonDB[i].id.toString() === pokemonId) {
            const deletedPokemon = pokemonDB.splice(i, 1)[0];
            return res.send({
                message: "Successfully deleted pokemon with ID " + pokemonId,
                deletedPokemon: deletedPokemon
            });
        }
    }
    
    res.status(404);
    res.send("No pokemon with ID " + pokemonId + " found to delete");
})

module.exports = router;