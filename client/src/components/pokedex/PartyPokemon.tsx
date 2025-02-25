import { Image, Stack } from "@chakra-ui/react";

export default function PartyPokemon() {
    return (
        <Stack direction="row">
            <Image
                height="100px"
                width="100px"
                alt="Party Pokemon Sprite"
                backgroundColor="#636363"
                fit="contain"
                padding="5"
            />
            <p>
                Nickname
            </p>
        </Stack>
    )
}