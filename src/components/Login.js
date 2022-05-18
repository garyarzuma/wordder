import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin.js'
import FbLogin from './FacebookLogin'
import LoginForm from './LoginForm'
import CreateUserForm from './CreateUserForm'
import './styles/Login.css'

const Login = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const padding ={
    'paddingTop':'50px'
  }

  return (
    <div style = {padding} className="login-container">
      {showCreateForm &&
        <div className="create-login-form">
          <CreateUserForm setShowCreateForm={(x) => setShowCreateForm(x)}/>
        </div>
      }
      <LoginForm />
      <div>OR</div>
      <FbLogin />
      <GoogleLogin />
      <button onClick={() => setShowCreateForm(true)}>Sign Up</button>
    </div>
  )
}

export default Login