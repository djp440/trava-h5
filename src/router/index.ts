// Router table: one top-level route per primary navigation destination.
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { navigationItems } from '../config/navigation'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: navigationItems[0].path,
      name: navigationItems[0].name,
      meta: { title: navigationItems[0].title },
      component: HomeView,
    },
    {
      path: navigationItems[1].path,
      name: navigationItems[1].name,
      meta: { title: navigationItems[1].title },
      component: () => import('../views/ChatView.vue'),
    },
    {
      path: navigationItems[2].path,
      name: navigationItems[2].name,
      meta: { title: navigationItems[2].title },
      component: () => import('../views/ProfileView.vue'),
    },
  ],
})

export default router
