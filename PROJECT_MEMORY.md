# Project Memory

## 2026-04-09 16:45 America/New_York

- Feature name: GitHub repository setup
- Work name: Initial repository packaging
- Description: Added standard GitHub-facing repo artifacts for a small static-site project and documented how the app works.
- Value provided: Makes the project easier to understand, clone, maintain, and publish.
- Files changed: `README.md`, `.gitignore`, `.gitattributes`, `LICENSE`, `AGENTS.md`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Kept the project as a no-build static site and documented that as an explicit repo constraint.
- Assumptions: MIT is an acceptable default license for this public-facing repository.
- Known limitations: The page still uses a placeholder CTA and all content remains embedded in `index.html`.
- Key learnings that you can bring with you to future sessions: This project is intentionally lightweight, so extra tooling should only be added if the page grows beyond single-file maintainability.
- Remaining TODOs: Initialize local git if needed, connect `origin`, and optionally push local changes to the GitHub mirror.
- Next steps: Review the page for production polish items like social metadata, a real CTA flow, and content finalization.

## 2026-04-09 18:10 America/New_York

- Feature name: Match story redesign and Danhausen interaction
- Work name: Story-card experience + bottom-of-page curse feature
- Description: Rebuilt the match section into image-led expandable story cards using researched feud summaries, removed the old template-style bottom/footer copy, and added a Danhausen bottom panel with animated "You are cursed!" callout and synchronized audio playback.
- Value provided: The page now feels more like a real WrestleMania digital guide, with clearer storytelling per match and a stronger character-driven ending moment.
- Files changed: `index.html`, `Assets/Danhausen_pointing.png`, `Assets/audio/danhausen-you-are-cursed.mp3`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Moved the match section to a data-driven render model inside `index.html` so content and UI are easier to maintain; simplified the accordion logic to DOM state toggling instead of full re-render on each click; shipped the Danhausen feature only once the dependent assets were committed alongside the page code.
- Assumptions: Fantasy matches should be treated as if officially booked, using the researched background as the story basis; the Danhausen image/audio are intended to be part of the production experience.
- Known limitations: Match graphics are still mostly gradient-backed surfaces rather than custom poster art for every bout; audio behavior was implemented with browser-safe click playback but not deeply cross-browser tested.
- Key learnings that you can bring with you to future sessions: For static promo pages, content-heavy sections become much easier to evolve when the content is centralized in a structured data model; QA on web features must include asset-tracking checks, not just code review, because production can break even when the UI logic is correct.
- Remaining TODOs: Run a visual QA pass on desktop and mobile for the story cards and Danhausen panel; decide whether the top-nav `Experience` label should be renamed now that it points to the Danhausen section; optionally create custom match artwork for more cards.
- Next steps: Validate the live GitHub page behavior in-browser, then refine polish items like card spacing, default-open state for featured matches, and stronger per-match visual differentiation.

## 2026-04-09 21:23 America/New_York

- Feature name: Static page architecture refactor
- Work name: Split single-file page into dedicated HTML, CSS, and JavaScript files
- Description: Extracted the large inline stylesheet and script from `index.html` into `styles.css` and `script.js`, then updated repo docs to match the new layout and current feature set.
- Value provided: The site stays fully static and simple to run, but the code is easier to edit safely because structure, styling, and behavior now have clearer boundaries.
- Files changed: `index.html`, `styles.css`, `script.js`, `README.md`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Chose the lowest-risk refactor path by preserving the same DOM structure, asset paths, and runtime behavior while introducing file-level separation; kept the no-build architecture intact instead of adding tooling.
- Assumptions: A three-file split is enough structure for the current project size and does not yet require templating, modules, or a bundler.
- Known limitations: `script.js` still contains both match-story content data and interaction logic; generated story cards still use a small inline style attribute for dynamic accent colors and optional background images.
- Key learnings that you can bring with you to future sessions: For static microsites, the first worthwhile architecture step is usually file separation rather than framework adoption because it reduces editing risk without increasing operational complexity.
- Remaining TODOs: Run a browser QA pass to confirm the extracted files load correctly on desktop and mobile; consider separating match data from interaction logic if the roster keeps growing; add social metadata.
- Next steps: Verify the site visually in a browser, then decide whether the next maintainability step is data extraction or more content and visual polish.

