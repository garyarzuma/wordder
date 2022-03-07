import React from 'react'
import { useSelector } from 'react-redux'
import './styles/Menu.css'
import {
  Link,
} from 'react-router-dom'

const Menu = () => {
  const toWord = useSelector(state => state.words.toWord)
  const fromWord = useSelector(state => state.words.fromWord)

  return (
    <div className="menu-container">
      <div className="nav-container">
        <Link className="link" to={`/${fromWord}/${toWord}`}>Home</Link>
        <Link className="link" to="/howtoplay">Rules</Link>
        <Link className="link" to="/login">Login</Link>
      </div>
    </div>
  )
}

export default Menu