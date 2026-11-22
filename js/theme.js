var seasons = {
  spring: {
    months: [3, 4, 5],
    light: 'linear-gradient(135deg, #fde8ef 0%, #f0e6ff 50%, #e6f5e8 100%)',
    dark: 'linear-gradient(135deg, #1a0a14 0%, #0f172a 50%, #0a2818 100%)',
    accent: '#e11d48',
    accentDark: '#fb7185',
    icon: '/assets/favicon-spring.svg',
    iconDark: '/assets/favicon-spring-dark.svg',
  },
  summer: {
    months: [6, 7, 8],
    light: 'linear-gradient(135deg, #fff3c4 0%, #fde68a 45%, #dcfce7 100%)',
    dark: 'linear-gradient(135deg, #271c09 0%, #0f2930 50%, #0f172a 100%)',
    accent: '#d97706',
    accentDark: '#fbbf24',
    icon: '/assets/favicon-summer.svg',
    iconDark: '/assets/favicon-summer-dark.svg',
  },
  autumn: {
    months: [9, 10, 11],
    light: 'linear-gradient(135deg, #fef0e6 0%, #fde8d8 50%, #fcf6e8 100%)',
    dark: 'linear-gradient(135deg, #1f0a0a 0%, #1a1410 50%, #2a1a0e 100%)',
    accent: '#ea580c',
    accentDark: '#fb923c',
    icon: '/assets/favicon-autumn.svg',
    iconDark: '/assets/favicon-autumn-dark.svg',
  },
  winter: {
    months: [12, 1, 2],
    light: 'linear-gradient(135deg, #e0e7ff 0%, #dbeafe 50%, #e0f2fe 100%)',
    dark: 'linear-gradient(135deg, #080e2e 0%, #141438 50%, #0f1a2e 100%)',
    accent: '#6366f1',
    accentDark: '#818cf8',
    icon: '/assets/favicon-winter.svg',
    iconDark: '/assets/favicon-winter-dark.svg',
  },
};

function getCalendarSeason() {
  var month = new Date().getMonth() + 1;
  return Object.entries(seasons).find(function (_a) {
    return _a[1].months.includes(month);
  })?.[0] || 'spring';
}

function getCurrentSeason() {
  try {
    var override = sessionStorage.getItem('season');
    if (override && seasons[override]) return override;
  } catch (e) {
    // Ignore storage errors in restricted contexts
  }
  return getCalendarSeason();
}

function setSeasonOverride(seasonKey) {
  if (!seasons[seasonKey]) return;
  try {
    sessionStorage.setItem('season', seasonKey);
  } catch (e) {
    // Ignore storage errors
  }
  applySeason(seasonKey);
}

function getPreferredTheme() {
  return localStorage.getItem('theme') || 'system';
}

