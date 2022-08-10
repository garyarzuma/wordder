import React, { useEffect } from 'react'
import './styles/GoogleLogin.css'
import jwt_decode from 'jwt-decode'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

import statsService from '../services/stats'

function GoogleLg() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCallbackResponse = async (response) => {
    const user = jwt_decode(response.credential)
    try {
      const savedUser = await loginService.googleLogin({
        email:user.email,
        family_name:user.family_name,
        given_name:user.given_name,
        picture:user.picture,
        name:user.name }
      )
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(savedUser)
      )
      statsService.setToken(savedUser.token)
      dispatch(setUser(savedUser.user.lname,savedUser.user.fname, savedUser.user.picURL,savedUser.user.email))
      navigate('/', { replace: true })
    } catch (error){
      console.log('Error Signing into Google with error ',error)
    }
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById('google-sign-in-button'),
      { theme: 'outline', size: 'large', width: '250px' }
    )
  }, [])

  return (
    <div>
      <div id='google-sign-in-button'></div>
    </div>
  )
}

export default GoogleLg

