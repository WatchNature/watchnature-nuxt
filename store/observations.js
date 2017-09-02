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
      state.all.push(observation)
    })
  }
}

export const actions = {
  findAll (context, { params, $axios }) {
    return new Promise((resolve, reject) => {
      $axios
        .get('observations', { params: params })
        .then(response => {
          const observations = response.data.data
          context.commit('add', observations)
          resolve(response.data)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  },

  add (context, observations) {
    context.commit('add', observations)
  },

  create (context, { observation, $axios }) {
    return new Promise((resolve, reject) => {
      $axios
        .observation('observations', { observation: observation })
        .then(response => {
          context.commit('addToTop', [response.data.data])
          resolve(response.data.data)
        })
        .catch(response => {
          reject(response)
        })
    })
  },

  delete (context, { observationId, $axios }) {
    return new Promise((resolve, reject) => {
      $axios
        .delete(`observations/${observationId}`)
        .then(response => {
          context.commit('delete', observationId)
          resolve(response.data)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }
}
