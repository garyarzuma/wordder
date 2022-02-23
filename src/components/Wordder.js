import '../App.css';
import React, {useState, useEffect} from 'react';
import wordList from '../graphs/wordLists/four_word_list.js'
import { traverseGraph } from '../graphs/traverseGraph';
import Solution from './Solution'
import Guessboxes from './Guessboxes'
import {buildGraph} from '../graphs/utils/buildGraph'
import Notification from './Notification';
import { useParams,  useNavigate } from 'react-router-dom'

let prevGuess = ''

const Wordder = () => {
  const [fromWord, setFromWord] = useState('best')
  const [toWord, setToWord] = useState('fool')
  const [minSteps, setMinSteps] = useState(null)
  const [answerArray, setAnswerArray] = useState([])
  const [showSolution, setShowSolution] = useState(false)
  const [currentGuess, setCurrentGuess] = useState()
  const [graph,setGraph] = useState(buildGraph())
  const [correctGuessesArray, setCorrectGuessesArray] = useState([])
  const [message, setMessage] = useState(null)
  const [firstTime, setFirstTime] = useState(true)
  const [tryAgain, setTryAgain] = useState(false)
  let {fromCustWord,toCustWord} = useParams() 
  const navigate = useNavigate()

  useEffect(()=>{
    if(fromCustWord !== undefined)
      customURL()
    else
      handleNewGameClick()
  },[fromCustWord])

  useEffect(()=>{
    if(firstTime){
      setFirstTime(false)
    }
    else
      handleGuess()
  },[currentGuess])

  //console.log(traverseGraph('bldg','chic'))

  const customURL = () => {
    console.log("custom")
    let myGraph = buildGraph()
    let answer = traverseGraph(fromCustWord,toCustWord)
    if (answer === null){
      navigate('/invalidwords')
      return
    }
    setFromWord(fromCustWord)
    setToWord(toCustWord)
    setMinSteps(answer[0])
    setAnswerArray(answer[1])   
    setGraph(myGraph)
    prevGuess = fromCustWord
    setCorrectGuessesArray([fromCustWord])
    setMessage(null)
    setTryAgain(false)
    setShowSolution(false)
  }  
  
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
          if(correctGuessesArray.length === minSteps){
            setMessage(`Success! You found a Wordder in the minimum amount of ${correctGuessesArray.length} steps!`)
          }
          else{
            setMessage(`Success! You found a Wordder in ${correctGuessesArray.length} steps! The minimum possible steps is ${minSteps}`)
          }
          setTryAgain(true)
        }
        else{
          prevGuess = currentGuess
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
      if(currentGuess !== '') {
        setMessage("Guess was NOT a valid 4 letter word!")
      }
    } 
  }

  const handleTryAgainClick =  () => {
    setTryAgain(false)
    setCorrectGuessesArray([fromWord])
    setMessage(null)
    prevGuess = fromWord
  }
  
  const handleNewGameClick = () => {
    let answer = null
    let from = ''
    let to = ''
    while (answer === null || answer[0]<2){
      from = wordList[Math.floor(Math.random()*(wordList.length))-1]
      to = wordList[Math.floor(Math.random()*(wordList.length))-1]
      
      answer = traverseGraph(from,to) //returns an array where [0] is the steps, [1] answer list
      //console.log(answer,from,to)
    }
    navigate(`/${from}/${to}`)
  }

  const handleClearClick = () => {
    if(correctGuessesArray.length > 1){
      setCorrectGuessesArray(correctGuessesArray.slice(0,-1))
      prevGuess = correctGuessesArray[correctGuessesArray.length-2]
      setCurrentGuess('')
    }
  }

  return (
    <div className="Home">
      <h1>Welcome to Wordder!</h1>
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
      <button onClick={handleClearClick}>Clear</button>
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

export default Wordder;
