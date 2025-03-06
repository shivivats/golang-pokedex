import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PartyPokemonItem from "./PartyPokemonItem"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "@/App";
import { Progress } from "../ui/progress";

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
            {/* Pagination */}
            < div className="flex justify-center mt-4" >
                {
                    [1, 2, 3].map((circle) => (
                        <div
                            key={circle}
                            className={`h-4 w-4 rounded-full mx-1 ${currentPage === circle ? 'bg-blue-500' : 'bg-gray-300'}`}
                        ></div>
                    ))
                }
            </div >

            {/* Pagination Buttons */}
            < div className="flex justify-between mt-4" >
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Prev
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(3)}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div >

            <div className="flex justify-between mb-4"> {/* Left Column: Image with Tabs and Buttons */}
                <button
                    onClick={() => console.log("Button 2 clicked")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Button 1
                </button>
                <button
                    onClick={() => console.log("Button 2 clicked")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Button 2
                </button>
            </div >

            {/* Spinner */}
            {isLoading && (
                <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
                </div>
            )}

            {/* Main Preview Image */}
            <img src={previewPokemon?.sprite} alt="Main Image" className="w-full h-auto rounded-lg mb-4" />



            {/* Tabs with Details */}
            <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="p-4 bg-white rounded-lg shadow-md mt-4">
                    Content for Tab 1
                </TabsContent>
                <TabsContent value="tab2" className="p-4 bg-white rounded-lg shadow-md mt-4">
                    Content for Tab 2
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PokemonPreview