import { createSlice } from '@reduxjs/toolkit';
import { foodObj } from '../Home';

export interface FoodTrackerState {
    calorieGoal: number,
    foodList: foodObj[],
    isEnteringMeal: Boolean,
    currentMealName: string
}

const initialState: FoodTrackerState = {
    calorieGoal: 0,
    foodList: [],
    isEnteringMeal: false,
    currentMealName: ''
}

const FoodTrackerSlice = createSlice({
    name: 'FoodTracker',
    initialState,
    reducers: {
        loadFood: (state = initialState, action: {payload: foodObj[]}): FoodTrackerState => {
            return {
                ...state,
                foodList: action.payload
            }
        },
        addFood: (state = initialState, action: {payload: foodObj}): FoodTrackerState => {
            return {
                ...state,
                foodList: [...state.foodList, action.payload]
            };
        },
        removeFood: (state = initialState, action: {payload: number}): FoodTrackerState => {
            return {
                ...state,
                foodList: state.foodList.filter(x => x.id !== action.payload)
            };
        },
        changeCalorieGoal: (state = initialState, action: {payload: number}): FoodTrackerState => {
            return {
                ...state,
                calorieGoal: action.payload
            };
        },
        enteringMeal: (state = initialState, action: {payload: string}): FoodTrackerState => {
            return {
                ...state,
                isEnteringMeal: true,
                currentMealName: action.payload
            }
        },
        finishedEnteringMeal: (state = initialState): FoodTrackerState => {
            return {
                ...state,
                isEnteringMeal: false,
                currentMealName: ''
            }
        }
    }
});

export const foodReducer = FoodTrackerSlice.reducer;
export const foodActions = FoodTrackerSlice.actions;
