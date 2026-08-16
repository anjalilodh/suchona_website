(function () {
  'use strict';

  var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var revealTargets = document.querySelectorAll(
    '.events-intro, .event-row, .event-divider',
  );

  if (!revealTargets.length || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('events-motion-ready');

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.12,
    },
  );

  revealTargets.forEach(function (target) {
    observer.observe(target);
  });

  if (typeof motionPreference.addEventListener === 'function') {
    motionPreference.addEventListener('change', function () {
      if (!motionPreference.matches) return;
      revealTargets.forEach(function (target) {
        target.classList.add('is-visible');
      });
      observer.disconnect();
    });
  }
})();
