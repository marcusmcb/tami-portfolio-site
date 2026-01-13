## Tami McBride - Portfolio Site

Source for Tami McBride's design portfolio site, www.tamimcbride.com

### What this repo contains

This repo contains an Astro-based static site (SEO-friendly, no runtime includes) plus the original HTML rebuild for reference.

Current site (Astro):

- Pages live under [src/pages/](src/pages)
- Shared layout/components live under [src/layouts/](src/layouts) and [src/components/](src/components)
- Static files (CSS/images) are served from [public/](public)

Legacy reference (old static HTML rebuild):

- Old HTML pages and runtime includes live under [legacy/](legacy)
- Cargo export fragments preserved in [legacy/legacy-code/](legacy/legacy-code)

### Fonts

The Cargo site uses a webfont called **ROM Variable**. This rebuild references that font via `@font-face` URLs hosted on `https://type.cargo.site` (no font files are stored in this repo). If the font can’t be loaded for any reason, the site falls back to system UI fonts.

### How to run locally

1. `npm install`
2. `npm run dev`
3. Open the printed URL (usually `http://localhost:4321`)

Build a static deployable site:

1. `npm run build`
2. Output is in `dist/`

Firebase Hosting note: configure Hosting to deploy the `dist/` folder.

### Adding images/media

Cargo exports use placeholders like `{image 25}` and `{audio ...}`. In the rebuilt pages those are currently represented as "TODO" placeholders.

- Put images in [public/assets/images/](public/assets/images)
- Use absolute paths in pages like `<img src="/assets/images/..." ...>` so they work on every route

Marcus McBride, 2026