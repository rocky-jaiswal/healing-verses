# Healing Verses

A Progressive Web App (PWA) for browsing curated Bible verses about healing, comfort, and restoration.

## Tech Stack

- **Vue 3** with TSX (no SFCs)
- **Vite 8**
- **TypeScript 6**
- **Pinia 3** — state management
- **Vue Router 5**
- **TailwindCSS 4**
- **Vitest 4** — unit testing
- **Firebase Hosting**

## Commands

```bash
# Development
npm run dev           # start dev server

# Build & Preview
npm run build         # production build
npm run preview       # preview production build locally

# Quality
npm run typecheck     # TypeScript type check
npm run test          # run tests in watch mode
npm run test:run      # run tests once

# Icons
npm run generate:icons  # regenerate PWA icons from public/icons/logo.png

# Deploy
npm run firebase:deploy  # build and deploy to Firebase
```

## Adding Verses

Edit `src/verses.json` — each verse needs `id`, `reference`, and `text`.