## 2026-04-09 22:03 America/New_York

- Feature name: Production logo polish and release push
- Work name: Header logo sizing refinement + production deployment
- Description: Replaced the placeholder header brand with the real WrestleMania 42 logo, tuned the displayed size down in CSS for better balance, then committed and pushed the full static-site refactor and branding update to `origin/main`.
- Value provided: Production now looks more official at first glance, and the shipped codebase is easier to maintain because the page is split into clear HTML, CSS, and JavaScript files.
- Files changed: `index.html`, `styles.css`, `script.js`, `README.md`, `PROJECT_MEMORY.md`, `Assets/wm42.logo.png`, `Assets/WM-42-NightOne-BG.png`
- Technical architecture changes or key technical decisions made: Kept the asset at full quality and controlled presentation size in CSS instead of editing the source file; shipped the release as one commit so production reflects a coherent state rather than piecemeal changes.
- Assumptions: The live deployment target updates directly from `main`, and the real logo asset should remain visually secondary to the hero headline rather than acting as a dominant masthead.
- Known limitations: Production was pushed without a full post-deploy browser QA pass, so final visual verification on live desktop and mobile remains outstanding.
- Key learnings that you can bring with you to future sessions: Brand assets should usually be resized in the UI layer first because that preserves source quality and makes iteration faster; release notes are more useful when they distinguish between "shipped" and "verified live."
- Remaining TODOs: Check the live site for final header balance, mobile nav spacing, and any asset-loading issues; add social metadata if the page will be shared externally.
- Next steps: Perform a quick live QA pass on production, then make any final spacing or branding tweaks based on the real rendered result.

## 2026-04-11 11:20 America/New_York

- Feature name: Match-card UX refinement and mobile header polish
- Work name: Card hierarchy redesign + compact mobile sticky header
- Description: Removed filler copy from the match section, redesigned the match cards so the closed state scans faster and the expanded state feels more editorial, removed duplicated expanded-state match titles, and then tightened the sticky mobile header by keeping the logo and nav on one row with smaller, denser mobile navigation.
- Value provided: The page now communicates the match card more clearly, reduces repetition inside expanded cards, and gives mobile users back more viewport space above the content.
- Files changed: `index.html`, `script.js`, `styles.css`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Kept the accordion logic intact and changed the component through content hierarchy and CSS rather than rewriting behavior; moved the expanded-state emphasis into a dedicated panel intro while making the closed card carry a single primary headline; handled the mobile header problem purely in responsive CSS by avoiding the stacked logo-plus-nav layout.
- Assumptions: Users already understand which match they opened from the card’s top visual treatment, so repeating the match title in the expanded panel adds clutter rather than clarity; the mobile header should favor compactness over preserving the desktop visual weight.
- Known limitations: The redesign was reviewed through code and selective visual feedback rather than a full structured browser QA pass across multiple real devices; the match cards may still need another round of tuning for headline wrapping and density on edge-case mobile widths.
- Key learnings that you can bring with you to future sessions: In accordion-style content, the closed state should optimize for scan speed while the expanded state should optimize for depth; on mobile, reducing header height usually matters more than preserving a two-row brand/navigation treatment from desktop.
- Remaining TODOs: Run a focused browser QA pass on the redesigned match cards in closed and open states across desktop and mobile; decide whether featured cards should gain an even stronger structural distinction on tablet sizes; consider further simplifying mobile nav if additional top-level links are added later.
- Next steps: Validate the live mobile header and redesigned match cards on real devices, then make one final polish pass on card spacing, hook length, and featured-card emphasis if needed.

## 2026-04-11 11:55 America/New_York

