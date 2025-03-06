import { useState } from 'react'
import PokemonSearch from './PokemonSearch'
import PartyPokemonList from '../party/PartyPokemonList'

import PokemonPreview from './PokemonPreview'


const Pokedex = () => {
    const [selectedPokemonID, setSelectedPokemonID] = useState("");

    return (
        <div className="w-full h-full flex justify-between items-center p-4">
            < div className="size-1/2 border-2 items-center justify-center" >
                <PokemonPreview pokemonSpeciesID={selectedPokemonID} />

            </div>
            <div className="size-1/2 border-2 items-center justify-center">
                <PokemonSearch onPokemonSelected={setSelectedPokemonID} />
                <PartyPokemonList />
            </div>
        </div>
    )
}

export default Pokedex