import React from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom"

const Menu = ({fromWord,toWord }) => {
    const padding = {
      paddingRight: 50
    }
    return (
      <div className="nav-container">
        <Link className="link" style={padding} to={`/${fromWord}/${toWord}`}>Home</Link>
        <Link className="link" style={padding} to="/howtoplay">Rules</Link>
        <Link className="link" style={padding} to="/login">Login</Link>
      </div>
    )
  }

export default Menu