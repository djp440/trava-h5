<template>
  <van-config-provider>
    <div class="page">
      <van-nav-bar title="对话" />
      <main class="content">
        <van-cell-group inset>
          <van-cell title="页面名称" value="Chat" />
          <van-cell title="路由路径" value="/chat" />
        </van-cell-group>
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
