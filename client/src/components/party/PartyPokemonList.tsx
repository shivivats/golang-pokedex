
import PartyPokemonItem from "./PartyPokemonItem"
import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from "@/App";

export type PartyPokemon = {
    _id: number;
    species_id: number;
    nickname: string;
    level: number;
    nature: string;
    sprite: string;
}

const PartyPokemonList = () => {
    const { data: partyPokemons, isLoading } = useQuery<PartyPokemon[]>({
        queryKey: ["partyPokemons"], // identify this query with the query key 'partyPokemons'
        queryFn: async () => {
            try {
                const res = await fetch(BASE_URL + "/party-pokemons");
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                return data || [];
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div>
            {isLoading && (
                <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full size-16 border-b-4 border-blue-500"></div>
                </div>
            )}
            {!isLoading && partyPokemons?.length === 0 && (
                <p >Add a pokemon to your party for it to show up here.</p>
            )}
            <h1 className="text-3xl font-bold text-center mb-8 mt-8">XYZ's Party</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">   {/* Right Column: Image Grid */}
                {partyPokemons?.map((partyPokemon) => (
                    <PartyPokemonItem key={partyPokemon._id} partyPokemon={partyPokemon} />
                ))}

            </div>
        </div>

    );
};
export default PartyPokemonList