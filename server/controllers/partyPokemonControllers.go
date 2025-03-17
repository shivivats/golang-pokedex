package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shivivats/golang-pokedex/models"
	"github.com/shivivats/golang-pokedex/services"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func GetPartyPokemons(c *fiber.Ctx) error {
	partyPokemons, err := services.GetPartyPokemonsAsArray()
	if err != nil {
		return err
	}

	return c.JSON(partyPokemons)
}

func AddPokemonToParty(c *fiber.Ctx) error {
	// if there are already 6 pokemon in the party, then return no
	partyPokemons, err := services.GetPartyPokemonsAsArray()
	if err != nil {
		return err
	}
	if len(partyPokemons) >= 6 {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"Status": "User already has 6 pokemons in their party!"})
	}

	// get species_id from request parameters (this is different from body!)
	species_id := c.Params("species_id")

	newPartyPokemon, err := services.MakeAndInsertNewPartyPokemon(species_id)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(newPartyPokemon)
}

func UpdatePartyPokemon(c *fiber.Ctx) error {
	// parse the request body into the updatedPartyPokemon object
	updatedPartyPokemon := new(models.PartyPokemon)
	if err := c.BodyParser(updatedPartyPokemon); err != nil {
		return err
	}

	if updatedPartyPokemon.Nickname == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Pokemon nickname cant be empty!"})
	}

	// get Id from request parameters (this is different from body!)
	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid Pokemon ID!"})
	}

	err = services.UpdatePartyPokemonFromID(objectID, updatedPartyPokemon)

	if err != nil {
		return err
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"success": true, "nickname": updatedPartyPokemon.Nickname})
}

func DeletePartyPokemon(c *fiber.Ctx) error {
	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid Pokemon ID!"})
	}

	deleteResult, err := services.DeletePartyPokemonFromID(objectID)

	if err != nil {
		return err
	}

	if deleteResult.DeletedCount == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"deleted": "not found"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"deleted": "true"})
}
