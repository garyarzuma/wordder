import React from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom"

const Menu = ({fromWord,toWord,correctGuessesArray }) => {
    const padding = {
      paddingRight: 50
    }

    let string = correctGuessesArray.join(" ")
    return (
      <div className="nav-container">
        <Link className="link" style={padding} to={`/${fromWord}/${toWord}/${string}`}>Home</Link>
        <Link className="link" style={padding} to="/howtoplay">Rules</Link>
        <Link className="link" style={padding} to="/login">Login</Link>
      </div>
    )
  }

export default Menu