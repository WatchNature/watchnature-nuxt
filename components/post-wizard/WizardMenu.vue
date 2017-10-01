<template>
  <div class="container">
    <wizard-menu-item to="/posts/new/image"
      resource-title="Image"
      :resource="imageUrl">
      <img slot="preview"
        :src="imageUrl" />
    </wizard-menu-item>

    <wizard-menu-item to="/posts/new/description"
      resource-title="Description"
      :resource="description"></wizard-menu-item>

    <wizard-menu-item to="/posts/new/location"
      resource-title="Location"
      :resource="locationName"></wizard-menu-item>

    <wizard-menu-item to="/posts/new/tags"
      resource-title="Tags"
      :resource="tagList"></wizard-menu-item>

    <wizard-menu-item to="/posts/new/species"
      resource-title="Species"
      :resource="species.common_name"></wizard-menu-item>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import WizardMenuItem from './WizardMenuItem'

export default {
  name: 'WizardMenu',

  components: {
    WizardMenuItem
  },

  computed: {
    ...mapGetters({
      description: 'postWizard/description',
      locationName: 'postWizard/locationName',
      imageUrl: 'postWizard/imageUrl',
      tagIds: 'postWizard/tagIds',
      species: 'postWizard/species',
      tags: 'tags/allTags'
    }),

    tagList () {
      if (this.tags.length === 0) {
        return ''
      } else {
        let list = []

        this.tagIds.forEach(id => {
          let tag = _.find(this.tags, (tag) => tag.id === id)
          list.push(tag.name)
        })

        return list.join(', ')
      }
    }
  },

  methods: {
    findAllTags () {
      this.$store.dispatch('tags/findAll', { $axios: this.$axios })
    }
  },

  created () {
    if (this.tags.length === 0) {
      this.findAllTags()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/_vars.styl'
</style>

