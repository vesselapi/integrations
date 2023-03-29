import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', '!*.md'],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
});
