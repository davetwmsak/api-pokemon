import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pokemon.css';

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchNumber, setSearchNumber] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const totalPokemon = 1010;
        const limit = 100;
        const requests = [];

        for (let i = 0; i < totalPokemon; i += limit) {
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=${limit}`));
        }

        const responses = await Promise.all(requests);
        const allPokemonUrls = responses.flatMap(response => response.data.results.map(pokemon => axios.get(pokemon.url)));
        const allPokemonResponses = await Promise.all(allPokemonUrls);

        setPokemons(allPokemonResponses.map(response => response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('No se pudieron cargar los Pokémon. Inténtalo de nuevo más tarde.');
      }
    };

    fetchPokemons();
  }, []);

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
    setSearchNumber('');
    setCurrentPage(1);
  };

  const handleSearchNumber = (e) => {
    setSearchNumber(e.target.value);
    setSearchName('');
    setCurrentPage(1); 
  };

  const traducirHabilidad = (habilidad) => {
    const habilidadesEnEspanol = {
      'overgrow': 'Espesura',
      'chlorophyll': 'Clorofila',
      'blaze': 'Mar Llamas',
      'solar-power': 'Poder Solar',
      'torrent': 'Torrente',
      'rain-dish': 'Cura Lluvia',
      'shield-dust': 'Polvo Escudo',
      'run-away': 'Fuga',
      'shed-skin': 'Mudar',
      'compound-eyes': 'Ojocompuesto',
      'tinted-lens': 'Cromolente',
      'battle-armor': 'Armadura Batalla',
      'sturdy': 'Robustez',
      'weak-armor': 'Armadura Frágil',
      'rock-head': 'Cabeza Roca',
      'lightning-rod': 'Pararrayos',
      'anger-point': 'Irascible',
      'static': 'Elec. Estática',
      'sand-veil': 'Velo Arena',
      'cute-charm': 'Gran Encanto',
      'magic-guard': 'Muro Mágico',
    };
    return habilidadesEnEspanol[habilidad] || habilidad;
  };

  const traducirTipo = (tipo) => {
    const tiposEnEspanol = {
      'normal': 'Normal',
      'fighting': 'Lucha',
      'flying': 'Volador',
      'poison': 'Veneno',
      'ground': 'Tierra',
      'rock': 'Roca',
      'bug': 'Bicho',
      'ghost': 'Fantasma',
      'steel': 'Acero',
      'fire': 'Fuego',
      'water': 'Agua',
      'grass': 'Planta',
      'electric': 'Eléctrico',
      'psychic': 'Psíquico',
      'ice': 'Hielo',
      'dragon': 'Dragón',
      'dark': 'Siniestro',
      'fairy': 'Hada',
    };
    return tiposEnEspanol[tipo] || tipo;
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    if (searchName) {
      return pokemon.name.toLowerCase().includes(searchName.toLowerCase());
    } else if (searchNumber) {
      return pokemon.id === parseInt(searchNumber, 10);
    } else {
      return true;
    }
  });

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="search-container">
        <input 
          type="text" 
          value={searchName} 
          onChange={handleSearchName} 
          placeholder="Buscar por nombre" 
          className="search-input"
        />
        <input 
          type="number" 
          value={searchNumber} 
          onChange={handleSearchNumber} 
          placeholder="Buscar por número" 
          min="1" 
          className="search-input"
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="pokemon-list">
        {currentPokemons.map(pokemon => (
          <div className="pokemon-card" key={pokemon.id}>
            <span className="pokemon-id">{pokemon.id}</span>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>Altura: {pokemon.height * 10} cm</p>
            <p>Peso: {pokemon.weight / 10} kg</p>
            <p>Habilidades: {pokemon.abilities.map(ability => traducirHabilidad(ability.ability.name)).join(', ')}</p>
            <p>Tipos: {pokemon.types.map(type => traducirTipo(type.type.name)).join(', ')}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredPokemons.length / pokemonsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
