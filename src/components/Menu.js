import React from 'react';
import { useSelector} from 'react-redux'
import './styles/Menu.css';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom"

const Menu = () => {
    const toWord = useSelector(state => state.toWord)
    const fromWord = useSelector(state => state.fromWord)

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