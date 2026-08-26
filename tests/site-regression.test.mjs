import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

// Above-the-fold content must render without waiting for JavaScript.
assert.doesNotMatch(
  html,
  /<div class="hero__content"[^>]*\bdata-reveal\b/,
  'hero content is hidden until JavaScript runs'
);

// An empty image source makes the browser request the HTML page as an image.
assert.doesNotMatch(
  html,
  /<img[^>]*\bsrc=""[^>]*>/,
  'an image has an empty src attribute'
);

// The hero must use the complete square portrait, not the pre-cropped SVG.
assert.match(
  html,
  /<div class="hero__figure"[^>]*>[\s\S]*?<img[^>]*src="assets\/photos\/lucas\.jpg"/,
  'hero does not use the complete Lucas portrait'
);

// The fixed 88px navigation must not cover the top of the portrait on desktop.
assert.match(
  css,
  /\.hero__figure\{[^}]*\btop:88px;/,
  'desktop navigation overlaps and crops the top of the hero portrait'
);

console.log('site regression checks passed');
