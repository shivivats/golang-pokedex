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

func SetupPokemonRoutes(app *fiber.App) {
	app.Get("/api/pokemons/names/", controllers.GetFilteredPokemonNames)
	app.Get("/api/pokemons/species/:species_id", controllers.GetPokemonSpeciesPreviewDetails)
}
