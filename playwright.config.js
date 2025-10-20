import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

const distPath = path.join(process.cwd(), 'dist');

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: { headless: true },
  projects: [
    {
      name: 'chromium-with-extension',
      use: { ...devices['Desktop Chrome'] },
      launchOptions: {
        args: [
          `--disable-extensions-except=${distPath}`,
          `--load-extension=${distPath}`
        ]
      }
    }
  ]
});
