(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".primary-nav");
  var scrim = document.querySelector(".nav-scrim");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    if (scrim) scrim.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  function openNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
    if (scrim) scrim.classList.add("is-visible");
    document.body.style.overflow = "hidden";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (scrim) {
    scrim.addEventListener("click", closeNav);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---------------------------------------------------------------------
     Dropdown menus (Events / About Us) — click-to-toggle for touch &
     keyboard; CSS :hover already covers desktop mouse users.
     --------------------------------------------------------------------- */
  var dropdownButtons = document.querySelectorAll(".has-dropdown > .nav-link");

  dropdownButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var alreadyOpen = btn.getAttribute("aria-expanded") === "true";

      e.preventDefault();

      dropdownButtons.forEach(function (other) {
        if (other !== btn) other.setAttribute("aria-expanded", "false");
      });

      btn.setAttribute("aria-expanded", alreadyOpen ? "false" : "true");
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-dropdown")) {
      dropdownButtons.forEach(function (btn) {
        btn.setAttribute("aria-expanded", "false");
      });
    }
  });

  /* ---------------------------------------------------------------------
     Hero reveal-on-load
     --------------------------------------------------------------------- */
  var hero = document.querySelector(".hero");

  if (hero) {
    hero.classList.add("reveal-ready");
    // Double rAF so the browser commits the initial (hidden) state before
    // the transition-triggering class lands — avoids a flash of the final
    // state on fast-loading pages.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add("reveal-in");
      });
    });
  }

  /* ---------------------------------------------------------------------
     Subtle scroll parallax — sun drifts slowest, Durga just a touch
     faster, for quiet depth. Disabled under reduced motion.
     --------------------------------------------------------------------- */
  if (!reduceMotion) {
    var sun = document.querySelector(".sun");
    var durga = document.querySelector(".durga");
    var ticking = false;

    function applyParallax() {
      var y = window.scrollY || 0;
      var clamped = Math.min(y, 600);
      if (sun) sun.style.transform = "translate3d(0, " + (clamped * 0.035).toFixed(2) + "px, 0)";
      if (durga) durga.style.transform = "translate3d(-50%, " + (clamped * -0.05).toFixed(2) + "px, 0)";
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(applyParallax);
          ticking = true;
        }
      },
      { passive: true }
    );

    applyParallax();
  } else {
    var durgaStatic = document.querySelector(".durga");
    if (durgaStatic) durgaStatic.style.transform = "translate3d(-50%, 0, 0)";
  }

  /* ---------------------------------------------------------------------
     Cursor parallax for the decorative alpana halo — a few px of drift
     toward the pointer, fine-pointer devices only, off under reduced
     motion. Sets --px/--py that the CSS transform already reads.
     --------------------------------------------------------------------- */
  var halo = document.querySelector(".alpana-halo");
  var pointerFine = window.matchMedia("(pointer: fine)").matches;

  if (halo && pointerFine && !reduceMotion) {
    var stage = document.querySelector(".art-stage");
    var maxDrift = 10;
    var hovering = false;

    (stage || document).addEventListener("mousemove", function (e) {
      var rect = (stage || document.body).getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      halo.style.setProperty("--px", (relX * maxDrift * 2).toFixed(1) + "px");
      halo.style.setProperty("--py", (relY * maxDrift * 2).toFixed(1) + "px");
      hovering = true;
    });

    if (stage) {
      stage.addEventListener("mouseleave", function () {
        if (!hovering) return;
        halo.style.setProperty("--px", "0px");
        halo.style.setProperty("--py", "0px");
      });
    }
  }
})();
