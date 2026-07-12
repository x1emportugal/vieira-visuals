// Reveal-on-scroll for sections and staggered grids.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal],[data-reveal-stagger]').forEach((el) => revealObserver.observe(el));

// Mobile menu open/close.
const mobileMenu = document.getElementById('mobileMenu');
document.getElementById('navBurger').addEventListener('click', () => mobileMenu.classList.add('is-open'));
document.getElementById('menuClose').addEventListener('click', () => mobileMenu.classList.remove('is-open'));
mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => mobileMenu.classList.remove('is-open')));

// Highlight the nav link (top bar + sidebar) matching the section in view.
const sections = ['topo', 'trabalhos', 'sobre', 'contato']
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navAnchors = [...document.querySelectorAll('.topnav__links a, .sidebar a')];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navAnchors.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((s) => sectionObserver.observe(s));
