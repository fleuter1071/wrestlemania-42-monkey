# WrestleMania 42 Monkey

A static WrestleMania landing page concept for a fictional WrestleMania 42 event card.

## Overview

This project is a lightweight HTML/CSS/JavaScript microsite with:

- A premium hero section
- Story-card sections for a fantasy event lineup
- A config-driven predictions board in the `Extras` section for side-by-side family picks
- A config-driven extras video reel with an embedded player and thumbnail chooser
- Reveal-on-scroll interactions
- A Danhausen end-of-page interaction with image and audio playback

The site is intentionally simple: there is no build step, no framework, and no backend.

## Project Structure

```text
.
|-- index.html
|-- styles.css
|-- script.js
|-- extras-videos.js
|-- extras-predictions.js
|-- extras-predictions-sheet.js
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
- Extras video choices live in [`extras-videos.js`](/C:/Users/dougs/wrestlemania-42-monkey/extras-videos.js).
- Predictions data lives in [`extras-predictions.js`](/C:/Users/dougs/wrestlemania-42-monkey/extras-predictions.js).
- Optional Google Sheet config for shared prediction editing lives in [`extras-predictions-sheet.js`](/C:/Users/dougs/wrestlemania-42-monkey/extras-predictions-sheet.js).
- Image and audio assets are stored in [`Assets/`](/C:/Users/dougs/wrestlemania-42-monkey/Assets).

## Shared Prediction Editing With Google Sheets

If you want both people to update picks without editing repo files directly:

1. Create a Google Sheet with these column headers in row 1:

```text
id,night,match,pup_pup_winner,pup_pup_commentary,fiddle_winner,fiddle_commentary
```

2. Add one row per match.
3. Publish the sheet as CSV and paste the published CSV URL into [`extras-predictions-sheet.js`](/C:/Users/dougs/wrestlemania-42-monkey/extras-predictions-sheet.js).
4. Keep [`extras-predictions.js`](/C:/Users/dougs/wrestlemania-42-monkey/extras-predictions.js) as a local fallback in case the sheet is unavailable.

When the page loads, it will try the Google Sheet first and fall back to the local file if the sheet cannot be loaded.

## Recommended Next Steps

- Replace fantasy match-card copy with finalized event content
- Add social preview metadata for richer link sharing
- Run browser QA on desktop and mobile for the story cards, predictions board, extras carousel, and Danhausen section
- Keep `extras-predictions.js` aligned with the final WrestleMania card as matches are confirmed

## License

This repository is available under the MIT License. See [`LICENSE`](/C:/Users/dougs/.codex/wrestlemania-42-monkey/LICENSE).
