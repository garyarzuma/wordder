import React from 'react'
import './styles/Stats.css'
import { useSelector } from 'react-redux'


const Stats = () => {
  const user = useSelector(state => state.user)
  const loggedIn = user.email

  return (
    <div className='stats-page'>
      {loggedIn &&
      <div className='stats-container'>
        <div>{ user.fname }&apos;s Stats</div>
        <div>Games Won: {user.gamesWon}</div>
      </div>
      }
      {!loggedIn &&
        <div>Please login to see Game Statistics</div>
      }
    </div>
  )
}

export default Stats