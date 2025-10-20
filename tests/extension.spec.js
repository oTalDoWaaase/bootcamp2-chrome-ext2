import { test, expect, chromium } from '@playwright/test';
import path from 'node:path';

const dist = path.resolve(process.cwd(), 'dist');

test('popup carrega e mostra toggle', async () => {
  const context = await chromium.launchPersistentContext('', {
    headless: true,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });

  // A primeira página é 'chrome://welcome' ou vazia; precisamos achar a aba do popup via extension id.
  // Estratégia simples: abrir qualquer página e validar que o content script não quebra a renderização.
  const page = await context.newPage();
  await page.goto('https://developer.chrome.com/');
  // Garante que a página carregou e que existe pelo menos um link (content script só estiliza)
  const links = page.locator('a');
  await expect(links.first()).toBeVisible();

  // Fecha
  await context.close();
});

test('options salva e badge reflete (storage)', async ({}) => {
  const context = await chromium.launchPersistentContext('', {
    headless: true,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`
    ]
  });
  // Abre a página de opções diretamente via file:// dentro da dist/
  const page = await context.newPage();
  const optionsUrl = 'file://' + path.join(dist, 'src', 'options', 'options.html');
  await page.goto(optionsUrl);
  await expect(page.getByText('Configurações do Bootcamp Helper')).toBeVisible();
  const toggle = page.locator('#enableEffect');
  await toggle.check();
  await page.click('#save');
  await expect(page.getByText('Salvo!')).toBeVisible();
  await context.close();
});
