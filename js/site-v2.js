(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle-v2');
  var nav = document.querySelector('.primary-nav-v2');
  var scrim = document.querySelector('.nav-scrim-v2');

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (scrim) scrim.classList.remove('is-visible');
  }

  function toggleNav() {
    if (!toggle || !nav) return;
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
    if (scrim) scrim.classList.toggle('is-visible', !isOpen);
  }

  if (toggle) {
    toggle.addEventListener('click', toggleNav);
  }
  if (scrim) {
    scrim.addEventListener('click', closeNav);
  }
  nav?.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  var hero = document.querySelector('.hero-v2');
  var heroVideo = document.querySelector('[data-hero-video]');

  if (hero && heroVideo) {
    var heroVideoInView = true;
    var heroMotionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    var updateHeroVideo = function () {
      var shouldPlay =
        !heroMotionPreference.matches &&
        heroVideoInView &&
        document.visibilityState === 'visible';

      if (!shouldPlay) {
        heroVideo.pause();
        hero.classList.remove('is-video-ready');
        return;
      }

      var playAttempt = heroVideo.play();
      if (playAttempt && typeof playAttempt.then === 'function') {
        playAttempt
          .then(function () {
            hero.classList.add('is-video-ready');
          })
          .catch(function () {
            hero.classList.remove('is-video-ready');
          });
      } else {
        hero.classList.add('is-video-ready');
      }
    };

    heroVideo.addEventListener('playing', function () {
      hero.classList.add('is-video-ready');
    });
    heroVideo.addEventListener('error', function () {
      hero.classList.remove('is-video-ready');
    });

    if ('IntersectionObserver' in window) {
      var heroVideoObserver = new IntersectionObserver(
        function (entries) {
          heroVideoInView = entries[0]?.isIntersecting ?? true;
          updateHeroVideo();
        },
        { threshold: 0.01 },
      );
      heroVideoObserver.observe(hero);
    }

    document.addEventListener('visibilitychange', updateHeroVideo);
    if (typeof heroMotionPreference.addEventListener === 'function') {
      heroMotionPreference.addEventListener('change', updateHeroVideo);
    }
    updateHeroVideo();
  }

  var haloLayer = hero?.querySelector('[data-parallax-layer="halo"]');
  var durgaLayer = hero?.querySelector('[data-parallax-layer="durga"]');
  var paisleyLayer = hero?.querySelector('[data-parallax-layer="paisley"]');
  var heroCopyLockup = hero?.querySelector('[data-parallax-layer="copy"]');
  var landscapeLayer = hero?.querySelector('.hero-v2-landscape-fallback');

  if (
    hero &&
    heroVideo &&
    landscapeLayer &&
    haloLayer &&
    durgaLayer &&
    paisleyLayer &&
    heroCopyLockup
  ) {
    var parallaxMotionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    var parallaxSmallScreen = window.matchMedia('(max-width: 560px)');
    var parallaxFrameRequested = false;

    var resetHeroParallax = function () {
      hero.classList.remove('is-parallax-active');
      landscapeLayer.style.transform = '';
      heroVideo.style.transform = '';
      haloLayer.style.transform = '';
      haloLayer.style.transformOrigin = '';
      durgaLayer.style.transform = '';
      paisleyLayer.style.transform = '';
      heroCopyLockup.style.transform = '';
      heroCopyLockup.style.opacity = '';
    };

    var setHaloTransformOrigin = function () {
      var width = hero.clientWidth;
      var height = hero.clientHeight;
      var sourceWidth = 1672;
      var sourceHeight = 941;
      var haloCenterX = 1197;
      var haloCenterY = 285;
      var coverScale = Math.max(width / sourceWidth, height / sourceHeight);
      var renderedWidth = sourceWidth * coverScale;
      var renderedHeight = sourceHeight * coverScale;
      var offsetX = (width - renderedWidth) * 0.5;
      var offsetY = (height - renderedHeight) * 0.3;

      haloLayer.style.transformOrigin =
        offsetX + haloCenterX * coverScale +
        'px ' +
        (offsetY + haloCenterY * coverScale) +
        'px';
    };

    var renderHeroParallax = function () {
      parallaxFrameRequested = false;

      if (parallaxMotionPreference.matches || parallaxSmallScreen.matches) {
        resetHeroParallax();
        return;
      }

      var rect = hero.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        hero.classList.remove('is-parallax-active');
        return;
      }

      var progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      var backgroundOffset = progress * rect.height;
      // Durga is now an independent depth plane. A partial downward
      // counter-translation makes her rise more slowly than the foreground
      // paisley and the following page, keeping her presence at the seam.
      var durgaOffset = progress * rect.height * 0.58;
      var copyParallaxRate = 0.82;
      var copyPinOffset =
        Math.min(Math.max(-rect.top, 0), rect.height) * copyParallaxRate;
      var haloRotation = progress * 42;
      var copyFadeProgress = Math.min(
        Math.max((progress - 0.48) / 0.2, 0),
        1,
      );
      var copyOpacity = 1 - copyFadeProgress;

      hero.classList.add('is-parallax-active');
      landscapeLayer.style.transform =
        'translate3d(0, ' + backgroundOffset.toFixed(2) + 'px, 0)';
      heroVideo.style.transform =
        'translate3d(0, ' + backgroundOffset.toFixed(2) + 'px, 0)';
      haloLayer.style.transform =
        'translate3d(0, ' +
        durgaOffset.toFixed(2) +
        'px, 0) rotate(' +
        haloRotation.toFixed(3) +
        'deg)';
      durgaLayer.style.transform =
        'translate3d(0, ' + durgaOffset.toFixed(2) + 'px, 0)';
      paisleyLayer.style.transform = 'translate3d(0, 0, 0)';
      heroCopyLockup.style.transform =
        'translate3d(0, ' + copyPinOffset.toFixed(2) + 'px, 0)';
      heroCopyLockup.style.opacity = copyOpacity.toFixed(3);
    };

    var requestHeroParallax = function () {
      if (parallaxFrameRequested) return;
      parallaxFrameRequested = true;
      window.requestAnimationFrame(renderHeroParallax);
    };

    var refreshHeroParallax = function () {
      setHaloTransformOrigin();
      requestHeroParallax();
    };

    window.addEventListener('scroll', requestHeroParallax, { passive: true });
    window.addEventListener('resize', refreshHeroParallax, { passive: true });
    if (typeof parallaxMotionPreference.addEventListener === 'function') {
      parallaxMotionPreference.addEventListener('change', refreshHeroParallax);
      parallaxSmallScreen.addEventListener('change', refreshHeroParallax);
    }
    refreshHeroParallax();
  }

  var statsSection = document.querySelector('.stats-v2');
  if (statsSection && 'IntersectionObserver' in window) {
    var statsMotionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    if (!statsMotionPreference.matches) {
      statsSection.classList.add('stats-v2-motion-ready');
      var statsRevealObserver = new IntersectionObserver(
        function (entries) {
          if (!entries[0]?.isIntersecting) return;
          statsSection.classList.add('is-visible');
          statsRevealObserver.disconnect();
        },
        { threshold: 0.22 },
      );
      statsRevealObserver.observe(statsSection);
    }
  }

  var track = document.getElementById('events-v2-track');
  var prevBtn = document.querySelector('.scroller-control-prev');
  var nextBtn = document.querySelector('.scroller-control-next');

  function scrollByCard(direction) {
    if (!track) return;
    var card = track.querySelector('.event-card-v2');
    var step = card ? card.getBoundingClientRect().width + 24 : 320;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  if (prevBtn)
    prevBtn.addEventListener('click', function () {
      scrollByCard(-1);
    });
  if (nextBtn)
    nextBtn.addEventListener('click', function () {
      scrollByCard(1);
    });

  var header = document.querySelector('.site-header-v2');
  if (header) {
    var lastScrollY = window.scrollY;
    var ticking = false;
    var topZone = 40;

    var updateHeader = function () {
      var currentY = window.scrollY;
      var scrolledUp = currentY < lastScrollY;

      header.classList.toggle('is-solid', currentY > topZone);

      if (currentY <= topZone || scrolledUp) {
        header.classList.remove('is-hidden');
      } else {
        header.classList.add('is-hidden');
      }

      lastScrollY = currentY;
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateHeader);
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  var footerNewsletterForm = document.querySelector(
    '[data-footer-newsletter-form]',
  );
  var footerNewsletterStatus = document.querySelector(
    '[data-footer-newsletter-status]',
  );

  if (footerNewsletterForm && footerNewsletterStatus) {
    footerNewsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      footerNewsletterStatus.textContent =
        "Newsletter signup isn't connected yet — check back soon to subscribe for real.";
      footerNewsletterStatus.classList.add('is-visible');
    });
  }

  var statValues = document.querySelectorAll('[data-count-to]');
  var reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (statValues.length && !reduceMotion && 'IntersectionObserver' in window) {
    var runCount = function (el) {
      var target = parseInt(el.getAttribute('data-count-to'), 10);
      var suffix = el.getAttribute('data-count-suffix') || '';
      var duration = 1200;
      var start = null;

      var step = function (timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    statValues.forEach(function (el) {
      statObserver.observe(el);
    });
  } else {
    statValues.forEach(function (el) {
      var target = el.getAttribute('data-count-to');
      var suffix = el.getAttribute('data-count-suffix') || '';
      el.textContent = target + suffix;
    });
  }
})();
