const labels = {
  homeTitle: '\u667A\u80FD\u65C5\u6E38\u52A9\u624B',
  homeLabel: '\u9996\u9875',
  chatTitle: '\u5BF9\u8BDD',
  profileTitle: '\u6211\u7684',
} as const

export type AppNavIconName = 'home-filled' | 'chat-dot-round' | 'user-filled'

export interface AppNavItem {
  name: 'home' | 'chat' | 'profile'
  path: string
  title: string
  label: string
  icon: AppNavIconName
}

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
