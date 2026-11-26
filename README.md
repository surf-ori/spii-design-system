# SPII design system

One look for the SPII sites (Strategic Plan for Integrated Infrastructure): tokens, type, the logo, a hexagon with a pictogram per deliverable, and the shared top bar with the site menu and the theme choice. A thin layer on top of [oat](https://oat.ink) (`@knadh/oat@1.0.0`, MIT), modelled on the [DURF design system](https://durf-project.github.io/durf-design-system/).

Documentation with examples: https://surf-ori.github.io/spii-design-system/

## Use in a site

Put this in the head of every page, in this order. Load `spii-nav.js` without `defer`, so the theme is set before anything paints.

    <link rel="stylesheet" href="https://surf-ori.github.io/spii-design-system/lib/oat.min.css">
    <link rel="stylesheet" href="https://surf-ori.github.io/spii-design-system/spii.css">
    <script src="https://surf-ori.github.io/spii-design-system/spii-nav.js"></script>
    <script src="https://surf-ori.github.io/spii-design-system/lib/oat.min.js" defer></script>

The top bar goes first in the body, or at `<div id="spii-topbar"></div>`. `data-topbar="off"` on the script tag keeps only the theme and `window.SPII`. `?embed` in the URL hides the bar, page head and footer.

Optionally give a site the colour of its deliverable: `<html data-accent="2a">` (`1a` … `3b`).

## Files

- `spii.css`: tokens (brand green, the six deliverable colours, oat recoloured, Outfit type), top bar, page head, hexagon, card, tag, callout, colour strip, footer.
- `spii-nav.js`: top bar with the site menu, theme choice (system, light, dark; stored as `spii-theme` in localStorage and shared by all SPII sites), favicon, and `window.SPII` (`deliverables`, `deliverable(id)`, `assets`, `theme()`, `setTheme(t)`, event `spii:theme`).
- `spii-deliverables.json`: the six deliverables (id, kind, title, short label, summary, URL, repo, colour, pictogram). The single source for the menu.
- `assets/spii-logo.svg`: the hexagon diagram of the overview page, as the logo (follows the system's light/dark mode). `assets/spii-logo-pictograms.svg`: large version with the pictograms, each hexagon a link. `assets/favicon.svg`: square crop for browser tabs.
- `assets/hex/<id>.svg`: each deliverable's hexagon with its pictogram; `assets/hex/hex.svg`: the plain shape (for masks).
- `fonts/`: Outfit (SIL Open Font License). `lib/`: oat 1.0.0 (MIT).
- `index.html`: the documentation page, with the interactive six-hexagon figure.

## The six deliverables

| Id | Kind | Title | Colour |
| --- | --- | --- | --- |
| 1A | Reference model | Values and Principles | #7B3FB0 |
| 1B | Tool | Principles Alignment Tool | #52247D |
| 2A | Reference model | Landscape & Researcher Journey | #E8702A |
| 2B | Tool | Mapping of Infrastructures & Projects | #B04A12 |
| 3A | Reference model | Capabilities & Interoperability | #1F86C1 |
| 3B | Tool | Tool Box of Shared Tools | #145F8C |

Each pair shares a hue: the reference model is the lighter tone, its tool the deeper one. In CSS: `--spii-<id>`, `--spii-<id>-ink`, `--spii-<id>-tint`, `--spii-<id>-on`, or `data-deliverable="<id>"` on an element for `--deliv-color`, `--deliv-ink`, `--deliv-tint`, `--deliv-on`.

## Changing the menu, colours or pictograms

Edit `spii-deliverables.json` (and the pictograms in `tools/build-assets.py`), then run

    python3 tools/build-assets.py

It rewrites every SVG in `assets/` and copies the data and the inline logo into `spii-nav.js`. Keep the colours in `spii.css` in step with the JSON.

## Licence

EUPL-1.2, as the DURF design system it is based on. oat: MIT (`lib/oat.LICENSE`). Outfit: SIL Open Font License.
