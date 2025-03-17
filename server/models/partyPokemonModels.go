package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Models are the data structures and database schemas of the application.
// Models typically include:
// 		struct definitions defining database tables
// 		data validation rules
// 		database related methods (incase of using an ORM)

// type User struct {
//     ID        uint      `json:"id" gorm:"primaryKey"`
//     Username  string    `json:"username" gorm:"unique;not null"`
//     Email     string    `json:"email" gorm:"unique;not null"`
//     Password  string    `json:"-" gorm:"not null"`
//     CreatedAt time.Time `json:"created_at"`
// }

type PartyPokemon struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	SpeciesID int                `json:"species_id"`
	Nickname  string             `json:"nickname"`
	Level     int                `json:"level"`
	Nature    string             `json:"nature"`
	Sprite    string             `json:"sprite"`
}
