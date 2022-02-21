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
  const [showSolution, setShowSolution] = useState(false)
  const [currentGuess, setCurrentGuess] = useState()
  const [graph,setGraph] = useState(buildGraph())
  const [prevGuess,setPrevGuess] = useState('')
  const [correctGuessesArray, setCorrectGuessesArray] = useState([])
  const [message, setMessage] = useState(null)
  const [firstTime, setFirstTime] = useState(true)
  const [tryAgain, setTryAgain] = useState(false)

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
        if(currentGuess === toWord){
          setCorrectGuessesArray([...correctGuessesArray, currentGuess])
          if(correctGuessesArray.length+1 === minSteps){
            setMessage(`Success! You found a Wordder in the minimum amount of ${correctGuessesArray.length+1} steps!`)
          }
          else{
            setMessage(`Success! You found a Wordder in ${correctGuessesArray.length+1} steps! The minimum possible steps is ${minSteps}`)
          }
          setTryAgain(true)
        }
        else{
          setPrevGuess(currentGuess)
          setCorrectGuessesArray([...correctGuessesArray, currentGuess])
          setMessage("Good Guess!")
        }
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

  const handleTryAgainClick =  () => {
    setTryAgain(false)
    setCorrectGuessesArray([fromWord])
    setMessage(null)
    setPrevGuess(fromWord)
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
    setCorrectGuessesArray([from])
    setMessage(null)
    setTryAgain(false)
    setShowSolution(false)
  }

  return (
    <div className="App">
      <div>From: {fromWord}</div>
      <div>To:  {toWord}</div>
      <div>Minimum Steps: {minSteps}</div>
      <Notification message={message}/>
      <div className = "guessArray">
        {correctGuessesArray.map( (guess) => {
          return(
            <div key={Math.floor(Math.random()*(1000000))}>{guess}</div>
          )
        })}
      </div>
      <Guessboxes setCurrentGuess={setCurrentGuess} handleGuess={handleGuess}/>
      <br/>
      <button onClick={handleNewGameClick}>New Game</button>
      {tryAgain &&
        <button onClick={handleTryAgainClick}>Try Again</button>}
      <br/>
      <button onClick={handleSolutionClick}>{showSolution ? "Hide Possible Solution":"Show Possible Solution"}</button>
      {showSolution &&
        <Solution toWord = {toWord} answerArray={answerArray}/> }
    </div>
  );
}

export default App;
