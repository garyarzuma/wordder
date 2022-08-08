import './App.css'
import React, { useEffect } from 'react'
import Wordder from './components/Wordder'
import Menu from './components/Menu'
import InvalidWords from './components/InvalidWords'
import Login from './components/Login'
import HowTo from './components/HowTo'
import Stats from './components/Stats'
import { setUser } from './reducers/userReducer'
import { useDispatch } from 'react-redux'
import statsService from './services/stats'

import {
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  const dispatch = useDispatch()

  //Checks to see localStorage if you have signed in recently
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user.user.lname,user.user.fname,user.user.picURL,user.user.email))
      statsService.setToken(user.token)
    }
  }, [])

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
