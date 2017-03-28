<template>
  <div class="header">
    <span @click="cancel"><Icon type="close-round"></Icon></span>
    <span>编辑城市</span>
    <span @click="sure"><Icon type="checkmark-round"></Icon></span>
  </div>
</template>
<script>
  export default {
    name: 'edit',
    methods: {
      cancel () {
        this.$store.commit('edit', false)
        this.$store.commit('cancelModify')
      },
      sure () {
        this.$store.commit('edit', false)
        this.$store.commit('sureModify')
      }
    }
  }
</script>
<style scoped>
  .header {
    border-bottom: 2px solid #fff;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 5px;
    height: 36px;
  }
</style>
