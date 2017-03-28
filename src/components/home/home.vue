<template>
  <div class="home">
    <home-nav></home-nav>
    <home-now-temperature></home-now-temperature>
    <home-hourly></home-hourly>
    <home-daily></home-daily>
    <home-wind></home-wind>
    <div class="waitting" v-show="isLoading">
      <div class="waitting-icon">
        <Spin size="large"></Spin>
        <p>加载中...</p>
      </div>
    </div>
  </div>
</template>

<script>
import homeNav from './homeNav'
import homeNowTemperature from './homeNowTemperature'
import homeHourly from './homeHourly'
import homeDaily from './homeDaily'
import homeWind from './homeWind'
export default {
  name: 'home',
  data () {
    return {
      isLoading: true
    }
  },
  components: {
    homeNav,
    homeNowTemperature,
    homeHourly,
    homeDaily,
    homeWind
  },
  created () {
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  }
}
</script>

<!-- Add "scoped" attribute to amit CSS to this component only -->
<style scoped>
  .home {
    /*position: relative;*/
  }
  .home .home-nav {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
  }
  .home .home-nav a {
    color: #fff;
  }
  .home .waitting {
    position:absolute;
    top:-30px;
    bottom:0;
    left:0;
    right:0;
    background:#666;
    /*opacity:0.8;*/
    z-index: 1000;
    color: #fff;
    transition: all 1s;
  }
  .home .waitting .waitting-icon {
    display: inline-block;
    position: absolute;
    top: 30%;
    left: 48%;
    transform: translateY(-50%);
  }
</style>
