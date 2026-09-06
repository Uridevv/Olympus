# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the server with nodemon (auto-restart on change), entry point `src/index.js`.
- `npm test` — not configured (placeholder that exits with an error).
- MongoDB must be reachable at `MONGODB_URI`/`MONGO_URI` before starting the app (`docker-compose.yml` provides a local `mongo` container on port 27017, but note it has a YAML syntax error in the `ports` mapping — fix the missing space before `"27017:27017"` if you rely on it).

There is no lint/build step configured in `package.json`.

## Architecture

This is an Express + MongoDB (Mongoose) REST API ("Olimpus") for what looks like an e-commerce platform (products, categories, offers, shopping cart, wishlist, purchases, reviews, payments).

**Request flow**: `routes/*.routes.js` → optional `middlewares/validateSchema.js` (Zod schema) → optional `middlewares/authReuqired.js` (JWT cookie auth) → `controllers/*.controller.js` → `models/*.model.js` (Mongoose).

- **Entry points**: `src/index.js` is the local dev entry (connects to Mongo, then `app.listen`). `api/index.js` re-exports the Express `app` for Vercel's serverless function convention — there is no separate build for that path, it just imports `src/app.js` directly. The `@vendia/serverless-express` dependency in `package.json` is unused.
- **`src/app.js`** wires everything: CORS is locked to `FRONT_END_URL`, `morgan('dev')` logging, and all feature routers are mounted under `/api`. Note the **webhook route is mounted before `express.json()`** so Stripe's raw-body signature verification works (`routes/webhook.routes.js` uses `express.raw({ type: 'application/json' })`) — any new route needing the raw body must be registered before the `express.json()` call in `app.js`.
- **`src/config.js`** loads `.env` via `dotenv` and re-exports each var as a named constant (`PORT`, `MONGO_URI`, `TOKEN_SECRET`, `STRIPE_PRIVATE_KEY`, etc). Controllers/libs import from here rather than reading `process.env` directly. Note `TOKEN_SECRET` is hardcoded (`'some secret'`), not read from env — and the `.env` file defines `MONGODB_URI` while `config.js` reads `MONGO_URI`, so the env value is silently ignored and the hardcoded fallback in `config.js` is what's actually used locally.
- **Auth**: JWT stored in an httpOnly-inconsistent cookie named `token` (see differing cookie options across `auth.controller.js` — some logins set `sameSite/secure/httpOnly`, others don't). `middlewares/authReuqired.js` (filename typo, not "authRequired.js") verifies it and attaches `req.user`. There's also Auth0-based login (`loginWithAuth0`, `loginAdminAuth0`) that creates/looks up a local `User` by email instead of validating an Auth0 token server-side, and an OTP-based 2FA flow (`resend.controller.js` + `models/otp.model.js`) gated by `UserSettings.twoFactorAuth`.
- **Validation**: Zod schemas in `schemas/*.schema.js`, applied via `middlewares/validateSchema.js` which calls `schema.parse(req.body)` and maps Zod errors to a 400. Not all routes use it — many controllers do no input validation.
- **Uploads/images**: `src/cloudinary.js` configures the Cloudinary SDK (currently with hardcoded credentials rather than reading from `config.js`/`.env` — treat as sensitive, don't commit new secrets the same way). `productImages.controller.js` stores Cloudinary URLs/`public_id`s in the `ProductImage` model, separate from the `Product` model itself.
- **Payments**: `payment.controller.js` creates a Stripe Checkout session, stashing `userId` and a compact product list in `session.metadata` (Stripe metadata values must be strings, hence the `JSON.stringify`). `webhook.controller.js` handles `checkout.session.completed`: verifies the Stripe signature, then writes `Purchase` and `PendingReview` documents from the metadata. If you change what's sent in `metadata.products` in the checkout controller, update the parsing in the webhook controller too — they must stay in sync.
- **Models are un-normalized per-feature Mongoose schemas** (`category`, `new`, `offer`, `otp`, `pendingReview`, `product`, `productImages`, `purchase`, `review`, `shoppingCart`, `user`, `userSettings`, `wishList`) — no shared base schema/plugin. Each controller queries only its own model plus, occasionally, a directly-imported related model (e.g. `auth.controller.js` touches both `User` and `UserSettings`).
- **`src/scripts/seedAdmin.js`** is a standalone admin-seeding script but is currently broken/stale: it imports a non-existent `../models/User.js` (the real path is `models/user.model.js`), uses `bcryptjs` (not a listed dependency — `bcrypt` is), and reads `MONGO_URL` which `config.js` does not export. It's not wired into any npm script.

## Conventions observed in existing code

- Route files are named `<feature>.routes.js` (mostly plural feature name, e.g. `product.routes.js` for `/getProduct`, `/addProduct`, etc. — CRUD-style explicit route names like `addX`/`getX`/`updateX`/`deleteX` rather than REST verbs on a shared path).
- Controllers wrap the DB call in try/catch and return `res.status(...).json({ message })` on error; response shapes for success vary per controller (sometimes the raw document, sometimes a hand-picked subset of fields) — check the existing controller for a feature before assuming a consistent envelope.
- Comments in controllers are frequently Spanish; keep this in mind when reading/writing them for consistency with the surrounding file.
