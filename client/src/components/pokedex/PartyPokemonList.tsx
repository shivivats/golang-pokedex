import { Flex, SimpleGrid, Spinner, Stack, Text } from "@chakra-ui/react"
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

    const { data: partyPokemons, isLoading } = useQuery<PartyPokemon[]>({
        queryKey: ["pokemons"], // fetch the query that has the query key "pokemons"
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:4000/api/pokemons")
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data || []
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <>
            <Text fontSize="4x1" textTransform="uppercase" fontWeight="bold" textAlign="center" my="2">
                Party Pokemon
            </Text>
            {isLoading && (
                <Flex justifyContent={"center"} my={4}>
                    <Spinner size="xl" />
                </Flex>
            )}
            {!isLoading && partyPokemons?.length === 0 && (
                <Stack alignItems={"center"} gap='3'>
                    <Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
                        Add a pokemon to your party for it to show up here.
                    </Text>
                    {/* <img src='/go.png' alt='Go logo' width={70} height={70} /> */}
                </Stack>
            )}
            <SimpleGrid columns={3} columnGap="2" rowGap="2" display="grid" textAlign="center" >
                {partyPokemons?.map((partyPokemon) => (
                    <PartyPokemonItem key={partyPokemon._id} partyPokemon={partyPokemon} />
                ))}
            </SimpleGrid>
        </>
    )
}

export default PartyPokemonList