import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 40_000,

  use: {
    headless: true,
    viewport: { width: 1400, height: 900 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  // 🔥 1 projeto por arquivo de teste
  projects: [
    {
      name: 'certificados',
      testMatch: /certificados\.spec\.ts$/,
      workers: 1,
      use: devices['Desktop Chrome'],
    },
    {
      name: 'contato',
      testMatch: /contato\.spec\.ts$/,
      workers: 1,
      use: devices['Desktop Chrome'],
    },
    {
      name: 'experiencia',
      testMatch: /experiencia\.spec\.ts$/,
      workers: 1,
      use: devices['Desktop Chrome'],
    },
    {
      name: 'linkedin',
      testMatch: /linkedin\.spec\.ts$/,
      workers: 1,
      use: devices['Desktop Chrome'],
    },
    {
      name: 'portfolio',
      testMatch: /portfolio\.spec\.ts$/,
      workers: 1,
      use: devices['Desktop Chrome'],
    },
    {
      name: 'sobre-mim',
      testMatch: /sobre-mim\.spec\.ts$/,
      workers: 1,
      use: devices['Desktop Chrome'],
    },
  ],
});
