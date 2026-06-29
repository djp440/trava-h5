<script setup lang="ts">
import { reactive } from 'vue'
import BaseCard from '../components/BaseCard.vue'

interface TripFormModel {
  destination: string
  budget: string
  days: string
}

interface DescriptionItem {
  label: string
  value: string
}

const copy = {
  alert: '\u667A\u80FD\u65C5\u6E38\u52A9\u624B\u5DF2\u4E0A\u7EBF\uFF0C\u4E3A\u4F60\u63A8\u8350\u66F4\u5408\u9002\u7684\u65C5\u884C\u8DEF\u7EBF\u3002',
  ready: 'Element Plus \u5DF2\u63A5\u5165',
  planner: '\u89C4\u5212\u65C5\u7A0B',
  destination: '\u76EE\u7684\u5730',
  destinationPlaceholder: '\u8BF7\u8F93\u5165\u76EE\u7684\u5730',
  budget: '\u9884\u7B97',
  budgetPlaceholder: '\u8BF7\u8F93\u5165\u9884\u7B97',
  days: '\u5929\u6570',
  daysPlaceholder: '\u8BF7\u8F93\u5165\u5929\u6570',
  recommendation: '\u65C5\u884C\u63A8\u8350',
  service: '\u8D34\u5FC3\u670D\u52A1',
} as const

const recommendationItems: DescriptionItem[] = [
  {
    label: '\u884C\u7A0B\u63A8\u8350',
    value: '\u667A\u80FD\u5339\u914D',
  },
  {
    label: '\u76EE\u7684\u5730\u7075\u611F',
    value: '\u968F\u65F6\u63A2\u7D22',
  },
]

const serviceItems: DescriptionItem[] = [
  {
    label: '\u65C5\u884C\u52A9\u624B',
    value: '\u5728\u7EBF\u5F85\u547D',
  },
  {
    label: '\u51FA\u884C\u63D0\u9192',
    value: '\u53CA\u65F6\u540C\u6B65',
  },
]

const tripForm = reactive<TripFormModel>({
  destination: '',
  budget: '',
  days: '',
})
</script>

<template>
  <div class="page">
    <main class="page__content">
      <ElSpace direction="vertical" fill :size="20">
        <ElAlert
          :title="copy.alert"
          type="info"
          :closable="false"
          show-icon
        />
        <ElButton type="primary" class="page__primary-button">
          {{ copy.ready }}
        </ElButton>
        <BaseCard :title="copy.planner">
          <ElForm label-position="top" class="home-form">
            <ElFormItem :label="copy.destination">
              <ElInput
                v-model="tripForm.destination"
                :placeholder="copy.destinationPlaceholder"
              />
            </ElFormItem>
            <ElFormItem :label="copy.budget">
              <ElInput
                v-model="tripForm.budget"
                :placeholder="copy.budgetPlaceholder"
                type="number"
              />
            </ElFormItem>
            <ElFormItem :label="copy.days">
              <ElInput
                v-model="tripForm.days"
                :placeholder="copy.daysPlaceholder"
                type="number"
              />
            </ElFormItem>
          </ElForm>
        </BaseCard>
        <BaseCard :title="copy.recommendation">
          <ElDescriptions :column="1" class="card-descriptions">
            <ElDescriptionsItem
              v-for="item in recommendationItems"
              :key="item.label"
              :label="item.label"
            >
              {{ item.value }}
            </ElDescriptionsItem>
          </ElDescriptions>
        </BaseCard>
        <BaseCard :title="copy.service">
          <ElDescriptions :column="1" class="card-descriptions">
            <ElDescriptionsItem
              v-for="item in serviceItems"
              :key="item.label"
              :label="item.label"
            >
              {{ item.value }}
            </ElDescriptionsItem>
          </ElDescriptions>
        </BaseCard>
      </ElSpace>
    </main>
  </div>
</template>

<style scoped>
.page__primary-button {
  width: 100%;
}

.home-form :deep(.el-form-item:last-child) {
  margin-bottom: 0;
}
</style>
