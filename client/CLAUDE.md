# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then production build
- `npm run lint` — run ESLint over the whole project
- `npm run preview` — preview the production build locally

There is no test suite configured in this project (no test runner, no `*.test.*`/`*.spec.*` files).

## Architecture

This is the **client** half of the Olympus e-commerce project (a separate backend, not in this repo, is expected at `VITE_BACKEND_URL`, default `http://localhost:3000`, mounted under `/api`). Stack: React 19 + TypeScript, Vite, React Router v7, Zustand, Tailwind v4, shadcn/ui (new-york style, Radix primitives), Auth0, react-three-fiber for a 3D product model, Recharts for admin stats, Zod + react-hook-form for forms.

### Path aliasing

`@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`). Imports throughout the codebase mix `.ts`/`.tsx`/`.js`/`.jsx` extensions somewhat inconsistently (e.g. `@/store/authStore.js` pointing at `authStore.ts`) — this works because of `allowImportingTsExtensions`/bundler resolution; don't "fix" the extensions as a drive-by change.

**Case-sensitivity gotcha**: the directory is `src/Types` (capital T) but it is routinely imported as `@/types/...` or `../types/...` (lowercase) throughout `src/api/*` and `src/store/*`. This only resolves on case-insensitive filesystems (Windows/default macOS). Be aware of this if anything ever needs to run on a case-sensitive filesystem (Linux CI, Docker linux images) — it will break there.

### Routing (`src/App.tsx`)

A single `createBrowserRouter` tree defines three route groups, each wrapped differently:
1. **Public routes** — wrapped in `<MainLayout>` (NavBar + Footer + Toaster + ScrollRestoration). Includes home, product listing/detail, login/register, and the multi-step 2FA/OTP verification pages (`/two-steps-factor/...`).
2. **User-protected routes** — wrapped in `<ProtectedRoute>` (checks `useAuth().isAuthenticated`, redirects to `/login-page` if not). Contains `/cart`, `/wishList`, `/success`, and the nested `/profile` section (dashboard, purchases, wishlist, notifications, settings, reviews, pending-reviews).
3. **Admin routes** — wrapped in `<ProtectedRouteAdmin>` (requires `isAuthenticated` AND `user.role === "admin" | "manager"`, else redirects to `/`). All nested under `/admin`, covering stock, sells, offers, news, orders, categories, and admin user management.

`App.tsx` also wraps everything in `Auth0Provider` → `ThemeProvider` → `CategoryProvider` → `FilterProvider` → `PurchaseProvider` → `ErrorBoundary`. On mount it calls `checkLogin()` (auth store) and `initializeCart()` (cart store) once.

### State management

Global state lives in Zustand stores under `src/store/` (`authStore.ts`, `cartStore.ts`, `productStore.ts`, `wishStore.ts`) — not React context, except for a few cross-cutting concerns kept in `src/context/` (`CategoryContext`, `FilterContext`, `PurchaseContext`) that are provider-based instead.

- **Auth** (`authStore.ts`): handles both direct email/password login and Auth0 social login, plus a two-step OTP flow — `login()` can return `{ status: "otp_required", tempToken }`, at which point the temp token is stored in a `token` cookie (via `js-cookie`) and the user is routed through `/two-steps-factor/...` pages until `verifyOtpLogin()` completes the login. `checkLogin()` re-validates the `token` cookie against the backend on app start.
- **Cart** (`cartStore.ts`): server-backed (not purely local) — every mutation (`addToCart`, `addQuantity`, `decreaseQuantity`, `deleteProductCart`) calls the backend API then re-fetches via `initializeCart()` rather than mutating local state optimistically. Cart requires an authenticated user (`useAuth.getState().user?._id`); with no user it's just an empty local cart.

### API layer (`src/api/`)

One file per backend resource (`auth.ts`, `product.ts`, `shoppingCart.ts`, `payment.ts`, `review.ts`, `offer.ts`, `new.ts` (news), `category.ts`, `userSettings.ts`, `wishList.ts`, `pendingReviews.ts`, `productImages.ts`, `2FV.ts`, `webhook.ts`, `purchases.ts`). All of them import the shared `axios.ts` instance, which is pre-configured with `baseURL: ${VITE_BACKEND_URL}/api` and `withCredentials: true` (cookie-based auth session with the backend). Stores call these API functions rather than calling axios directly.

### Component organization (`src/components/`)

- `ui/` — shadcn/ui primitives (generated, style "new-york", base color "neutral"); treat as vendored, prefer composing over editing unless a project-wide style change is needed.
- `main/` — site chrome: `NavBar`, `Footer`, nav lists, sidebar.
- `admin/` — the entire `/admin` surface, split into `playground/` (create/update product, stock, add user) and `others/` (categories, news, offers, orders, admin user management), plus `Statistics/` for Recharts-based sales charts.
- `profile/` — the nested `/profile` section (dashboard, wishlist, notifications, settings, purchase detail).
- `cart/`, `products/`, `wishlist/`, `Modals/` — self-explanatory feature groupings.

### Types (`src/Types/`)

One file per domain (`authType.ts`, `cartType.ts`, `productType.ts`, `purchaseType.ts`, `offerType.ts`, `newType.ts`, `categoryType.ts`, `review.ts`, `pendingReview.ts`, `userSettingsType.ts`, `wishList.ts`). Import these when typing API payloads/responses instead of redefining shapes inline.

### Environment variables

Required in `.env` (Vite-exposed, must be prefixed `VITE_`): `VITE_BACKEND_URL`, `VITE_AUTH0_CLIENT_ID`, `VITE_AUTH0_DOMAIN`. The Auth0 redirect URI is hardcoded to `${origin}/register-page` in `App.tsx`.
