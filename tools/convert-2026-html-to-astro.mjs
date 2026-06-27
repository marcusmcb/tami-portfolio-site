import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());
const IN_DIR = path.join(ROOT, '2026_new_content');
const OUT_DIR = path.join(ROOT, 'src', 'pages');

const EMAIL = 'tami.mcbride.design@gmail.com';

function extractFirst(regex, text, label) {
  const match = text.match(regex);
  if (!match) throw new Error(`Could not extract ${label}`);
  return match[1];
}

function stripScripts(html) {
  // Remove all script blocks (Cloudflare decode + theme toggle + scroll spy)
  return html.replace(/<script[\s\S]*?<\/script>\s*/gi, '');
}

function rewriteLinksAndAssets(html) {
  let out = html;

  // Internal page links
  out = out
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="case-study-1.html"', 'href="/case-study-1"')
    .replaceAll('href="case-study-2.html"', 'href="/case-study-2"')
    .replaceAll('href="case-study-3.html"', 'href="/case-study-3"');

  // Replace resume link
  out = out.replaceAll(
    'href="Tami_McBride_-_Design_Leadership_Resume.pdf"',
    'href="/2026/Tami_McBride_-_Design_Leadership_Resume.pdf"'
  );

  // Prefix local src/href assets with /2026/ (excluding already-absolute, hash links, and our rewritten routes)
  out = out.replace(/\b(src|href)="(?!https?:\/\/|#|\/)([^\"]+)"/g, (m, attr, value) => {
    if (value.endsWith('.html')) return `${attr}="${value}"`; // should have been rewritten above
    return `${attr}="/2026/${value}"`;
  });

  // De-obfuscate email (Cloudflare email-protection snippet)
  out = out.replace(
    /<div class="contact-value">[\s\S]*?<\/div>\s*<\/div>/i,
    `<div class="contact-value"><a href="mailto:${EMAIL}">${EMAIL}</a></div></div>`
  );

  return out;
}

function toAstro({ title, description, css, bodyHtml }) {
  const escapedTitle = title.replace(/"/g, '&quot;');
  const escapedDescription = description?.replace(/"/g, '&quot;');

  return `---\nimport HtmlLayout2026 from '../layouts/HtmlLayout2026.astro';\n---\n\n<HtmlLayout2026\n  title="${escapedTitle}"\n  ${escapedDescription ? `description="${escapedDescription}"` : ''}\n>\n  <Fragment slot="head">\n    <style>\n${css.trim()}\n    </style>\n  </Fragment>\n\n  ${bodyHtml.trim()}\n</HtmlLayout2026>\n`;
}

async function convertOne(inFile, outFile) {
  const inPath = path.join(IN_DIR, inFile);
  const raw = await fs.readFile(inPath, 'utf8');

  const title = extractFirst(/<title>([^<]+)<\/title>/i, raw, 'title');
  const descriptionMatch = raw.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/>/i);
  const description = descriptionMatch ? descriptionMatch[1] : undefined;

  const css = extractFirst(/<style>([\s\S]*?)<\/style>/i, raw, 'style');
  const body = extractFirst(/<body>([\s\S]*?)<\/body>/i, raw, 'body');

  let bodyHtml = stripScripts(body);
  bodyHtml = rewriteLinksAndAssets(bodyHtml);

  // Case-study pages have their own <nav class="top-nav"> etc in body; keep as-is.

  const astro = toAstro({ title, description, css, bodyHtml });
  await fs.writeFile(path.join(OUT_DIR, outFile), astro, 'utf8');
}

await convertOne('index.html', 'index.astro');
await convertOne('case-study-1.html', 'case-study-1.astro');
await convertOne('case-study-2.html', 'case-study-2.astro');
await convertOne('case-study-3.html', 'case-study-3.astro');

console.log('Converted 2026 HTML → Astro pages.');
