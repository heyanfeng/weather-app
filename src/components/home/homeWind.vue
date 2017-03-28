<template>
  <div class="home-wind">
    <p>风力风向</p>
    <p><img src="/static/img/wind-power.png"><span>风力：{{windPower}}</span></p>
    <p><img src="/static/img/wind.png"><span>风向：{{windDirection}}</span></p>
  </div>
</template>
<script>
  export default {
    name: 'homeWind',
    data () {
      return {
        location: this.$store.state.currentLocation || 'ip',
        windPowerArr: ['无风', '软风', '轻风', '微风', '和风', '清风', '强风', '劲风', '大风', '烈风', '狂风', '暴风', '台风'],
        windDirection: '',
        windPower: ''
      }
    },
    created () {
      this.$http.get(`${this.$store.state.nowUrl}location=${this.location}&language=zh-Hans&unit=c`)
      .then(res => {
        this.windDirection = res.data.results[0].now.wind_direction
        this.windPower = this.windPowerArr[res.data.results[0].now.wind_scale]
      })
    }
  }
</script>
<style>
  .home-wind {
    color: #fff;
    padding: 20px 10px;
    border-bottom: 1px solid #fff;
  }
  .home-wind p:nth-child(1) {
    font-size: 16px;
  }
  .home-wind p:nth-child(2) {
    text-align: center;
  }
  .home-wind p img {
    vertical-align: middle;
  }
  .home-wind p span {
    margin-left: 20px;
    font-size: 16px;
  }
  .home-wind p:nth-child(3){
    text-align: center;
    margin-top: 20px;
  }
</style>
