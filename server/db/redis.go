// db/redis.go (same file)
package db

import (
	"context"
	"errors"
	"log"
	"server/models"
	"server/utils"
	"sort"
	"strconv"

	"github.com/go-redis/redis/v8"
)

var (
	RedisClient *redis.Client
	Ctx         = context.Background()
)

func InitRedis() {
	RedisClient = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,
	})

	_, err := RedisClient.Ping(Ctx).Result()
	if err != nil {
		log.Fatalf("Could not connect to Redis: %v", err)
	}

	log.Println("Connected to Redis")
}

func RegisterUser(user models.User) error {
	return RedisClient.HSet(Ctx, user.Username, map[string]interface{}{
		"Password": user.Password,
		"Score":    user.Score,
	}).Err()
}

func UpdateUserScore(username, password string) error {
	storedPassword, err := GetUserPassword(username)
	if err != nil {
		return errors.New("user not found or error retrieving password")
	}

	if !utils.CheckPasswordHash(password, storedPassword) {
		return errors.New("invalid password")
	}

	_, err = RedisClient.HIncrBy(Ctx, username, "Score", 1).Result()
	if err != nil {
		return errors.New("error updating score")
	}

	return nil
}

func FetchLeaderboard() ([]models.User, error) {
	leaderboard := []models.User{}

	iter := RedisClient.Scan(Ctx, 0, "*", 0).Iterator()
	for iter.Next(Ctx) {
		userKey := iter.Val()

		userData, err := RedisClient.HMGet(Ctx, userKey, "Password", "Score").Result()
		if err != nil {
			return nil, err
		}

		password := userData[0].(string)
		score, err := strconv.Atoi(userData[1].(string))
		if err != nil {
			return nil, err
		}

		leaderboard = append(leaderboard, models.User{Username: userKey, Password: password, Score: score})
	}

	// Sort leaderboard in descending order by score
	sort.Slice(leaderboard, func(i, j int) bool {
		return leaderboard[i].Score > leaderboard[j].Score
	})

	return leaderboard, nil
}

func GetUserPassword(username string) (string, error) {
	return RedisClient.HGet(Ctx, username, "Password").Result()
}
