import React, { useMemo } from "react";
import { foodObj } from "./Home";

interface MealTimePropTypes {
    MealName: string;
    MealList: foodObj[];
    DeleteFoodCallBack: (arg0: foodObj) => void;
    AddToMealCallBack: (arg0: string) => void;
}

const MealTime = ({MealName, MealList, DeleteFoodCallBack, AddToMealCallBack}: MealTimePropTypes) => {
    const mealListRender = useMemo(() => {
        if(!MealList || MealList.length === 0) {
            return <h2>Nothing has been added for this meal</h2>
        }
        return MealList.map(food => 
            <li key={MealList.indexOf(food)}>
                <h3>{food.FoodName}<p>{food.FoodCalories}</p></h3>
                <button onClick={() => DeleteFoodCallBack(food)}>Delete</button>
            </li>
        )}, [MealList.length]);

    return (
        <div>
            <h2>{MealName}</h2>
            <ol>
                {mealListRender}
            </ol>
            <input value='Add Meal' type='button' onClick={() => AddToMealCallBack(MealName)}/>
        </div>
    )
};

export default MealTime;