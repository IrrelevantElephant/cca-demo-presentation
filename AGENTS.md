# Agent guide

## Purpose and scope

This repository hosts **Reducing MTTR with AI Agents**, a technical lightning talk for software engineers, DevOps engineers, SREs and technical leaders.

The current work is a Reveal.js presentation design system with reusable example slides, plus a real presenter introduction. The eventual talk will cover repository-specific agent skills, MCP integrations and operational context, but **do not write the full incident-response narrative unless requested**. Treat sample metrics, configurations and demo commands as illustrative, not evidence or working integrations.

Prefer small, targeted edits. Inspect the working tree first and preserve unrelated or uncommitted changes. Follow any more-specific `AGENTS.md` when working within a subdirectory.

## Confirmed presenter details and decisions

- Name: **Harry**.
- **Software Engineer** at **Avalara**. The opening slide displays “Software Engineer” followed by the Avalara logo.
- Runs **https://brightonalt.net**, a **monthly meetup for .NET developers**.
- The first slide is **About me**, with ID `about` (`/#/about`), followed by the title slide (`/#/title`).
- The About me slide reserves space for a QR code. **The destination URL has not been supplied.** Keep the placeholder clearly non-scannable; do not assume it points to the meetup site.
- When the URL is supplied, use a locally stored QR image, retain a white quiet zone and verify that it encodes the exact URL. Include accessible text/a visible destination where practical.
- The user explicitly removed the placeholder presenter footer and divider from the title slide. Do not restore them. Presenter details belong on About me.
- Other examples still contain placeholders. Do not infer additional personal details or replace unrelated content without a reason.

## Repository architecture

This is also a checkout of the **Reveal.js framework itself**, not a fresh application with Reveal installed as a dependency. Keep that distinction intact.

| Path | Responsibility |
|---|---|
| `index.html` | Presentation content, inline SVGs and speaker notes |
| `src/main.js` | Reveal initialization, plugin registration and reduced-motion handling |
| `src/styles/theme.css` | Theme tokens, local fonts, typography, footer, print/motion rules |
| `src/styles/layouts.css` | Slide compositions, safe margins and About me layout |
| `src/styles/components.css` | Cards, badges, callouts, diagrams, terminal/code and metrics |
| `src/assets/fonts/` | Bundled Inter and JetBrains Mono fonts plus licenses |
| `vite.config.deck.js` | Presentation development/build configuration |
| `README.md` | Presentation commands, authoring guide, shortcuts and PDF instructions |
| `README.reveal.md` | Preserved upstream README |
| `dist/` | Existing compiled Reveal core/plugins used by the presentation |
| `js/`, `css/`, `plugin/`, `test/`, `build/` | Upstream Reveal source and infrastructure |
| `react/` | Existing, separate React integration; not used by this presentation |

Do not modify upstream Reveal code, the React package, framework build configuration or generated `dist/` files for ordinary slide work. Do not introduce React, a UI component library, a backend, or unnecessary dependencies. Use semantic HTML, reusable CSS and native Reveal capabilities.

## Commands

Requires Node **22.12+**. Use the existing npm lockfile.

```sh
npm ci                 # Install locked dependencies
npm run dev            # Deck dev server, normally http://localhost:8000
npm run deck:build     # Build presentation into deck-dist/
npm run preview        # Serve built presentation, normally http://localhost:4173
git diff --check       # Check patch whitespace
```

Important distinctions:

- **`npm run deck:build` builds this presentation.**
- `npm run build` builds the upstream Reveal library and can rewrite `dist/`; it is not the presentation build.
- `npm start` retains the original framework development server.
- `npm test` runs upstream framework tests, not a dedicated deck layout suite.
- The dev server updates CSS live and reloads HTML/JS changes. Preview serves the last production build; it does not rebuild automatically.
- Serve over HTTP rather than opening `index.html` via `file://`.
- `vite.config.deck.js` uses a relative base and `publicDir: false`. Add presentation assets under `src/assets/` and reference them from HTML/CSS/JS so Vite includes them; do not assume `public/` gets copied.
- `deck-dist/` and `artifacts/` are ignored outputs. Do not commit generated bundles or screenshots unless asked.

## Visual direction

Maintain a polished, restrained **dark developer-conference aesthetic**:

- Midnight-blue base (`#0B1020`), secondary surface (`#131B2E`), white primary text, readable muted text, cyan (`#38BDF8`) and occasional violet (`#A78BFA`) accents.
- Locally bundled **Inter** for prose and **JetBrains Mono** for code/technical labels. Keep font licenses. No runtime font CDN is needed.
- Large, confident headings, clear hierarchy, generous whitespace and consistent alignment.
- Calm content slides. Reserve soft gradients and abstract geometry for expressive opening, section, demo and closing layouts.
- Avoid neon/glow, busy decoration, emoji-led visual design and distracting motion.
- Use the existing CSS variables instead of introducing near-duplicate colours and spacing values.

