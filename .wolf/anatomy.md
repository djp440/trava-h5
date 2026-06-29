# anatomy.md

> Auto-maintained by OpenWolf. Last scanned: 2026-06-29T11:59:11.166Z
> Files: 25 tracked | Anatomy hits: 0 | Misses: 0

## ./

- `.gitignore` — Git ignore rules (~68 tok)
- `AGENTS.md` (~60 tok)
- `CLAUDE.md` — OpenWolf (~57 tok)
- `components.d.ts` — @ts-nocheck (~371 tok)
- `env.d.ts` — Vite client typing shim for import.meta and env access. (~28 tok)
- `index.html` — trava-h5 (~106 tok)
- `lessons-doc.md` (~133 tok)
- `package.json` — Node.js package manifest (~170 tok)
- `README.md` — Project documentation (~72 tok)
- `tsconfig.app.json` — /*.ts", (~122 tok)
- `tsconfig.json` — TypeScript configuration (~34 tok)
- `tsconfig.node.json` (~61 tok)
- `vite.config.ts` — Vite build configuration (~132 tok)

## .claude/

- `settings.json` (~441 tok)

## .claude/rules/

- `openwolf.md` (~313 tok)

## src/

- `App.vue` — Vue: setup, TS (~707 tok)
- `main.ts` — App entry: mounts the root app, global styles, and router. (~62 tok)
- `style.css` — Styles: 27 rules, 19 vars, 1 media queries (~1574 tok)

## src/components/

- `BaseCard.vue` — Vue: setup, TS (~209 tok)

## src/config/

- `navigation.ts` — Navigation source of truth: labels, titles, paths, and icon ids stay aligned here. (~268 tok)

## src/router/

- `index.ts` — Router table: one top-level route per primary navigation destination. (~254 tok)

## src/types/

- `router.d.ts` — Route meta typing: every page should provide a title for shell navigation/header display. (~58 tok)

## src/views/

- `ChatView.vue` — Vue: setup, TS (~196 tok)
- `HomeView.vue` — Vue: setup (~3139 tok)
- `ProfileView.vue` — Vue: setup, TS (~196 tok)
