import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo name haekalkh.github.io -> site lives at the root, so base is '/'.
// If you deploy from a repo with another name (e.g. "portfolio"),
// change base to '/portfolio/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
