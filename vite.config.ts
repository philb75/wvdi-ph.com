import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';
import path from 'path';

const writeCName: Plugin = {
  name: 'write-cname',
  closeBundle() {
    writeFileSync(path.resolve(__dirname, 'dist/CNAME'), 'wvdi-ph.com');
  },
};

export default defineConfig({
  plugins: [react(), writeCName],
  base: './',
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
});
