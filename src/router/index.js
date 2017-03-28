import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import addCity from '@/components/addCity/addCity'
import manageCity from '@/components/manage/manageCity'
import setUp from '@/components/setting/setUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/addCity',
      name: 'addCity',
      component: addCity
    },
    {
      path: '/manageCity',
      name: 'manageCity',
      component: manageCity
    },
    {
      path: '/setUp',
      name: 'setUp',
      component: setUp
    }
  ]
})
