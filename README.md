<<<<<<< HEAD


## Containerização + CI (Entrega Intermediária)
- **Dockerfile** baseado em `mcr.microsoft.com/playwright:v1.46.0-jammy`
- **docker-compose.yml** para rodar testes E2E localmente
- **Playwright** configurado para carregar a extensão via `--disable-extensions-except` e `--load-extension`
- **scripts/build-extension.mjs**: gera `dist/` e `dist/extension.zip`
- **GitHub Actions**: `.github/workflows/ci.yml` com build, testes e artefatos (relatório HTML e zip)

### Rodar local (Compose)
```bash
docker compose build
docker compose run --rm e2e
```

### Rodar local (sem Docker)
```bash
npm ci
npx playwright install --with-deps chromium
npm run build
npm run test:e2e
```

### CI (GitHub Actions)
- Artefatos publicados: **playwright-report** e **dist/extension.zip**.


> Esta entrega inclui MV3 + Playwright + Docker/CI. Build: `npm run build`. Testes: `npm run test:e2e`.
=======
# bootcamp2-chrome-ext2
>>>>>>> 6ee2a555dfde6cfda578b23b39c18b6dba8e80be
