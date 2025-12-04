// Seasonal backgrounds and favicons
const seasons = {
  spring: {
    months: [3, 4, 5],
    gradient: 'linear-gradient(135deg, #ffe3f0 0%, #cfeeff 50%, #eefce5 100%)',
    icon: 'assets/favicon-spring.svg',
  },
  summer: {
    months: [6, 7, 8],
    gradient: 'linear-gradient(135deg, #d9f4ff 0%, #fff0d9 50%, #d4f7e2 100%)',
    icon: 'assets/favicon-summer.svg',
  },
  autumn: {
    months: [9, 10, 11],
    gradient: 'linear-gradient(135deg, #ffe4d1 0%, #ffdff0 45%, #eef7d7 100%)',
    icon: 'assets/favicon-autumn.svg',
  },
  winter: {
    months: [12, 1, 2],
    gradient: 'linear-gradient(135deg, #dfe9ff 0%, #f4e9ff 50%, #eef6ff 100%)',
    icon: 'assets/favicon-winter.svg',
  },
};

function detectSeason() {
  const month = new Date().getMonth() + 1;
  return (
    Object.entries(seasons).find(([, v]) => v.months.includes(month))?.[0] || 'spring'
  );
}

function applySeason(seasonKey) {
  const season = seasons[seasonKey];
  if (!season) return;
  document.body.style.background = season.gradient;
  const favicon = document.getElementById('favicon');
  if (favicon) {
    favicon.href = season.icon;
  }
  const apple = document.querySelector('link[rel="apple-touch-icon"]');
  if (apple) {
    apple.href = season.icon;
  }
}

const translations = {
  en: {
    eyebrow: 'Building things at the intersection of cloud, AI, and startups.',
    subtitle: 'Cloud Engineer • AI Builder • Founder of Uttayo',
    location: 'Tokyo, Japan',
    currently: 'Currently',
    profile1: 'Cloud engineer at MetLife Japan',
    profile2: 'Always learning, testing new ideas',
    aboutTitle: 'About',
    aboutText:
      'Builder mindset. Cloud engineer by day, AI product maker by night. Currently focused on AI-powered tools and a second-hand marketplace in Japan called Uttayo. Happy to collaborate on cloud, AI, or fast-moving product experiments.',
    whatTitle: 'What I Do',
    pills: ['Azure', 'AKS & Containers', 'Terraform & IaC', 'Next.js & React', 'Supabase', 'AI / LLM Apps', 'AWS'],
    projectsTitle: 'Projects',
    uttayoDesc: 'A bilingual second-hand goods platform in Japan with AI-assisted pricing and an ultra-simple listing flow.',
    uttayoBtn: 'View project',
    gomiDesc: 'A simple site that helps residents check trash day schedules in Japan, with a friendly mascot and clean UI.',
    gomiBtn: 'View project',
    footerKicker: 'Let’s connect.',
    footerText: 'Always happy to talk cloud, AI, and startups.',
    langToggle: 'EN / 日本語',
  },
  ja: {
    eyebrow: 'クラウド・AI・スタートアップの交差点でプロダクトを作っています。',
    subtitle: 'クラウドエンジニア・AIビルダー・Uttayo創業者',
    location: '東京、日本',
    currently: '現在',
    profile1: 'MetLife Japan のクラウドエンジニア',
    profile2: '常に学び、新しいことを試しています',
    aboutTitle: '自己紹介',
    aboutText:
      'ビルダー気質。昼はクラウドエンジニア、夜はAIプロダクトづくり。今はAIを活用したツールと、日本向けセカンドハンドマーケット「Uttayo」に注力。クラウド、AI、スピード感ある実験でご一緒できます。',
    whatTitle: '得意分野',
    pills: ['Azure', 'AKS とコンテナ', 'Terraform と IaC', 'Next.js と React', 'Supabase', 'AI / LLM アプリ', 'AWS'],
    projectsTitle: 'プロジェクト',
    uttayoDesc: 'AI価格支援とシンプルな出品フローを備えた日本向けバイリンガルのセカンドハンド市場。',
    uttayoBtn: 'サイトを見る',
    gomiDesc: '日本のごみ収集日を確認できるシンプルなサイト。親しみやすいマスコットとクリーンなUI。',
    gomiBtn: 'プロジェクトを見る',
    footerKicker: 'つながりましょう。',
    footerText: 'クラウド、AI、スタートアップの話はいつでも歓迎です。',
    langToggle: '日本語 / EN',
  },
};

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;
  document.getElementById('eyebrow').textContent = t.eyebrow;
  document.getElementById('subtitle').textContent = t.subtitle;
  document.getElementById('location').textContent = t.location;
  document.getElementById('currently').textContent = t.currently;
  document.getElementById('profile-line1').textContent = t.profile1;
  document.getElementById('profile-line2').textContent = t.profile2;
  document.getElementById('about').textContent = t.aboutTitle;
  document.getElementById('about-text').textContent = t.aboutText;
  document.getElementById('what-i-do').textContent = t.whatTitle;
  document.getElementById('projects').textContent = t.projectsTitle;
  document.getElementById('uttayo-desc').textContent = t.uttayoDesc;
  document.getElementById('uttayo-btn').textContent = t.uttayoBtn;
  document.getElementById('gomi-desc').textContent = t.gomiDesc;
  document.getElementById('gomi-btn').textContent = t.gomiBtn;
  document.getElementById('footer-kicker').textContent = t.footerKicker;
  document.getElementById('footer-text').textContent = t.footerText;
  document.getElementById('lang-toggle').textContent = t.langToggle;

  const pillIds = ['pill1', 'pill2', 'pill3', 'pill4', 'pill5', 'pill6', 'pill7'];
  pillIds.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el && t.pills[idx]) el.textContent = t.pills[idx];
  });
}

// Fade-in observer
function setupFadeIns() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

// Footer year
function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  const seasonKey = detectSeason();
  applySeason(seasonKey);
  setYear();
  setupFadeIns();

  let currentLang = 'en';
  applyLanguage(currentLang);

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ja' : 'en';
      applyLanguage(currentLang);
    });
  }
});
