import './App.css';
import React from 'react';
import Wordder from './components/Wordder'
import Menu from './components/Menu'
import InvalidWords from './components/InvalidWords'
import Login from './components/Login'
import HowTo from './components/HowTo'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

function App() {
 
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/howtoplay" element={<HowTo/>} /> 
        <Route path="/:fromCustWord/:toCustWord"  element={<Wordder/>} /> 
        <Route path="/" element={<Wordder/>} />     
        <Route path="/invalidwords" element={<InvalidWords />} /> 
        <Route path="/invalidwords/invalidwords" element={<InvalidWords />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </div>
  );
}

export default App;
