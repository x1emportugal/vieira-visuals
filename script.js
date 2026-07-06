// Replicates the [style-hover] attribute behavior from the original Claude Design
// export, without needing its React-based runtime.
document.querySelectorAll('[style-hover]').forEach((el) => {
  const hoverStyle = el.getAttribute('style-hover');
  const baseStyle = el.getAttribute('style') || '';
  el.addEventListener('mouseenter', () => el.setAttribute('style', `${baseStyle};${hoverStyle}`));
  el.addEventListener('mouseleave', () => el.setAttribute('style', baseStyle));
});

// Force every video to be muted + looping and keep it playing (autoplay policies
// sometimes pause background video on tab/visibility changes).
function playAllVideos() {
  document.querySelectorAll('video').forEach((v) => {
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  });
}
document.querySelectorAll('video').forEach((v) => {
  v.muted = true;
  v.defaultMuted = true;
  v.loop = true;
  v.playsInline = true;
  v.removeAttribute('controls');
  v.addEventListener('loadeddata', playAllVideos, { once: true });
  v.addEventListener('canplay', playAllVideos, { once: true });
});
playAllVideos();
document.addEventListener('visibilitychange', () => { if (!document.hidden) playAllVideos(); });

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

// Album reel: pause on hover, resume on leave.
const reelWrap = document.getElementById('reelWrap');
const reel = document.getElementById('reel');
reelWrap.addEventListener('mouseenter', () => { reel.style.animationPlayState = 'paused'; });
reelWrap.addEventListener('mouseleave', () => { reel.style.animationPlayState = 'running'; });
