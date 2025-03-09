import { useState } from 'react'
import PokemonSearch from './PokemonSearch'
import PartyPokemonList from '../party/PartyPokemonList'

import PokemonPreview from './PokemonPreview'
import { Button } from '../ui/button'
import { AspectRatio } from '../ui/aspect-ratio'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"
import { ScrollArea } from '../ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, Underline } from "lucide-react"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '../ui/badge'




const Pokedex = () => {
    const [selectedPokemonID, setSelectedPokemonID] = useState("");

    return (
        <div className="flex h-5/6 w-3/4 rounded-lg bg-red-200 shadow-xl">
            {/* Left side */}
            <div className="flex w-1/2 flex-col p-4 border-2">
                {/* Top Section */}
                <div className="mb-4 flex flex-col items-evenly justify-evenly">
                    <div className="flex flex-row m-5">
                        {/* Sinner */}
                        <div className="animate-spin size-8 rounded-full border-blue-200 border-b-4">
                        </div>
                        {/* Pagination Buttons */}
                        <Pagination >
                            <PaginationContent className="flex space-x-2">
                                {/* <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem> */}
                                <PaginationItem>
                                    <PaginationLink href="#" className="h-3 w-3 rounded-full bg-red-500">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" className="h-3 w-3 rounded-full bg-red-500">2</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" className="h-3 w-3 rounded-full bg-red-500">3</PaginationLink>
                                </PaginationItem>
                                {/* <PaginationItem>
                            <PaginationEllipsis />
                            </PaginationItem> */}
                                {/* <PaginationItem>
                            <PaginationNext href="#" />
                            </PaginationItem> */}
                            </PaginationContent>
                        </Pagination>
                    </div>
                    {/* Pokemon Preview Display */}
                    <PokemonPreview pokemonSpeciesID={selectedPokemonID} />
                </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col w-1/2 p-4 border-2">
                <PokemonSearch onPokemonSelected={setSelectedPokemonID} />

                <div className="flex flex-col">
                    <PartyPokemonList />
                    <div className="flex justify-around">
                        <button className="rounded bg-green-400 p-2">Button</button>
                        <button className="rounded bg-green-400 p-2">Button</button>
                        <button className="rounded bg-green-400 p-2">Button</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pokedex