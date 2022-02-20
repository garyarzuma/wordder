import React from "react"

const Solution = ({answerArray,toWord}) => {

    return(
    
        <div className="answer-list">
          {answerArray.map(word => {
            return (
              <div key={word} className="answer">{word}----{'>'}</div>
            )
          })}
          <div className="answer" >{toWord}</div>
        </div>
      
    )
}

export default Solution