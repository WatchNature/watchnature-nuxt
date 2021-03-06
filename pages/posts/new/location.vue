<template>
  <div>
    <step-header title="Add Location"
      :prevUrl="prevUrl"
      :show-action-button="showActionButton"
      :actionCallback="save"></step-header>

    <gmap-map class="map-container"
      :center="{
          lat: currentLocation.coordinates[0],
          lng: currentLocation.coordinates[1]
        }"
      :zoom="zoom">
      <gmap-marker :position="{
            lat: currentLocation.coordinates[0],
            lng: currentLocation.coordinates[1]
          }"></gmap-marker>
    </gmap-map>

    <div class="relative z-1">
      <gmap-autocomplete placeholder="Search by name"
        @place_changed="setPlace"
        :value="locationName"></gmap-autocomplete>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import StepHeader from '~/components/post-wizard/StepHeader.vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_MAPS_API_KEY,
    libraries: 'places' // If you need to use place input
  }
})

export default {
  name: 'LocationForm',
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
      fetchingLocation: false,
      zoom: 14,
      currentLocationName: 'Lawrence, Kansas',
      currentLocation: {
        coordinates: [
          38.9716700,
          -95.2352500
        ],
        type: 'Point'
      }
    }
  },

  computed: {
    ...mapGetters({
      location: 'postWizard/location',
      locationName: 'postWizard/locationName'
    }),

    valid () {
      return !!this.currentLocation.coordinates[0] && !!this.currentLocation.coordinates[1]
    },

    showActionButton () {
      return this.valid
    }
  },

  methods: {
    ...mapActions({
      addNotification: 'notifications/add',
      addLocation: 'postWizard/addLocation'
    }),

    getCurrentLocation () {
      this.fetchingLocation = true

      const options = {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 0
      }

      navigator.geolocation.getCurrentPosition(
        this.locationCallbackSuccess,
        this.locationCallbackError,
        options
      )
    },

    locationCallbackSuccess (position) {
      this.currentLocation.coordinates[0] = position.coords.latitude
      this.currentLocation.coordinates[1] = position.coords.longitude
      this.fetchingLocation = false
    },

    locationCallbackError (error) {
      console.error(error)
      this.fetchingLocation = false
      let message = ''

      if (error.code === 1) {
        message = 'Please allow location services, or enter a location manually below.'
      } else {
        message = error.message
      }

      this.addNotification({
        type: 'error',
        message: message
      })
    },

    setPlace (place) {
      this.currentLocationName = place.name
      this.currentLocation = {
        coordinates: [
          place.geometry.location.lat(),
          place.geometry.location.lng()
        ],
        type: 'Point'
      }
    },

    save () {
      this.addLocation({
        location: this.currentLocation,
        locationName: this.currentLocationName
      })
        .then(() => {
          this.$router.push(this.prevUrl)
        })
    }
  },

  created () {
    if (this.location.latitude && this.location.longitude) {
      this.currentLocation = this.location
    }
  },

  mounted () {
    if (process.env.BROWSER_BUILD) {
      this.getCurrentLocation()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/_vars'

.map-container
  height 400px
  width 100%

.pac-container
  border-radius 0
  font-family inherit
  box-shadow none
  border 1px solid #bfbfbf
  &::after
    background-position left $space-1 center
    padding $space-1

.pac-item
  padding $space-1
</style>
