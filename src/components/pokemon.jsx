/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// @ts-nocheck

import React, { useEffect, useState } from "react";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [URL] = useState("https://pokeapi.co/api/v2/pokemon/");
  const pokemonTypes = [
    "all", "fire", "water", "grass", "electric", "ice", "fighting",
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
    "dark", "dragon", "steel", "fairy"
  ];

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    const promises = [];
    for (let i = 1; i <= 251; i++) {
      promises.push(fetch(URL + i).then((response) => response.json()));
    }

    Promise.all(promises).then((data) => {
      setPokemonList(data);
      setFilteredPokemonList(data);
    });
  };

  const filterPokemonByType = (type) => {
    if (type === "all") {
      setFilteredPokemonList(pokemonList);
    } else {
      const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.types.some((pokemonType) => pokemonType.type.name === type),
      );
      setFilteredPokemonList(filteredPokemon);
    }
  };

  return (
    <div>
      <div>
        {pokemonTypes.map((type) => (
          <button
            key={type}
            className={type}
            onClick={() => filterPokemonByType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div id="listaPokemon" className="pokemon-todos">
        {filteredPokemonList.map((poke) => {
          let tipos = poke.types.map((type) => (
            <p key={type.type.name} className={`${type.type.name} tipo`}>
              {type.type.name}
            </p>
          ));

          let pokeId = poke.id.toString().padStart(3, "0");

          return (
            <div key={poke.id} className="pokemon">
              <p className="pokemon-id-back">#{pokeId}</p>
              <div className="pokemon-imagen">
                <img
                  src={poke.sprites.other["official-artwork"].front_default}
                  alt={poke.name}
                />
              </div>
              <div className="pokemon-info">
                <div className="nombre-contenedor">
                  <p className="pokemon-id">#{pokeId}</p>
                  <h2 className="pokemon-nombre">{poke.name}</h2>
                </div>
                <div className="pokemon-tipos">{tipos}</div>
                <div className="pokemon-stats">
                  <p className="stat">{poke.height}m</p>
                  <p className="stat">{poke.weight}kg</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pokemon;
