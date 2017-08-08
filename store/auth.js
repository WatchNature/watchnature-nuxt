import axios from 'axios'
import cookies from 'js-cookie'

export const state = () => ({
  currentUser: cookies.getJSON('currentUser'),
  authToken: cookies.get('authToken')
})

export const getters = {
  currentUser (state) {
    return state.currentUser
  }
}

export const mutations = {
  setCurrentUser (state, user) {
    state.currentUser = user

    if (state.currentUser) {
      cookies.set('currentUser', state.currentUser)
    } else {
      cookies.remove('currentUser')
    }
  },

  setAuthToken (state, token) {
    state.authToken = token

    if (state.authToken) {
      cookies.set('authToken', state.authToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.authToken}`
    } else {
      cookies.remove('authToken')
      delete axios.defaults.headers.common['Authorization']
    }
  },

  removeCurrentUser (state) {
    state.currentUser = {}
    cookies.remove('currentUser')
  },

  removeAuthToken (state) {
    state.authToken = ''
    cookies.remove('authToken')
  }
}

export const actions = {
  signIn (context, { payload, $axios }) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      $axios.post(process.env.API_AUTH_URL, payload)
        .then((response) => {
          context.commit('setCurrentUser', response.data.data)
          context.commit('setAuthToken', response.data.meta.token)
          resolve(response)
        })
        .catch((error) => reject(error))
    })
  }
}
