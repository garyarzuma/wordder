import '../App.css'
import './styles/Wordder.css'
import React, { useState, useEffect } from 'react'
import wordList from '../graphs/wordLists/daily_wordder_list'
import  traverseGraph from '../graphs/traverseGraph'
import Guessboxes from './Guessboxes'
import Letterboxes from './LetterBoxes'
import buildGraph  from '../graphs/utils/buildGraph'
import Notification from './Notification'
import { useSelector } from 'react-redux'
import Rules from './Rules'
import statsService from '../services/stats'

let prevGuess = ''

const DailyWordder =  () => {

  const loggedIn = useSelector(state => state.user.email)
  const [minSteps, setMinSteps] = useState(null)
  const [answerArray, setAnswerArray] = useState([])
  const [currentGuess, setCurrentGuess] = useState()
  const [graph,setGraph] = useState(buildGraph())
  const [message, setMessage] = useState(null)
  const [firstTime, setFirstTime] = useState(true)
  const [endGameFreeze, setEndGameFreeze] = useState(false)
  const myDate = new Date()
  const formattedDate = myDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const [toWord, setToWord] = useState('')
  const [fromWord, setFromWord] = useState('')
  const [correctGuessesArray, setCorrectGuessesArray] = useState([])

  useEffect(() => {
    initiateGame()
    console.log(myDate)
  }, [])

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

  const setTodaysWords = (dateInteger) => {
    let answer = null
    let from = ''
    let to = ''
    let increment = 0
    while (answer === null || answer[0]<2){
      increment += 1
      let toIndex = ((dateInteger*9) + increment) % (wordList.length-1)
      let fromIndex = ((dateInteger*7) - increment) % (wordList.length-1)
      from = wordList[fromIndex]
      to = wordList[toIndex]
      answer = traverseGraph(from,to) //returns an array where [0] is the steps, [1] answer list
    }
    setFromWord(from)
    setToWord(to)
    setCorrectGuessesArray([from])
    setMinSteps(answer[0])
    setAnswerArray(answer[1])
    console.log(answerArray)
    prevGuess = from
  }

  const initiateGame = () => {
    setTodaysWords(myDate.getFullYear() * myDate.getMonth() * myDate.getDate())

    let myGraph = buildGraph()
    setGraph(myGraph)

    setMessage(null)
  }

  const handleGuess = async () => {
    let goodGuess = true
    console.log('correctGuessesArray in handleGuyess function: ',correctGuessesArray)
    correctGuessesArray.forEach(word => {
      if (word === currentGuess) {
        setMessage('Guesses can\'t repeat!')
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
            setCorrectGuessesArray([...correctGuessesArray, currentGuess])
            if(correctGuessesArray.length === minSteps){
              setMessage(`Success! You found a Wordder in the minimum amount of ${correctGuessesArray.length} steps! Come back tomorrow for another Wordder!`)
            }
            else{
              setMessage(`Success! You found a Wordder in ${correctGuessesArray.length} steps! The minimum possible steps is ${minSteps}. Come back tomorrow for another Wordder!`)
            }
            setEndGameFreeze(true)
            //update stats if logged in and user.email is not null
            if(loggedIn){
              try {
                await statsService.updateStats({ email:loggedIn, newGuess:correctGuessesArray.length, idealGuess:minSteps })
              } catch (exception) {
                console.log('TOKEN EXPIRED')
                setMessage(exception.response.data.error)
              }
            }
          }
          else{
            prevGuess = currentGuess
            setCorrectGuessesArray([...correctGuessesArray, currentGuess])
          }
        }
        else{
          setMessage('Guesses must be one letter apart!')
        }
      }
      else {
        if(currentGuess !== '') {
          setMessage('Guess was NOT a valid 4 letter word!')
        }
      }
    }
  }

  const handleClearClick = () => {
    setCorrectGuessesArray([fromWord])
    setMessage(null)
    setCurrentGuess('')
    prevGuess = fromWord
  }

  const handleUndoClick = () => {
    setMessage(null)
    if(correctGuessesArray.length > 1){
      const newArray = correctGuessesArray.slice(0,-1)
      setCorrectGuessesArray(newArray)
      prevGuess = newArray.slice(-1)
      setCurrentGuess('')
    }
  }

  return (
    <div className="Home">
      <h1 className='wordder-heading'>Wordder!</h1>
      <div className='wordder-date'>{ formattedDate }</div>
      <Rules />
      <Notification message={message}/>
      <div className = "guessArray">
        {correctGuessesArray.map( (guess) => {
          return(
            <Letterboxes key={Math.floor(Math.random()*(1000000))} word = {guess} target = {toWord}/>
          )
        })}
      </div>
      {!endGameFreeze && <Guessboxes setCurrentGuess={setCurrentGuess} guesses = {correctGuessesArray} target = {toWord} />}

      <div className="start-target-container">
        {!endGameFreeze &&
           <Letterboxes word = {toWord} target = {toWord}/>}
      </div>

      <br/>
      {!endGameFreeze &&
        <button onClick={handleUndoClick}>Undo</button>}
      {!endGameFreeze &&
        <button onClick={handleClearClick}>Clear ALL</button>}
      <br/>
    </div>
  )
}

export default DailyWordder
