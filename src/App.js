import './App.css'
import React from 'react'
import Wordder from './components/Wordder'
import Menu from './components/Menu'
import InvalidWords from './components/InvalidWords'
import Login from './components/Login'
import HowTo from './components/HowTo'
import Stats from './components/Stats'

import {
  Routes,
  Route,
} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/howtoplay" element={<HowTo/>} />
        <Route path="/:fromCustWord/:toCustWord"  element={<Wordder/>} />
        <Route path="/" element={<Wordder/>} />
        <Route path="/invalidwords" element={<InvalidWords />} />
        <Route path="/invalidwords/invalidwords" element={<InvalidWords />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </div>
  )
}

export default App
