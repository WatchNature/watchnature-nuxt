export const state = () => ({
  all: []
})

export const getters = {
  all (state) {
    return state.all
  },

  findByPostId: (state, getters) => postId => {
    return state.all.filter(observation => {
      return observation.post_id === postId
    })
  }
}

export const mutations = {
  replace (state, observations) {
    state.all = observations
  },

  add (state, observations) {
    observations.forEach(observation => {
      let existingIndex = state.all.findIndex(existingObservation => {
        return observation.id === existingObservation.id
      })

      if (existingIndex > -1) {
        state.all.splice(existingIndex, 1, observation)
      } else {
        state.all.push(observation)
      }
    })
  },

  like (state, { observation, likeId }) {
    let existingIndex = state.all.findIndex(existingObservation => {
      return observation.id === existingObservation.id
    })

    state.all[existingIndex].current_user.like_id = likeId
  },

  unlike (state, observation) {
    let existingIndex = state.all.findIndex(existingObservation => {
      return observation.id === existingObservation.id
    })

    state.all[existingIndex].current_user.like_id = null
  }
}

export const actions = {
  add (context, observations) {
    context.commit('add', observations)
  },

  like (context, observation) {
    return new Promise((resolve, reject) => {
      this.$axios.post(`posts/${observation.post_id}/observations/${observation.id}/like`).then(response => {
        let likeId = response.data.data.id
        context.commit('like', { observation: observation, likeId: likeId })
        resolve(response.data.data)
      })
    })
  },

  unlike (context, observation) {
    return new Promise((resolve, reject) => {
      this.$axios.delete(`posts/${observation.post_id}/observations/${observation.id}/like`).then(response => {
        context.commit('unlike', observation)
        resolve(response.data.data)
      })
    })
  }
}
