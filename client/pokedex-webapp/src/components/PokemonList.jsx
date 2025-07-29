import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Pokemon {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState < Pokemon[] > ([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
                const pokemonDetails = await Promise.all(
                    response.data.results.map(async (result: any) => {
                        const details = await axios.get(result.url);
                        return {
                            id: details.data.id,
                            name: details.data.name,
                            types: details.data.types.map((type: any) => type.type.name),
                            sprite: details.data.sprites.front_default
                        };
                    })
                );
                setPokemons(pokemonDetails);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Pokemon data', error);
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-pokedex-red"></div>
            </div>
        );
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search Pokémon..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredPokemons.map(pokemon => (
                    <Link
                        to={`/pokemon/${pokemon.id}`}
                        key={pokemon.id}
                        className="bg-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition"
                    >
                        <img
                            src={pokemon.sprite}
                            alt={pokemon.name}
                            className="mx-auto w-32 h-32"
                        />
                        <h3 className="text-xl capitalize">
                            #{pokemon.id} {pokemon.name}
                        </h3>
                        <div className="flex justify-center space-x-2 mt-2">
                            {pokemon.types.map(type => (
                                <span
                                    key={type}
                                    className={`px-2 py-1 rounded text-white text-xs bg-types-${type}`}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PokemonList;