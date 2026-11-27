#!/usr/bin/env python3
"""Builds every SVG in assets/ from one place, and copies the deliverables data into spii-nav.js.

Run from the repo root:  python3 tools/build-assets.py
Sources: spii-deliverables.json (titles, colours, pictogram names) and the geometry below.
The logo geometry is the hexagon diagram of https://surf-ori.github.io/spii-overview/
(viewBox 0 0 320 260, hexagons 34 x 50, columns at x = 80/160/240, rows at y = 70/180).
"""
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "spii-deliverables.json").read_text())
ASSETS = ROOT / "assets"

# Brand colours (same as spii.css): light / dark
GREEN, GREEN_DARK = "#1f5c43", "#59b98a"
GREEN_SOFT, GREEN_SOFT_DARK = "#dfe9df", "#1e2c22"
MUTED, MUTED_DARK = "#4d5850", "#9fad9f"
SURFACE, SURFACE_DARK = "#ffffff", "#161c15"
LINE, LINE_DARK = "#d9d4c3", "#2b342a"

COLS = (80, 160, 240)
ROWS = (70, 180)


def hex_points(cx, cy, w=17, h=25, k=12):
    """Pointy-top hexagon as in the overview diagram: half width 17, half height 25, shoulders at +-12."""
    pts = [(cx, cy - h), (cx + w, cy - k), (cx + w, cy + k), (cx, cy + h), (cx - w, cy + k), (cx - w, cy - k)]
    return " ".join(f"{x:g},{y:g}" for x, y in pts)


# Pictograms: white strokes, drawn in a 44 x 44 box around (0, 0).
PICTOGRAMS = {
    # 1a Values and Principles: a balance
    "balance": '<path d="M0 -18V16M-10 16H10M-17 -11H17M-17 -11L-22 3M-17 -11L-12 3M17 -11L12 3M17 -11L22 3"/>'
               '<path d="M-22 3H-12A5 4 0 0 1 -22 3ZM12 3H22A5 4 0 0 1 12 3Z"/><circle cx="0" cy="-18" r="2.2"/>',
    # 1b Principles Alignment Tool: a gauge
    "gauge": '<path d="M-18 8A18 18 0 0 1 18 8"/><path d="M-12.7 -4.7L-10 -2.6M0 -10V-6.5M12.7 -4.7L10 -2.6"/>'
             '<path d="M0 8L9 -4"/><circle cx="0" cy="8" r="2.6"/>',
    # 2a Landscape & Researcher Journey: a route with a destination pin
    "journey": '<path d="M-17 16C-6 16 -14 2 -3 2S6 -8 12 -8" stroke-dasharray="3 4"/><circle cx="-17" cy="16" r="3"/>'
               '<path d="M13 -2C9 -7 7 -10 7 -13A6 6 0 0 1 19 -13C19 -10 17 -7 13 -2Z"/>',
    # 2b Mapping of Infrastructures & Projects: a network
    "network": '<path d="M0 0L0 -15M0 0L-15 -4M0 0L14 -6M0 0L-8 14M0 0L11 13M-15 -4L0 -15L14 -6M-8 14L11 13"/>'
               '<circle cx="0" cy="0" r="3.2"/><circle cx="0" cy="-15" r="2.6"/><circle cx="-15" cy="-4" r="2.6"/>'
               '<circle cx="14" cy="-6" r="2.6"/><circle cx="-8" cy="14" r="2.6"/><circle cx="11" cy="13" r="2.6"/>',
    # 3a Practical Interoperability Guidelines: two linked rings
    "interop": '<circle cx="-6" cy="0" r="11"/><circle cx="6" cy="0" r="11"/>',
    # 3b Interoperability Assessment Tool: a toolbox
    "toolbox": '<rect x="-18" y="-6" width="36" height="22" rx="2.5"/><path d="M-7 -6V-12H7V-6M-18 3H18M-3 3V7H3V3"/>',
}


