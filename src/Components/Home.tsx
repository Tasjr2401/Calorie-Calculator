import React, {useEffect, useMemo, useState} from "react";
import {generateID, handleNumber} from './UsefulFunctions';
import MealTime from './MealTime';
import { useSelector, useDispatch } from "react-redux";
import { foodActions } from "./ReduxFiles/FoodSlice";
import { RootType } from "./ReduxFiles/Store";

export interface foodObj {
    id: number,
    foodName: string,
    foodCalories: number,
    mealName: string
};

interface Fruit {
    type: 'Fruit';
    name: string;
    calories: number;
}

type Meat = {
    type: 'Meat';
    name: string;
    calories: number;
    protein: number;
    eat(): void;
}

type Food = Fruit | Meat;

const f: Food = {
    type: 'Meat',
    name: 'Steak',
    calories: 300,
    protein: 9,
    eat() { console.log('eating'); },
};

function eat(f: Food) {
    if (f.type == 'Meat') {
        console.log('you ate ' + f.protein + ' grams of protein');
    } else {
        console.log('better get your protein elsewhere');
    }
}

const CalorieTracker = () => {
    const { calorieGoal, foodList } = useSelector((state: RootType) => state.foodTracker);
    const dispatch = useDispatch();

    useEffect(() => {
        var foodArray: foodObj[] = JSON.parse(localStorage.getItem('FoodList') || '[]');
        var localCalorieGoal: number = JSON.parse(localStorage.getItem('CalorieGoal') || '0');
        dispatch(foodActions.loadFood(foodArray));
        dispatch(foodActions.changeCalorieGoal(localCalorieGoal));
    },[]);

    useEffect(() => {
        localStorage.setItem('FoodList', JSON.stringify(foodList));
    }, [foodList]);

    const currentCalories: number = foodList.reduce((sum, food) => sum + food.foodCalories, 0);

    return (
        <div>
            <h1>Hello Calories</h1>
            <CalorieGoalChangeDisplay />
            <h1 id="calorie-display">{calorieGoal} - {currentCalories} = {calorieGoal-currentCalories}</h1>
            <div>
                <FoodInput />
            </div>
            <div>
                <MealTime mealName='Breakfast' />
                <br />
                <MealTime mealName='Lunch' />
                <br />
                <MealTime mealName='Dinner' />
                <br />
                <MealTime mealName='Snack' />
            </div>
        </div>
    );
}


const CalorieGoalChangeDisplay = () => {
    const { calorieGoal } = useSelector((state: RootType) => state.foodTracker);
    const dispatch = useDispatch();
    
    function handleCalorieChange(form: React.FormEvent<HTMLFormElement>) {
        form.preventDefault();
        
        //search the elements in the form through the current target property and search as HTMLInputElement.
        const calorieInput: number = handleNumber((form.currentTarget.elements.namedItem('calorieInput') as HTMLInputElement).value);
        if(!calorieInput) {
            return;
        }

        localStorage.setItem('CalorieGoal', JSON.stringify(calorieInput));
        dispatch(foodActions.changeCalorieGoal(calorieInput));
    }
    
    if(calorieGoal <= 0) {
        return (
            <form onSubmit={handleCalorieChange}>
            <input type='number' name='calorieInput'  />
            <input type='submit' value='Submit' />
        </form>)
    }
    
    return ( 
        <button onClick={() => {
            dispatch(foodActions.changeCalorieGoal(0));
            localStorage.removeItem('CalorieGoal');
        }} >Change Calorie Goal</button>
        )
    }
    
const FoodInput = () => {
    const { currentMealName } = useSelector((state: RootType) => state.foodTracker);
    const dispatch = useDispatch();

    function addFoodToList(form: React.FormEvent<HTMLFormElement>) {
        form.preventDefault();

        const foodName: string = (form.currentTarget.elements.namedItem('FoodName') as HTMLInputElement).value;
        const foodCalories: number = handleNumber((form.currentTarget.elements.namedItem('FoodCalories') as HTMLInputElement).value);

        if(foodName.length === 0) {
            alert('Input is empty');
            return;
        }

        const foodId: number = generateID();
        var newFood: foodObj = {
            id: foodId,
            foodName: foodName,
            foodCalories: foodCalories,
            mealName: currentMealName
        };

        //setFoodList([...foodList, newFood]);
        dispatch(foodActions.addFood(newFood));
        dispatch(foodActions.finishedEnteringMeal());
    }

    if(!currentMealName || currentMealName.length === 0) {
        return <></>;
    }

    return (
        <form onSubmit={addFoodToList}>
            <label>Name</label>
            <input type='text' name='FoodName' placeholder="Food Name" />
            <br />
            <label>Calories</label>
            <input type='number' name='FoodCalories' />
            <br />
            <input type='submit' value='Add Food' />
        </form>
    );
}

export default CalorieTracker;