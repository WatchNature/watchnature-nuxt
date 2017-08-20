<template lang="html">
  <article class="post_summary">
    <observation-list
      :observations="post.observations"
    ></observation-list>

    <div v-if="post.user" class="post_summary__meta">
      By <router-link to="/">{{ post.user.email }}</router-link>
    </div>

    <div
      v-if="showAdminControls"
      class="admin-controls"
    >
      <button
        @click.prevent="deletePost(post)"
      >
        Delete Post
      </button>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import { includes } from 'lodash'
import ObservationList from '~/components/post/observation/ObservationList.vue'

export default {
  name: 'PostSummary',

  components: {
    ObservationList
  },

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters({
      currentUserGroups: 'currentUserGroups'
    }),

    showAdminControls () {
      return includes(this.currentUserGroups, 'admin')
    }
  },

  methods: {
    deletePost (post) {
      this.$store.dispatch('posts/delete', { postId: post.id, $axios: this.$axios })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/stylus/_vars'

.post_summary
  background-color #ffffff
  & + .post_summary
    margin-top $space-1

.post_summary__meta
  padding $space-2

.admin-controls
  padding $space-2

  button
    background-color #db534f
    border none
    cursor pointer
    color #ffffff
    padding $space-1
</style>
