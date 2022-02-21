import './App.css';
import React, {useState, useEffect} from 'react';
import wordList from './graphs/wordLists/four_word_list.js'
import { traverseGraph } from './graphs/traverseGraph';
import Solution from './components/Solution'
import Guessboxes from './components/Guessboxes'
import {buildGraph} from './graphs/utils/buildGraph'

function App() {
  const [fromWord, setFromWord] = useState('best')
  const [toWord, setToWord] = useState('fool')
  const [minSteps, setMinSteps] = useState(null)
  const [answerArray, setAnswerArray] = useState([])
  const [showSolution, setShowSolution] = useState(true)
  const [currentGuess, setCurrentGuess] = useState('curr')
  const [graph,setGraph] = useState(buildGraph())
  const [prevGuess,setPrevGuess] = useState('prev')
  const [correctGuessesArray, setCorrectGuessesArray] = useState([])

  useEffect(()=>{
    handleNewGameClick()
  },[])

  //console.log(traverseGraph('bldg','chic'))
  
  const handleSolutionClick = () => {
    setShowSolution(!showSolution)
  }

  const handleGuess = () => {
    console.log(currentGuess, prevGuess)
    if(currentGuess in graph.getVertList()){
      const myGuessVertex = graph.getVertex(currentGuess)
      const myGuessConnections = myGuessVertex.getConnections()
      let goodGuess = false
      for (let nbr of myGuessConnections){
           if(nbr[0].getId() === prevGuess){
              goodGuess = true
              
           } 
      }
      console.log(goodGuess)
      if(goodGuess) {
        setPrevGuess(currentGuess)
        setCorrectGuessesArray([...correctGuessesArray, currentGuess])
      }
      else console.log("NOT ONE LETTER AWAY")
    }
    else console.log("BAD GUESS")
  }

  useEffect(()=>{
    handleGuess()
  }, [currentGuess])
  
  const handleNewGameClick = () => {
    let answer = null
    let from = ''
    let to = ''
    let myGraph = buildGraph()
    while (answer === null || answer[0]<2){
      from = wordList[Math.floor(Math.random()*(wordList.length))-1]
      to = wordList[Math.floor(Math.random()*(wordList.length))-1]
      myGraph = buildGraph()
      answer = traverseGraph(from,to) //returns an array where [0] is the steps, [1] answer list
      //console.log(answer,from,to)
    }
    setFromWord(from)
    setToWord(to)
    setMinSteps(answer[0])
    setAnswerArray(answer[1])   
    setGraph(myGraph)
    setPrevGuess(from)
  }
  
  return (
    <div className="App">
      <div>From: {fromWord}</div>
      <div>To:  {toWord}</div>
      <div>Minimum Steps: {minSteps}</div>
      {correctGuessesArray.map( (guess) => {
        return(
          <div key={guess}>{guess}</div>
        )
      })}
      <Guessboxes setCurrentGuess={setCurrentGuess} handleGuess={handleGuess}/>
      <button onClick={handleSolutionClick}>{showSolution ? "Hide Solution":"Show Solution"}</button>
      <button onClick={handleNewGameClick}>New Game</button>
      {showSolution &&
      <Solution toWord = {toWord} answerArray={answerArray}/> }
    </div>
  );
}

export default App;
