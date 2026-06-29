// Route meta typing: every page should provide a title for shell navigation/header display.
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

export {}
