// import { api, currentUserID } from './client'
import { hubAPI as api } from './client'

export function login () {
  return api.get(`/login`)
}
