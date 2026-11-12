/* ==========================================================================
   VISHAISH KUMAR KASHYAP — Portfolio engine
   Vanilla JS. No dependencies. Everything reads from window.SITE (config.js).
   ========================================================================== */
(function () {
  'use strict';

  var S = window.SITE || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COARSE  = window.matchMedia('(pointer: coarse)').matches;

  var SOCIAL_ICON = { instagram:'i-ig', youtube:'i-yt', linkedin:'i-li', x:'i-x' };
  var PLATFORM = {
    youtube:   { label:'YouTube',   icon:'i-yt', tag:'yt' },
    instagram: { label:'Instagram', icon:'i-ig', tag:'ig' },
    linkedin:  { label:'LinkedIn',  icon:'i-li', tag:'li' }
  };

  /* ══════════════════════════════════════════════════ 1. RENDER: STATIC ══ */

  $('#navMark').textContent = S.name.initials || 'VK';
  $('#navName').textContent = S.name.full;
  $('#navRole').textContent = S.role;
  $('#navAvail').lastChild.textContent = S.availability;
  $('#heroRole').textContent = S.role;
  $('#heroFirst').textContent = S.name.first;
  $('#heroLast').textContent  = S.name.last;
  $('#heroTagline').textContent = S.tagline;
  $('#heroLocation').textContent = S.location;
  $('#loaderName').innerHTML = (S.name.first + ' ' + S.name.last)
    .split('').map(function (c, i) {
      return '<span style="animation-delay:' + (i * 0.035) + 's">' + (c === ' ' ? '&nbsp;' : c) + '</span>';
    }).join('');
  $('#footName').textContent = S.name.first + ' ' + S.name.last;
  $('#footCopy').textContent = S.copyright;
  $('#footNote').textContent = S.footerNote;

  document.title = S.name.full + ' · ' + S.role.replace(/ · /g, ' & ');
  var md = $('meta[name="description"]');
  if (md) md.setAttribute('content', S.tagline);
  var ogT = $('meta[property="og:title"]');
  if (ogT) ogT.setAttribute('content', document.title);
  var ogD = $('meta[property="og:description"]');
  if (ogD) ogD.setAttribute('content', S.tagline);

  function socialButtons(target, cls) {
    var el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    el.innerHTML = (S.socials || []).map(function (s) {
      return '<a class="' + cls + '" href="' + s.url + '" target="_blank" rel="noopener" title="' + s.label + '">' +
             '<svg class="ic"><use href="#' + (SOCIAL_ICON[s.key] || 'i-arr') + '"/></svg>' +
             '<span>' + s.label + '</span></a>';
    }).join('');
  }
  socialButtons('#contactSocials', 'socbtn');
  socialButtons('#workChannels', '');

  $('#footSocials').innerHTML = (S.socials || []).map(function (s) {
    return '<a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' +
           '<svg class="ic"><use href="#' + (SOCIAL_ICON[s.key] || 'i-arr') + '"/></svg></a>';
  }).join('');

  $('#mobmenuList').innerHTML = [
    ['#about','01','About'], ['#insights','02','Insights'], ['#brands','03','Brands'],
    ['#work','04','Work'], ['#why','05','Why me'], ['#formats','06','Formats'],
    ['#words','07','Reviews'], ['#anchor','08','Anchor'], ['#contact','09','Contact']
  ].map(function (r) {
    return '<a href="' + r[0] + '" data-mclose><span class="mono">' + r[1] + '</span>' + r[2] + '</a>';
  }).join('');
  $('#mobmenuSocials').innerHTML = (S.socials || []).map(function (s) {
    return '<a href="' + s.url + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' +
           '<svg class="ic"><use href="#' + (SOCIAL_ICON[s.key] || 'i-arr') + '"/></svg></a>';
  }).join('');

  // Contact links ---------------------------------------------------------
  var mailto = 'mailto:' + S.email;
  $('#ctaMail').href = mailto;
  $('#mailDisplay').textContent = S.email;
  $('#footMail').href = mailto;
  $('#footMail').textContent = S.email;
  $('#mobmenuMail').href = mailto;
  $('#mobmenuMail').textContent = S.email;

  // A one-click mailto brief: opens the visitor's mail app with the details
  // I need already laid out. No form, no backend, no WhatsApp.
  var briefBody = [
    'Hi ' + (S.name.first || '') + ',',
    '',
    'Brand / company:',
    'Campaign type (brand film, reels, event anchoring, on-ground reporting):',
    'Deliverables needed:',
    'Budget range:',
    'Timeline / event date:',
    '',
    'What we want to make:',
    '',
    '',
    'Sent from ' + document.title
  ].join('\n');
  var briefHref = 'mailto:' + S.email +
    '?subject=' + encodeURIComponent('Brand collaboration enquiry') +
    '&body=' + encodeURIComponent(briefBody);

  var briefBtn = $('#briefBtn');
  if (briefBtn) briefBtn.href = briefHref;
  var footBrief = $('#footBrief');
  if (footBrief) footBrief.href = briefHref;
  $('#workCta').href = mailto;
  $('#workCta').querySelector('span').textContent = 'Ask me directly';

  // Ticker ----------------------------------------------------------------
  var tickerItems = (S.ticker && S.ticker.length) ? S.ticker : [S.role];
  var tItems = tickerItems.map(function (t, i) {
    return '<span class="ticker__item' + (i % 3 === 1 ? ' ticker__item--accent' : '') + '">' + t + '<i></i></span>';
  }).join('');
  $('#tickerTrack').innerHTML = tItems + tItems;

  // About -----------------------------------------------------------------
  var ABOUT = S.about || {};
  var statementWords = (ABOUT.statement || '').split(' ');
  var accentSet = (ABOUT.accent || []).map(function (w) { return w.toLowerCase(); });
  $('#aboutStatement').innerHTML = statementWords.map(function (w, i) {
    var clean = w.replace(/[^A-Za-z]/g, '').toLowerCase();
    var raw = w.replace(/[^a-z0-9+]/gi, '').toLowerCase();
    var isAccent = accentSet.indexOf(clean) > -1 || accentSet.indexOf(raw) > -1;
    return '<span class="w' + (isAccent ? ' accent' : '') + '" data-i="' + i + '">' + w + '</span>';
  }).join(' ');
  $('#aboutP1').textContent = ABOUT.p1 || '';
  $('#aboutP2').textContent = ABOUT.p2 || '';
  $('#aboutSigName').textContent = S.name.full;
  $('#aboutSigRole').textContent = S.role;
  $('#aboutPriority').innerHTML = (ABOUT.priority || []).map(function (p, i) {
    return '<article class="pcard" data-reveal="up" data-d="' + i + '">' +
      '<span class="pcard__n">0' + (i + 1) + '</span>' +
      '<span class="pcard__ic"><svg class="ic"><use href="#i-' + p.icon + '"/></svg></span>' +
      '<h3 class="pcard__t">' + p.title + '</h3>' +
      '<p class="pcard__b">' + p.body + '</p>' +
    '</article>';
  }).join('');

  /* ══════════════════════════════════════════ 2b. AUDIENCE INSIGHTS ═══ */
  var INS = S.insights || {};
  $('#insightRange').textContent = INS.range || '';
  $('#insightHeadline').textContent = INS.headline || '';
  $('#insightIntro').textContent = INS.intro || '';

  $('#insightStats').innerHTML = (INS.stats || []).map(function (s, i) {
    return '<div class="istat2" data-reveal="up" data-d="' + i + '">' +
      '<div class="istat2__v"' + (s.live ? ' data-live="' + s.live + '"' : '') + '>' +
        s.value + (s.suffix ? '<small>' + s.suffix + '</small>' : '') + '</div>' +
      '<div class="istat2__l">' + s.label + '</div>' +
      '<div class="istat2__n">' + (s.note || '') + '</div>' +
    '</div>';
  }).join('');

  $('#insightChannels').innerHTML = (INS.channels || []).map(function (c, i) {
    return '<div class="chan" data-reveal="up" data-d="' + i + '">' +
      '<div class="chan__head">' +
        '<span class="chan__ic"><svg class="ic"><use href="#' + c.icon + '"/></svg></span>' +
        '<span><span class="chan__name">' + c.platform + '</span><br>' +
        '<span class="chan__handle">' + c.handle + '</span></span>' +
      '</div>' +
      '<div class="chan__stats">' + (c.stats || []).map(function (s) {
        return '<div class="chan__stat"><b' + (s.live ? ' data-live="' + s.live + '"' : '') + '>' +
          s.value + '</b><span>' + s.label + '</span></div>';
      }).join('') + '</div>' +
    '</div>';
  }).join('');

  $('#insightGroups').innerHTML = (INS.groups || []).map(function (g, gi) {
    var rows = (g.rows || []).map(function (r, ri) {
      var v = typeof r.value === 'number' ? r.value : 0;
      return '<div class="ibar">' +
        '<span class="ibar__label">' + r.label + '</span>' +
        '<span class="ibar__track"><i class="ibar__fill" data-pct="' + Math.min(100, v) + '" style="--bd:' + (gi * 90 + ri * 70) + 'ms"></i></span>' +
        '<span class="ibar__val">' + v + '%</span>' +
      '</div>';
    }).join('');
    return '<div class="igroup" data-reveal="up" data-d="' + gi + '">' +
      '<span class="igroup__title">' + g.title + '</span><div class="ibars">' + rows + '</div></div>';
  }).join('');

  /* ═══════════════════════════════════════ 2c. BRANDS: TWO SCROLLING ROWS ═ */
  var BRANDS = S.brands || [];

  function brandTile(b, isCopy) {
    var logoCls = b.blend === 'invert' ? ' is-invert' : (b.blend === 'screen' ? ' is-screen' : '');
    return '<a class="btile2" href="' + b.url + '" target="_blank" rel="noopener" data-brand="' + b.key + '"' +
      (isCopy ? ' tabindex="-1"' : '') + '>' +
      (b.pending ? '<span class="btile2__badge">Coming soon</span>' : '') +
      '<span class="btile2__logo"><img src="assets/img/brands/' + b.logo + '" class="' + logoCls.trim() + '" alt="' + (isCopy ? '' : b.name) + '" loading="lazy" aria-hidden="true"></span>' +
      '<span class="btile2__txt"><span class="btile2__name">' + b.name + '</span>' +
      '<span class="btile2__cat mono">' + b.category + '</span></span>' +
      '<span class="btile2__go"><svg class="ic" aria-hidden="true"><use href="#i-arr"/></svg></span>' +
    '</a>';
  }
  var rowA = BRANDS.slice(0, 7);
  var rowB = BRANDS.slice(7);
  $('#brandRowA').innerHTML = '<div class="brow__set">' + rowA.map(function (b) { return brandTile(b, false); }).join('') + '</div>' +
                              '<div class="brow__set" aria-hidden="true">' + rowA.map(function (b) { return brandTile(b, true); }).join('') + '</div>';
  $('#brandRowB').innerHTML = '<div class="brow__set">' + rowB.map(function (b) { return brandTile(b, false); }).join('') + '</div>' +
                              '<div class="brow__set" aria-hidden="true">' + rowB.map(function (b) { return brandTile(b, true); }).join('') + '</div>';

  /* ══════════════════════════════════════════════════ 3. WORK GRID ═══ */

  var WORKS = S.work || [];
  var FEATURED = WORKS.filter(function (w) { return w.featured; })
                     .sort(function (a, b) {
                       if (!!b.pin !== !!a.pin) return b.pin ? 1 : -1;
                       return (b.reach || 0) - (a.reach || 0);
                     });

  var filters = [{ key: 'all', label: 'All work' }].concat(
    Object.keys(PLATFORM).filter(function (p) {
      return FEATURED.some(function (w) { return w.platform === p; });
    }).map(function (p) { return { key: p, label: PLATFORM[p].label }; })
  );
  $('#workFilters').innerHTML = filters.map(function (f, i) {
    var n = f.key === 'all' ? FEATURED.length : FEATURED.filter(function (w) { return w.platform === f.key; }).length;
    return '<button data-filter="' + f.key + '"' + (i === 0 ? ' class="is-active"' : '') + '>' +
           f.label + ' <span style="opacity:.8">' + n + '</span></button>';
  }).join('');

  function workCard(w, i) {
    var p = PLATFORM[w.platform] || PLATFORM.instagram;
    var visual = w.thumb
      ? '<img src="' + w.thumb + '" alt="' + w.title + '" loading="lazy" />'
      : '<span class="wcard__tile">' + (w.platform === 'instagram' ? 'IG' : w.platform === 'linkedin' ? 'in' : 'YT') + '</span>';
    return '<article class="wcard wcard--' + p.tag + '" data-platform="' + w.platform + '" data-reveal="up" data-d="' + (i % 3) + '">' +
      '<div class="wcard__thumb">' + visual +
        '<span class="wcard__sweep"></span>' +
        '<span class="wcard__badge"><svg class="ic"><use href="#' + p.icon + '"/></svg>' + p.label + '</span>' +
        (w.duration ? '<span class="wcard__dur">' + w.duration + '</span>' : '') +
        '<button class="wcard__play" data-preview data-title="' + w.title.replace(/"/g, '&quot;') + '" ' +
          'data-platform="' + w.platform + '" data-embed="' + w.embed + '" data-url="' + w.url + '" ' +
          'data-brand="' + (w.brand || '') + '" data-metric="' + (w.metric || '') + '" aria-label="Preview: ' + w.title + '">' +
          '<svg class="ic"><use href="#i-play"/></svg></button>' +
      '</div>' +
      '<div class="wcard__body">' +
        (w.brand ? '<span class="wcard__brand">' + w.brand + '</span>' : '') +
        '<h3 class="wcard__title">' + w.title + '</h3>' +
        '<div class="wcard__foot">' +
          '<span class="wcard__metric"><b>' + (w.metric || '') + '</b><span>' + (w.metricLabel || '') + '</span></span>' +
          '<a class="wcard__link" href="' + w.url + '" target="_blank" rel="noopener">' +
            'View on ' + p.label + '<svg class="ic"><use href="#i-arr"/></svg></a>' +
        '</div>' +
      '</div>' +
    '</article>';
  }
  $('#workGrid').innerHTML = FEATURED.map(workCard).join('');

  // Platform filter
  $('#workFilters').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-filter]');
    if (!btn) return;
    var key = btn.getAttribute('data-filter');
    $$('#workFilters button').forEach(function (b) { b.classList.toggle('is-active', b === btn); });
    $$('#workGrid .wcard').forEach(function (c) {
      var show = key === 'all' || c.getAttribute('data-platform') === key;
      c.classList.toggle('is-hidden', !show);
    });
  });

  /* ══════════════════════════════════════════════ 4. WHY / FORMATS ═════ */
  $('#wordsTrack').innerHTML = (S.testimonials || []).map(function (t) {
    var initials = t.name.split(' ').map(function (x) { return x[0]; }).join('').slice(0, 2);
    return '<div class="word">' +
      '<blockquote class="word__quote"><span class="qm">&ldquo;</span>' + t.quote + '</blockquote>' +
      '<div class="word__by"><span class="word__avatar">' + initials + '</span>' +
      '<span><span class="word__name">' + t.name + '</span><br>' +
      '<span class="word__role">' + t.role + ' · ' + t.company + '</span></span></div>' +
    '</div>';
  }).join('');
  $('#wordDots').innerHTML = (S.testimonials || []).map(function (_, i) {
    return '<button aria-label="Testimonial ' + (i + 1) + '" data-dot="' + i + '"' + (i === 0 ? ' class="is-active"' : '') + '></button>';
  }).join('');

  $('#whyGrid').innerHTML = (S.why || []).map(function (w, i) {
    return '<article class="whycard" data-reveal="up" data-d="' + (i % 3) + '">' +
      '<span class="whycard__ic"><svg class="ic"><use href="#i-' + w.icon + '"/></svg></span>' +
      '<h3 class="whycard__title">' + w.title + '</h3>' +
      '<p class="whycard__body">' + w.body + '</p>' +
    '</article>';
  }).join('');

  var FMT = S.formats || {};
  $('#formatsHeadline').textContent = FMT.headline || '';
  $('#formatsIntro').textContent = FMT.intro || '';
  $('#formatsList').innerHTML = (FMT.list || []).map(function (f) { return '<li>' + f + '</li>'; }).join('');

  /* ═══════════════════════════════════════ 5. MORE THAN A CREATOR ══════ */
  var ANC = S.anchor || {};
  $('#anchorMeta').textContent = 'Reporting · hosting · emcee';
  $('#anchorHeadline').innerHTML = (ANC.headline || '').replace(/(\d+\+)/, '<em>$1</em>');
  $('#anchorSub').textContent = ANC.sub || '';
  $('#anchorSports').innerHTML = (ANC.sports || []).map(function (s) { return '<li>' + s + '</li>'; }).join('');
  $('#anchorTours').innerHTML = (ANC.tournaments || []).map(function (t) { return '<li>' + t + '</li>'; }).join('');
  $('#anchorServices').innerHTML = (ANC.services || []).map(function (s, i) {
    return '<a class="aserv" href="' + s.link + '" target="_blank" rel="noopener" data-reveal="up" data-d="' + i + '">' +
      '<span class="aserv__thumb">' +
        (s.thumb ? '<img src="' + s.thumb + '" alt="" loading="lazy">' : '') +
        '<span class="aserv__badge">' + (s.badge || '') + '</span>' +
      '</span>' +
      '<span class="aserv__body">' +
        '<span class="aserv__t">' + s.title + '</span>' +
        '<span class="aserv__b">' + s.body + '</span>' +
        '<span class="aserv__go">' + s.linkLabel + '<svg class="ic"><use href="#i-arr"/></svg></span>' +
      '</span>' +
    '</a>';
  }).join('');

  /* ══════════════════════════════════════════════════════ 6. PRELOADER ═══ */
  var loader = $('#loader');
  var fill = $('#loaderFill');
  var pctEl = $('#loaderPct');
  var progress = 0;
  var loaded = false;

  function tickLoader() {
    progress += Math.random() * 14 + 4;
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';
    pctEl.textContent = String(Math.floor(progress)).padStart(2, '0');
    if (progress < 100) { requestAnimationFrame(tickLoader); }
    else { setTimeout(finishLoader, 180); }
  }
  function finishLoader() {
    if (loaded) return; loaded = true;
    loader.classList.add('done');
    document.body.classList.add('is-loaded');
    setTimeout(function () { loader.style.display = 'none'; }, 1400);
    $$('#hero .hero__linein').forEach(function (el, i) { el.style.transitionDelay = (i * 0.12) + 's'; });
    $$('#hero [data-reveal]').forEach(function (el, i) {
      var d = el.getAttribute('data-d');
      el.style.setProperty('--rd', (parseInt(d || 0, 10) * 80 + 250) + 'ms');
      el.classList.add('is-in');
      if (revealIO) revealIO.unobserve(el);
    });
  }
  if (REDUCED) { finishLoader(); } else { requestAnimationFrame(tickLoader); }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (!loaded && progress > 55) { progress = 100; fill.style.width = '100%'; pctEl.textContent = '100'; setTimeout(finishLoader, 120); }
    });
  }

  /* ═══════════════════════════════════════════════ 7. REVEAL / OBSERVER ══ */
  var revealIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      var d = el.getAttribute('data-d');
      if (d) el.style.setProperty('--rd', (parseInt(d, 10) * 80) + 'ms');
      el.classList.add('is-in');
      revealIO.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

  var barIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.style.width = en.target.getAttribute('data-pct');
      barIO.unobserve(en.target);
    });
  }, { threshold: 0.4 });

  function refreshObservers() {
    $$('[data-reveal]').forEach(function (el) { if (!el.classList.contains('is-in')) revealIO.observe(el); });
    $$('.ibar__fill').forEach(function (el) { if (!el.dataset.filled) { el.dataset.filled = '1'; barIO.observe(el); } });
  }

  /* ═══════════════════════════════════════════════════════ 8. SCROLL ══════ */
  var progressFill = $('#progressFill');
  var nav = $('#nav');
  var sticky = $('#stickyCta');
  var lastY = window.scrollY;
  var ticking = false;

  var heroInner = $('.hero__inner');
  var statementEl = $('#aboutStatement');
  var stmtWords = $$('#aboutStatement .w');
  var floaters = $$('.floater');

  function onScroll() {
    var y = window.scrollY;
    var vh = window.innerHeight;

    var max = document.documentElement.scrollHeight - vh;
    progressFill.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    nav.classList.toggle('is-stuck', y > 24);
    if (y > 420 && y > lastY + 4) nav.classList.add('is-hidden');
    else if (y < lastY - 4) nav.classList.remove('is-hidden');
    lastY = y;

    sticky.classList.toggle('is-on', y > vh * 0.85);

    if (heroInner && y < vh * 1.2) {
      var p = y / vh;
      heroInner.style.transform = 'translate3d(0,' + (p * 70) + 'px,0)';
      heroInner.style.opacity = String(Math.max(0, 1 - p * 1.25));
    }

    if (statementEl && stmtWords.length) {
      var sr = statementEl.getBoundingClientRect();
      var total = sr.height + vh * 0.35;
      var passed = (vh * 0.82 - sr.top) / total;
      var idx = Math.floor(Math.max(0, Math.min(1, passed)) * stmtWords.length);
      for (var i = 0; i < stmtWords.length; i++) stmtWords[i].classList.toggle('on', i <= idx);
    }

    if (floaters.length) {
      var hp = Math.min(1, Math.max(0, y / (vh * 0.9)));
      for (var f = 0; f < floaters.length; f++) {
        var depth = [30, 64, 96][f] || 60;
        floaters[f].style.setProperty('--px', ((hp - 0.25) * depth).toFixed(1) + 'px');
      }
    }

    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });

  /* ══════════════════════════════════════════════════ 9. POINTER FX ═══════ */
  if (!COARSE && !REDUCED) {
    var cur = $('#cursor');
    var dot = $('.cursor__dot');
    var ring = $('.cursor__ring');
    var rlabel = $('.cursor__label');
    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;

    document.body.classList.add('no-cursor');
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cur.classList.add('is-on');
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      requestAnimationFrame(loop);
    })();

    var HOVER = 'a, button, .stat, .whycard, .wcard, .pkg, .direct, input, select, textarea, .ibar';
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest(HOVER);
      if (!t) return;
      if (t.hasAttribute('data-preview')) {
        cur.classList.add('is-play');
        rlabel.textContent = 'Preview';
      } else if (t.hasAttribute('data-brand')) {
        cur.classList.add('is-link');
        rlabel.textContent = 'Open';
      } else {
        cur.classList.add('is-hover');
      }
    });
    document.addEventListener('mouseout', function (e) {
      var t = e.target.closest(HOVER);
      if (!t) return;
      if (!e.relatedTarget || !e.relatedTarget.closest || !e.relatedTarget.closest(HOVER)) {
        cur.classList.remove('is-play', 'is-hover', 'is-link');
        rlabel.textContent = '';
      }
    });

    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (dx * 0.22) + 'px,' + (dy * 0.3) + 'px)';
      });
      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform .5s var(--ease)';
        el.style.transform = 'translate(0,0)';
        setTimeout(function () { el.style.transition = ''; }, 520);
      });
      el.addEventListener('mouseenter', function () { el.style.transition = ''; });
    });

    $$('[data-tilt]').forEach(function (wrap) {
      var inner = wrap.querySelector('.portrait__frame');
      if (!inner) return;
      wrap.addEventListener('mousemove', function (e) {
        var r = wrap.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform = 'perspective(900px) rotateY(' + (px * 12) + 'deg) rotateX(' + (-py * 12) + 'deg) scale(1.03)';
      });
      wrap.addEventListener('mouseleave', function () {
        inner.style.transition = 'transform .7s var(--ease)';
        inner.style.transform = 'perspective(900px) rotateY(0) rotateX(0) scale(1)';
        setTimeout(function () { inner.style.transition = ''; }, 720);
      });
    });

    $$('.whycard').forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ═════════════════════════════════════════════ 10. MOBILE MENU ══════════ */
  var burger = $('#burger');
  var mobmenu = $('#mobmenu');
  function closeMenu() {
    burger.classList.remove('is-open');
    mobmenu.classList.remove('is-open');
    mobmenu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }
  burger.addEventListener('click', function () {
    var open = !mobmenu.classList.contains('is-open');
    burger.classList.toggle('is-open', open);
    mobmenu.classList.toggle('is-open', open);
    mobmenu.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('is-locked', open);
    if (open) $$('#mobmenuList a').forEach(function (a, i) { a.style.transitionDelay = (0.08 + i * 0.04) + 's'; });
    else $$('#mobmenuList a').forEach(function (a) { a.style.transitionDelay = '0s'; });
  });
  $$('#mobmenuList a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenu(); closeModal(); closeBrandModal(); }
  });

  /* ══════════════════════════════════════════════ 11. EMBEDS + MODAL ════ */
  var modal = $('#modal');
  var modalEmbed = $('#modalEmbed');
  var brandModal = $('#brandModal');

  function buildEmbed(platform, url) {
    if (!url) return '';
    if (platform === 'youtube') {
      var yt = url.replace('watch?v=', 'embed/').split('?')[0].replace('youtu.be/', 'embed/');
      if (yt.indexOf('/embed/') === -1) yt = 'https://www.youtube.com/embed/' + url.trim();
      return yt + '?autoplay=1&rel=0&modestbranding=1';
    }
    if (platform === 'instagram') return url.replace(/\/embed\/?$/, '') + '/embed/';
    if (platform === 'linkedin') {
      var m = url.match(/urn:li:(activity|share|ugcPost):\d+/);
      if (m) return 'https://www.linkedin.com/embed/feed/update/' + m[0] + '/';
      return url;
    }
    return url;
  }

  function openModal(btn) {
    var platform = btn.getAttribute('data-platform');
    var embed = buildEmbed(platform, btn.getAttribute('data-embed'));
    var p = PLATFORM[platform] || { label: 'Preview', icon: 'i-arr' };
    $('#modalEyebrow').innerHTML = '<svg class="ic" style="width:.9em;height:.9em"><use href="#' + p.icon + '"/></svg> ' +
      p.label + (btn.getAttribute('data-brand') ? ' · ' + btn.getAttribute('data-brand') : '');
    $('#modalTitle').textContent = btn.getAttribute('data-title');
    $('#modalMeta').textContent = (btn.getAttribute('data-metric') ? btn.getAttribute('data-metric') + ' ' : '') + 'live on ' + p.label;
    modalEmbed.className = 'modal__embed is-' + (platform || 'youtube');
    modalEmbed.innerHTML = '<iframe src="' + embed + '" title="' + btn.getAttribute('data-title') +
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    var link = $('#modalLink');
    link.href = btn.getAttribute('data-url');
    link.querySelector('span').textContent = 'Open on ' + p.label;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
  }
  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    setTimeout(function () { modalEmbed.innerHTML = ''; }, 400);
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-preview]');
    if (btn) { e.preventDefault(); openModal(btn); }
    if (e.target.closest('[data-close]')) closeModal();
  });
  $('#modalClose').addEventListener('click', closeModal);

  /* ═══════════════════════════════════════════ 12. BRAND LIGHTBOX ════════ */
  var bmItems = [], bmIdx = 0, bmBrand = null;

  function brandByKey(key) {
    for (var i = 0; i < BRANDS.length; i++) if (BRANDS[i].key === key) return BRANDS[i];
    return null;
  }
  function workForBrand(key) {
    return WORKS.filter(function (w) { return w.brandKey === key; });
  }

  function renderBrandStage() {
    var stage = $('#bmStage');
    var thumbs = $('#bmThumbs');
    var item = bmItems[bmIdx];

    if (!item) {
      stage.className = 'bm__stage is-empty';
      stage.innerHTML = '<div><p class="bm__empty">This campaign is in production</p>' +
        '<p class="bm__emptysub">The first pieces drop shortly. Follow the brand profile to see them first.</p></div>';
      thumbs.innerHTML = '';
      $('#bmOpen').style.display = 'none';
      $('#bmPrev').style.display = 'none';
      $('#bmNext').style.display = 'none';
      return;
    }
    var p = PLATFORM[item.platform] || PLATFORM.instagram;
    $('#bmOpen').style.display = '';
    $('#bmPrev').style.display = '';
    $('#bmNext').style.display = '';

    stage.className = 'bm__stage is-' + (item.platform === 'youtube' ? 'yt' : 'ig');
    stage.innerHTML = '<iframe src="' + buildEmbed(item.platform, item.embed) +
      '" title="' + item.title + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
      'allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';

    thumbs.innerHTML = bmItems.map(function (w, i) {
      return '<button class="bm__thumb' + (i === bmIdx ? ' is-on' : '') + '" data-bthumb="' + i + '" aria-label="Piece ' + (i + 1) + '">' +
        (w.thumb ? '<img src="' + w.thumb + '" alt="" loading="lazy">' : '') + '</button>';
    }).join('');

    $('#bmOpen').href = item.url;
    $('#bmOpen').querySelector('span').textContent = 'Open on ' + p.label;
  }

  function openBrandModal(key) {
    bmBrand = brandByKey(key);
    if (!bmBrand) return;
    bmItems = workForBrand(key);
    bmIdx = 0;

    var logoCls = bmBrand.blend === 'invert' ? ' is-invert' : (bmBrand.blend === 'screen' ? ' is-screen' : '');
    $('#bmLogo').innerHTML = '<img src="assets/img/brands/' + bmBrand.logo + '" class="' + logoCls.trim() + '" alt="' + bmBrand.name + '">';
    $('#bmCat').textContent = bmBrand.category + (bmItems.length ? ' · ' + bmItems.length + ' piece' + (bmItems.length > 1 ? 's' : '') : ' · in production');
    $('#bmTitle').textContent = bmBrand.name;
    $('#bmNote').textContent = bmBrand.note;
    $('#bmBrand').href = bmBrand.url;
    $('#bmBrandLabel').textContent = bmBrand.name + ' on Instagram';

    renderBrandStage();
    brandModal.classList.add('is-open');
    brandModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
  }
  function closeBrandModal() {
    if (!brandModal.classList.contains('is-open')) return;
    brandModal.classList.remove('is-open');
    brandModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    setTimeout(function () { $('#bmStage').innerHTML = ''; }, 400);
  }
  function stepBrand(d) {
    if (!bmItems.length) return;
    bmIdx = (bmIdx + d + bmItems.length) % bmItems.length;
    renderBrandStage();
  }

  document.addEventListener('click', function (e) {
    var tile = e.target.closest('[data-brand]');
    if (tile) {
      var key = tile.getAttribute('data-brand');
      if (workForBrand(key).length) { e.preventDefault(); openBrandModal(key); }
      else { tile.setAttribute('target', '_blank'); }   // brands without work link straight out
      return;
    }
    var th = e.target.closest('[data-bthumb]');
    if (th) { bmIdx = parseInt(th.getAttribute('data-bthumb'), 10); renderBrandStage(); return; }
    if (e.target.closest('[data-bclose]')) closeBrandModal();
  });
  $('#brandClose').addEventListener('click', closeBrandModal);
  $('#bmPrev').addEventListener('click', function () { stepBrand(-1); });
  $('#bmNext').addEventListener('click', function () { stepBrand(1); });

  /* ═══════════════════════════════════════════════ 13. TESTIMONIALS ══════ */
  var track = $('#wordsTrack');
  var slides = $$('#wordsTrack .word');
  var idx = 0;
  var autoTimer = null;

  function goTo(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-idx * 100) + '%)';
    $$('#wordDots button').forEach(function (d, di) { d.classList.toggle('is-active', di === idx); });
  }
  function autoPlay() {
    clearInterval(autoTimer);
    if (REDUCED) return;
    autoTimer = setInterval(function () { goTo(idx + 1); }, 6500);
  }
  $('#wordNext').addEventListener('click', function () { goTo(idx + 1); autoPlay(); });
  $('#wordPrev').addEventListener('click', function () { goTo(idx - 1); autoPlay(); });
  $('#wordDots').addEventListener('click', function (e) {
    var d = e.target.closest('[data-dot]');
    if (d) { goTo(parseInt(d.getAttribute('data-dot'), 10)); autoPlay(); }
  });
  var slider = $('#wordsSlider');
  slider.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
  slider.addEventListener('mouseleave', autoPlay);

  var tx = 0;
  slider.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    var d = e.changedTouches[0].clientX - tx;
    if (Math.abs(d) > 50) { goTo(idx + (d < 0 ? 1 : -1)); autoPlay(); }
  });

  /* ═════════════════════════════════════════════════════ 14. MISC FX ══════ */
  function tickClock() {
    var el = $('#heroClock');
    if (!el) return;
    try {
      el.textContent = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', timeZone: S.timeZone || undefined
      }).format(new Date()) + ' local';
    } catch (err) {
      el.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }
  tickClock();
  setInterval(tickClock, 30000);

  $('#toTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' });
  });

  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - (id === '#top' ? 0 : 72);
      window.scrollTo({ top: top, behavior: REDUCED ? 'auto' : 'smooth' });
    });
  });

  var pimg = $('#portraitImg');
  if (pimg) {
    pimg.addEventListener('error', function () {
      pimg.style.display = 'none';
      var ph = pimg.parentElement;
      ph.style.background = 'linear-gradient(150deg,#1b1f24,#0c0e10)';
      ph.style.display = 'grid';
      ph.style.placeItems = 'center';
      ph.insertAdjacentHTML('afterbegin',
        '<span style="font-family:var(--ff-display);font-size:5rem;color:rgba(216,255,62,.28)">' +
        (S.name.initials || 'VK') + '</span>');
    });
  }

  /* ═══════════════════════════════════════════ 15b. LIVE INSIGHTS FETCH ═══ */
  /* Pulls fresh numbers and patches them over the static ones.
     Every failure path falls back to the numbers already in config.js, so the
     section always renders. Nothing here can break the page.               */
  (function liveInsights() {
    var L = S.live || {};
    var CACHE = 'vk-insights-cache';
    var TTL = (L.cacheMinutes || 60) * 60000;

    function splitNum(v) {
      if (v == null || isNaN(v)) return null;
      if (v >= 1e6) { var m = Math.round((v / 1e6) * 10) / 10; return { n: String(m), s: 'M' }; }
      if (v >= 1e4) return { n: String(Math.round(v / 1e3)), s: 'K' };
      return { n: Number(v).toLocaleString('en-IN'), s: '' };
    }
    function get(obj, path) {
      if (!obj || !path) return null;
      return path.split('.').reduce(function (o, k) { return (o == null ? o : o[k]); }, obj);
    }
    var badge = $('#liveBadge');
    function paint(data) {
      return paintFlat(data, data.updated || data.updatedAt);
    }
    function relTime(ts) {
      var t = new Date(ts).getTime();
      if (isNaN(t)) return 'just now';
      var mins = Math.max(0, Math.round((Date.now() - t) / 60000));
      if (mins < 1) return 'just now';
      if (mins < 60) return mins + 'm ago';
      var h = Math.round(mins / 60);
      if (h < 24) return h + 'h ago';
      return Math.round(h / 24) + 'd ago';
    }
    function setBadge(text, on) {
      var badge = $('#liveBadge');
      if (!badge) return;
      badge.classList.toggle('is-on', !!on);
      $('#liveWhen').textContent = text;
    }

    // 0. Best option when the site is on Cloudflare: the Worker proxy at
    //    /api/insights holds the Instagram token server-side and returns
    //    both platforms. Same origin, so no CORS, nothing exposed.
    function paintFlat(flat, when) {
      var changed = 0;
      $$('[data-live]').forEach(function (el) {
        var raw = get(flat, el.getAttribute('data-live'));
        var p = splitNum(raw);
        if (!p) return;
        changed++;
        if (el.classList.contains('istat2__v')) {
          el.innerHTML = p.n + (p.s ? '<small>' + p.s + '</small>' : '');
        } else {
          el.textContent = p.n + p.s;
        }
        el.classList.add('is-live');
      });
      if (changed && badge) {
        badge.classList.add('is-on');
        $('#liveWhen').textContent = when ? 'Live · updated ' + relTime(when) : 'Live';
      }
      return changed;
    }
    function flatFrom(data) {
      return {
        views: get(data, 'combined.views'), interactions: get(data, 'combined.interactions'),
        profileViews: get(data, 'combined.profileViews'), followers: get(data, 'instagram.followers'),
        igFollowers: get(data, 'instagram.followers'), igViews: get(data, 'instagram.views'),
        igInteractions: get(data, 'instagram.interactions'), igProfileViews: get(data, 'instagram.profileViews'),
        subscribers: get(data, 'youtube.subscribers'), ytViews: get(data, 'youtube.views'),
        watchHours: get(data, 'youtube.watchHours'), monthlyAudience: get(data, 'youtube.monthlyAudience')
      };
    }

    fetch('/api/insights', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) return;
        paintFlat(flatFrom(data), data.updated);
      })
      .catch(function () {});

    // 1. Or a JSON file written by a scheduled job
    var jsonUrl = L.insightsUrl;
    if (jsonUrl) {
      var bust = jsonUrl + (jsonUrl.indexOf('?') > -1 ? '&' : '?') + 'v=' + Math.floor(Date.now() / 3600000);
      fetch(bust, { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (data) {
          if (!data) return;
          var flat = {
            views: get(data, 'combined.views'), interactions: get(data, 'combined.interactions'),
            profileViews: get(data, 'combined.profileViews'), followers: get(data, 'instagram.followers'),
            igFollowers: get(data, 'instagram.followers'), igViews: get(data, 'instagram.views'),
            igInteractions: get(data, 'instagram.interactions'), igProfileViews: get(data, 'instagram.profileViews'),
            subscribers: get(data, 'youtube.subscribers'), ytViews: get(data, 'youtube.views'),
            watchHours: get(data, 'youtube.watchHours'), monthlyAudience: get(data, 'youtube.monthlyAudience')
          };
          paint(flat);   // paint() sets the badge with the timestamp itself
        })
        .catch(function () {});
    }

    // 2. Fallback / alternative: YouTube Data API straight from the browser.
    //    The public key is fine here for public channel stats, and we cache it
    //    locally so a visitor never burns more than one call per hour.
    if (L.ytApiKey && L.ytChannelId) {
      var cached = null;
      try { cached = JSON.parse(localStorage.getItem(CACHE) || 'null'); } catch (e) {}
      if (cached && Date.now() - cached.at < TTL) {
        paint({ subscribers: cached.subscribers, ytViews: cached.views });
      } else {
        var api = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' +
                  encodeURIComponent(L.ytChannelId) + '&key=' + encodeURIComponent(L.ytApiKey);
        fetch(api)
          .then(function (r) { return r.json(); })
          .then(function (j) {
            var st = j && j.items && j.items[0] && j.items[0].statistics;
            if (!st) return;
            var payload = { subscribers: parseInt(st.subscriberCount, 10), ytViews: parseInt(st.viewCount, 10) };
            try { localStorage.setItem(CACHE, JSON.stringify({ at: Date.now(), subscribers: payload.subscribers, views: payload.ytViews })); } catch (e) {}
            if (paint(payload)) setBadge('Live', true);
          })
          .catch(function () {});
      }
    }
  })();

  /* ══════════════════════════════════════════════════════ 16. BOOT ═══════ */
  refreshObservers();
  onScroll();
  autoPlay();

  window.addEventListener('load', function () { refreshObservers(); });
  setTimeout(refreshObservers, 1200);
})();
