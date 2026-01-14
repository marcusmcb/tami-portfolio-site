import fs from 'node:fs';

function extractDecodedContent(html, projectUrl) {
  const marker = `"project_url":"${projectUrl}"`;
  const idx = html.indexOf(marker);
  if (idx < 0) {
    throw new Error(`marker not found for project_url=${projectUrl}`);
  }

  const slice = html.slice(idx);
  const key = '"content_no_html":"';
  const keyIndex = slice.indexOf(key);
  if (keyIndex < 0) {
    throw new Error('content_no_html not found');
  }

  let i = keyIndex + key.length;
  let out = '';
  let escaped = false;

  while (i < slice.length) {
    const ch = slice[i++];

    if (escaped) {
      out += `\\${ch}`;
      escaped = false;
      continue;
    }

    if (ch === '\\') {
      escaped = true;
      continue;
    }

    if (ch === '"') break;
    out += ch;
  }

  return JSON.parse('"' + out + '"');
}

function extractWixImageFileNames(html) {
  const matches = [...html.matchAll(/https?:\/\/static\.wixstatic\.com[^"\s>]+\.(?:png|jpg|jpeg|webp)/gi)].map((m) => m[0]);

  const fileNames = matches
    .map((url) => {
      try {
        return new URL(url).pathname.split('/').pop();
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return [...new Set(fileNames)];
}

function main() {
  const [htmlPath, projectUrl] = process.argv.slice(2);
  if (!htmlPath || !projectUrl) {
    console.error('Usage: node tools/extract-cargo-page.mjs <htmlPath> <projectUrl>');
    process.exit(2);
  }

  const html = fs.readFileSync(htmlPath, 'utf8');

  const decoded = extractDecodedContent(html, projectUrl);
  console.log('===CONTENT_NO_HTML===');
  console.log(decoded);
  console.log('===/CONTENT_NO_HTML===');

  const names = extractWixImageFileNames(html);
  console.log('\n===WIX_IMAGE_FILENAMES===');
  names.forEach((n) => console.log(n));
  console.log('===/WIX_IMAGE_FILENAMES===');
}

main();
