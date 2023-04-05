const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// replace this string with your full name
const name = "Hyojin Kwak!"

console.log(`My name is ${name}`)

// use this list as your temporary database!
// note that it will reset every time you restart your server
const myPokemon = [{
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58", name: "Pikachu", health: 10, level: 1
}];

router.get('/', function(req, res) {
    // return all pokemon
    res.send(myPokemon);
});

router.post('/', (req, res) => {
    // if the pokemon name already exists in the list, return an error
    // randomly generate an id using UUID ["uuid()"]
    // randomly generate a level between 1 and 10, inclusive, if none is given
    // randomly generate a health between 10 and 100, inclusive, if none is given
    // insert your pokemon into the myPokemon list
    // return a 200
    const pokemon = req.body;
    if (pokemon.name){
        pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    }
    
    for (let obj of myPokemon) {
        if (obj.name == pokemon.name) {
            res.status(403).send('pokemon with the same name already exists');
            return;
        }
    }

    pokemon.id = uuid();
    if (! pokemon.level) {
        pokemon.level = Math.floor(Math.random() * 11);
    }
    if (! pokemon.health) {
        pokemon.health = Math.floor(Math.random() * 101) + 10;
    }
    myPokemon.push(pokemon);
    res.status(200).send('pokemon was added into myPokemon list successfully');
});

router.get('/:pokemonId', function (req, res) {
    // return pokemon if one is found matching the pokemonId
    // return a 404 if no pokemon matches that pokemonId
    const pokeId = req.params.pokemonId; // this should match with the /:pokemonId
    for (let obj of myPokemon) {
        if (obj.id == pokeId) {
            res.send(obj);
            return;
        }
    }
    res.status(404).send('no pokemon matches the pokemonId: ' + pokeId);
});

router.put('/:pokemonId', function(req, res) {
    // update the pokemon matching the pokemonId based on the req body
    // return a 404 if no pokemon matches that pokemonId 
    const pokeId = req.params.pokemonId;
    const pokemon = req.body;
    // capitalize name to compare
    if (pokemon.name){
        pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    }
    //check if id exist in db
    let target;
    for (let obj of myPokemon) {
        if (obj.id == pokeId) {
            target = obj;
        }
    }
    if (target === undefined) {
        res.status(404).send('no pokemon matches the pokemonId: ' + pokeId);
    }
    // if requested name already exists, no update.
    let found = false;
    for (let obj of myPokemon) {
        if (pokemon.name && pokemon.name == obj.name) {
            res.status(400).send('pokemon name already exists in myPokemon');
            found = true;
            return;
        }
    }
    // if name is new name then proceed with the update.
    if (!(found)) {
        if (pokemon.name) {
        target.name = pokemon.name;
    }
    if (pokemon.health) {
        target.health = pokemon.health;
    }
    if (pokemon.level) {
        target.level = pokemon.level;
    }
    res.send('successfully updated your pokemon');
    }
    
})

router.delete('/:pokemonId', function(req, res) {
    // delete pokemon if pokemonId matches the id of one
    const pokeId = req.params.pokemonId;
    //const pokemon = req.body;
    for (let obj of myPokemon) {
        if (obj.id == pokeId) {
            const idx = myPokemon.indexOf(obj);
            myPokemon.splice(idx, 1);
            res.status(200).send('pokemon has been successfully deleted');
            return;
        }
    }
    // return 200 even if no pokemon matches that Id
    res.status(200).send('pokemon has been successfully deleted');
})

module.exports = router;