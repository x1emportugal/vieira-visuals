/* ==========================================================
   Vieira Visuals
   O português vive no HTML (é o que o Google lê). Aqui só está
   a tradução inglesa e o comportamento da página.
   ========================================================== */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

/* ================= i18n ================= */
const EN = {
  'a11y.skip': 'Skip to the work',
  'nav.work': 'work', 'nav.process': 'process', 'nav.about': 'about', 'nav.contact': 'contact', 'nav.cta': 'WhatsApp',
  'cta.idea': 'Bring your idea to life',
  'hero.eyebrow': 'videomaker · algarve',
  'hero.title': 'visuals tailored<br>to every story<em>.</em>',
  'hero.sub': 'Video with a cinema eye for brands, beach clubs, hotels and events. Over ten years in the Algarve.',
  'hero.cta1': 'See the work', 'hero.cue': 'explore',
  'man.eyebrow': 'vieira visuals',
  'man.lead': 'Cinematic standard video for those who want to raise their brand in the Algarve. Beach clubs, hotels, restaurants and businesses that already know the value of a careful production.',
  'man.big': 'It’s not about doing more.<br>It’s about doing it <em>right</em>.',
  'kw.1': 'cinematic', 'kw.2': 'sophisticated', 'kw.3': 'timeless',
  'works.eyebrow': 'portfolio', 'works.title': 'work',
  'works.sub': 'A recent selection. Tap a video to watch it with sound.',
  'f.all': 'all', 'f.events': 'events', 'f.brands': 'brands', 'f.drone': 'drone', 'f.stories': 'stories',
  'w1.c': 'beach club', 'w1.t': 'Beach club sunset',
  'w2.c': 'drone', 'w2.t': 'The Algarve coast from above',
  'w3.c': 'restaurant', 'w3.t': 'A terrace with a signature',
  'w4.c': 'stories', 'w4.t': 'Waiting, at sunset',
  'w5.c': 'stage', 'w5.t': 'Show night',
  'w6.c': 'beach club', 'w6.t': 'DJ set against the light',
  'w7.c': 'hotel', 'w7.t': 'Afternoon at the hotel',
  'w8.c': 'music', 'w8.t': 'Live session',
  'w9.c': 'sport', 'w9.t': 'Triathlon, on the run course',
  'w10.c': 'lifestyle', 'w10.t': 'Golden light',
  'w11.c': 'food', 'w11.t': 'Live cooking',
  'w12.c': 'drone', 'w12.t': 'Olhão marina',
  'w13.c': 'beach club', 'w13.t': 'Full house',
  'w14.c': 'stage', 'w14.t': 'On stage',
  'proc.eyebrow': 'how I work', 'proc.title': 'three gestures, one story.',
  'proc.1.t': 'look first',
  'proc.1.d': 'Before I hit record, I listen. I want to understand the brand, the moment and the people. The film starts in that conversation.',
  'proc.2.t': 'frame with intent',
  'proc.2.d': 'On set I choose, on purpose, what deserves to stay in the shot. Filmed in 4K, with a drone when the story calls for it.',
  'proc.3.t': 'deliver to measure',
  'proc.3.d': 'Editing, colour and sound designed for where the video will live: website, social media or an event screen, with versions for every format.',
  'about.eyebrow': 'about',
  'about.p1': 'Over ten years on the road filming weddings, events and brand videos in the Algarve. My work comes from adapting to any context and audience: companies, agencies, churches and personal brands.',
  'about.p2': 'Every project gets the same technical care and the same cinema eye, whatever the scale or the budget. You hire a person, not an assembly line.',
  'about.s1': 'years on the road', 'about.s2': 'home base', 'about.s3': 'capture and delivery',
  'about.for': 'who I film for',
  't.1': 'brands', 't.2': 'agencies', 't.3': 'beach clubs', 't.4': 'hotels',
  't.5': 'restaurants', 't.6': 'events', 't.7': 'weddings', 't.8': 'churches',
  'contact.eyebrow': 'contact',
  'contact.title': 'shall we make films that last <em>forever</em>?',
  'contact.sub': 'Tell me your idea. I’ll help you bring it to life.',
  'footer.slogan': 'visuals tailored to every story.',
};
const UI = {
  pt: { watch: 'Ver vídeo: ', langTo: 'Mudar para inglês', menuOpen: 'Abrir menu', menuClose: 'Fechar menu',
        close: 'Fechar', prev: 'Vídeo anterior', next: 'Vídeo seguinte', title: 'Vieira Visuals | Videomaker no Algarve' },
  en: { watch: 'Watch video: ', langTo: 'Switch to Portuguese', menuOpen: 'Open menu', menuClose: 'Close menu',
        close: 'Close', prev: 'Previous video', next: 'Next video', title: 'Vieira Visuals | Videomaker in the Algarve' },
};

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* sem armazenamento: segue sem memorizar */ } },
};

