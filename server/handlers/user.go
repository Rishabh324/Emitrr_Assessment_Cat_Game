package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"server/db"
	"server/models"
	"server/utils"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid user data", http.StatusBadRequest)
		return
	}

	storedPassword, _ := db.GetUserPassword(user.Username)
	if len(storedPassword) != 0 {
		
		if !utils.CheckPasswordHash(user.Password, storedPassword) {
			w.WriteHeader(http.StatusIMUsed)
			w.Write([]byte("User already exists"))
			return
		}
        
		w.WriteHeader(http.StatusOK)
		return 
    }

	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
        http.Error(w, "Error hashing password", http.StatusInternalServerError)
        return
    }

    newUser := models.User{
        Username: user.Username,
        Password: hashedPassword,
        Score:    user.Score,
    }

	log.Printf("Registering user: %+v\n", newUser)

	err = db.RegisterUser(newUser)
    if err != nil {
        http.Error(w, "Error registering user", http.StatusInternalServerError)
        return
    }

	w.WriteHeader(http.StatusOK)
}

func UpdateScore(w http.ResponseWriter, r *http.Request) {
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid user data", http.StatusBadRequest)
		return
	}

	if err := db.UpdateUserScore(user.Username, user.Password); err != nil {
		http.Error(w, "Error updating score", http.StatusInternalServerError)
		return
	}
	
	w.WriteHeader(http.StatusOK)
}
