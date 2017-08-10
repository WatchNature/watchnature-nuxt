export const state = () => ({
  all: []
})

export const getters = {
  allTags (state) {
    return state.all
  }
}

export const mutations = {
  replace (state, tags) {
    state.all = tags
  },

  add (state, tagData) {
    state.all.push(tagData)
  }
}

export const actions = {
  findAll (context, { $axios }) {
    return new Promise((resolve, reject) => {
      $axios.get('tags')
        .then(response => {
          const tags = response.data.data
          context.commit('replace', tags)
          resolve(response.data.data)
        })
        .catch(response => {
          console.error(response)
          reject(response)
        })
    })
  }
}
