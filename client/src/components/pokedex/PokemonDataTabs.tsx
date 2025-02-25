import { Tabs } from "@chakra-ui/react";

export default function PokemonDataTabs() {
    return (
        <Tabs.Root maxW="md" fitted defaultValue="pokedexEntry" variant="outline" margin="2">
            <Tabs.List>
                <Tabs.Trigger value="pokedexEntry">
                    PokedexEntry
                </Tabs.Trigger>
                <Tabs.Trigger value="locations">
                    Locations
                </Tabs.Trigger>
                <Tabs.Trigger value="moves">
                    Moves
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="pokedexEntry">A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.</Tabs.Content>
            <Tabs.Content value="locations">Pallet Town</Tabs.Content>
            <Tabs.Content value="moves">
                Growl, Tackle, Vine Whip, etc...
            </Tabs.Content>
        </Tabs.Root>
    )
}