- Feature name: Mobile header containment fix
- Work name: Mobile nav overlap correction + section label rename
- Description: Iterated on the mobile sticky header after real-device feedback showed the logo overlapping the first nav item, then replaced the fragile one-row scroll-strip behavior with an equal-width three-slot mobile nav and renamed the last link from `Experience` to `Extra` to better fit both the layout and the broader content intent of that section.
- Value provided: The mobile header now fits the viewport more predictably, avoids clipping the first nav item, and uses a more future-friendly section label for bonus content beyond Danhausen.
- Files changed: `index.html`, `styles.css`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Solved the mobile header issue in the responsive CSS layer rather than adding JavaScript or changing information architecture; switched from flexible overflow behavior to explicit grid slots on mobile so nav items share space deterministically next to the logo.
- Assumptions: Three top-level nav links can fit in compact equal-width mobile slots once the logo is slightly reduced and the longest label is shortened to `Extra`.
- Known limitations: The fix was validated through user feedback and fast iteration rather than a structured cross-device QA matrix; if more top-level nav links are added later, the current equal-width mobile pattern will likely need to be revisited.
- Key learnings that you can bring with you to future sessions: On very narrow mobile headers, explicit space allocation is more reliable than relying on flex plus overflow; shorter, more flexible nav labels can solve both product and layout problems at the same time.
- Remaining TODOs: Continue checking the live site on real mobile devices; decide whether the mobile header should stay one-row permanently or evolve into a slimmer two-row pattern if the nav grows.
- Next steps: Keep monitoring the mobile header on production and only revisit the pattern if additional links or branding elements create new crowding.

## 2026-04-12 12:20 America/New_York

- Feature name: Match-story content refresh
- Work name: Danhausen/Miz card addition + Cody/Orton update + Extras nav polish
- Description: Added a new `Danhausen vs. The Miz` singles match card based on current WWE.com story beats around Danhausen cursing Miz, offering to uncurse him and Kit Wilson, and beating Wilson on SmackDown; refreshed the `Cody Rhodes vs. Randy Orton` main-event card to reflect Pat McAfee’s active role in the feud and the fan backlash to his inclusion; also shipped the pending nav-label copy change from `Extra` to `Extras`.
- Value provided: The site now reflects newer TV developments, the main-event copy feels more current and editorial, and the extras navigation label better communicates that the section can hold multiple bonus items.
- Files changed: `script.js`, `index.html`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Kept all changes in the structured match-story data model so the UI updated automatically without touching the card renderer; explicitly framed the Danhausen/Miz WrestleMania bout as a logical story payoff rather than an officially announced WWE match; treated fan reaction to McAfee as part of the Cody/Orton card’s editorial framing instead of a separate UI feature.
- Assumptions: WWE.com highlight listings and current weekly show framing are sufficient primary-source grounding for the Danhausen/Miz and Cody/Orton copy; outside wrestling outlets can be used to characterize reaction around McAfee’s involvement but should not override WWE.com for the base storyline.
- Known limitations: The Danhausen vs. The Miz match is written as a plausible WrestleMania payoff inferred from current TV beats, not a confirmed official booking; no live browser QA was run after this content update because the changes were copy/data-only.
- Key learnings that you can bring with you to future sessions: For data-driven promo pages, timely editorial refreshes are cheapest and safest when the content lives in a single structured array; when real fan backlash becomes part of how a feud is being perceived, acknowledging that in the copy can make the page feel more current and less generic.
- Remaining TODOs: Continue refreshing major match cards against current WWE programming as WrestleMania approaches; decide whether other cards should also call out real audience sentiment or remain strictly TV-story based; optionally add dedicated poster art for the new Danhausen/Miz entry if the feud stays on the card.
- Next steps: Monitor WWE.com for any official booking updates that would require tightening the “inference” language on Danhausen/Miz or further revising the Cody/Orton McAfee framing.

## 2026-04-12 16:35 America/New_York

