# Margin

A small personal reading room for sharing four Efficient AI artifacts. The original essays, diagrams, labs, exam checks, and reference caveats remain intact.

## Run locally

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173/margin/.

## Build

```sh
npm run build
npm run preview
```

Vite uses `/margin/` for GitHub Pages. Reader URLs use a hash route (`#/read/neural-network-pruning`) so copied links and refreshed pages work without server routing. Section links retain `?section=s4`.

## Content and publishing

`src/data/artifacts.json` defines the shelf metadata and reading order. `public/artifacts/` contains source HTML, alongside the hosted lecture PDFs in `public/`. `scripts/import-artifacts.py` imports the original source collection. The build adds a small Library navigation strip and mobile matrix fixes to `dist/artifacts/` only; original source files remain untouched. The in-app reader preserves all original scripts and loads the same source in a same-origin frame that grows to the full article height.

Bookmarks and the last opened note are stored in the current browser. Sharing copies the actual note or section URL; a keyboard-accessible dialog provides a manual-copy fallback. No accounts or server are required.

Design and product review records are in `docs/`. Fancy Components adaptations and their MIT license are documented in `THIRD_PARTY_NOTICES.md`.

## Agent release instructions

Before committing, pushing, or deploying, read [AGENTS.md](AGENTS.md) and follow the [release guide](docs/deployment.md). It covers focused staging, safe branch handling, and verification of the matching GitHub Pages deployment and live feature.
