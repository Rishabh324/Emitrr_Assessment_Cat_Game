// backend/main.go

package main

import (
	"fmt"
	"log"
	"net/http"
	"server/db"
	"server/handlers"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Authorization, X-Requested-With")

		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	db.InitRedis()
	defer db.RedisClient.Close()

	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello, World!")
	})
	mux.HandleFunc("/register", handlers.RegisterUser)
	mux.HandleFunc("/score", handlers.UpdateScore)
	mux.HandleFunc("/leaderboard", handlers.GetLeaderboard)

	log.Println("Starting server on port 5000...")
	log.Fatal(http.ListenAndServe(":5000", enableCORS(mux)))
}
