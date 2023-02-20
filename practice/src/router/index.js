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
    path: '/test',
    name: 'test-recommend',
    component: () => import('../views/RecommendTest.vue')
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
