import { Image, Stack, Text } from "@chakra-ui/react";

const PartyPokemonItem = ({ partyPokemon }: { partyPokemon: any }) => {
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
                <Text>
                    {partyPokemon.nickname}
                </Text>
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