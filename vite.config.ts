import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  // Hook to write CNAME during build
  buildEnd() {
    if (process.env.NODE_ENV === 'production') {
      writeFileSync(path.resolve(__dirname, 'dist/CNAME'), 'wvdi-ph.com');
    }
  },
});

