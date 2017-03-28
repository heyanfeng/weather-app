import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    locationUrl: 'http://crossorigin.me/https://api.seniverse.com/v3/location/search.json?key=6wwwgxpcoys7plaf&',
    nowUrl: 'http://crossorigin.me/https://api.seniverse.com/v3/weather/now.json?key=6wwwgxpcoys7plaf&',
    dailyUrl: 'http://crossorigin.me/https://api.seniverse.com/v3/weather/daily.json?key=6wwwgxpcoys7plaf&',
    airUrl: 'http://crossorigin.me/https://api.seniverse.com/v3/air/now.json?key=6wwwgxpcoys7plaf&',
    hourlyUrl: 'http://crossorigin.me/https://api.seniverse.com/v3/weather/hourly.json?key=6wwwgxpcoys7plaf&',
    searchValue: '',
    currentLocation: '',
    userCity: [],
    isEdited: false,
    unit: '0'
  },
  mutations: {
    changeValue (state, inputValue) {
      state.searchValue = inputValue
    },
    getCurrentLocation (state, location) {
      state.currentLocation = location
    },
    getNowWeather (state, nowDate) {
      state.userCity[state.userCity.length - 1].t = `${nowDate.t}°`
      state.userCity[state.userCity.length - 1].w = nowDate.w
    },
    setCurrentLocation (state, index) {
      for (let i = 0; i < state.userCity.length; i++) {
        state.userCity[i].currentLocation = false
      }
      state.userCity[index].currentLocation = true
      localStorage.setItem('userCity', JSON.stringify(state.userCity))
    },
    getUserCity (state) {
      state.userCity = JSON.parse(localStorage.getItem('userCity')) || []
    },
    edit (state, toggle) {
      state.isEdited = toggle
    },
    delCity (state, index) {
      state.userCity.splice(index, 1)
    },
    sureModify (state) {
      localStorage.setItem('userCity', JSON.stringify(state.userCity))
    },
    cancelModify (state) {
      state.userCity = JSON.parse(localStorage.getItem('userCity')) || []
    },
    unit (state, checked) {
      state.unit = checked
    }
  },
  actions: {
    getPosition (context) {
      axios.get(`${context.state.nowUrl}location=ip&language=zh-Hans&unit=c`)
      .then(res => {
        context.commit('getCurrentLocation', res.data.results[0].location.name)
        context.dispatch('addCity', res.data.results[0].location.name)
      })
    },
    addCity ({state, commit}, newCity) {
      if (state.userCity[0]) {
        for (let i = 0; i < state.userCity.length; i++) {
          if (state.userCity[i].p === newCity) {
            return
          }
        }
        state.userCity.push({p: newCity, t: '', w: '', currentLocation: false})
        axios.get(`${state.nowUrl}&location=${state.userCity[state.userCity.length - 1].p}&language=zh-Hans&unit=c`)
        .then(res => {
          commit('getNowWeather', {
            t: state.unit === '1' ? Math.round(res.data.results[0].now.temperature * 1.8 + 32) : res.data.results[0].now.temperature,
            w: res.data.results[0].now.text
          })
          localStorage.setItem('userCity', JSON.stringify(state.userCity))
        }).catch(err => {
          console.log(err)
        })
      } else {
        state.userCity.push({p: newCity, t: '', w: '', currentLocation: true})
        axios.get(`${state.nowUrl}&location=${state.userCity[state.userCity.length - 1].p}&language=zh-Hans&unit=c`)
        .then(res => {
          commit('getNowWeather', {
            t: state.unit === '1' ? Math.round(res.data.results[0].now.temperature * 1.8 + 32) : res.data.results[0].now.temperature,
            w: res.data.results[0].now.text
          })
          localStorage.setItem('userCity', JSON.stringify(state.userCity))
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
})
store.dispatch('getPosition')
store.commit('getUserCity')
