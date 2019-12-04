import Vue from 'vue'
import Router from 'vue-router'
import Base from '../pages/Bridge/Bridge'
import Disease from '../pages/Disease/Disease'
import Login from '../pages/Login/Login'
import Curing from '../pages/Curing/Curing'
// import Patrol from '../pages/Patrol/Patrol'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/base',
      component: Base
    },
    {
      path: '/disease',
      component: Disease
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/curing',
      component: Curing
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
