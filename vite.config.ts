import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'Public',
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: [
        '**/frames_backup/**',
        '**/scratch_analysis/**',
        '**/*.py',
        '**/*.cjs'
      ]
    }
  }
});
