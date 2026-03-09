# Davai Landing Page

## Context
@memory-bank/1-product-specification.md
@memory-bank/2-tech-stack.md
@memory-bank/3-required-ai-tools.md
@memory-bank/4-implementation-plan.md
@memory-bank/5-security-requirements.md
@memory-bank/6-progress.md

## Commands
- **Run:** `npx serve .` → http://localhost:3000
- **Test:** Playwright scripts via `python scripts/with_server.py`
- **Build:** Not required (static site). Optional minification in CI.
- **Deploy:** `git push` → GitHub Actions → GitHub Pages

## Conventions
- i18n: EN is source of truth. Add keys to all 7 locales. Use `data-i18n` attributes + `textContent` only (NEVER innerHTML)
- Themes: CSS Custom Properties via `data-theme` on `<html>`, switch via CSS classes (no inline styles)
- JS: ES6+ modules via `<script type="module">`, no bundler, no npm runtime deps
- Fonts: JetBrains Mono self-hosted in `/fonts/`

## Architecture
- Single-page static site: `index.html` + `css/` + `js/` + `locales/`
- JS modules: `main.js` (entry), `i18n.js`, `demo.js`, `theme.js`
- CSS files: `variables.css`, `base.css`, `layout.css`, `components.css`, `demo.css`

## What NOT to do
- Don't use innerHTML for i18n strings (XSS risk)
- Don't add npm runtime dependencies
- Don't use generic AI-style design (Inter, purple gradients, cookie-cutter layouts)
- Don't use Google Fonts CDN — self-host fonts for privacy/GDPR
- Don't skip CSP meta-tag
