# haekalkh.github.io

Personal website of Muhammad Haekal Khowarizmi. React + Vite, deployed to GitHub Pages by GitHub Actions.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Edit content

All text lives in `src/data.js`. Styles are in `src/styles.css`.
The animated tissue figure is `src/components/TissueCanvas.jsx`.

## Deploy

Every push to `main` builds and publishes the site automatically
(`.github/workflows/deploy.yml`). In the repo settings, Pages → Source must be
set to **GitHub Actions**.
