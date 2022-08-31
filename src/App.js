import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home.js';
import WorkoutTracker from './Components/WorkoutTracker';
import BookTracker from './Components/BookTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/workout' element={<WorkoutTracker />} />
        <Route path='/books' element={<BookTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
