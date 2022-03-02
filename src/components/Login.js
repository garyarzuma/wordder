import React, {useEffect} from 'react';
import loginService from '../services/login'

const Login = () => {

  useEffect(() => {
    const fetchFunction = async () => {
      const notes = await loginService.getAll() 
      console.log("backend",notes)
    }
    fetchFunction()
  }, [])
  
  
    const padding = {
      "marginTop":"50px"
    }
    return (
      <div style = {padding} className="login-container">
        Soon you'll be able to login....
      </div>
    )
  }

export default Login