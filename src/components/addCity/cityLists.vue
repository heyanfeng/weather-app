<template>
  <div class="city-list">
    <p class="recommend"  v-show="isValueNull">推荐城市</p>
    <table class="city-lists-table" cellspacing="0" border="0" cellpadding="0" v-show="isValueNull" @click="getCity">
      <tr v-for="row in rows">
        <td v-for="col in row" v-if="col.id"><router-link to="/manageCity" :id="currentPosition">{{col.text}}</router-link></td>
        <td v-for="col in row" v-if="!col.id">
          <router-link to="/manageCity">{{ col.text }}</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showHeader: false,
        border: true,
        currentPosition: true,
        rows: [
          [
            {text: '当前位置', id: 'currentPosition'},
            {text: '北京'},
            {text: '上海'}
          ],
          [
            {text: '广州'},
            {text: '深圳'},
            {text: '天津'}
          ],
          [
            {text: '武汉'},
            {text: '沈阳'},
            {text: '重庆'}
          ],
          [
            {text: '杭州'},
            {text: '南京'},
            {text: '哈尔滨'}
          ],
          [
            {text: '长春'},
            {text: '呼和浩特'},
            {text: '石家庄'}
          ],
          [
            {text: '银川'},
            {text: '乌鲁木齐市'},
            {text: '拉萨'}
          ],
          [
            {text: '西宁'},
            {text: '西安'},
            {text: '兰州'}
          ],
          [
            {text: '太原'},
            {text: '昆明'},
            {text: '南宁'}
          ]
        ]
      }
    },
    computed: {
      isValueNull () {
        return this.$store.state.searchValue === ''
      }
    },
    methods: {
      getCity (e) {
        if (e.target.nodeName.toLowerCase() === 'a') {
          if (e.target.id) {
            this.$store.dispatch('addCity', this.$store.state.currentLocation)
          } else {
            this.$store.dispatch('addCity', e.target.innerHTML)
          }
        }
      }
    }
  }
</script>

<style>
  .recommend {
    color: #fff;
    line-height: 30px;
    padding-left: 20px;
    background-color: rgba(245, 245, 174, 0.5)
  }
  .city-lists-table {
    width: 100%;
  }
  .city-lists-table tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  .city-lists-table td {
    min-width: 0;
    width: 33.3%;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #e3e8ee;
    text-align: center;
    background: #fff;
    display: table-cell;
    border-right: 1px solid #e3e8ee;
  }
  .city-lists-table td a{
    color: inherit;
    height: 48px;
    display: inline-block;
    line-height: 48px;
    width: 100%;
  }
</style>
