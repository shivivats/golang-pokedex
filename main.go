package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection

func main() {
	fmt.Println("Hello World")
	// pokemon, err := pokeapi.Pokemon("charizard")
	// if err != nil {
	// 	log.Fatal("Pokemon not found in pokeapi.Pokemon!")
	// }
	// fmt.Print(pokemon)

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file in godotenv: ", err)
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")

	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// the client will disconnect when the main function has completed executing
	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MONGODB ATLAS")

	collection = client.Database("golang_db").Collection("party_pokemons")

	app := fiber.New()

	// add CORS to our backend server so the front end can query it
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin,Content-Type,Accept",
	}))

	app.Get("/api/pokemons", getPartyPokemons)
	app.Post("/api/pokemons", addPokemonToParty)
	app.Patch("/api/pokemons/:id", updatePartyPokemon)
	app.Delete("/api/pokemons/:id", deletePartyPokemon)

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	log.Fatal(app.Listen("0.0.0.0:" + port))

}
