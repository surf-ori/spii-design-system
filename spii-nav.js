/* SPII design system v0.1: top bar with the site menu, theme choice (system, light, dark), embed
   behaviour, favicon, and window.SPII (the six deliverables, logo URLs).
   Use in <head>, without defer, so the theme is set before anything paints:
     <script src="https://surf-ori.github.io/spii-design-system/spii-nav.js"></script>
   Optional: <div id="spii-topbar"></div> at the top of <body>; otherwise the bar goes first in <body>.
   Options on the script tag: data-topbar="off" (theme and API only).
   The menu follows spii-deliverables.json; tools/build-assets.py copies it in below. */
(function () {
  'use strict';

  var ORIGIN = 'https://surf-ori.github.io/';
  var DS = ORIGIN + 'spii-design-system/';
  var DATA = /* DATA:BEGIN (tools/build-assets.py) */ {"version": "0.1.0", "project": {"name": "Strategic Plan for Integrated Infrastructure", "short": "SPII", "home": "https://surf-ori.github.io/spii-overview/"}, "deliverables": [{"id": "1a", "pair": 1, "kind": "Reference model", "title": "Values and Principles", "short": "Principles", "summary": "Shared values and principles that define a connected Open Science infrastructure.", "url": "https://surf-ori.github.io/spii-1a-values-and-principles/", "repo": "spii-1a-values-and-principles", "colour": "#7B3FB0", "pictogram": "balance"}, {"id": "1b", "pair": 1, "kind": "Tool", "title": "Principles Alignment Tool", "short": "Alignment", "summary": "Self-assess how your Open Science infrastructure puts the shared values and principles into practice.", "url": "https://surf-ori.github.io/spii-1b-principles-alignment-tool/", "repo": "spii-1b-principles-alignment-tool", "colour": "#52247D", "pictogram": "gauge"}, {"id": "2a", "pair": 2, "kind": "Reference model", "title": "Landscape & Researcher Journey", "short": "Landscape", "summary": "A map of the ecosystem, seen through the path a researcher actually takes.", "url": "https://surf-ori.github.io/spii-2a-landscape-researcher-journey/", "repo": "spii-2a-landscape-researcher-journey", "colour": "#E8702A", "pictogram": "journey"}, {"id": "2b", "pair": 2, "kind": "Tool", "title": "Mapping of Infrastructures & Projects", "short": "Mapping", "summary": "Existing components and projects, mapped to find overlaps and gaps.", "url": "https://surf-ori.github.io/spii-2b-infrastructure-mapping/", "repo": "spii-2b-infrastructure-mapping", "colour": "#B04A12", "pictogram": "network"}, {"id": "3a", "pair": 3, "kind": "Reference model", "title": "Capabilities & Interoperability", "short": "Interoperability", "summary": "The functions every component needs, and how they connect across domains.", "url": "https://surf-ori.github.io/spii-3a-capabilities-interoperability/", "repo": "spii-3a-capabilities-interoperability", "colour": "#1F86C1", "pictogram": "interop"}, {"id": "3b", "pair": 3, "kind": "Tool", "title": "Tool Box of Shared Tools", "short": "Toolbox", "summary": "A shared set of reusable tools that put interoperability into practice.", "url": "https://surf-ori.github.io/spii-3b-toolbox-shared-tools/", "repo": "spii-3b-toolbox-shared-tools", "colour": "#145F8C", "pictogram": "toolbox"}]} /* DATA:END */;

  var LOGO = /* LOGO:BEGIN */ "<svg viewBox=\"40 25 240 200\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"var(--border)\" stroke-width=\"4\"><line x1=\"80\" y1=\"70\" x2=\"80\" y2=\"180\"/><line x1=\"160\" y1=\"70\" x2=\"160\" y2=\"180\"/><line x1=\"240\" y1=\"70\" x2=\"240\" y2=\"180\"/><line x1=\"80\" y1=\"70\" x2=\"240\" y2=\"70\"/></g><g stroke-width=\"5\" stroke-linejoin=\"round\"><polygon points=\"80,45 97,58 97,82 80,95 63,82 63,58\" fill=\"var(--spii-green-soft)\" stroke=\"var(--spii-green)\"/><polygon points=\"160,45 177,58 177,82 160,95 143,82 143,58\" fill=\"var(--spii-green-soft)\" stroke=\"var(--spii-green)\"/><polygon points=\"240,45 257,58 257,82 240,95 223,82 223,58\" fill=\"var(--spii-green-soft)\" stroke=\"var(--spii-green)\"/><polygon points=\"80,155 97,168 97,192 80,205 63,192 63,168\" fill=\"var(--card)\" stroke=\"var(--muted-foreground)\"/><polygon points=\"160,155 177,168 177,192 160,205 143,192 143,168\" fill=\"var(--card)\" stroke=\"var(--muted-foreground)\"/><polygon points=\"240,155 257,168 257,192 240,205 223,192 223,168\" fill=\"var(--card)\" stroke=\"var(--muted-foreground)\"/></g></svg>" /* LOGO:END */;

  var root = document.documentElement;
  var KEY = 'spii-theme';
  var SCRIPT = document.currentScript || {};
  var OPT = SCRIPT.dataset || {};

  // Theme as early as possible, against a flash of the wrong theme. "system" = no data-theme.
  function readTheme() { try { return localStorage.getItem(KEY) || 'system'; } catch (e) { return 'system'; } }
  function applyTheme(t) {
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
    else root.removeAttribute('data-theme');
  }
  function setTheme(t) {
    t = t === 'light' || t === 'dark' ? t : 'system';
    try { if (t === 'system') localStorage.removeItem(KEY); else localStorage.setItem(KEY, t); } catch (e) {}
    applyTheme(t);
    document.dispatchEvent(new CustomEvent('spii:theme', { detail: { theme: t } }));
  }
  applyTheme(readTheme());

  var API = window.SPII = window.SPII || {};
  API.version = DATA.version;
  API.base = DS;
  API.project = DATA.project;
  API.deliverables = DATA.deliverables || [];
  API.deliverable = function (id) { return API.deliverables.filter(function (d) { return d.id === String(id).toLowerCase(); })[0] || null; };
  API.assets = { logo: DS + 'assets/spii-logo.svg', logoPictograms: DS + 'assets/spii-logo-pictograms.svg', favicon: DS + 'assets/favicon.svg', hex: function (id) { return DS + 'assets/hex/' + id + '.svg'; } };
  API.theme = readTheme;
  API.setTheme = setTheme;

  // Embed mode: ?embed hides the bar, page head and footer.
  if (new URLSearchParams(location.search).has('embed')) root.setAttribute('data-embed', '');

  var ICON = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    system: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>'
  };
  var NEXT = { system: 'light', light: 'dark', dark: 'system' };
  var NAME = { system: 'Theme: system', light: 'Theme: light', dark: 'Theme: dark' };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build() {
    var host = document.getElementById('spii-topbar');
    var bar = document.createElement('header');
    bar.className = 'spii-topbar';
    var current = location.pathname.split('/').filter(Boolean)[0];
    var home = DATA.project.home;
    var links = '<li><a href="' + home + '"' + (current === 'spii-overview' ? ' aria-current="page"' : '') + '>Overview</a></li>' +
      API.deliverables.map(function (d) {
        var here = d.repo === current;
        return '<li data-deliverable="' + d.id + '"><a href="' + esc(d.url) + '" title="' + esc(d.id.toUpperCase() + ' ' + d.title) + '"' + (here ? ' aria-current="page"' : '') + '>' +
          '<span class="spii-hex-shape" aria-hidden="true"></span><span class="code">' + d.id.toUpperCase() + '</span>' + esc(d.short) + '</a></li>';
      }).join('');

    bar.innerHTML =
      '<div class="spii-topbar__inner">' +
        '<a class="spii-topbar__brand" href="' + home + '">' + LOGO + 'SPII</a>' +
        '<nav aria-label="SPII"><ul class="spii-topbar__nav" id="spii-nav-list">' + links + '</ul></nav>' +
        '<span class="spii-topbar__spacer"></span>' +
        '<button class="spii-topbar__btn" type="button" id="spii-theme-btn"></button>' +
        '<button class="spii-topbar__btn spii-topbar__menu-btn" type="button" aria-controls="spii-nav-list" aria-expanded="false" aria-label="Menu">' + ICON.menu + '</button>' +
      '</div>';
    bar.querySelector('nav').style.display = 'contents';   // the list itself sits against the bar on mobile
    if (host) host.replaceWith(bar); else document.body.insertBefore(bar, document.body.firstChild);

    var themeBtn = bar.querySelector('#spii-theme-btn');
    function paint() {
      var t = readTheme();
      themeBtn.innerHTML = ICON[t];
      themeBtn.setAttribute('aria-label', NAME[t] + ' (click to change)');
      themeBtn.title = NAME[t];
    }
    themeBtn.addEventListener('click', function () { setTheme(NEXT[readTheme()]); });
    document.addEventListener('spii:theme', paint);
    paint();

    var menuBtn = bar.querySelector('.spii-topbar__menu-btn');
    function setOpen(open) { bar.toggleAttribute('data-open', open); menuBtn.setAttribute('aria-expanded', String(open)); }
    menuBtn.addEventListener('click', function () { setOpen(!bar.hasAttribute('data-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  function favicon() {
    if (document.querySelector('link[rel~="icon"]')) return;
    var l = document.createElement('link');
    l.rel = 'icon'; l.type = 'image/svg+xml'; l.href = API.assets.favicon;
    document.head.appendChild(l);
  }

  function start() {
    favicon();
    if (OPT.topbar !== 'off') build();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
