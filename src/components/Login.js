import React, { useState } from 'react'
import GoogleLogin from './GoogleLogin.js'
import FbLogin from './FacebookLogin'
import LoginForm from './LoginForm'
import CreateUserForm from './CreateUserForm'
import './styles/Login.css'

const Login = () => {
  const [showCreateForm, setShowCreateForm] = useState(false)

  return (
    <div className='login-page'>
      {showCreateForm &&
          <div className="create-login-form">
            <CreateUserForm setShowCreateForm={(x) => setShowCreateForm(x)}/>
          </div>
      }
      <div  className="login-container">
        <div className='row'>
          <LoginForm />
        </div>
        <div className='row'>OR</div>
        <div className='row'>
          <FbLogin />
          <GoogleLogin />
        </div>
        <div className='row'>
          <div className="new-member">
            New member? Create an account {''}
            <a href='#' onClick={() => setShowCreateForm(true)}>here</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login