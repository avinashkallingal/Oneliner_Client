import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip'
    ],
  },
  plugins: [react(),nodePolyfills()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:4000',  // Backend API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  define: {
    // Polyfill `global` to use `globalThis` as the global object
    global: 'globalThis',
  },
});





// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   optimizeDeps: {
//     include: [
//       '@emotion/react', 
//       '@emotion/styled', 
//       '@mui/material/Tooltip'
//     ],
//   },
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:4000',  // Backend API server
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


