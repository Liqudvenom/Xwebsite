import { mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages, pageBody } from '../server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'docs');
const base = '/Xwebsite';
// Only rewrite root-relative URLs, leaving protocol-relative and external URLs alone.
const htmlPaths = s => s.replace(/\b(href|src|action)=(['"])\/(?!\/)/g, `$1=$2${base}/`);
const cssPaths = s => s.replace(/url\(\s*(['"]?)\/(?!\/)/g, `url($1${base}/`);
const jsPaths = s => s
  .replace(/\b(href|src|action)=(['"])\/(?!\/)/g, `$1=$2${base}/`)
  .replace(/\b(fetch\(\s*['"])\/(?!\/)/g, `$1${base}/`);
await mkdir(out, { recursive: true });
for (const [route, page] of Object.entries(pages)) {
  const dir = path.join(out, route.slice(1));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), htmlPaths(pageBody(page, route)));
}
await cp(path.join(root, 'public', 'assets'), path.join(out, 'assets'), { recursive: true });
for (const [file, rewrite] of [['styles.css', cssPaths], ['app.js', jsPaths]]) {
  await writeFile(path.join(out, file), rewrite(await readFile(path.join(root, 'public', file), 'utf8')));
}
const site = 'https://liqudvenom.github.io/Xwebsite';
await writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(pages).map(route => `<url><loc>${site}${route === '/' ? '/' : `${route}/`}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /Xwebsite/api/\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(path.join(out, '.nojekyll'), '');
console.log(`Built ${Object.keys(pages).length} routes in docs/`);
