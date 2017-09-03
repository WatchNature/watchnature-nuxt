<template lang="html">
  <article class="post_summary">
    <observation-list
      :observations="postObservations"
    ></observation-list>

    <popover
      v-if="showAdminControls"
      name="admin"
      class="admin-controls dib">
      <div 
        slot="face"
      >
        <button
          @click.prevent
          class="button button--info"
        >Admin</button>
      </div>
      <div slot="content">
        <ul>
          <li>
            <button
              @click.prevent="deletePost(post)"
              class="button nowrap"
            >Delete Post</button>
          </li>
        </ul>
      </div>
    </popover>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import { includes } from 'lodash'
import popover from 'vue-popover'
import ObservationList from '~/components/post/observation/ObservationList.vue'

export default {
  name: 'PostSummary',

  components: {
    ObservationList,
    popover
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
    },

    postObservations () {
      return this.$store.getters['observations/findByPostId'](this.post.id)
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
@import '~assets/stylus/_vars'

.post_summary
  background-color #ffffff
  & + .post_summary
    margin-top $space-1

.post_summary__meta
  padding $space-2

.admin-controls
  margin-left $space-2
  margin-right $space-2
  padding-top $space-2
  padding-bottom $space-2
</style>
