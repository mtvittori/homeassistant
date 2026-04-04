import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/index.js',
      name: 'FloorPlan3DCard',
      formats: ['es'],
      fileName: () => 'floorplan3d.js',
    },
    outDir: '.',
    emptyOutDir: false,
  },
});
