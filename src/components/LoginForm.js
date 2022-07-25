import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import './styles/LoginForm.css'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [password, setPassword] = useState()
  const [email, setEmail] = useState()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        email, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      //blogService.setToken(user.token)
      console.log(user)

      dispatch(setUser(user.user.lname,user.user.fname,null,user.user.email))

      setEmail('')
      setPassword('')
      navigate('/', { replace: true })

    } catch (exception){
      //setErrorMessage('Wrong Username or Password')
      setTimeout(() => {
        //setErrorMessage(null)
        console.log('login error buddy')
      }, 5000)
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
        <input
          id='email'
          type="text"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

export default LoginForm