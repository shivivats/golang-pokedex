import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";


const PokemonSearch = () => {
    const [pokemonSearchQuery, setPokemonSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    })

    const searchPokemon = async (e: React.FormEvent) => {
        e.preventDefault();
        alert("Pokemon searched for!");
    }

    return (
        <form onSubmit={searchPokemon}>
            <Input />
            <Button type="submit" />
        </form>
    )
}

export default PokemonSearch