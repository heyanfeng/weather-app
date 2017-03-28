<template>
  <div class="add-city">
    <p class="header">
      <router-link to="/"><Icon type="arrow-left-c" class="backwards"></Icon></router-link>
      <span>添加城市</span>
    </p>
    <search-city></search-city>
    <city-lists></city-lists>
  </div>
</template>

<script>
  import searchCity from './searchCity'
  import cityLists from './cityLists'
  export default {
    name: 'addCity',
    components: {
      searchCity,
      cityLists
    }
  }
</script>

<style scoped>
  .header {
    border-bottom: 2px solid #fff;
    font-size: 14px;
    color: #fff;
  }
  .backwards {
    margin: 10px;
    color: #fff;
  }
</style>
