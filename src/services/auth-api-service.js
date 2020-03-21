import config from '../config'

const AuthApiService = {
  postLogin({ user_name, password }) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
        'content-type': 'application/json',
      },
      body: JSON.stringify(user_name, password),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers: {
        'authorization': 'bearer db943962-4003-4d18-ab25-9f0c6bb2679c',
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default AuthApiService