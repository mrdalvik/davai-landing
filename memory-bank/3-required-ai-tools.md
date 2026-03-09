# Required AI Tools: Davai Landing Page

## Prerequisites (действия пользователя перед стартом)
- **GitHub-аккаунт** — для деплоя на GitHub Pages и хостинга репозитория
- **Python 3** — для скриптов тестирования (Playwright)
- **Node.js** (опционально) — для `npx serve .` при локальной разработке с i18n

## Library Skills (копировать из library/skills/)

| Skill | Директория | Зачем |
|-------|-----------|-------|
| **frontend-design** | `library/skills/frontend-design/` | Ключевой скилл проекта. Лендинг должен выглядеть профессионально и запоминающе — не как типичный AI-сгенерированный сайт. Скилл задаёт высокую планку дизайна: уникальная типографика, смелые цветовые решения, продуманные анимации, нестандартные компоновки. |
| **webapp-testing** | `library/skills/webapp-testing/` | Тестирование лендинга через Playwright: проверка i18n (все 7 языков), работа анимации демо, адаптивность на разных экранах, копирование git clone в буфер, переключение тем. |

## Custom Skills (создать новые)

### i18n-workflow/SKILL.md
```markdown
---
name: i18n-workflow
description: "Управление интернационализацией статического сайта с JSON-переводами. Используй этот скилл при добавлении новых строк, создании переводов на новые языки, проверке полноты переводов или изменении i18n-логики. Также используй при работе с data-i18n атрибутами в HTML."
---

# i18n Workflow

Проект использует кастомную i18n-систему без библиотек: JSON-файлы + модуль загрузки (~50 строк).

## Структура переводов

```
locales/
├── en.json   (основной — всегда полный)
├── ru.json
├── zh.json
├── es.json
├── fr.json
├── de.json
└── ja.json
```

Каждый JSON содержит плоскую или неглубоко вложенную структуру ключей:
```json
{
  "hero.title": "...",
  "hero.tagline": "...",
  "features.speed.title": "...",
  "demo.phase1.title": "...",
  "cta.clone_command": "git clone ..."
}
```

## Добавление новой строки

1. Добавь ключ в `locales/en.json` (английский — источник истины)
2. Добавь переводы во все остальные 6 файлов с тем же ключом
3. В HTML добавь атрибут `data-i18n="ключ"` на элемент
4. Проверь, что `i18n.js` корректно подставляет значение

## Добавление нового языка

1. Скопируй `locales/en.json` как шаблон
2. Переведи все значения
3. Добавь язык в массив поддерживаемых в `i18n.js`
4. Добавь опцию в языковой переключатель в HTML

## Проверка полноты

Все JSON-файлы должны содержать одинаковый набор ключей. При добавлении строки — проверяй наличие ключа во всех 7 файлах.

## Детект языка

Приоритет: localStorage → navigator.language → fallback "en".
Код берёт первые 2 символа navigator.language (например, "ru" из "ru-RU").
```

### demo-animation/SKILL.md
```markdown
---
name: demo-animation
description: "Работа с анимированной демонстрацией пайплайна Davai в стилизованном VSCode-терминале. Используй при изменении сценария демо, добавлении/редактировании фаз анимации, настройке typewriter-эффекта, навигации по фазам или стилизации терминала."
---

# Demo Animation

Секция демо — ключевой элемент лендинга. Это стилизованный VSCode/терминал, показывающий 5 фаз пайплайна Davai.

## Архитектура

- **HTML**: div с классом терминала, моноширинный шрифт (JetBrains Mono), цветные span-ы для подсветки
- **CSS**: стилизация окна терминала (заголовок с кнопками, тёмный фон, скруглённые углы), анимации `@keyframes`
- **JS** (`demo.js`): оркестрация анимации, typewriter-эффект, навигация по фазам

## Структура данных фаз

Массив из 5 объектов фаз:
```js
const phases = [
  {
    id: 1,
    titleKey: "demo.phase1.title",  // i18n-ключ
    lines: [
      { text: "CEO: Расскажите вашу идею...", type: "prompt", delay: 50 },
      { text: "User: Хочу сделать...", type: "user-input", delay: 30 },
      { text: "✓ Product spec ready", type: "success", delay: 0 }
    ],
    duration: 5000  // мс
  },
  // ... фазы 2-5
];
```

## Typewriter-эффект

Посимвольный вывод через `setTimeout` с настраиваемой задержкой (`delay` в мс на символ). Типы строк (`type`) определяют CSS-класс для цвета.

## Навигация по фазам

- Индикатор над демо показывает текущую фазу (1-5)
- Клик по индикатору фазы — переключает на неё (пропуск/перемотка)
- Автопереход на следующую фазу после завершения текущей
- Пауза при ручном переключении

## Изменение сценария

1. Отредактируй массив `phases` в `demo.js`
2. Строки переводов (`titleKey`) должны быть в `locales/*.json`
3. Тестируй каждую фазу отдельно — убедись, что тайминги комфортные
4. На мобильных — текст может быть сокращён, проверяй адаптивность
```

### github-pages-deploy/SKILL.md
```markdown
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
```

## MCP Servers

Для данного проекта MCP-серверы не требуются. Проект полностью статический, без API-интеграций и внешних сервисов.

## CLI Tools

| Инструмент | Назначение | Установка |
|-----------|-----------|-----------|
| `npx serve` | Локальный HTTP-сервер для тестирования (i18n fetch требует HTTP) | Входит в Node.js (`npx serve .`) |
| `python3` | Запуск Playwright-скриптов для тестирования | Предустановлен на macOS |

## Project Instructions Recommendations

- **Запуск**: `npx serve .` в корне проекта, открыть http://localhost:3000
- **Структура файлов**: `index.html` (разметка), `css/` (стили), `js/` (модули: i18n.js, demo.js, theme.js, main.js), `locales/` (7 JSON-файлов переводов)
- **i18n-конвенция**: английский (`en.json`) — источник истины. При добавлении строки — добавлять во все 7 файлов. Атрибут `data-i18n` в HTML для привязки
- **Дизайн**: следовать frontend-design скиллу — никакого generic AI-стиля
- **Деплой**: `git push` в main → GitHub Actions → GitHub Pages
- **Тестирование**: проверять все 7 языков, обе темы, мобильную и десктопную версию, анимацию демо с навигацией по фазам
