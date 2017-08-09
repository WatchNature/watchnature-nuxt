import axios from 'axios'

export const state = () => ({
  currentUser: null,
  authToken: null
})

export const getters = {
  currentUser (state) {
    return state.currentUser
  }
}

export const mutations = {
  setCurrentUser (state, user) {
    state.currentUser = user
  },

  setAuthToken (state, token) {
    state.authToken = token
  },

  removeCurrentUser (state) {
    state.currentUser = {}
  },

  removeAuthToken (state) {
    state.authToken = ''
  }
}

export const actions = {
  nuxtServerInit: function ({ commit }, { req }) {
    if (req.session && req.session.currentUser) {
      commit('setCurrentUser', req.session.currentUser)
      commit('setAuthToken', req.session.authToken)
    }
  },

  signIn (context, { payload }) {
    return new Promise((resolve, reject) => {
      axios.post('/sessions/signin', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  signOut (context) {
    return new Promise((resolve, reject) => {
      axios.post('/sessions/signout')
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
