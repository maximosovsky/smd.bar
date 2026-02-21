# Architecture — smd.bar

## Overview

smd.bar — статический сайт с кастомным доменом. Single-page HTML с hero-изображением.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML (static) |
| Deploy | GitHub Pages |
| Domain | smd.bar (CNAME) |

## Project Structure

```
├── CNAME              # Custom domain: smd.bar
├── root/
│   ├── index.html     # Main page (75KB)
│   └── hero.png       # Hero image
├── docs/              # Additional docs/pages
└── LICENSE            # MIT
```

## Key Concepts

- **Custom domain** — `smd.bar` через GitHub Pages CNAME
- **Single-page** — одностраничный статический сайт
