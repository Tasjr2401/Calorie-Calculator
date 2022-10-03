import React, { useMemo } from "react";
import { foodObj } from "./Home";
import { useDispatch } from 'react-redux';
import { foodActions } from "./ReduxFiles/FoodSlice";

interface MealTimePropTypes {
    MealName: string;
    MealList: foodObj[];
}

const MealTime = ({MealName, MealList}: MealTimePropTypes) => {
    const dispatch = useDispatch();
    
    const mealListRender = useMemo(() => {
        if(!MealList || MealList.length === 0) {
            return <h2>Nothing has been added for this meal</h2>
        }
        return MealList.map(food => 
            <li key={MealList.indexOf(food)}>
                <h3>{food.FoodName}<p>{food.FoodCalories}</p></h3>
                <button onClick={() => dispatch(foodActions.removeFood(food))}>Delete</button>
            </li>
        )}, [MealList.length]);

    return (
        <div>
            <h2>{MealName}</h2>
            <ol>
                {mealListRender}
            </ol>
            <input value='Add Meal' type='button' onClick={() => dispatch(foodActions.enteringMeal(MealName))}/>
        </div>
    )
};

export default MealTime;