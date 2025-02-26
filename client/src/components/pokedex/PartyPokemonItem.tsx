import { BASE_URL } from "@/App";
import { Editable, Image, Stack, Text } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { PartyPokemon } from "./PartyPokemonList";

const PartyPokemonItem = ({ partyPokemon }: { partyPokemon: PartyPokemon }) => {
    const [name, setName] = useState("");

    const { mutate: updatePartyPokemon, isPending: isUpdating } = useMutation({
        mutationKey: ["updatePartyPokemon"],
        mutationFn: async () => {
            try {
                const res = await fetch(BASE_URL + `/pokemons/${partyPokemon._id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ nickname: name })
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                return data;
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (
        <Stack direction="row">
            <Image
                height="100px"
                width="100px"
                alt="Party Pokemon Sprite"
                backgroundColor="#636363"
                fit="contain"
                padding="5"
                src={partyPokemon.sprite}
            />
            <Stack>
                <Editable.Root
                    value={name}
                    onValueChange={(e) => {
                        setName(e.value);
                        updatePartyPokemon();
                    }}
                    placeholder={partyPokemon.nickname}
                >
                    <Editable.Preview />
                    <Editable.Input />
                </Editable.Root>
                <Text>
                    Level {partyPokemon.level}
                </Text>
                <Text>
                    {partyPokemon.nature} Nature
                </Text>
            </Stack>
        </Stack>
    )
}

export default PartyPokemonItem