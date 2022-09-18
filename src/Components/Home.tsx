import React, {useEffect, useMemo, useState} from "react";
import {handleNumber} from './UsefulFunctions';
import MealTime from './MealTime';

export type foodObj = {
    FoodName: string,
    FoodCalories: number,
    MealName: string
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
    const [calorieGoal, setCalorieGoal] = useState(() => parseInt(localStorage.getItem('CalorieGoal') || '0'));
    // const [currentCalories, setCurrentCalories] = useState(0);
    const [calorieInput, setCalorieInput] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [mealName, setMealName] = useState('');
    var foodArray: foodObj[] = JSON.parse(localStorage.getItem('FoodList') || '[]');
    const [foodList, setFoodList] = useState(foodArray);
    const [tempCalorieInput, setTempCalorieInput] = useState(0);
    // const [resetCalorie, setResetCalorie] = useState();

    function DeleteFood(food: foodObj): void {
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

    //Update Calorie Sum when food list is updated
    // useEffect(() => {
    //     var calorieSum: number = 0;
        
    //     foodList.forEach((food: foodObj) => {
    //         calorieSum += food.FoodCalories;
    //     });

    //     setCurrentCalories(calorieSum);
    // }, [foodList.length]);

    const currentCalories = foodList.reduce((sum, food) => sum + food.FoodCalories, 0);

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
                <MealTime MealName='Breakfast' MealList={breakfastList} DeleteFoodCallBack={DeleteFood} AddToMealCallBack={(meal) => setMealName(meal)} />
                <br />
                <MealTime MealName='Lunch' MealList={lunchList} DeleteFoodCallBack={DeleteFood} AddToMealCallBack={(meal) => setMealName(meal)} />
                <br />
                <MealTime MealName='Dinner' MealList={dinnerList} DeleteFoodCallBack={DeleteFood} AddToMealCallBack={(meal) => setMealName(meal)} />
                <br />
                <MealTime MealName='Snack' MealList={snackList} DeleteFoodCallBack={DeleteFood} AddToMealCallBack={(meal) => setMealName(meal)} />
            </>
        )
    }, [foodList]);

    return (
        <div>
            <h1>Hello Calories</h1>
            {calorieGoalChangeDisplay}
            <h1 id="calorie-display">{calorieGoal} - {currentCalories} = {calorieGoal-currentCalories}</h1>
            <div>
                <FoodInput MealName={mealName} FoodName={foodName} HandleFoodNameChange={(e: string) => {setFoodName(e)}} CalorieInput={calorieInput} SetCalorieInputState={(e: number) => setCalorieInput(e)} AddCaloriesCallBack={AddCalories} />
                
            </div>
            <div>
                {foodRender}
            </div>
        </div>
    );
}

interface FoodInputPropTypes {
    MealName: string;
    FoodName: string;
    HandleFoodNameChange: (arg0: string) => void;
    CalorieInput: number;
    SetCalorieInputState: (arg0: number) => void;
    AddCaloriesCallBack: () => void;
}

const FoodInput = ({MealName, FoodName, HandleFoodNameChange, CalorieInput, SetCalorieInputState, AddCaloriesCallBack}: FoodInputPropTypes) => {
    if(!MealName) {
        return <></>;
    }

    return (
        <div>
            <label>Name</label>
            <input type='text' value={FoodName} placeholder="Food Name" onChange={({target}) => HandleFoodNameChange(target.value)} />
            <br />
            <label>Calories</label>
            <input type='number' value={CalorieInput} onChange={({target}) => {
                var inputValue: number = handleNumber(target.value);
                SetCalorieInputState(inputValue);
            }} />
            <br />
            <input type='button' value='Add Food' onClick={AddCaloriesCallBack} />
        </div>
    );
}

export default CalorieTracker;