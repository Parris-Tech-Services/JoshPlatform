# 🧩 JoshPlatform — Mini App Platform / Experiment Runtime

A lightweight platform for **launching and documenting mini-apps**: one shell for small
prototypes, reusable UI patterns, and personal tools — instead of a new repo per idea. Each
"app" is a self-contained module carrying a **status badge** so it's clear what's finished, a
prototype, or just an idea.

## Two front doors

- **`showcase.html`** — a static landing page that explains the platform and lists demo apps
  with status badges (Reflection Tool, Mini Task Board, Prototype Notes). Open it directly.
- **React + Vite app** (`client/`) — the richer interactive runtime with platform routes
  (dashboard, tasks, reviews, decisions, opportunities, social).

## Demo apps

| App | Status | What it is |
|---|---|---|
| Reflection Tool | prototype | Short guided reflection → next step |
| Mini Task Board | prototype | The few tasks that matter today |
| Prototype Notes | idea | Scratch notes for experiments |

## Run

```bash
npm install
npm run build:client     # builds the Vite client to dist/  (verified: builds clean)
# static landing:
python -m http.server 8000   # then open /showcase.html
```

> The `dev`/`build` scripts reference an Express server (`server/index.ts`) that isn't in the
> repo yet, so use `build:client` for the front end. See STATUS.md.

## Hygiene

Replit local state (`.local/`) and build artifacts are removed from tracking and ignored via
`.gitignore` (`.local/`, `.env`, `node_modules`, `dist`, caches, logs).

## Status

See [STATUS.md](STATUS.md).
