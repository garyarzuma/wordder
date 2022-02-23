import './App.css';
import React from 'react';
import Wordder from './components/Wordder'
import Menu from './components/Menu'
import InvalidWords from './components/InvalidWords'
import Login from './components/Login'

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
    const padding = {
      "margin-top":"50px"
    }
    return (
      <div style={padding} className="about-container">
        This is a great game. Trust me.
      </div>
    )
  }

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/about" element={<About/>} /> 
        <Route path="/:fromCustWord/:toCustWord" element={<Wordder />} /> 
        <Route path="/invalidwords" element={<InvalidWords />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </div>
  );
}

export default App;
