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

## 4. Engineering Standards (AI Context)

### 4.1 Code Quality & Simplification
- **Zero "any" Tolerance**: TypeScript `any` is strictly prohibited. Use explicit interfaces (e.g., `Project` interface) to enforce type safety across props and state.
- **Hook Ordering**: Never place Hooks (`useState`, `useRef`, `useFrame`) inside conditionals. Fast Refresh relies on stable hook ordering.

### 4.2 Frontend UI Engineering
- **Component Colocation**: Keep components single-responsibility. Extract large sections (like About, Hero, Contact) into isolated files inside `src/components/` to prevent bloated pages.
- **Glassmorphism & Theming**: Use Tailwind CSS `dark:` prefix consistently. Rely on CSS variables for seamless `next-themes` integration.

### 4.3 Performance Optimization
- **Render Opt-out**: Avoid React re-renders for purely visual changes. Use `useRef` for animations (Three.js) and `drei` utilities like `useCursor` to decouple visual states from the React lifecycle.
- **Image Optimization**: If `next/image` is used, always provide width/height or use layout="fill" to prevent layout shifts.

### 4.4 Source-Driven Development
- Always adhere strictly to official documentations: Next.js App Router docs, React Three Fiber hooks API, and Tailwind CSS v4 patterns. Avoid deprecated APIs (e.g., direct instantiation of `THREE.Clock` inside components).
