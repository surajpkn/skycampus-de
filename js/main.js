/* ── SKY Campus Deutschland – main.js ── */

/* Navbar scroll behaviour */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* Mobile hamburger */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

/* Scroll-triggered fade-up animations */
const animEls = document.querySelectorAll('.animate-fade-up');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
animEls.forEach(el => animObserver.observe(el));

/* Animated counter for hero stats */
function animateCount(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const isLarge = target >= 1000;

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = isLarge
      ? (value / 1000).toFixed(0) + 'K+'
      : value + (target === 650000 ? 'K+' : (suffix || '+'));
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = isLarge ? Math.round(target / 1000) + 'K+' : target + suffix;
  };
  requestAnimationFrame(tick);
}

const heroStats = document.querySelectorAll('.hero__stat-num[data-count]');
if (heroStats.length) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCount(el, target);
        heroObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  heroStats.forEach(el => heroObserver.observe(el));
}

/* Animated counter for stats section */
const statNums = document.querySelectorAll('.stat__number[data-target]');
if (statNums.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const val = Math.round(eased * target);
          el.textContent = target >= 1000
            ? (val / 1000).toFixed(0) + 'K+'
            : val + '+';
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = target >= 1000 ? (target / 1000) + 'K+' : target + '+';
        };
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  statNums.forEach(el => statObserver.observe(el));
}

/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
