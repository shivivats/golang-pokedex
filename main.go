package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type Pokemon struct {
	ID     int    `json:"id"`
	Number int    `json:"number"`
	Name   string `json:"name"`
	Sprite string `json:"sprite"`
	Liked  bool   `json:"liked"`
}

func main() {
	fmt.Println("Hello, Worlds!")

	app := fiber.New()

	err := godotenv.Load(".env") // load the .env file with godotenv
	if err != nil {
		log.Fatal("Error loading .env file with godotenv")
	}

	PORT := os.Getenv("PORT")

	pokemons := []Pokemon{}

	// Get all pokemons
	app.Get("/api/pokemons", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(pokemons)
	})

	// Create a Pokemon
	app.Post("/api/pokemons", func(c *fiber.Ctx) error {
		pokemon := &Pokemon{} // Create a pointer to an empty Pokemon {id:0,number:0,name="",sprite=""}
		if err := c.BodyParser(pokemon); err != nil {
			return err
		}

		if pokemon.Name == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Pokemon name is required"})
		}

		pokemon.ID = len(pokemons) + 1
		pokemons = append(pokemons, *pokemon)

		return c.Status(201).JSON(pokemon)
	})

	// Update a Pokemon
	app.Patch("/api/pokemons/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, pokemon := range pokemons {
			if fmt.Sprint(pokemon.ID) == id {
				pokemons[i].Liked = !pokemons[i].Liked
				return c.Status(200).JSON(pokemons[i])
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Pokemon not found"})
	})

	// Delete a Pokemon
	app.Delete("/api/pokemons/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")

		for i, pokemon := range pokemons {
			if fmt.Sprint(pokemon.ID) == id {
				pokemons = append(pokemons[:i], pokemons[i+1:]...)
				// take the pokemons up to i and after i, but not i
				// thus effectively removing the pokemon that matched the id

				return c.Status(200).JSON(fiber.Map{"success": "true"})
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "pokemon not found!"})
	})

	log.Fatal(app.Listen(":" + PORT))

}
