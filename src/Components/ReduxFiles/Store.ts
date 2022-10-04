import { configureStore } from '@reduxjs/toolkit';
import { foodReducer } from './FoodSlice';
import { workoutReducer } from './WorkoutSlice';

const storeOptions = {
    reducer: {
        foodTracker: foodReducer,
        workoutTracker: workoutReducer
    }
};

export const store = configureStore(storeOptions);
const rootState = store.getState();
export type RootType = typeof rootState;
export const { dispatch } = store;