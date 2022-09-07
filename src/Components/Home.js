import React, {useEffect, useMemo, useState} from "react";
import { handleNumber } from "./UsefulFunctions";
import MealTime from "./MealTime";

const CalorieTracker = () => {
    const [calorieGoal, setCalorieGoal] = useState(() => {
        var temp = parseInt(localStorage.getItem('CalorieGoal'));
        if(temp) {
            return temp; 
        }
        return 0;
    });
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
    // const [resetCalorie, setResetCalorie] = useState();

    function DeleteFood(food) {
        var index = foodList.indexOf(food);
        var newFoodList = [...foodList];
        newFoodList.splice(index, 1);
        setFoodList(newFoodList);
    }

    function AddCalories() {
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
    }, [foodList.length]);

    const calorieGoalChangeDisplay = useMemo(() => {
        if(!calorieGoal || calorieGoal === 0) {
            return (
            <div>
                <input type='number' value={tempCalorieInput} onChange={({target}) => {
                    setTempCalorieInput(handleNumber(target.value));
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
    }, [calorieGoal, tempCalorieInput]);

    //Calculate Calores left when two inputs change
    const caloriesLeft = useMemo(() => {
        if(Number.isNaN(calorieGoal-currentCalories))
            return 0;
        return (calorieGoal-currentCalories);
    }, [calorieGoal, currentCalories]);

    const foodRender = useMemo(() => {
        var [breakfastList, lunchList, dinnerList, snackList] = [[],[],[],[]];
        foodList.forEach((food) => {
            switch(food.MealName) {
                case 'Breakfast':
                    breakfastList.push(food);
                    break;
                case 'Lunch':
                    lunchList.push(food);
                    break;
                case 'Dinner': 
                    dinnerList.push(food);
                    break;
                case 'Snack':
                    snackList.push(food);
                    break;
                default:
                    alert(`${food.MealName} does not have a meal assigned to it.`);
                    break;
            }

        });
        return (
            <>
                <MealTime mealName='Breakfast' mealList={breakfastList} DeleteFoodCallBack={(food) => DeleteFood(food)} />
                <br />
                <MealTime mealName='Lunch' mealList={lunchList} DeleteFoodCallBack={(food) => DeleteFood(food)} />
                <br />
                <MealTime mealName='Dinner' mealList={dinnerList} DeleteFoodCallBack={(food) => DeleteFood(food)} />
                <br />
                <MealTime mealName='Snack' mealList={snackList} DeleteFoodCallBack={(food) => DeleteFood(food)} />
            </>
        )
    }, [foodList]);

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
                <label>Meal: </label>
                <select selected='Breakfast' name="Meal" onChange={({target}) => {
                    setMealName(target.value);
                }}>
                    <option value='Breakfast'>Breakfast</option>    
                    <option value='Lunch'>Lunch</option>
                    <option value='Dinner'>Dinner</option>
                    <option value='Snacks'>Snacks</option>
                </select> 
                <br />
                <input type='button' value='Add Food' onClick={AddCalories} />
            </div>
            <div>
                {foodRender}
            </div>
        </div>
    );
}

export default CalorieTracker;