// guarda o português original de cada elemento antes de qualquer troca
$$('[data-i18n]').forEach((el) => { el.dataset.pt = el.textContent; });
$$('[data-i18n-html]').forEach((el) => { el.dataset.ptHtml = el.innerHTML; });

let lang = store.get('vv-lang') === 'en' ? 'en' : 'pt';

function applyLang() {
  const en = lang === 'en';
  $$('[data-i18n]').forEach((el) => {
    const v = en ? EN[el.dataset.i18n] : el.dataset.pt;
    if (v != null) el.textContent = v;
  });
  $$('[data-i18n-html]').forEach((el) => {
    const v = en ? EN[el.dataset.i18nHtml] : el.dataset.ptHtml;
    if (v != null) el.innerHTML = v;
  });
  const ui = UI[lang];
  document.documentElement.lang = en ? 'en' : 'pt-PT';
  document.title = ui.title;
  $$('[data-lang-toggle]').forEach((b) => { b.textContent = en ? 'PT' : 'EN'; b.setAttribute('aria-label', ui.langTo); });
  $$('.work__btn').forEach((b) => { b.setAttribute('aria-label', ui.watch + $('.work__title', b).textContent); });
  $('.player__close').setAttribute('aria-label', ui.close);
  $('#playerPrev').setAttribute('aria-label', ui.prev);
  $('#playerNext').setAttribute('aria-label', ui.next);
  syncBurgerLabel();
}
$$('[data-lang-toggle]').forEach((b) => b.addEventListener('click', () => {
  lang = lang === 'pt' ? 'en' : 'pt';
  store.set('vv-lang', lang);
  applyLang();
}));

/* ================= cabeçalho ================= */
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const burger = $('#burger');
const menu = $('#menu');
function syncBurgerLabel() {
  const open = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-label', open ? UI[lang].menuClose : UI[lang].menuOpen);
}
function setMenu(open) {
  burger.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('is-locked', open);
  syncBurgerLabel();
  if (open) $('a', menu).focus();
}
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
$$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));

