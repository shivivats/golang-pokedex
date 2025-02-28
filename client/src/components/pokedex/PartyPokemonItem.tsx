import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PartyPokemon } from "./PartyPokemonList";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CiEdit } from "react-icons/ci";
import { BASE_URL } from "@/App";


const PartyPokemonItem = ({ partyPokemon }: { partyPokemon: PartyPokemon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [level, setLevel] = useState(0);
    const [nature, setNature] = useState("");

    const queryClient = useQueryClient();

    const { mutate: updatePartyPokemon, isPending: isUpdating } = useMutation({
        mutationKey: ["updatePartyPokemon"],
        mutationFn: async () => {
            try {
                console.log(BASE_URL + `/pokemons/${partyPokemon._id}`);

                const res = await fetch(BASE_URL + `/pokemons/${partyPokemon._id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    }, // without the content type header it would lead to an "unprocessable request" aka the server couldnt decode the body.
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
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partyPokemons"] });
        },
    });

    const handleSubmit = (event: any) => {
        event.preventDefault(); // prevent the page from reloading so the network request goes through!
        console.log('New Nickname:', name);
        // You can also perform other actions with the input value here
        setIsOpen(false); // Close the dialog after submission
        updatePartyPokemon();
    };

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    };

    return (
        <div key={partyPokemon.species_id} className="bg-white rounded-lg shadow-md p-4">
            <img src={partyPokemon.sprite} alt={partyPokemon.nickname} className="w-full h-auto mb-2" />
            <h3 className="font-bold text-lg">{partyPokemon.nickname}</h3>
            <p># {partyPokemon.species_id}</p>
            <p>Lv. {partyPokemon.level}</p>
            <p>{partyPokemon.nature} Nature</p>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline"><CiEdit /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Party Pokemon Details</DialogTitle>
                        <DialogDescription>
                            Make changes to your # {partyPokemon.species_id} Pokemon. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} >
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="nicknameInput" type="text" value={name} onChange={handleNameChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="level" className="text-right">
                                    Level
                                </Label>
                                <Input id="level" value="" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nature" className="text-right">
                                    Nature
                                </Label>
                                <Input id="nature" value="" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default PartyPokemonItem