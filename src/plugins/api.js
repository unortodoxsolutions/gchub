import API from 'lib-oauth2-client-js'

const api = new API({
  axios: {
    baseURL: 'https://devteam.dev.getcns.tech/api/v1'
  },
  oauth: {
    clientID: '9aefb029-be95-44b2-83f6-bfe0bb811653',
    endpoints: {
      auth: 'https://devteam.dev.auth.getcns.tech/oauth2/auth',
      token: 'https://devteam.dev.auth.getcns.tech/oauth2/token'
    },
    redirectURI: 'http://localhost:8888/auth-callback'
  }
})

export default api
