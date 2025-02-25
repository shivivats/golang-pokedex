package main

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PartyPokemon struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	SpeciesID int                `json:"species_id"`
	Nickname  string             `json:"nickname"`
}

func getPartyPokemons(c *fiber.Ctx) error {
	var partyPokemons []PartyPokemon

	// bson.M passes filters to the query
	// In this case we have no filters since we want to obtain all pokemon in the collection
	cursor, err := collection.Find(context.Background(), bson.M{})

	if err != nil {
		return err
	}

	// defer aka postpone the closing of the connection until the end of this function
	defer cursor.Close(context.Background())

	// cursor is a pointer to the result set
	for cursor.Next(context.Background()) {
		var partyPokemon PartyPokemon
		if err := cursor.Decode(&partyPokemon); err != nil {
			return err
		}

		// keep adding the pokemons to the array to return
		partyPokemons = append(partyPokemons, partyPokemon)
	}

	return c.JSON(partyPokemons)
}

func addPokemonToParty(c *fiber.Ctx) error {
	// make a new party pokemon object to parse the request body data into
	newPartyPokemon := new(PartyPokemon)
	if err := c.BodyParser(newPartyPokemon); err != nil {
		return err
	}

	if newPartyPokemon.SpeciesID == 0 {
		return c.Status(400).JSON(fiber.Map{"error": "Pokemon Species is invalid!"})
	}

	insertResult, err := collection.InsertOne(context.Background(), newPartyPokemon)

	if err != nil {
		return err
	}

	// update the partyPokemon's ID with the newly inserted resource's ID from MongoDB
	// this ensures a unique ID amongst all of the data
	newPartyPokemon.ID = insertResult.InsertedID.(primitive.ObjectID)

	return c.Status(201).JSON(newPartyPokemon)
}

func updatePartyPokemon(c *fiber.Ctx) error {
	// parse the request body into the updatedPartyPokemon object
	updatedPartyPokemon := new(PartyPokemon)
	if err := c.BodyParser(updatedPartyPokemon); err != nil {
		return err
	}

	if updatedPartyPokemon.Nickname == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Pokemon nickname cant be empty!"})
	}

	// get Id from request parameters (this is different from body!)
	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid Pokemon ID!"})
	}

	filter := bson.M{"_id": objectID}

	// use the update interface to set the nickname of the existing pokemon based on ID to the nickname specified in the request body
	update := bson.M{"$set": bson.M{"nickname": updatedPartyPokemon.Nickname}}

	_, err = collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true, "nickname": updatedPartyPokemon.Nickname})
}

func deletePartyPokemon(c *fiber.Ctx) error {
	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid Pokemon ID!"})
	}

	filter := bson.M{"_id": objectID}

	_, err = collection.DeleteOne(context.Background(), filter)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}
