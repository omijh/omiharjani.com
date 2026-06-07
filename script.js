const translations = {
  en: {
    eyebrow: 'Cloud engineering, AI products, and hands-on experimentation.',
    subtitle: 'Cloud Engineer • AI Builder in Tokyo',
    location: 'Tokyo, Japan',
    currently: 'Currently',
    profile1: 'Cloud Engineer at MetLife Japan',
    profile2: 'Building reliable Azure and Kubernetes platforms with automation.',
    profile3: 'Always learning, testing new ideas — and building the occasional AI product.',
    aboutTitle: 'About',
    aboutLines: [
      'Builder mindset — I love making things that are genuinely useful.',
      'Cloud engineer by day, AI product maker by night. I share what I learn.',
      'Right now: AI‑powered tools + bilingual second‑hand marketplace for Japan (Uttayo).',
      'Outside work: exploring Tokyo neighborhoods and brushing up my Japanese.',
    ],
    whatTitle: 'What I Do',
    pills: ['Azure', 'AKS & Containers', 'Terraform & IaC', 'Next.js & React', 'Supabase', 'AI / LLM Apps', 'AWS'],
    projectsTitle: 'Projects',
    uttayoDesc: 'A bilingual second-hand goods platform in Japan with AI-assisted pricing and an ultra-simple listing flow.',
    uttayoBtn: 'View project',
    gomiDesc: 'A simple site that helps residents check trash day schedules in Japan, with a friendly mascot and clean UI.',
    gomiBtn: 'View project',
    status: 'Building Uttayo & GomiHelper · Studying 日本語',
    podcastDesc: 'A podcast chatting about startups, tech, and life in Japan.',
    podcastBtn: 'Listen →',
    moreLink: 'More on GitHub →',
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
    status: 'UttayoとGomiHelperを開発中 · 日本語勉強中',
    podcastDesc: 'スタートアップ、テクノロジー、日本の生活について語るポッドキャスト。',
    podcastBtn: '聴く →',
    moreLink: 'GitHubで見る →',
    footerKicker: 'つながりましょう。',
    footerText: 'クラウド、AI、スタートアップの話はいつでも歓迎です。',
    langAriaLabel: '英語と日本語の表示を切り替え',
  },
};

const fieldMappings = [
  ['eyebrow', 'eyebrow'],
  ['subtitle', 'subtitle'],
  ['location', 'location'],
  ['currently', 'currently'],
  ['profile-line1', 'profile1'],
  ['profile-line2', 'profile2'],
  ['profile-line3', 'profile3'],
  ['about', 'aboutTitle'],
  ['what-i-do', 'whatTitle'],
  ['projects', 'projectsTitle'],
  ['uttayo-desc', 'uttayoDesc'],
  ['uttayo-btn', 'uttayoBtn'],
  ['gomi-desc', 'gomiDesc'],
  ['gomi-btn', 'gomiBtn'],
  ['status', 'status'],
  ['podcast-desc', 'podcastDesc'],
  ['podcast-btn', 'podcastBtn'],
  ['more-link', 'moreLink'],
  ['footer-kicker', 'footerKicker'],
  ['footer-text', 'footerText'],
];

const aboutLineIds = ['about-line1', 'about-line2', 'about-line3', 'about-line4'];
const pillNames = ['pill1', 'pill2', 'pill3', 'pill4', 'pill5', 'pill6', 'pill7'];

function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  fieldMappings.forEach(([elId, key]) => {
    const el = document.getElementById(elId);
    if (el && t[key]) el.textContent = t[key];
  });

  aboutLineIds.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el && t.aboutLines[idx]) el.textContent = t.aboutLines[idx];
  });

  pillNames.forEach((name, idx) => {
    const el = document.querySelector(`[data-pill="${name}"]`);
    if (el && t.pills[idx]) el.textContent = t.pills[idx];
  });

  document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle && t.langAriaLabel) {
    langToggle.setAttribute('aria-label', t.langAriaLabel);
  }

  const enSpan = document.querySelector('#lang-toggle .en');
  const jaSpan = document.querySelector('#lang-toggle .ja');
  if (enSpan && jaSpan) {
    enSpan.classList.toggle('active', lang === 'en');
    jaSpan.classList.toggle('active', lang === 'ja');
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
  applySeason(getCurrentSeason());
  setYear();
  setupFadeIns();

  let currentLang = localStorage.getItem('lang') || 'en';
  applyLanguage(currentLang);

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'ja' : 'en';
      localStorage.setItem('lang', currentLang);
      applyLanguage(currentLang);
    });
  }
});
