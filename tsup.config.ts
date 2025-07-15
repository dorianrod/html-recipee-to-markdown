import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: {
      server: 'src/api/server.ts',
    },
    outDir: 'dist',
    format: ['esm'],
    dts: true,
    clean: true,
    splitting: false,
    sourcemap: true,
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  },
  {
    entry: {
      'page-scripts/scripts.inject': 'src/browser/page-scripts/index.ts',
    },
    outDir: 'dist',
    format: ['esm'],
    dts: false,
    clean: true,
    splitting: false,
    sourcemap: false,
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  },
])
