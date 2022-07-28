import React from 'react'
import './styles/Stats.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import statsService from '../services/stats'

const Stats = () => {
  const user = useSelector(state => state.user)
  const loggedIn = user.email

  const [gamesWon, setgamesWon] = useState()

  const getStats = async () => {
    const currentUser = await statsService.getStats(user)
    setgamesWon(currentUser.gamesWon)
  }

  useEffect(() => {
    getStats()
  }, [])

  const updateStats = async () => {
    let updatedUser = await statsService.updateStats(user)
    setgamesWon(updatedUser.gamesWon)
  }

  return (
    <div className='stats-page'>
      {loggedIn &&
      <div className='stats-container'>
        <div>{ user.fname }&apos;s Stats</div>
        <div>Games Won: {gamesWon}</div>
      </div>
      }
      {!loggedIn &&
        <div>Please login to see Game Statistics</div>
      }
      <button onClick={() => updateStats()}>Click Me</button>
    </div>
  )
}

export default Stats