# Reducing MTTR with AI Agents

A Reveal.js design system and **11-slide layout sampler**, not the final talk. All descriptions, metrics, contact details, and demo commands are placeholders.

## Run the presentation

Requires Node **22.12+** (the existing repository's requirement).

```sh
npm ci                 # Install the existing locked dependencies
npm run dev            # Deck + hot reload at http://localhost:8000
npm run deck:build     # Build the static presentation into deck-dist/
npm run preview        # Serve the production build at http://localhost:4173
```

Serve over HTTP; do not open `index.html` via `file://`. Deploy the contents of `deck-dist/` to any static host. Relative asset URLs support deployment under a subdirectory. Fonts, icons, Reveal, and plugins are bundled locally; no backend or runtime CDN is required.

### Existing repository

This repository includes the Reveal.js framework source, compiled `dist/` assets, upstream examples/tests, and an unrelated React package. The presentation uses the existing compiled Reveal and notes/highlight plugins. No new dependencies or frontend framework were introduced.

`npm run build` still builds the **upstream Reveal library**, not the deck. Use **`npm run deck:build`** for this presentation. `npm start` retains the original framework development server. Upstream files/configuration are preserved; the original README is in [README.reveal.md](README.reveal.md).

## Files and design system

```text
index.html                     All slide content, SVGs and speaker notes
vite.config.deck.js            Separate deck build; leaves dist/ untouched
src/main.js                    Reveal configuration and plugin registration
src/styles/theme.css           Palette, local fonts, type, footer, motion/print
src/styles/layouts.css         Slide compositions and safe-area spacing
src/styles/components.css      Cards, callouts, diagrams, code and metrics
src/assets/fonts/              Inter + JetBrains Mono variable Latin fonts/licenses
```

The midnight-blue canvas uses white text, cyan emphasis, occasional violet, and muted secondary text. Gradients and abstract geometry are reserved for opening/section/demo/closing slides. Content slides remain quiet.

The design canvas is **1600 × 900 (16:9)**, responsively scaled by Reveal. Tokens live in `theme.css`: 96px horizontal safe margins, 72px top margin, an 8px spacing unit, 64px standard headings, and 27–34px body/code text. Small metadata is supplementary, never the only source of important information. Use short copy rather than shrinking fonts or adding scrolling.

## Layout catalogue

Each `section` has the base `slide` class plus one layout class. Open a link by appending its hash to the server URL.

| Layout | Class | Direct link |
|---|---|---|
| A · Title | `layout-title bg-atmosphere` | `#/title` |
| B · Section divider | `layout-section bg-atmosphere` | `#/section` |
| C · Standard content | `layout-content` | `#/content` |
| D · Two-column comparison | `layout-comparison` | `#/comparison` |
| E · Three cards | `layout-cards` | `#/cards` |
| F · Architecture | `layout-diagram` | `#/architecture` |
| G · Code / terminal | `layout-code` | `#/code` |
| H · Big statement | `layout-statement` | `#/statement` |
| I · Metrics | `layout-metrics` | `#/metrics` |
| J · Demo transition | `layout-demo bg-atmosphere` | `#/demo` |
| K · Closing / questions | `layout-closing bg-atmosphere` | `#/closing` |

## Authoring

Copy the closest complete `<section>` in `index.html` inside `.slides`. Give the new slide and heading **unique IDs**, update `aria-labelledby`, and replace the placeholder content and notes. Keep CSS in the three style layers rather than adding inline positioning.

```html
<section id="new-concept" class="slide layout-content" aria-labelledby="new-heading">
  <header>
    <p class="eyebrow">Section / Concept</p>
    <h2 id="new-heading">One clear idea.</h2>
  </header>
  <div class="content-grid">
    <div><p class="lead">Your main thought.</p>
      <p class="body-copy">A short supporting explanation.</p></div>
    <aside class="callout"><p>A useful detail.</p></aside>
  </div>
  <footer class="slide-footer"><span>Reducing MTTR with AI Agents</span></footer>
  <aside class="notes">Details for the presenter, not the audience.</aside>
</section>
```

### Reusable components

- Emphasis: `.accent`, `.muted`, `.mono`, `.eyebrow`, `.rule`, `.divider`.
- Surfaces: `.card`, `.comparison-panel`, `.callout`, `.badge`, `.status-ready`.
- Icons: `.icon-box` with a 24×24 inline SVG, unfilled strokes and rounded caps. Use `aria-hidden="true"` for decorative icons.
- Metrics: `.metrics > .metric`, `.metric-value`, `.metric-label`; add `.featured` for emphasis. Include units, context and real sources when data is available.
- Code: `.terminal`, `.terminal-bar`, `<pre><code class="language-typescript" data-trim>…</code></pre>`. Use `language-bash` for commands, `language-plaintext` for output. Escape `<` and `&` as HTML entities. Prefer around 9 lines and short line lengths; code does not scroll.
- Diagrams: copy the SVG example, retaining `viewBox`, accessible `<title>`/`<desc>`, `.diagram-node`, `.connector` and `.edge-label`. Use `.primary` or `.supporting` sparingly. Rename SVG marker/title/description IDs when duplicating. Labels and arrows communicate meaning independently of colour.
- Animation: optional `.fragment` on cards, text or SVG groups. The card slide demonstrates three sequential reveals. Remove the class for immediate display. Fade transitions and fragments respect reduced-motion preferences; no looping animation is used.

## Presenter shortcuts

| Key | Action |
|---|---|
| Right / Space / N | Next fragment or slide |
| Left / P | Previous fragment or slide |
| Esc / O | Toggle slide overview |
| S | Open speaker view (allow pop-ups) |
| F | Fullscreen (browser support required) |
| B / period | Pause / black out the presentation |
| Home / End | First / last slide |
| G | Jump to a slide number |
| ? | Shortcut help |

Slide numbers and a thin progress indicator are always enabled. Every example includes speaker notes. For reliable direct navigation, use named hashes such as `/#/code`. `window.deck` exposes the Reveal instance for console inspection.

## PDF export

1. Open `http://localhost:8000/?print-pdf` in Chromium/Chrome (query before any hash).
2. Wait for fonts/layout, then print → **Save as PDF**.
3. Enable background graphics, disable browser headers/footers, use no margins and the page size provided by the deck.
4. Review the exported pages before sharing.

The deck uses one page per slide and combines fragments on the same page (`pdfSeparateFragments: false`). Speaker notes are excluded by default. Reload without `?print-pdf` to return to presentation mode. See [Reveal PDF documentation](https://revealjs.com/pdf-export/).

## Verification and limitations

Verified in Chromium against the production preview:

- All 11 layouts reviewed visually; no detected content overflow/footer collisions at 1366×768, 1600×900 and 1920×1080.
- Keyboard navigation, direct hashes, sequential fragments, overview, fullscreen, slide numbers and progress.
- Speaker-view popup connected and displayed the current slide's notes.
- Local fonts and TypeScript syntax highlighting loaded; no runtime JavaScript errors observed.
- Reduced-motion mode selects `none` transitions.
- PDF mode generated 11 pages with all card fragments visible; a PDF was successfully exported.
- `npm run deck:build` succeeds. Vite reports a large-chunk advisory because the existing highlight plugin bundles a broad language set (~358 KB gzip for total JS). This is not a build failure; keeping the native plugin avoids custom language registration infrastructure.

No new testing framework was added. After changing content, review **every** slide at presentation size and in PDF mode, especially code, long headings, diagrams and footers. Firefox/Safari, a physical projector, and presenter display arrangements have not been tested. Latin fonts are bundled; other scripts use system fallbacks. This deck deliberately contains no real incident-response narrative or executable live demo.
