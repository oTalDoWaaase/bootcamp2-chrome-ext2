# Playwright base com Chromium incluso
FROM mcr.microsoft.com/playwright:v1.46.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci --silent

# Garante navegadores (caso imagem mude no futuro)
RUN npx playwright install --with-deps chromium

COPY . .

# Build da extensão para dist/
RUN npm run build

CMD ["npm", "test"]