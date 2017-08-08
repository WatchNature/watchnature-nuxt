<template lang="html">
  <article class="post_summary">
    <observation-list
      :observations="post.observations"
    ></observation-list>

    <div v-if="post.user" class="post_summary__meta">
      By <router-link :to="{ name: 'userprofile', params: { id: post.user.id }}">{{ post.user.email }}</router-link>
    </div>
  </article>
</template>

<script>
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
</style>
