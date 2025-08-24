import { build } from "esbuild";

export default {
  base: '/clayboan-anim/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html',
    },
  },
}