import React, {useEffect, useState} from "react";

const Home = () => {
    const [calorieGoal, setCalorieGoal] = useState(0);
    const [currentCalories, setCurrentCalories] = useState(0);
    const [caloriesLeft, setCaloriesLeft] = useState(0);
    const [calorieInput, setCalorieInput] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState([]);

    function AddCalories() {
        const food = {
            FoodName: foodName,
            FoodCalories: calorieInput
        }
        setFoodList(foodList.push(food));

        setCalorieInput(0);
        setFoodName('');

        var d = new Date();
        var CalorieData = {
            Date: d.toString(),
            DailyCalorieGoal: calorieGoal,
            CurrentCalorieInput: currentCalories,

        }
    }

    //Update Calorie Sum when food list is updated
    useEffect(() => {
        var calorieSum = 0;

        foodList.forEach((food) => {
            calorieSum += food.FoodCalories;
        });

        setCurrentCalories(calorieSum);
    }, [foodList])

    //Set Calorie Goal Value on first render
    useEffect(() => {
        if(!localStorage.getItem('CalorieGoal')) 
            window.location.pathname = '/SetGoal';
        
        setCalorieGoal(localStorage.getItem('CalorieGoal'));
    }, []);

    //Calculate Calores left when two inputs change
    useEffect(() => {
        setCaloriesLeft(calorieGoal-currentCalories);
    }, [calorieGoal, currentCalories]);

    return (
        <div>
            <h1>Hello Calories</h1>
            <h1 id="calorie-display">{calorieGoal} - {currentCalories} = {caloriesLeft}</h1>
            <div>
                <label>Name</label>
                <input type='text' onChange={setFoodName(this.value)} />
                <br />
                <label>Calories</label>
                <input type='number' onChange={setCalorieInput(this.value)} />
                <br />
                <input type='button' onClick={AddCalories} />
            </div>
        </div>
    );
}

export default Home;