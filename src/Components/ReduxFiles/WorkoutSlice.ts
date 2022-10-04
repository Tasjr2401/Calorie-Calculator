import { createSlice } from "@reduxjs/toolkit";
import { Workout } from '../WorkoutTracker';

interface WorkoutTrackerState {
    workoutList: Workout[]
};

const initialState: WorkoutTrackerState = {
    workoutList: []
};

const WorkoutSlice = createSlice({
    name: 'WorkoutTracker',
    initialState,
    reducers: {
        loadWorkouts: (state = initialState, action: {payload: Workout[]}): WorkoutTrackerState => {
            return {
                ...state,
                workoutList: action.payload
            }
        },
        addWorkout: (state = initialState, action: {payload: Workout}): WorkoutTrackerState => {
            return {
                ...state,
                workoutList: [...state.workoutList, action.payload]
            }
        },
        removeWorkout: (state = initialState, action: {payload: number}): WorkoutTrackerState => {
            return {
                ...state,
                workoutList: state.workoutList.filter(x => x.id !== action.payload)
            };
        }
    }
});

export const workoutReducer = WorkoutSlice.reducer;
export const workoutActions = WorkoutSlice.actions;