import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/bascula',
    name: 'bascula',
    component: () => import (/* webpackChunkName: "Home" */ '@/views/Bascula.vue')
  },

  {
    path: '/temperatura',
    name: 'sensor-temperatura',
    component: () => import (/* webpackChunkName: "Home" */ '@/views/Temperatura.vue')
  },

  {
    path: '/pulsometro',
    name: 'sensor-pulso',
    component: () => import (/* webpackChunkName: "Home" */ '@/views/Pulsometro.vue')
  },


  {
    path: '/:pathMatch(.*)*', // Catch-all route for undefined paths
    redirect: { name: 'bascula' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
