package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sort"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/mux"
)

var redisClient *redis.Client

type User struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func init() {
	// Initialize Redis client
	redisClient = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // Redis server address
		Password: "",               // No password
		DB:       0,                // Default database
	})
}

func main() {
	r := mux.NewRouter()

	// Register routes
	r.HandleFunc("/win", winHandler).Methods("POST")
	r.HandleFunc("/players", getAllPlayers).Methods("GET")

	// Enable CORS
	corsMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

			if r.Method == "OPTIONS" {
				return
			}

			next.ServeHTTP(w, r)
		})
	}

	http.Handle("/", corsMiddleware(r))

	fmt.Println("Server started at :8080")
	http.ListenAndServe(":8080", nil)
}

func winHandler(w http.ResponseWriter, r *http.Request) {
	// Decode JSON request body into User struct
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Failed to parse JSON body", http.StatusBadRequest)
		return
	}

	// Retrieve current score from Redis
	currentScore, err := redisClient.Get(r.Context(), user.Username).Int()
	if err != nil && err != redis.Nil {
		http.Error(w, "Failed to retrieve user data", http.StatusInternalServerError)
		return
	}

	// If the user exists, increment the score, otherwise assign the score to 1
	var newScore int
	if err == redis.Nil {
		newScore = 1
	} else {
		newScore = currentScore + 1
	}

	// Update the score in Redis
	if err := redisClient.Set(r.Context(), user.Username, newScore, 0).Err(); err != nil {
		http.Error(w, "Failed to update user score", http.StatusInternalServerError)
		return
	}

	// Response
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Score incremented for user: %s. New score: %d", user.Username, newScore)
}


func getAllPlayers(w http.ResponseWriter, r *http.Request) {
	// Retrieve all keys from Redis
	keys := redisClient.Keys(r.Context(), "*").Val()

	// Create a slice to store user data
	var users []User

	// Iterate over keys
	for _, key := range keys {
		// Retrieve score for each user
		score, err := redisClient.Get(r.Context(), key).Int()
		if err != nil {
			fmt.Printf("Error retrieving score for user %s: %v\n", key, err)
			continue
		}

		// Create a User struct with username and score
		user := User{Username: key, Score: score}

		// Append user data to the slice
		users = append(users, user)
	}

	// Sort users by score in descending order
	sort.Slice(users, func(i, j int) bool {
		return users[i].Score > users[j].Score
	})

	// Convert users slice to JSON
	usersJSON, err := json.Marshal(users)
	if err != nil {
		http.Error(w, "Failed to marshal user data", http.StatusInternalServerError)
		return
	}

	// Respond with the JSON data
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(usersJSON)
}
