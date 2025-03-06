import { useState } from 'react'
import PokemonSearch from './PokemonSearch'
import PartyPokemonList from '../party/PartyPokemonList'

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