import './App.css';
import React, {useState, useEffect} from 'react';
import wordList from './graphs/word.js'
import { traverseGraph } from './graphs/traverseGraph';

function App() {
 const [fromWord, setFromWord] = useState('best')
 const [toWord, setToWord] = useState('fool')
 const [minSteps, setMinSteps] = useState(null)
 const [answerArray, setAnswerArray] = useState([])

 useEffect(() => {
    const from = wordList[Math.floor(Math.random()*(wordList.length))-1]
    const to = wordList[Math.floor(Math.random()*(wordList.length))-1]
    setFromWord(from)
    setToWord(to)
  }, []);

  useEffect(()=>{
    setMinSteps(traverseGraph(fromWord,toWord)[0])
  },[fromWord,toWord])
  
  console.log(fromWord, toWord)
  console.log(traverseGraph(fromWord,toWord))
  console.log(traverseGraph('best','fool'))

  return (
    <div className="App">
      <div>From: {fromWord}</div>
      <div>To:  {toWord}</div>
      <div>Minimum Steps: {minSteps}</div>
      <div>Steps:</div>
    </div>
  );
}

export default App;
