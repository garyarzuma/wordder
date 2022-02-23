import './App.css';
import React, {useState} from 'react';
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
  const [fromWord, setFromWord] = useState('best')
  const [toWord, setToWord] = useState('fool')
  const [correctGuessesArray, setCorrectGuessesArray] = useState([])

  return (
    <div className="App">
      <Menu fromWord={fromWord} toWord={toWord} correctGuessesArray={correctGuessesArray}/>
      <Routes>
        <Route path="/howtoplay" element={<HowTo/>} /> 
        <Route path="/:fromCustWord/:toCustWord" 
          element={<Wordder 
            fromWord={fromWord} 
            setFromWord={setFromWord}
            toWord={toWord} 
            setToWord={setToWord}
            correctGuessesArray = {correctGuessesArray}
            setCorrectGuessesArray = {setCorrectGuessesArray}
            />} /> 
        <Route path="/:fromCustWord/:toCustWord/:custGuessesString/" 
          element={<Wordder 
            fromWord={fromWord} 
            setFromWord={setFromWord}
            toWord={toWord} 
            setToWord={setToWord}
            correctGuessesArray = {correctGuessesArray}
            setCorrectGuessesArray = {setCorrectGuessesArray}/>} /> 
        <Route path="/invalidwords" element={<InvalidWords />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </div>
  );
}

export default App;
