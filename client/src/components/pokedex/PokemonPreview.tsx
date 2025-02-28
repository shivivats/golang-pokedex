import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PartyPokemonItem from "./PartyPokemonItem"
import { useQuery } from "@tanstack/react-query"



const PokemonPreview = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

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
                    onClick={() => setIsLoading(!isLoading)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Toggle Spinner
                </button>
                <button
                    onClick={() => console.log("Button 2 clicked")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    Button 2
                </button>
            </div >

            {/* Spinner */}


            <img src="https://via.placeholder.com/300x400" alt="Main Image" className="w-full h-auto rounded-lg mb-4" />
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