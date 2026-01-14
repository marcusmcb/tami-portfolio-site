(() => {
  function qs(root, selector) {
    return root.querySelector(selector);
  }

  function qsa(root, selector) {
    return Array.from(root.querySelectorAll(selector));
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function createModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.hidden = true;
    modal.setAttribute('data-image-modal', '');
    modal.innerHTML = `
      <button class="image-modal__backdrop" type="button" data-image-modal-close aria-label="Close image"></button>
      <div class="image-modal__content" role="dialog" aria-modal="true" aria-label="Image preview">
        <button class="image-modal__close" type="button" data-image-modal-close aria-label="Close image" title="Close">×</button>

        <button class="image-modal__nav image-modal__nav--prev" type="button" data-image-modal-prev aria-label="Previous image" title="Previous">←</button>
        <button class="image-modal__nav image-modal__nav--next" type="button" data-image-modal-next aria-label="Next image" title="Next">→</button>

        <img class="image-modal__img" data-image-modal-img alt="" />
      </div>
    `;

    document.body.appendChild(modal);
    return modal;
  }

  function initCarousel(carousel) {
    const track = qs(carousel, '[data-carousel-track]');
    const prev = qs(carousel, '[data-carousel-prev]');
    const next = qs(carousel, '[data-carousel-next]');

    if (!track || !prev || !next) return;

    function scrollBySlide(direction) {
      const slide = track.querySelector('[data-carousel-slide]');
      if (!slide) return;

      const slideWidth = slide.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0') || 0;
      const delta = (slideWidth + gap) * direction;

      track.scrollTo({ left: track.scrollLeft + delta, behavior: 'smooth' });
    }

    prev.addEventListener('click', () => scrollBySlide(-1));
    next.addEventListener('click', () => scrollBySlide(1));

    // Disable buttons at edges (best-effort).
    function updateControls() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const left = track.scrollLeft;
      prev.disabled = left <= 1;
      next.disabled = left >= maxScroll - 1;
    }

    track.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateControls);
    });

    // Initial state.
    updateControls();
  }

  function initModal() {
    const modal = document.querySelector('[data-image-modal]') || createModal();
    const modalImg = modal ? qs(modal, '[data-image-modal-img]') : null;

    if (!modal || !modalImg) return null;

    // Ensure modal is closed by default even if markup/CSS glitches.
    modal.hidden = true;

    const closeButtons = qsa(modal, '[data-image-modal-close]');
    const prevButton = qs(modal, '[data-image-modal-prev]');
    const nextButton = qs(modal, '[data-image-modal-next]');

    /** @type {{ slides: Array<{src: string, alt: string}>, index: number } | null} */
    let navState = null;

    function setNavState(state) {
      navState = state;
      const enabled = !!(navState && navState.slides.length > 1);
      if (prevButton) prevButton.hidden = !enabled;
      if (nextButton) nextButton.hidden = !enabled;
    }

    // Default state: nav hidden until opened with a slide set.
    setNavState(null);

    function showAtIndex(nextIndex) {
      if (!navState) return;
      const count = navState.slides.length;
      const index = ((nextIndex % count) + count) % count;
      navState.index = index;

      const slide = navState.slides[index];
      if (!slide || !slide.src) return;

      modalImg.src = slide.src;
      modalImg.alt = slide.alt || '';
    }

    function open(src, alt, state = null) {
      if (!src) return;
      modalImg.src = src;
      modalImg.alt = alt || '';
      modal.hidden = false;
      document.documentElement.classList.add('modal-open');

      setNavState(state);
      if (navState) showAtIndex(navState.index);

      // Focus close button for accessibility.
      const close = qs(modal, '.image-modal__close');
      if (close) close.focus();
    }

    function close() {
      modal.hidden = true;
      modalImg.src = '';
      modalImg.alt = '';
      document.documentElement.classList.remove('modal-open');
      setNavState(null);
    }

    closeButtons.forEach((btn) => btn.addEventListener('click', close));

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (!navState) return;
        showAtIndex(navState.index - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (!navState) return;
        showAtIndex(navState.index + 1);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (modal.hidden) return;
      if (e.key === 'Escape') {
        close();
        return;
      }

      if (!navState) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showAtIndex(navState.index - 1);
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        showAtIndex(navState.index + 1);
      }
    });

    return { open, close };
  }

  function main() {
    const modal = initModal();

    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
      initCarousel(carousel);
    });

    if (!modal) return;

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const slideButton = target.closest('[data-carousel-slide]');

      // 1) Carousel behavior (existing): clicking a carousel slide opens with nav.
      if (slideButton) {
        const fullSrc = slideButton.getAttribute('data-full-src');
        const img = slideButton.querySelector('img');
        const alt = img ? img.getAttribute('alt') : '';

        if (!fullSrc) return;

        event.preventDefault();

        const carousel = slideButton.closest('[data-carousel]');
        const slides = carousel
          ? qsa(carousel, '[data-carousel-slide]').map((btn) => {
              const src = btn.getAttribute('data-full-src') || '';
              const btnImg = btn.querySelector('img');
              const btnAlt = btnImg ? btnImg.getAttribute('alt') || '' : '';
              return { src, alt: btnAlt };
            })
          : [];

        const index = slides.findIndex((s) => s.src === fullSrc);
        const state = slides.length ? { slides, index: clamp(index, 0, slides.length - 1) } : null;

        modal.open(fullSrc, alt || '', state);
        return;
      }

      // 2) Non-carousel single images: clicking opens the same modal (no nav).
      const img = target.closest('img');
      if (!img) return;

      // Never intercept carousel images.
      if (img.closest('[data-carousel-slide]')) return;

      // Only enable zoom for intentional “content” images.
      const isZoomable = img.matches('.thumb, .project-detail__hero, .project-detail__image');
      if (!isZoomable) return;

      const fullSrc = img.getAttribute('data-full-src') || img.currentSrc || img.getAttribute('src') || '';
      if (!fullSrc) return;

      event.preventDefault();
      modal.open(fullSrc, img.getAttribute('alt') || '', null);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
})();
