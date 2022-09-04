import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CalorieTracker from './Components/Home';
import WorkoutTracker from './Components/WorkoutTracker';
import BookTracker from './Components/BookTracker';
import Navigation from './Components/Navigation';

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
