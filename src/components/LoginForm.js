import React, { useState } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
//import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'

const LoginForm = () => {

  //const dispatch = useDispatch()
  //const fname = useSelector(state => state.user.fname)
  //const lname = useSelector(state => state.user.lname)
  //const picUrl = useSelector(state => state.user.picUrl)
  // const reduxEmail = useSelector(state => state.user.email)
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
    //dispatch(setUser(lname,fname,picUrl,email))
    //console.log(fname,lname,picUrl,reduxEmail)
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
        email
        <input
          id='username'
          type="text"
          value={email}
          name="Email"
          onChange={({ target }) => setEmail(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )
}

export default LoginForm