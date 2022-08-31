import React, {useEffect, useMemo, useState} from "react";
import { handleNumber } from "./UsefulFunctions";

const WorkoutTracker = () => {
    const [workOutList, setWorkOutList] = useState(() => {
        var tempArray = JSON.parse(localStorage.getItem('WorkOutList'));
        if(!tempArray) {
            tempArray = [];
        }
        return tempArray;
    });
    const [workOutName, setWorkOutName] = useState('');
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);

    // function handleNumber(num) {
    //     var tempVar = parseInt(num);
    //     if(Number.isNaN(tempVar)) {
    //         return 0;
    //     }
    //     return tempVar;
    // }

    function DeleteWorkOut(workOut) {
        var index = workOutList.indexOf(workOut);
        var temparray = [...workOutList];
        temparray.splice(index, 1);
        setWorkOutList(temparray);
    }

    function AddWorkout() {
        if(workOutName.length <= 0 || sets <= 0 || reps <= 0) {
            alert('An Input Feild is missing its required information.');
            return;
        }

        setWorkOutList([...workOutList, {
            Name: workOutName,
            Weight: weight,
            Sets: sets,
            Reps: reps
        }]);

        setWorkOutName('');
        setWeight(0);
        setReps(0);
        setSets(0);
    }

    const workOutListRender = useMemo(() => {
        return workOutList.map(e => 
            <li key={workOutList.indexOf(e)}>
                <h1>{e.Name}</h1>
                <h2>Weight in Ibs: {e.Weight}</h2>
                <h2>Sets: {e.Sets}</h2>
                <h2>Reps: {e.Reps}</h2>
                <button onClick={() => {
                    DeleteWorkOut(e);
                }}>Delete Workout</button>
            </li>
        )
    }, [workOutList.length]);

    const totalVolume = useMemo(() => {
        var volume = 0;
        workOutList.forEach(e => {
            volume += (e.Sets * e.Reps) * e.Weight;
        });

        return volume;
    }, [workOutList.length]);

    useEffect(() => {
        localStorage.setItem('WorkOutList', JSON.stringify(workOutList));
    }, [workOutList.length]);

    return (
        <div>
            <h1>Your total volume for these workouts is {totalVolume} pounds</h1>

            <form onSubmit={(e) => {
                e.preventDefault();
                AddWorkout();
            }}>
                <input value={workOutName} type='text' placeholder='Workout Name' onChange={({target}) => {
                    setWorkOutName(target.value);
                }}/>
                <br />
                <label>Weight in Ibs: </label>
                <input value={weight} type='number' onChange={({target}) => {
                    var num = handleNumber(target.value);
                    setWeight(num);
                }} />
                <br />
                <label>Reps</label>
                <input value={reps} type='number' onChange={({target}) => {
                    var num = handleNumber(target.value);
                    setReps(num);
                }} />
                <br />
                <label>Sets</label>
                <input value={sets} type='number' onChange={({target}) => {
                    var num = handleNumber(target.value);
                    setSets(num);
                }} />
                <input type='submit' value='Submit' />
            </form>

            <ol>
                {workOutListRender}
            </ol>
        </div>
    );
};

export default WorkoutTracker;