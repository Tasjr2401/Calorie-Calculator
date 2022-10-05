import { createSlice } from "@reduxjs/toolkit";
import { CompletionTriggerKind } from "typescript";
import { Book } from '../BookTracker';

interface BookTrackerState {
    bookList: Book[]
};

const initialState: BookTrackerState = {
    bookList: []
};

const BookTrackerSlice = createSlice({
    name: 'BookTracker',
    initialState,
    reducers: {
        loadBooks: (state = initialState, action: {payload: Book[]}): BookTrackerState => {
            return {
                ...state,
                bookList: action.payload
            }
        },
        addBook: (state = initialState, action: {payload: Book}): BookTrackerState => {
            return {
                ...state,
                bookList: [...state.bookList, action.payload]
            }
        },
        toggleCompleted: (state = initialState, action: {payload: number}): BookTrackerState => {
            return {
                ...state,
                //map array to update item for completion and then sort array. 
                bookList: state.bookList.map((x: Book) => {
                    if(x.id === action.payload) {
                        return {
                            ...x,
                            completed: !x.completed,
                            lastUpdated: Date.now()
                        }
                    }
                    return x;
                }).sort((a,b) => -1*(a.lastUpdated - b.lastUpdated))
            }
        },
        removeBook: (state = initialState, action: {payload: number}): BookTrackerState => {
            return {
                ...state,
                bookList: state.bookList.filter(x => x.id !== action.payload)
            }
        }
    }
});

export const BookReducer = BookTrackerSlice.reducer;
export const bookActions = BookTrackerSlice.actions;