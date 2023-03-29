import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', '!*.md', '!*.test.ts'],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
});
