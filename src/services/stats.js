import axios from 'axios'
const baseUrl = '/api/stats'

const updateStats = async credentials => {
  const response = await axios.post(baseUrl+'/updateStats', credentials)
  return response.data
}

const getStats = async credentials => {
  const response = await axios.post(baseUrl+'/getStats', credentials)
  return response.data
}

export default { updateStats, getStats }