- Feature name: Two-night match experience and custom card-art polish
- Work name: Night One / Night Two structure, targeted nav, mobile header fit, and image-backed featured cards
- Description: Reorganized the match section into sequential `Night One` and `Night Two` editorial blocks, updated the top navigation so users can jump directly to each night, tightened the mobile header so the logo and three nav links fit on a single row, and upgraded the Ladder Match, Cody/Orton, Jade/Rhea, and Stephanie/Liv cards to use custom background art as the actual card surface instead of layering art over the default accent background.
- Value provided: The site now reads more like a real two-night event plan, navigation maps more directly to the page structure, mobile header behavior is cleaner on-phone, and the most important match cards feel more premium and intentional.
- Files changed: `index.html`, `styles.css`, `script.js`, `Assets/Cody-Randy-head-to-head.png`, `Assets/Jade-Ripley-head-to-head.png`, `Assets/Liv-Stephanie-head-to-head.png`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Kept the two-night structure inside the existing match-story data model by assigning each card to a night and rendering grouped sections from config rather than hardcoding duplicate markup; fixed a layout bug by removing the stale outer `story-grid` class so the night sections could stack vertically; introduced a per-card `imageMode: 'replace'` option in the renderer so selected cards can use artwork as the true background while preserving a dark readability overlay.
- Assumptions: The current official night split was stable enough to update the real-feeling matches, while remaining editorial or inferred matches could be assigned by best fit; the new head-to-head images were intended to be shipped assets for production use, not just local design references.
- Known limitations: Some match-night placement is still partly editorial because not every card on the page represents a fully official announced booking; visual QA for the new art-backed cards relied on targeted review rather than a full multi-device screenshot pass.
- Key learnings that you can bring with you to future sessions: Sequential content groups like event nights work better as full-width vertical chapters than as side-by-side comparison panels; when a design uses featured artwork, the renderer often needs multiple composition modes so some cards can use art as decoration while others use art as the primary surface.
- Remaining TODOs: Keep checking official WWE announcements for any night-assignment changes; run a focused browser QA pass on the new image-backed cards for crop, text contrast, and focal-point quality on narrow screens; decide whether more match cards should receive custom artwork and `replace` mode.
- Next steps: Validate the live two-night flow and custom art cards on real devices, then continue the visual upgrade path card-by-card only where the artwork clearly improves the storytelling surface.

## 2026-04-12 17:10 America/New_York

- Feature name: Match-card art direction refinement
- Work name: Replacement-surface card art + mobile portrait focal-point tuning
- Description: Extended the match-card renderer so selected cards can treat artwork as the true card background instead of layering it over the default accent surface, then applied that mode to the Ladder Match, Cody/Orton, Jade/Rhea, and Stephanie/Liv cards; after that, added per-card mobile image focal points so those art-backed cards crop intentionally in portrait view instead of relying on generic centered `cover` behavior.
- Value provided: The most important match cards now feel more premium and editorial because the art is the real visual surface, and mobile users see stronger portrait crops that keep the right faces and focal beats visible.
- Files changed: `script.js`, `styles.css`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Introduced a reusable `imageMode: 'replace'` card option in the match-story renderer to support multiple composition modes without duplicating component markup; added `imagePosition` and `imagePositionMobile` data fields so art direction lives with the match card data rather than being hardcoded in CSS selectors.
- Assumptions: The chosen mobile focal points are a good first-pass framing for the four image-backed cards and can be refined later through live visual review if any crop still feels off.
- Known limitations: Only the currently image-backed cards use the new focal-point fields, and the focal-point values were chosen through targeted tuning rather than a full cross-device visual matrix; non-image-backed cards still use the default gradient-led visual treatment.
- Key learnings that you can bring with you to future sessions: Responsive images often need art direction, not just scaling; when a component starts to support richer media, the strongest long-term pattern is to keep visual treatment choices in structured data so future cards can opt into the same system cleanly.
- Remaining TODOs: Review the four art-backed cards on additional real devices for crop quality; decide whether Cody/Randy or the other featured cards need slightly different desktop focal points too; evaluate whether more matches should receive custom poster art now that the renderer supports it cleanly.
- Next steps: Keep shipping custom card art selectively where it clearly improves storytelling, and tune focal points only after real-device checks rather than trying to overfit them prematurely in code.

## 2026-04-12 18:05 America/New_York

