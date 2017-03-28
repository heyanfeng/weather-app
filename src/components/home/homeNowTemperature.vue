<template>
  <div class="now-temperature">
    <p>{{temperature}}<span>°</span></p>
    <p>{{currentWeather}}</p>
    <p>{{high}} / {{low}}</p>
    <p>空气{{air}}</p>
  </div>
</template>

<script>
  export default {
    name: 'nowTemperature',
    data () {
      return {
        tem: '',
        wea: '',
        tHigh: '',
        tLow: '',
        air: '',
        unit: parseInt(this.$store.state.unit),
        location: this.$store.state.currentLocation || 'ip'
      }
    },
    created () {
      this.$http.get(`${this.$store.state.nowUrl}location=${this.location}&language=zh-Hans&unit=c`)
      .then(res => {
        this.tem = res.data.results[0].now.temperature
        this.wea = res.data.results[0].now.text
      })
      .catch(error => {
        console.log(error)
      })
      this.$http.get(`${this.$store.state.dailyUrl}location=${this.location}&language=zh-Hans&unit=c&start=0&days=5`)
      .then(res => {
        this.tHigh = res.data.results[0].daily[0].high
        this.tLow = res.data.results[0].daily[0].low
      })
      .catch(error => {
        console.log(error)
      })
      this.$http.get(`${this.$store.state.airUrl}location=${this.location}&language=zh-Hans&scope=city`)
      .then(res => {
        this.air = res.data.results[0].air.city.quality
      })
      .catch(error => {
        console.log(error)
      })
    },
    computed: {
      temperature () {
        return this.unit ? Math.round(this.tem * 1.8 + 32) : this.tem
      },
      high () {
        return this.unit ? `${Math.round(this.tHigh * 1.8 + 32)}°` : `${this.tHigh}°`
      },
      low () {
        return this.unit ? `${Math.round(this.tLow * 1.8 + 32)}°` : `${this.tLow}°`
      },
      currentWeather () {
        if (this.wea) {
          return this.wea
        }
      }
    }
  }
</script>
<style scoped>
  .now-temperature {
    width: 50%;
    text-align: center;
    margin: 30px auto;
    color: #FFF;
  }
  .now-temperature p:nth-child(1) {
    font-size: 100px;
    position: relative;
  }
  .now-temperature p:nth-child(1) span {
    font-size: 60px;
    position: absolute;
    top: 20px;
  }
  .now-temperature p:nth-child(2) {
    font-size: 20px;
    margin-top: -20px;
  }
  .now-temperature p:nth-child(3) {
    font-size: 20px;
  }
  .now-temperature p:nth-child(4) {
    font-size: 20px;
  }
</style>
