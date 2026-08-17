(() => {
  const footerHosts = document.querySelectorAll('[data-site-footer]');

  if (footerHosts.length === 0) return;

  const emailIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <path d="m4.5 7 7.5 5.5L19.5 7"></path>
    </svg>`;

  const facebookIcon = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 21v-8h2.8l.45-3.2H14.5V7.75c0-.95.3-1.6 1.7-1.6H18V3.3c-.55-.08-1.45-.2-2.55-.2-2.55 0-4.3 1.55-4.3 4.4v2.3H8.25V13h2.9v8"></path>
    </svg>`;

  const footerMarkup = `
    <div class="site-footer__frame">
      <!-- PLACEHOLDER: Replace with the approved left paisley/floral background image. -->
      <div class="footer-art-placeholder footer-art-placeholder--paisley-left" aria-hidden="true">
        Paisley artwork<br />placeholder
      </div>

      <!-- PLACEHOLDER: Replace with the approved right paisley/floral background image. -->
      <div class="footer-art-placeholder footer-art-placeholder--paisley-right" aria-hidden="true">
        Paisley artwork<br />placeholder
      </div>

      <!-- PLACEHOLDER: Replace with the approved illustrated building skyline background image. -->
      <div class="footer-art-placeholder footer-art-placeholder--skyline" aria-hidden="true">
        Illustrated building skyline placeholder
      </div>

      <div class="site-footer__content">
        <div class="site-footer__primary">
          <section class="site-footer__brand" aria-label="Suchona">
            <a class="site-footer__wordmark" href="index.html">Suchona</a>
            <p class="site-footer__tagline">Bengali Association of Iowa and Illinois</p>
            <div class="site-footer__brand-rule" aria-hidden="true">
              <span></span><i></i><b></b><i></i><span></span>
            </div>
          </section>

          <nav class="site-footer__nav" aria-label="Footer navigation">
            <section>
              <h2 class="site-footer__heading">Explore</h2>
              <ul class="site-footer__links">
                <li><a href="index.html">Home</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="our-story.html">About Us</a></li>
                <li><a href="gallery.html">Gallery</a></li>
                <li><a href="magazine.html">Magazine</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="donate.html">Donate</a></li>
              </ul>
            </section>

            <section>
              <h2 class="site-footer__heading">Events</h2>
              <ul class="site-footer__links">
                <li><a href="durga-puja-2026.html">Durga Puja 2025</a></li>
                <li><a href="events.html">All Events</a></li>
              </ul>
            </section>

            <section>
              <h2 class="site-footer__heading">About Us</h2>
              <ul class="site-footer__links">
                <li><a href="our-story.html">Our Story</a></li>
                <li><a href="who-we-are.html">Who We Are</a></li>
              </ul>
            </section>
          </nav>
        </div>

        <aside class="site-footer__side">
          <section class="site-footer__newsletter" aria-labelledby="footer-newsletter-title">
            <h2 class="site-footer__heading" id="footer-newsletter-title">Stay Connected</h2>
            <p class="site-footer__newsletter-copy">
              Subscribe to our newsletter for updates on events, stories, and community news.
            </p>
            <!-- TODO: Connect this form to the approved newsletter provider. -->
            <form class="site-footer__form" data-footer-newsletter>
              <label class="sr-only" for="footer-email">Email address</label>
              <input
                id="footer-email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="Enter your email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
            <p class="site-footer__form-status" data-footer-form-status aria-live="polite"></p>
          </section>

          <section class="site-footer__connect" aria-labelledby="footer-connect-title">
            <h2 class="site-footer__heading" id="footer-connect-title">Connect With Us</h2>
            <div class="site-footer__socials">
              <a class="site-footer__social" href="mailto:suchonagovbody@gmail.com" aria-label="Email Suchona">${emailIcon}</a>
              <a class="site-footer__social" href="https://www.facebook.com/suchona.iowacity" aria-label="Suchona on Facebook" target="_blank" rel="noopener">${facebookIcon}</a>
            </div>
            <ul class="site-footer__contact-list">
              <li>
                <svg class="site-footer__contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="1"></rect>
                  <path d="m4 7 8 6 8-6"></path>
                </svg>
                <a class="site-footer__contact-link" href="mailto:suchonagovbody@gmail.com">suchonagovbody@gmail.com</a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>

    <p class="site-footer__copyright">© 2026 Suchona. All rights reserved.</p>
  `;

  footerHosts.forEach((host) => {
    host.classList.add('site-footer');
    host.innerHTML = footerMarkup;
  });

  document.querySelectorAll('[data-footer-newsletter]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.parentElement.querySelector(
        '[data-footer-form-status]',
      );
      if (status) {
        status.textContent = 'Newsletter signup will be connected soon.';
      }
    });
  });

  document.querySelectorAll('[data-social-placeholder]').forEach((link) => {
    link.addEventListener('click', (event) => event.preventDefault());
  });
})();
