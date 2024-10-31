export const START_GAME = 'START_GAME';
export const DRAW_CARD = 'DRAW_CARD';
export const SHUFFLE_DECK = 'SHUFFLE_DECK';
export const SET_USERNAME = 'SET_USERNAME';
export const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD';
export const GAME_STATUS = 'GAME_STATUS';

export const startGame = () => ({ type: START_GAME });
export const drawCard = () => ({ type: DRAW_CARD });
export const shuffleDeck = () => ({ type: SHUFFLE_DECK });
export const setGameStatus = (status) => ({ type: GAME_STATUS, payload: status });
export const setUsername = (username) => ({ type: SET_USERNAME, payload: username });
export const updateLeaderboard = (leaderboard) => ({ type: UPDATE_LEADERBOARD, payload: leaderboard });
