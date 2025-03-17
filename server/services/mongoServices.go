package services

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection

func SetupMongoDBConnection() (*mongo.Client, error) {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file in godotenv: ", err)
		return nil, err
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")

	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return client, err
}

func InitialisePartyPokemonMongoDBCollection(client *mongo.Client) {
	collection = client.Database("golang_db").Collection("party_pokemons")
}

func GetPartyPokemonCollection() *mongo.Collection {
	return collection
}
