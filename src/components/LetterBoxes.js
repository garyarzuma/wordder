import React from 'react'
import './styles/Guessboxes.css'

const Letterboxes= ({ word }) => {

  return(
    <div className="letterBoxes">
      <div className="letterBox" >{word.charAt(0)}</div>
      <div className="letterBox" >{word.charAt(1)}</div>
      <div className="letterBox" >{word.charAt(2)}</div>
      <div className="letterBox" >{word.charAt(3)}</div>
    </div>
  )
}

export default Letterboxes