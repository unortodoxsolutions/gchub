import axios from 'axios'
const api = 'https://getcoins.com/api/v1/getlocation'

export function getAmtAddress () {
  return axios.get(api + '/')
}
