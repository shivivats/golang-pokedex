import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "@/App";
import PartyPokemonAddButton from "../party/PartyPokemonAddButton";

// make a new pokemon struct for the pokemon preview details

export type PokemonPreview = {
    _id: number;
    species_id: number;
    nickname: string;
    sprite: string;
    classification: string;
    type1: string;
    type2: string;
    description: string;
}

const PokemonPreview = ({ pokemonSpeciesID }: { pokemonSpeciesID: string }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const queryClient = useQueryClient();

    const { data: previewPokemon, isLoading } = useQuery<PokemonPreview>({
        queryKey: ["getPokemonPreviewData", pokemonSpeciesID], // identify this query with the query key 'getPokemonPreviewData' and the pokemonSpeciesID -> adding the pokemonSpeciesID to the query key makes it so that the the query refreshes everytime the pokemonSpeciesID for this element changes!
        queryFn: async () => {
            try {
                console.log("Previewing pokemon with id " + pokemonSpeciesID.toString())
                const res = await fetch(BASE_URL + `/pokemons/species/${pokemonSpeciesID}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                return data || [];
            } catch (error) {
                console.log(error);
            }
        },
        enabled: pokemonSpeciesID.length > 0,
    });

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>

            {/* Spinner */}
            {isLoading && (
                <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full size-16 border-b-4 border-blue-500"></div>
                </div>
            )}

            {/* Main Preview Image */}
            <img src={previewPokemon?.sprite} alt="Main Image" className="w-full h-auto rounded-lg mb-4" />

            <div className="flex justify-between mb-4">
                <PartyPokemonAddButton pokemonSpeciesID={pokemonSpeciesID} />
            </div >

            {/* Tabs with Details */}
            <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="p-4 rounded-lg shadow-md mt-4">
                    Content for Tab 1
                </TabsContent>
                <TabsContent value="tab2" className="p-4 rounded-lg shadow-md mt-4">
                    Content for Tab 2
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PokemonPreview