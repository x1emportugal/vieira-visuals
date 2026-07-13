/* ================= i18n (PT-PT padrão / EN) ================= */
const I18N = {
  pt: {
    'nav.home': 'Início', 'nav.work': 'Trabalhos', 'nav.about': 'Sobre', 'nav.contact': 'Contacto',
    'nav.search': 'Procurar projetos...',
    'hero.eyebrow': 'Filmes · Algarve',
    'hero.title': 'Histórias que<br>Vale a Pena Ver<em>.</em>',
    'hero.sub': 'Filmes cinematográficos para marcas, restaurantes, beach clubs e eventos inesquecíveis.',
    'hero.cta1': 'Explorar trabalhos',
    'hero.scroll': 'Role para explorar',
    'cat.eyebrow': 'Portefólio', 'cat.title': 'Explorar categorias',
    'cat.sub': 'Cada tipo de história pede uma linguagem. Escolha a sua.',
    'cat.sunset': 'Fins de Tarde', 'cat.beach': 'Beach Clubs', 'cat.djs': 'DJs', 'cat.rest': 'Restaurantes',
    'cat.wed': 'Casamentos', 'cat.events': 'Eventos & Festas', 'cat.night': 'Vida Noturna', 'cat.brands': 'Marcas',
    'motion.eyebrow': 'Previews', 'motion.title': 'Em movimento',
    'motion.sub': 'Passe o cursor para dar play — como numa sala de cinema só sua.',
    'motion.v1': 'Beach Club · Aftermovie', 'motion.v2': 'Sunset Set · DJ',
    'about.eyebrow': 'Sobre',
    'about.p1': 'Há mais de 10 anos a filmar o Algarve — de casamentos a beach clubs, de marcas a fins de tarde que mereciam cinema. Cada evento acontece uma vez só; o meu trabalho é fazer com que possa ser revisto mil vezes, com a emoção da primeira.',
    'about.p2': 'Contrata uma pessoa, não uma linha de montagem: do primeiro contacto ao ficheiro final, é a mesma cabeça a pensar o seu filme.',
    'about.s1': 'anos de experiência', 'about.s2': 'base de operação', 'about.s3': 'captação e entrega',
    'contact.eyebrow': 'Contacto',
    'contact.title': 'Vamos criar algo que ninguém mais faria', 'contact.titleAccent': 'assim?',
    'contact.cta2': 'Agendar uma reunião',
  },
  en: {
    'nav.home': 'Home', 'nav.work': 'Work', 'nav.about': 'About', 'nav.contact': 'Contact',
    'nav.search': 'Search projects...',
    'hero.eyebrow': 'Films · Algarve',
    'hero.title': 'Stories Worth<br>Watching<em>.</em>',
    'hero.sub': 'Cinematic films for brands, restaurants, beach clubs and unforgettable events.',
    'hero.cta1': 'Explore work',
    'hero.scroll': 'Scroll to explore',
    'cat.eyebrow': 'Portfolio', 'cat.title': 'Explore categories',
    'cat.sub': 'Every kind of story calls for its own language. Choose yours.',
    'cat.sunset': 'Sunset Sessions', 'cat.beach': 'Beach Clubs', 'cat.djs': 'DJs', 'cat.rest': 'Restaurants',
    'cat.wed': 'Weddings', 'cat.events': 'Events & Parties', 'cat.night': 'Nightlife', 'cat.brands': 'Brands',
    'motion.eyebrow': 'Previews', 'motion.title': 'In motion',
    'motion.sub': 'Hover to play — like a private screening room.',
    'motion.v1': 'Beach Club · Aftermovie', 'motion.v2': 'Sunset Set · DJ',
    'about.eyebrow': 'About',
    'about.p1': 'Filming the Algarve for over 10 years — from weddings to beach clubs, from brands to golden hours that deserved cinema. Every event happens only once; my job is to make it worth rewatching a thousand times, with the emotion of the first.',
    'about.p2': 'You hire a person, not an assembly line: from the first call to the final file, it is the same mind shaping your film.',
    'about.s1': 'years of experience', 'about.s2': 'based in', 'about.s3': 'capture & delivery',
    'contact.eyebrow': 'Contact',
    'contact.title': 'Let’s create something nobody else would make', 'contact.titleAccent': 'like this?',
    'contact.cta2': 'Book a meeting',
  }
};

