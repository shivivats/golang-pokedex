import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { LuSearch } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

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
            <Flex gap="2">
                <Input
                    type='text'
                    placeholder="Search Pokemon..."
                    value={pokemonSearchQuery}
                    onChange={(e) => setPokemonSearchQuery(e.target.value)}
                    ref={inputRef}
                />
                <Button
                    mx={2}
                    type='submit'
                    _active={{
                        transform: "scale(.97)"
                    }}
                >
                    {isSearching ? <Spinner size="xs" /> : <FaSearch size={30} />}
                </Button>
            </Flex>
        </form>
    )
}

export default PokemonSearch