def pictogram(name, cx, cy, scale, stroke):
    return (f'<g transform="translate({cx:g} {cy:g}) scale({scale:g})" fill="none" stroke="#fff" '
            f'stroke-width="{stroke / scale:g}" stroke-linecap="round" stroke-linejoin="round">{PICTOGRAMS[name]}</g>')


def dark_style(rules):
    return f'<style>@media (prefers-color-scheme: dark) {{ {rules} }}</style>'


def logo(with_pictograms=False):
    """The six hexagons of the overview page: reference model on top (green), tools below (grey)."""
    lines = "".join(f'<line x1="{x}" y1="{ROWS[0]}" x2="{x}" y2="{ROWS[1]}"/>' for x in COLS)
    lines += f'<line x1="{COLS[0]}" y1="{ROWS[0]}" x2="{COLS[2]}" y2="{ROWS[0]}"/>'
    hexes = []
    for d in DATA["deliverables"]:
        x = COLS[d["pair"] - 1]
        y = ROWS[0] if d["kind"] == "Reference model" else ROWS[1]
        cls = "model" if y == ROWS[0] else "tool"
        if with_pictograms:
            hexes.append(f'<a href="{d["url"]}"><title>{html.escape(d["id"].upper() + " " + d["title"])}</title>'
                         f'<polygon points="{hex_points(x, y)}" fill="{d["colour"]}" stroke="{d["colour"]}" stroke-width="3" stroke-linejoin="round"/>'
                         f'{pictogram(d["pictogram"], x, y, 0.62, 2.2)}</a>')
        else:
            hexes.append(f'<polygon class="{cls}" points="{hex_points(x, y)}"/>')
    style = (f'.lines{{stroke:{LINE}}} .model{{fill:{GREEN_SOFT};stroke:{GREEN}}} .tool{{fill:{SURFACE};stroke:{MUTED}}}'
             + dark_style(f'.lines{{stroke:{LINE_DARK}}} .model{{fill:{GREEN_SOFT_DARK};stroke:{GREEN_DARK}}} .tool{{fill:{SURFACE_DARK};stroke:{MUTED_DARK}}}'))
    style = style.replace("<style>", "").replace("</style>", "")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 25 240 200" role="img" aria-label="SPII: three reference model parts, each with its tool">'
            f'<style>{style}</style>'
            f'<g class="lines" fill="none" stroke-width="1.5">{lines}</g>'
            f'<g stroke-width="1.5">{"".join(hexes)}</g></svg>\n')


def logo_inline():
    """The logo for the top bar, coloured with the page's tokens so it follows the site's theme choice."""
    lines = "".join(f'<line x1="{x}" y1="{ROWS[0]}" x2="{x}" y2="{ROWS[1]}"/>' for x in COLS)
    lines += f'<line x1="{COLS[0]}" y1="{ROWS[0]}" x2="{COLS[2]}" y2="{ROWS[0]}"/>'
    hexes = "".join(f'<polygon points="{hex_points(x, y)}" fill="var(--{f})" stroke="var(--{s})"/>'
                    for y, f, s in ((ROWS[0], "spii-green-soft", "spii-green"), (ROWS[1], "card", "muted-foreground")) for x in COLS)
    return (f'<svg viewBox="40 25 240 200" aria-hidden="true"><g fill="none" stroke="var(--border)" stroke-width="4">{lines}</g>'
            f'<g stroke-width="5" stroke-linejoin="round">{hexes}</g></svg>')


