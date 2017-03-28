<template>
  <div class="search-city">
    <i-input v-model="value" placeholder="搜索城市（中文 / 拼音）" style="width: 300px;" class="search-input" @on-change="debounce" @on-enter="getCity"></i-input>
    <Spin size="large" class="search-loading" v-show="loading"></Spin>
    <ul class="search-results-list" @click="setLocation">
      <li v-for="path in searchResults">
        <router-link to="/manageCity">{{ path.path }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'searchCity',
    timer: null,
    data () {
      return {
        value: this.$store.state.searchValue,
        isLoadDone: false,
        loading: false,
        searchResults: []
      }
    },
    methods: {
      getCity () {
        if (this.value !== '') {
          this.searchResults = []
          this.loading = true
          this.$store.commit('changeValue', this.value)
          this.$http.get(`${this.$store.state.locationUrl}q=${this.value}&limit=10`)
          .then(response => {
            if (response.data.results.length) {
              this.searchResults = response.data.results
            } else {
              this.searchResults = [{path: '无法找到对应城市！'}]
            }
            this.isLoadDone = true
            this.loading = false
          })
          .catch(error => {
            console.log(error)
            this.searchResults = [{path: '网络好像有点问题！'}]
            this.isLoadDone = true
            this.loading = false
          })
        } else {
          this.isLoadDone = false
          this.loading = false
          this.$store.commit('changeValue', this.value)
          this.searchResults = []
        }
      },
      debounce () {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(this.getCity, 1000)
      },
      setLocation (e) {
        if (e.target.nodeName.toLowerCase() === 'a') this.$store.dispatch('addCity', e.target.innerHTML.split(',')[0])
      }
    }
  }
</script>

<style>
  .search-city {
    text-align: center;
  }
  .search-input {
    margin: 5px auto;
  }
  .search-loading {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .search-loading span {
    display: inline-block;
  }
  .search-results-list li a{
    display: inline-block;
    line-height: 35px;
    background: #FFF;
    width: 100%;
    border-bottom: 1px solid #eee;
    color: #657180;
  }
</style>
