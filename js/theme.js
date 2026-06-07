const seasons = {
  spring: {
    months: [3, 4, 5],
    light: 'linear-gradient(135deg, #ffe3f0 0%, #cfeeff 50%, #eefce5 100%)',
    dark: 'linear-gradient(135deg, #2d1528 0%, #0f1b2e 50%, #0f2e1a 100%)',
    icon: '/assets/favicon-spring.svg',
    iconDark: '/assets/favicon-spring-dark.svg',
  },
  summer: {
    months: [6, 7, 8],
    light: 'linear-gradient(135deg, #d9f4ff 0%, #fff0d9 50%, #d4f7e2 100%)',
    dark: 'linear-gradient(135deg, #0f1528 0%, #2d1f0f 50%, #0f2e1a 100%)',
    icon: '/assets/favicon-summer.svg',
    iconDark: '/assets/favicon-summer-dark.svg',
  },
  autumn: {
    months: [9, 10, 11],
    light: 'linear-gradient(135deg, #ffe4d1 0%, #ffdff0 45%, #eef7d7 100%)',
    dark: 'linear-gradient(135deg, #2d0f0f 0%, #2d1528 50%, #1a2e0f 100%)',
    icon: '/assets/favicon-autumn.svg',
    iconDark: '/assets/favicon-autumn-dark.svg',
  },
  winter: {
    months: [12, 1, 2],
    light: 'linear-gradient(135deg, #dfe9ff 0%, #f4e9ff 50%, #eef6ff 100%)',
    dark: 'linear-gradient(135deg, #0a102e 0%, #1a1528 50%, #0f1a3e 100%)',
    icon: '/assets/favicon-winter.svg',
    iconDark: '/assets/favicon-winter-dark.svg',
  },
};

function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  return Object.entries(seasons).find(([, v]) => v.months.includes(month))?.[0] || 'spring';
}

function isDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applySeason(seasonKey) {
  const season = seasons[seasonKey];
  if (!season) return;
  const dark = isDarkMode();
  document.body.style.background = dark ? season.dark : season.light;
  const icon = dark && season.iconDark ? season.iconDark : season.icon;
  const favicon = document.getElementById('favicon');
  if (favicon) favicon.href = icon;
  const apple = document.querySelector('link[rel="apple-touch-icon"]');
  if (apple) apple.href = icon;
}

const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMedia.addEventListener('change', () => {
  applySeason(getCurrentSeason());
});
