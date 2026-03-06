<div align="center">

# 📐 smd.bar

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=for-the-badge&logo=githubpages&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Static multi-page site with Schemata knowledge archive**

[Live Site](https://maximosovsky.github.io/smd.bar/) · [Architecture](ARCHITECTURE.md)

</div>

> Статический клон Google Sites проекта «Схематизация» — полный архив работы группы «Завод промышленных роботов» по теме «Технологии мышления» (2012–2020). 33 HTML-страницы, 49 локальных изображений, 12+ YouTube-превью, Markdown-копии всех страниц.

---

## 💡 Concept

Оригинальный сайт размещён на Google Sites, который может быть удалён или ограничен в любой момент. Данный проект — **полная офлайн-копия** всего контента: тексты, изображения, навигация, структура. Все медиа-файлы хранятся локально, внешние ссылки (Google Drive, Photos, Docs, YouTube) сохранены.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **33 HTML-страницы** | Полный клон всех разделов: игры, семинары, лекторий, библиотека, литература, музей, издательство, участники |
| **67 участников** | Полный список группы + 12 персональных подстраниц (6 вложенных у Осовского М.Е.) |
| **49 локальных изображений** | Фото с игр, обложки книг, схемы — не зависят от Google CDN |
| **YouTube-превью** | 12+ кликабельных обложек видео вместо embedded iframes |
| **Markdown-копии** | Каждая страница продублирована в `.md` с frontmatter (оригинальный URL) |
| **Google Sites дизайн** | CSS воспроизводит оригинал: Roboto, синий header, серый sidebar |
| **Responsive** | Hamburger-меню и адаптивная вёрстка на экранах ≤900px |
| **Image Grid** | Обложки книг в CSS Grid (2–4 колонки) |

---

## 🚀 Quick Start

```bash
git clone https://github.com/maximosovsky/smd.bar.git
cd smd.bar
# Open schematization/index.html in browser
```

> [!NOTE]
> Для продакшена сайт деплоится на GitHub Pages автоматически из ветки `main`.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (static) |
| Styling | Vanilla CSS + Google Fonts (Roboto) |
| Navigation | Vanilla JS (`nav.js`) |
| Media | Local JPG + YouTube thumbnails |
| Docs | Markdown (`.md` copies with YAML frontmatter) |
| Deploy | GitHub Pages |

<details>
<summary>📁 Project Structure</summary>

```
smd.bar/
├── root/                          # Landing page
│   ├── index.html
│   └── hero.png
│
├── schematization/                # Schemata site clone (33 pages)
│   ├── index.html / index.md      # Главная
│   ├── style.css                  # Shared CSS
│   ├── nav.js                     # Sidebar navigation
│   │
│   ├── цикл-игр-.../             # Цикл игр
│   ├── архив-игр-группы/          # Архив игр (2012–2020)
│   ├── план-график/               # План-график
│   ├── семинары/                  # Семинары
│   │   └── 1-конференция/         # 1-я конференция
│   ├── лекторий/                  # Лекторий
│   ├── музей-схем/                # Музей схем
│   ├── издательство/              # Издательство
│   ├── библиотека/                # Библиотека
│   ├── литература/                # Литература (100+ книг, 6 YouTube)
│   ├── вакансии/                  # Вакансии
│   ├── официальные-материалы/     # Официальные материалы
│   ├── 2014-2019/                 # Период 2014–2019
│   │
│   ├── состав-группы/             # 67 участников (12 подстраниц)
│   │   ├── осовский-м-е/          # + 6 вложенных подстраниц
│   │   ├── мрдуляш-п-б/
│   │   └── ...                    # ещё 10 участников
│   │
│   └── images/                    # Локальные медиа (49 JPG)
│       └── yt/                    # YouTube thumbnails
│
├── docs/
├── ARCHITECTURE.md
├── README.md
└── LICENSE                        # MIT
```

</details>

---

## 📄 License

[Maxim Osovsky](https://www.linkedin.com/in/osovsky/). Licensed under [MIT](LICENSE).
