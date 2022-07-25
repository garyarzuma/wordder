import React from 'react'
import { useSelector } from 'react-redux'
import './styles/Menu.css'
import {
  Link,
} from 'react-router-dom'
import defaultPicIcon from '../images/default-profile-pic.PNG'

const Menu = () => {
  const toWord = useSelector(state => state.words.toWord)
  const fromWord = useSelector(state => state.words.fromWord)
  const fname = useSelector(state => state.user.fname)
  const picURL = useSelector(state => state.user.picURL)

  return (
    <div className="menu-container">
      <div className="float-left-container">
        <Link className="link" to={`/${fromWord}/${toWord}`}>Home</Link>
        <Link className="link" to="/login">Login</Link>
      </div>
      <div className="float-right-container">
        <div className='name'>Welcome, {fname}</div>
        {picURL &&
        <img className='pic' src={picURL} alt="profile-pic" />}
        {!picURL &&
          <img className='pic' src={defaultPicIcon} alt="profile-pic" />}
      </div>
    </div>
  )
}

export default Menu