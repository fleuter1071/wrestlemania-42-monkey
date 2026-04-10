# WrestleMania 42 Monkey

A static WrestleMania landing page concept for a fictional WrestleMania 42 event card.

## Overview

This project is a lightweight HTML/CSS/JavaScript microsite with:

- A premium hero section
- Story-card sections for a fantasy event lineup
- Reveal-on-scroll interactions
- A Danhausen end-of-page interaction with image and audio playback

The site is intentionally simple: there is no build step, no framework, and no backend.

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- Assets/
|   |-- Danhausen_pointing.png
|   |-- WM-42-IC-Ladder-Match.png
|   |-- WM-42-NightOne-BG.png
|   |-- WM-42-NightTwo-BG.png
|   |-- wm42.logo.png
|   `-- audio/
|       `-- danhausen-you-are-cursed.mp3
```

## Run Locally

Because this is a static site, you can open `index.html` directly in a browser.

If you want a local server instead, use any simple static server. For example:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Editing Notes

- Page structure lives in [`index.html`](/C:/Users/dougs/wrestlemania-42-monkey/index.html).
- Visual styling lives in [`styles.css`](/C:/Users/dougs/wrestlemania-42-monkey/styles.css).
- Match-story data and page interactions live in [`script.js`](/C:/Users/dougs/wrestlemania-42-monkey/script.js).
- Image and audio assets are stored in [`Assets/`](/C:/Users/dougs/wrestlemania-42-monkey/Assets).

## Recommended Next Steps

- Replace fantasy match-card copy with finalized event content
- Add social preview metadata for richer link sharing
- Run browser QA on desktop and mobile for the story cards and Danhausen section
- Decide whether the `Experience` nav label still matches the bottom-of-page section

## License

This repository is available under the MIT License. See [`LICENSE`](/C:/Users/dougs/.codex/wrestlemania-42-monkey/LICENSE).
