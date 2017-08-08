<template>
  <section class="container">
    <header></header>
    <post-list></post-list>
  </section>
</template>

<script>
import PostList from '~/components/post/PostList.vue'

export default {
  name: 'Stream',

  components: {
    PostList
  },

  watch: {
    '$route': () => {
      this.bootstrap()
    }
  },

  methods: {
    bootstrap () {
      this.$store.dispatch('posts/findAll', { $axios: this.$axios })
    }
  },

  created () {
    this.bootstrap()
  }
}
</script>
