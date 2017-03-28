<template>
  <div class="manage-city">
    <div v-if="isEdited">
      <edited></edited>
    </div>
    <div v-else>
      <head-options></head-options>
    </div>
    <user-city></user-city>
  </div>
</template>

<script>
  import headOptions from './manageCityHeader'
  import edited from './edited'
  import userCity from './userCity'
  export default {
    components: {
      headOptions,
      edited,
      userCity
    },
    computed: {
      isEdited () {
        return this.$store.state.isEdited
      }
    }
  }
</script>

<style scoped>
</style>
