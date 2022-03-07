import React from 'react'
import GoogleLogin from './GoogleLogin.js'
import FbLogin from './FacebookLogin'
import LoginForm from './LoginForm'
import './styles/Login.css'

const Login = () => {

  const padding ={
    'paddingTop':'50px'
  }

  return (
    <div style = {padding} className="login-container">
      <LoginForm />
      <div>OR</div>
      <FbLogin />
      <GoogleLogin />
    </div>
  )
}

export default Login