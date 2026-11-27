/* SPII design system v0.1: top bar with the site menu, theme choice (system, light, dark), embed
   behaviour, favicon, and window.SPII (the six deliverables, logo URLs).
   Use in <head>, without defer, so the theme is set before anything paints:
     <script src="https://surf-ori.github.io/spii-design-system/spii-nav.js"></script>
   Optional: <div id="spii-topbar"></div> at the top of <body>; otherwise the bar goes first in <body>.
   Options on the script tag: data-topbar="off" (theme and API only), data-feedback="off" (no feedback button).
   The menu follows spii-deliverables.json; tools/build-assets.py copies it in below. */
(function () {
  'use strict';

  var ORIGIN = 'https://surf-ori.github.io/';
  var DS = ORIGIN + 'spii-design-system/';
  var DATA = /* DATA:BEGIN (tools/build-assets.py) */ {"version": "0.1.0", "project": {"name": "Strategic Plan for Integrated Infrastructure", "short": "SPII", "home": "https://surf-ori.github.io/spii-overview/"}, "deliverables": [{"id": "1a", "pair": 1, "kind": "Reference model", "title": "Values and Principles", "short": "Principles", "summary": "Shared values and principles that define a connected Open Science infrastructure.", "url": "https://surf-ori.github.io/spii-1a-values-and-principles/", "repo": "spii-1a-values-and-principles", "colour": "#7B3FB0", "pictogram": "balance"}, {"id": "1b", "pair": 1, "kind": "Tool", "title": "Principles Alignment Assessment Tool", "short": "Alignment", "summary": "Check how far an infrastructure component follows the shared principles.", "url": "https://surf-ori.github.io/spii-1b-principles-alignment-tool/", "repo": "spii-1b-principles-alignment-tool", "colour": "#52247D", "pictogram": "gauge"}, {"id": "2a", "pair": 2, "kind": "Reference model", "title": "Landscape of Open Science infrastructures", "short": "Landscape", "summary": "A map of the ecosystem.", "url": "https://surf-ori.github.io/spii-2a-landscape-researcher-journey/", "repo": "spii-2a-landscape-researcher-journey", "colour": "#E8702A", "pictogram": "journey"}, {"id": "2b", "pair": 2, "kind": "Tool", "title": "Mapping of Infrastructures & Infrastructure development projects", "short": "Mapping", "summary": "Existing components and projects, mapped to find overlaps and gaps.", "url": "https://surf-ori.github.io/spii-2b-infrastructure-mapping/", "repo": "spii-2b-infrastructure-mapping", "colour": "#B04A12", "pictogram": "map"}, {"id": "3a", "pair": 3, "kind": "Reference model", "title": "Practical Interoperability Guidelines", "short": "Guidelines", "summary": "A set of recommendations based on existing standards that form a pathway towards interoperability.", "url": "https://surf-ori.github.io/spii-3a-capabilities-interoperability/", "repo": "spii-3a-capabilities-interoperability", "colour": "#1F86C1", "pictogram": "interop"}, {"id": "3b", "pair": 3, "kind": "Tool", "title": "Interoperability Assessment Tool", "short": "Assessment", "summary": "Check to what extent an infrastructure component follows the Interoperability Guidelines.", "url": "https://surf-ori.github.io/spii-3b-toolbox-shared-tools/", "repo": "spii-3b-toolbox-shared-tools", "colour": "#145F8C", "pictogram": "checklist"}], "activities": {"_about": "The research landscape: two groups of research activities, each with an icon (20 x 20, stroke drawings). Source of assets/icons/activities/ and of SPII.activities in spii-nav.js; run tools/build-assets.py after a change.", "groups": [{"id": "life-cycle", "title": "Research life cycle activities", "short": "Research life cycle", "colourToken": "--spii-green", "items": [{"name": "Discover", "slug": "discover", "svg": "<circle cx=\"8\" cy=\"8\" r=\"5\" /><path d=\"M15.5 15.5L11.8 11.8\" stroke-linecap=\"round\" />"}, {"name": "Hypothesise", "slug": "hypothesise", "svg": "<path d=\"M10 2.5a5 5 0 00-3 9c.6.5 1 1.3 1 2.1V15h4v-1.4c0-.8.4-1.6 1-2.1a5 5 0 00-3-9z\" stroke-linejoin=\"round\" /><path d=\"M8 17.5h4M8.5 15h3\" stroke-linecap=\"round\" />"}, {"name": "Plan", "slug": "plan", "svg": "<rect x=\"5\" y=\"3.5\" width=\"10\" height=\"14\" rx=\"1.5\" /><path d=\"M8 3.5V3a2 2 0 014 0v.5\" /><path d=\"M7.5 9.5l1.3 1.3L11.5 8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M7.5 14h5\" stroke-linecap=\"round\" />"}, {"name": "Collect", "slug": "collect", "svg": "<path d=\"M4 12.5V15a1 1 0 001 1h10a1 1 0 001-1v-2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M10 3v9.5M6.5 9l3.5 3.5L13.5 9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />"}, {"name": "Process", "slug": "process", "svg": "<g transform=\"scale(0.8333)\" stroke-width=\"1.92\"><circle cx=\"12\" cy=\"12\" r=\"3\" /><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\" /></g>"}, {"name": "Analyse", "slug": "analyse", "svg": "<path d=\"M4.5 16.5v-5M10 16.5v-9M15.5 16.5V8\" stroke-linecap=\"round\" /><path d=\"M3.5 16.5h13\" stroke-linecap=\"round\" />"}, {"name": "Report", "slug": "report", "svg": "<path d=\"M6 2.5h6l3 3v11a1 1 0 01-1 1H6a1 1 0 01-1-1v-13a1 1 0 011-1z\" stroke-linejoin=\"round\" /><path d=\"M12 2.5v3h3\" stroke-linejoin=\"round\" /><path d=\"M7.5 10.5h5M7.5 13h5\" stroke-linecap=\"round\" />"}]}, {"id": "administration", "title": "Research administrative activities", "short": "Research administration", "colourToken": "--spii-1b-ink", "items": [{"name": "Manage & Organise", "slug": "manage-organise", "svg": "<rect x=\"3.5\" y=\"3.5\" width=\"5.5\" height=\"5.5\" rx=\"1\" /><rect x=\"11\" y=\"3.5\" width=\"5.5\" height=\"5.5\" rx=\"1\" /><rect x=\"3.5\" y=\"11\" width=\"5.5\" height=\"5.5\" rx=\"1\" /><rect x=\"11\" y=\"11\" width=\"5.5\" height=\"5.5\" rx=\"1\" />"}, {"name": "Document & Preserve", "slug": "document-preserve", "svg": "<rect x=\"3\" y=\"4\" width=\"14\" height=\"3.5\" rx=\"1\" /><path d=\"M4 7.5V15a1 1 0 001 1h10a1 1 0 001-1V7.5\" stroke-linejoin=\"round\" /><path d=\"M8.3 11h3.4\" stroke-linecap=\"round\" />"}, {"name": "Review & Curate", "slug": "review-curate", "svg": "<path d=\"M2.5 10S5.5 4.5 10 4.5 17.5 10 17.5 10 14.5 15.5 10 15.5 2.5 10 2.5 10z\" stroke-linejoin=\"round\" /><circle cx=\"10\" cy=\"10\" r=\"2.3\" />"}, {"name": "Publish & Communicate", "slug": "publish-communicate", "svg": "<path d=\"M3 8.5v3a1 1 0 001 1h1.3l6.7 3V4.5l-6.7 3H4a1 1 0 00-1 1z\" stroke-linejoin=\"round\" /><path d=\"M15 7.5a3 3 0 010 5\" stroke-linecap=\"round\" /><path d=\"M6 12.5v2.3a1 1 0 001 1h.6a1 1 0 001-1v-1.8\" stroke-linejoin=\"round\" />"}, {"name": "Evaluate & Monitor", "slug": "evaluate-monitor", "svg": "<path d=\"M3 14.5a7 7 0 0114 0\" stroke-linecap=\"round\" /><path d=\"M10 14.5l3.2-4.2\" stroke-linecap=\"round\" /><circle cx=\"10\" cy=\"14.5\" r=\"1.1\" />"}]}]}} /* DATA:END */;

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
  // The research landscape: two groups of activities with their icons (spii-deliverables.json "activities").
  API.activities = (DATA.activities && DATA.activities.groups) || [];
  API.activity = function (name) {
    for (var g = 0; g < API.activities.length; g++) for (var i = 0; i < API.activities[g].items.length; i++) {
      var it = API.activities[g].items[i];
      if (it.name === name || it.slug === name) return { name: it.name, slug: it.slug, svg: it.svg, group: API.activities[g].id };
    }
    return null;
  };
  // Inline SVG markup of an activity icon (stroke in the text colour unless a colour is given).
  API.activityIcon = function (name, size, colour) {
    var a = API.activity(name);
    if (!a) return '';
    size = size || 20;
    return '<svg viewBox="0 0 20 20" width="' + size + '" height="' + size + '" fill="none" stroke="' + (colour || 'currentColor') + '" stroke-width="1.6" aria-hidden="true">' + a.svg + '</svg>';
  };
  API.assets = { activity: function (slug) { return DS + 'assets/icons/activities/' + slug + '.svg'; }, logo: DS + 'assets/spii-logo.svg', logoPictograms: DS + 'assets/spii-logo-pictograms.svg', favicon: DS + 'assets/favicon.svg', hex: function (id) { return DS + 'assets/hex/' + id + '.svg'; } };
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

  /* ---------- Feedback button ----------
     A floating button at the bottom right of every page (as on the DURF sites). It opens a short,
     inviting dialog; "Continue on GitHub" opens the issue form (.github/ISSUE_TEMPLATE/feedback.yml)
     of the repo the page lives in, with the text filled in. Built in a shadow root, so it never clashes
     with the page's own styles, while it still reads the SPII tokens.
     On <html>: data-feedback-repo (override the repo), data-feedback-field (the form field that gets
     the text, default "feedback"), data-feedback-email (also offer e-mail). Off: data-feedback="off"
     on the script tag, and in embeds. */
  var ORG = 'https://github.com/surf-ori/';
  var FB_REPOS = ['spii-overview', 'spii-design-system'];

  function feedbackRepo() {
    var seg = location.pathname.split('/').filter(Boolean)[0];
    var known = FB_REPOS.concat(API.deliverables.map(function (d) { return d.repo; }));
    return root.getAttribute('data-feedback-repo') || (known.indexOf(seg) >= 0 ? seg : 'spii-overview');
  }

  function pageUrl() {
    var u = new URL(location.href);
    u.searchParams.delete('embed');
    return u.toString();
  }

  var FB_CSS =
    ':host{all:initial}*{box-sizing:border-box}' +
    '.fab{position:fixed;right:max(1rem,env(safe-area-inset-right));bottom:max(1rem,env(safe-area-inset-bottom));z-index:90;display:inline-flex;align-items:center;gap:.5rem;' +
      'padding:.6rem 1rem;border:0;border-radius:999px;cursor:pointer;font:600 .9375rem/1.2 var(--font-sans,system-ui,sans-serif);' +
      'background:var(--spii-green,#1f5c43);color:var(--accent-on,#fff);box-shadow:0 .25rem 1rem rgba(0,0,0,.2)}' +
    '.fab:hover{filter:brightness(1.08)}.fab:focus-visible{outline:2px solid var(--foreground,#161f18);outline-offset:3px}' +
    '.fab svg{width:1.1rem;height:1.1rem}' +
    '@media (max-width:40rem){.fab span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.fab{padding:.75rem}}' +
    '@media print{.fab{display:none}}' +
    'dialog{width:min(34rem,calc(100vw - 2rem));max-height:calc(100dvh - 2rem);padding:0;border:1px solid var(--border,#d9d4c3);border-radius:.75rem;' +
      'background:var(--card,#fff);color:var(--foreground,#161f18);font:400 1rem/1.55 var(--font-sans,system-ui,sans-serif);box-shadow:0 1.5rem 3rem rgba(0,0,0,.3)}' +
    'dialog::backdrop{background:rgba(16,20,15,.5)}' +
    'form{display:flex;flex-direction:column;max-height:calc(100dvh - 2rem);margin:0}' +
    '.body{padding:1.25rem 1.5rem .5rem;overflow-y:auto}' +
    'h2{margin:0 0 .5rem;font:700 1.375rem/1.25 var(--font-heading,var(--font-sans,system-ui,sans-serif));letter-spacing:-.01em}' +
    'p{margin:0 0 .75rem}.muted{color:var(--muted-foreground,#4d5850);font-size:.875rem}' +
    'a{color:var(--link,#1f5c43);font-weight:600}' +
    'label{display:block;margin:.75rem 0 .25rem;font-weight:700;font-size:.9375rem}' +
    'textarea{width:100%;min-height:7.5rem;resize:vertical;padding:.55rem .7rem;border:1px solid var(--input,#c9c3b0);border-radius:.5rem;background:var(--background,#fff);color:inherit;font:inherit}' +
    'textarea:focus{outline:2px solid var(--ring,#1f5c43);outline-offset:0;border-color:transparent}' +
    '.page{font-size:.8125rem;color:var(--muted-foreground,#4d5850);overflow-wrap:anywhere}' +
    '.actions{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:flex-end;padding:1rem 1.5rem 1.25rem;border-top:1px solid var(--border,#d9d4c3)}' +
    'button{font:600 .9375rem/1.2 var(--font-sans,system-ui,sans-serif);padding:.6rem 1rem;border-radius:.5rem;cursor:pointer;border:1px solid var(--input,#c9c3b0);background:transparent;color:inherit}' +
    'button.primary{background:var(--spii-green,#1f5c43);border-color:var(--spii-green,#1f5c43);color:var(--accent-on,#fff)}' +
    'button.ghost{border-color:transparent;margin-right:auto}' +
    'button:focus-visible{outline:2px solid var(--ring,#1f5c43);outline-offset:2px}' +
    '.hint{margin:.5rem 0 0;font-size:.8125rem;color:var(--danger,#b3261e)}';

  function buildFeedback() {
    if (document.getElementById('spii-feedback')) return;
    var host = document.createElement('div');
    host.id = 'spii-feedback';
    var sh = host.attachShadow({ mode: 'open' });
    var email = root.getAttribute('data-feedback-email');
    sh.innerHTML = '<style>' + FB_CSS + '</style>' +
      '<button class="fab" type="button" aria-haspopup="dialog">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
        '<span>Feedback</span></button>' +
      '<dialog aria-labelledby="fb-title"><form method="dialog">' +
        '<div class="body">' +
          '<h2 id="fb-title">We would love to hear from you</h2>' +
          '<p>Every remark helps: a question, an idea, something unclear, a typo, or something you liked. SPII is something we build together with the Open Science community.</p>' +
          '<label for="fb-text">Your feedback</label>' +
          '<textarea id="fb-text" placeholder="What would you like to share?"></textarea>' +
          '<p class="page">About: <span id="fb-page"></span></p>' +
          '<p class="hint" id="fb-hint" hidden>Write a few words first, then choose how to send it.</p>' +
          '<p class="muted">On GitHub your feedback becomes a public issue in this site\'s tracker, where you can add more (a GitHub account is needed).' +
            (email ? ' By e-mail it reaches the team directly: <a href="mailto:' + esc(email) + '">' + esc(email) + '</a>.' : '') + '</p>' +
        '</div>' +
        '<div class="actions">' +
          '<button type="submit" class="ghost" value="cancel">Cancel</button>' +
          (email ? '<button type="button" id="fb-mail">Send by e-mail</button>' : '') +
          '<button type="button" class="primary" id="fb-gh">Continue on GitHub</button>' +
        '</div>' +
      '</form></dialog>';

    var dlg = sh.querySelector('dialog'), fab = sh.querySelector('.fab');
    var text = sh.getElementById('fb-text'), hint = sh.getElementById('fb-hint');
    fab.addEventListener('click', function () {
      sh.getElementById('fb-page').textContent = document.title + ' (' + pageUrl() + ')';
      hint.hidden = true;
      dlg.showModal();
      text.focus();
    });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    text.addEventListener('input', function () { if (text.value.trim()) hint.hidden = true; });
    function ready() { if (text.value.trim()) return true; hint.hidden = false; text.focus(); return false; }
    function body() { return text.value + '\n\nPage: ' + pageUrl(); }
    sh.getElementById('fb-gh').addEventListener('click', function () {
      if (!ready()) return;
      var q = new URLSearchParams({ template: 'feedback.yml' });
      q.set(root.getAttribute('data-feedback-field') || 'feedback', body());
      window.open(ORG + feedbackRepo() + '/issues/new?' + q.toString(), '_blank', 'noopener');
      dlg.close();
    });
    if (email) sh.getElementById('fb-mail').addEventListener('click', function () {
      if (!ready()) return;
      location.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Feedback: ' + document.title) + '&body=' + encodeURIComponent(body());
      dlg.close();
    });
    document.body.appendChild(host);
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
    if (!root.hasAttribute('data-embed') && OPT.feedback !== 'off') buildFeedback();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
