## Tami McBride - Portfolio Site

Source for Tami McBride's design portfolio site, www.tamimcbride.com

### What this repo contains

This is a simple static rebuild of the old Cargo-hosted site using exported HTML fragments saved in [legacy-code/](legacy-code).

The new site lives at the repo root:

- [index.html](index.html) (Work)
- [cv.html](cv.html)
- [leadership.html](leadership.html)
- [about.html](about.html)

Shared header/footer are in:

- [partials/header.html](partials/header.html)
- [partials/footer.html](partials/footer.html)

Styling and JS:

- [assets/css/site.css](assets/css/site.css)
- [assets/js/includes.js](assets/js/includes.js) (loads partials)

### How to run locally

Because the header/footer are loaded with `fetch()`, opening the HTML files via `file://` will usually not work. Run a local web server instead.

If you have Node.js installed:

1. `npx serve .`
2. Open the printed URL (usually `http://localhost:3000`)

If you have Python installed:

1. `python -m http.server 8000`
2. Open `http://localhost:8000`

### Adding images/media

Cargo exports use placeholders like `{image 25}` and `{audio ...}`. In the rebuilt pages those are currently represented as "TODO" placeholders.

- Put images in [assets/images/](assets/images)
- Replace the placeholders with real `<img src="assets/images/..." ...>` or embeds as you supply the media files

Marcus McBride, 2026