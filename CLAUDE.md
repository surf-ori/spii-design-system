# CLAUDE.md

The SPII design system: a static layer on top of oat, published with GitHub Pages (branch `main`, root). See `README.md`.

- No build step for sites. The only generator is `tools/build-assets.py`: run it after changing `spii-deliverables.json` or a pictogram; it rewrites `assets/*.svg`, `assets/hex/*.svg` and the DATA/LOGO blocks in `spii-nav.js`. Don't hand-edit those generated parts.
- The logo is the hexagon diagram of https://surf-ori.github.io/spii-overview/ (two rows of three, reference model on top, tools below, connected). Keep the 1a↔1b, 2a↔2b, 3a↔3b pairing visible in anything you draw.
- English for all user-facing text. Colours in CSS via the tokens, not hard-coded hex values.
- Check changes by serving the repo (`python3 -m http.server`) and looking at `index.html` in light, dark and at phone width.
