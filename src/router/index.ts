import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'InBank' },
      component: HomeView,
    },
    {
      path: '/positive-decision',
      name: 'positive-decision',
      meta: { title: 'InBank - Decision' },
      component: () => import('../views/PositiveDescisionView.vue'),
    },
    {
      path: '/negative-decision',
      name: 'negative-decision',
      meta: { title: 'InBank - Decision' },
      component: () => import('../views/NegativeDescisionView.vue'),
    },
  ],
})

export default router
