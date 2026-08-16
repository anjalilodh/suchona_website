(function () {
  'use strict';

  var reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  /* ---- Staggered scroll reveal ---- */

  var grid = document.getElementById('gallery-grid');
  var gridCards = document.querySelectorAll(
    '.gallery-card:not(.gallery-card--featured-duplicate)',
  );

  if (grid && 'IntersectionObserver' in window && !reduceMotion) {
    grid.classList.add('js-reveal-ready');

    gridCards.forEach(function (card, index) {
      // Small, cheap variety so photos don't all animate in lockstep:
      // delay cycles every 5 cards, duration cycles every 3.
      card.style.setProperty('--reveal-delay', (index % 5) * 0.08 + 's');
      card.style.setProperty(
        '--reveal-duration',
        0.5 + (index % 3) * 0.12 + 's',
      );
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var card = entry.target;
            var image = card.querySelector('.gallery-card-image');
            var revealCard = function () {
              window.requestAnimationFrame(function () {
                card.classList.add('is-visible');
              });
              card.addEventListener(
                'transitionend',
                function finishReveal(event) {
                  if (
                    event.propertyName !== 'opacity' &&
                    event.propertyName !== 'transform'
                  ) {
                    return;
                  }
                  card.classList.add('is-reveal-complete');
                },
                { once: true },
              );
            };

            if (!image || (image.complete && image.naturalWidth > 0)) {
              revealCard();
            } else {
              image.addEventListener('load', revealCard, { once: true });
              image.addEventListener('error', revealCard, { once: true });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    gridCards.forEach(function (card) {
      observer.observe(card);
    });
  }

  /* ---- Featured carousel ---- */

  var featureCarousel = document.querySelector('[data-feature-carousel]');
  var featureSlides = Array.prototype.slice.call(
    document.querySelectorAll('[data-feature-slide]'),
  );
  var featureDots = Array.prototype.slice.call(
    document.querySelectorAll('[data-feature-dot]'),
  );
  var featurePrevious = document.querySelector('[data-feature-previous]');
  var featureNext = document.querySelector('[data-feature-next]');
  var featureCurrent = document.querySelector('[data-feature-current]');
  var activeFeatureIndex = 0;

  function showFeature(index) {
    if (!featureSlides.length) return;

    activeFeatureIndex =
      (index + featureSlides.length) % featureSlides.length;

    featureSlides.forEach(function (slide, slideIndex) {
      var isActive = slideIndex === activeFeatureIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.tabIndex = isActive ? 0 : -1;
    });

    featureDots.forEach(function (dot, dotIndex) {
      var isActive = dotIndex === activeFeatureIndex;
      dot.classList.toggle('is-active', isActive);
      if (isActive) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });

    if (featureCurrent) {
      featureCurrent.textContent = String(activeFeatureIndex + 1).padStart(
        2,
        '0',
      );
    }
  }

  if (featureCarousel && featureSlides.length) {
    featurePrevious?.addEventListener('click', function () {
      showFeature(activeFeatureIndex - 1);
    });

    featureNext?.addEventListener('click', function () {
      showFeature(activeFeatureIndex + 1);
    });

    featureDots.forEach(function (dot, dotIndex) {
      dot.addEventListener('click', function () {
        showFeature(dotIndex);
      });
    });

    featureCarousel.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showFeature(activeFeatureIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showFeature(activeFeatureIndex + 1);
      }
    });

    showFeature(0);
  }

  /* ---- Lightbox ---- */

  var modal = document.getElementById('gallery-modal');
  if (!modal) return;

  var modalImage = document.getElementById('gallery-modal-image');
  var closeButton = modal.querySelector('.gallery-modal-close');
  var dismissTargets = modal.querySelectorAll('[data-modal-dismiss]');
  var lightboxTriggers = document.querySelectorAll(
    '.gallery-card:not(.gallery-card--featured-duplicate), .gallery-feature-slide',
  );
  var lastTrigger = null;
  var lastTriggerImage = null;

  function flipFrom(startRect) {
    var endRect = modalImage.getBoundingClientRect();
    var deltaX =
      startRect.left + startRect.width / 2 - (endRect.left + endRect.width / 2);
    var deltaY =
      startRect.top + startRect.height / 2 - (endRect.top + endRect.height / 2);
    var scaleX = startRect.width / endRect.width;
    var scaleY = startRect.height / endRect.height;
    return (
      'translate(' + deltaX + 'px, ' + deltaY + 'px) scale(' + scaleX + ', ' + scaleY + ')'
    );
  }

  function openModal(card) {
    var cardImage = card.querySelector('.gallery-card-image');
    if (!cardImage) return;

    lastTrigger = card;
    lastTriggerImage = cardImage;

    var startRect = cardImage.getBoundingClientRect();

    modalImage.classList.remove('is-flipping');
    modalImage.style.transition = 'none';
    modalImage.src = cardImage.currentSrc || cardImage.src;
    modalImage.alt = cardImage.alt || '';
    modalImage.width = cardImage.naturalWidth || cardImage.width;
    modalImage.height = cardImage.naturalHeight || cardImage.height;

    modal.hidden = false;
    document.body.classList.add('gallery-modal-open');

    if (reduceMotion) {
      modal.classList.add('is-open');
      closeButton.focus();
      document.addEventListener('keydown', onKeydown);
      return;
    }

    // Let the browser lay out modalImage at its final (centered) size
    // before measuring — the width/height attrs set above give it the
    // right intrinsic ratio immediately, no waiting on image decode.
      requestAnimationFrame(function () {
        modalImage.style.transform = flipFrom(startRect);
        modal.classList.add('is-open');

        requestAnimationFrame(function () {
          modalImage.style.transition = '';
          modalImage.classList.add('is-flipping');
          modalImage.style.transform = 'none';
        });
    });

    closeButton.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    document.removeEventListener('keydown', onKeydown);
    document.body.classList.remove('gallery-modal-open');

    var hasFinished = false;
    var fallbackTimer;
    var finish = function () {
      if (hasFinished) return;
      hasFinished = true;
      window.clearTimeout(fallbackTimer);
      modal.hidden = true;
      modal.classList.remove('is-open');
      modalImage.style.transition = '';
      modalImage.style.transform = '';
      modalImage.classList.remove('is-flipping');
      if (lastTrigger) lastTrigger.focus();
    };

    if (reduceMotion || !lastTriggerImage) {
      finish();
      return;
    }

    var targetRect = lastTriggerImage.getBoundingClientRect();
    modal.classList.remove('is-open');
    modalImage.classList.add('is-flipping');
    modalImage.style.transform = flipFrom(targetRect);

    modalImage.addEventListener('transitionend', finish, { once: true });
    // Fallback in case transitionend doesn't fire (e.g. display change races).
    fallbackTimer = window.setTimeout(finish, 500);
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
      return;
    }
    if (event.key === 'Tab') {
      // Only the close button is focusable inside the lightbox; keep focus there.
      event.preventDefault();
      closeButton.focus();
    }
  }

  lightboxTriggers.forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card);
    });
  });

  dismissTargets.forEach(function (target) {
    target.addEventListener('click', closeModal);
  });
})();
