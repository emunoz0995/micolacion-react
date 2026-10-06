import { defineConfig } from 'vitest/config';

export default defineConfig({
    esbuild: { jsx: 'automatic' },
    test: { include: ['src/**/*.test.{js,jsx}'], pool: 'forks', poolOptions: { forks: { singleFork: true } } },
});
