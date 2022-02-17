import './App.css';
import React, {useState, useEffect} from 'react';
import wordList from './graphs/wordLists/four_word_list.js'
import { traverseGraph } from './graphs/traverseGraph';

function App() {
  const [fromWord, setFromWord] = useState('best')
  const [toWord, setToWord] = useState('fool')
  const [minSteps, setMinSteps] = useState(null)
  const [answerArray, setAnswerArray] = useState([])
  const [showSolution, setShowSolution] = useState(false)

  useEffect(() => {
    const from = wordList[Math.floor(Math.random()*(wordList.length))-1]
    const to = wordList[Math.floor(Math.random()*(wordList.length))-1]
    setFromWord(from)
    setToWord(to)
  }, []);

  useEffect(()=>{
    const answer = traverseGraph(fromWord,toWord) //returns an array where [0] is the steps, [1] answer list
    setMinSteps(answer[0])
    setAnswerArray(answer[1])
  },[fromWord,toWord])

  const handleSolutionClick = () => {
    setShowSolution(!showSolution)
  }

  return (
    <div className="App">
      <div>From: {fromWord}</div>
      <div>To:  {toWord}</div>
      <div>Minimum Steps: {minSteps}</div>
      <button onClick={handleSolutionClick}>{showSolution ? "Hide Solution":"Show Solution"}</button>
      {showSolution && 
        <div className="answer-list">
          {answerArray.map(word => {
            return (
              <div key={word} className="answer">{word}----{'>'}</div>
            )
          })}
          <div className="answer" >{toWord}</div>
        </div>
      }
    </div>
  );
}

export default App;