def favicon():
    """A square crop of the logo (the left two columns), thicker lines so it reads at 16 px, on a dark tile."""
    lines = (f'<line x1="80" y1="70" x2="160" y2="70"/><line x1="80" y1="70" x2="80" y2="180"/>'
             f'<line x1="160" y1="70" x2="160" y2="180"/>')
    hexes = "".join(f'<polygon points="{hex_points(x, y)}" fill="{fill}" stroke="{stroke}"/>'
                    for x in COLS[:2] for y, fill, stroke in ((ROWS[0], "#1e2c22", GREEN_DARK), (ROWS[1], "#161c15", MUTED_DARK)))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 45 160 160">'
            f'<rect x="40" y="45" width="160" height="160" rx="28" fill="#10140f"/>'
            f'<g fill="none" stroke="#2b342a" stroke-width="5">{lines}</g>'
            f'<g stroke-width="6" stroke-linejoin="round">{hexes}</g></svg>\n')


def deliverable_hex(d):
    """One deliverable: its hexagon in its colour with a white pictogram. Same proportions as the logo."""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -27 40 54" role="img" aria-label="{html.escape(d["id"].upper() + " " + d["title"])}">'
            f'<polygon points="{hex_points(0, 0)}" fill="{d["colour"]}" stroke="{d["colour"]}" stroke-width="3" stroke-linejoin="round"/>'
            f'{pictogram(d["pictogram"], 0, 0, 0.62, 2.2)}</svg>\n')


def blank_hex():
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -27 40 54"><polygon points="{hex_points(0, 0)}" fill="#000" stroke="#000" stroke-width="3" stroke-linejoin="round"/></svg>\n'


def activity_svg(item):
    """One research-activity icon as a file: a 20 x 20 stroke drawing in currentColor (black when used as <img>)."""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" '
            f'stroke-width="1.6" role="img" aria-label="{html.escape(item["name"])}">{item["svg"]}</svg>\n')


def activity_css():
    """One .spii-activity[data-activity="…"] rule per activity (the icon as a mask, so it takes the text colour)."""
    rules = []
    for g in DATA["activities"]["groups"]:
        for i in g["items"]:
            rules.append(f'.spii-activity[data-activity="{i["name"]}"] {{ --spii-activity-icon: url("assets/icons/activities/{i["slug"]}.svg"); }}')
    return "\n".join(rules)


def main():
    (ASSETS / "hex").mkdir(parents=True, exist_ok=True)
    (ASSETS / "spii-logo.svg").write_text(logo())
    (ASSETS / "spii-logo-pictograms.svg").write_text(logo(with_pictograms=True))
    (ASSETS / "favicon.svg").write_text(favicon())
    (ASSETS / "hex" / "hex.svg").write_text(blank_hex())
    for d in DATA["deliverables"]:
        (ASSETS / "hex" / f'{d["id"]}.svg').write_text(deliverable_hex(d))
    (ASSETS / "icons" / "activities").mkdir(parents=True, exist_ok=True)
    for g in DATA["activities"]["groups"]:
        for i in g["items"]:
            (ASSETS / "icons" / "activities" / f'{i["slug"]}.svg').write_text(activity_svg(i))
    css = ROOT / "spii.css"
    css.write_text(re.sub(r"/\* ACTIVITIES:BEGIN.*?ACTIVITIES:END \*/", lambda m: "/* ACTIVITIES:BEGIN (tools/build-assets.py) */\n" + activity_css() + "\n/* ACTIVITIES:END */", css.read_text(), flags=re.S))
    nav = ROOT / "spii-nav.js"
    src = nav.read_text()
    block = "/* DATA:BEGIN (tools/build-assets.py) */ " + json.dumps(DATA, ensure_ascii=False) + " /* DATA:END */"
    src = re.sub(r"/\* DATA:BEGIN.*?DATA:END \*/", lambda m: block, src, flags=re.S)
    logo_block = "/* LOGO:BEGIN */ " + json.dumps(logo_inline()) + " /* LOGO:END */"
    nav.write_text(re.sub(r"/\* LOGO:BEGIN.*?LOGO:END \*/", lambda m: logo_block, src, flags=re.S))
    print("assets and spii-nav.js updated")


if __name__ == "__main__":
    main()
