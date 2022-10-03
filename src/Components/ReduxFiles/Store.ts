import { configureStore, ConfigureStoreOptions, Store } from '@reduxjs/toolkit';
import { type } from '@testing-library/user-event/dist/type';
import { foodReducer } from './FoodSlice';

const storeOptions = {
    reducer: {
        foodTracker: foodReducer
    }
};

export const store = configureStore(storeOptions);
const rootState = store.getState();
export type RootType = typeof rootState;
export const { dispatch } = store;