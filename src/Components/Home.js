import React, {useEffect, useMemo, useState} from "react";

const Home = () => {
    const [calorieGoal, setCalorieGoal] = useState(parseInt(localStorage.getItem('CalorieGoal')));
    const [currentCalories, setCurrentCalories] = useState(0);
    const [caloriesLeft, setCaloriesLeft] = useState(0);
    const [calorieInput, setCalorieInput] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState([{
        FoodName: '',
        FoodCalories: 0
    }]);
    const [tempCalorieInput, setTempCalorieInput] = useState(0);
    const [foodListRender, setFoodListRender] = useState();
    const [resetCalorie, setResetCalorie] = useState();

    function DeleteFood(food) {
        delete foodList[foodList.indexOf(food)];
    }

    
    function handleNumber(num) {
        var tempVar = parseInt(num);
        if(Number.isNaN(tempVar)) {
            return 0;
        }
        return tempVar;
    }

    function AddCalories() {
        const food = {
            FoodName: foodName,
            FoodCalories: calorieInput
        }
        console.log(foodList);
        var tempArray = foodList;
        tempArray.push(food);
        setFoodList(tempArray);
        console.log(foodList);
        setCalorieInput(0);
        setFoodName('');
    }
    
    
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
    }, [foodList])

    //Set Calorie Goal Value on first render
    const inputGoalRender = (
        <div>
            <input type='number' value={tempCalorieInput} onChange={({target}) => {
                var inputValue = handleNumber(target.value);
                setTempCalorieInput(inputValue);
            }} />
            <input type='button' value='Submit' onClick={() => {
                localStorage.setItem('CalorieGoal', tempCalorieInput);
                setCalorieGoal(tempCalorieInput);
                setTempCalorieInput(0);
                setResetCalorie(resetButton);
            }} />
        </div>
    );
    
    const resetButton = (
        <button onClick={() => {
            setCalorieGoal(null);
            localStorage.removeItem('CalorieGoal');
            setResetCalorie();
        }} >Change Calorie Goal</button>
    );

    useEffect(() => {
        if(Number.isNaN(parseInt(calorieGoal)) === false) {
            setResetCalorie(resetButton);
        }
    },[calorieGoal]);

    useEffect(() => {
        if(calorieGoal === undefined || Number.isNaN(parseInt(calorieGoal))) {
            setCalorieGoal(inputGoalRender);
        }
    }, [tempCalorieInput, resetCalorie]);

    //Calculate Calores left when two inputs change
    useEffect(() => {
        if(Number.isNaN(calorieGoal-currentCalories))
            return;
        setCaloriesLeft(calorieGoal-currentCalories);
    }, [calorieGoal, currentCalories]);

    //render the food list under the food input hen foodList Changes
    const renderFoodList = useMemo(() => {
            foodList.map((e) => (
                <li key={toString(e.FoodName + foodList.indexOf(e))}>
                    <h1>{e.FoodName}</h1>
                    <h2>{e.FoodCalories}</h2>
                    <button onClick={DeleteFood(e)} >Delete Food</button>
                </li>
            ))
    }, [foodList]);

    return (
        <div>
            <h1>Hello Calories</h1>
            {resetCalorie}
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
                <input type='button' value='Add Food' onClick={AddCalories} />
            </div>
            <ol>
                {renderFoodList}
            </ol>
        </div>
    );
}

export default Home;