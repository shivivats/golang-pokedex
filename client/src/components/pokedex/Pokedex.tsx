import React, { useState } from 'react'
import SpriteChangerButton from './SpriteChangerButton'
import PokemonDataTabs from './PokemonDataTabs'
import PokemonSearch from './PokemonSearch'
import PartyPokemon from './PartyPokemonItem'
import PartyPokemonList from './PartyPokemonList'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from 'lucide-react'
import PokemonPreview from './PokemonPreview'


const Pokedex = () => {
    const [selectedPokemonID, setSelectedPokemonID] = useState("");

    return (
        <div className="bg-red-200 p-6">
            <div className="flex flex-col md:flex-row gap-4 mx-auto max-w-5xl">
                < div className="w-full md:w-1/2" >
                    <PokemonPreview pokemonSpeciesID={selectedPokemonID} />
                </div>
                <div className="w-full md:w-1/2 ">
                    <PokemonSearch onPokemonSelected={setSelectedPokemonID} />
                    <PartyPokemonList />
                </div>
            </div>
        </div>
    )
}

export default Pokedex