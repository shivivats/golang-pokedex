
import PartyPokemonItem from "./PartyPokemonItem"
import { useQuery } from "@tanstack/react-query"

export type PartyPokemon = {
    _id: number;
    species_id: number;
    nickname: string;
    level: number;
    nature: string;
    sprite: string;
}

const PartyPokemonList = () => {
    return (
        <>
        </>
    )
}

export default PartyPokemonList