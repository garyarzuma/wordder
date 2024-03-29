import React, { useEffect } from 'react'
import { useField } from '../hooks/useField'
import './styles/Guessboxes.css'

const Guessboxes= ({ setCurrentGuess, guesses, target }) => {

  const handleSubmit = (event) =>  {
    event.preventDefault()
    let guess = guess1.domStuff.value + guess2.domStuff.value + guess3.domStuff.value + guess4.domStuff.value
    setCurrentGuess(guess.toLowerCase())
  }
  const guess1 = useField('guess1')
  const guess2 = useField('guess2')
  const guess3 = useField('guess3')
  const guess4 = useField('guess4')
  let input = document.getElementsByClassName('guessBox')
  let boxNumber = 0

  useEffect(() => {
    let input = document.getElementById('guess-1')
    input.focus()
  }, [])

  useEffect(() => {
    if (guesses[guesses.length-1] !== target) {
      guess1.domStuff.onReset()
      guess2.domStuff.onReset()
      guess3.domStuff.onReset()
      guess4.domStuff.onReset()
      document.getElementById('guess-1').focus()
    }
  },[guesses]) //resets boxes to blank when a correct guess is made and this updates

  const onKeyUp = (event) => {
    if (event.keyCode === 13){ //for enter
      handleSubmit(event)
    }
    else if (event.keyCode === 8 || event.keyCode === 46){ //For delete and backspace
      if (event.target.id === 'guess-4'){
        boxNumber = 2
      } else if (event.target.id === 'guess-3') {
        boxNumber = 1
      }
      else if (event.target.id === 'guess-2') {
        boxNumber = 0
      }
      else {
        boxNumber = 0
      }
      input[boxNumber].focus()
    }
    else if (event.keyCode < 91  && event.keyCode > 64) {
      if (event.target.id === 'guess-1'){
        boxNumber = 1
        guess1.setMyValue(event.key.toUpperCase())
      } else if (event.target.id === 'guess-2') {
        boxNumber = 2
        guess2.setMyValue(event.key.toUpperCase())
      }
      else if (event.target.id === 'guess-3') {
        boxNumber = 3
        guess3.setMyValue(event.key.toUpperCase())
      }
      else {
        boxNumber = 3
        guess4.setMyValue(event.key.toUpperCase())
      }
      input[boxNumber].focus()
    }
  }


  return(

    <div className="guessboxes">
      <form onSubmit={handleSubmit}>
        <input className="guessBox" onKeyUp = {onKeyUp} id='guess-1' {...guess1.domStuff}/>
        <input className="guessBox" onKeyUp = {onKeyUp} id='guess-2' {...guess2.domStuff}/>
        <input className="guessBox" onKeyUp = {onKeyUp} id='guess-3' {...guess3.domStuff}/>
        <input className="guessBox" onKeyUp = {onKeyUp} id='guess-4' {...guess4.domStuff}/>
      </form>
    </div>

  )
}

export default Guessboxes