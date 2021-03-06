import GoogleLogin from 'react-google-login'
//import GoogleButton from 'react-google-button'
import React from 'react'
import './styles/GoogleLogin.css'
import googleIcon from '../images/google-icon.jpg'

function GoogleLg() {

  const handleLogin = async googleData => {
    const res = await fetch('api/login/v1/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    // store returned user somehow
    console.log(data)
  }

  return (
    <GoogleLogin
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
    />
  )
}

export default GoogleLg

