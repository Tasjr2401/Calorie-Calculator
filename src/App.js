import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CalorieTracker from './Components/Home.tsx';
import Navigation from './Components/Navigation.tsx';
import WorkoutTracker from './Components/WorkoutTracker.tsx';
import BookTracker from './Components/BookTracker.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Navigation />} />
        <Route path='/calories' element={<CalorieTracker />}/>
        <Route path='/workouts' element={<WorkoutTracker />} />
        <Route path='/books' element={<BookTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
