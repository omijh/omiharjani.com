# omiharjani.com

Personal portfolio site deployed on GitHub Pages.

## Structure

- `index.html` — Main landing page with bilingual (EN/JA) content
- `styles.css` — All styles, single file
- `js/theme.js` — Shared seasonal theming + dark/light mode (loaded by both pages)
- `script.js` — Main page: translations, language toggle, fade-in observer
- `qr/index.html` — QR card landing page (for business cards)
- `404.html` — Custom 404 page with seasonal gradient
- `assets/` — `pic.jpeg`/`pic.webp` (profile photo), `qr-code.png`, seasonal favicon SVGs
- `.github/workflows/pages.yml` — Deploy to GitHub Pages on push to `main`
- `.nojekyll` — Prevent Jekyll processing on GitHub Pages

## Key Patterns

- **Seasonal theming**: `getCurrentSeason()` in `js/theme.js` checks current month → applies gradient background + favicon
- **Dark/light mode**: `applySeason()` in `js/theme.js` reads `prefers-color-scheme`, picks light/dark gradient variant, re-applies on system change
- **Bilingual content**: `translations` object with `en`/`ja` keys; `applyLanguage()` updates elements by ID using a data-driven `fieldMappings` array
- **Fade-in**: `.fade-in` class + IntersectionObserver in `setupFadeIns()`

## Common Tasks

- **Add a new skill pill**: Add a `<span class="pill" id="pillN">` in `index.html`, add the text in both `en`/`ja` `pills[]` in `script.js`, and add the `id` to the `pillIds` array
- **Add a seasonal theme**: Add an entry to `seasons` in `js/theme.js` with `months`, `light`/`dark` gradients, and `icon`, then create the favicon SVG in `assets/`
- **Add a new translation key**: Add the key to both `en`/`ja` objects in `translations`, add the element in `index.html` with a matching `id`, add the mapping `[id, key]` to `fieldMappings` in `script.js`
- **Profile photo**: Add WebP version in `assets/` alongside the JPEG; use `<picture>` in HTML for automatic fallback

## Deployment

Push to `main` → GitHub Actions deploys to `omiharjani.com` (CNAME-configured).
