import axios from 'axios'
const baseUrl = '/api/stats'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const updateStats = async credentials => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl+'/updateStats', credentials, config)
  return response.data
}

const updateDailyStats = async credentials => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl+'/updateStats/daily', credentials, config)
  return response.data
}

const getStats = async credentials => {
  const response = await axios.post(baseUrl+'/getStats', credentials)
  return response.data
}

export default { updateStats, updateDailyStats, getStats, setToken }