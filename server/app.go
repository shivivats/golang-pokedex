package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/shivivats/golang-pokedex/routes"
)

func SetupFiberApp() (*fiber.App, string) {
	app := fiber.New()

	// add CORS to our backend server so the front end can query it
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin,Content-Type,Accept",
	}))

	routes.SetupPokemonRoutes(app)
	routes.SetupPartyPokemonRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "4000"
	}

	return app, port
}
