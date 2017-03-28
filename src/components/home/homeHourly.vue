<template>
  <div class="home-hourly">
    <ul>
      <li v-for="item in items">
        <p>{{item.time}}</p>
        <p><img :src="item.img"></p>
        <p>{{item.tem}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'homeHourly',
  data () {
    return {
      location: this.$store.state.currentLocation || 'ip',
      unit: parseInt(this.$store.state.unit),
      items: [{
        time: '',
        img: '',
        tem: ''
      }]
    }
  },
  created () {
    this.$http.get(`${this.$store.state.hourlyUrl}location=${this.location}&language=zh-Hans&unit=c&start=0&hours=24`)
    .then(res => {
      this.items[0].time = '现在'
      this.items[0].img = `/static/img/${res.data.results[0].hourly[0].code}.png`
      this.items[0].tem = this.unit ? `${Math.round(res.data.results[0].hourly[0].temperature * 1.8 + 32)}°` : `${res.data.results[0].hourly[0].temperature}°`
      for (let i = 1; i < 24; i++) {
        let obj = {
          time: (function () {
            let t = res.data.results[0].hourly[i].time
            let n = t.split('T')[1].split(':')
            return `${n[0]}:${n[1]}`
          })(),
          img: `/static/img/${res.data.results[0].hourly[i].code}.png`,
          tem: this.unit ? `${Math.round(res.data.results[0].hourly[i].temperature * 1.8 + 32)}°` : `${res.data.results[0].hourly[i].temperature}°`
        }
        this.items.push(obj)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
}
</script>
<style scoped>
  .home-hourly {
    border-top: 2px solid #FFF;
    border-bottom: 2px solid #FFF;
  }
  .home-hourly ul {
    display: flex;
    justify-content: space-between;
    padding: 30px 0px;
    width: 100%;
    overflow: scroll;
  }
  .home-hourly ul li {
    margin: 0 10px;
    color: #FFF;
    text-align: center;
  }
</style>
