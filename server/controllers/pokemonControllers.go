package controllers

import (
	"strconv"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/shivivats/golang-pokedex/models"
	"github.com/shivivats/golang-pokedex/services"
	"github.com/shivivats/golang-pokedex/utils"
)

// Controllers handle the incoming HTTP requests and manage the flow of data between the client and the service layer.
// Controllers are resposible for:
// 		parsing request data,
// 		calling appropriate Service methods,
// 		handle response formatting
// 		manage HTTP status code

// func (c *UserController) GetAllUsers(ctx *fiber.Ctx) error {
//     users, err := c.userService.GetAllUsers()
//     if err != nil {
//         return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
//     }
//     return ctx.JSON(users)
// }

// Get the names of pokemon filtered based on a string
func GetFilteredPokemonNames(c *fiber.Ctx) error {
	searchTerm := c.Query("name")
	var filteredNames []models.PokemonSearchResult

	for i, name := range utils.PokemonNames {
		if len(searchTerm) == 0 || strings.Contains(strings.ToLower(name), strings.ToLower(searchTerm)) {
			filteredNames = append(filteredNames, models.PokemonSearchResult{SpeciesID: i + 1, Name: name})
		}
	}

	return c.Status(fiber.StatusOK).JSON(filteredNames)
}

func GetPokemonSpeciesPreviewDetails(c *fiber.Ctx) error {

	// get species_id from request parameters
	species_id := c.Params("species_id")

	pokemonSpeciesDetails, err := services.GetPokemonSpecies(species_id)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Pokemon species number not found!"})
	}

	frontDefaultSprite, err := services.GetFrontDefaultSprite(species_id)
	if err != nil {
		return err
	}

	species_id_int, err := strconv.Atoi(species_id)
	if err != nil {
		return err
	}

	genus, err := services.GetSpeciesGenus(species_id)
	if err != nil {
		return err
	}

	pokemon, err := services.GetSpeciesDefaultPokemon(species_id)
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

	var pokemonPreview = models.PokemonPreview{
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