let lang = localStorage.getItem('vv-lang') || 'pt';

function applyLang() {
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });
  document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en';
  document.querySelectorAll('.lang-toggle').forEach((b) => { b.textContent = lang === 'pt' ? 'EN' : 'PT'; });
  localStorage.setItem('vv-lang', lang);
}
document.querySelectorAll('.lang-toggle, #langToggle, #langToggleMobile').forEach(() => {});
['langToggle', 'langToggleMobile'].forEach((id) => {
  const b = document.getElementById(id);
  if (b) b.addEventListener('click', () => { lang = lang === 'pt' ? 'en' : 'pt'; applyLang(); });
});
applyLang();

/* ================= Reveal on scroll ================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => revealObserver.observe(el));

/* ================= Mobile menu ================= */
const mobileMenu = document.getElementById('mobileMenu');
document.getElementById('navBurger').addEventListener('click', () => mobileMenu.classList.add('is-open'));
document.getElementById('menuClose').addEventListener('click', () => mobileMenu.classList.remove('is-open'));
mobileMenu.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', () => mobileMenu.classList.remove('is-open')));

/* ================= Nav ativo por seção ================= */
const sections = ['topo', 'trabalhos', 'movimento', 'sobre', 'contato']
  .map((id) => document.getElementById(id)).filter(Boolean);
const navAnchors = [...document.querySelectorAll('.topnav__links a, .sidebar a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id === 'movimento' ? 'trabalhos' : entry.target.id;
    navAnchors.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((s) => sectionObserver.observe(s));

/* ================= Lightbox rotativo (estilo Apple) ================= */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const lbTitle = document.getElementById('lightboxTitle');
const lbDots = document.getElementById('lightboxDots');
let lbPhotos = [];
let lbIndex = 0;
let lbTimer = null;

function lbRender() {
  lbImg.src = 'assets/photos/' + lbPhotos[lbIndex] + '.jpg';
  [...lbDots.children].forEach((d, i) => d.classList.toggle('on', i === lbIndex));
}
function lbGo(dir) {
  lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
  lbRender();
  lbRestartTimer();
}
function lbRestartTimer() {
  clearInterval(lbTimer);
  if (lbPhotos.length > 1) lbTimer = setInterval(() => lbGo(1), 4000);
}
function lbOpen(photos, title) {
  lbPhotos = photos;
  lbIndex = 0;
  lbTitle.textContent = title;
  lbDots.innerHTML = photos.map(() => '<i></i>').join('');
  lbRender();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lb-lock');
  lbRestartTimer();
}
function lbClose() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lb-lock');
  clearInterval(lbTimer);
}
document.querySelectorAll('[data-lightbox]').forEach((card) => {
  card.addEventListener('click', () => {
    const photos = card.getAttribute('data-lightbox').split(',');
    const key = card.getAttribute('data-title-key');
    lbOpen(photos, I18N[lang][key] || '');
  });
});
document.getElementById('lightboxClose').addEventListener('click', lbClose);
document.getElementById('lightboxPrev').addEventListener('click', () => lbGo(-1));
document.getElementById('lightboxNext').addEventListener('click', () => lbGo(1));
lightbox.querySelector('.lightbox__backdrop').addEventListener('click', lbClose);
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbGo(-1);
  if (e.key === 'ArrowRight') lbGo(1);
});

/* ================= Vídeos: play no hover (estilo Netflix) ================= */
document.querySelectorAll('[data-hoverplay]').forEach((card) => {
  const video = card.querySelector('video');
  const source = video.querySelector('source[data-src]');
  function ensureLoaded() {
    if (source && !source.src) { source.src = source.dataset.src; video.load(); }
  }
  function play() {
    ensureLoaded();
    video.muted = true;
    const p = video.play();
    if (p && p.catch) p.catch(() => {
      video.addEventListener('canplay', () => { video.play().catch(() => {}); }, { once: true });
    });
    card.classList.add('is-playing');
  }
  function pause() {
    if (!video.paused) video.pause();
    card.classList.remove('is-playing');
  }
  card.addEventListener('mouseenter', play);
  card.addEventListener('mouseleave', pause);
  // Touch: toque alterna play/pause
  card.addEventListener('touchstart', () => { video.paused ? play() : pause(); }, { passive: true });
});
