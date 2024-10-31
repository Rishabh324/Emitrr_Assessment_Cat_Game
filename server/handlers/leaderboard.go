package handlers

import (
	"encoding/json"
	"net/http"
	"server/db"
)

func GetLeaderboard(w http.ResponseWriter, r *http.Request) {
	leaderboard, err := db.FetchLeaderboard()
	if err != nil {
		http.Error(w, "Error fetching leaderboard", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(leaderboard)
}
