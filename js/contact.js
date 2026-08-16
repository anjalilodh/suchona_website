(function () {
  'use strict';

  function wireForm(formSelector, statusSelector, message) {
    var form = document.querySelector(formSelector);
    var status = document.querySelector(statusSelector);
    if (!form || !status) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      status.textContent = message;
      status.classList.add('is-visible');
    });
  }

  wireForm(
    '[data-contact-form]',
    '[data-contact-status]',
    "This form isn't connected to a backend yet, so nothing was sent. Thanks for trying it out!"
  );

  wireForm(
    '[data-newsletter-form]',
    '[data-newsletter-status]',
    "Newsletter signup isn't connected yet — check back soon to subscribe for real."
  );
})();
