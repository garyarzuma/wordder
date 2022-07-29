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
  const [averageIdealGuesses, setAverageIdealGuesses] = useState(0)
  const [skillRate, setSkillRate] = useState(100)

  const findAverage = (array) => {
    const total = array.reduce(
      (p,c) => p+c,
      0
    )
    return Math.round(10*total/array.length)/10 //round to 1 decimal place
  }

  //fetches the number of games the user has won
  const getStats = async () => {
    const currentUser = await statsService.getStats(user)
    setgamesWon(currentUser.gamesWon)
    if ( currentUser.guessesArray.length > 0 && currentUser.idealGuessesArray.length > 0 ) {  //only runs the calculation if they have played
      const average = findAverage(currentUser.guessesArray)
      const idealAverage = findAverage(currentUser.idealGuessesArray)
      setAverageGuesses(average)
      setAverageIdealGuesses(idealAverage)
      setSkillRate(Math.round(idealAverage/average*100))
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
            <div className='statDesc'>Your Average Steps</div>
          </div>
          <div className='stat-container'>
            <div className='statNumber'>{averageIdealGuesses}</div>
            <div className='statDesc'>Average Minimum Steps</div>
          </div>
          <div className='stat-container'>
            <div className='statNumber'>{skillRate}%</div>
            <div className='statDesc'>Skill Rate</div>
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