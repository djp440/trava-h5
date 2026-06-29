<script setup lang="ts">
import {
  ChatDotRound,
  UserFilled,
} from '@element-plus/icons-vue'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from 'vue'
import type { AutocompleteFetchSuggestionsCallback } from 'element-plus'
import { useRouter } from 'vue-router'
import BaseCard from '../components/BaseCard.vue'
import { navigationItems } from '../config/navigation'

interface TripFormModel {
  destination: string
  budget: string
  days: number
}

interface ShortcutEntry {
  label: string
  icon: typeof ChatDotRound
  path: string
  buttonType: 'primary' | 'default'
}

interface DestinationSuggestion {
  value: string
}

const NOTICE_GAP = 24
const NOTICE_MIN_DURATION = 8
const NOTICE_SCROLL_SPEED = 40

const copy = {
  alert: '智能旅游助手已上线，为你推荐合适的旅行路线。',
  planner: '规划旅程',
  startPlanning: '开始规划',
  destination: '目的地',
  destinationPlaceholder: '请输入目的地',
  budget: '预算',
  budgetPlaceholder: '请输入预算',
  budgetUnit: '元',
  days: '天数',
  shortcuts: '快捷入口',
  aiChat: 'AI 对话',
  profile: '我的',
  popularDestinations: '热门目的地',
} as const

const destinationOptions: DestinationSuggestion[] = [
  { value: '北京' },
  { value: '上海' },
  { value: '杭州' },
  { value: '成都' },
  { value: '三亚' },
  { value: '厦门' },
]

const shortcutEntries: ShortcutEntry[] = [
  {
    label: copy.aiChat,
    icon: ChatDotRound,
    path: navigationItems[1].path,
    buttonType: 'primary',
  },
  {
    label: copy.profile,
    icon: UserFilled,
    path: navigationItems[2].path,
    buttonType: 'default',
  },
]

const popularDestinations = [
  '北京',
  '上海',
  '广州',
  '深圳',
  '成都',
  '杭州',
  '西安',
  '重庆',
] as const

const tripForm = reactive<TripFormModel>({
  destination: '',
  budget: '',
  days: 3,
})

const router = useRouter()

const alertViewportRef = ref<HTMLElement | null>(null)
const alertTextRef = ref<HTMLElement | null>(null)
const isAlertOverflowing = ref(false)
const alertScrollDistance = ref(0)

let alertResizeObserver: ResizeObserver | null = null