// link ativo conforme a secção visível
const navLinks = $$('.nav__links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['trabalhos', 'processo', 'sobre', 'contacto'].forEach((id) => { const s = document.getElementById(id); if (s) sectionObserver.observe(s); });

/* ================= hero em vídeo ================= */
const heroVideo = $('#heroVideo');
const tallScreen = matchMedia('(max-aspect-ratio: 4/5)');
const saveData = navigator.connection && navigator.connection.saveData;
const heroSrc = () => (tallScreen.matches ? heroVideo.dataset.srcTall : heroVideo.dataset.srcWide);

function startHero() {
  if (reduceMotion.matches || saveData) return; // fica o poster, sem gastar dados
  heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'));
  heroVideo.src = heroSrc();
  heroVideo.play().catch(() => {});
}
// o poster pinta primeiro; o vídeo só começa a descarregar depois da página carregada
if (document.readyState === 'complete') startHero();
else window.addEventListener('load', () => setTimeout(startHero, 150), { once: true });

tallScreen.addEventListener('change', () => {
  if (!heroVideo.getAttribute('src')) return;
  heroVideo.classList.remove('is-playing');
  heroVideo.src = heroSrc();
  heroVideo.play().catch(() => {});
});
// pausa o hero quando sai do ecrã
new IntersectionObserver(([e]) => {
  if (!heroVideo.getAttribute('src')) return;
  if (e.isIntersecting) heroVideo.play().catch(() => {}); else heroVideo.pause();
}).observe($('#topo'));

/* ================= entrada suave ================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    revealObserver.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
$$('[data-reveal],[data-reveal-stagger]').forEach((el) => revealObserver.observe(el));

/* ================= filtros ================= */
const chips = $$('.chip');
const works = $$('.work');
chips.forEach((chip) => chip.addEventListener('click', () => {
  const f = chip.dataset.filter;
  chips.forEach((c) => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
  works.forEach((w) => w.classList.toggle('is-hidden', f !== 'all' && w.dataset.cat !== f));
}));

/* ================= pré-visualização ao passar o rato ================= */
function previewVideo(btn) {
  let v = $('video', btn);
  if (!v) {
    v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
    v.setAttribute('aria-hidden', 'true');
    v.src = btn.dataset.video;
    v.addEventListener('playing', () => { if (btn.matches(':hover')) btn.classList.add('is-playing'); });
    $('img', btn).after(v);
  }
  return v;
}
$$('.work__btn').forEach((btn) => {
  btn.addEventListener('pointerenter', () => {
    if (!finePointer.matches || reduceMotion.matches) return;
    previewVideo(btn).play().catch(() => {});
  });
  btn.addEventListener('pointerleave', () => {
    const v = $('video', btn);
    if (v) v.pause();
    btn.classList.remove('is-playing');
  });
  btn.addEventListener('click', () => openPlayer(btn));
});

/* ================= leitor ================= */
const player = $('#player');
const pv = $('#playerVideo');
let queue = [];
let index = 0;
let lastFocus = null;

function renderPlayer() {
  const btn = queue[index];
  pv.poster = $('img', btn).currentSrc || $('img', btn).src;
  pv.src = btn.dataset.video;
  pv.muted = btn.hasAttribute('data-silent');
  $('#playerTag').textContent = $('.work__tag', btn).textContent;
  $('#playerTitle').textContent = $('.work__title', btn).textContent;
  const many = queue.length > 1;
  $('#playerPrev').hidden = !many;
  $('#playerNext').hidden = !many;
  pv.play().catch(() => { pv.muted = true; pv.play().catch(() => {}); });
}
function openPlayer(btn) {
  queue = $$('.work:not(.is-hidden) .work__btn');
  index = Math.max(0, queue.indexOf(btn));
  lastFocus = btn;
  $$('.work__btn video').forEach((v) => v.pause());
  renderPlayer();
  player.classList.add('is-open');
  player.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
  $('.player__close').focus();
}
function closePlayer() {
  pv.pause();
  pv.removeAttribute('src');
  pv.load(); // para a descarga do ficheiro
  player.classList.remove('is-open');
  player.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('is-locked');
  if (lastFocus) lastFocus.focus();
}
function step(dir) {
  index = (index + dir + queue.length) % queue.length;
  renderPlayer();
}
$$('[data-close]', player).forEach((el) => el.addEventListener('click', closePlayer));
$('#playerPrev').addEventListener('click', () => step(-1));
$('#playerNext').addEventListener('click', () => step(1));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); burger.focus(); return; }
  if (!player.classList.contains('is-open')) return;
  if (e.key === 'Escape') closePlayer();
  else if (e.key === 'ArrowLeft') step(-1);
  else if (e.key === 'ArrowRight') step(1);
  else if (e.key === 'Tab') { // mantém o foco dentro do leitor
    const f = $$('button:not([hidden]), video', player);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

applyLang();
