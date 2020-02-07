import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/discount',
    name: 'discount',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Discount.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/Province/index.vue'),
    children: [{
      path: '',
      component: () => import('../views/Province/Table.vue')
    },
    {
      path: 'detail',
      name: 'detail',
      component: () => import('../views/Province/ProvinceDetail.vue')
    }
  ],
  },
  {
    path: '/world',
    name: 'world',
    component: () => import('../views/World.vue')
  },
  {
    path: '/dynamic',
    name: 'dynamic',
    component: () => import('../views/EpidemicDynamic/index.vue'),
    children: [{
      path: '',
      component: () => import('../views/EpidemicDynamic/Detail.vue')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
