import React, { useMemo } from "react";

const MealTime = ({mealName, mealList, DeleteFoodCallBack, AddToMealCallBack}) => {
    const mealListRender = useMemo(() => {
        if(!mealList || mealList.length === 0) {
            return <h2>Nothing has been added for this meal</h2>
        }
        return mealList.map(food => 
            <li key={mealList.indexOf(food)}>
                <h3>{food.FoodName}<p>{food.FoodCalories}</p></h3>
                <button onClick={() => DeleteFoodCallBack(food)}>Delete</button>
            </li>
        )}, [mealList.length]);

    return (
        <div>
            <h2>{mealName}</h2>
            <ol>
                {mealListRender}
            </ol>
            <input value='Add Meal' type='button' onClick={() => AddToMealCallBack(mealName)}/>
        </div>
    )
};

export default MealTime;