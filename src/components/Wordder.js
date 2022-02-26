import '../App.css';
import './styles/Wordder.css'
import React, {useState, useEffect} from 'react';
import wordList from '../graphs/wordLists/four_word_list.js'
import { traverseGraph } from '../graphs/traverseGraph';
import Solution from './Solution'
import Guessboxes from './Guessboxes'
import {buildGraph} from '../graphs/utils/buildGraph'
import Notification from './Notification';
import { useParams,  useNavigate } from 'react-router-dom'
import { setToWord, setFromWord, setCorrectGuessesArray } from '../reducers/wordsReducer'
import { useSelector, useDispatch } from 'react-redux'

let prevGuess = ''

const Wordder =  () => {

  const [minSteps, setMinSteps] = useState(null)
  const [hotOrColdSteps, setHotOrColdSteps] = useState(null)
  const [answerArray, setAnswerArray] = useState([])
  const [showSolution, setShowSolution] = useState(false)
  const [currentGuess, setCurrentGuess] = useState()
  const [graph,setGraph] = useState(buildGraph())
  const [message, setMessage] = useState(null)
  const [firstTime, setFirstTime] = useState(true)
  const [tryAgain, setTryAgain] = useState(false)
  const [endGameFreeze, setEndGameFreeze] = useState(false)

  const dispatch = useDispatch()
  const toWord = useSelector(state => state.toWord)
  const fromWord = useSelector(state => state.fromWord)
  const correctGuessesArray = useSelector(state => state.correctGuessesArray)

  let {fromCustWord,toCustWord} = useParams() 
  const navigate = useNavigate()

  useEffect(()=>{
    if(fromCustWord !== undefined)
      initiateGame()
    else
      if(!endGameFreeze){
        handleNewGameClick()
      }
  },[fromCustWord])

  useEffect(()=>{
    if(firstTime){
      setFirstTime(false)
    }
    else
    if(!endGameFreeze) {
      handleGuess()
    }
  },[currentGuess])

  const initiateGame = () => {
    let myGraph = buildGraph()
    let answer = traverseGraph(fromCustWord,toCustWord)
    if (answer === null){
      navigate('/invalidwords')
      return
    }
    dispatch(setFromWord(fromCustWord))
    dispatch(setToWord(toCustWord))
    setMinSteps(answer[0])
    setAnswerArray(answer[1])   
    setGraph(myGraph)
    prevGuess = fromCustWord
    if(correctGuessesArray.length < 1) {
      dispatch(setCorrectGuessesArray([fromCustWord]))
    }
    const hotOrColdFrom = correctGuessesArray[correctGuessesArray.length-1] || fromCustWord
    setHotOrColdSteps(traverseGraph(hotOrColdFrom, toCustWord)[0])
    setMessage(null)
    setTryAgain(false)
    setShowSolution(false)
  }  
  
  const handleSolutionClick = () => {
    setShowSolution(!showSolution)
  }

  const handleGuess = () => {
    let goodGuess = true
    console.log("correctGuessesArray in handleGuyess function: ",correctGuessesArray)
    correctGuessesArray.forEach(word=>{
      if (word === currentGuess) {
        setMessage("Guesses can't repeat!")
        goodGuess = false
      }
    })
    if(goodGuess){
      if(currentGuess in graph.getVertList()){
        const myGuessVertex = graph.getVertex(currentGuess)
        const myGuessConnections = myGuessVertex.getConnections()
        let goodGuess = false
        for (let nbr of myGuessConnections){
            if(nbr[0].getId() === (correctGuessesArray[correctGuessesArray.length-1]||prevGuess)){
                goodGuess = true
            } 
        }
        if(goodGuess) {
          if(currentGuess === toWord){ //if the guess is ACTUALLY good it goes here
            dispatch(setCorrectGuessesArray([...correctGuessesArray, currentGuess]))
            setHotOrColdSteps(0)
            if(correctGuessesArray.length === minSteps){
              setMessage(`Success! You found a Wordder in the minimum amount of ${correctGuessesArray.length} steps!`)
            }
            else{
              setMessage(`Success! You found a Wordder in ${correctGuessesArray.length} steps! The minimum possible steps is ${minSteps}`)
            }
            setTryAgain(true)
            setEndGameFreeze(true)
          }
          else{
            prevGuess = currentGuess
            dispatch(setCorrectGuessesArray([...correctGuessesArray, currentGuess]))
            let prevHotOrColdSteps = hotOrColdSteps
            let newHotOrColdSteps = traverseGraph(prevGuess,toWord)[0]
            setHotOrColdSteps(newHotOrColdSteps)
            handleHotOrCold(prevHotOrColdSteps, newHotOrColdSteps)
          }
        }
        else{
          setMessage("Guesses must be one letter apart!")
        } 
      }
      else {
        if(currentGuess !== '') {
          setMessage("Guess was NOT a valid 4 letter word!")
        }
      } 
    }
  }

  const handleTryAgainClick =  () => {
    setTryAgain(false)
    dispatch(setCorrectGuessesArray([fromWord]))
    setMessage(null)
    setEndGameFreeze(false)
    prevGuess = fromWord
    setHotOrColdSteps(minSteps)
  }
  
  const handleNewGameClick = () => {
    let answer = null
    let from = ''
    let to = ''
    setEndGameFreeze(false)
    while (answer === null || answer[0]<2){
      from = wordList[Math.floor(Math.random()*(wordList.length))-1]
      to = wordList[Math.floor(Math.random()*(wordList.length))-1]
      
      answer = traverseGraph(from,to) //returns an array where [0] is the steps, [1] answer list
    }
    dispatch(setCorrectGuessesArray([from]))
    navigate(`/${from}/${to}`)
  }

  const handleClearClick = () => {
    setMessage(null)
    setEndGameFreeze(false)
    setTryAgain(false)
    if(correctGuessesArray.length > 1){
      dispatch(setCorrectGuessesArray(correctGuessesArray.slice(0,-1)))
      prevGuess = correctGuessesArray[correctGuessesArray.length-2]
      setCurrentGuess('')
      setHotOrColdSteps(traverseGraph(prevGuess,toWord)[0])
    }
  }

  const handleHotOrCold = (prevHotOrColdSteps, newHotOrColdSteps) => {
    if(prevHotOrColdSteps > newHotOrColdSteps){
      setMessage("Hotter!")
    }
    else if(prevHotOrColdSteps <= newHotOrColdSteps){
      setMessage("Colder!")
    }
  }

  return (
    <div className="Home">
      <h1>Welcome to Wordder!</h1>
      <div className="front-page-rules">
        <div>Create a word ladder from the starting word to the target word in as few steps as possible!</div>
        <br></br>
        <div>Ex) DART to YARN</div>
        <div>HART----{'>'}DART----{'>'}DART----{'>'}YARN</div>
      </div>
      <div className="start-target-minSteps-current-container">
        <div className="start-target-container">
          <div>Starting Word: {fromWord}</div>
          <div>Target Word:  {toWord}</div>
        </div>
        <div className="minSteps-currentSteps-container">
          <div>Minimum Steps: {minSteps}</div>
          <div>Current Minimum Steps: {hotOrColdSteps}</div>
        </div>
      </div>
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
