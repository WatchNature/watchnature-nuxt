<template>
  <div>
    <header class="observation_summary__header">
      <span v-if="observation.species"
        v-text="startCase(observation.species.common_name)"></span>

      <span v-text="observation.location_name"></span>
    </header>

    <div class="observation_summary__image">
      <observation-image v-if="firstImageUrl"
        :src="firstImageUrl"
        :alt="imageAlt()"></observation-image>
    </div>

    <div class="observation__meta flex justify-between items-center pa3">
      <div class="flex items-center">
        <avatar :username="postUser.full_name"></avatar>

        <div class="pl2">
          <span class="db"
            v-text="postUser.full_name"></span>
          <span v-text="formattedInsertedAt"></span>
        </div>
      </div>

      <div>
        <span class="observation__likes-count"
          v-text="observation.likes_count"></span>

        <button v-if="userHasLiked"
          class="button button--unlike"
          @click.prevent="unlike">
          Unlike
        </button>

        <button v-else
          class="button button--like"
          @click.prevent="like">
          Like
        </button>
      </div>
    </div>

    <div class="observation_summary__description">
      <p v-text="observation.description"></p>
    </div>
  </div>
</template>

<script>
import ObservationImage from '~/components/post/observation/observation-image.vue'
import { startCase } from 'lodash'
import { parse, distanceInWords } from 'date-fns'
import Avatar from 'vue-avatar/dist/Avatar.vue'

export default {
  name: 'ObservationSummary',

  components: {
    ObservationImage,
    Avatar
  },

  props: {
    observation: {
      type: Object,
      required: true
    }
  },

  computed: {
    formattedInsertedAt () {
      let insertedAt = parse(this.observation.inserted_at)
      let distance = distanceInWords(insertedAt, new Date())

      return `${distance} ago`
    },

    firstImageUrl () {
      const images = this.observation.images

      if (images.length > 0) {
        let url = images[0].url

        return `${url}?w=1440&h=1440&fit=crop&usm=20&auto=format,compress`
      } else {
        return null
      }
    },

    postUser () {
      let post = this.$store.getters['posts/findById'](this.observation.post_id)
      return post.user
    },

    userHasLiked () {
      if (this.observation.current_user.like_id === null) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    startCase (str) {
      return startCase(str)
    },

    imageAlt () {
      return `Photo: ${this.observation.description}`
    },

    like () {
      return this.$store.dispatch('observations/like', this.observation)
    },

    unlike () {
      return this.$store.dispatch('observations/unlike', this.observation)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/_vars'

.observation_summary__image
  background $gray-1
  min-height 320px
  width 100%
  display flex
  align-items center
  justify-content center

.observation_summary__header
  padding $space-2
  display flex
  justify-content space-between

.observation__likes-count
  margin-right $space-2

.observation_summary__description
  padding $space-2
  overflow hidden

.observation_summary__description > p
  margin 0

.button
  cursor pointer
  background $color-info
  color #ffffff
  border none
  padding $space-1 $space-2

.button--like
  background $color-success

.button--unlike
  background $color-error
</style>
