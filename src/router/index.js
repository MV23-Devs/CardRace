import Vue from 'vue'
import VueRouter from 'vue-router'

import Join from "../components/Join.vue"
import Collection from "../components/Collection.vue"
import Create from "../components/Create.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Join
  },
  {
    path: '/collection',
    name: "Collection",
    component: Collection,
  },
  {
    path: '/create',
    name: "Create",
    component: Create,
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
  {
    path: '/VideoPage',
    name: "VideoPage",
    component: () => import('../views/VideoPage.vue')
  },
  {
    path: '/test',
    name: "Test",
    component: () => import('../views/Test.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
