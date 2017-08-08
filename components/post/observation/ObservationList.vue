<template>
  <div>
    <observation-summary
      v-for="observation in observations"
      :key="observation.id"
      :observation="observation"
    ></observation-summary>
  </div>
</template>

<script>
import ObservationSummary from '~/components/post/observation/ObservationSummary.vue'

export default {
  name: 'ObservationList',

  components: {
    ObservationSummary
  },

  props: {
    observations: {
      type: Array,
      required: true
    }
  }
}
</script>
