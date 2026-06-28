<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = computed(() => route.meta.title || 'Trava H5')
</script>

<template>
  <van-config-provider>
    <div class="app-shell">
      <van-nav-bar :title="title" fixed placeholder />
      <router-view />
      <van-tabbar route safe-area-inset-bottom>
        <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/chat" icon="chat-o">对话</van-tabbar-item>
        <van-tabbar-item replace to="/profile" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </van-config-provider>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
}
</style>
