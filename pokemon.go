package main

import (
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/mtslzr/pokeapi-go"
)

type PokemonPreview struct {
	SpeciesID      int    `json:"species_id"`
	Name           string `json:"nickname"`
	Sprite         string `json:"sprite"`
	Classification string `json:"classification"`
	Type1          string `json:"type1"`
	Type2          string `json:"type2"`
	Description    string `json:"description"`
}

// fetch a filtered list of pokemon names
func getFilteredPokemonNames(c *fiber.Ctx) error {
	searchTerm := c.Query("name")
	var filteredNames []string

	for _, name := range pokemonNames {
		if len(searchTerm) == 0 || strings.Contains(strings.ToLower(name), strings.ToLower(searchTerm)) {
			filteredNames = append(filteredNames, name)
		}
	}

	return c.Status(fiber.StatusOK).JSON(filteredNames)
}

// fetch details of a pokemon SPECIES!!
func getPokemonSpeciesPreviewDetails(c *fiber.Ctx) error {
	// get species_id from request parameters (this is different from body!)
	species_id := c.Params("species_id")

	pokemonSpeciesDetails, err := pokeapi.PokemonSpecies(species_id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Pokemon species number not found!"})
	}

	frontDefaultSprite, err := getFrontDefaultSpriteOfPokemonSpecies(species_id)
	if err != nil {
		return err
	}

	species_id_int, err := strconv.Atoi(species_id)
	if err != nil {
		return err
	}

	genus, err := getGenusFromPokemonSpecies(species_id)
	if err != nil {
		return err
	}

	pokemon, err := GetDefaultPokemonOfSpecies(species_id)
	if err != nil {
		return err
	}

	var type2 string = ""

	if len(pokemon.Types) > 1 {
		type2 = pokemon.Types[1].Type.Name
	} else {
		type2 = ""
	}

	description := ""

	for _, flavorTextEntry := range pokemonSpeciesDetails.FlavorTextEntries {
		if flavorTextEntry.Language.Name == "en" {
			description = flavorTextEntry.FlavorText
			break
		}
	}

	description = strings.Replace(description, "\n", " ", -1)
	description = strings.Replace(description, "\f", " ", -1)

	var pokemonPreview = PokemonPreview{
		SpeciesID:      species_id_int,
		Name:           pokemonSpeciesDetails.Name,
		Sprite:         frontDefaultSprite,
		Classification: genus,
		Type1:          pokemon.Types[0].Type.Name,
		Type2:          type2,
		Description:    description,
	}

	return c.Status(fiber.StatusOK).JSON(pokemonPreview)
}
