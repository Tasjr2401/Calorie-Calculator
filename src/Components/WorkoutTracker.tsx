import React, {useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootType } from "./ReduxFiles/Store";
import { workoutActions } from "./ReduxFiles/WorkoutSlice";
import { handleNumber } from "./UsefulFunctions";

export interface Workout {
    Name: string,
    Weight: number,
    Sets: number,
    Reps: number
}

const WorkoutTracker = () => {
    const { workoutList } = useSelector((state: RootType) => state.workoutTracker);
    const dispatch = useDispatch();

    useEffect(() => {
        const workoutArray: Workout[] = JSON.parse(localStorage.getItem('WorkoutList') || '[]');
        dispatch(workoutActions.loadWorkouts(workoutArray));
    }, []);

    function AddWorkout(form: React.FormEvent<HTMLFormElement>) {

        const workOutName: string = (form.currentTarget.elements.namedItem('WorkoutName') as HTMLInputElement).value;
        const weight: number = handleNumber((form.currentTarget.elements.namedItem('Weight') as HTMLInputElement).value);
        const sets: number = handleNumber((form.currentTarget.elements.namedItem('Sets') as HTMLInputElement).value);
        const reps: number = handleNumber((form.currentTarget.elements.namedItem('Reps') as HTMLInputElement).value);

        if(workOutName.length <= 0 || sets <= 0 || reps <= 0) {
            alert('An Input Feild is missing its required information.');
            return;
        }

        const workout: Workout = {
            Name: workOutName,
            Weight: weight,
            Sets: sets,
            Reps: reps
        }

        dispatch(workoutActions.addWorkout(workout));
    }

    const totalVolume: number = useMemo(() => {
        var volume: number = 0;
        workoutList.forEach(e => {
            volume += (e.Sets * e.Reps) * e.Weight;
        });

        return volume;
    }, [workoutList]);

    useEffect(() => {
        localStorage.setItem('WorkoutList', JSON.stringify(workoutList));
    }, [workoutList]);

    return (
        <div>
            <h1>Your total volume for these workouts is {totalVolume} pounds</h1>

            <form onSubmit={AddWorkout}>
                <input type='text' name='WorkoutName' placeholder='Workout Name' />
                <br />
                <label>Weight in Ibs: </label>
                <input type='number' name='Weight' />
                <br />
                <label>Reps</label>
                <input name='Reps' type='number'  />
                <br />
                <label>Sets</label>
                <input type='number' name='Sets' />
                <input type='submit' value='Submit' />
            </form>

            <ol>
                {workoutList.map((e: Workout) => 
                    <li key={workoutList.indexOf(e)}>
                        <h1>{e.Name}</h1>
                        <h2>Weight in Ibs: {e.Weight}</h2>
                        <h2>Sets: {e.Sets}</h2>
                        <h2>Reps: {e.Reps}</h2>
                        <button onClick={() => dispatch(workoutActions.removeWorkout(e))}>Delete Workout</button>
                    </li>
                )}
            </ol>
        </div>
    );
};

export default WorkoutTracker;