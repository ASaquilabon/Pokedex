import "./App.css";
import React, { useEffect, useState } from "react";
import PokemonThumbnail from "./PokemonThumbnail";

function App() {
  const [pokemonData, setPokemonData] = useState();
  const [allPokemon, setAllPokemon] = useState([]);
  const [rawData, setRawData] = useState();
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemon = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    setLoadMore(data.next);

    const createPokemonObject = (results) => {
      results.map(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemon((currentList) => [...currentList, data]);
        await allPokemon.sort((a, b) => a.id - b.id);
      });
    };
    createPokemonObject(data.results);
  };
  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <div className="app-container">
      <h1>React Pokèdex</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemon.map((pokemonStats, index) => {
            return (
              <PokemonThumbnail
                key={index}
                id={pokemonStats.id}
                image={pokemonStats.sprites.other.dream_world.front_default}
                name={pokemonStats.name}
                type={pokemonStats.types[0].type.name}
              />
            );
          })}
        </div>
        <button className="load-more" onClick={() => getAllPokemon()}>
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
