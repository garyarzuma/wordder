import './App.css';
import React, {useState, useEffect} from 'react';
import wordList from './graphs/word.js'

function App() {
 const [fromWord, setFromWord] = useState('')
 const [toWord, setToWord] = useState('')
 const [minSteps, setMinSteps] = useState(null)

 useEffect(() => {
   const from = wordList[Math.floor(Math.random()*(wordList.length))-1]
   const to = wordList[Math.floor(Math.random()*(wordList.length))-1]
  setFromWord(from)
  setToWord(to)
},[]);

  return (
    <div className="App">
      <div>From: {fromWord}</div>
      <div>To:  {toWord}</div>
    </div>
  );
}

export default App;
