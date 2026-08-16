(function () {
  'use strict';

  var timeline = document.querySelector('[data-timeline]');
  if (!timeline) return;

  var items = Array.prototype.slice.call(
    timeline.querySelectorAll('[data-timeline-item]')
  );
  var fill = timeline.querySelector('[data-timeline-fill]');
  var list = timeline.querySelector('.timeline-list');

  // Progressive enhancement: items are visible by default in CSS. Only
  // switch to the hidden-until-revealed state once we know
  // IntersectionObserver is supported, so content is never stuck hidden.
  if ('IntersectionObserver' in window) {
    timeline.classList.add('js-reveal');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  // Spine fill: grows to track how far the viewer has scrolled through the
  // timeline list, from the first marker to the last.
  if (fill && list) {
    var ticking = false;

    function updateFill() {
      ticking = false;
      var rect = list.getBoundingClientRect();
      var viewportCenter = window.innerHeight * 0.5;
      var total = rect.height;
      if (total <= 0) return;
      var scrolled = viewportCenter - rect.top;
      var progress = Math.max(0, Math.min(1, scrolled / total));
      fill.style.transform = 'scaleY(' + progress.toFixed(4) + ')';
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateFill);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateFill();
  }
})();
