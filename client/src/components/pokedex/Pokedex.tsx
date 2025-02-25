import React from 'react'
import {
    Image,
    Container,
    Grid,
    Stack,
    Button,
    Center,
    SimpleGrid,
    GridItem
} from '@chakra-ui/react'
import SpriteChangerButton from './SpriteChangerButton'
import PokemonDataTabs from './PokemonDataTabs'
import PartyPokemon from './PartyPokemon'
import PokemonSearch from './PokemonSearch'

export default function Pokedex() {
    return (
        <Grid templateColumns="repeat(2, 1fr)" spaceX="6" spaceY="6" padding="4" backgroundColor="#ef4b4a">
            <Container margin="5">
                <Stack direction="row">
                    <Stack>
                        <SpriteChangerButton />
                        <SpriteChangerButton />
                        <SpriteChangerButton />
                        <SpriteChangerButton />
                    </Stack>
                    <Center color="#000000" backgroundColor="#000000" width="md">
                        <Image
                            id="searchedPokemonImage"
                            height="100px"
                            width="100px"
                            alt="Searched Pokemon's Sprite"
                            color="#FFFFFF"
                            backgroundColor="#636363"
                            textAlign="center"
                        />

                    </Center>
                </Stack>
                <PokemonDataTabs />
            </Container>
            <Stack margin="5">
                <PokemonSearch />
                <Button variant="solid" size="md" backgroundColor="#27acf9">
                    Add to Party
                </Button>
                <Button variant="solid" size="md" backgroundColor="#27acf9">
                    View Party
                </Button>
                <SimpleGrid columns={3} columnGap="2" rowGap="2" display="grid" textAlign="center" >
                    <PartyPokemon />
                    <PartyPokemon />
                    <PartyPokemon />
                    <PartyPokemon />
                    <PartyPokemon />
                    <PartyPokemon />
                </SimpleGrid>
            </Stack>
        </Grid>
    )
}