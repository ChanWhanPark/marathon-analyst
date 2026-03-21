# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marathon race data analysis tool with a Next.js frontend and Express backend, both written in TypeScript.

## Structure

```
marathon-analyst/
├── frontend-next/   # Next.js 16 + React 19 + MUI + OpenLayers
└── backend/         # Express 5 + TypeScript
```

> `frontend/` (Vite 기반 구버전)은 IDE에서 파일이 열려 있어 삭제 대기 중. 새 프론트엔드는 `frontend-next/`.

## Commands

### Frontend (`frontend-next/`)

```bash
npm run dev        # Dev server (port 80, requires admin on Windows)
npm run build      # Next.js production build
npm run start      # Start production server (port 80)
npm run lint       # ESLint
npm run lint:fix   # ESLint auto-fix
npm run format     # Prettier
```

### Backend (`backend/`)

```bash
npm run dev        # Start with hot-reload via tsx watch (port 3000)
npm run build      # Compile TypeScript to dist/
npm run start      # Run compiled output
npm run lint       # ESLint
npm run lint:fix   # ESLint auto-fix
npm run format     # Prettier
```

## Architecture

### Frontend (Next.js App Router)

- Next.js 16 with App Router, no `src/` directory
- `app/layout.tsx` — root layout: wraps children in `ThemeRegistry` + `Navbar`
- `components/ThemeRegistry.tsx` — MUI emotion cache setup (`AppRouterCacheProvider` from `@mui/material-nextjs/v16-appRouter`), required for MUI SSR
- `components/Navbar.tsx` — `'use client'`, manages login dialog state internally, uses `usePathname` for active link highlighting
- `components/Map.tsx` — `'use client'`, OpenLayers map (서울 기본값). OpenLayers는 브라우저 API를 사용하므로 SSR 불가
- `app/course/page.tsx` — Map 컴포넌트를 `dynamic(..., { ssr: false })`로 import
- `data/homeData.tsx` — 홈페이지 정적 데이터 (stats, features, races, difficultyColor)

**Client component 기준:**
- hooks(`useState`, `useEffect`, `usePathname`) 또는 브라우저 API 사용 시 `'use client'` 필수
- MUI 컴포넌트만 사용하는 페이지는 서버 컴포넌트로 유지 가능 (ThemeRegistry가 처리)

**라우팅:**
| 경로 | 페이지 |
|------|--------|
| `/` | 홈 (Hero, Features, Races 섹션) |
| `/course` | 코스분석 (전체화면 지도) |
| `/analysis` | 대회분석 |
| `/about` | 서비스 소개 |

### Backend

- Entry: `src/index.ts`
- Express 5 with CORS enabled
- `tsx watch` for development hot-reload (no separate `ts-node` needed)
- Compiled output goes to `dist/` via `tsc`
- Module system: ESM (`"type": "module"`, `"module": "Node16"`)
- Default port: `3000` (override with `PORT` env var)
- Health check endpoint: `GET /health`
