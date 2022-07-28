import React from 'react'
import './styles/Stats.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import statsService from '../services/stats'

const Stats = () => {
  //first get the users email from our redux state so we can see if logged in
  const user = useSelector(state => state.user)
  const loggedIn = user.email

  const [gamesWon, setgamesWon] = useState(0)
  const [averageGuesses, setAverageGuesses] = useState(0)

  const findAverage = (array) => {
    const total = array.reduce(
      (p,c) => p+c,
      0
    )
    console.log(total,array.length)
    return total/array.length
  }

  //fetches the number of games the user has won
  const getStats = async () => {
    const currentUser = await statsService.getStats(user)
    console.log(currentUser)
    setgamesWon(currentUser.gamesWon)
    console.log(currentUser.guessesArray)
    if ( currentUser.guessesArray.length > 0 ) {  //only runs the calculation if they have played
      setAverageGuesses(findAverage(currentUser.guessesArray))
    }
  }
  //updates the number of games won as soon as we click on stats
  useEffect(() => {
    if(loggedIn){
      getStats()
    }
  }, [])

  return (
    <div className='stats-page'>
      {loggedIn &&
      <div>
        <h1>{ user.fname }&apos;s Stats</h1>
        <div className='stats-container'>
          <div className='stat-container'>
            <div className='statNumber'>{gamesWon}</div>
            <div className='statDesc'>Games Won</div>
          </div>
          <div className='stat-container'>
            <div className='statNumber'>{averageGuesses}</div>
            <div className='statDesc'>Average Guesses</div>
          </div>
        </div>
      </div>
      }
      {!loggedIn &&
        <div>Please login to see Game Statistics</div>
      }
    </div>
  )
}

export default Stats