import { reject } from 'lodash'

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

  postUserById: (state, getters) => id => {
    return getters.allPostUsers.find(user => user.id === id)
  },

  findById: (state, getters) => postId => {
    return getters.allPosts.find(post => post.id === postId)
  }
}

export const mutations = {
  replace (state, posts) {
    state.all = posts
  },

  add (state, posts) {
    posts.forEach(post => {
      state.all.push(post)
    })
  },

  // Adds a post to the top of the stack
  addToTop (state, posts) {
    posts.forEach(post => {
      state.all.unshift(post)
    })
  },

  delete (state, postId) {
    state.all = reject(state.all, post => post.id === postId)
  }
}

export const actions = {
  findAll (context, { params, $axios }) {
    return new Promise((resolve, reject) => {
      $axios
        .get('posts', { params: params })
        .then(response => {
          const posts = response.data.data
          context.commit('add', posts)
          processPostObservations(context, posts)

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
      $axios
        .post('posts', { post: post })
        .then(response => {
          let post = response.data.data
          context.commit('addToTop', [post])
          processPostObservations(context, [post])
          resolve(post)
        })
        .catch(response => {
          reject(response)
        })
    })
  },

  delete (context, { postId, $axios }) {
    return new Promise((resolve, reject) => {
      $axios
        .delete(`posts/${postId}`)
        .then(response => {
          context.commit('delete', postId)
          resolve(response.data)
        })
        .catch(err => {
          console.error(err)
          reject(err)
        })
    })
  }
}

// Relocate observations into their own module so that
// their actions, mutations etc are isolated. Also delete
// them so that there aren't duplicate observations in the store.
const processPostObservations = (context, posts) => {
  posts.forEach(post => {
    context.dispatch('observations/add', post.observations, { root: true })
    delete post.observations
  })
}
