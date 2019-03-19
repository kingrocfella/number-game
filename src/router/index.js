import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import play from '@/components/playgame'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    },
    {
      path: '/play',
      component: play
    },
  ]
})
