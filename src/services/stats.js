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
  const response = await axios.get(baseUrl+`/getStats/${credentials.email}`)
  return response.data
}

const getLastDayPlayed = async email => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl+`/getLastDatePlayed/${email}`, config)
  return response.data
}

export default { updateStats, updateDailyStats, getStats, setToken, getLastDayPlayed }