(() => {
  const fadeItems = [...document.querySelectorAll('[data-page-fade]')];
  const revealItems = [...document.querySelectorAll('[data-page-reveal]')];
  if (!fadeItems.length && !revealItems.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    [...fadeItems, ...revealItems].forEach((item) => item.classList.add('is-visible'));
    return;
  }

  document.documentElement.classList.add('page-reveal-ready');
  // Two frames guarantee the hidden starting state is painted before the
  // visible class lands, matching the clearly perceptible magazine entrance.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fadeItems.forEach((item) => item.classList.add('is-visible'));
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  revealItems.forEach((item) => observer.observe(item));
})();
