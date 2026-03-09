---
name: github-pages-deploy
description: "Настройка и деплой статического сайта на GitHub Pages через GitHub Actions. Используй при создании/изменении CI/CD пайплайна, настройке минификации, проблемах с деплоем или конфигурации кастомного домена."
---

# GitHub Pages Deploy

Сайт деплоится на GitHub Pages через GitHub Actions.

## Workflow-файл

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

## Опциональная минификация

Добавь шаг перед upload:
```yaml
- name: Minify
  run: |
    npx html-minifier-terser --collapse-whitespace -o index.html index.html
    npx clean-css-cli -o styles.min.css styles.css
    npx terser main.js -o main.min.js
```

## Проверки перед деплоем

- Все JSON в `locales/` валидны
- index.html существует в корне
- Относительные пути (не абсолютные) для ресурсов — чтобы работал subdirectory hosting
