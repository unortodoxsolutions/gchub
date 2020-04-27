import { saveUserDetails } from './user'
import Client from 'lib-oauth2-client-js'

export const baseURL = '/api/v1'
export const upstreamBaseURL = 'https://devteam.dev.getcns.tech/api/v1'

const phoneNumberName = 'x-user-phone'
const userIdName = 'x-user-id'

const client = new Client({
  axios: { baseURL },
  oauth: {
    clientID: '4bd038c1-7a5a-4e59-8064-0a3ae2c049e6',
    endpoints: {
      auth: 'https://auth.test01.getcns.tech/oauth2/auth',
      token: 'https://auth.test01.getcns.tech/oauth2/token'
    },
    redirectURI: 'http://localhost:8888/hub/auth-callback'
  }
})

export const api = client.create({ baseURL: upstreamBaseURL })

client.useResponseInterceptor(handleResponse, handleError)
api.useResponseInterceptor(handleResponse, handleError)

export const hubAPI = client

function handleResponse (r) {
  const phone = r.headers[phoneNumberName]
  const id = r.headers[userIdName]

  if (phone) {
    localStorage.setItem(phoneNumberName, phone)
  }
  if (id) {
    localStorage.setItem(userIdName, id)
  }

  saveUserDetails(r)
  return r
}

function handleError (err) {
  if (err.response) return handleErrorWithResponse(err)
  if (err.request) return handleErrorWithRequest(err)
  return Promise.reject(err)
}

function handleErrorWithResponse (err) {
  const resp = err.response
  if (resp.status === 403) {
    const newErr = new Error(resp.data.message)
    newErr.subject = resp.data.subject
    newErr.action = resp.data.action
    newErr.resource = resp.data.resource
    newErr.roles = resp.data.roles
    return Promise.reject(newErr)
  }

  // unautorized
  if (resp.status === 401) {
    client.login()
  }

  if (resp.data && resp.data.code) {
    const newErr = new Error(resp.data.message || resp.data.error || err.message || resp.data.code.toString())
    newErr.code = resp.data.code
    return Promise.reject(newErr)
  }

  if (resp.data.error && resp.data.error.code) {
    const newErr = new Error(resp.data.error.message || resp.data.error.status || resp.data.error)
    newErr.code = resp.data.error.code
    return Promise.reject(newErr)
  }
}

function handleErrorWithRequest (err) {
  let data = {}

  try {
    data = JSON.parse(err.request.response)
  } catch (ex) {
    ex.originalError = err
    return Promise.reject(ex)
  }

  let newErr
  if (data.error) {
    newErr = new Error(data.error)
  } else if (data.message) {
    newErr = new Error(data.message)
  } else {
    newErr = new Error(err.request.response)
  }

  if (data.code) {
    newErr.code = data.code
  }
  return Promise.reject(newErr)
}

export function currentUserPhone () {
  if (!client.token) return ''
  return client.token.id.username
}

export function currentUserID () {
  if (!client.token) return 0
  return client.token.id.userID
}
