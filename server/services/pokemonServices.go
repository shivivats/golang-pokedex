package services

import (
	"github.com/mtslzr/pokeapi-go"
	"github.com/mtslzr/pokeapi-go/structs"
)

// Services are the business logic of the application.
// Service functions:
// 		implement core functionality
// 		interact with the models/database
// 		handle data processing and validation
// 		manage complex operations that span multiple models

// func (s *UserService) CreateUser(user *models.User) error {
//     // Validate user data
//     // Hash password
//     // Save user to database
//     return s.userRepository.Create(user)
// }

func GetPokemonSpecies(species_id string) (structs.PokemonSpecies, error) {
	pokemonSpeciesDetails, err := pokeapi.PokemonSpecies(species_id)
	return pokemonSpeciesDetails, err
}

func GetFrontDefaultSprite(species_id string) (string, error) {
	pokemon, err := GetSpeciesDefaultPokemon(species_id)
	if err != nil {
		return "", err
	}

	return pokemon.Sprites.FrontDefault, nil
}

func GetSpeciesDefaultPokemon(species_id string) (structs.Pokemon, error) {
	pokemonSpecies, err := pokeapi.PokemonSpecies(species_id)

	var pokemon = structs.Pokemon{}

	if err != nil {
		return pokemon, err
	}

	for _, variety := range pokemonSpecies.Varieties {
		if variety.IsDefault {
			pokemon, err = pokeapi.Pokemon(variety.Pokemon.Name)
			if err != nil {
				return pokemon, err
			}
		}
	}
	return pokemon, nil
}

func GetSpeciesGenus(species_id string) (string, error) {
	pokemonSpecies, err := pokeapi.PokemonSpecies(species_id)
	if err != nil {
		return "", err
	}

	genus := ""

	for _, genera := range pokemonSpecies.Genera {
		if genera.Language.Name == "en" {
			genus = genera.Genus
		}
	}

	return genus, nil
}
