<template>
  <div>
    <step-header
      title="New Post"
      prevUrl="/"
      :show-action-button="showActionButton"
      :actionCallback="save"
    ></step-header>

    <wizard-menu
    ></wizard-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters({
      saving: 'postWizard/saving',
      postData: 'postWizard/post'
    }),

    showActionButton () {
      return !this.saving
    }
  },

  methods: {
    ...mapActions({
      create: 'posts/create',
      reset: 'postWizard/reset',
      setSaving: 'postWizard/setSaving'
    }),

    save () {
      this.setSaving(true)

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
        .then((response) => this.setSaving(false))
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