The canvas is **1600 × 900 (16:9)**, scaled responsively by Reveal. Horizontal safe margins are 96px and the top margin is 72px. Standard headings are around 64px; body/code text is generally 27–34px. Small metadata is supplementary, not essential content.

**Never solve overflow by introducing slide scrolling or tiny text.** Shorten copy, simplify the composition or split content across slides. Keep content clear of footers and navigation.

## Slide authoring

Reuse complete sections in `index.html`. Every slide uses `slide` plus a layout class:

- `layout-about`
- `layout-title`
- `layout-section`
- `layout-content`
- `layout-comparison`
- `layout-cards`
- `layout-diagram`
- `layout-code`
- `layout-statement`
- `layout-metrics`
- `layout-demo`
- `layout-closing`

Use `bg-atmosphere` selectively. See `README.md` and existing examples for component markup.

When adding or editing slides:

1. Keep content in HTML and styling in the appropriate CSS layer; avoid inline positioning and unnecessary JS abstractions.
2. Give slides/headings unique IDs and maintain `aria-labelledby`. Prefer stable named slide hashes over numeric links.
3. Keep speaker-only detail in `<aside class="notes">`.
4. Use a short lead, a few balanced cards or a diagram rather than dense paragraphs/bullet walls.
5. Update relevant README instructions when structure, layouts or commands change. Avoid hard-coded slide counts that become stale.
6. Preserve semantic links, visible keyboard focus, accessible diagram descriptions and decorative `aria-hidden` markings.

### Code and diagrams

- Code belongs in the existing terminal container with `<pre><code class="language-…" data-trim>`; escape HTML-sensitive characters.
- Prefer roughly nine short lines. Use `language-typescript`, `language-bash` or `language-plaintext` as appropriate. Keep syntax highlighting readable and local.
- Use inline SVG for diagrams with a consistent `viewBox`, rounded rectangular nodes, restrained borders, readable labels and directional arrows.
- Reuse `.diagram-node`, `.connector` and `.edge-label`. Rename SVG marker/title/description IDs when copying diagrams.
- Meaning must not rely solely on colour. Label states, relationships and measurements explicitly.
- Clearly label fictional metrics. Do not imply the sample numbers are measured MTTR results.

### Reveal behavior

Preserve keyboard navigation, overview, fullscreen support, named hashes, speaker notes, slide numbers and progress. Keep slide mode on small screens rather than enabling scroll mode.

Use subtle fades and optional native `.fragment` reveals. Respect `prefers-reduced-motion`, including changes while the deck is open. `window.deck` exposes the Reveal instance for browser inspection and lightweight QA.

## Verification

For presentation changes:

1. Run `npm run deck:build` and `git diff --check`.
2. Open the affected slides in the dev server or production preview when browser automation is available.
3. Wait for `window.deck.isReady()`, `document.fonts.ready` and transitions before screenshots or geometry checks.
4. Review screenshots for clipping, awkward wrapping, alignment, contrast and footer collisions. Build success alone is not visual verification.
5. Check representative sizes: **1366×768**, **1600×900**, **1920×1080**. Review all slides after shared CSS/config changes.
6. Reveal fragments when checking layout; hidden cards are not an empty-content bug. Use `deck.slide(index, 0, fragmentIndex)` or keyboard navigation.
7. For behavioral changes, verify direct hashes, arrows/Space, overview (`Esc`/`O`), speaker view (`S`, allow pop-ups), fullscreen (`F`) and reduced motion.
8. Check console/network errors and ensure fonts, images and highlighting load in the production build too.

PDF export uses `/?print-pdf` (query before hash). Wait for layout, print with backgrounds enabled, no browser headers/footers and no margins. Preserve `pdfSeparateFragments: false` and one page per slide. Check that all fragment content appears and the page count matches the current deck. Do not hard-code the original sampler's page count.

Use available browser automation or existing tooling; do not add a heavyweight test framework solely for this deck. If browser testing is unavailable, report that limitation rather than claiming visual verification.

### Known caveats

- Vite currently emits a non-blocking large-chunk advisory because the existing highlight plugin bundles many languages. Do not restructure the framework merely to silence it.
- Earlier verification covered Chromium. Do not claim Firefox/Safari, physical projector or multi-monitor presenter testing unless actually performed.
- The original sampler had 11 slides; About me adds an opening slide. Derive counts from the current DOM rather than historical documentation.
- `./start-demo` is illustrative; there is no executable live demo in the current presentation.

## Completion reports

Keep responses concise: summarize the change, identify relevant paths, report checks actually run and mention any remaining limitations. When pointing to an edited slide, give its direct hash URL; hot reload may preserve the user's previous slide rather than navigate to the new one.
