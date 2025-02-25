import { Input } from "@chakra-ui/react";
import { InputGroup } from "../ui/input-group";
import { LuSearch } from "react-icons/lu";

export default function PokemonSearch() {
    return (
        <InputGroup
            flex="1"
            endElement={<LuSearch />}
        >
            <Input placeholder="Search Pokemon..." />
        </InputGroup>
    )
}