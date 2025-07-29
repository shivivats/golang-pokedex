import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Heart } from 'lucide-react';

interface PokemonDetail {
    id: number;
    name: string;
    types: string[];
    sprite: string;
    stats: { name: string; base_stat: number }[];
    abilities: string[];
    height: number;
    weight: number;
}

const PokemonDetail: React.FC = () => {
    const { id } = useParams < { id: string } > ();
    const [pokemon, setPokemon] = useState < PokemonDetail | null > (null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = response.data;

                setPokemon({
                    id: data.id,
                    name: data.name,
                    types: data.types.map((type: any) => type.type.name),
                    sprite: data.sprites.front_default,
                    stats: data.stats.map((stat: any) => ({
                        name: stat.stat.name,
                        base_stat: stat.base_stat
                    })),
                    abilities: data.abilities.map((ability: any) => ability.ability.name),
                    height: data.height,
                    weight: data.weight
                });
            } catch (error) {
                console.error('Error fetching Pokemon details', error);
            }
        };

        fetchPokemonDetail();
    }, [id]);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        // In a real app, you'd save to local storage or backend
    };

    if (!pokemon) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-pokedex-red"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
                <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="w-64 h-64 mx-auto"
                />
                <button
                    onClick={toggleFavorite}
                    className="absolute top-4 right-4"
                >
                    <Heart
                        fill={isFavorite ? 'red' : 'none'}
                        color="red"
                        className="w-8 h-8"
                    />
                </button>
            </div>

            <div className="p-6">
                <h1 className="text-3xl font-bold text-center capitalize mb-4">
                    #{pokemon.id} {pokemon.name}
                </h1>

                <div className="flex justify-center space-x-2 mb-6">
                    {pokemon.types.map(type => (
                        <span
                            key={type}
                            className={`px-3 py-1 rounded text-white bg-types-${type}`}
                        >
                            {type}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Stats</h2>
                        {pokemon.stats.map(stat => (
                            <div key={stat.name} className="mb-2">
                                <div className="flex justify-between">
                                    <span className="capitalize">{stat.name}</span>
                                    <span>{stat.base_stat}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-pokedex-blue h-2.5 rounded-full"
                                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Additional Info</h2>
                        <p>Height: {pokemon.height / 10} m</p>
                        <p>Weight: {pokemon.weight / 10} kg</p>

                        <h3 className="text-lg font-semibold mt-4">Abilities</h3>
                        <ul className="list-disc list-inside">
                            {pokemon.abilities.map(ability => (
                                <li key={ability} className="capitalize">{ability}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;