(function () {
  'use strict';

  const measurementId = 'G-EL5PQ3Q7Z3';
  const localHosts = new Set(['localhost', '127.0.0.1', '::1', '']);

  if (localHosts.has(window.location.hostname)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
  });

  function trackEvent(name, parameters) {
    window.gtag('event', name, parameters);
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href.startsWith('mailto:')) {
      trackEvent('contact_click', {
        contact_method: 'email',
        link_url: href,
      });
      return;
    }

    const url = new URL(link.href, window.location.href);
    if (url.hostname !== window.location.hostname) {
      trackEvent('outbound_link_click', {
        link_url: url.href,
        link_domain: url.hostname,
      });
    }
  });
}());
