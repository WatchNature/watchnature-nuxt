<template>
  <header class="flex flex-row">
    <div class="flex-auto">
      <router-link v-if="prevUrl"
        :to="prevUrl"
        class="mr2"
        title="Go Back">
        <icon-chevron class="v-mid"></icon-chevron>
      </router-link>

      <span class="v-mid">{{ title }}</span>
    </div>

    <transition name="slide-fade">
      <button v-if="showActionButton"
        @click.prevent="actionCallback"
        class="input-reset button-reset bg-transparent pointer bn ma0 pa0">
        <icon-check class="v-mid"></icon-check>
      </button>
    </transition>
  </header>
</template>

<script>
import IconCheck from '~/components/icons/IconCheck.vue'
import IconChevron from '~/components/icons/IconChevron.vue'

export default {
  name: 'StepHeader',

  components: {
    IconCheck,
    IconChevron
  },

  props: {
    title: {
      type: String,
      required: true
    },
    prevUrl: {
      type: String
    },
    showActionButton: {
      type: Boolean,
      default () { return false }
    },
    actionCallback: {
      type: Function
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/_vars'

header
  background-color #316fbc
  background linear-gradient(to bottom, rgba(9,141,193,1) 0%, rgba(49,111,188,1) 100%)
  color #ffffff
  overflow hidden
  padding $space-1
  position fixed
  top 0
  left 0
  width 100%
</style>