- Feature name: Marquee card-art system expansion
- Work name: Additional head-to-head artwork rollout across major match cards
- Description: Continued the custom-card-art rollout by wiring production artwork into the AJ Lee vs. Becky Lynch, CM Punk vs. Roman Reigns, Drew McIntyre vs. Jacob Fatu, women’s tag title, six-man showcase, and Gunther vs. Seth Rollins cards, all using the replacement-background and mobile focal-point system already introduced earlier in the session.
- Value provided: A much larger share of the marquee match cards now feels like a cohesive premium poster system rather than a mix of polished hero cards and generic gradient cards.
- Files changed: `script.js`, `Assets/Becky-AJ-head-to-head.png`, `Assets/Roman-Punk-head-to-head.png`, `Assets/drew-fatu-head-to-head.png`, `Assets/womens-tag-team-head-to-head.png`, `Assets/Usos-VisionJ-head-to-head.png`, `Assets/Rollins-Gunther-head-to-head.png`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Reused the existing `imageMode: 'replace'`, `imagePosition`, and `imagePositionMobile` structure rather than inventing one-off card CSS; kept the rollout data-driven so each match can opt into poster-art treatment independently.
- Assumptions: The newly added head-to-head poster assets are intended for production use and the initial focal-point values are good enough for first-pass mobile framing until live review suggests otherwise.
- Known limitations: Several remaining cards still use the older gradient-led treatment; the new focal-point settings were chosen quickly and may need device-by-device refinement if a face or belt crops awkwardly on certain screens.
- Key learnings that you can bring with you to future sessions: Once a flexible art-direction system exists, scaling a visual upgrade across many cards becomes mostly a content operation rather than a UI-engineering operation; this is a strong pattern for static promotional pages because it keeps iteration cheap while increasing visual quality.
- Remaining TODOs: Review all newly art-backed cards on real mobile devices; decide which remaining cards are worth upgrading next versus leaving intentionally simpler; consider whether some non-featured cards should stay gradient-led to preserve contrast between marquee and secondary bouts.
- Next steps: Continue the selective card-art rollout only where the artwork improves the storytelling surface, and tune focal points based on real-device review rather than expanding complexity in advance.

## 2026-04-13 10:40 America/New_York

- Feature name: Extras video carousel simplification
- Work name: Config-driven YouTube embed carousel + graceful fallback
- Description: Added a new video block above Danhausen in the `Extras` section, then simplified it after initial embed issues into a lower-maintenance carousel driven by a dedicated config file. The final version renders one active embedded YouTube player with a thumbnail carousel beneath it, sources its video list from `extras-videos.js`, removes admin-facing copy from the UI, and includes a subtle `Watch on YouTube` fallback link under the active player.
- Value provided: The page now has a richer `Extras` section with bonus video content, but the operating model is lightweight: future video swaps happen in one small config file instead of requiring layout or copy rewrites. The section is also safer because users have a clear backup path when YouTube blocks an embed.
- Files changed: `index.html`, `script.js`, `styles.css`, `extras-videos.js`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Moved the video list into a dedicated config file loaded before the main app script; reduced the video data model to embed IDs plus optional short labels; derived embed URLs and YouTube thumbnails in `script.js` instead of storing heavier editorial metadata; dropped the earlier modal-based playback path in favor of an always-visible active embed and a permanent fallback link below it.
- Assumptions: Using embed IDs/URLs is operationally simpler for future updates than storing raw iframe code or heavier per-video copy; some YouTube videos may still refuse in-page embedding, so a permanent fallback link is preferable to complex error handling on a static site.
- Known limitations: The currently selected embedded videos still depend on YouTube’s external embed permissions and can fail in-page if those permissions change; the carousel currently favors operational simplicity over richer editorial storytelling; `extras-videos.js` must ship with the rest of the feature because the page now depends on it at runtime.
- Key learnings that you can bring with you to future sessions: Match the admin model to the real workflow; if the real job is “swap videos often,” the config should optimize for video-slot management, not editorial content management. Also, graceful degradation matters for third-party embeds: product should fail into a usable fallback, not a dead end.
- Remaining TODOs: Validate the live `Extras` carousel on desktop and mobile with the current embed set; swap any blocked or weak-performing videos in `extras-videos.js`; decide whether the carousel should gain arrows/dots or remain click-on-thumbnail only.
- Next steps: Monitor real playback behavior in production, continue curating the embed list through `extras-videos.js`, and only add richer controls if users actually need more than the current thumbnail-switching pattern.

## 2026-04-16 21:10 America/New_York

