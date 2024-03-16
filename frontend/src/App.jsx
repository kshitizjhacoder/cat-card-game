import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Rules from './Components/Rules'
import Username from './Components/Username';
import Leaderboard from './Components/Leaderboard';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Username/>}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/rules' element={<Rules />}></Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App
