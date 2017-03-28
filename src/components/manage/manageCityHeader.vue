<template>
  <div class="header">
    <router-link to="/"><Icon type="arrow-left-c" class="backwards"></Icon></router-link>
    <span>管理城市</span>
    <div class="twoIcon">
      <span @click="edited"><Icon type="edit" class="edit"></Icon></span>
      <router-link to="/addCity"><Icon type="plus-round" class="plus-round"></Icon></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headOptions',
    methods: {
      edited () {
        this.$store.commit('edit', true)
      }
    }
  }
</script>

<style scoped>
  .header {
    border-bottom: 2px solid #fff;
    font-size: 14px;
    color: #fff;
    position: relative;
  }
  .backwards,
  .edit,
  .plus-round {
    margin: 10px;
    color: #fff;
  }
  .twoIcon {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
