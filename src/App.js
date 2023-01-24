import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import FoodLog from './components/FoodLog';
import Colors from './components/Colors';
import FoodLogYesterday from './components/FoodLogYesterday';
import PastFoodLog from './components/PastFoodLog';
import Stats from './components/Stats';

import './styles/App.scss';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/foodlog/today' element={<FoodLog />} />
        <Route path='/foodlog/yesterday' element={<FoodLogYesterday />} />
        <Route path='/foodlog/past/:id' element={<PastFoodLog />} />
        <Route path='/colors' element={<Colors />} />
        <Route path='/stats' element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
