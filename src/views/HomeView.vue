<script setup lang="ts">
// Home view: trip planner form plus lightweight travel recommendation summaries.
import { reactive } from 'vue'
import type { AutocompleteFetchSuggestionsCallback } from 'element-plus'
import BaseCard from '../components/BaseCard.vue'

interface TripFormModel {
  destination: string
  budget: string
  days: number
}

interface DescriptionItem {
  label: string
  value: string
}

interface DestinationSuggestion {
  value: string
}

// Centralized page copy keeps future content edits in one place.
const copy = {
  alert: '智能旅游助手已上线，为你推荐更合适的旅行路线。',
  planner: '规划旅程',
  startPlanning: '开始规划',
  destination: '目的地',
  destinationPlaceholder: '请输入目的地',
  budget: '预算',
  budgetPlaceholder: '请输入预算',
  budgetUnit: '元',
  days: '天数',
  recommendation: '旅行推荐',
  recommendationHint: '根据你的时间和预算，快速锁定更合适的旅程方向。',
  service: '贴心服务',
  serviceHint: '行前提醒、行中协助、灵感补给都集中在这里。',
} as const

// Destination presets support quick suggestions while still allowing free input.
const destinationOptions: DestinationSuggestion[] = [
  { value: '北京' },
  { value: '上海' },
  { value: '杭州' },
  { value: '成都' },
  { value: '三亚' },
  { value: '厦门' },
]

// Static summary blocks shown next to the planner card on larger screens.
const recommendationItems: DescriptionItem[] = [
  {
    label: '行程推荐',
    value: '智能匹配',
  },
  {
    label: '目的地灵感',
    value: '随时探索',
  },
]

const serviceItems: DescriptionItem[] = [
  {
    label: '旅行助手',
    value: '在线待命',
  },
  {
    label: '出行提醒',
    value: '及时同步',
  },
]

// Local form state for the trip planning workflow.
const tripForm = reactive<TripFormModel>({
  destination: '',
  budget: '',
  days: 3,
})

function queryDestinationSuggestions(
  queryString: string,
  callback: AutocompleteFetchSuggestionsCallback<DestinationSuggestion>,
) {
  const normalizedQuery = queryString.trim().toLowerCase()
  const results = normalizedQuery
    ? destinationOptions.filter((option) =>
        option.value.toLowerCase().includes(normalizedQuery),
      )
    : destinationOptions

  callback(results)
}
</script>

<template>
  <div class="page">
    <main class="page__content">
      <section class="home-layout">
        <ElAlert
          :title="copy.alert"
          type="info"
          :closable="false"
          show-icon
          class="home-layout__alert"
        />

        <BaseCard :title="copy.planner" class="home-layout__planner">
          <ElForm class="home-form">
            <div class="home-form-row">
              <label class="home-form-row__label">{{ copy.destination }}</label>
              <ElAutocomplete
                v-model="tripForm.destination"
                :fetch-suggestions="queryDestinationSuggestions"
                :placeholder="copy.destinationPlaceholder"
                class="home-form__control home-form__control--text"
                clearable
              />
            </div>

            <div class="home-form-row">
              <label class="home-form-row__label">{{ copy.budget }}</label>
              <ElInput
                v-model="tripForm.budget"
                :placeholder="copy.budgetPlaceholder"
                class="home-form__control home-form__control--text"
              >
                <template #suffix>{{ copy.budgetUnit }}</template>
              </ElInput>
            </div>

            <div class="home-form-row">
              <label class="home-form-row__label">{{ copy.days }}</label>
              <ElInputNumber
                v-model="tripForm.days"
                :min="1"
                :max="30"
                :step="1"
                controls-position="right"
                class="home-form__control home-form__control--number"
              />
            </div>

            <div class="home-form__action">
              <ElButton type="primary" class="home-form__submit">
                {{ copy.startPlanning }}
              </ElButton>
            </div>
          </ElForm>
        </BaseCard>

        <div class="home-layout__side">
          <BaseCard :title="copy.recommendation">
            <p class="home-card__hint">{{ copy.recommendationHint }}</p>
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
            <p class="home-card__hint">{{ copy.serviceHint }}</p>
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
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.home-layout {
  display: grid;
  gap: 20px;
}

.home-layout__side {
  display: grid;
  gap: 20px;
}

.home-card__hint {
  margin: 0 0 16px;
  color: var(--trava-text);
  font-size: 0.95rem;
  line-height: 1.6;
}

.home-form {
  display: grid;
  gap: 14px;
}

.home-form-row {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  column-gap: 12px;
  align-items: center;
  min-height: 48px;
}

.home-form-row__label {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
  color: var(--trava-text);
  font-size: 1rem;
  line-height: 48px;
  text-align: left;
  white-space: nowrap;
}

.home-form__control {
  width: 100%;
}

.home-form__control--text :deep(.el-autocomplete),
.home-form__control--text :deep(.el-input) {
  width: 100%;
}

.home-form__control--text :deep(.el-input__wrapper),
.home-form__control--number :deep(.el-input__wrapper) {
  box-sizing: border-box;
  width: 100%;
  min-height: 48px;
  height: 48px;
}

.home-form__control--text :deep(.el-input__inner),
.home-form__control--number :deep(.el-input__inner) {
  height: 46px;
  line-height: 46px;
  text-align: left;
}

.home-form__control--number :deep(.el-input-number) {
  width: 100%;
  height: 48px;
}

.home-form__submit {
  width: 100%;
}

.home-form__action {
  margin-top: 2px;
}

@media (min-width: 992px) {
  .home-layout {
    align-items: start;
    grid-template-columns: minmax(420px, 1.1fr) minmax(320px, 0.9fr);
    grid-template-areas:
      'alert alert'
      'planner side';
  }

  .home-layout__alert {
    grid-area: alert;
  }

  .home-layout__planner {
    grid-area: planner;
    position: sticky;
    top: 128px;
  }

  .home-layout__side {
    grid-area: side;
  }
}

@media (min-width: 1400px) {
  .home-layout {
    grid-template-columns: minmax(460px, 1.15fr) minmax(420px, 1fr);
    gap: 24px;
  }

  .home-layout__side {
    gap: 24px;
  }
}
</style>
