<template>
  <div class="notification-drawer">
    <transition-group name="slide-fade">
      <notification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      ></notification>
    </transition-group>
  </div>
</template>

<script>
import Notification from '~/components/global/notifications/Notification.vue'

export default {
  name: 'NotificationDrawer',

  components: {
    Notification
  },

  computed: {
    notifications () {
      return this.$store.state.notifications.all
    }
  }
}
</script>

<style lang="stylus" scoped>
.notification-drawer
  z-index 100
  position fixed
  top 0
  right 0
  width 100%
</style>
