package models

type User struct {
	Username string `json:"Username"`
	Password string `json:"Password"`
	Score    int    `json:"Score"`
}
