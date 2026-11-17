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
  'a11y.skip': 'Skip to the portfolio',
  'nav.work': 'Portfolio', 'nav.process': 'Our process', 'nav.about': 'About', 'nav.contact': 'Contact', 'nav.cta': 'WhatsApp',
  'cta.idea': 'Bring your idea to life',
  'hero.eyebrow': 'Videomaker · Algarve',
  'hero.title': 'Tailored visual<br>productions for every story<em>.</em>',
  'hero.sub': 'We create with a cinematic eye for brands, spaces and experiences.',
  'hero.cta1': 'Portfolio', 'hero.cta2': 'Shall we talk about your project?', 'hero.cue': 'Explore',
  'man.eyebrow': 'Vieira Visuals',
  'man.lead': 'If you already understand that your business depends on positioning, showing excellence and exclusivity online.',
  'man.big': 'Good content can say <em>more</em> than many words.',
  'kw.1': 'Cinematic', 'kw.2': 'Sophisticated', 'kw.3': 'Timeless',
  'works.eyebrow': 'Get to know us', 'works.title': 'Portfolio',
  'works.sub': 'A recent selection. Tap a card to watch it with sound.',
  'show.want': 'I want a video like this', 'show.sound': 'Watch with sound',
  'f.all': 'All', 'f.events': 'Events', 'f.brands': 'Brands', 'f.drone': 'Drone', 'f.stories': 'Stories',
  'w1.c': 'Beach club', 'w1.t': 'Beach club sunset',
  'w2.c': 'Drone', 'w2.t': 'The Algarve coast from above',
  'w3.c': 'Restaurant', 'w3.t': 'A terrace with a signature',
  'w4.c': 'Stories', 'w4.t': 'Waiting, at sunset',
  'w5.c': 'Stage', 'w5.t': 'Show night',
  'w6.c': 'Beach club', 'w6.t': 'DJ set against the light',
  'w7.c': 'Hotel', 'w7.t': 'Afternoon at the hotel',
  'w8.c': 'Music', 'w8.t': 'Live session',
  'w9.c': 'Sport', 'w9.t': 'Triathlon, on the run course',
  'w10.c': 'Lifestyle', 'w10.t': 'Golden light',
  'w11.c': 'Food', 'w11.t': 'Live cooking',
  'w12.c': 'Drone', 'w12.t': 'Olhão marina',
  'w13.c': 'Beach club', 'w13.t': 'Full house',
  'w14.c': 'Stage', 'w14.t': 'On stage',
  'proc.eyebrow': 'Our process', 'proc.title': 'Step by step, building your film.',
  'proc.1.t': 'Understand first',
  'proc.1.d': 'Before the camera is switched on, we listen and want to understand the brand, the moment and the goals. The film starts here.',
  'proc.2.t': 'Frame with care',
  'proc.2.d': 'From choosing the equipment and location to writing the script, everything makes sense with your brand’s goal.',
  'proc.3.t': 'Deliver with intent',
  'proc.3.d': 'Post-production is designed for where the video will live: website, social media or the event screen. Specific versions for every format.',
  'about.eyebrow': 'About',
  'about.p1': 'Over the last 3 years we have worked with many brands, from luxury resorts and beach clubs to corporate events, sport and local businesses.',
  'about.p2': 'Our passion comes from adapting to any context and audience.',
  'about.p3': 'Always giving every project the same technical care and the same cinematic eye, whatever the scale or the budget. Hire something exclusive, not an assembly line.',
  'about.s1': 'Aerial footage', 'about.s2': 'Home base', 'about.s3': 'Capture and delivery',
  'about.for': 'Who I film for',
  't.1': 'Brands', 't.2': 'Agencies', 't.3': 'Beach clubs', 't.4': 'Hotels',
  't.5': 'Restaurants', 't.6': 'Events', 't.7': 'Weddings', 't.8': 'Churches',
  'contact.eyebrow': 'Contact',
  'contact.title': 'Ready to raise the audiovisual production of your <em>business</em>?',
  'contact.cta1': 'Contact', 'contact.cta2': 'Follow us',
  'contact.sub': 'Let’s make films that position you.',
  'faq.eyebrow': 'Frequently asked questions', 'faq.title': 'The essentials, in a few words.',
  'faq.1.q': 'Do you only work in the Algarve?',
  'faq.1.a': 'Our base is the Algarve, where we film and know most marina and private-show projects. But we are open to exploring the world, recording everything.',
  'faq.2.q': 'How do I ask for a quote?',
  'faq.2.a': 'Just tell us your idea by WhatsApp (+351 965 014 576) or by email (trabalhecomvieira2@gmail.com). We reply as soon as possible so we can take your film off the page.',
  'faq.3.q': 'Are there any production restrictions?',
  'faq.3.a': 'Every production is personalised and aligned in prior meetings on expectations and production.',
  'faq.4.q': 'Which brands have you worked with?',
  'faq.4.a': 'Grupo Nosolo, MOOV gym, Ballet Burn the Floor, Active Body and BF Security, as well as private events and local businesses.',
  'footer.slogan': 'Visuals tailored to every story.',
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
  document.dispatchEvent(new Event('langchange'));
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
  if (lastFocus && lastFocus.offsetParent) lastFocus.focus();
  document.dispatchEvent(new Event('playerclose'));
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


