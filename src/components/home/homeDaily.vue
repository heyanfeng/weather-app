<template>
  <div class="home-daily">
    <ul>
      <li v-for="item in items" class="home-daily-item">
        <span>{{item.date}}</span>
        <img :src="item.img">
        <span>{{item.high}} / {{item.low}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'homeDaily',
    data () {
      return {
        location: this.$store.state.currentLocation || 'ip',
        unit: parseInt(this.$store.state.unit),
        items: [{
          date: '',
          img: '',
          high: '',
          low: ''
        }]
      }
    },
    created () {
      this.$http.get(`${this.$store.state.dailyUrl}location=${this.location}&language=zh-Hans&unit=c&start=0&days=5`)
      .then(res => {
        let dateArr = res.data.results[0].daily[1].date.split('-')
        this.items[0].date = `${dateArr[1]}月${dateArr[2]}日明天`
        this.items[0].img = `/static/img/${res.data.results[0].daily[1].code_day}.png`
        this.items[0].high = this.unit ? `${Math.round(res.data.results[0].daily[1].high * 1.8 + 32)}°` : `${res.data.results[0].daily[1].high}°`
        this.items[0].low = this.unit ? `${Math.round(res.data.results[0].daily[1].low * 1.8 + 32)}°` : `${res.data.results[0].daily[1].low}°`
        for (let i = 2; i < 5; i++) {
          let obj = {
            date: (function () {
              let arr = ['天', '一', '二', '三', '四', '五', '六']
              let dateArr = res.data.results[0].daily[i].date.split('-')
              return `${dateArr[1]}月${dateArr[2]}日星期${arr[new Date(res.data.results[0].daily[i].date).getDay()]}`
            })(),
            img: `/static/img/${res.data.results[0].daily[i].code_day}.png`,
            high: this.unit ? `${Math.round(res.data.results[0].daily[i].high * 1.8 + 32)}°` : `${res.data.results[0].daily[i].high}°`,
            low: this.unit ? `${Math.round(res.data.results[0].daily[i].low * 1.8 + 32)}°` : `${res.data.results[0].daily[i].low}°`
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
<style>
  .home-daily ul li.home-daily-item {
    display: flex;
    justify-content: space-between;
    color: #FFF;
    line-height: 60px;
    border-bottom: 1px solid #FFF;
    font-size: 16px;
    padding: 0 10px;
  }
  .home-daily ul li.home-daily-item:nth-child(1) img {
    margin-left: 10px;
  }
</style>
