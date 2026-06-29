// Navigation source of truth: labels, titles, paths, and icon ids stay aligned here.
const labels = {
  homeTitle: '智能旅游助手',
  homeLabel: '首页',
  chatTitle: '对话',
  profileTitle: '我的',
} as const

export type AppNavIconName = 'home-filled' | 'chat-dot-round' | 'user-filled'

export interface AppNavItem {
  name: 'home' | 'chat' | 'profile'
  path: string
  title: string
  label: string
  icon: AppNavIconName
}

// Order matters: router and both nav bars consume this array by index.
export const navigationItems: AppNavItem[] = [
  {
    name: 'home',
    path: '/',
    title: labels.homeTitle,
    label: labels.homeLabel,
    icon: 'home-filled',
  },
  {
    name: 'chat',
    path: '/chat',
    title: labels.chatTitle,
    label: labels.chatTitle,
    icon: 'chat-dot-round',
  },
  {
    name: 'profile',
    path: '/profile',
    title: labels.profileTitle,
    label: labels.profileTitle,
    icon: 'user-filled',
  },
]
