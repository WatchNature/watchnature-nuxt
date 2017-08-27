<template lang="html">
  <section class="article-container">
    <post-summary
      v-for="post in allPosts"
      :key="post.id"
      :post="post"
    ></post-summary>

    <mugen-scroll
      v-show="shouldFetchNextPage"
      :handler="fetchData"
      :should-handle="shouldFetchNextPage"
      scroll-container="article-container"
    >
      <div class="loading-bar">
        loading...
      </div>
    </mugen-scroll>
  </section>
</template>

<script>
import PostSummary from '~/components/post/PostSummary.vue'
import MugenScroll from 'vue-mugen-scroll'

export default {
  name: 'PostList',

  components: {
    PostSummary,
    MugenScroll
  },

  data () {
    return {
      loading: false,
      meta: {
        page_number: 0,
        total_pages: 1
      }
    }
  },

  computed: {
    allPosts () {
      return this.$store.getters['posts/allPosts']
    },

    shouldFetchNextPage () {
      if (this.loading) {
        return false
      } else if (this.meta.page_number >= this.meta.total_pages) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    fetchData () {
      this.loading = true

      let params = {
        page: this.meta.page_number + 1
      }

      this.$store.dispatch('posts/findAll', { params: params, $axios: this.$axios })
        .then((res) => {
          this.meta = res.meta
        })
        .catch((err) => {
          console.error(err)
        })
        .then(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/_vars'

.loading-bar
  padding $space-2
  text-align center
</style>
