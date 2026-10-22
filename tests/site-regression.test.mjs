import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root), 'utf8');
const html = read('index.html');
const css = read('styles.css');
const js = read('script.js');

// O conteúdo do hero tem de aparecer sem esperar pelo JavaScript.
const hero = html.slice(html.indexOf('<section class="hero"'), html.indexOf('</section>', html.indexOf('<section class="hero"')));
assert.doesNotMatch(hero, /\bdata-reveal\b/, 'o hero fica escondido até o JavaScript correr');

// Os elementos com entrada suave só ficam invisíveis quando há JS.
assert.doesNotMatch(css, /(^|\})\s*\[data-reveal\]\s*\{[^}]*opacity:0/, 'data-reveal esconde conteúdo mesmo sem JS');
assert.match(html, /classList\.add\('js'\)/, 'falta a marca .js no <html>');

// Um src vazio faz o browser pedir a própria página como imagem.
assert.doesNotMatch(html, /<(img|video|source)[^>]*\bsrc=""/, 'há um src vazio');

// Todos os ficheiros locais referenciados existem e não estão vazios.
const refs = new Set();
for (const m of html.matchAll(/(?:src|href|srcset|data-video|data-src-wide|data-src-tall|poster)="([^"#?]+)/g)) {
  const p = m[1];
  if (/^(https?:|mailto:|tel:|data:)/.test(p)) continue;
  refs.add(p);
}
for (const p of refs) {
  const u = new URL(p, root);
  assert.ok(existsSync(u), `ficheiro em falta: ${p}`);
  assert.ok(statSync(u).size > 0, `ficheiro vazio: ${p}`);
}

// Regra de escrita do projeto: nada de travessões no texto entregue.
for (const [name, src] of [['index.html', html], ['script.js', js]]) {
  assert.ok(!src.includes('—'), `${name} tem travessões`);
}

// Cores e tipografia do manual de marca.
for (const c of ['#4C1600', '#E5E8D3', '#FFB116', '#836C36', '#563718']) {
  assert.ok(css.toUpperCase().includes(c), `falta a cor da marca ${c}`);
}
assert.match(html, /family=Manrope/, 'falta a Manrope, a tipografia corporativa');

// Contacto certo em todos os botões de WhatsApp.
const wa = [...html.matchAll(/wa\.me\/(\d+)/g)].map((m) => m[1]);
assert.ok(wa.length >= 3, 'faltam ligações de WhatsApp');
assert.ok(wa.every((n) => n === '351965014576'), 'número de WhatsApp errado');

// Cada trabalho tem título e etiqueta traduzidos.
for (const m of html.matchAll(/data-i18n="(w\d+\.[ct])"/g)) {
  assert.ok(js.includes(`'${m[1]}'`), `sem tradução inglesa para ${m[1]}`);
}

// Básicos de SEO.
assert.match(html, /<html lang="pt-PT">/);
assert.match(html, /rel="canonical"/);
assert.match(html, /application\/ld\+json/);
assert.ok(existsSync(new URL('robots.txt', root)) && existsSync(new URL('sitemap.xml', root)), 'faltam robots.txt ou sitemap.xml');

console.log(`site regression checks passed (${refs.size} ficheiros locais verificados)`);
