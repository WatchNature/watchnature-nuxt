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

  add (state, posts) {
    posts.forEach((post) => {
      state.all.push(post)
    })
  }
}

export const actions = {
  findAll (context, { params, $axios }) {
    return new Promise((resolve, reject) => {
      $axios.get('posts', { params: params })
        .then(response => {
          const posts = response.data.data
          context.commit('add', posts)
          resolve(response.data)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
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
