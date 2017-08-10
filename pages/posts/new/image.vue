<template>
  <div>
    <step-header
      title="Add Image"
      :prevUrl="prevUrl"
      :show-action-button="showActionButton"
      :actionCallback="save"
    ></step-header>

    <div class="imageform__container" v-if="imageUrl">
      <img :src="imageUrl" />
    </div>

    <div v-else>
      <form @submit.prevent="upload">
        <input ref="imageinput" type="file">
        <input type="submit" value="Upload">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import StepHeader from '~/components/post-wizard/StepHeader.vue'

export default {
  name: 'ImageForm',
  layout: 'PostWizard',

  components: {
    StepHeader
  },

  fetch ({ store, redirect }) {
    if (!store.state.authToken) {
      return redirect('/signin')
    }
  },

  data () {
    return {
      prevUrl: '/posts/new',
      formData: {}
    }
  },

  computed: {
    ...mapGetters({
      imageUrl: 'postWizard/imageUrl'
    }),

    showActionButton () {
      if (this.imageUrl === null) {
        return false
      } else {
        return true
      }
    }
  },

  methods: {
    ...mapActions({
      addImageUrl: 'postWizard/addImageUrl'
    }),

    getFormData () {
      this.$axios.get('presigned_post')
        .then((response) => {
          this.formData = response.data.data.url
          console.log(this.presignedUrl)
        })
    },

    upload () {
      let payload = new FormData()
      let image = this.$refs.imageinput.files[0]

      payload.append('file', image, image.name)

      this.$axios.post('media', payload)
        .then((response) => {
          const url = response.data.url
          this.addImageUrl({ url: url })
        })
        .catch((err) => {
          console.log(err)
          // TODO: Pop notification
        })
    },

    save () {
      this.$router.push(this.prevUrl)
    }
  }
}
</script>

<style lang="stylus" scoped>
.imageform__container
  text-align center
</style>
