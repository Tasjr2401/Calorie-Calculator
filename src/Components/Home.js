import React, {useEffect, useMemo, useState} from "react";
import { handleNumber } from "./UsefulFunctions";

const CalorieTracker = () => {
    const [calorieGoal, setCalorieGoal] = useState(parseInt(localStorage.getItem('CalorieGoal')));
    const [currentCalories, setCurrentCalories] = useState(0);
    const [calorieInput, setCalorieInput] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [mealName, setMealName] = useState('');
    var foodArray = JSON.parse(localStorage.getItem('FoodList'));
    if(!foodArray) {
        foodArray = [];
    }
    const [foodList, setFoodList] = useState(foodArray);
    const [tempCalorieInput, setTempCalorieInput] = useState(0);
    const [resetCalorie, setResetCalorie] = useState();

    function DeleteFood(food) {
        var index = foodList.indexOf(food);
        var newFoodList = [...foodList];
        newFoodList.splice(index, 1);
        setFoodList(newFoodList);
    }

    function AddCalories(mealName) {
        if(Number.isNaN(calorieInput) || foodName.length === 0) {
            alert('Input is empty');
            return;
        }

        var newFood = {
            FoodName: foodName,
            FoodCalories: calorieInput,
            MealName: mealName
        };

        setFoodList([...foodList, newFood]);

        //reseting input feilds
        setCalorieInput(0);
        setFoodName('');
    }

    useEffect(() => {
        localStorage.setItem('FoodList', JSON.stringify(foodList));
    }, [foodList.length]);
    
    function handleFoodNameChange({target}) {
        setFoodName(target.value);
    }

    //Update Calorie Sum when food list is updated
    useEffect(() => {
        var calorieSum = 0;
        
        foodList.forEach((food) => {
            calorieSum += food.FoodCalories;
        });

        setCurrentCalories(calorieSum);
    }, [foodList.length])

    //Set Calorie Goal Value on first render
    // const inputGoalRender = (
    //     <div>
    //         <input type='number' value={tempCalorieInput} onChange={({target}) => {
    //             var inputValue = handleNumber(target.value);
    //             setTempCalorieInput(inputValue);
    //         }} />
    //         <input type='button' value='Submit' onClick={() => {
    //             localStorage.setItem('CalorieGoal', tempCalorieInput);
    //             setCalorieGoal(tempCalorieInput);
    //             setTempCalorieInput(0);
    //             setResetCalorie(resetButton);
    //         }} />
    //     </div>
    // );
    
    // const resetButton = (
    //     <button onClick={() => {
    //         setCalorieGoal(null);
    //         localStorage.removeItem('CalorieGoal');
    //         setResetCalorie();
    //     }} >Change Calorie Goal</button>
    // );


    const calorieGoalChangeDisplay = useMemo(() => {
        if(!calorieGoal || calorieGoal === 0) {
            return (
            <div>
                <input type='number' value={tempCalorieInput} onChange={({target}) => {
                    var inputValue = handleNumber(target.value);
                    setTempCalorieInput(inputValue);
                }} />
                <input type='button' value='Submit' onClick={() => {
                    var input = handleNumber(tempCalorieInput);
                    if(Number.isNaN(input)) {
                        return;
                    }
                    localStorage.setItem('CalorieGoal', input);
                    setCalorieGoal(input);
                    setTempCalorieInput(0);
                }} />
            </div>)
        }

        return ( 
            <button onClick={() => {
            setCalorieGoal(null);
            localStorage.removeItem('CalorieGoal');
            }} >Change Calorie Goal</button>
        )
    }, [calorieGoal]);

    // useEffect(() => {
    //     if(Number.isNaN(parseInt(calorieGoal)) === false) {
    //         setResetCalorie(resetButton);
    //     }
    // },[calorieGoal]);

    // useEffect(() => {
    //     if(calorieGoal === undefined || Number.isNaN(parseInt(calorieGoal))) {
    //         setCalorieGoal(inputGoalRender);
    //     }
    // }, [tempCalorieInput, resetCalorie]);

    //Calculate Calores left when two inputs change
    const caloriesLeft = useMemo(() => {
        if(Number.isNaN(calorieGoal-currentCalories))
            return; 0
        return (calorieGoal-currentCalories);
    }, [calorieGoal, currentCalories]);

    const foodRender = useMemo(() => (
        foodList.map(e =>
        <li key={e.FoodCalories + foodList.indexOf(e)}>
            <h1>{e.FoodName}</h1>
            <h2>{e.FoodCalories}</h2>
            <button onClick={() => {
                DeleteFood(e)
            }} >Delete Food</button>
        </li>
        )), [foodList.length]);

    return (
        <div>
            <h1>Hello Calories</h1>
            {calorieGoalChangeDisplay}
            <h1 id="calorie-display">{calorieGoal} - {currentCalories} = {caloriesLeft}</h1>
            <div>
                <label>Name</label>
                <input type='text' value={foodName} placeholder="Food Name" onChange={handleFoodNameChange} />
                <br />
                <label>Calories</label>
                <input type='number' value={calorieInput} onChange={({target}) => {
                    var inputValue = handleNumber(target.value);
                    setCalorieInput(inputValue);
                }} />
                <br />
                <input type='text'value={mealName} placeholder='Meal Name' onChange={({target}) => {
                    setMealName(target.value);
                }} /> 
                <br />
                <input type='button' value='Add Food' onClick={AddCalories} />
            </div>
            <ol>
                {foodRender}
            </ol>
        </div>
    );
}

export default CalorieTracker;