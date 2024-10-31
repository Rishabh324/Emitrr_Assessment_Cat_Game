import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './reducer';

const store = configureStore({ reducer: {
    game: gameReducer,
} });

export default store;
