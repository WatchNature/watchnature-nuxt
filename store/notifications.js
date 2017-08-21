import _ from 'lodash'

export const state = () => ({
  all: []
})

export const getters = {
  all (state) {
    return state.all
  }
}

export const mutations = {
  add (state, notificationData) {
    state.all.push(notificationData)
  },

  dismiss (state, notificationId) {
    state.all = state.all.filter(item => item.id !== notificationId)
  }
}

export const actions = {
  add (context, payload) {
    return new Promise((resolve, reject) => {
      const notificationData = {
        id: _.uniqueId('notification'),
        type: payload.type,
        message: payload.message,
        dismissAfter: payload.dismissAfter
      }

      context.commit('add', notificationData)
    })
  },

  dismiss (context, notificationId) {
    return new Promise((resolve, reject) => {
      context.commit('dismiss', notificationId)
      resolve()
    })
  }
}
