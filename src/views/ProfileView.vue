<script setup lang="ts">
// Profile view: placeholder metadata card until account and settings UI lands.
import BaseCard from '../components/BaseCard.vue'

const pageInfo = [
  {
    label: '页面名称',
    value: 'Profile',
  },
  {
    label: '路由路径',
    value: '/profile',
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
