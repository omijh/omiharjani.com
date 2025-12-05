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
    eyebrow: 'Cloud engineering, AI products, and hands-on experimentation.',
    subtitle: 'Cloud Engineer • AI Builder in Tokyo',
    location: 'Tokyo, Japan',
    currently: 'Currently',
    profile1: 'Cloud Engineer at MetLife Japan',
    profile2: 'Building reliable Azure and Kubernetes platforms with automation.',
    profile3: 'Experimenting with AI products, including the Uttayo marketplace.',
    aboutTitle: 'About',
    aboutLines: [
      'Builder mindset with a focus on useful, reliable systems.',
      'Cloud engineer by day, AI product maker by night — always sharing what I learn.',
      'Currently investing in AI-powered tools and Uttayo, a bilingual resale marketplace in Japan.',
      'Outside of work, I explore Tokyo neighborhoods and keep refining my Japanese.',
    ],
    whatTitle: 'What I Do',
    pills: ['Azure', 'AKS & Containers', 'Terraform & IaC', 'Next.js & React', 'Supabase', 'AI / LLM Apps', 'AWS'],
    projectsTitle: 'Projects',
    uttayoDesc: 'A bilingual second-hand goods platform in Japan with AI-assisted pricing and an ultra-simple listing flow.',
    uttayoBtn: 'View project',
    gomiDesc: 'A simple site that helps residents check trash day schedules in Japan, with a friendly mascot and clean UI.',
    gomiBtn: 'View project',
    footerKicker: 'Let’s connect.',
    footerText: 'Always happy to talk cloud, AI, startups, and new experiments.',
    langAriaLabel: 'Toggle language between English and Japanese',
  },
  ja: {
    eyebrow: 'クラウドエンジニアリングとAIプロダクトづくりに熱中しています。',
    subtitle: '東京拠点のクラウドエンジニア・AIビルダー',
    location: '東京、日本',
    currently: '現在',
    profile1: 'MetLife Japan のクラウドエンジニア',
    profile2: 'AzureとKubernetesのプラットフォームを自動化し、信頼性を高めています。',
    profile3: 'バイリンガル中古マーケット「Uttayo」などAIプロダクトを実験中。',
    aboutTitle: '自己紹介',
    aboutLines: [
      'つくることが好きで、役立つシステムづくりにこだわります。',
      '昼はクラウドエンジニア、夜はAIプロダクトづくり。学んだことはすぐ共有。',
      'AIを活用したツールとバイリンガル中古マーケット「Uttayo」に取り組んでいます。',
      '仕事以外では東京の街歩きと日本語のブラッシュアップを楽しんでいます。',
    ],
    whatTitle: '得意分野',
    pills: ['Azure', 'AKS とコンテナ', 'Terraform と IaC', 'Next.js と React', 'Supabase', 'AI / LLM アプリ', 'AWS'],
    projectsTitle: 'プロジェクト',
    uttayoDesc: 'AI価格支援とシンプルな出品フローを備えた日本向けバイリンガルのセカンドハンド市場。',
    uttayoBtn: 'サイトを見る',
    gomiDesc: '日本のごみ収集日を確認できるシンプルなサイト。親しみやすいマスコットとクリーンなUI。',
    gomiBtn: 'プロジェクトを見る',
    footerKicker: 'つながりましょう。',
    footerText: 'クラウド、AI、スタートアップの話はいつでも歓迎です。',
    langAriaLabel: '英語と日本語の表示を切り替え',
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
  document.getElementById('profile-line3').textContent = t.profile3;
  document.getElementById('about').textContent = t.aboutTitle;
  const aboutLineEls = [
    document.getElementById('about-line1'),
    document.getElementById('about-line2'),
    document.getElementById('about-line3'),
    document.getElementById('about-line4'),
  ];
  aboutLineEls.forEach((el, idx) => {
    if (el && t.aboutLines[idx]) el.textContent = t.aboutLines[idx];
  });
  document.getElementById('what-i-do').textContent = t.whatTitle;
  document.getElementById('projects').textContent = t.projectsTitle;
  document.getElementById('uttayo-desc').textContent = t.uttayoDesc;
  document.getElementById('uttayo-btn').textContent = t.uttayoBtn;
  document.getElementById('gomi-desc').textContent = t.gomiDesc;
  document.getElementById('gomi-btn').textContent = t.gomiBtn;
  document.getElementById('footer-kicker').textContent = t.footerKicker;
  document.getElementById('footer-text').textContent = t.footerText;

  const pillIds = ['pill1', 'pill2', 'pill3', 'pill4', 'pill5', 'pill6', 'pill7'];
  pillIds.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el && t.pills[idx]) el.textContent = t.pills[idx];
  });

  // Toggle active state visuals
  const enSpan = document.querySelector('#lang-toggle .en');
  const jaSpan = document.querySelector('#lang-toggle .ja');
  if (enSpan && jaSpan) {
    if (lang === 'en') {
      enSpan.classList.add('active');
      jaSpan.classList.remove('active');
    } else {
      jaSpan.classList.add('active');
      enSpan.classList.remove('active');
    }
  }

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle && t.langAriaLabel) {
    langToggle.setAttribute('aria-label', t.langAriaLabel);
  }
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
