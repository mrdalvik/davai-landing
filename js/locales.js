/**
 * Embedded translations — auto-generated, do not edit manually.
 * Regenerate by reading locales/*.json and rebuilding this file.
 */
var EMBEDDED_LOCALES = {
  "en": {
  "meta": {
    "title": "Davai — From Idea to Project"
  },
  "hero": {
    "badge": "For Claude Code & Cursor",
    "tagline": "From idea to project. Automatically.",
    "description": "The open-source framework that turns your idea into a development-ready project — through AI-powered dialogue. No planning expertise needed.",
    "cta": "See how it works"
  },
  "demo": {
    "label": "Live Demo",
    "title": "See it in action",
    "phase1": "Product",
    "phase2": "Stack",
    "phase3": "Tools",
    "phase4": "Architecture",
    "phase5": "Security",
    "phase6": "Build",
    "status": {
      "running": "Running pipeline...",
      "done": "Phase complete",
      "complete": "Project ready!"
    },
    "phases": [
      {
        "lines": [
          { "text": "> davai start", "type": "cmd", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 CEO: Tell me your idea — what problem are you solving?", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "You: URL shortener with click analytics for marketers", "type": "user", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 CEO: Who's the target user? Need custom aliases?", "type": "ai", "typed": true },
          { "text": "You: Marketing teams. Yes — custom aliases + click tracking", "type": "user", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 CEO: What's NOT in the MVP?", "type": "ai", "typed": true },
          { "text": "You: No team features, no public API for now", "type": "user", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Launching product-designer agent...", "type": "accent" },
          { "text": "\u2713 Product specification ready — 4 must-have features defined", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "\uD83E\uDD16 CEO: Analyzing requirements for optimal stack...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Launching tech-lead agent...", "type": "accent" },
          { "type": "blank" },
          { "text": "\uD83D\uDCCB Evaluating 3 stack options:", "type": "dim" },
          { "text": "  \u2192 Bun + Hono        speed: 9  DX: 9  ecosystem: 7", "type": "dim" },
          { "text": "  \u2192 Node + Express    speed: 6  DX: 7  ecosystem: 10", "type": "dim" },
          { "text": "  \u2192 Deno + Oak        speed: 8  DX: 7  ecosystem: 5", "type": "dim" },
          { "type": "blank" },
          { "text": "\u2713 Recommended: Bun + Hono + PostgreSQL + Redis", "type": "success" },
          { "text": "\u2713 Tech stack document ready", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "\uD83E\uDD16 CEO: Selecting AI tools for your project...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Launching ai-hr agent...", "type": "accent" },
          { "type": "blank" },
          { "text": "\uD83D\uDCE6 Scanning skills library...", "type": "dim" },
          { "text": "  \u2192 webapp-testing    \u2713 match (Playwright integration tests)", "type": "success" },
          { "text": "  \u2192 api-design        \u2713 match (REST API conventions)", "type": "success" },
          { "text": "  \u2192 db-migrations     \u2713 match (PostgreSQL schema management)", "type": "success" },
          { "type": "blank" },
          { "text": "\uD83D\uDD27 Creating custom skill: url-validation", "type": "accent" },
          { "type": "blank" },
          { "text": "\u2713 4 skills configured, 0 MCP servers needed", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "\uD83E\uDD16 CEO: Building implementation plan...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Launching architect agent...", "type": "accent" },
          { "type": "blank" },
          { "text": "\uD83D\uDCD0 Designing system architecture...", "type": "dim" },
          { "text": "  Task 1: Database schema — users, links, clicks", "type": "dim" },
          { "text": "  Task 2: Auth module — JWT + refresh tokens", "type": "dim" },
          { "text": "  Task 3: Link shortening API — POST /api/shorten", "type": "dim" },
          { "text": "  Task 4: Redirect handler — GET /:code (< 10ms)", "type": "dim" },
          { "text": "  Task 5: Analytics collector — async click tracking", "type": "dim" },
          { "text": "  ...5 more tasks", "type": "dim" },
          { "type": "blank" },
          { "text": "\u2713 10 tasks with definitions of done", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "\uD83E\uDD16 CEO: Running security analysis...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Launching security-specialist agent...", "type": "accent" },
          { "type": "blank" },
          { "text": "\uD83D\uDD0D Threat modeling...", "type": "dim" },
          { "text": "  \u26A0 Open redirect vulnerability — URL validation required", "type": "warning" },
          { "text": "  \u26A0 Rate limiting needed — prevent brute-force on short codes", "type": "warning" },
          { "text": "  \u26A0 SQL injection surface — parameterized queries enforced", "type": "warning" },
          { "text": "  \u26A0 Analytics data privacy — IP anonymization required", "type": "warning" },
          { "type": "blank" },
          { "text": "\u2713 4 threats identified, mitigations defined", "type": "success" },
          { "text": "\u2713 Security checklist integrated into implementation plan", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "> cd url-shortener", "type": "cmd", "typed": true },
          { "text": "> claude", "type": "cmd", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 Claude: I see a Davai project! Reading memory-bank...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\uD83D\uDCCB Product spec: URL shortener with analytics", "type": "dim" },
          { "text": "\uD83D\uDCCB Tech stack: Bun + Hono + PostgreSQL + Redis", "type": "dim" },
          { "text": "\uD83D\uDCCB Implementation plan: 10 tasks", "type": "dim" },
          { "type": "blank" },
          { "text": "You: Build the project according to the plan", "type": "user", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 Claude: Starting task 1 of 10 — database schema...", "type": "ai", "typed": true },
          { "text": "  \u2713 Created migrations/001_init.sql", "type": "success" },
          { "text": "  \u2713 Created src/db/schema.ts", "type": "success" },
          { "text": "  \u2713 Task 1 complete. Moving to task 2...", "type": "success" },
          { "type": "blank" },
          { "text": "\uD83C\uDF89 Your project is being built — task by task, file by file.", "type": "bold" }
        ]
      }
    ]
  },
  "artifacts": {
    "label": "Result",
    "title": "Development-ready project plan"
  },
  "features": {
    "label": "Why Davai",
    "title": "Fast planning, solid start",
    "speed": {
      "icon": "\uD83D\uDE80",
      "title": "Idea to Project in Minutes",
      "description": "5 phases: product spec, tech stack, tools, architecture, security. You answer questions — Davai does the rest."
    },
    "stack": {
      "icon": "\uD83E\uDDE9",
      "title": "Smart Stack Selection",
      "description": "AI tech lead compares options and picks the optimal stack. With clear reasoning for each decision."
    },
    "security": {
      "icon": "\uD83D\uDEE1\uFE0F",
      "title": "Security Built In",
      "description": "Automated threat modeling and security requirements. Surfaces threats before the first line of code — while they're easy to fix."
    }
  },
  "cta": {
    "title": "Start building",
    "description": "Just tell your AI agent:",
    "prompt_label": "You:",
    "prompt_text": "Install https://github.com/mrdalvik/davai.git and let\u2019s make a project",
    "or": "or clone manually:",
    "copy": "Copy",
    "copied": "Copied!"
  },
  "footer": {
    "built_by": "Built by",
    "source": "Source",
    "meta": "This landing page was built with Davai + Claude Code"
  }
},
  "ru": {
  "meta": {
    "title": "Davai — От идеи до проекта"
  },
  "hero": {
    "badge": "Для Claude Code и Cursor",
    "tagline": "От идеи до проекта. Автоматически.",
    "description": "Open-source фреймворк, который превращает идею в готовый к разработке проект — через диалог с AI. Не нужно разбираться в методологиях планирования.",
    "cta": "Смотреть демо"
  },
  "demo": {
    "label": "Демонстрация",
    "title": "Как это работает",
    "phase1": "Продукт",
    "phase2": "Стек",
    "phase3": "Инструменты",
    "phase4": "Архитектура",
    "phase5": "Безопасность",
    "phase6": "Сборка",
    "status": {
      "running": "Выполняется...",
      "done": "Фаза завершена",
      "complete": "Проект готов!"
    },
    "phases": [
      {
        "lines": [
          { "text": "> davai start", "type": "cmd", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 CEO: Расскажите вашу идею — какую проблему решаете?", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "Вы: Сокращатель ссылок с аналитикой кликов для маркетологов", "type": "user", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 CEO: Кто целевой пользователь? Нужны кастомные алиасы?", "type": "ai", "typed": true },
          { "text": "Вы: Маркетинговые команды. Да — кастомные алиасы + трекинг кликов", "type": "user", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 CEO: Что НЕ входит в MVP?", "type": "ai", "typed": true },
          { "text": "Вы: Без командных функций, без публичного API пока", "type": "user", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Запускаю агента product-designer...", "type": "accent" },
          { "text": "\u2713 Спецификация продукта готова — 4 must-have фичи определены", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "\uD83E\uDD16 CEO: Анализирую требования для оптимального стека...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Запускаю агента tech-lead...", "type": "accent" },
          { "type": "blank" },
          { "text": "\uD83D\uDCCB Оценка 3 вариантов стека:", "type": "dim" },
          { "text": "  \u2192 Bun + Hono        скорость: 9  DX: 9  экосистема: 7", "type": "dim" },
          { "text": "  \u2192 Node + Express    скорость: 6  DX: 7  экосистема: 10", "type": "dim" },
          { "text": "  \u2192 Deno + Oak        скорость: 8  DX: 7  экосистема: 5", "type": "dim" },
          { "type": "blank" },
          { "text": "\u2713 Рекомендация: Bun + Hono + PostgreSQL + Redis", "type": "success" },
          { "text": "\u2713 Документ по стеку технологий готов", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "\uD83E\uDD16 CEO: Подбираю AI-инструменты для проекта...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Запускаю агента ai-hr...", "type": "accent" },
          { "type": "blank" },
          { "text": "\uD83D\uDCE6 Сканирую библиотеку скиллов...", "type": "dim" },
          { "text": "  \u2192 webapp-testing    \u2713 подходит (интеграционные тесты Playwright)", "type": "success" },
          { "text": "  \u2192 api-design        \u2713 подходит (конвенции REST API)", "type": "success" },
          { "text": "  \u2192 db-migrations     \u2713 подходит (управление схемой PostgreSQL)", "type": "success" },
          { "type": "blank" },
          { "text": "\uD83D\uDD27 Создаю кастомный скилл: url-validation", "type": "accent" },
          { "type": "blank" },
          { "text": "\u2713 4 скилла настроены, 0 MCP-серверов нужно", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "\uD83E\uDD16 CEO: Строю план реализации...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Запускаю агента architect...", "type": "accent" },
          { "type": "blank" },
          { "text": "\uD83D\uDCD0 Проектирую архитектуру системы...", "type": "dim" },
          { "text": "  Задача 1: Схема БД — users, links, clicks", "type": "dim" },
          { "text": "  Задача 2: Модуль авторизации — JWT + refresh tokens", "type": "dim" },
          { "text": "  Задача 3: API сокращения — POST /api/shorten", "type": "dim" },
          { "text": "  Задача 4: Обработчик редиректа — GET /:code (< 10мс)", "type": "dim" },
          { "text": "  Задача 5: Сборщик аналитики — async трекинг кликов", "type": "dim" },
          { "text": "  ...ещё 5 задач", "type": "dim" },
          { "type": "blank" },
          { "text": "\u2713 10 задач с критериями готовности", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "\uD83E\uDD16 CEO: Запускаю анализ безопасности...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\u26A1 Запускаю агента security-specialist...", "type": "accent" },
          { "type": "blank" },
          { "text": "\uD83D\uDD0D Моделирование угроз...", "type": "dim" },
          { "text": "  \u26A0 Уязвимость open redirect — нужна валидация URL", "type": "warning" },
          { "text": "  \u26A0 Нужен rate limiting — защита от перебора коротких кодов", "type": "warning" },
          { "text": "  \u26A0 Поверхность SQL-инъекций — параметризованные запросы", "type": "warning" },
          { "text": "  \u26A0 Приватность аналитики — анонимизация IP обязательна", "type": "warning" },
          { "type": "blank" },
          { "text": "\u2713 4 угрозы найдены, меры защиты определены", "type": "success" },
          { "text": "\u2713 Чеклист безопасности интегрирован в план", "type": "success" }
        ]
      },
      {
        "lines": [
          { "text": "> cd url-shortener", "type": "cmd", "typed": true },
          { "text": "> claude", "type": "cmd", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 Claude: Вижу проект Davai! Читаю memory-bank...", "type": "ai", "typed": true },
          { "type": "blank" },
          { "text": "\uD83D\uDCCB Спецификация: сокращатель ссылок с аналитикой", "type": "dim" },
          { "text": "\uD83D\uDCCB Стек: Bun + Hono + PostgreSQL + Redis", "type": "dim" },
          { "text": "\uD83D\uDCCB План реализации: 10 задач", "type": "dim" },
          { "type": "blank" },
          { "text": "Вы: Собери проект по плану", "type": "user", "typed": true },
          { "type": "blank" },
          { "text": "\uD83E\uDD16 Claude: Начинаю задачу 1 из 10 — схема базы данных...", "type": "ai", "typed": true },
          { "text": "  \u2713 Создан migrations/001_init.sql", "type": "success" },
          { "text": "  \u2713 Создан src/db/schema.ts", "type": "success" },
          { "text": "  \u2713 Задача 1 выполнена. Перехожу к задаче 2...", "type": "success" },
          { "type": "blank" },
          { "text": "\uD83C\uDF89 Ваш проект собирается — задача за задачей, файл за файлом.", "type": "bold" }
        ]
      }
    ]
  },
  "artifacts": {
    "label": "Результат",
    "title": "Готовый план реализации проекта"
  },
  "features": {
    "label": "Почему Davai",
    "title": "Быстрое планирование, надёжный старт",
    "speed": {
      "icon": "\uD83D\uDE80",
      "title": "От идеи до проекта за минуты",
      "description": "5 фаз: спецификация, стек, инструменты, архитектура, безопасность. Вы отвечаете на вопросы — Davai делает остальное."
    },
    "stack": {
      "icon": "\uD83E\uDDE9",
      "title": "Умный подбор стека",
      "description": "AI-техлид сравнивает варианты и выбирает оптимальный стек. С обоснованием каждого решения."
    },
    "security": {
      "icon": "\uD83D\uDEE1\uFE0F",
      "title": "Безопасность из коробки",
      "description": "Автоматическое моделирование угроз и требования к безопасности. Выявляет угрозы до первой строки кода — пока их легко исправить."
    }
  },
  "cta": {
    "title": "Начать",
    "description": "Просто скажите своему AI-агенту:",
    "prompt_label": "Вы:",
    "prompt_text": "Установи https://github.com/mrdalvik/davai.git и давай сделаем проект",
    "or": "или клонируйте вручную:",
    "copy": "Копировать",
    "copied": "Скопировано!"
  },
  "footer": {
    "built_by": "Создал",
    "source": "Исходный код",
    "meta": "Этот лендинг сделан с помощью Davai и Claude Code"
  }
}
};
