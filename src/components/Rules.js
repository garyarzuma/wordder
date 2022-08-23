import './styles/Rules.css'
import React from 'react'

const Rules = () => {
  return(
    <div className="front-page-rules">
      <div>Create a word ladder from the starting word to the target word in as few steps as possible!</div>
      <br></br>
      <div>Ex) <span className = {'from'}>BORN</span> to <span className={'to'}>CHIP</span> in 4 steps</div>
      <div>
        <span className = {'from'}>BORN </span>
        ➜
        <span className={'to'}> C</span><span className = {'from'}>ORN </span>
        ➜
        <span className={'to'}> C</span><span className = {'from'}>O<span className={'to'}>I</span>N </span>
        ➜
        <span className={'to'}> CHI</span><span className = {'from'}>N </span>
        ➜
        <span className={'to'}> CHIP</span>
      </div>
    </div>
  )
}

export default Rules