# AGENTS.md

## Overview

Plain JS browser extension (Manifest V3) for traversymedia.com. No npm, no bundler, no build step.

## Commands

- `pnpx biome check .` — lint all
- `pnpx biome check --write .` — lint + format fix
- `pnpx biome format --write .` — format only
- Type checking is editor-only via `jsconfig.json` (`checkJs: true` + JSDoc); no CLI runner
- Distribute: zip source into `chrome-extension.zip` / `firefox-extension.zip` (exclude `.git*`, the zips, `.DS_Store`)

## Code style

From `biome.json` + `jsconfig.json`:
- 2-space indent, LF, 80-width
- Single quotes, trailing commas, semicolons as needed
- JSDoc type annotations required (`@type`, `@param`, `@returns`) — enforced by `checkJs: true`
- `moduleResolution: "classic"` in jsconfig (unusual — not `node` or `bundler`)

## Architecture

- `manifest.json` — MV3 content script on `*://*.traversymedia.com/products/*`; includes `browser_specific_settings.gecko` for Firefox compatibility
- `index.js` — content script: maximize video + scroll active lesson into view
- `videoSettings.js` — content script that injects `wistia-injector.js` into page context
- `wistia-injector.js` — runs in page context for `window._wq` (Wistia API) + `localStorage` (key `tm-speed`)
- `style.css` — orphaned (unreferenced by manifest or JS)

## Gotchas

- Smooth scrolling disabled (janky on Chromium) — uses `scrollIntoView({ block: 'center' })` without `behavior: 'smooth'`
- Video speed persisted via `localStorage.tm-speed` in `wistia-injector.js`
- Content script runs only on `/products/*` paths
- Firefox gecko ID: `{f2a96490-4e5a-4ab4-8652-3691a798b69a}`, min FF 142

## Branches

`main` (primary), `biome` (Biome migration), `injectcss` (CSS injection), `chrome` (Chrome variant)

## No tests exist
