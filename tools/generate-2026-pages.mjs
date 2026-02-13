import fs from 'node:fs/promises';
import path from 'node:path';

const workspaceRoot = path.resolve(process.cwd());
const sourceDir = path.join(workspaceRoot, '2026_new_content');
const outPagesDir = path.join(workspaceRoot, 'src', 'pages');

const EMAIL = 'tamimcb@gmail.com';

const routeRewrites = new Map([
  ['index.html', '/'],
  ['case-study-1.html', '/case-study-1'],
  ['case-study-2.html', '/case-study-2'],
  ['case-study-3.html', '/case-study-3'],
]);

function extractBetween(html, startToken, endToken) {
  const start = html.indexOf(startToken);
  if (start === -1) return '';
  const end = html.indexOf(endToken, start + startToken.length);
  if (end === -1) return '';
  return html.slice(start + startToken.length, end);
}

function extractFirstMatch(html, regex) {
  const match = html.match(regex);
  return match ? match[1] : '';
}

function stripScriptsFromBody(bodyHtml) {
  return bodyHtml.replace(/<script\b[\s\S]*?<\/script>\s*/gi, '');
}

function replaceCloudflareEmail(bodyHtml) {
  // Replace the whole CF anchor block with a normal mailto.
  return bodyHtml.replace(
    /<div class="contact-value">\s*<a[^>]*>\s*<span[^>]*>\[[^\]]*\]<\/span>\s*<\/a>\s*<\/div>/gi,
    `<div class="contact-value"><a href="mailto:${EMAIL}">${EMAIL}</a></div>`,
  );
}

function rewriteRelativeAssetUrls(html) {
  // Prefix relative asset links (images, pdf, video, svg) with /2026/
  // but skip hash links, absolute URLs, mailto, tel, and already-rooted paths.
  const attrRegex = /(\b(?:src|href|poster)=")(?!https?:\/\/|\/|#|mailto:|tel:)([^"]+)(")/gi;
  return html.replace(attrRegex, (full, pre, url, post) => {
    // Route rewrites first
    if (routeRewrites.has(url)) {
      return `${pre}${routeRewrites.get(url)}${post}`;
    }

    // Keep non-asset relative links as-is (e.g. section anchors don't match this regex)
    // For files, always treat as asset under /2026/
    return `${pre}/2026/${url}${post}`;
  });
}

function rewriteCaseStudyLinks(html) {
  // Catch any remaining href="case-study-*.html" occurrences.
  for (const [from, to] of routeRewrites.entries()) {
    html = html.replaceAll(`href="${from}"`, `href="${to}"`);
  }
  return html;
}

function buildAstroPage({ title, description, css, body }) {
  return `---\nimport HtmlLayout2026 from '../layouts/HtmlLayout2026.astro';\n---\n\n<HtmlLayout2026 title=${JSON.stringify(
    title,
  )} description=${JSON.stringify(description)} >\n  <Fragment slot="head">\n    <style>\n${css.trim()}\n    </style>\n  </Fragment>\n\n${body.trim()}\n</HtmlLayout2026>\n`;
}

async function convertFile(fileName, outName) {
  const srcPath = path.join(sourceDir, fileName);
  const html = await fs.readFile(srcPath, 'utf8');

  const title = extractFirstMatch(html, /<title>([^<]+)<\/title>/i);
  const description = extractFirstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i);
  const css = extractBetween(html, '<style>', '</style>');

  let body = extractBetween(html, '<body', '</body>');
  // body extraction includes attributes; re-grab from first closing angle bracket
  const firstAngle = body.indexOf('>');
  body = firstAngle !== -1 ? body.slice(firstAngle + 1) : body;

  body = stripScriptsFromBody(body);
  body = replaceCloudflareEmail(body);
  body = rewriteRelativeAssetUrls(body);
  body = rewriteCaseStudyLinks(body);

  const astro = buildAstroPage({ title, description, css, body });
  await fs.writeFile(path.join(outPagesDir, outName), astro, 'utf8');
}

await fs.mkdir(outPagesDir, { recursive: true });

await convertFile('index.html', 'index.astro');
await convertFile('case-study-1.html', 'case-study-1.astro');
await convertFile('case-study-2.html', 'case-study-2.astro');
await convertFile('case-study-3.html', 'case-study-3.astro');

console.log('Generated 2026 pages into src/pages/.');
