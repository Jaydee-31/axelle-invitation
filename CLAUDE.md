# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-file digital christening invitation for Axelle. The entire application is `index.html` — no build system, no dependencies, no package manager.

## Running Locally

Open `index.html` directly in a browser, or serve it with any static file server:

```
python -m http.server 8080
```

Guest name personalization is driven by a URL parameter: `index.html?guest=GuestName`

## Structure

```
axelle-invitation/
├── index.html          # Markup only — no inline CSS or JS
├── css/
│   └── styles.css      # All styles and animations
└── js/
    ├── config.js       # guestName (from ?guest= param), SCENE_DURATION, letterMsg
    ├── particles.js    # createPetals(), createSparkles()
    ├── audio.js        # Web Audio ambient pad + toggle button
    ├── letter.js       # animateLetter() — word-by-word reveal
    ├── modal.js        # openModal(), RSVP yes/no handlers
    ├── scenes.js       # goTo(), updateDots(), updateNavBtns(), resetAutoplay(), clearAutoplay()
    ├── intro.js        # Enter button → activates scene 0
    ├── swipe.js        # Touch swipe navigation
    └── init.js         # Bootstrap: createPetals(), createSparkles(), updateNavBtns()
```

Scripts are loaded in the order above via plain `<script src="...">` tags. All state is global — load order matters because `scenes.js` calls `animateLetter` (letter.js) and `openModal` (modal.js), and `intro.js` calls `tryPlayAmbient` (audio.js) and scene functions.

### Scene system

Five scenes auto-advance every `SCENE_DURATION` (default 7000 ms). Scene state is tracked in the `currentScene` variable; `showScene(index)` handles transitions, progress dots, and button visibility.

| Scene | Content |
|-------|---------|
| 0 | Opening — title and baby name |
| 1 | Personalized letter (uses `?guest=` param) |
| 2 | Photo gallery (polaroid style) |
| 3 | Event details — date, church, reception |
| 4 | Closing — RSVP call to action |

### Key inline constants to update for future events

- `SCENE_DURATION` — autoplay interval in ms
- Event date, venue, and RSVP deadline — hardcoded strings in Scene 3 (search for `July 12`)
- Letter body text — in Scene 1 markup
- CSS custom properties at the top of `<style>` — `--rose`, `--blush`, `--gold`, etc.

### Audio

Background music is synthesized via the Web Audio API (soft pad with oscillators). No audio files are loaded. The toggle button mutes/unmutes the `AudioContext`.

### Responsive layout

The invitation frame is constrained to `min(430px, 100vw)` — mobile-first, centered on desktop.
