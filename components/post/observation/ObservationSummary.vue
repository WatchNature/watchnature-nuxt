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

    <div class="observation_summary__description">
      <p v-text="observation.description"></p>
    </div>
  </div>
</template>

<script>
import ObservationImage from '~/components/post/observation/observation-image.vue'
import { startCase } from 'lodash'

export default {
  name: 'ObservationSummary',

  components: {
    ObservationImage
  },

  props: {
    observation: {
      type: Object,
      required: true
    }
  },

  computed: {
    firstImageUrl () {
      const images = this.observation.images

      if (images.length > 0) {
        let url = images[0].url

        return `${url}?max-w=800&max-h=1200&crop=entropy&auto=format,compress`
      } else {
        return null
      }
    }
  },

  methods: {
    startCase (str) {
      return startCase(str)
    },

    imageAlt () {
      return `Photo: ${this.observation.description}`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/_vars'

.observation_summary__image
  background $gray-1
  min-height 400px
  width 100%
  display flex
  align-items center
  justify-content center

.observation_summary__header
  padding $space-2
  display flex
  justify-content space-between

.observation_summary__description
  padding $space-2
  overflow hidden

.observation_summary__description > p
  margin 0
</style>
