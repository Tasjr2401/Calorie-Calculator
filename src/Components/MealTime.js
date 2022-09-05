import React, { useMemo } from "react";

const MealTime = ({mealName, mealList, DeleteFood}) => {
    const mealListRender = useMemo(() => {
        mealList.map(food => 
            <li key={mealList.indexOf(food)}>
                <h3>{food.FoodName}<p>{food.FoodCalories}</p></h3>
                <button onClick={DeleteFood(food)}>Delete</button>
            </li>
        )
    }, []);

    return (
        <div>
            <h2>{mealName}</h2>
            <ol>
                {mealListRender}
            </ol>
        </div>
    )
};

export default MealTime;