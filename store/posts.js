export const state = () => ({
  included: [],
  all: []
})

export const getters = {
  allPosts (state) {
    return state.all
  },

  allPostUsers (state) {
    return state.included
  },

  postUserById: (state, getters) => (id) => {
    return getters.allPostUsers.find((user) => user.id === id)
  }
}

export const mutations = {
  replace (state, posts) {
    state.all = posts
  },

  add (state, postData) {
    state.all.push(postData)
  }
}

export const actions = {
  findAll (context, { $axios }) {
    $axios.get('posts')
      .then(response => {
        const posts = response.data.data
        context.commit('replace', posts)
      })
      .catch(response => {
        console.error(response)
      })
  },

  create (context, { post, $axios }) {
    return new Promise((resolve, reject) => {
      $axios.post('posts', { post: post })
        .then(response => {
          context.commit('add', response.data.data)
          resolve(response.data.data)
        })
        .catch(response => {
          reject(response)
        })
    })
  }
}
