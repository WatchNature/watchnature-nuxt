<template>
  <div>
    <step-header title="Add Image"
      :prevUrl="prevUrl"
      :show-action-button="showActionButton"
      :actionCallback="save"></step-header>

    <div class="imageform__container flex items-center justify-center"
      v-if="imageUrl && !saving"
      @click="resetImage">
      <img :src="imageUrl" />
    </div>
    <div class="imageform__container"
      v-if="!imageUrl && !saving">
      <form @submit.prevent="upload">
        <label class="imageform__label flex items-center justify-center"
          for="image">
          <span>Choose an Image</span>
        </label>
        <input ref="imageinput"
          class="imageform__input"
          id="image"
          type="file"
          @change="upload">
      </form>
    </div>

    <div class="imageform__container flex items-center justify-center"
      v-if="saving">
      <spinner></spinner>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Spinner from '~/components/global/Spinner.vue'
import StepHeader from '~/components/post-wizard/StepHeader.vue'

export default {
  name: 'ImageForm',
  layout: 'PostWizard',

  components: {
    StepHeader,
    Spinner
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
      saving: 'postWizard/saving',
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
      addImageUrl: 'postWizard/addImageUrl',
      resetImage: 'postWizard/resetImage'
    }),

    upload () {
      let payload = new FormData()
      let image = this.$refs.imageinput.files[0]

      payload.append('file', image, image.name)

      this.$store.dispatch('postWizard/setSaving', true)
      // For now all postWizard actions are just getters and setters
      // TODO: Do this in the store
      this.$axios.post('media', payload)
        .then((response) => {
          const url = response.data.url
          this.addImageUrl({ url: url })
        })
        .catch((err) => {
          console.log(err)
          // TODO: Pop notification
        })
        .then(() => {
          this.$store.dispatch('postWizard/setSaving', false)
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
  overflow hidden
  position fixed
  top 40px
  left 0px
  width 100%
  height calc(100% - 40px)
  text-align center

  img
    background-color #000000

.imageform__label
  position absolute
  background-color rgba(0, 0, 0, 0.05)
  height 100%
  width 100%
  top 0
  left 0
  min-height 300px

.imageform__input
	width 0.1px
	height 0.1px
	opacity 0
	overflow hidden
	position absolute
	z-index -1
</style>
