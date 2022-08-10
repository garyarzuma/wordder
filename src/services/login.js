import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl+'/wordderLogin', credentials)
  return response.data
}

const signup = async credentials => {
  const response = await axios.post(baseUrl+'/wordderLogin/signup', credentials)
  return response.data
}

const facebookLogin = async credentials => {
  const response = await axios.post(baseUrl+'/facebookLogin', credentials)
  return response.data
}

const googleLogin = async credentials => {
  const response = await axios.post(baseUrl+'/googleLogin', credentials)
  return response.data
}

export default { login,signup, facebookLogin, googleLogin }