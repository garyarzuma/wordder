import React from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom"

const Menu = () => {
    const padding = {
      paddingRight: 50
    }
    return (
      <div className="nav-container">
        <Link className="link" style={padding} to={`/${'sage'}/${'fool'}`}>Home</Link>
        <Link className="link" style={padding} to="/about">About</Link>
        <Link className="link" style={padding} to="/login">Login</Link>
      </div>
    )
  }

export default Menu