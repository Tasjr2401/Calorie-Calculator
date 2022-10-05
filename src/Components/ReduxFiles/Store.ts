import { configureStore } from '@reduxjs/toolkit';
import { BookReducer } from './BookSlice';
import { foodReducer } from './FoodSlice';
import { workoutReducer } from './WorkoutSlice';

const storeOptions = {
    reducer: {
        foodTracker: foodReducer,
        workoutTracker: workoutReducer,
        bookTracker: BookReducer
    }
};

export const store = configureStore(storeOptions);
const rootState = store.getState();
export type RootType = typeof rootState;
export const { dispatch } = store;