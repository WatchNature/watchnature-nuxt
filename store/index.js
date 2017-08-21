import axios from 'axios'
import { map } from 'lodash'

export const state = () => ({
  currentUser: null,
  authToken: null
})

export const getters = {
  currentUser (state) {
    return state.currentUser
  },

  currentUserGroups (state) {
    if (state.currentUser && state.currentUser.groups) {
      return map(state.currentUser.groups, group => group.name)
    } else {
      return []
    }
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
  nuxtServerInit: function (context, { req }) {
    if (req.session && req.session.currentUser) {
      context.commit('setCurrentUser', req.session.currentUser)
      context.commit('setAuthToken', req.session.authToken)
    }
  },

  signIn (context, { payload }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/sessions/signin', payload)
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  signOut (context) {
    return new Promise((resolve, reject) => {
      axios
        .post('/sessions/signout')
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
