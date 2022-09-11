import React, {useEffect, useMemo, useState} from "react";
import { handleNumber } from "./UsefulFunctions";
import MealTime from "./MealTime";

export type foodObj = {
    FoodName: string,
    FoodCalories: number,
    MealName: string
};

const CalorieTracker = () => {
    const [calorieGoal, setCalorieGoal] = useState(() => parseInt(localStorage.getItem('CalorieGoal') || '0'));
    const [currentCalories, setCurrentCalories] = useState(0);
    const [calorieInput, setCalorieInput] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [mealName, setMealName] = useState('');
    var foodArray: foodObj[] = JSON.parse(localStorage.getItem('FoodList') || '[]');
    const [foodList, setFoodList] = useState(foodArray);
    const [tempCalorieInput, setTempCalorieInput] = useState(0);
    // const [resetCalorie, setResetCalorie] = useState();

    function DeleteFood(food): void {
        setFoodList(prevList => prevList.filter(item => item !== food));
    }

    function AddCalories(): void {
        if(foodName.length === 0) {
            alert('Input is empty');
            return;
        }

        var newFood: foodObj = {
            FoodName: foodName,
            FoodCalories: calorieInput,
            MealName: mealName
        };

        setFoodList([...foodList, newFood]);

        //reseting input feilds
        setCalorieInput(0);
        setFoodName('');
        setMealName('');
    }

    useEffect(() => {
        localStorage.setItem('FoodList', JSON.stringify(foodList));
    }, [foodList.length]);
    
    function handleFoodNameChange({target}): void {
        setFoodName(target.value);
    }

    //Update Calorie Sum when food list is updated
    useEffect(() => {
        var calorieSum: number = 0;
        
        foodList.forEach((food: foodObj) => {
            calorieSum += food.FoodCalories;
        });

        setCurrentCalories(calorieSum);
    }, [foodList.length]);

    const calorieGoalChangeDisplay = useMemo(() => {
        if(calorieGoal <= 0) {
            return (
            <div>
                <input type='number' value={tempCalorieInput} onChange={({target}) => {
                    setTempCalorieInput(handleNumber(target.value));
                }} />
                <input type='button' value='Submit' onClick={() => {
                    var input: number = handleNumber(tempCalorieInput);
                    if(!input) {
                        return;
                    }
                    localStorage.setItem('CalorieGoal', JSON.stringify(input));
                    setCalorieGoal(input);
                    setTempCalorieInput(0);
                }} />
            </div>)
        }

        return ( 
            <button onClick={() => {
            setCalorieGoal(0);
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
        var [breakfastList, lunchList, dinnerList, snackList]: foodObj[][] = [[],[],[],[]];
        foodList.forEach((food: foodObj) => {
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
                    console.log(`${food.FoodName} does not have a meal assigned to it.`);
                    break;
            }

        });
        return (
            <>
                <MealTime mealName='Breakfast' mealList={breakfastList} DeleteFoodCallBack={DeleteFood} AddToMealCallBack={(meal) => setMealName(meal)} />
                <br />
                <MealTime mealName='Lunch' mealList={lunchList} DeleteFoodCallBack={DeleteFood} AddToMealCallBack={(meal) => setMealName(meal)} />
                <br />
                <MealTime mealName='Dinner' mealList={dinnerList} DeleteFoodCallBack={DeleteFood} AddToMealCallBack={(meal) => setMealName(meal)} />
                <br />
                <MealTime mealName='Snack' mealList={snackList} DeleteFoodCallBack={DeleteFood} AddToMealCallBack={(meal) => setMealName(meal)} />
            </>
        )
    }, [foodList]);

    const FoodInput = useMemo(() => {
        if(!mealName) {
            return <></>;
        }

        return (
            <div>
                <label>Name</label>
                <input type='text' value={foodName} placeholder="Food Name" onChange={handleFoodNameChange} />
                <br />
                <label>Calories</label>
                <input type='number' value={calorieInput} onChange={({target}) => {
                    var inputValue: number = handleNumber(target.value);
                    setCalorieInput(inputValue);
                }} />
                <br />
                <input type='button' value='Add Food' onClick={AddCalories} />
            </div>
        );
    }, [mealName, foodName, calorieInput]);

    return (
        <div>
            <h1>Hello Calories</h1>
            {calorieGoalChangeDisplay}
            <h1 id="calorie-display">{calorieGoal} - {currentCalories} = {caloriesLeft}</h1>
            <div>
                {FoodInput}
            </div>
            <div>
                {foodRender}
            </div>
        </div>
    );
}

export default CalorieTracker;