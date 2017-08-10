<template>
  <div>
    <img
      v-lazy="src"
      :alt="alt"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

export default {
  name: 'ObservationImage',

  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  img
    transition all 240ms ease-out

  img[lazy=loading]
    opacity 0

  img[lazy=error] {}

  img[lazy=loaded]
    opacity 1
</style>
