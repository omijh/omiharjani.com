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
    light: 'linear-gradient(135deg, #fef6e8 0%, #e6f4ff 50%, #e6f5ea 100%)',
    dark: 'linear-gradient(135deg, #1a1410 0%, #0a2830 50%, #0f172a 100%)',
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
    light: 'linear-gradient(135deg, #f0f4ff 0%, #f0e6ff 50%, #e6f4fa 100%)',
    dark: 'linear-gradient(135deg, #080e2e 0%, #141438 50%, #0f1a2e 100%)',
    accent: '#6366f1',
    accentDark: '#818cf8',
    icon: '/assets/favicon-winter.svg',
    iconDark: '/assets/favicon-winter-dark.svg',
  },
};

function getCurrentSeason() {
  var month = new Date().getMonth() + 1;
  return Object.entries(seasons).find(function (_a) {
    return _a[1].months.includes(month);
  })?.[0] || 'spring';
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

function applySeason(seasonKey) {
  var season = seasons[seasonKey];
  if (!season) return;
  var dark = isDarkMode();
  var gradient = dark ? season.dark : season.light;
  document.documentElement.style.setProperty('--page-gradient', gradient);

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
}

var darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMedia.addEventListener('change', function () {
  if (getPreferredTheme() === 'system') {
    applySeason(getCurrentSeason());
  }
});
