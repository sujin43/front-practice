import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/MainPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Main
  },
  {
    path: '/array',
    name: 'practice-array',
    component: () => import('../views/ArrayMethod.vue')
  },
  {
    path: '/api',
    name: 'practice-api',
    component: () => import('../views/PublicApi.vue')
  },
  {
    path: '/menu',
    name: 'practice-menu',
    component: () => import('../views/ContextMenu.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
