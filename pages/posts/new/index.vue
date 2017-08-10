<template>
  <div>
    <step-header
      title="New Post"
      prevUrl="/"
      :show-action-button="true"
      :actionCallback="save"
    ></step-header>

    <wizard-menu
    ></wizard-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import StepHeader from '~/components/post-wizard/StepHeader.vue'
import WizardMenu from '~/components/post-wizard/WizardMenu.vue'

export default {
  layout: 'PostWizard',

  components: {
    StepHeader,
    WizardMenu
  },

  fetch ({ store, redirect }) {
    if (!store.state.authToken) {
      return redirect('/signin')
    }
  },

  computed: {
    postData () {
      return this.$store.getters['postWizard/post']
    }
  },

  methods: {
    ...mapActions({
      create: 'posts/create',
      reset: 'postWizard/reset'
    }),

    save () {
      return this.create({ post: this.postData, $axios: this.$axios })
        .then((response) => {
          this.reset()
            .then(() => { this.$router.push('/') })
        })
        .catch(({ response }) => {
          const errors = response.data.errors

          _.forIn(errors, (val, key) => {
            this.$store.dispatch('notifications/add', {
              type: 'error',
              message: `${_.capitalize(key)} ${val}`
            })
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
