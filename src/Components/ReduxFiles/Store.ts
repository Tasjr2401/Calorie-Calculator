import { configureStore, ConfigureStoreOptions, Store } from '@reduxjs/toolkit';
import { type } from '@testing-library/user-event/dist/type';
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