import React, { useState } from 'react'
import './styles/CreateUserForm.css'
import loginService from '../services/login'
import Notification from './Notification'

const CreateUserForm = ({ setShowCreateForm }) => {

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  //First we check for password errors which must be on the frontend, then get backend error messages
  //from the backend
  const handleCreate = async (event) => {
    event.preventDefault()
    updateBorderErrorColors('default')
    if (password !== passwordConfirmation){
      setErrorMessage('Passwords Must Match')
      updateBorderErrorColors('Password')
    }
    else if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long')
      updateBorderErrorColors('Password')
    }
    else{
      try {
        await loginService.signup({
          email, password, fname, lname
        })
        setShowCreateForm(false)
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
        setFname('')
        setLname('')
      } catch (exception){
        setErrorMessage(exception.response.data.error)
        updateBorderErrorColors(exception.response.data.error)
      }
    }
  }

  const handleCancel = async () => {
    setShowCreateForm(false)
    updateBorderErrorColors('default')
  }

  const updateBorderErrorColors = (errorMessage) => {
    if(errorMessage === 'default'){
      const elements = document.querySelectorAll('.error-border')
      console.log(elements)
      if(elements){
        elements.forEach(element => {
          element.className = 'input-box'
        })
      }
    }
    if (errorMessage.indexOf('Email') !== -1){
      document.getElementById('create-email').className = 'error-border'
    }
    else if (errorMessage.indexOf('Password') !== -1) {
      document.getElementById('create-password').className = 'error-border'
      document.getElementById('create-passwordC').className = 'error-border'
    }
    else if (errorMessage.indexOf('First') !== -1) {
      document.getElementById('fname').className = 'error-border'
    }
  }

  return(
    <form className="create-user-form-box">
      <div className="header">Create New Account</div>
      <Notification message={errorMessage} />
      <div>
        <input
          className='input-box'
          id='create-email'
          type="text"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
          placeholder = 'Email'
        />
      </div>
      <div>
        <input
          className='input-box'
          id='create-password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder = 'Password'
        />
      </div>
      <div>
        <input
          className='input-box'
          id='create-passwordC'
          type="password"
          value={passwordConfirmation}
          name="PasswordConfirmation"
          onChange={({ target }) => setPasswordConfirmation(target.value)}
          placeholder = 'Confirm Password'
        />
      </div>
      <div>
        <input
          className='input-box'
          id='fname'
          type="text"
          value={fname}
          name="Fname"
          onChange={({ target }) => setFname(target.value)}
          placeholder = 'First Name'
        />
      </div>
      <div>
        <input
          className='input-box'
          id='lname'
          type="text"
          value={lname}
          name="Lname"
          onChange={({ target }) => setLname(target.value)}
          placeholder = 'Last Name'
        />
      </div>
      <div className='buttons-container'>
        <button id='create-button' onClick={handleCreate}>Create</button>
        <button id='cancel-button' onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default CreateUserForm