<template>
  <div class="user-city">
    <ul>
      <li v-for="(city, index) in userCity" v-if="city.currentLocation" @click="choose($event, city.p, index)">
        <span class="city-name">{{ city.p }}</span>
        <Icon type="ios-location" class="icon" size="16"></Icon>
        <div class="city-weather">
          <p class="city-temperature">{{ city.t }}</p>
          <p class="city-text">{{ city.w }}</p>
        </div>
        <span><Icon type="close-circled" class="del" v-show="isEdited"></Icon></span>
      </li>
      <li v-for="(city, index) in userCity" @click="choose($event, city.p, index)" v-if="!city.currentLocation">
        <span class="city-name">{{ city.p }}</span>
        <div class="city-weather">
          <p class="city-temperature">{{ city.t }}</p>
          <p class="city-text">{{ city.w }}</p>
        </div>
        <span id="del"><Icon type="close-circled" class="del" v-show="isEdited"></Icon></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'userCity',
    data () {
      return {
      }
    },
    computed: {
      userCity () {
        return this.$store.state.userCity
      },
      isEdited () {
        return this.$store.state.isEdited
      }
    },
    methods: {
      choose (e, cityName, index) {
        if (e.target.nodeName.toLowerCase() === 'li') {
          this.$store.commit('getCurrentLocation', cityName)
          this.$store.commit('setCurrentLocation', index)
        } else if (e.target.nodeName.toLowerCase() === 'i') {
          this.$store.commit('delCity', index)
        } else {
        }
      }
    }
  }
</script>
<style scoped>
  .user-city .icon {
    margin-left: 10px;
  }
  .user-city ul li {
    line-height: 80px;
    background: #fff;
    border-bottom: 1px solid #e3e8ee;
    padding: 0 25px;
    position: relative;
  }
  .user-city ul li .city-name {
    font-size: 16px;
  }
  .user-city ul li .city-weather {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    text-align: right;
  }
  .user-city ul li .city-weather p {
    line-height: normal;
  }
  .user-city .city-temperature {
    font-size: 20px;
  }
  .user-city .city-text {
    margin-top: 5px;
    padding-right: 8px;
  }
  .user-city .del {
    font-size: 20px;
    color: #f00;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
