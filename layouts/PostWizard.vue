<template>
  <div>
    <notification-drawer></notification-drawer>

    <div class="wrap">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import NotificationDrawer from '~/components/global/notifications/NotificationDrawer.vue'

export default {
  name: 'PostWizardLayout',

  components: {
    NotificationDrawer
  }
}
</script>

<style lang="stylus">
.container
  max-width 45rem
  margin 0 auto

body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  background #f0f0f0

.wrap
  padding-top 68px
  padding-bottom 50px
  max-width 45rem
  margin 0 auto

label
  display block
  margin-bottom 0.5rem

textarea
  width 100%

input,
textarea
  font-size 1rem
  padding 0.5rem
  width 100%

[type="submit"]
  background #2e71bc
  color #ffffff
  border 0
  padding 0.5rem 1rem
  cursor pointer
  font-size 1rem
  width auto

.form-group
  & + .form-group
    margin-top 1rem

.form-actions
  margin-top 1rem

.slide-fade-enter-active
  transition all 240ms ease-out

.slide-fade-leave-active
  transition all 800ms cubic-bezier(0.215, 0.61, 0.355, 1)

.slide-fade-enter, .slide-fade-leave-to
  transform translateY(-10px)
  opacity 0

.fade-enter-active
  transition all 240ms ease-out

.fade-leave-active
  transition all 240ms cubic-bezier(0.215, 0.61, 0.355, 1)

.fade-enter, .fade-leave-to
  opacity
</style>
