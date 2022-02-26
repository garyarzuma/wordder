import React from 'react';
import { useSelector} from 'react-redux'
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom"

const Menu = () => {
    const padding = {
      paddingRight: 50
    }
    const toWord = useSelector(state => state.toWord)
    const fromWord = useSelector(state => state.fromWord)
    
    return (
      <div className="nav-container">
        <Link className="link" style={padding} to={`/${fromWord}/${toWord}`}>Home</Link>
        <Link className="link" style={padding} to="/howtoplay">Rules</Link>
        <Link className="link" style={padding} to="/login">Login</Link>
      </div>
    )
  }

export default Menu