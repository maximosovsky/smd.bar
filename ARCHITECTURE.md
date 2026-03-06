# Architecture — smd.bar

## Overview

smd.bar — статический многостраничный сайт на GitHub Pages. Содержит лендинг (`root/`) и полный клон Google Sites проекта «Схематизация» (`schematization/`) — архив работы группы «Завод промышленных роботов» по теме «Технологии мышления» (2012–2020).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (static, 33 pages) |
| Styling | Vanilla CSS (Roboto font, Google Sites visual clone) |
| Navigation | Vanilla JS (`nav.js` — sidebar toggle, mobile hamburger) |
| Media | Local images (49 JPG) + YouTube thumbnails (`images/yt/`) |
| Markdown | `.md` Copies of each page (frontmatter with original Google Sites URL) |
| Deploy | GitHub Pages (`main` branch, `/` root) |

## Project Structure

```
smd.bar/
├── root/                          # Landing page
│   ├── index.html                 # Main entry (75 KB)
│   └── hero.png                   # Hero image
│
├── schematization/                # Schemata site clone (33 pages)
│   ├── index.html / index.md      # Главная — Схематизация
│   ├── style.css                  # Shared CSS (Google Sites look)
│   ├── nav.js                     # Sidebar navigation logic
│   │
│   ├── цикл-игр-.../             # Цикл игр технологии мышления
│   ├── архив-игр-группы/          # Архив игр группы (2012–2020)
│   ├── план-график/               # План-график
│   ├── семинары/                  # Семинары
│   │   └── 1-конференция/         # 1-я конференция (17 докладов)
│   ├── лекторий/                  # Лекторий
│   ├── музей-схем/                # Музей схем
│   ├── издательство/              # Издательство (11 книг)
│   ├── библиотека/                # Библиотека (22 источника)
│   ├── литература/                # Литература (12 разделов, 100+ книг, 6 YouTube)
│   ├── вакансии/                  # Вакансии
│   ├── официальные-материалы/     # Официальные материалы
│   ├── 2014-2019/                 # Период 2014–2019
│   │
│   ├── состав-группы/             # Состав группы (12 участников)
│   │   ├── осовский-м-е/          # + 6 вложенных подстраниц
│   │   ├── мрдуляш-п-б/
│   │   ├── горбань-а-а/
│   │   ├── гайдамака-к-и/
│   │   ├── злотников-и-в/
│   │   ├── корякин-с-в/
│   │   ├── лазарев-а-м/
│   │   ├── пинаев-д-а/
│   │   ├── сизых-м-в/
│   │   ├── сокольников-а-а/
│   │   ├── цепков-м-а/
│   │   └── мокроусова-ю-в/
│   │
│   └── images/                    # Локальные изображения
│       ├── favicon.jpg            # Иконка сайта
│       ├── main_*.jpg             # Главная страница
│       ├── cycle_*.jpg            # Цикл игр — схемы
│       ├── archive_*.jpg          # Фото с игр (2014–2020)
│       ├── museum_*.jpg           # Музей схем
│       ├── library_*.jpg          # Обложки книг (библиотека)
│       ├── publishing_*.jpg       # Обложки книг (издательство)
│       ├── seminars_*.jpg         # Семинары
│       ├── lectorium_*.jpg        # Лекторий
│       ├── osovsky_*.jpg          # Фото Осовского М.Е.
│       ├── mrdulyash_*.jpg        # Фото Мрдуляша П.Б.
│       ├── plan_*.jpg             # План-график
│       └── yt/                    # YouTube video thumbnails
│           └── yt_*.jpg           # Кликабельные превью (12+ видео)
│
├── docs/                          # Reserved
├── ARCHITECTURE.md
├── README.md
└── LICENSE                        # MIT
```

## Key Architectural Decisions

### 1. Static HTML Clone (no SSG)

Сайт генерировался Node.js-скриптом (`generate-core.js` + `generate-pages.js`) из спарсенного контента Google Sites, но результат — **чистый статический HTML** без зависимостей от генератора. Это обеспечивает:
- Нулевой build step — файлы деплоятся как есть
- Полную независимость от Google Sites (который может быть удалён)
- Мгновенную загрузку без JavaScript-фреймворков

### 2. Google Sites Visual Fidelity

CSS максимально воспроизводит оригинальный дизайн Google Sites:
- Roboto font (Google Fonts CDN)
- Синий sticky header (`#4285f4`)
- Серый sidebar (`#f8f9fa`) с 280px шириной
- Цветовая схема Google Material: `#1a73e8` ссылки, `#d2e3fc` active state
- Responsive: hamburger-меню на экранах ≤900px

### 3. Локальные медиа-ассеты

Все изображения скачаны с Google CDN и хранятся локально в `images/`. Это исключает зависимость от `lh3.googleusercontent.com` и обеспечивает работу сайта при отключении Google CDN.

YouTube-видео представлены как **кликабельные превью** (thumbnails из `img.youtube.com/vi/{id}/hqdefault.jpg`), а не как embedded iframes. Клик ведёт на YouTube.

### 4. Dual Format (HTML + Markdown)

Каждая HTML-страница продублирована в `.md` формате с YAML-frontmatter, содержащим оригинальный URL Google Sites. Это позволяет:
- Импорт в Obsidian / Notion
- Простое редактирование контента
- Трассировку к оригинальному источнику

### 5. Navigation: Shared `nav.js`

Единый `nav.js` подключается на всех 33 страницах. Обеспечивает:
- Toggle для вложенных подменю (участники → подстраницы)
- Auto-expand: при загрузке страницы автоматически раскрывает родительские меню для активного пункта
- Hamburger-меню + overlay для мобильных устройств

## External Links

Сайт сохраняет внешние ссылки на:
- **Google Drive** — презентации, аудио
- **Google Photos** — фото-альбомы
- **Google Docs** — расшифровки, отчёты
- **YouTube** — видеозаписи (кликабельные превью)
- **Medium** (`osovsky.medium.com`) — статьи

Ссылки на `schem.tech` (старый домен) заменены на внутренние.
