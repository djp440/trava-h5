import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: '智能旅游助手' },
      component: HomeView,
    },
    {
      path: '/chat',
      name: 'chat',
      meta: { title: '对话' },
      component: ChatView,
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { title: '我的' },
      component: ProfileView,
    },
  ],
})

export default router
