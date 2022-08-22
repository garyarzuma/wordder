import '../App.css'
import './styles/Wordder.css'
import React, { useState, useEffect } from 'react'
import wordList from '../graphs/wordLists/esl_forum_word_list.js'
import  traverseGraph from '../graphs/traverseGraph'
import Solution from './Solution'
import Guessboxes from './Guessboxes'
import buildGraph  from '../graphs/utils/buildGraph'
import Notification from './Notification'
import { useParams,  useNavigate } from 'react-router-dom'
import { setToWord, setFromWord, setCorrectGuessesArray } from '../reducers/wordsReducer'
import { useSelector, useDispatch } from 'react-redux'
import { handleHotOrCold } from '../utils/utilityFunctions'
import Rules from './Rules'
import statsService from '../services/stats'

let prevGuess = ''

const Wordder =  () => {

  const loggedIn = useSelector(state => state.user.email)
  const [minSteps, setMinSteps] = useState(null)
  const [hotOrColdSteps, setHotOrColdSteps] = useState(null)
  const [answerArray, setAnswerArray] = useState([])
  const [showSolution, setShowSolution] = useState(false)
  const [currentGuess, setCurrentGuess] = useState()
  const [graph,setGraph] = useState(buildGraph())
  const [message, setMessage] = useState([null,5])
  const [firstTime, setFirstTime] = useState(true)
  const [endGameFreeze, setEndGameFreeze] = useState(false)
  const [myTimeOut, setTimeOut] = useState(null)

  const dispatch = useDispatch()
  const toWord = useSelector(state => state.words.toWord)
  const fromWord = useSelector(state => state.words.fromWord)
  const correctGuessesArray = useSelector(state => state.words.correctGuessesArray)
  let { fromCustWord,toCustWord } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    initiateGame()
  }, [fromCustWord])

  useEffect(() => {
    if(firstTime){
      setFirstTime(false)
    }
    else{
      if(!endGameFreeze) {
        handleGuess()
      }
    }
  },[currentGuess])

  useEffect(() => {
    if(myTimeOut){
      clearTimeout(myTimeOut)
    }
    setTimeOut(
      setTimeout( () =>
        setMessage([null,5]),5000
      )
    )
  },[message]) //always triggers anytime a message is set due to Math.random part

  const initiateGame = () => {
    setEndGameFreeze(false)
    let myGraph = buildGraph()
    fromCustWord = fromCustWord || 'cats'
    toCustWord   = toCustWord || 'sage'
    let answer = traverseGraph(fromCustWord,toCustWord,[fromCustWord])
    if (answer === null){
      navigate('/invalidwords')
      return
    }
    dispatch(setFromWord(fromCustWord))
    dispatch(setToWord(toCustWord))
    dispatch(setCorrectGuessesArray([fromCustWord]))
    setMinSteps(answer[0])
    setHotOrColdSteps(answer[0])
    setAnswerArray(answer[1])
    setGraph(myGraph)
    prevGuess = fromCustWord
    setMessage([null, 5])
    setShowSolution(false)
  }

  const handleSolutionClick = () => {
    setShowSolution(!showSolution)
  }

  const handleGuess = async () => {
    let goodGuess = true
    console.log('correctGuessesArray in handleGuyess function: ',correctGuessesArray)
    correctGuessesArray.forEach(word => {
      if (word === currentGuess) {
        setMessage(['Guesses can\'t repeat!',Math.random()])
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
              setMessage([`Success! You found a Wordder in the minimum amount of ${correctGuessesArray.length} steps!`,Math.random()])
            }
            else{
              setMessage([`Success! You found a Wordder in ${correctGuessesArray.length} steps! The minimum possible steps is ${minSteps}`,Math.random()])
            }
            setEndGameFreeze(true)
            //update stats if logged in and user.email is not null
            if(loggedIn){
              try {
                await statsService.updateStats({ email:loggedIn, newGuess:correctGuessesArray.length, idealGuess:minSteps })
              } catch (exception) {
                console.log('TOKEN EXPIRED')
                setMessage([exception.response.data.error ,Math.random()])
              }
            }
          }
          else{
            prevGuess = currentGuess
            dispatch(setCorrectGuessesArray([...correctGuessesArray, currentGuess]))
            let prevHotOrColdSteps = hotOrColdSteps
            let newHotOrColdSteps = traverseGraph(prevGuess,toWord,correctGuessesArray)[0]
            setHotOrColdSteps(newHotOrColdSteps)
            setMessage([handleHotOrCold(prevHotOrColdSteps, newHotOrColdSteps), Math.random()])
          }
        }
        else{
          setMessage(['Guesses must be one letter apart!',Math.random()])
        }
      }
      else {
        if(currentGuess !== '') {
          setMessage(['Guess was NOT a valid 4 letter word!',Math.random()])
        }
      }
    }
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
    dispatch(setCorrectGuessesArray([fromWord]))
    setMessage([null, 5])
    setEndGameFreeze(false)
    prevGuess = fromWord
    setHotOrColdSteps(minSteps)
  }

  const handleUndoClick = () => {
    setMessage([null, 5])
    setEndGameFreeze(false)
    if(correctGuessesArray.length > 1){
      const newArray = correctGuessesArray.slice(0,-1)
      dispatch(setCorrectGuessesArray(newArray))
      prevGuess = newArray.slice(-1)
      setCurrentGuess('')
      setHotOrColdSteps(traverseGraph(prevGuess,toWord,newArray)[0])
    }
  }

  return (
    <div className="Home">
      <h1 className='wordder-heading'>Wordder!</h1>
      <Rules />
      <div className="start-target-minSteps-current-container">
        <div>
          <div className = 'steps-display' >{minSteps}</div>
          <div>Minimum Steps</div>
        </div>
        <div>
          <div className = 'steps-display'>{hotOrColdSteps}</div>
          <div>Steps to Go</div>
        </div>
      </div>
      <Notification message={message[0]}/>
      <div className = "guessArray">
        {correctGuessesArray.map( (guess) => {
          return(
            <div key={Math.floor(Math.random()*(1000000))}>{guess.toUpperCase()}</div>
          )
        })}
      </div>
      <Guessboxes setCurrentGuess={setCurrentGuess} handleGuess={handleGuess}/>

      <div className="start-target-container">
        <div>{toWord.toUpperCase()}</div>
      </div>

      <br/>
      <button onClick={handleUndoClick}>Undo</button>
      <button onClick={handleNewGameClick}>New Game</button>
      <button onClick={handleClearClick}>Clear ALL</button>
      <br/>
      <button onClick={handleSolutionClick}>{showSolution ? 'Hide Possible Solution':'Show Possible Solution'}</button>
      {showSolution &&
        <Solution toWord = {toWord} answerArray={answerArray}/> }
    </div>
  )
}

export default Wordder
