# JoshPlatform

> **Status: Experimental platform scaffold (frontend only).**

A personal "life/work platform" started on Replit. The **React + Vite client** is present and
organised around a set of productivity areas; the backend referenced by the build scripts is
**not included in this repository yet**, so the app is currently a UI scaffold rather than a
running full-stack product.

## What it's intended to be

A single hub bringing together several personal-ops areas. The client defines routes for:

- **Platform dashboard** (`/platform`)
- **Tasks** (`/platform/tasks`)
- **Move ops** (`/platform/moveops`) — moving/relocation operations
- **Decisions** (`/platform/decisions`)
- **Opportunities** (`/platform/opportunities`)
- **Weekly reviews** (`/platform/reviews`)
- **Social** (`/social`)

## Honest current state

- ✅ Front end: React 18, Vite, Wouter routing, TanStack Query, shadcn/ui components.
- ⚠️ Back end: `package.json` scripts reference an Express server (`server/index.ts`),
  a build script (`script/build.ts`), and Drizzle ORM (`drizzle-kit push`) — **none of these
  files are in the repo**. So `dev`, `build`, `start`, and `db:push` will not run as-is.
- The package is still named `rest-express` (the Replit starter name).

## How to run (client only)

The client can be built/previewed on its own:

```bash
npm install
npm run build:client   # vite build
# or run vite directly against the client/ folder for a dev preview
```

Full `npm run dev` / `npm run build` require the missing server code to be restored first.

## Cleanup done in this pass

- Removed committed **Replit local state** (`.local/state/...`) and added it to `.gitignore`.
- Hardened `.gitignore` to exclude Replit state, `.env*`, caches, build outputs, logs, and
  dependencies.

## Sensible next steps

- Decide whether to restore the Express/Drizzle backend or convert this to a static
  client-only app.
- Rename the package from `rest-express` to `joshplatform`.
- Add `.env.example` if/when the backend and a database are reintroduced.
