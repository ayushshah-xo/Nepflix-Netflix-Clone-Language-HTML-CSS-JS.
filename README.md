<div align="center">

<img src="https://raw.githubusercontent.com/ayushshah-xo/Nepflix-Netflix-Clone-Language-HTML-CSS-JS./main/nepFL.png" alt="Nepflix Logo" width="220"/>

# Nepflix — JS Edition 🎬

**A full-featured Nepali streaming experience — HTML, CSS & Vanilla JavaScript**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font%20Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

*Celebrating Nepali Cinema — नेपाली सिनेमा* 🇳🇵

</div>

---

## 📖 About

**Nepflix JS Edition** is the fully JavaScript-powered evolution of the Nepflix project — a Netflix-inspired streaming UI built as a love letter to Nepali cinema. This version upgrades the original CSS-only clone with a complete Vanilla JS application layer, adding dynamic content rendering, a cinematic particle system, a custom HTML5 video player, a movie detail modal, and persistent watch progress — all with zero frameworks or dependencies.

> **How is this different from the CSS-only version?**
> The [CSS-only Nepflix](https://github.com/ayushshah-xo/Nepflix-HTML-and-CSS-) achieves all interactivity through CSS checkbox hacks and native HTML. This JS Edition replaces that approach with a real application architecture: a centralised movie data store, a DOM card builder, JavaScript-driven animations, an IntersectionObserver for scroll reveals, and a feature-complete custom video player.

---

## 🖼️ Screenshots

### 🏠 Landing Page
> Netflix-style landing page with a hero section, Watch on TV panel, mobile download section, a JS-powered FAQ accordion, and multi-column footer.

![Landing Page](https://raw.githubusercontent.com/ayushshah-xo/Nepflix-Netflix-Clone-Language-HTML-CSS-JS./main/pre%20banner.png)

---

### 🎞️ Home / Browse Page
> The full browse experience — cinematic hero with parallax and live particle system, four dynamically rendered movie rows with arrow navigation, and a click-to-open detail modal.

![Home Browse Page](https://raw.githubusercontent.com/ayushshah-xo/Nepflix-Netflix-Clone-Language-HTML-CSS-JS./main/Nepflix%20banner.png)

---

### 🔐 Sign-Up Page
> Split-layout sign-up form with floating labels, password visibility toggle, and navigation to the home page.

![Sign Up Page](https://raw.githubusercontent.com/ayushshah-xo/Nepflix-Netflix-Clone-Language-HTML-CSS-JS./main/sign-up_page.png)

---

### 🎬 Movie Grid — Dynamic Cards
> All movie cards are generated dynamically from a central JS data store, complete with Devanagari + English titles, IMDb rating, genre, runtime, and hover overlays.

![Movie Grid](https://raw.githubusercontent.com/ayushshah-xo/Nepflix-Netflix-Clone-Language-HTML-CSS-JS./main/Nepflix.png)

---

## ✨ Features

### 🎨 UI & Experience
| Feature | Detail |
|---|---|
| 🎬 **Video Intro Loading Screen** | Full-screen video plays on load; auto-dismisses with a 1s opacity fade after the video ends |
| ✨ **Cinematic Particle System** | 30 procedurally generated floating particles (red glints + white dust) animate across the hero background |
| 🖱️ **Hero Parallax** | The hero background shifts in response to mouse position for a 3D depth effect |
| 🃏 **Dynamic Movie Cards** | All cards are built from a central `MOVIES` data object via `buildMovieCard()` — no hardcoded HTML |
| 🪟 **Movie Detail Modal** | Click any card to open a full-detail modal with a generated gradient hero, synopsis, metadata, and action buttons. Press `Esc` or click outside to close |
| ↔️ **Row Arrow Navigation** | Left/right arrow buttons scroll each movie row by 660px with smooth behaviour |
| 👁️ **Scroll Fade-in Sections** | `IntersectionObserver` triggers a fade-in class when each movie section enters the viewport |
| 💫 **Button Ripple Effects** | Material Design-style ripple on all `.btn` clicks, dynamically injected via JS |
| 📜 **Scroll Indicator** | A "Scroll" indicator in the hero fades out once the user scrolls past 100px |
| 🍔 **Mobile Menu** | Topbar with hamburger button for mobile navigation |

### 🎥 Custom Video Player (`nepflix-watchjs.js`)
| Feature | Detail |
|---|---|
| ▶️ **Play / Pause** | Click the video, centre button, or press `Space` / `K` |
| ⏩ **Skip 10s** | `→` arrow skips forward 10s; `←` skips back 10s with a toast notification |
| 🔊 **Volume Control** | Slider input + mute toggle button; press `M` to mute |
| ⛶ **Fullscreen** | Toggle with the fullscreen button or press `F` |
| ⏭️ **Skip Intro** | A "Skip Intro" button automatically appears between 60s–145s of playback |
| 🎞️ **Buffer Indicator** | A secondary progress bar element shows the buffered range in real time |
| ⏱️ **Progress Persistence** | Watch position is saved to `localStorage` every 5 seconds; a "Continue Watching" banner appears on next visit with remaining time |
| 🕹️ **Auto-hide Controls** | Controls and nav fade out 3 seconds after the last mouse/touch activity while playing |
| ⏳ **Loading Spinner** | Displayed until the `canplay` event fires |

### 🎬 Watch Page UI (`nepflix-watchui.js`)
| Feature | Detail |
|---|---|
| ➕ **My List Toggle** | Add/remove the current title with a button that updates its label dynamically |
| 📤 **Share Button** | Triggers the native Web Share API or copies the URL to clipboard |
| 🔔 **Toast Notifications** | Non-blocking toast messages for skip, mute, share, and other actions |
| 🎞️ **Trending Sidebar** | A rendered list of trending Nepali titles with SVG placeholder art |
| 🍿 **More Like This** | Recommendation cards rendered below the player |
| ▶️ **Continue Banner** | Dismissible banner prompting the user to resume from their saved timestamp |

---

## 🗂️ Project Structure

```
Nepflix-Netflix-Clone-Language-HTML-CSS-JS./
│
├── open.html               # Landing page (unauthenticated entry point)
├── open_style.css
│
├── signup_html.html        # Sign-up / registration page
├── signup_style.css
│
├── home_html.html          # Main browse / home page
├── home_style.js           # All home page JS logic (app entry point)
│
├── nepflix-watchui.js      # Watch page UI — My List, Share, cards, toast
├── nepflix-watchjs.js      # Watch page player — playback, progress, keyboard
│
│   (Watch page HTML/CSS referenced but not committed separately)
│
├── NEP_FLIX/               # Project folder stub
│
└── assets/  (root-level — flat structure in this version)
    ├── Nepflix banner.png
    ├── Nepflix.png
    ├── Nepflix_banner_brighter.png
    ├── pre banner.png
    ├── sign-up_page.png
    ├── sign_up_page_pic.png
    ├── icon.png
    ├── iconN.png
    ├── nepF.png
    ├── nepFL.png
    ├── N bar.png             # Favicon
    ├── tv.png
    ├── mobile.png
    ├── boxshot nep.png
    ├── translate.png
    ├── poster1.jpg
    │
    ├── Movie Posters (root level)
    │   ├── bagmati.jpg
    │   ├── bulbul.jpg
    │   ├── chhakka-panja-3.jpg
    │   ├── chhakka-panja-4.jpg
    │   ├── jatra.jpg / jatra-2.jpg
    │   ├── Kagbeni.jpg
    │   ├── kabaddi.jpg / kabaddi-kabaddi.jpg
    │   ├── kri.jpg
    │   ├── loot.jpg / loot-2.jpg
    │   ├── mero-yatra.jpg
    │   ├── pashupati-prasad.jpg / pasupati.jpg
    │   ├── prem-geet.jpg / prem-geet-3.jpg
    │   ├── ramprasad.jpg
    │   └── seto-surya.jpg
    │
    └── Videos
        ├── Home_page_intro.mp4    # Inline loading screen video
        ├── Nepali_cenema.mp4      # Hero background / intro
        └── video-tv-0819.m4v     # TV section demo video
```

---

## 🧠 JavaScript Architecture

### `home_style.js` — Application Core

The main script boots via `document.addEventListener('DOMContentLoaded', init)` and wires up the entire home page.

```
init()
 ├── initLoader()          → Min 2.6s loading screen, then fade-out
 ├── populateRow()  ×4     → Injects cards from MOVIES data into each row
 ├── initArrows()          → Smooth scroll on left/right row buttons
 ├── initFadeObserver()    → IntersectionObserver for section reveal
 ├── initParticles()       → 30 animated floating particles in the hero
 ├── initHeroParallax()    → mousemove-based background parallax
 ├── initModal()           → click, Esc, and overlay-click to close
 ├── initSidebar()         → Active state tracking across sidebar items
 ├── initScrollIndicator() → Hero scroll hint fades after 100px
 └── initButtonRipples()   → Ripple effect on all .btn elements
```

### `MOVIES` Data Store

All 24 films are stored as structured objects powering both the card renderer and the modal:

```js
{
  id: 'seto-surya',
  title: 'Seto Surya',
  titleNp: 'सेतो सूर्य',
  year: 2023,
  rating: 7.8,
  runtime: '2h 30m',
  genre: ['War', 'Drama', 'History'],
  synopsis: '...',
  cert: 'A',
  isNew: true,
  palette: ['#1a0000', '#330000', '#550000', '#880000'],
  shape: 'geometric'
}
```

### `nepflix-watchjs.js` — Video Player Module

Exposed as an IIFE with a clean public API:

```js
player.togglePlay()
player.skip(seconds)       // +10 / -10
player.toggleMute()
player.setVolume(0–1)
player.toggleFullscreen()
player.skipIntro()
player.resumeProgress()    // reads localStorage
```

### `nepflix-watchui.js` — Watch UI Module

```js
ui.showToast(message)      // auto-dismiss notification
ui.dismissBanner()         // hides continue-watching prompt
```

---

## 🚀 Getting Started

No build tools, package manager, or server required for basic use.

### Clone the repository

```bash
git clone https://github.com/ayushshah-xo/Nepflix-Netflix-Clone-Language-HTML-CSS-JS..git
cd "Nepflix-Netflix-Clone-Language-HTML-CSS-JS."
```

### Open in browser

```bash
# macOS
open open.html

# Linux
xdg-open open.html

# Windows
start open.html
```

> **Recommended:** Use a local dev server so that video files and `localStorage` work correctly across pages.

```bash
# Using Node.js
npx serve .

# Using Python
python3 -m http.server 8000
```

Then visit `http://localhost:3000/open.html` (or port 8000 for Python).

### Page flow

```
open.html  →  signup_html.html  →  home_html.html  →  nepflix-watch.html
                                        ↑
                              (intro video loads inline,
                               auto-fades after playback)
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic structure, native `<video>` with `autoplay muted loop`, `<form>` validation |
| **CSS3** | Flexbox & Grid, `@keyframes` animations, transitions, hover effects, responsive media queries |
| **Vanilla JavaScript (ES6+)** | Module pattern (IIFE), `IntersectionObserver`, `localStorage`, Web Share API, dynamic DOM construction |
| **Font Awesome 6.5** | Icons — chevrons, arrows, plus signs on landing page and FAQ |
| **Google Fonts** | Bebas Neue · DM Sans · Cinzel (home page typography) |
| **Photoshop & After Effects** | All custom logos, banners, branding, and intro video |

---

## ⌨️ Keyboard Shortcuts

These work on the watch page while the video player is focused:

| Key | Action |
|---|---|
| `Space` or `K` | Play / Pause |
| `→` | Skip forward 10 seconds |
| `←` | Skip back 10 seconds |
| `M` | Toggle mute |
| `F` | Toggle fullscreen |
| `Esc` | Close modal (home page) |

---

## 🎞️ Movie Catalogue

All 24 films are stored in the `MOVIES` object in `home_style.js`:

### 🆕 New Releases
| Title (नेपाली / English) | Genre | Year | IMDb |
|---|---|---|---|
| छक्का पन्जा ४ — Chhakka Panja 4 | Comedy, Drama | 2024 | 7.1 |
| बुलबुल — Bulbul | Romance, Drama | 2023 | 7.6 |
| यात्रा २ — Jatra 2 | Comedy, Action | 2023 | 6.9 |
| सेतो सूर्य — Seto Surya | War, Drama, History | 2023 | 7.8 |
| बागमती — Bagmati | Thriller, Mystery | 2024 | 7.3 |
| मेरो यात्रा — Mero Yatra | Road Movie, Drama | 2024 | 6.8 |

### 🔥 Trending in Nepal
Chhakka Panja 3 · Loot 2 · Prem Geet 3 · Ramprasad · Kabaddi Kabaddi · Kri

### 🏆 Classic Nepali Movies
Loot · Pashupati Prasad · Kagbeni · Prem Geet · Kabaddi · Jatra

### ⭐ Top Rated (with rank badges)
1. पशुपतिप्रसाद — Pashupati Prasad — 8.1 ⭐
2. काग्बेनी — Kagbeni — 7.9 ⭐
3. लुट — Loot — 7.8 ⭐
4. सेतो सूर्य — Seto Surya — 7.8 ⭐
5. बुलबुल — Bulbul — 7.6 ⭐
6. प्रेम गीत — Prem Geet — 7.6 ⭐

---

## 🐛 Known Issues

- **Flat asset structure:** In this version, all images and videos sit at the root level instead of inside `assets/img/` and `assets/videos/`. If you reorganise the project, update the `src` paths in all HTML and JS files accordingly.
- **Watch page source:** `nepflix-watch.html` (the player page) and its CSS are referenced but not committed to this repository. The JS files `nepflix-watchjs.js` and `nepflix-watchui.js` are present and ready to use once the HTML shell is added.
- **`home_style.js` Play button error:** The `querySelector(".btn--play")` call at the bottom of the file runs before the full init cycle; if the hero isn't rendered, it throws. Wrapping it inside `init()` resolves this.
- **Video files:** `assets/videos/` must be present locally — no hosted stream is included. `localStorage` progress persistence requires the same origin.

---

## 🔮 Future Improvements

- [ ] Backend integration (Node.js / Firebase / Supabase)
- [ ] Real user authentication with sessions
- [ ] Database-driven dynamic movie catalogue (TMDB API or custom)
- [ ] Video streaming via HLS / DASH
- [ ] Dark / Light mode toggle
- [ ] Search with live filtering across the MOVIES dataset
- [ ] Watchlist persistence to a database instead of `localStorage`
- [ ] Episode / season support for TV series

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add: your feature description"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Ayush Shah**
- GitHub: [@ayushshah-xo](https://github.com/ayushshah-xo)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

> **Disclaimer:** This is a fan-made, educational, non-commercial project. All Nepali movie posters remain the property of their respective owners. The Nepflix name and branding are original creations and are not affiliated with Netflix, Inc.

---

<div align="center">

Made with ❤️ to celebrate Nepali Cinema — नेपाली सिनेमा 🇳🇵

</div>
