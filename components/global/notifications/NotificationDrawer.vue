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
import { mapGetters } from 'vuex'
import Notification from '~/components/global/notifications/Notification.vue'

export default {
  name: 'NotificationDrawer',

  components: {
    Notification
  },

  computed: {
    ...mapGetters({
      notifications: 'notifications/all'
    })
  }
}
</script>

<style lang="stylus" scoped>
.notification-drawer
  position fixed
  z-index 200
  top 0
  right 0
  width 100%
</style>
