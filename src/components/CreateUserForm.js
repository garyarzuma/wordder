import React, { useState } from 'react'
import './styles/CreateUserForm.css'
import loginService from '../services/login'

const CreateUserForm = ({ setShowCreateForm }) => {

  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()
  const [email, setEmail] = useState()
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.signup({
        email, password, fname, lname
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      //blogService.setToken(user.token)
      console.log(user)
      //dispatch(setUser(lname,fname,picUrl,password,email))
      setEmail('')
      setPassword('')
    } catch (exception){
      //setErrorMessage('Wrong Username or Password')
      setTimeout(() => {
        //setErrorMessage(null)
        console.log('login error buddy')
      }, 5000)
    }
  }

  const handleCancel = async () => {
    setShowCreateForm(false)
  }

  return(
    <form className="create-user-form-box">
      <div>
        Email
        <input
          id='email'
          type="text"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        Password Confirmation:
        <input
          id='passwordC'
          type="password"
          value={passwordConfirmation}
          name="PasswordConfirmation"
          onChange={({ target }) => setPasswordConfirmation(target.value)}
        />
      </div>
      <div>
        First Name
        <input
          id='fname'
          type="text"
          value={fname}
          name="Fname"
          onChange={({ target }) => setFname(target.value)}
        />
      </div>
      <div>
        Last Name
        <input
          id='lname'
          type="text"
          value={lname}
          name="Lname"
          onChange={({ target }) => setLname(target.value)}
        />
      </div>
      <button id='create-button' onClick={handleCreate}>Create</button>
      <button id='cancel-button' onClick={handleCancel}>Cancel</button>
    </form>
  )
}

export default CreateUserForm