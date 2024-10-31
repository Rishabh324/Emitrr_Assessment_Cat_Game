// import { createSlice } from '@reduxjs/toolkit';
import { START_GAME, DRAW_CARD, SHUFFLE_DECK, SET_USERNAME, UPDATE_LEADERBOARD, GAME_STATUS } from './actions';

const initialState = {
    deck: [],
    drawnCards: [],
    gameStatus: 'notStarted',
    defuseAvailable: false,
    username: '',
    leaderboard: [],
    drawnCard: ''
};

function gameReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERNAME:
            return { ...state, username: action.payload };

        case START_GAME:
            {const initialDeck = ['Cat 😼', 'Defuse 🙅‍♂️', 'Shuffle 🔀', 'Exploding Kitten 💣', 'Cat 😼'].sort(() => Math.random() - 0.5);
            return { ...state, deck: initialDeck, drawnCards: [], gameStatus: 'inProgress', defuseAvailable: false };}

        case DRAW_CARD:
            {if (state.deck.length === 0 || state.gameStatus !== 'inProgress') return state;
            const [drawnCard, ...remainingDeck] = state.deck;
            
            console.log(drawnCard);
            if (drawnCard === 'Exploding Kitten 💣' && !state.defuseAvailable) {
                return { ...state, gameStatus: 'lost' };
            }

            if(drawnCard==='Shuffle 🔀' && remainingDeck.length!==0){
                return { ...state, deck: ['Cat 😼', 'Defuse 🙅‍♂️', 'Shuffle 🔀', 'Exploding Kitten 💣', 'Cat 😼'].sort(() => Math.random() - 0.5), drawnCards: [], defuseAvailable: false };
            }

            return {
                ...state,
                deck: remainingDeck,
                drawnCards: [...state.drawnCards, drawnCard],
                defuseAvailable: drawnCard === 'Defuse 🙅‍♂️' ? true : state.defuseAvailable,
                gameStatus: remainingDeck.length === 0 ? 'won' : state.gameStatus
            };}

        case SHUFFLE_DECK:
            return { ...state, deck: ['Cat 😼', 'Defuse 🙅‍♂️', 'Shuffle 🔀', 'Exploding Kitten 💣', 'Cat 😼'].sort(() => Math.random() - 0.5), drawnCards: [] };
        
        case GAME_STATUS:
            return { ...state, gameStatus: action.payload };

        case UPDATE_LEADERBOARD:
            return { ...state, leaderboard: action.payload };

        default:
            return state;
    }
}

export default gameReducer;
