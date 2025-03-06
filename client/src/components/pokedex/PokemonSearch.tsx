import { useState } from "react";
import { Input } from "@/components/ui/input"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/App";
import { Card } from "../ui/card";

interface PokemonSearchInputProps {
    onPokemonSelected: (pokemonID: string) => void;
}

type PokemonSearchResult = {
    species_id: number;
    name: string;
}

const PokemonSearch = ({ onPokemonSelected }: PokemonSearchInputProps) => {
    const [pokemonSearchQuery, setPokemonSearchQuery] = useState("");

    const queryClient = useQueryClient();

    const { data: pokemonSearchResults = [], isLoading } = useQuery<PokemonSearchResult[]>({
        queryKey: ["getFilteredPokemon", pokemonSearchQuery], // identify this query with the query key 'getPokemonPreviewData' and the defining parameter 'pokemonSearchQuery' input
        queryFn: async () => {
            try {
                const res = await fetch(BASE_URL + `/pokemons/names?name=${pokemonSearchQuery}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                return data || [];
            } catch (error) {
                console.log(error);
            }
        },
        enabled: pokemonSearchQuery.length >= 2, // only fetch when 2 or more characters have been entered
        staleTime: 1000, // only fetch every 500ms to avoid too many backend calls
    });

    return (
        <div>
            <Input
                type="text"
                placeholder="Search for Pokemons..."
                value={pokemonSearchQuery}
                onChange={(e) => {
                    setPokemonSearchQuery(e.target.value);
                    console.log("pokemonSearchQuery: " + pokemonSearchQuery)
                    //queryClient.invalidateQueries({ queryKey: ["getFilteredPokemon"] });
                }}
            />
            {
                pokemonSearchQuery && (
                    <Card>
                        {
                            isLoading ? (
                                <div className="p-2 text-gray-500">Loading...</div>
                            ) : pokemonSearchResults.length > 0 ? (
                                pokemonSearchResults.map((pokemon) => (
                                    <div
                                        key={pokemon.name}
                                        className="p-2 cursor-pointer"
                                        onClick={() => {
                                            onPokemonSelected(pokemon.species_id.toString()) // set the parameter to pass to the PokemonPreview component
                                            console.log("Selected Pokemon with " + pokemon.species_id.toString())
                                            //queryClient.invalidateQueries({ queryKey: ["getPokemonPreviewData"] });
                                            // no need to invalidate and manually refresh the query since it will do it by itself any time the paramter passed to the component changes!
                                            setPokemonSearchQuery("");
                                        }}
                                    >
                                        {pokemon.name}
                                    </div>
                                )
                                )) : (
                                <div className="p-2 text-gray-500">No results found</div>
                            )
                        }
                    </Card>
                )}
        </div>
    );
}

export default PokemonSearch