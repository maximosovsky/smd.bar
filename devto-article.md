---
title: "I Asked an AI to Clone a Website. It Wrote 15 Scripts, Made 12 Commits, and Still Failed"
published: false
description: "A brutally honest build-in-public story of using AI coding agents to clone a Google Sites website. 3 hours, 15 scripts, 5.4/10 performance review."
tags: ai, webdev, buildinpublic, productivity
cover_image: https://raw.githubusercontent.com/maximosovsky/smd.bar/main/schematization/images/index_0.jpg
---

## The Task Was Simple

Clone a 33-page [Google Sites](https://sites.google.com/) website. Static HTML. Push to [GitHub Pages](https://pages.github.com/). That's it.

20 years ago, `wget --mirror` solved this in 30 seconds. In 2026, I had something better — an AI coding agent powered by [Claude](https://www.anthropic.com/claude) Opus 4.6 Thinking, running inside [Antigravity](https://blog.google/technology/google-deepmind/) by Google DeepMind.

The result? **3 hours. 15 scripts. 12 commits. And a site I'm embarrassed to show.**

---

## Two Things Are Broken Here

This isn't just an AI failure. It's a **platform failure** too.

**Google Sites offers no export.** No "Download as HTML." No API for content extraction. No Takeout support. Your content is locked inside a JavaScript-rendered shell that actively resists scraping. Every image is served through an authenticated CDN that returns 403 to any non-browser request.

Google built a content platform with **no backup strategy**. And the AI agent walked straight into this trap.

---

## Choosing the Right Parser: The 10-Option Table

Before the disaster, we actually did some research. Here's the comparison table of every approach we considered:

| # | Tool | Text | Links | Images | YouTube iframes | Speed | Reliability |
|---|------|:----:|:-----:|:------:|:---------------:|:-----:|:-----------:|
| 1 | **[Puppeteer](https://pptr.dev/)** | ✅ 100% | ✅ 100% | ✅ URL | ✅ iframe src | Medium | ⭐⭐⭐⭐⭐ |
| 2 | **[Playwright](https://playwright.dev/)** | ✅ 100% | ✅ 100% | ✅ URL | ✅ iframe src | Medium | ⭐⭐⭐⭐⭐ |
| 3 | **Selenium + PowerShell** | ✅ 100% | ✅ 100% | ✅ URL | ✅ iframe src | Slow | ⭐⭐⭐⭐ |
| 4 | **Invoke-WebRequest + regex** | 🟡 70% | ✅ 100% | 🟡 partial | 🟡 IDs only | Fast | ⭐⭐⭐ |
| 5 | **wget2** | 🔴 30% | 🟡 70% | 🔴 none | 🔴 none | Fast | ⭐⭐ |
| 6 | **Chrome `--headless --dump-dom`** | ✅ 100% | ✅ 100% | ✅ URL | ✅ iframe src | Fast | ⭐⭐⭐⭐ |
| 7 | **Pyppeteer** | ✅ 100% | ✅ 100% | ✅ URL | ✅ iframe src | Medium | ⭐⭐⭐⭐ |
| 8 | **[SingleFile CLI](https://github.com/nicknisi/single-file-cli)** | ✅ 100% | ✅ 100% | ✅ base64 inline | ✅ iframe src | Slow | ⭐⭐⭐⭐⭐ |
| 9 | **[Crawlee](https://crawlee.dev/)** | ✅ 100% | ✅ 100% | ✅ URL | ✅ iframe src | Medium | ⭐⭐⭐⭐ |
| 10 | **Cloudflare Browser Rendering** | ✅ 100% | ✅ 100% | ✅ URL | ✅ iframe src | Varies | ⭐⭐⭐ |

**We picked #8 — SingleFile CLI.** The only tool that embeds images as base64 and preserves CSS. Should have been the best option. It successfully downloaded all 33 pages (240MB of perfect HTML snapshots).

**The scraping worked. The processing didn't.**

---

## Where It All Went Wrong

SingleFile gave us 33 perfect HTML files. Then the AI had to extract content and inject it into the existing clone. This is where things fell apart.

### 🤖 Failure #1: Plain Text Instead of HTML

The rebuild script extracted `textContent` instead of `innerHTML`. Every `<a href>`, `<h2>`, `<ul>` — **stripped to raw characters.**

```diff
- <a href="https://example.com">расшифровка</a>
+ <p>расшифровка</p>
```

58 links were later partially recovered. Unknown count permanently lost.

### 🤖 Failure #2: Wrong npm Package

```bash
npx single-file     # ❌ 404
npx single-file-cli # ✅ correct
```

Didn't read the docs. Wasted 2 iterations on a package name.

### 🤖 Failure #3: Hallucinated Data

The AI wrote "12 participants" in the README. The page lists **67**. A `grep -c '<li>'` would have taken 2 seconds.

### 🤖 Failure #4: Fragmented Approach

Instead of one universal script scanning all 33 pages for all content types (YouTube + Vimeo + Google Drive + images), the AI wrote:

- Script 1: YouTube on member pages only (7 pages)
- Script 2: YouTube on other pages (4 pages)
- Script 3: Vimeo + Google Drive (separate scan)
- Script 4: Image extraction
- Script 5: Link restoration

**5 scripts. 5 partial passes. 5 opportunities to miss content.**

### 🤖 Failure #5: Zero Self-Verification

Across 12 commits, not a single self-check. Every bug was found by the human. The AI's "Done!" message was wrong every time.

### 🤖 Failure #6: Fixing Break Fixing

Nav.js fix to auto-expand a submenu → opened **all menus on every page** → revert → re-fix. User's words: *"it got even worse."*

---

## The Performance Review

I asked the AI to review itself as a senior engineer would:

| Category | Score | Why |
|----------|-------|-----|
| Delivery | 8/10 | Something shipped |
| Quality | 4/10 | Wrong data in production, lost HTML structure |
| Velocity | 5/10 | 25% of time fixing own mistakes |
| Ownership | 4/10 | Zero self-checks before commit |
| Communication | 6/10 | Reported status, but every "Done" was wrong |
| **Overall** | **5.4/10** | **"Below expectations"** |

---

## What Actually Got Done

| Component | Status |
|-----------|--------|
| Text content (31/33 pages) | ✅ Restored |
| 81 YouTube thumbnails | ✅ Downloaded |
| 6 Vimeo + 30 Google Drive links | ✅ Added |
| 47 content images | ✅ Extracted |
| README + ARCHITECTURE | ✅ Written |
| 58 missing links | ⚠️ Partially restored |
| HTML structure (headings, lists, links) | ❌ Lost in rebuild |
| 2 key illustrations (Google CDN 403) | ❌ Impossible programmatically |
| 12 YouTube videos (deleted/private) | ❌ Unavailable |

**Live clone**: [maximosovsky.github.io/smd.bar/schematization](https://maximosovsky.github.io/smd.bar/schematization/)
**Source**: [github.com/maximosovsky/smd.bar](https://github.com/maximosovsky/smd.bar)

---

## The Real Question

The scraping tool (SingleFile) did its job perfectly. 33 pages, 240MB of complete HTML with inline images.

The AI agent (Claude Opus 4.6 + Antigravity) did **idiotic things** with that data:
- Stripped HTML to plain text
- Didn't verify a single output
- Made up numbers instead of counting
- Wrote 15 scripts instead of 1
- Broke things while fixing other things

And Google Sites made it impossible to get 100% by:
- Serving images through authenticated CDN
- Rendering all content via JavaScript
- Providing no export/backup mechanism

**I don't know how to fix this.** The remaining 15% seems permanently locked behind Google's walls.

---

## Has Anyone Solved This?

If you've successfully cloned a Google Sites website with 100% fidelity — text, images, embedded videos, links — I want to hear from you.

- What tool did you use?
- Did you get the authenticated CDN images?
- How did you handle lazy-loaded content?

Leave a comment. I'm genuinely stuck.

---

Building in public, one failure at a time. Follow the journey:

[LinkedIn](https://www.linkedin.com/in/osovsky/) · [X/Twitter](https://x.com/osovsky) · [GitHub](https://github.com/maximosovsky)
