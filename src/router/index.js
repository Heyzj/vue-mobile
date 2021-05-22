import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/layout/Home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/layout/Qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/layout/Video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/layout/My')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user-info')
  }
]

const router = new VueRouter({
  routes
})

export default router
