import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // dist/.vite/manifest.json maps each lazy page to its chunk; the
    // prerender step reads it to emit <link rel="modulepreload"> per page,
    // then deletes it so it is not deployed.
    manifest: true,
  },
})
