<script setup lang="ts">
// Shared card container used across views for consistent header/body spacing.
interface Props {
  title?: string
}

defineProps<Props>()
</script>

<template>
  <ElCard class="base-card" shadow="never">
    <template v-if="title" #header>
      <div class="base-card__title">{{ title }}</div>
    </template>
    <slot />
  </ElCard>
</template>

<style scoped>
.base-card {
  border: 1px solid var(--trava-border);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.06);
}

.base-card :deep(.el-card__header) {
  padding: 20px 20px 0;
  border-bottom: 0;
}

.base-card :deep(.el-card__body) {
  padding: 20px;
}

.base-card__title {
  color: var(--trava-text-strong);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
}
</style>