- Feature name: Family prediction board
- Work name: Config-driven side-by-side WrestleMania picks in Extras
- Description: Added a new predictions subsection inside `Extras` that renders match-by-match side-by-side picks for you and your son. The section is driven by a dedicated `extras-predictions.js` config file so the match list, winner picks, and commentary can all be updated without touching the rendering or layout code.
- Value provided: The page now supports an easy-to-maintain family prediction experience that feels native to the existing site instead of like a bolted-on table or admin widget.
- Files changed: `index.html`, `styles.css`, `script.js`, `extras-predictions.js`, `README.md`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Used the same config-driven pattern already established by `extras-videos.js`; rendered the predictions as premium comparison cards instead of a raw table so the section inherits the site’s editorial feel and stays readable on mobile; added an empty-state fallback in case the prediction list is cleared while the final card is still being assembled.
- Assumptions: The final WrestleMania card and both sets of picks will be maintained manually in `extras-predictions.js`; a side-by-side two-person comparison is the right long-term structure for this feature.
- Known limitations: The starter prediction entries are scaffolding and need to be replaced with the real final-card matches and picks; no live browser QA was run after implementing the section.
- Key learnings that you can bring with you to future sessions: When a static site needs frequent non-technical content updates, a small dedicated config file is usually the cleanest product and engineering boundary; comparison-heavy content reads better as responsive cards than as a strict desktop-first table.
- Remaining TODOs: Replace the starter prediction entries with the real final WrestleMania card; run a browser QA pass on the new section across desktop and mobile; decide later whether post-show result tracking should be added.
- Next steps: Populate `extras-predictions.js` with the final match list and both sets of picks, then visually QA the new section inside the full Extras flow.

## 2026-04-16 22:15 America/New_York

- Feature name: Shared prediction editing
- Work name: Google Sheets-powered prediction source with local fallback
- Description: Updated the prediction board so it can load match picks from a published Google Sheet instead of requiring direct edits to the repo file. The page now reads a CSV-based sheet config from `extras-predictions-sheet.js`, parses rows into prediction cards, and falls back to the local `extras-predictions.js` file if the sheet is unavailable.
- Value provided: Both you and your son can update picks through a familiar shared sheet, while the site stays static and keeps a safe fallback if the remote source fails.
- Files changed: `index.html`, `script.js`, `README.md`, `PROJECT_MEMORY.md`, `extras-predictions-sheet.js`
- Technical architecture changes or key technical decisions made: Chose a published Google Sheet CSV as the lightest-weight editable backend; kept the local predictions file as a resilience fallback; added a small in-browser CSV parser and row-to-card mapper rather than introducing a backend or build step.
- Assumptions: The Google Sheet will be published to the web as CSV and will use the documented column names; shared editing through Google Sheets is preferable to building a custom admin tool.
- Known limitations: The sheet must be publicly readable or otherwise browser-accessible to the static page; there is no authentication, conflict handling, or admin validation layer; the page expects consistent row ids and column names.
- Key learnings that you can bring with you to future sessions: For small shared-content workflows, a spreadsheet can act as a lightweight CMS if the page has a stable key structure and a documented schema; a fallback local source is valuable when introducing remote dependencies into an otherwise static site.
- Remaining TODOs: Paste in the real published CSV URL; create and populate the actual Google Sheet; run a browser QA pass to verify the sheet data overrides the fallback correctly.
- Next steps: Set up the sheet with the documented columns, publish it as CSV, paste the URL into the config file, and then test live edits by changing a row and reloading the local page.

## 2026-04-17 07:54 America/New_York

- Feature name: Prediction Board production hardening and polish
- Work name: Live Google Sheet hookup, merge-safe runtime behavior, mobile visibility fix, and presentation cleanup
- Description: Connected the live site to the published Google Sheet CSV for shared prediction editing, expanded the prediction slots to match the current card, fixed the runtime so sheet values merge into local fallback entries instead of wiping them out, removed reveal-based visibility dependence from the `Extras` subsections for safer mobile rendering, and polished the Prediction Board presentation with stronger Pup Pup/Fiddle identity while removing unreliable same-pick/split-decision inference.
- Value provided: The prediction experience now works as a practical shared-editing product instead of a local-only feature. Both people can update picks through Google Sheets, production points to the same CSV source as local, mobile rendering is safer, and the board reads more clearly as a two-person comparison experience.
- Files changed: `index.html`, `script.js`, `styles.css`, `extras-predictions.js`, `extras-predictions-sheet.js`, `README.md`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Treated Google Sheets as a lightweight CMS by reading a published CSV in-browser; preserved resilience by merging remote sheet values into local fallback entries by `id`; cache-busted sheet fetches to reduce stale published-sheet behavior; removed section-level reveal wrappers from core `Extras` content so important surfaces do not depend on animation state to render; kept identity clarity through static Pup Pup/Fiddle styling rather than trying to infer semantic agreement from free-text picks.
- Assumptions: The published Google Sheet URL will remain stable and publicly readable; row ids in the sheet will continue to align with the board’s expected ids; free-text pick values may use nicknames or different phrasing, so agreement detection should not be treated as reliable product logic.
- Known limitations: Published Google Sheets can still have short propagation delay after edits; the shared editing flow has no validation or auth layer; unrelated untracked local files remain in the repo and were intentionally excluded from the production pushes.
- Key learnings that you can bring with you to future sessions: For static sites, remote content should merge with local fallback data instead of replacing it wholesale when rows may be partially filled. Also, critical product content should not depend on decorative reveal logic to become visible, especially on mobile.
- Remaining TODOs: Run a structured QA pass on the live site across desktop and mobile after more sheet edits; clean up placeholder values still living in the sheet and fallback file; decide later whether the sheet-backed board needs lightweight validation or result tracking after the event.
- Next steps: Continue using the Google Sheet as the editing source of truth, verify live updates after meaningful edits, and refine long-match mobile typography only if real-device usage shows remaining readability issues.

