<template>
  <div class="tab-bar fixed bottom-0 left-0 w-100 pa3 tc">
    <router-link class="white" to="/posts/new">Add Post</router-link>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang="stylus" scoped>
.tab-bar
  background-color #3070bc
</style>
