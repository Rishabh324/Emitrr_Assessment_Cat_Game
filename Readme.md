# Exploding Kitten (Cat Card Game)

## Github link (https://github.com/Rishabh324/Emitrr_Assessment_Cat_Game)

## Description

This is a simple online single-player card game built with React, Redux, Golang, and Redis. In this game, players draw cards from a randomly ordered deck and try to win by avoiding an exploding card.

Key Features ✨

1. Start Game: Users can start a new game with a randomly shuffled deck.
2. Draw and Shuffle: Players can draw a card or reshuffle the deck if they draw a Shuffle card.
3. Leaderboard: Tracks and displays players' scores. Each win counts as one point.
4. Username Selection: Players can enter a username before starting the game.
5. Backend API: The backend, written in Golang, manages user scores in Redis.

Technologies Used 🛠

1. Frontend: React, Redux (for state management)
2. Backend: Golang (for backend)
3. Database: Redis (to store user details and the scores)
4. Styling: TailwindCSS

## Running the Application locally

Step-1. Clone the github repo by running the git clone command.

```
git clone https://github.com/Rishabh324/Emitrr_Assessment_Cat_Game.git
```

Step-2

a. Install all the required packages and dependencies for frontend by running the below command in client directory.

```
npm install
```

b. Install all the required packages and dependencies for backend by running the following command in server directory.

```
go mod init server
```

```
go mod tidy
```

Step-3. export the following environment variables by running these command in the command line.

```
export DATABASE=localhost:6379
export PORT=5000
```

Step-4. Start the frontend on your localhost by running the followiung command.

```
npm run dev
```

Step-5. Start the backend on your localhost by running the followiung command.

```
go run main.go
```

## Deployment

The application is deployed and is running live.

The frontend is deployed on vercel.

Frontend Link - https://emitrr-assessment-cat-game.vercel.app/

The backend is deployed on render

Backend Link - https://cat-game-nx1e.onrender.com