## 2026-04-18 00:20 America/New_York

- Feature name: Live reactions feed
- Work name: Featured note plus editorial timeline powered by a second Google Sheet
- Description: Added a new `Live Reactions` section between the Prediction Board and Danhausen. The section includes a featured latest note, a stacked live timeline, author identity chips for Pup Pup and Fiddle, an empty state, and a second Google Sheet config file so live notes can be published into the site the same way predictions are.
- Value provided: The site can now evolve during the event itself instead of only before it. This gives you a lightweight live-blogging style surface without introducing a backend or breaking the site’s premium editorial feel.
- Files changed: `index.html`, `script.js`, `styles.css`, `extras-live-sheet.js`, `README.md`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Treated live notes as a separate content mode from predictions by using a featured-note-plus-timeline layout rather than another comparison grid; added a second CSV loader and row mapper in `script.js`; used a dedicated `extras-live-sheet.js` config so the live feed can be turned on independently of predictions.
- Assumptions: Live reactions will be maintained in a second published Google Sheet with the documented schema; the live note body is the primary content and optional metadata like tags and match labels may vary from note to note.
- Known limitations: No live reactions will render until a CSV URL is configured and populated; the feed currently relies on page refresh rather than timed polling; there is no moderation or validation layer for live entries.
- Key learnings that you can bring with you to future sessions: A site can support multiple content modes cleanly when each mode gets its own visual grammar and data source. In this case, predictions are comparison-driven while live reactions are time-driven, so they should not share the same card architecture.
- Remaining TODOs: Create and publish the live reactions Google Sheet; wire its CSV URL into `extras-live-sheet.js`; run visual QA with realistic note volume on desktop and mobile; decide later whether auto-refresh should be added during the event.
- Next steps: Set up the live notes sheet, populate a few sample entries, connect the published CSV URL, and verify that the featured note plus timeline reads well with real event-style content.

## 2026-04-18 00:48 America/New_York

- Feature name: Live reactions schema simplification
- Work name: Remove author from live note model while keeping internal ids hidden
- Description: Simplified the `Live Reactions` section so notes render as neutral event updates rather than person-attributed entries. Removed the `author` field from the live note parser and UI, while keeping `id` as an internal-only field used for stable row identity.
- Value provided: The live feed is easier to maintain in Google Sheets and reads more like a clean event journal instead of a competing identity-based note system.
- Files changed: `script.js`, `README.md`, `PROJECT_MEMORY.md`
- Technical architecture changes or key technical decisions made: Kept `id` as a non-displayed internal key because the runtime still benefits from stable row identity; removed `author` from the public schema because it no longer serves the product intent of the live feed.
- Assumptions: Live reactions are meant to function as a shared event log rather than an attributed conversation; removing author context improves clarity more than it reduces value.
- Known limitations: Existing live reactions sheet tabs that still include an `author` column will need to be updated to match the new documented schema if you want the sheet structure to stay clean.
- Key learnings that you can bring with you to future sessions: Not every editable data field deserves to survive into the final UX; if a field does not support the section’s core job, removing it can improve both content operations and presentation.
- Remaining TODOs: Update the live reactions sheet headers if desired; re-check the section with real live-note content after the schema cleanup.
- Next steps: Use the simplified row format for the live reactions tab and continue refining only the fields that genuinely improve the feed’s readability.
