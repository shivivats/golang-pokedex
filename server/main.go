package main

import (
	"context"
	"fmt"
	"log"

	"github.com/shivivats/golang-pokedex/services"
)

func main() {
	fmt.Println("Hello World")

	client, err := services.SetupMongoDBConnection()

	// the client will disconnect when the main function has completed executing
	defer client.Disconnect(context.Background())

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MONGODB ATLAS")

	services.InitialisePartyPokemonMongoDBCollection(client)

	app, port := SetupFiberApp()

	log.Fatal(app.Listen("0.0.0.0:" + port))

}
