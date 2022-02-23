import './App.css';
import React from 'react';
import Wordder from './components/Wordder'
import Menu from './components/Menu'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate
} from "react-router-dom"

function App() {
  
  const About = () => {
   
    return (
      <div className="about-container">
        This is a great game. Trust me.
      </div>
    )
  }

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Wordder />} /> 
        <Route path="/about" element={<About/>} /> 
      </Routes>
    </div>
  );
}

export default App;
