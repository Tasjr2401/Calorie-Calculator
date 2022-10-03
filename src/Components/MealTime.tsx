import React, { useMemo } from "react";
import { foodObj } from "./Home";
import { useDispatch, useSelector } from 'react-redux';
import { foodActions } from "./ReduxFiles/FoodSlice";
import { RootType } from "./ReduxFiles/Store";

interface MealTimePropTypes {
    mealName: string;
}

const MealTime = ({mealName}: MealTimePropTypes) => {
    const { foodList } = useSelector((state: RootType) => state.foodTracker);
    const dispatch = useDispatch();
    
    
    const mealListRender = useMemo(() => {
        const mealList = foodList.filter(x => x.MealName === mealName)
        if(!mealList || mealList.length === 0) {
            return <h2>Nothing has been added for this meal</h2>
        }
        return mealList.map(food => 
            <li key={mealList.indexOf(food)}>
                <h3>{food.FoodName}<p>{food.FoodCalories}</p></h3>
                <button onClick={() => dispatch(foodActions.removeFood(food))}>Delete</button>
            </li>
        )}, [foodList]);

    return (
        <div>
            <h2>{mealName}</h2>
            <ol>
                {mealListRender}
            </ol>
            <input value='Add Meal' type='button' onClick={() => dispatch(foodActions.enteringMeal(mealName))}/>
        </div>
    )
};

export default MealTime;