<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ChatDotRound,
  HomeFilled,
  UserFilled,
} from '@element-plus/icons-vue'
import { navigationItems, type AppNavIconName } from './config/navigation'

const router = useRouter()
const route = useRoute()
const title = computed(() => route.meta.title || 'Trava H5')

const iconMap: Record<AppNavIconName, typeof HomeFilled> = {
  'home-filled': HomeFilled,
  'chat-dot-round': ChatDotRound,
  'user-filled': UserFilled,
}

function navigate(path: string) {
  if (route.path !== path) {
    router.push(path)
  }
}
</script>

<template>
  <ElConfigProvider size="large">
    <div class="app-shell">
      <header class="app-shell__mobile-header">
        <div class="app-shell__mobile-title">{{ title }}</div>
      </header>

      <header class="app-shell__desktop-header">
        <div class="app-shell__desktop-inner">
          <div class="app-shell__brand">
            <span class="app-shell__brand-mark">Trava</span>
            <span class="app-shell__brand-text">{{ title }}</span>
          </div>
          <ElMenu
            :default-active="route.path"
            class="app-shell__desktop-menu"
            mode="horizontal"
            router
          >
            <ElMenuItem
              v-for="item in navigationItems"
              :key="item.path"
              :index="item.path"
            >
              <ElIcon><component :is="iconMap[item.icon]" /></ElIcon>
              <span>{{ item.label }}</span>
            </ElMenuItem>
          </ElMenu>
        </div>
      </header>

      <main class="app-shell__main">
        <div class="app-shell__content">
          <RouterView />
        </div>
      </main>

      <nav class="app-shell__bottom-nav" aria-label="main-navigation">
        <!-- Element Plus has no mobile TabBar, so we keep a custom bottom nav for H5. -->
        <button
          v-for="item in navigationItems"
          :key="item.path"
          class="app-shell__bottom-item"
          :class="{ 'is-active': route.path === item.path }"
          type="button"
          @click="navigate(item.path)"
        >
          <ElIcon class="app-shell__bottom-icon">
            <component :is="iconMap[item.icon]" />
          </ElIcon>
          <span>{{ item.label }}</span>
        </button>
      </nav>
    </div>
  </ElConfigProvider>
</template>
