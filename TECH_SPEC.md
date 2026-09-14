# Technical Specification: Stefan's Portfolio

## 1. System Architecture
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (with `@custom-variant` dark mode support)
- **3D Engine**: Three.js via `@react-three/fiber` and `@react-three/drei`
- **Database (Optional/Future)**: PostgreSQL (via Prisma ORM) for Contact Form

## 2. Core Modules

### 2.1 UI & 3D Components
All 3D components (`Hero3D`, `ProjectCarousel3D`, `SocialLinks3D`) MUST be lazy-loaded using `next/dynamic({ ssr: false })` in the parent pages to prevent blocking the initial HTML payload (LCP optimization).

**Animation Standards:**
- **No `useState` in Animation Loops**: Never trigger React re-renders for hover states that interact with `useFrame`. Use `useRef` for hover state tracking, or mutate `meshRef.current` properties directly.
- **Frame-rate Independence**: All mathematical interpolations (`lerp`, `damp`) inside `useFrame` MUST be scaled by the time `delta` (e.g., `1 - Math.exp(-lambda * delta)`) to ensure consistent speeds across 60Hz and 144Hz monitors.

### 2.2 Interactive Contact Form
- **State Machine**: The form acts as a step-by-step chat interface (Step 1 to 4).
- **Validation**: Uses Zod for real-time regex email validation.
- **Delivery**: Final payload is formatted into a URL-encoded string and dispatched directly to WhatsApp via `window.open`.
- **Database Fallback**: The `/api/contact` endpoint attempts to save the message to Prisma. If `DATABASE_URL` is missing (local dev), it gracefully skips saving without throwing a 500 error.

### 2.3 Internationalization (i18n)
- Managed via `LanguageContext`.
- Dictionaries are static objects in `src/locales/en.ts` and `src/locales/id.ts`.
- **Rule**: Keys across all dictionaries must strictly match.

## 3. Observability
- **Traffic Analytics**: Powered by `@vercel/analytics/react`.
- **Web Vitals**: Powered by `@vercel/speed-insights/next`.
- Both are injected at the root `layout.tsx` level and will automatically activate when deployed to Vercel production environments.
