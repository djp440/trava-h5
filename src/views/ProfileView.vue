<script setup lang="ts">
import BaseCard from '../components/BaseCard.vue'

const pageInfo = [
  {
    label: '\u9875\u9762\u540D\u79F0',
    value: 'Profile',
  },
  {
    label: '\u8DEF\u7531\u8DEF\u5F84',
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
