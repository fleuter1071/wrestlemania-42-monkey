# WrestleMania 42 Monkey

A single-file static landing page concept for a fictional WrestleMania 42 event card.

## Overview

This project is a lightweight HTML/CSS/JavaScript microsite with:

- A premium hero section
- Match-card sections for a fantasy event lineup
- Simple reveal-on-scroll interactions
- A placeholder call-to-action button for future fan-page features

The site is intentionally simple: there is no build step, no framework, and no backend.

## Project Structure

```text
.
|-- index.html
|-- Assets/
|   |-- WM-42-NightTwo-BG.png
|   `-- WM-42-IC-Ladder-Match.png
```

## Run Locally

Because this is a static site, you can open `index.html` directly in a browser.

If you want a local server instead, use any simple static server. For example:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Editing Notes

- Most content is hardcoded directly in [`index.html`](/C:/Users/dougs/.codex/wrestlemania-42-monkey/index.html).
- The CTA currently uses a placeholder `alert()` instead of a real ticket, trailer, or modal flow.
- Image assets are stored in [`Assets/`](/C:/Users/dougs/.codex/wrestlemania-42-monkey/Assets).

## Recommended Next Steps

- Replace fantasy match-card copy with finalized event content
- Swap the placeholder CTA for a real interaction
- Add social preview metadata for richer link sharing
- Split CSS and JavaScript into separate files if the page grows further

## License

This repository is available under the MIT License. See [`LICENSE`](/C:/Users/dougs/.codex/wrestlemania-42-monkey/LICENSE).
