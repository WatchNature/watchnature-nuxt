<template>
  <div>
    <router-link
      class="link db"
      to="/posts/new/description"
      title="Add/Edit Description"
    >
      <div v-if="description">
        <p class="ma0">{{ description }}</p>
      </div>

      <span v-else>
        Add Description
      </span>
    </router-link>

    <router-link
      class="link mt3 db"
      to="/posts/new/location"
      title="Add/Edit Location"
    >
      <div v-if="locationName">
        <p class="ma0" v-text="locationName"></p>
      </div>

      <span v-else>
        Add Location
      </span>
    </router-link>

    <router-link
      class="link mt3 db"
      to="/posts/new/image"
      title="Add/Edit Image"
    >
      <div v-if="imageUrl">
        <img :src="imageUrl" />
      </div>

      <span v-else>
        Add Image
      </span>
    </router-link>

    <router-link
      class="link mt3 db"
      to="/posts/new/tags"
      title="Add/Edit Tags"
    >
      <div v-if="tagIds.length">
        <p class="ma0">{{ tagList }}</p>
      </div>

      <span v-else>
        Add Tags
      </span>
    </router-link>

    <router-link
      class="link mt3 db"
      to="/posts/new/species"
      title="Add/Edit Species"
    >
      <div v-if="species.common_name">
        <p class="ma0" v-text="species.common_name"></p>
      </div>

      <span v-else>
        Add Species
      </span>
    </router-link>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'WizardMenu',

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
