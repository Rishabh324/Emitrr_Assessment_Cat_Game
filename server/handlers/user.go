package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"server/db"
	"server/models"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid user data", http.StatusBadRequest)
		return
	}
	
	_,err := db.RedisClient.Get(db.Ctx, user.Username).Result()
	if err!=nil{
		log.Println("User not found")
		log.Println("Registering user")
		if err := db.RegisterUser(user); err != nil {
			http.Error(w, "Error registering user", http.StatusInternalServerError)
			return
		}
	} else {
		log.Println("User found")
	}

	w.WriteHeader(http.StatusOK)
}

func UpdateScore(w http.ResponseWriter, r *http.Request) {
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid user data", http.StatusBadRequest)
		return
	}
	log.Println(user)
	if err := db.UpdateUserScore(user.Username); err != nil {
		http.Error(w, "Error updating score", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}
