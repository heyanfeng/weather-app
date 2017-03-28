<template>
  <nav class="home-nav">
    <router-link to="/addCity"><Icon type="home"></Icon></router-link>
    <router-link to="/manageCity">
      <span>{{getLocation}}</span>
      <Icon type="ios-location"></Icon>
    </router-link>
    <router-link to="/setUp"><Icon type="ios-gear"></Icon></router-link>
  </nav>
</template>

<script>
  export default {
    name: 'homeNav',
    data () {
      return {
      }
    },
    computed: {
      getLocation () {
        return this.$store.state.currentLocation
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
  }
  .home-nav a {
    color: #fff;
  }
</style>
