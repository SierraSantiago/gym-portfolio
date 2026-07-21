import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 950,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          const normalizedId = id.replaceAll('\\', '/')

          if (normalizedId.includes('node_modules/three/examples/')) {
            return 'three-examples'
          }

          if (normalizedId.includes('node_modules/three/')) {
            return 'three-core'
          }

          if (normalizedId.includes('node_modules/@react-three/fiber/')) {
            return 'r3f-runtime'
          }

          if (
            normalizedId.includes('node_modules/react/') ||
            normalizedId.includes('node_modules/react-dom/')
          ) {
            return 'react-vendor'
          }

          return undefined
        },
      },
    },
  },
})
