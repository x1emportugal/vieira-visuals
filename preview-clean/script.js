// Replicates the [style-hover] attribute behavior from the original Claude Design
// export, without needing its React-based runtime.
document.querySelectorAll('[style-hover]').forEach((el) => {
  const hoverStyle = el.getAttribute('style-hover');
  const baseStyle = el.getAttribute('style') || '';
  el.addEventListener('mouseenter', () => el.setAttribute('style', `${baseStyle};${hoverStyle}`));
  el.addEventListener('mouseleave', () => el.setAttribute('style', baseStyle));
});

// Keep all videos muted/looping/inline. The hero (with autoplay) plays right
// away; below-the-fold videos are lazy-loaded by the observer further down.
document.querySelectorAll('video').forEach((v) => {
  v.muted = true;
  v.defaultMuted = true;
  v.loop = true;
  v.playsInline = true;
  v.removeAttribute('controls');
});

// Hero autoplay: nudge it in case the browser paused it, and resume when the
// tab becomes visible again.
const heroVideo = document.querySelector('#heroMedia video');
function playHero() {
  if (!heroVideo) return;
  const p = heroVideo.play();
  if (p && p.catch) p.catch(() => {});
}
playHero();
document.addEventListener('visibilitychange', () => { if (!document.hidden) playHero(); });

// Lazy-load below-the-fold videos: only fetch + play when they scroll near the
// viewport, and pause when they leave (saves data, battery and CPU on mobile).
const lazyVideos = document.querySelectorAll('video[data-lazy-video]');
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const v = entry.target;
    if (entry.isIntersecting) {
      const source = v.querySelector('source[data-src]');
      if (source && !source.src) {
        source.src = source.dataset.src;
        v.load();
      }
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      if (!v.paused) v.pause();
    }
  });
}, { rootMargin: '200px 0px' });
lazyVideos.forEach((v) => videoObserver.observe(v));

// Mobile menu open/close.
const mobileMenu = document.getElementById('mobileMenu');
const navBurger = document.getElementById('navBurger');
const menuClose = document.getElementById('menuClose');

function openMenu() { mobileMenu.classList.add('is-open'); }
function closeMenu() { mobileMenu.classList.remove('is-open'); }

navBurger.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-link').forEach((a) => a.addEventListener('click', closeMenu));

// Nav reveal + hero parallax on scroll.
const nav = document.getElementById('nav');
const heroMedia = document.getElementById('heroMedia');
const heroContent = document.getElementById('heroContent');

function onScroll() {
  const y = window.scrollY || window.pageYOffset;
  const vh = window.innerHeight;
  const p = Math.min(y / vh, 1);

  heroMedia.style.transform = `translateY(${p * 10}%) scale(${1 + p * 0.1})`;
  heroContent.style.opacity = String(Math.max(0, 1 - p * 1.35));
  heroContent.style.transform = `translateY(${-p * 44}px)`;

  const show = y > vh * 0.72;
  nav.style.transform = show ? 'translateY(0)' : 'translateY(-105%)';
  nav.style.opacity = show ? '1' : '0';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Album reel auto-rotates continuously (CSS animation). Pause on hover so the
// viewer can linger on a frame; resumes on leave. Touch devices just let it run.
const reelWrap = document.getElementById('reelWrap');
const reel = document.getElementById('reel');
reelWrap.addEventListener('mouseenter', () => { reel.style.animationPlayState = 'paused'; });
reelWrap.addEventListener('mouseleave', () => { reel.style.animationPlayState = 'running'; });
