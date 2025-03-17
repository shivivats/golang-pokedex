package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shivivats/golang-pokedex/controllers"
)

// Routes define the API endpoints and map them to specific Controller functions.
// A router is responsible for:
// 		defining URL paths
// 		specifying HTTP methods (GET, POST, PUT, DELETE, etc.)
// 		grouping related routes
// 		applying middleware to routes

// func SetupRoutes(app *fiber.App) {
//     api := app.Group("/api")
//     api.Post("/signup", authController.Signup)
//     api.Get("/users", userController.GetAllUsers)
//     // More route definitions...
// }

func SetupPartyPokemonRoutes(app *fiber.App) {
	app.Get("/api/party-pokemons", controllers.GetPartyPokemons)
	app.Post("/api/party-pokemons/:species_id", controllers.AddPokemonToParty)
	app.Patch("/api/party-pokemons/:id", controllers.UpdatePartyPokemon)
	app.Delete("/api/party-pokemons/:id", controllers.DeletePartyPokemon)
}
