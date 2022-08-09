//import GoogleLogin from 'react-google-login'
//import GoogleButton from 'react-google-button'
import React, { useEffect } from 'react'
import './styles/GoogleLogin.css'
import jwt_decode from 'jwt-decode'
//import googleIcon from '../images/google-icon.jpg'
//import { useDispatch } from 'react-redux'
//import { setUser } from '../reducers/userReducer'
//import { useNavigate } from 'react-router-dom'
//import statsService from '../services/stats'

function GoogleLg() {

  const handleCallbackResponse = (response) => {
    console.log('Encoded JWT ID Token: ' + response.credential)
    const user = jwt_decode(response.credential)
    console.log(user)
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

  /*  const dispatch = useDispatch()
  const navigate = useNavigate()
 */
  /*  const handleLogin = async googleData => {
    console.log(googleData)
    const res = await fetch('api/login/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const user = await res.json()

    window.localStorage.setItem(
      'loggedUser', JSON.stringify(user)
    )
    statsService.setToken(user.token)

    dispatch(setUser(null,user.user.name,user.user.picURL,user.user.email))
    navigate('/', { replace: true })
  } */

  return (
    <div>
      <div id='signInDiv'></div>
      {/* <GoogleLogin
        clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={renderProps => (
          <div className='google-button-container'>
            <img className='google-icon' src={googleIcon}></img>
            <button className='google-sign-in-button' onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</button>
          </div>
        )}
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
      /> */}
    </div>
  )
}

export default GoogleLg

