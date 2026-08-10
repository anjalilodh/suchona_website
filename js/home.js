(() => {
  const carousel = document.querySelector('.events-carousel');
  const previous = document.querySelector('.carousel-previous');
  const next = document.querySelector('.carousel-next');
  const dots = [...document.querySelectorAll('.carousel-dots button')];
  const cards = [...document.querySelectorAll('.event-card')];

  if (!carousel || !previous || !next || cards.length === 0) return;

  let activeIndex = 0;

  const render = () => {
    carousel.style.transform = `translate3d(${-activeIndex * 100}%, 0, 0)`;

    cards.forEach((card, index) => {
      card.setAttribute('aria-hidden', String(index !== activeIndex));
    });

    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });

    previous.disabled = activeIndex === 0;
    previous.setAttribute('aria-disabled', String(activeIndex === 0));
    next.disabled = activeIndex === cards.length - 1;
    next.setAttribute(
      'aria-disabled',
      String(activeIndex === cards.length - 1),
    );
  };

  const showCard = (index) => {
    activeIndex = Math.max(0, Math.min(index, cards.length - 1));
    render();
  };

  previous.addEventListener('click', () => showCard(activeIndex - 1));
  next.addEventListener('click', () => showCard(activeIndex + 1));
  dots.forEach((dot, index) =>
    dot.addEventListener('click', () => showCard(index)),
  );

  render();
})();
