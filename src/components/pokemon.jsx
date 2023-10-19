// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [URL] = useState("https://pokeapi.co/api/v2/pokemon/");

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    const promises = [];
    for (let i = 1; i <= 151; i++) {
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
        <button className="normal" onClick={() => filterPokemonByType("all")}>
          All
        </button>
        <button className="fire" onClick={() => filterPokemonByType("fire")}>
          Fire
        </button>
        <button className="water" onClick={() => filterPokemonByType("water")}>Water</button>
        <button className="grass" onClick={() => filterPokemonByType("grass")}>Grass</button>
        <button className="electric" onClick={() => filterPokemonByType("electric")}>electric</button>
        <button className="ice" onClick={() => filterPokemonByType("ice")}>ice</button>
        <button className="fighting" onClick={() => filterPokemonByType("fighting")}>fighting</button>
        <button className="poison" onClick={() => filterPokemonByType("poison")}>poison</button>
        <button className="ground" onClick={() => filterPokemonByType("ground")}>ground</button>
        <button className="flying" onClick={() => filterPokemonByType("flying")}>flying</button>
        <button className="psychic" onClick={() => filterPokemonByType("psychic")}>psychic</button>
        <button className="bug" onClick={() => filterPokemonByType("bug")}>bug</button>
        <button className="rock" onClick={() => filterPokemonByType("rock")}>rock</button>
        <button className="ghost" onClick={() => filterPokemonByType("ghost")}>ghost</button>
        <button className="dark" onClick={() => filterPokemonByType("dark")}>dark</button>
        <button className="dragon" onClick={() => filterPokemonByType("dragon")}>dragon</button>
        <button className="steel" onClick={() => filterPokemonByType("steel")}>steel</button>
        <button className="fairy" onClick={() => filterPokemonByType("fairy")}>fairy</button>
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
