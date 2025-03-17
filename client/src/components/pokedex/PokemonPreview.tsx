import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { BASE_URL } from "@/App";
import PartyPokemonAddButton from "../party/PartyPokemonAddButton";
import { Badge } from "../ui/badge";
import { toTitleCase } from "@/utils/stringUtils";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";

// make a new pokemon struct for the pokemon preview details

export type PokemonPreview = {
    _id: number;
    species_id: number;
    nickname: string;
    sprite: string;
    classification: string;
    type1: string;
    type2: string;
    description: string;
}

const PokemonPreview = ({ pokemonSpeciesID }: { pokemonSpeciesID: string }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const queryClient = useQueryClient();

    const { data: previewPokemon, isLoading } = useQuery<PokemonPreview>({
        queryKey: ["getPokemonPreviewData", pokemonSpeciesID], // identify this query with the query key 'getPokemonPreviewData' and the pokemonSpeciesID -> adding the pokemonSpeciesID to the query key makes it so that the the query refreshes everytime the pokemonSpeciesID for this element changes!
        queryFn: async () => {
            try {
                console.log("Previewing pokemon with id " + pokemonSpeciesID.toString())
                const res = await fetch(BASE_URL + `/pokemons/species/${pokemonSpeciesID}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                return data || null;
            } catch (error) {
                console.log(error);
            }
        },
        enabled: pokemonSpeciesID.length > 0,
    });

    return (
        <div className="w-full">
            {/* Spinner */}
            {isLoading && (
                <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full size-16 border-b-4 border-blue-500"></div>
                </div>
            )}

            <div className="mb-4 flex flex-col rounded border border-gray-300 p-2 bg-pokedex-gray text-pokedex-black">
                <p className="text-5xl mb-1">#{previewPokemon?.species_id} {toTitleCase(String(previewPokemon?.nickname))}</p>
                <p className="mb-1">{previewPokemon?.classification}</p>
                <div className="flex flex-row m-2">

                    <ToggleGroup type="single" variant="outline" className="flex flex-col">
                        <ToggleGroupItem value="gen-1" aria-label="Toggle gen 1" className="h-10">
                            <p>Gen 1</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="gen-2" aria-label="Toggle gen 2" className="h-10">
                            <p>Gen 2</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="gen-3" aria-label="Toggle gen 3" className="h-10">
                            <p>Gen 3</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="gen-4" aria-label="Toggle gen 4" className="h-10">
                            <p>Gen 4</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="gen-5" aria-label="Toggle gen 5" className="h-10">
                            <p>Gen 5</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="gen-6" aria-label="Toggle gen 6" className="h-10">
                            <p>Gen 6</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="gen-7" aria-label="Toggle gen 7" className="h-10">
                            <p>Gen 7</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="gen-8" aria-label="Toggle gen 8" className="h-10">
                            <p>Gen 8</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="gen-9" aria-label="Toggle gen 9" className="h-10">
                            <p>Gen 9</p>
                        </ToggleGroupItem>
                    </ToggleGroup>

                    <div className="relative size-90">
                        {/* Main Preview Image */}
                        <img src={previewPokemon?.sprite} alt="Preview Pokemon Image" className="w-full h-full rounded-lg border-2 bg-pokedex-black" />
                        <div className="absolute bottom-0 left-0 z-10">
                            <button
                                className="w-16 h-16 bg-pokedex-green hover:bg-pokedex-blue transition-all"
                                style={{ clipPath: "polygon(0% 100%, 100% 100%, 0% 0%)" }}
                            />
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <div className="flex justify-between mb-4 mt-4">
                    <PartyPokemonAddButton pokemonSpeciesID={pokemonSpeciesID} />
                </div >
            </div>

            <div className="bg-pokedex-green text-pokedex-gray">
                {/* Tabs with Details */}
                <Tabs defaultValue="basics" className="w-full">
                    <TabsList className="flex flex-row w-full justify-evenly">
                        <TabsTrigger value="basics">Basics</TabsTrigger>
                        <TabsTrigger value="lore">Lore</TabsTrigger>
                        <TabsTrigger value="moves">Moves</TabsTrigger>
                        <TabsTrigger value="locations">Locations</TabsTrigger>
                        <TabsTrigger value="other-languages">Other Languages</TabsTrigger>
                    </TabsList>
                    <TabsContent value="basics" className="w-full">
                        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                            <div className="mb-1">
                                <Badge className={previewPokemon?.type1}>{previewPokemon?.type1}</Badge>
                                <Badge className={previewPokemon?.type2}>{previewPokemon?.type2}</Badge>
                            </div>
                            <p className="mb-2">{previewPokemon?.description}</p>
                            <p>Height, Weight, Abilities, Base Stats</p>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="lore" className="w-full">
                        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                            Charmander is a Fire type Pokémon introduced in Generation 1.
                            Charmander is a bipedal, reptilian Pokémon. Most of its body is colored orange, while its underbelly is light yellow and it has blue eyes. It has a flame at the end of its tail, which is said to signify its health.
                            Charmander's design is based on a lizard, however as its name suggests it may also have been inspired by salamanders, which in mythology have an affinity with fire.
                            Charmander is notable for being one of the three choices for a "starter Pokémon" in the original Game Boy games, Pokémon Red & Blue (Red & Green in Japan), along with Bulbasaur and Squirtle.
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="moves" className="w-full">
                        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                            <Table>
                                {/* <TableCaption>Charmander Moves</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Move</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Power</TableHead>
                                        <TableHead>Accuracy</TableHead>
                                        <TableHead className="text-right">Method</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Growl</TableCell>
                                        <TableCell><Badge className="normal">NORMAL</Badge></TableCell>
                                        <TableCell>STATUS</TableCell>
                                        <TableCell>N/A</TableCell>
                                        <TableCell>100</TableCell>
                                        <TableCell className="text-right">LEVEL 1</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Scratch</TableCell>
                                        <TableCell><Badge className="normal">NORMAL</Badge></TableCell>
                                        <TableCell>PHYSICAL</TableCell>
                                        <TableCell>40</TableCell>
                                        <TableCell>100</TableCell>
                                        <TableCell className="text-right">LEVEL 1</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Ember</TableCell>
                                        <TableCell><Badge className="fire">FIRE</Badge></TableCell>
                                        <TableCell>SPECIAL</TableCell>
                                        <TableCell>40</TableCell>
                                        <TableCell>100</TableCell>
                                        <TableCell className="text-right">LEVEL 4</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Ancient Power</TableCell>
                                        <TableCell><Badge className="rock">ROCK</Badge></TableCell>
                                        <TableCell>SPECIAL</TableCell>
                                        <TableCell>60</TableCell>
                                        <TableCell>100</TableCell>
                                        <TableCell className="text-right">EGG MOVE</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="locations" className="w-full">
                        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                            <Table>
                                {/* <TableCaption>Charmander Locations</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Game</TableHead>
                                        <TableHead className="text-right">Location</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Red/Blue</TableCell>
                                        <TableCell className="text-right">Pallet Town</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Yellow</TableCell>
                                        <TableCell className="text-right">Route 24</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Gold/Silver/Crystal</TableCell>
                                        <TableCell className="text-right">Trade/migrate from another game</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Ruby/Sapphire</TableCell>
                                        <TableCell className="text-right">Trade/migrate from another game</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">FireRed/LeafGreen</TableCell>
                                        <TableCell className="text-right">Pallet Town</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="other-languages" className="w-full">
                        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                            <Table>
                                {/* <TableCaption>Charmander In Other Languages</TableCaption> */}
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Language</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="text-right">Classification</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">English</TableCell>
                                        <TableCell>Charmander</TableCell>
                                        <TableCell className="text-right">Lizard Pokemon</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Japanese</TableCell>
                                        <TableCell>ヒトカゲ (Hitokage)</TableCell>
                                        <TableCell className="text-right">とかげポケモン</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">German</TableCell>
                                        <TableCell>Glumanda</TableCell>
                                        <TableCell className="text-right">Echsen-Pokémon</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default PokemonPreview