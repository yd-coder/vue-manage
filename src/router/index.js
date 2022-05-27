import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home')
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('../views/mall')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('../views/other/pageOne')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../views/other/pageTwo')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
