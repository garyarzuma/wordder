import './App.css';
import React, {useState, useEffect} from 'react';
import wordList from './graphs/wordLists/four_word_list.js'
import { traverseGraph } from './graphs/traverseGraph';
import Solution from './components/Solution'
import Guessboxes from './components/Guessboxes'
import {buildGraph} from './graphs/utils/buildGraph'
import Notification from './components/Notification';

function App() {
  const [fromWord, setFromWord] = useState('best')
  const [toWord, setToWord] = useState('fool')
  const [minSteps, setMinSteps] = useState(null)
  const [answerArray, setAnswerArray] = useState([])
  const [showSolution, setShowSolution] = useState(true)
  const [currentGuess, setCurrentGuess] = useState()
  const [graph,setGraph] = useState(buildGraph())
  const [prevGuess,setPrevGuess] = useState('')
  const [correctGuessesArray, setCorrectGuessesArray] = useState([])
  const [message, setMessage] = useState(null)
  const [firstTime, setFirstTime] = useState(true)

  useEffect(()=>{
    handleNewGameClick()
  },[])

  useEffect(()=>{
    if(firstTime){
      setFirstTime(false)
    }
    else
      handleGuess()
  },[currentGuess])

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
        setMessage("Good Guess!")
      }
      else{
        console.log("NOT ONE LETTER AWAY")
        setMessage("Guesses must be one letter apart!")
      } 
    }
    else {
      console.log("BAD GUESS")
      setMessage("Guess was NOT a valid 4 letter word!")
    } 
  }
  
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
    setCorrectGuessesArray([])
    setMessage(null)
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
      <Notification message={message}/>
      <button onClick={handleNewGameClick}>New Game</button>
      <br/>
      <button onClick={handleSolutionClick}>{showSolution ? "Hide Solution":"Show Solution"}</button>
      {showSolution &&
      <Solution toWord = {toWord} answerArray={answerArray}/> }
    </div>
  );
}

export default App;
