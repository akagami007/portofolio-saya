<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio Architecture Rules (Context Engineering)

## 1. 3D Component Standards (Three.js / R3F)
- **Lazy Loading**: ALWAYS use `next/dynamic` with `{ ssr: false }` when importing heavy 3D components (like `Hero3D`, `ProjectCarousel3D`, `SocialLinks3D`) into Next.js pages to prevent blocking the initial HTML payload (improves FCP/LCP).
- **Zero Re-renders**: NEVER use `useState` for hover states if they trigger inside `useFrame` or top-level Canvas components. Use `useRef` to track hover states or mutate meshes directly (via `THREE.MathUtils.lerp`) to prevent triggering expensive React re-renders on every mouse move.
- **Frame-rate Independence**: ALWAYS use `delta` from `useFrame((state, delta) => {})` for time-based math (e.g., `rotation.y += speed * delta`) to ensure animations run at the exact same speed on 60Hz and 144Hz monitors.

## 2. Localization
- Modifications to `src/locales/id.ts` and `en.ts` MUST always be kept in sync. If you add a key to one dictionary, you must add it to the other.
