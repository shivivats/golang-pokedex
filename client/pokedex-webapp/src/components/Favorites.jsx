import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

interface Pokemon {
    id: number;
    name: string;
    types: string[];
    sprite: string;
}

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState < Pokemon[] > ([]);

    useEffect(() => {
        // In a real app, fetch from local storage or backend
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(storedFavorites);
    }, []);

    const removeFavorite = (pokemonId: number) => {
        const updatedFavorites = favorites.filter(pokemon => pokemon.id !== pokemonId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Favorite Pokémon</h1>

            {favorites.length === 0 ? (
                <div className="text-center text-gray-500">
                    No favorites yet. Start exploring and add some Pokémon!
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {favorites.map(pokemon => (
                        <div
                            key={pokemon.id}
                            className="bg-white rounded-lg shadow-md p-4 text-center relative"
                        >
                            <button
                                onClick={() => removeFavorite(pokemon.id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <Trash2 className="w-6 h-6" />
                            </button>
                            <Link to={`/pokemon/${pokemon.id}`}>
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;