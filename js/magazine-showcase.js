(function () {
  'use strict';

  var reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  var fadeEls = Array.prototype.slice.call(
    document.querySelectorAll('[data-fade-in]')
  );
  var revealEls = Array.prototype.slice.call(
    document.querySelectorAll('[data-reveal]')
  );

  if (reduceMotion || !('IntersectionObserver' in window)) {
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  // Hero copy fades in on load rather than on scroll — it's above the fold.
  requestAnimationFrame(function () {
    fadeEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  });

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );
  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // Extremely gentle parallax on the decorative corner ornaments — offset is
  // proportional to how far each one sits from viewport center, so it only
  // moves while roughly in view instead of drifting indefinitely.
  var ornaments = Array.prototype.slice.call(
    document.querySelectorAll('[data-parallax]')
  );
  if (ornaments.length) {
    var ticking = false;

    function updateParallax() {
      ticking = false;
      var viewportCenter = window.innerHeight / 2;
      ornaments.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
        var rect = el.getBoundingClientRect();
        var elementCenter = rect.top + rect.height / 2;
        var offset = (viewportCenter - elementCenter) * speed;
        el.style.transform = 'translateY(' + offset.toFixed(2) + 'px)';
      });
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateParallax();
  }
})();