const alertTrackStyle = computed(() => {
  if (!isAlertOverflowing.value || alertScrollDistance.value <= 0) {
    return {}
  }

  const duration = Math.max(
    alertScrollDistance.value / NOTICE_SCROLL_SPEED,
    NOTICE_MIN_DURATION,
  )

  return {
    '--notice-scroll-duration': `${duration}s`,
    '--notice-scroll-offset': `-${alertScrollDistance.value}px`,
  }
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

// 使用路由跳转保持快捷入口与全局导航行为一致。
function navigateToShortcut(path: string) {
  router.push(path)
}

// 点击热门目的地时同步回填到表单输入，减少重复输入。
function selectPopularDestination(destination: string) {
  tripForm.destination = destination
}

// 根据可视区域与文本实际宽度决定是否启用滚动动画。
function syncAlertOverflow() {
  nextTick(() => {
    const viewportElement = alertViewportRef.value
    const textElement = alertTextRef.value

    if (!viewportElement || !textElement) {
      isAlertOverflowing.value = false
      alertScrollDistance.value = 0
      return
    }

    const nextIsOverflowing = textElement.scrollWidth > viewportElement.clientWidth

    isAlertOverflowing.value = nextIsOverflowing
    alertScrollDistance.value = nextIsOverflowing
      ? textElement.scrollWidth + NOTICE_GAP
      : 0
  })
}

onMounted(() => {
  syncAlertOverflow()
  window.addEventListener('resize', syncAlertOverflow)

  if (typeof ResizeObserver === 'undefined') {
    return
  }

  alertResizeObserver = new ResizeObserver(() => {
    syncAlertOverflow()
  })

  if (alertViewportRef.value) {
    alertResizeObserver.observe(alertViewportRef.value)
  }

  if (alertTextRef.value) {
    alertResizeObserver.observe(alertTextRef.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncAlertOverflow)
  alertResizeObserver?.disconnect()
})
</script>

<template>
  <div class="page">
    <main class="page__content">
      <section class="home-layout">
        <ElAlert type="info" :closable="false" show-icon class="home-layout__alert">
          <template #title>
            <div ref="alertViewportRef" class="home-layout__alert-viewport">
              <div
                class="home-layout__alert-track"
                :class="{ 'is-overflowing': isAlertOverflowing }"
                :style="alertTrackStyle"
              >
                <span ref="alertTextRef" class="home-layout__alert-text">
                  {{ copy.alert }}
                </span>
                <template v-if="isAlertOverflowing">
                  <span class="home-layout__alert-gap" aria-hidden="true"></span>
                  <span class="home-layout__alert-text" aria-hidden="true">
                    {{ copy.alert }}
                  </span>
                </template>
              </div>
            </div>
          </template>
        </ElAlert>

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
          <BaseCard :title="copy.shortcuts">
            <ElRow :gutter="12" class="home-shortcuts">
              <ElCol
                v-for="entry in shortcutEntries"
                :key="entry.path"
                :span="12"
              >
                <ElButton
                  :type="entry.buttonType"
                  plain
                  class="home-shortcuts__button"
                  @click="navigateToShortcut(entry.path)"
                >
                  <ElIcon class="home-shortcuts__icon">
                    <component :is="entry.icon" />
                  </ElIcon>
                  <span class="home-shortcuts__label">{{ entry.label }}</span>
                </ElButton>
              </ElCol>
            </ElRow>
          </BaseCard>

          <BaseCard :title="copy.popularDestinations">
            <div class="home-destinations">
              <ElButton
                v-for="destination in popularDestinations"
                :key="destination"
                :type="tripForm.destination === destination ? 'primary' : 'default'"
                :plain="tripForm.destination !== destination"
                class="home-destinations__button"
                @click="selectPopularDestination(destination)"
              >
                {{ destination }}
              </ElButton>
            </div>
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

.home-layout__alert :deep(.el-alert) {
  min-height: 40px;
  padding: 8px 12px;
}

.home-layout__alert :deep(.el-alert__content) {
  min-width: 0;
}

.home-layout__alert-viewport {
  overflow: hidden;
  width: 100%;
}

.home-layout__alert-track {
  display: inline-flex;
  align-items: center;
  min-width: max-content;
  max-width: none;
  white-space: nowrap;
}

.home-layout__alert-track.is-overflowing {
  animation: home-alert-marquee var(--notice-scroll-duration) linear infinite;
  will-change: transform;
}

.home-layout__alert-text {
  display: inline-block;
  font-size: 0.9rem;
  line-height: 1.35;
}

.home-layout__alert-gap {
  flex: 0 0 24px;
  width: 24px;
}

.home-layout__side {
  display: grid;
  gap: 20px;
}

.home-shortcuts {
  margin: 0;
}

.home-shortcuts__button,
.home-destinations__button {
  width: 100%;
}

.home-shortcuts__button {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 128px;
  padding: 20px 12px;
}

.home-shortcuts__icon {
  font-size: 1.75rem;
}

.home-shortcuts__label {
  font-size: 1rem;
  line-height: 1.5;
}

.home-destinations {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.home-destinations__button {
  min-height: 48px;
  margin: 0;
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

.home-form :deep(.el-autocomplete),
.home-form :deep(.el-autocomplete .el-input),
.home-form :deep(.home-form__control--text.el-input) {
  width: 100%;
}

.home-form :deep(.el-autocomplete .el-input__wrapper),
.home-form__control--text :deep(.el-input__wrapper),
.home-form__control--number :deep(.el-input__wrapper) {
  box-sizing: border-box;
  width: 100%;
  min-height: 48px;
  height: 48px;
}

.home-form :deep(.el-autocomplete .el-input__inner),
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
  min-height: 48px;
  height: 48px;
}

.home-form__action {
  margin-top: 2px;
}

@keyframes home-alert-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(var(--notice-scroll-offset));
  }
}

@media (max-width: 767px) {
  .home-shortcuts__button {
    min-height: 112px;
  }

  .home-destinations {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-destinations__button {
    min-height: 44px;
  }
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