/* ================= portfólio: cartões em profundidade ================= */
const showEl = $('#show');
if (showEl) {
  const deck = $('#showDeck');
  const bg = $('#showBg');
  const T = {
    pt: { v: 'Redes sociais · 9:16', h: 'Site e YouTube · 16:9', msg: (t) => `Olá Lucas! Vi o vídeo "${t}" no site e queria um vídeo assim para o meu negócio.` },
    en: { v: 'Social media · 9:16', h: 'Website and YouTube · 16:9', msg: (t) => `Hi Lucas! I saw the video "${t}" on the website and I'd like a video like this for my business.` },
  };
  const items = works.map((w) => {
    const btn = $('.work__btn', w);
    const img = $('img', btn);
    const card = document.createElement('div');
    card.className = 'show__card';
    card.innerHTML = `<img src="${img.getAttribute('src')}" alt="" loading="lazy" decoding="async"><span class="show__n"></span><span class="show__cap"><span class="show__title"></span><span class="show__tag"></span></span>`;
    deck.append(card);
    return { w, btn, img, card };
  });
  const rv = document.createElement('video');
  rv.className = 'show__video';
  rv.muted = true; rv.loop = true; rv.playsInline = true; rv.preload = 'metadata';
  rv.setAttribute('aria-hidden', 'true');
  let list = items;
  let cur = 0;
  let inView = false;
  let hold = false;
  let timer = 0;
  const AUTO = 7000;
  const pad = (n) => String(n).padStart(2, '0');
  const schedule = () => {
    clearTimeout(timer);
    if (inView && !hold && !reduceMotion.matches && !player.classList.contains('is-open')) timer = setTimeout(() => show(cur + 1), AUTO);
  };
  const playIfVisible = () => { if (inView && !reduceMotion.matches && !player.classList.contains('is-open')) rv.play().catch(() => {}); };

  function layout() {
    const n = list.length;
    items.forEach((it) => {
      const k = list.indexOf(it);
      let o = k - cur;
      if (k < 0) { it.card.hidden = true; return; }
      if (o > n / 2) o -= n;
      if (o < -n / 2) o += n;
      const a = Math.abs(o);
      it.card.hidden = a > 3;
      it.card.style.setProperty('--o', o);
      it.card.style.setProperty('--a', a);
      it.card.style.zIndex = String(10 - a);
      it.card.classList.toggle('is-on', o === 0);
      it.card.setAttribute('aria-hidden', String(o !== 0));
      $('.show__n', it.card).textContent = `${pad(k + 1)} / ${pad(n)}`;
    });
  }
  function show(i, play = true) {
    if (!list.length) return;
    cur = (i + list.length) % list.length;
    const it = list[cur];
    layout();
    bg.src = it.img.getAttribute('src');
    const tag = $('.work__tag', it.btn).textContent;
    const title = $('.work__title', it.btn).textContent;
    $('#showTag').textContent = tag;
    $('#showFmt').textContent = T[lang][it.w.dataset.o === 'v' ? 'v' : 'h'];
    $('#showWant').href = `https://wa.me/351965014576?text=${encodeURIComponent(T[lang].msg(title))}`;
    if (rv.dataset.src !== it.btn.dataset.video) {
      it.card.classList.remove('is-ready');
      rv.dataset.src = it.btn.dataset.video;
      rv.poster = it.img.getAttribute('src');
      rv.src = it.btn.dataset.video;
    }
    it.card.prepend(rv);
    if (play) playIfVisible();
    schedule();
  }
  function labels() {
    items.forEach((it) => {
      $('.show__title', it.card).textContent = $('.work__title', it.btn).textContent;
      $('.show__tag', it.card).textContent = $('.work__tag', it.btn).textContent;
    });
    show(cur, false);
  }
  function openWithSound() { clearTimeout(timer); rv.pause(); openPlayer(list[cur].btn); }

  rv.addEventListener('playing', () => rv.parentElement && rv.parentElement.classList.add('is-ready'));
  items.forEach((it) => it.card.addEventListener('click', () => {
    if (moved) return;
    const k = list.indexOf(it);
    if (k === cur) openWithSound(); else if (k >= 0) show(k);
  }));
  $('#showPrev').addEventListener('click', () => show(cur - 1));
  $('#showNext').addEventListener('click', () => show(cur + 1));
  $('#showSound').addEventListener('click', openWithSound);
  showEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { show(cur + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { show(cur - 1); e.preventDefault(); }
  });
  // arrastar com o dedo ou o rato
  let x0 = null;
  let moved = false;
  deck.addEventListener('pointerdown', (e) => { x0 = e.clientX; moved = false; });
  deck.addEventListener('pointermove', (e) => { if (x0 !== null && Math.abs(e.clientX - x0) > 12) moved = true; });
  const end = (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
    setTimeout(() => { moved = false; }, 0);
  };
  deck.addEventListener('pointerup', end);
  deck.addEventListener('pointercancel', () => { x0 = null; });

  chips.forEach((chip) => chip.addEventListener('click', () => {
    const was = list[cur];
    list = items.filter((x) => !x.w.classList.contains('is-hidden'));
    show(Math.max(0, list.indexOf(was)));
  }));
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView) playIfVisible(); else rv.pause();
    schedule();
  }, { threshold: 0.35 }).observe(deck);
  // pausa o avanço automático enquanto o visitante está a ver ou a mexer
  deck.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hold = true; clearTimeout(timer); } });
  deck.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hold = false; schedule(); } });
  showEl.addEventListener('focusin', () => { hold = true; clearTimeout(timer); });
  showEl.addEventListener('focusout', () => { hold = false; schedule(); });
  document.addEventListener('playerclose', () => { playIfVisible(); schedule(); });
  document.addEventListener('langchange', labels);

  showEl.hidden = false;
  showEl.closest('.works').classList.add('has-show');
  labels();
}

applyLang();
