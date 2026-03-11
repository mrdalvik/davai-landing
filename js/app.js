/**
 * Davai Landing — single-file app (no ES modules, works on file://)
 */
(function () {
  'use strict';

  /* ================================================================
     THEME — always dark
     ================================================================ */
  function initTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  /* ================================================================
     I18N
     ================================================================ */
  var SUPPORTED_LANGS = ['en', 'ru'];
  var LANG_KEY = 'lang';
  var FALLBACK_LANG = 'en';
  var currentLang = FALLBACK_LANG;
  var translations = {};
  var langChangeCallbacks = [];

  function detectLanguage() {
    var stored = localStorage.getItem(LANG_KEY);
    if (stored && SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
    var bl = (navigator.language || '').slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.indexOf(bl) !== -1) return bl;
    return FALLBACK_LANG;
  }

  function loadTranslations(lang) {
    // Use embedded translations (works on file:// and HTTP)
    if (typeof EMBEDDED_LOCALES !== 'undefined' && EMBEDDED_LOCALES[lang]) {
      return Promise.resolve(EMBEDDED_LOCALES[lang]);
    }
    // Fallback: XHR (for cases where locales.js isn't loaded)
    return new Promise(function (resolve, reject) {
      var url = 'locales/' + lang + '.json';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function () {
        if (xhr.status === 0 || xhr.status === 200) {
          try { resolve(JSON.parse(xhr.responseText)); }
          catch (e) { reject(e); }
        } else {
          reject(new Error('Failed to load ' + lang + '.json'));
        }
      };
      xhr.onerror = function () { reject(new Error('Failed to load ' + lang + '.json')); };
      xhr.send();
    });
  }

  function t(key) {
    if (!key) return '';
    if (translations[key] !== undefined) return translations[key];
    var parts = key.split('.');
    var val = translations;
    for (var i = 0; i < parts.length; i++) {
      if (val == null || typeof val !== 'object') return '';
      val = val[parts[i]];
    }
    return (typeof val === 'string' || typeof val === 'number') ? String(val) : '';
  }

  function getDemoPhases() {
    return (translations.demo && translations.demo.phases) ? translations.demo.phases : [];
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n'));
      if (v) el.textContent = v;
    });
    // Rich text: supports \n\n (line breaks) and {word} (accent spans)
    document.querySelectorAll('[data-i18n-rich]').forEach(function (el) {
      var v = t(el.getAttribute('data-i18n-rich'));
      if (!v) return;
      el.textContent = '';
      var paragraphs = v.split('\n\n');
      paragraphs.forEach(function (para, i) {
        if (i > 0) {
          el.appendChild(document.createElement('br'));
          el.appendChild(document.createElement('br'));
        }
        // Parse {word} as accent spans
        var parts = para.split(/(\{[^}]+\})/);
        parts.forEach(function (part) {
          var m = part.match(/^\{(.+)\}$/);
          if (m) {
            var span = document.createElement('span');
            span.className = 'accent';
            span.textContent = m[1];
            el.appendChild(span);
          } else {
            el.appendChild(document.createTextNode(part));
          }
        });
      });
    });

    document.documentElement.setAttribute('lang', currentLang);
    var title = t('meta.title');
    if (title) document.title = title;

    // Render phases list from array
    var phasesList = document.getElementById('heroPhaseslist');
    var phases = translations.hero && translations.hero.phases_list;
    if (phasesList && Array.isArray(phases)) {
      phasesList.textContent = '';
      phases.forEach(function (text) {
        var li = document.createElement('li');
        li.textContent = text;
        phasesList.appendChild(li);
      });
    }

    // Render artifact previews from locale data
    renderPreviews();
  }

  function renderPreviews() {
    var previews = translations.artifacts && translations.artifacts.previews;
    if (!previews || !Array.isArray(previews)) return;

    previews.forEach(function (lines, idx) {
      var container = document.getElementById('preview-' + (idx + 1));
      if (!container || !Array.isArray(lines)) return;

      var pre = document.createElement('pre');
      var code = document.createElement('code');

      lines.forEach(function (line, lineIdx) {
        if (lineIdx > 0) code.appendChild(document.createTextNode('\n'));
        if (!Array.isArray(line) || line.length === 0) return;

        line.forEach(function (seg) {
          if (!Array.isArray(seg)) return;
          var text = seg[0] || '';
          var style = seg[1];
          if (style) {
            var span = document.createElement('span');
            span.className = 'md-' + style;
            span.textContent = text;
            code.appendChild(span);
          } else {
            code.appendChild(document.createTextNode(text));
          }
        });
      });

      container.textContent = '';
      pre.appendChild(code);
      container.appendChild(pre);
    });
  }

  function setLanguage(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return Promise.resolve();
    return loadTranslations(lang).then(function (data) {
      translations = data;
      currentLang = lang;
      localStorage.setItem(LANG_KEY, lang);
      applyTranslations();
      langChangeCallbacks.forEach(function (cb) { cb(lang); });
    }).catch(function (err) {
      console.error('i18n: failed to load ' + lang, err);
      if (lang !== FALLBACK_LANG) return setLanguage(FALLBACK_LANG);
    });
  }

  function onLanguageChange(cb) { langChangeCallbacks.push(cb); }

  function initSwitcher() {
    var toggle = document.getElementById('langToggle');
    var dropdown = document.getElementById('langDropdown');
    var display = document.getElementById('currentLang');
    if (!toggle || !dropdown) return;

    function updateDisplay() {
      if (display) display.textContent = currentLang.toUpperCase();
      dropdown.querySelectorAll('.lang-option').forEach(function (o) {
        o.classList.toggle('active', o.dataset.lang === currentLang);
      });
      toggle.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('open');
    }
    updateDisplay();

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dropdown.classList.contains('open');
      dropdown.classList.toggle('open', !open);
      toggle.setAttribute('aria-expanded', String(!open));
    });

    dropdown.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var lang = opt.dataset.lang;
        if (lang && lang !== currentLang) setLanguage(lang).then(updateDisplay);
        else updateDisplay();
      });
    });

    document.addEventListener('click', function () {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    onLanguageChange(function () { updateDisplay(); });
  }

  /* ================================================================
     DEMO ANIMATION
     ================================================================ */
  var demoCurrentPhase = 0;
  var demoAnimating = false;
  var demoAbort = null;
  var demoPaused = false;
  var demoStarted = false;
  var _resumeCallbacks = [];
  var CHAR_DELAY = 35;
  var LINE_PAUSE = 600;
  var PHASE_END_PAUSE = 4000;

  var terminalBody, phaseBtns, statusDot, statusText, phaseCounter;

  function createAbortable() {
    var a = { _a: false };
    Object.defineProperty(a, 'aborted', { get: function () { return a._a; } });
    a.abort = function () { a._a = true; };
    return a;
  }

  function waitWhilePaused() {
    if (!demoPaused) return Promise.resolve();
    return new Promise(function (resolve) { _resumeCallbacks.push(resolve); });
  }

  function sleep(ms, signal) {
    return new Promise(function (resolve, reject) {
      if (signal && signal.aborted) { reject(new Error('aborted')); return; }
      var remaining = ms;
      var startTime;
      var timerId = null;
      var pollId = null;
      var settled = false;

      function cleanup() {
        if (timerId) { clearTimeout(timerId); timerId = null; }
        if (pollId) { clearInterval(pollId); pollId = null; }
      }

      function finish() {
        if (settled) return;
        settled = true;
        cleanup();
        resolve();
      }

      function startTimer() {
        startTime = Date.now();
        timerId = setTimeout(finish, remaining);
      }

      // Poll checks for abort and pause state changes
      pollId = setInterval(function () {
        if (settled) { cleanup(); return; }
        if (signal && signal.aborted) {
          settled = true;
          cleanup();
          reject(new Error('aborted'));
          return;
        }
        // Detect pause: freeze the timer, save remaining time
        if (demoPaused && timerId) {
          clearTimeout(timerId);
          timerId = null;
          remaining -= (Date.now() - startTime);
          if (remaining <= 0) { finish(); return; }
          // Wait for resume then restart timer
          waitWhilePaused().then(function () {
            if (settled) return;
            if (signal && signal.aborted) { settled = true; cleanup(); reject(new Error('aborted')); return; }
            startTimer();
          });
        }
      }, 50);

      // If already paused, wait before starting
      if (demoPaused) {
        waitWhilePaused().then(function () {
          if (settled) return;
          if (signal && signal.aborted) { settled = true; cleanup(); reject(new Error('aborted')); return; }
          startTimer();
        });
      } else {
        startTimer();
      }
    });
  }

  function typeText(text, cssClass, signal) {
    var line = document.createElement('div');
    line.className = 'term-line typing';
    var span = document.createElement('span');
    span.className = cssClass;
    line.appendChild(span);
    var cursor = document.createElement('span');
    cursor.className = 'cursor-blink';
    line.appendChild(cursor);
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;

    var i = 0;
    function next() {
      if (signal && signal.aborted) { span.textContent = text; cursor.remove(); return Promise.resolve(); }
      if (i >= text.length) { cursor.remove(); return Promise.resolve(); }
      span.textContent = text.slice(0, ++i);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return sleep(CHAR_DELAY, signal).catch(function () {}).then(function () {
        if (signal && signal.aborted) { span.textContent = text; cursor.remove(); return; }
        return next();
      });
    }
    return next();
  }

  function showLine(text, cssClass) {
    var line = document.createElement('div');
    line.className = 'term-line';
    var span = document.createElement('span');
    span.className = cssClass;
    span.textContent = text;
    line.appendChild(span);
    terminalBody.appendChild(line);
    requestAnimationFrame(function () {
      line.classList.add('visible');
      terminalBody.scrollTop = terminalBody.scrollHeight;
    });
  }

  function showBlank() {
    var line = document.createElement('div');
    line.className = 'term-line visible';
    line.textContent = '\u00A0';
    terminalBody.appendChild(line);
  }

  function updatePhaseUI(idx) {
    if (!phaseBtns) return;
    phaseBtns.forEach(function (btn, i) {
      btn.classList.remove('active', 'completed');
      if (i === idx) btn.classList.add('active');
      else if (i < idx) btn.classList.add('completed');
    });
  }

  function renderPhase(phaseIndex, animate) {
    if (demoAbort) demoAbort.abort();

    var signal = createAbortable();
    demoAbort = signal;
    demoAnimating = animate;
    terminalBody.innerHTML = '';

    var phases = getDemoPhases();
    if (!phases[phaseIndex]) return Promise.resolve();
    var phase = phases[phaseIndex];

    updatePhaseUI(phaseIndex);
    demoCurrentPhase = phaseIndex;

    if (statusDot) statusDot.className = 'status-indicator running';
    if (statusText) statusText.textContent = t('demo.status.running') || 'Running pipeline...';
    if (phaseCounter) phaseCounter.textContent = 'Phase ' + (phaseIndex + 1) + '/6';

    var idx = 0;
    function nextLine() {
      if (signal.aborted || idx >= phase.lines.length) return Promise.resolve();
      var ln = phase.lines[idx++];
      if (ln.type === 'blank') { showBlank(); return nextLine(); }
      if (animate && ln.typed) {
        return typeText(ln.text, ln.type || 'dim', signal)
          .then(function () { return sleep(LINE_PAUSE, signal); })
          .catch(function () {})
          .then(function () { if (!signal.aborted) return nextLine(); });
      }
      showLine(ln.text, ln.type || 'dim');
      if (animate) {
        return sleep(LINE_PAUSE / 2, signal).catch(function () {}).then(function () {
          if (!signal.aborted) return nextLine();
        });
      }
      return nextLine();
    }

    return nextLine().then(function () {
      if (signal.aborted) return;
      demoAnimating = false;
      if (statusDot) statusDot.className = 'status-indicator';

      var phases2 = getDemoPhases();
      var nextIdx, delay;
      if (phaseIndex < phases2.length - 1) {
        if (statusText) statusText.textContent = t('demo.status.done') || 'Phase complete';
        nextIdx = phaseIndex + 1;
        delay = PHASE_END_PAUSE;
      } else {
        if (statusText) statusText.textContent = t('demo.status.complete') || 'Project ready!';
        nextIdx = 0;
        delay = PHASE_END_PAUSE * 2;
      }
      // Use sleep() for auto-advance so it pauses/resumes with visibility
      sleep(delay, signal).then(function () {
        if (!signal.aborted) renderPhase(nextIdx, true);
      }).catch(function () {});
    });
  }

  function pauseDemo() {
    if (demoPaused) return;
    demoPaused = true;
  }

  function resumeDemo() {
    if (!demoPaused) return;
    demoPaused = false;
    // Wake up all sleeping promises
    var cbs = _resumeCallbacks.slice();
    _resumeCallbacks = [];
    cbs.forEach(function (cb) { cb(); });
  }

  function initDemo() {
    terminalBody = document.getElementById('terminalBody');
    statusDot = document.getElementById('statusDot');
    statusText = document.getElementById('statusText');
    phaseCounter = document.getElementById('phaseCounter');
    if (!terminalBody) return;

    phaseBtns = Array.from(document.querySelectorAll('.phase-btn'));

    phaseBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = parseInt(btn.dataset.phase, 10);
        if (!isNaN(p)) renderPhase(p, true);
      });
    });

    // Hero CTA "See how it works" — always restart demo from phase 0
    var heroCta = document.querySelector('.hero-cta-mini');
    if (heroCta) {
      heroCta.addEventListener('click', function () {
        // Small delay to allow smooth scroll to complete
        setTimeout(function () { renderPhase(0, true); }, 400);
      });
    }

    // Visibility observer — pause/resume when demo enters/leaves viewport
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!demoStarted) {
            demoStarted = true;
            renderPhase(0, true);
          } else {
            resumeDemo();
          }
        } else if (demoStarted) {
          pauseDemo();
        }
      });
    }, { threshold: 0.2 });

    var demoSection = document.querySelector('.demo-section');
    if (demoSection) observer.observe(demoSection);

    onLanguageChange(function () { renderPhase(demoCurrentPhase, false); });
  }

  /* ================================================================
     SCROLL REVEAL
     ================================================================ */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ================================================================
     CLIPBOARD
     ================================================================ */
  function initClipboard() {
    var btn = document.getElementById('copyPromptBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var label = btn.querySelector('[data-i18n="cta.copy"]');
      var origText = label ? label.textContent : '';
      var text = t('cta.prompt_text') || 'Install https://github.com/mrdalvik/davai.git and let\u2019s make a project';

      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
        .then(function () {
          btn.classList.add('copied');
          if (label) label.textContent = t('cta.copied') || 'Copied!';
          setTimeout(function () {
            btn.classList.remove('copied');
            if (label) label.textContent = origText;
          }, 2000);
        })
        .catch(function () {});
    });
  }

  /* ================================================================
     ARTIFACTS FINDER
     ================================================================ */
  function initArtifacts() {
    var items = document.querySelectorAll('.finder-item[data-preview]');
    var previewFilename = document.getElementById('previewFilename');
    if (!items.length) return;

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        var previewId = item.getAttribute('data-preview');
        var target = document.getElementById(previewId);
        if (!target) return;

        // Update active file in finder
        items.forEach(function (i) { i.classList.remove('active'); });
        item.classList.add('active');

        // Update preview
        document.querySelectorAll('.preview-content').forEach(function (p) { p.classList.remove('active'); });
        target.classList.add('active');

        // Update filename in header
        var name = item.querySelector('.finder-name');
        if (previewFilename && name) previewFilename.textContent = name.textContent;
      });
    });
  }

  /* ================================================================
     INIT
     ================================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    setLanguage(detectLanguage()).then(function () {
      initSwitcher();
      initDemo();
      initArtifacts();
      initScrollReveal();
      initClipboard();
    });
  });
})();
