<script setup lang="ts">
// Chat view: placeholder metadata card until the real conversation experience lands.
import BaseCard from '../components/BaseCard.vue'

const pageInfo = [
  {
    label: '页面名称',
    value: 'Chat',
  },
  {
    label: '路由路径',
    value: '/chat',
  },
] as const
</script>

<template>
  <div class="page">
    <main class="page__content">
      <BaseCard title="页面信息">
        <ElDescriptions :column="1" class="card-descriptions">
          <ElDescriptionsItem
            v-for="item in pageInfo"
            :key="item.label"
            :label="item.label"
          >
            {{ item.value }}
          </ElDescriptionsItem>
        </ElDescriptions>
      </BaseCard>
    </main>
  </div>
</template>
