import { BASE_URL } from '@/App'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'

// this component should be adding a pokemon to the user's party
// the backend will check if the user already has 6 pokemon or not and then wont allow the user to add more.

// http://localhost:4000/api/party-pokemons/254

const PartyPokemonAddButton = ({ pokemonSpeciesID }: { pokemonSpeciesID: string }) => {
    const [showAlert, setShowAlert] = useState(false);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowAlert(false);
    //     }, 3000); // hide alert automatically after 3 seconds

    //     return () => clearTimeout(timer); // cleanup the timer after timeout
    // }, []);



    const queryClient = useQueryClient();

    const { mutate: addPartyPokemon, isPending: isAdding } = useMutation({
        mutationKey: ["addPartyPokemon", pokemonSpeciesID],
        mutationFn: async () => {
            try {
                const res = await fetch(BASE_URL + `/party-pokemons/${pokemonSpeciesID}`, {
                    method: "POST"
                });
                const data = await res.json();
                console.log("Response status: " + res.status.toString())
                if (!res.ok) {
                    if (res.status === 409) {
                        console.log("Cannot add party pokemon due to 6 already being there")
                        setShowAlert(true);
                    } else {
                        throw new Error(data.error || "Something went wrong!");
                    }
                }

                return data

            } catch (error: any) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["partyPokemons"] });
        },


    })

    const handleAddButtonPress = (event: any) => {
        console.log("Add Party Pokemon Button pressed!")
        addPartyPokemon();
    }

    return (
        <div>
            <Button
                onClick={handleAddButtonPress}
                className="px-4 py-2 text-white rounded-lg"
            >
                Add Pokemon to Party
            </Button>

            {showAlert && (
                <Alert variant="destructive" className="text-red-500 my-4">
                    <AlertCircle className="size-4" />
                    <AlertTitle>Can't Add Pokemon</AlertTitle>
                    <AlertDescription>
                        You already have 6 Pokemon in your party!
                    </AlertDescription>
                </Alert>
            )
            }
        </div>
    );
}

export default PartyPokemonAddButton