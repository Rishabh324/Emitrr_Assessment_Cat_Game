// db/redis.go (same file)
package db

import (
	"context"
	"log"
	"server/models"
	"strconv"

	"github.com/go-redis/redis/v8"
)

var (
	RedisClient *redis.Client
	Ctx         = context.Background()
)

func InitRedis()() {
	RedisClient = redis.NewClient(&redis.Options{
		Addr: "redis-16607.c305.ap-south-1-1.ec2.redns.redis-cloud.com:16607",
		Password: "HMnGcnSg6OyhzheGZzBPaVUL5a4KwODf", // no password set
   		DB:       0,
	})

	_, err := RedisClient.Ping(Ctx).Result()
	if err != nil {
		log.Fatalf("Could not connect to Redis: %v", err)
	}

	log.Println("Connected to Redis")
}

func RegisterUser(user models.User) error {
	return RedisClient.Set(Ctx, user.Username, 0, 0).Err()
}

func UpdateUserScore(username string) error {
	res, err := RedisClient.Get(Ctx, username).Result()
	log.Println(res,err)
	return RedisClient.Incr(Ctx, username).Err()
}

func FetchLeaderboard() ([]models.User, error) {
	leaderboard := []models.User{}

	iter := RedisClient.Scan(Ctx, 0, "*", 0).Iterator()
	for iter.Next(Ctx) {
		username := iter.Val()
		score, err := RedisClient.Get(Ctx, username).Result()
		if err != nil {
			return nil, err
		}
		scoreInt, _ := strconv.Atoi(score)
		leaderboard = append(leaderboard, models.User{Username: username, Score: scoreInt})
	}

	return leaderboard, nil
}
