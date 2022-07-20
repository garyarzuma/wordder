import React, { useState } from 'react'
import './styles/CreateUserForm.css'
import loginService from '../services/login'

const CreateUserForm = ({ setShowCreateForm }) => {

  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()
  const [email, setEmail] = useState()
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [errorMessage, setErrorMessage] = useState(null)


  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.signup({
        email, password, fname, lname
      })
      setShowCreateForm(false)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      //blogService.setToken(user.token)
      console.log(user)
      //dispatch(setUser(lname,fname,picUrl,password,email))
      setEmail('')
      setPassword('')
      setPasswordConfirmation('')
      setFname('')
      setLname('')
    } catch (exception){
      setErrorMessage('Error')
      console.log('login error buddy' + exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCancel = async () => {
    setShowCreateForm(false)
  }

  return(
    <form className="create-user-form-box">
      <div className="header">Create New Account</div>
      <div className="errorMessageSigningUp">{errorMessage}</div>
      <div>
        <input
          className='input-box'
          id='email'
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
          id='password'
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
          id='passwordC'
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