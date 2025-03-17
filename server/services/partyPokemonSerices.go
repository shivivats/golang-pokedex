package services

import (
	"context"
	"math/rand"
	"strconv"

	"github.com/mtslzr/pokeapi-go"
	"github.com/shivivats/golang-pokedex/models"
	"github.com/shivivats/golang-pokedex/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetPartyPokemonsAsArray() ([]models.PartyPokemon, error) {
	var partyPokemons []models.PartyPokemon

	// bson.M passes filters to the query
	// In this case we have no filters since we want to obtain all pokemon in the collection
	cursor, err := collection.Find(context.Background(), bson.M{})

	if err != nil {
		return nil, err
	}

	// defer aka postpone the closing of the connection until the end of this function
	defer cursor.Close(context.Background())

	// cursor is a pointer to the result set
	for cursor.Next(context.Background()) {
		var partyPokemon models.PartyPokemon
		if err := cursor.Decode(&partyPokemon); err != nil {
			return nil, err
		}

		// keep adding the pokemons to the array to return
		partyPokemons = append(partyPokemons, partyPokemon)
	}

	return partyPokemons, nil
}

func MakeAndInsertNewPartyPokemon(species_id string) (models.PartyPokemon, error) {
	species_id_int, err := strconv.Atoi(species_id)

	newPartyPokemon := models.PartyPokemon{SpeciesID: species_id_int}

	if err != nil {
		return newPartyPokemon, err
	}

	pokemonSpecies, err := pokeapi.PokemonSpecies(species_id)
	if err != nil {
		return newPartyPokemon, err
	}

	// nature, level, nickname, sprite
	newPartyPokemon.Nickname = pokemonSpecies.Name                                      // set the pokemon species name as the default nickname
	newPartyPokemon.Level = 50                                                          // set 50 as the default level
	newPartyPokemon.Nature = utils.PokemonNatures[rand.Intn(len(utils.PokemonNatures))] // get a random nature as the default

	frontDefaultSprite, err := GetFrontDefaultSprite(species_id)
	if err != nil {
		return newPartyPokemon, err
	}
	newPartyPokemon.Sprite = frontDefaultSprite

	insertResult, err := collection.InsertOne(context.Background(), newPartyPokemon)

	if err != nil {
		return newPartyPokemon, err
	}

	// update the partyPokemon's ID with the newly inserted resource's ID from MongoDB
	// this ensures a unique ID amongst all of the data
	newPartyPokemon.ID = insertResult.InsertedID.(primitive.ObjectID)

	return newPartyPokemon, nil

}

func UpdatePartyPokemonFromID(objectID primitive.ObjectID, updatedPartyPokemon *models.PartyPokemon) error {
	filter := bson.M{"_id": objectID}

	// use the update interface to set the nickname of the existing pokemon based on ID to the nickname specified in the request body
	update := bson.M{"$set": bson.M{"nickname": updatedPartyPokemon.Nickname}}

	_, err := collection.UpdateOne(context.Background(), filter, update)

	return err

}

func DeletePartyPokemonFromID(objectID primitive.ObjectID) (*mongo.DeleteResult, error) {
	filter := bson.M{"_id": objectID}

	deleteResult, err := collection.DeleteOne(context.Background(), filter)

	return deleteResult, err
}
