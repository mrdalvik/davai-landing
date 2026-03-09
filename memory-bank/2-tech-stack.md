# Tech Stack: Davai Landing Page

## Overview
Статический лендинг для open-source фреймворка Davai, размещаемый на GitHub Pages. Стек построен на принципе «максимум результата при минимуме зависимостей»: ванильный HTML/CSS/JS без фреймворков и сборщиков. Для страницы такого масштаба (одностраничник, ~7 секций) это оптимальный выбор — быстрая разработка, нулевая конфигурация, мгновенный деплой.

## Stack Components

### Разметка — HTML5
- **Technology:** Семантический HTML5
- **Why:** Одностраничник с несколькими секциями. Семантические теги (`<header>`, `<section>`, `<main>`, `<footer>`) обеспечивают доступность и SEO. Атрибут `lang` на `<html>` меняется динамически при переключении языка. Атрибуты `data-i18n` на элементах для привязки переводов.
- **AI-friendliness:** high

### Стилизация — Vanilla CSS с Custom Properties
- **Technology:** CSS3 с CSS Custom Properties (переменные), CSS Grid, Flexbox
- **Why:** Для одностраничника CSS-фреймворк избыточен. Custom Properties дают тёмную/светлую тему через смену набора переменных. Grid и Flexbox — всё, что нужно для адаптивной вёрстки. Анимации (`@keyframes`, `transition`) — встроенные в CSS, без библиотек.
- **AI-friendliness:** high

### Логика — Vanilla JavaScript (ES6+)
- **Technology:** JavaScript ES6+ (модули через `<script type="module">`)
- **Why:** Три основные задачи: i18n (загрузка/переключение переводов), анимация демо (typewriter-эффект, переключение фаз), интерактивность (копирование в буфер, scroll-анимации). ES-модули позволяют разделить код на логические файлы (`i18n.js`, `demo.js`, `theme.js`) без сборщика.
- **AI-friendliness:** high

### i18n — JSON-файлы + кастомный загрузчик
- **Technology:** JSON-файлы (`/locales/en.json`, `/locales/ru.json`, ...) + модуль `i18n.js` (~50 строк)
- **Why:** Библиотеки i18n (i18next и т.п.) избыточны для статической страницы без интерполяции и плюрализации. Простой подход: `fetch()` загружает JSON, функция `t(key)` подставляет строки в DOM через `data-i18n` атрибуты. Детект языка: `navigator.language`, fallback на `en`. Переключатель сохраняет выбор в `localStorage`.
- **AI-friendliness:** high

### Анимация демо — CSS + JavaScript
- **Technology:** CSS `@keyframes` / `transition` + JS для оркестрации
- **Why:** Стилизованный терминал — это div с моноширинным шрифтом, цветными span-ами и typewriter-эффектом (посимвольный вывод через `setTimeout`). Навигация по фазам — переключение контента по массиву сценариев. Эффект печати — 20 строк JS, подсветка — CSS-классы.
- **AI-friendliness:** high

### Шрифты — системные + моноширинный для демо
- **Technology:** Системный стек шрифтов + JetBrains Mono (Google Fonts)
- **Why:** Системные шрифты — нулевая задержка загрузки для основного текста. JetBrains Mono — для реалистичного вида терминала/VSCode в секции демо. Один HTTP-запрос, кэшируется.
- **AI-friendliness:** high

### Хостинг и деплой — GitHub Pages + GitHub Actions
- **Technology:** GitHub Pages (статический хостинг), GitHub Actions (CI/CD)
- **Why:** Бесплатный хостинг прямо из репозитория. GitHub Actions — опциональный пайплайн: минификация HTML/CSS/JS, валидация JSON переводов, деплой.
- **AI-friendliness:** high

## Component Interactions
```
HTML (структура)
 ├── CSS Custom Properties (тема, цвета)
 ├── i18n.js ──fetch()──→ /locales/*.json (переводы)
 ├── demo.js (анимация терминала, навигация по фазам)
 ├── theme.js (тёмная/светлая тема, localStorage)
 └── main.js (scroll-анимации, копирование в буфер)

GitHub Actions → минификация → GitHub Pages
```

## Dependencies
```
Внешних npm-зависимостей: 0

Загружаемые ресурсы (CDN):
- Google Fonts: JetBrains Mono (моноширинный шрифт для демо)

Опциональные dev-зависимости (для CI/CD):
- html-minifier-terser (минификация HTML)
- clean-css-cli (минификация CSS)
- terser (минификация JS)
```

## Development Workflow
- **Run:** `npx serve .` (zero-config HTTP-сервер для тестирования i18n fetch) или открыть `index.html` в браузере
- **Test:** Ручное тестирование: все 7 языков, переключение тем, анимация демо, адаптивность (DevTools), копирование git clone
- **Build:** Не требуется для разработки. Опционально: минификация в CI
- **Deploy:** `git push` → GitHub Actions → GitHub Pages

## Alternatives Considered
| Компонент | Альтернатива | Почему отклонена |
|-----------|------------|-----------------|
| Стилизация | Tailwind CSS | Требует сборщик или CDN на 300KB. Overkill для одностраничника |
| Стилизация | Sass/SCSS | Требует компиляцию. CSS Custom Properties и нативный nesting покрывают потребности |
| Фреймворк | Astro | Избыточен для одной страницы. Добавляет Node.js, конфиг, build step |
| Фреймворк | Next.js / Nuxt | Абсолютный overkill для статического лендинга |
| i18n | i18next | 40KB+ для задачи, решаемой 50 строками кода |
| Анимации | GSAP / Anime.js | Дополнительная зависимость без необходимости |
| Сборщик | Vite | ES-модули работают нативно. Минификацию можно сделать в CI |
