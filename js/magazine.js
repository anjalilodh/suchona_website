(function () {
  'use strict';

  // Small self-contained page-turn component. Each .flipbook-page is
  // absolutely stacked and rotated around its left edge; "turned" pages
  // rotate out of view (backface-visibility: hidden) to reveal the page
  // beneath. No external flipbook library — vendored in-house per this
  // site's no-CDN rule.
  function initFlipbook(root) {
    var pages = Array.prototype.slice.call(
      root.querySelectorAll('.flipbook-page')
    );
    var prevBtn = root.querySelector('[data-flip-prev]');
    var nextBtn = root.querySelector('[data-flip-next]');
    var indicator = root.querySelector('.flipbook-page-indicator');
    var current = 0;

    function render() {
      pages.forEach(function (page, i) {
        var turned = i < current;
        page.style.transform = turned ? 'rotateY(-180deg)' : 'rotateY(0deg)';
        page.style.zIndex = String(turned ? i + 1 : pages.length - i);
        page.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });
      if (indicator) {
        indicator.textContent = 'Page ' + (current + 1) + ' of ' + pages.length;
      }
      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === pages.length - 1;
    }

    function next() {
      if (current < pages.length - 1) {
        current += 1;
        render();
      }
    }

    function prev() {
      if (current > 0) {
        current -= 1;
        render();
      }
    }

    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    render();
  }

  document.querySelectorAll('[data-flipbook]').forEach(initFlipbook);
})();