function isDarkMode() {
  var t = getPreferredTheme();
  if (t === 'dark') return true;
  if (t === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

var lastParticleKey = '';
var pendingParticleArgs = null;

function createSvgElement(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.keys(attrs).forEach(function (k) {
    el.setAttribute(k, attrs[k]);
  });
  return el;
}

function buildParticleSvg(seasonKey, variant, dark) {
  var svg = createSvgElement('svg', {
    viewBox: '0 0 24 24',
    width: '100%',
    height: '100%',
    'aria-hidden': 'true',
  });

  if (seasonKey === 'spring') {
    var sakuraPalette = dark
      ? ['#fbcfe8', '#f9a8d4', '#fda4af']
      : ['#f472b6', '#fb7185', '#f9a8d4'];
    var petalFill = sakuraPalette[variant % sakuraPalette.length];
    svg.appendChild(createSvgElement('path', {
      d: 'M12 2.5C15.8 5.2 19 9.5 18.2 14.5C17.5 18.5 14.8 21.2 12 21.8C9.2 21.2 6.5 18.5 5.8 14.5C5 9.5 8.2 5.2 12 2.5Z',
      fill: petalFill,
      opacity: '0.92',
    }));
    // Signature cherry-blossom notch
    svg.appendChild(createSvgElement('path', {
      d: 'M12 2.4L10.7 5.2L12 4.3L13.3 5.2Z',
      fill: dark ? '#1a0a14' : '#fde8ef',
      opacity: '0.65',
    }));
    return svg;
  }

  if (seasonKey === 'summer') {
    var sunPalette = dark
      ? ['#fde68a', '#fbbf24', '#fcd34d']
      : ['#f59e0b', '#d97706', '#fbbf24'];
    var sunColor = sunPalette[variant % sunPalette.length];
    if (variant % 3 === 0) {
      // 8-point sunshine sparkle with warm core
      svg.appendChild(createSvgElement('path', {
        d: 'M12 1.5L13.8 8.2L19.4 4.6L15.8 10.2L22.5 12L15.8 13.8L19.4 19.4L13.8 15.8L12 22.5L10.2 15.8L4.6 19.4L8.2 13.8L1.5 12L8.2 10.2L4.6 4.6L10.2 8.2Z',
        fill: sunColor,
        opacity: '0.92',
      }));
    } else if (variant % 3 === 1) {
      // 4-point crisp sun-glint diamond
      svg.appendChild(createSvgElement('path', {
        d: 'M12 2C12.9 8.2 15.8 11.1 22 12C15.8 12.9 12.9 15.8 12 22C11.1 15.8 8.2 12.9 2 12C8.2 11.1 11.1 8.2 12 2Z',
        fill: sunColor,
        opacity: '0.9',
      }));
    } else {
      // Layered warm sun-dapple orb
      svg.appendChild(createSvgElement('circle', {
        cx: '12',
        cy: '12',
        r: '9.5',
        fill: sunColor,
        opacity: '0.42',
      }));
      svg.appendChild(createSvgElement('circle', {
        cx: '12',
        cy: '12',
        r: '5.5',
        fill: sunColor,
        opacity: '0.9',
      }));
    }
    return svg;
  }

  if (seasonKey === 'autumn') {
    var autumnPalette = dark
      ? ['#fb923c', '#fbbf24', '#f87171', '#f59e0b']
      : ['#ea580c', '#d97706', '#dc2626', '#c2410c'];
    var leafColor = autumnPalette[variant % autumnPalette.length];
    if (variant % 2 === 0) {
      // Momiji (Japanese maple) silhouette
      svg.appendChild(createSvgElement('path', {
        d: 'M12 2L14 7.5L19.5 6L16.2 10.8L21 13.5L15.2 14.8L16.5 19.5L12.6 16.5V22H11.4V16.5L7.5 19.5L8.8 14.8L3 13.5L7.8 10.8L4.5 6L10 7.5L12 2Z',
        fill: leafColor,
        opacity: '0.9',
      }));
    } else {
      // Ginkgo fan leaf silhouette
      svg.appendChild(createSvgElement('path', {
        d: 'M12 19.5V14.5C7.2 14.2 3.5 10.8 3.2 6.5C5.8 5.2 8.8 5.4 11.3 7.6L12 4.5L12.7 7.6C15.2 5.4 18.2 5.2 20.8 6.5C20.5 10.8 16.8 14.2 12 14.5',
        fill: leafColor,
        opacity: '0.88',
      }));
      svg.appendChild(createSvgElement('line', {
        x1: '12',
        y1: '14',
        x2: '12',
        y2: '21.5',
        stroke: leafColor,
        'stroke-width': '1.6',
        'stroke-linecap': 'round',
      }));
    }
    return svg;
  }

  // Winter: ornate branched snowflakes & snow crystals
  var snowPalette = dark
    ? ['#ffffff', '#e0e7ff', '#c7d2fe']
    : ['#4f46e5', '#6366f1', '#3b82f6'];
  var snowColor = snowPalette[variant % snowPalette.length];
  if (variant % 3 === 0) {
    svg.appendChild(createSvgElement('circle', {
      cx: '12',
      cy: '12',
      r: '8.5',
      fill: snowColor,
      opacity: dark ? '0.32' : '0.24',
    }));
    svg.appendChild(createSvgElement('circle', {
      cx: '12',
      cy: '12',
      r: '5',
      fill: snowColor,
      opacity: '0.9',
    }));
  } else {
    var mainAxes = [
      ['12', '2', '12', '22'],
      ['3.34', '7', '20.66', '17'],
      ['20.66', '7', '3.34', '17'],
    ];
    mainAxes.forEach(function (pts) {
      svg.appendChild(createSvgElement('line', {
        x1: pts[0],
        y1: pts[1],
        x2: pts[2],
        y2: pts[3],
        stroke: snowColor,
        'stroke-width': '1.8',
        'stroke-linecap': 'round',
        opacity: '0.9',
      }));
    });
    // Branched V-tips on each of the 6 snowflake arms
    var branches = [
      'M9.5 4.8L12 7.2L14.5 4.8',
      'M9.5 19.2L12 16.8L14.5 19.2',
      'M4.8 10.6L7.9 9.6L7 6.5',
      'M19.2 13.4L16.1 14.4L17 17.5',
      'M17 6.5L16.1 9.6L19.2 10.6',
      'M7 17.5L7.9 14.4L4.8 13.4',
    ];
    branches.forEach(function (d) {
      svg.appendChild(createSvgElement('path', {
        d: d,
        fill: 'none',
        stroke: snowColor,
        'stroke-width': '1.45',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        opacity: '0.9',
      }));
    });
    svg.appendChild(createSvgElement('circle', {
      cx: '12',
      cy: '12',
      r: '2.2',
      fill: snowColor,
      opacity: '0.95',
    }));
  }
  return svg;
}

function renderSeasonalParticles(seasonKey, dark) {
  if (!document.body) {
    pendingParticleArgs = [seasonKey, dark];
    return;
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var existing = document.getElementById('ambient-edges');
  if (reducedMotion) {
    if (existing) existing.remove();
    lastParticleKey = '';
    return;
  }

  var cacheKey = seasonKey + ':' + (dark ? '1' : '0');
  if (cacheKey === lastParticleKey && existing) return;
  lastParticleKey = cacheKey;

  if (!existing) {
    existing = document.createElement('div');
    existing.id = 'ambient-edges';
    existing.className = 'ambient-edges';
    existing.setAttribute('aria-hidden', 'true');
    document.body.prepend(existing);
  } else {
    existing.textContent = '';
  }

  if (seasonKey === 'summer') {
    var glow = document.createElement('div');
    glow.className = 'ambient-sunshine';
    existing.appendChild(glow);
  }

  var leftPositions = [10, 34, 58, 22, 68, 15, 48, 76];
  var rightPositions = [18, 46, 72, 28, 60, 12, 54, 80];

  ['left', 'right'].forEach(function (side, sideIdx) {
    var lane = document.createElement('div');
    lane.className = 'ambient-lane ambient-lane--' + side;
    var positions = side === 'left' ? leftPositions : rightPositions;

    for (var i = 0; i < positions.length; i++) {
      var node = document.createElement('span');
      node.className = 'ambient-particle ambient-particle--' + seasonKey;

      var size = (seasonKey === 'summer' || seasonKey === 'winter')
        ? 15 + ((i * 4 + sideIdx * 3) % 9)
        : (seasonKey === 'autumn'
          ? 14 + ((i * 5 + sideIdx * 3) % 9)
          : 12 + ((i * 4 + sideIdx * 3) % 9));
      var duration = 15 + ((i * 3 + sideIdx * 5) % 10);
      var delay = -((i * 2.6 + sideIdx * 1.4) % duration);
      var sway = (i % 2 === 0 ? 1 : -1) * (10 + (i * 3) % 14);
      var spin = (i % 2 === 0 ? 1 : -1) * (120 + (i * 45) % 180);
      var opacity = (0.55 + ((i * 7 + sideIdx * 3) % 28) / 100).toFixed(2);

      node.style.left = positions[i] + '%';
      node.style.width = size + 'px';
      node.style.height = size + 'px';
      node.style.setProperty('--fall-duration', duration + 's');
      node.style.setProperty('--fall-delay', delay.toFixed(1) + 's');
      node.style.setProperty('--sway-x', sway + 'px');
      node.style.setProperty('--spin-deg', spin + 'deg');
      node.style.setProperty('--particle-opacity', opacity);

      node.appendChild(buildParticleSvg(seasonKey, i + sideIdx * 2, dark));
      lane.appendChild(node);
    }

    existing.appendChild(lane);
  });
}

function applySeason(seasonKey) {
  var season = seasons[seasonKey];
  if (!season) return;
  var dark = isDarkMode();
  var gradient = dark ? season.dark : season.light;
  document.documentElement.style.setProperty('--page-gradient', gradient);
  document.documentElement.setAttribute('data-season', seasonKey);

  var icon = dark && season.iconDark ? season.iconDark : season.icon;
  var favicon = document.getElementById('favicon');
  if (favicon) favicon.href = icon;
  var apple = document.querySelector('link[rel="apple-touch-icon"]');
  if (apple) apple.href = icon;

  document.documentElement.style.setProperty('--accent', dark ? season.accentDark : season.accent);

  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = dark ? season.accentDark : season.accent;

  var root = document.documentElement;
  var theme = getPreferredTheme();
  root.classList.remove('theme-system', 'theme-dark', 'theme-light');
  root.classList.add('theme-' + theme);
  root.classList.toggle('dark-mode', dark);
  root.style.colorScheme = dark ? 'dark' : 'light';

  renderSeasonalParticles(seasonKey, dark);

  try {
    window.dispatchEvent(new CustomEvent('seasonchange', { detail: { season: seasonKey, dark: dark } }));
  } catch (e) {
    // Ignore if CustomEvent unsupported
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (pendingParticleArgs) {
    renderSeasonalParticles(pendingParticleArgs[0], pendingParticleArgs[1]);
    pendingParticleArgs = null;
  }
});

var darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMedia.addEventListener('change', function () {
  if (getPreferredTheme() === 'system') {
    applySeason(getCurrentSeason());
  }
});

var reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
reducedMotionMedia.addEventListener('change', function () {
  lastParticleKey = '';
  renderSeasonalParticles(getCurrentSeason(), isDarkMode());
});
