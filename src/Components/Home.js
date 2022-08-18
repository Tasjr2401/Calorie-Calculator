import React, {useEffect, useState} from "react";

const Home = () => {
    const [calorieGoal, setCalorieGoal] = useState(0);
    const [currentCalories, setCurrentCalories] = useState(0);
    const [caloriesLeft, setCaloriesLeft] = useState(0);
    const [calorieInput, setCalorieInput] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState([]);
    const [tempCalorieInput, setTempCalorieInput] = useState(0);
    const [foodListRender, setFoodListRender] = useState();

    function DeleteFood(food) {
        delete foodList[foodList.indexOf(food)];
    }

    function AddCalories() {
        const food = {
            FoodName: foodName,
            FoodCalories: calorieInput
        }
        setFoodList(foodList.push(food));

        setCalorieInput(0);
        setFoodName('');
    }

    function handleFoodNameChange({target}) {
        setFoodName(target.value);
    }

    function handleCalorieInputChange({target}) {
        setCalorieInput(target.value);
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
    const inputGoalRender = (
        <div>
            <input type='number' value={tempCalorieInput} onChange={({target}) => {
                setTempCalorieInput(target.value);
            }} />
            <input type='button' value='Submit' onClick={() => {
                localStorage.setItem('CalorieGoal', tempCalorieInput);
                setCalorieGoal(tempCalorieInput);
            }} />
        </div>
    );
    useEffect(() => {
        const calorie = localStorage.getItem('CalorieGoal');
        if(calorie) 
            setCalorieGoal(localStorage.getItem('CalorieGoal'));
            
        setCalorieGoal(inputGoalRender);
    }, []);

    //Calculate Calores left when two inputs change
    useEffect(() => {
        if(Number.isNaN(calorieGoal-currentCalories))
            return;
        setCaloriesLeft(calorieGoal-currentCalories);
    }, [calorieGoal, currentCalories]);

    //render the food list under the food input hen foodList Changes
    useEffect(() => {
        setFoodListRender(() => {
            foodList.map((e) => {
                <li id={e.FoodName}>
                    <h1>{e.foodName}</h1>
                    <h2>{e.FoodCalories}</h2>
                    <button onClick={DeleteFood(e)}>Delete</button>
                </li>
            });
        })
    }, [foodList]);

    return (
        <div>
            <h1>Hello Calories</h1>
            <h1 id="calorie-display">{calorieGoal} - {currentCalories} = {caloriesLeft}</h1>
            <div>
                <label>Name</label>
                <input type='text' value='' placeholder="Food Name" onChange={handleFoodNameChange} />
                <br />
                <label>Calories</label>
                <input type='number' value={0} onChange={handleCalorieInputChange} />
                <br />
                <input type='button' value='Add Food' onClick={AddCalories} />
            </div>
            <ol>
                {foodListRender}
            </ol>
        </div>
    );
}

export default Home;