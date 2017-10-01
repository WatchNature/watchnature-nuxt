<template>
  <router-link class="link db"
    :to="to"
    :title="resource">

    <div class="flex items-center justify-between"
      v-if="empty">
      <span>Add {{ resourceTitle }}</span>

      <icon-chevron dir="right"
        stroke="#000000"
        class="v-mid"></icon-chevron>
    </div>
    <div v-else>
      <span class="link__title f6"
        v-text="resourceTitle + ' (Edit)'"></span>

      <slot name="preview">
        {{ resource }}
      </slot>
    </div>
  </router-link>
</template>

<script>
import { isEmpty } from 'lodash'
import IconChevron from '~/components/icons/IconChevron.vue'

export default {
  name: 'WizardMenuItem',

  components: {
    IconChevron
  },

  props: {
    to: {
      type: String,
      required: true
    },
    resource: {
      type: [String, Array, Object],
      required: true
    },
    resourceTitle: {
      type: String,
      required: true
    }
  },

  computed: {
    empty () {
      return isEmpty(this.resource)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/_vars.styl'

.link
  color #000000
  background-color #ffffff
  padding $space-2
  border-top 1px solid #d8d8d8

.link__title
  color #000000
  display block
  margin-bottom $space-2
</style>
