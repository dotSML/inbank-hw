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
      path: '/decision',
      name: 'decision',
      meta: { title: 'InBank - Decision' },
      component: () => import('../views/DecisionView.vue'),
    },
  ],
})

export default router
