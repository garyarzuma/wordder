import React from 'react'
import './styles/Guessboxes.css'

const Letterboxes= ({ word, target }) => {
  let color = ['white','white','white','white']

  //Check to see if your word contains letters of target word and make them green
  if (word === target) {
    color = ['dark-green', 'dark-green', 'dark-green', 'dark-green']
  }
  else {
    for (let i = 0; i < word.length; i++) {
      if (word.charAt(i) === target.charAt(i)){
        color[i] = 'green'
      }
    }
  }

  return(
    <div className="letterBoxes">
      <div className="letterBox" id={color[0]}>{word.charAt(0).toUpperCase()}</div>
      <div className="letterBox" id={color[1]}>{word.charAt(1).toUpperCase()}</div>
      <div className="letterBox" id={color[2]}>{word.charAt(2).toUpperCase()}</div>
      <div className="letterBox" id={color[3]}>{word.charAt(3).toUpperCase()}</div>
    </div>
  )
}

export default Letterboxes