import React, { useEffect } from 'react'
import loginService from '../services/login'
import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'
import './styles/Login.css'

const Login = () => {

  useEffect(() => {
    const fetchFunction = async () => {
      const notes = await loginService.getAll()
      console.log('backend',notes)
    }
    fetchFunction()
  }, [])

  const handleLogin = async googleData => {
    const res = await fetch('/api/v1/auth/google', {
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
  const padding = {
    'marginTop':'50px'
  }
  return (
    <div style = {padding} className="login-container">
      <GoogleLogin
        clientId= {process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={renderProps => (
          <GoogleButton className='google-sign-in-button' onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
        )}
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Login