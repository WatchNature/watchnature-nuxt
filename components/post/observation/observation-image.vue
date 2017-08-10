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

Vue.use(VueLazyload, {
  loading: '/images/loading.svg',
  attempt: 1
})

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
  img[lazy=loading] {}
  img[lazy=error] {}
  img[lazy=loaded] {}
</style>
