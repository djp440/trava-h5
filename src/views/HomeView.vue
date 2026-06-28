<template>
  <van-config-provider>
    <div class="page">
      <van-nav-bar title="Trava H5" />
      <main class="content">
        <van-space direction="vertical" fill size="16">
          <van-button type="primary" block>Vant 已接入</van-button>
          <van-cell-group inset>
            <van-cell title="UI 组件库" value="Vant 4" />
            <van-cell title="路由" value="vue-router 4.3.0" />
            <van-cell title="构建工具" value="Vite + Vue 3" />
          </van-cell-group>
        </van-space>
      </main>
    </div>
  </van-config-provider>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f7f8fa;
}

.content {
  padding: 16px;
}
</style>
