# ROADMAP — Клонирование JS-rendered сайта (Google Sites, Wix, etc.)

## Правильный flow (6 шагов, ~1.5 часа)

### Шаг 1. Crawl навигацию → получить список URL
- Скачать одну страницу → спарсить `<nav>` / sidebar → получить полный список всех страниц автоматически
- Результат: массив уникальных URL (точное количество страниц)

### Шаг 2. SingleFile CLI — скачать все страницы
```bash
npx single-file-cli --browser-executable-path="chrome.exe" URL output.html
```
- SingleFile запускает headless Chrome, ждёт JS-рендер, сохраняет полный DOM с inline CSS и base64 картинками
- Результат: N файлов с полным контентом

### Шаг 3. Один скрипт — извлечь `innerHTML` из контентной области
```javascript
// ПРАВИЛЬНО — сохраняет <a>, <h2>, <ul>, <img>:
const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
const content = main[1];

// НЕПРАВИЛЬНО — убивает всю структуру:
const text = main[1].replace(/<[^>]+>/g, '');
```

### Шаг 4. Почистить HTML — один проход
- Убрать платформенные классы (`class="..."` → remove)
- Заменить `data:image/...base64` → локальные файлы
- Развернуть платформенные редиректы (`google.com/url?q=` → прямой URL)
- Заменить абсолютные ссылки на оригинал → относительные ссылки клона

### Шаг 5. Собрать сайт — шаблон + контент
```
header (sidebar nav) + cleaned innerHTML + footer → index.html
```

### Шаг 6. Один коммит, одна проверка
- Открыть в браузере
- Проверить 5 случайных страниц: текст, ссылки, картинки
- Коммит

---

## Сравнение инструментов парсинга

| # | Инструмент | Текст | Ссылки | Картинки | YouTube | CSS | Скорость |
|---|-----------|:-----:|:------:|:--------:|:-------:|:---:|:--------:|
| 1 | Puppeteer | ✅ | ✅ | URL | ✅ iframe | ❌ | Средняя |
| 2 | Playwright | ✅ | ✅ | URL | ✅ iframe | ❌ | Средняя |
| 3 | Chrome `--headless --dump-dom` | ✅ | ✅ | URL | ✅ iframe | ❌ | Быстрая |
| 4 | **SingleFile CLI** | ✅ | ✅ | ✅ base64 | ✅ iframe | ✅ | Медленная |
| 5 | wget / httrack | 🔴 | 🟡 | 🔴 | 🔴 | ❌ | Быстрая |
| 6 | Invoke-WebRequest + regex | 🟡 | ✅ | 🟡 | 🟡 ID | ❌ | Быстрая |

**Рекомендация: SingleFile CLI** — единственный инструмент, который сохраняет CSS и картинки inline.

---

## Известные ограничения
- Google CDN картинки (lh3.googleusercontent.com) — 403 при прямом скачивании, только из браузера
- Lazy-loaded контент — нужен `--browser-wait-delay=5000` + scroll
- Удалённые/приватные YouTube — thumbnails недоступны
