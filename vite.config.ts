/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
      outDir: 'dist',
      rollupTypes: true,
      entryRoot: 'src/components',
      include: ['src/components'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'donutui',
      formats: ['es', 'cjs'],
      fileName: (format) => `donut-ui.${format}.js`,
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
      ],
      output: [
        {
          format: 'es',
          entryFileNames: 'donutui.es.js',
          banner: '"use client";\n',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
        // CJS bundle (no banner needed)
        {
          format: 'cjs',
          entryFileNames: 'donutui.cjs.js',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      ],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/vitest.setup.ts',
    css: true,
    coverage: {
      include: ['src/components/**/*.{ts,tsx,js,jsx}'],
    },
  },
});
