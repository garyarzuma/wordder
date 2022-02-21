import React from "react"
import {useField} from '../hooks/useField'
import './styles/Guessboxes.css';

const Guessboxes= ({setCurrentGuess, handleGuess}) => {
    const guess = useField('guess')
    const handleSubmit = (event) =>  {
        event.preventDefault()
        setCurrentGuess(guess.value.toLowerCase())
        guess.onReset()
    }
    return(
    
        <div className="guessboxes">
            <form onSubmit={handleSubmit}>
                <input className="guessBox" {...guess}/>
            </form>
        </div>
      
    )
}

export default Guessboxes