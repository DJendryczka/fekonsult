document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navMenu       = document.querySelector('.nav-menu');
  const slider        = document.querySelector('.slider');
  let   slides        = document.querySelectorAll('.slide');  // we'll re-query after cloning
  const leftArrow     = document.querySelector('.left-arrow');
  const rightArrow    = document.querySelector('.right-arrow');
  const heroAction    = document.querySelector('.hero-action');
  const actionButton  = document.querySelector('.action-btn');

  // 1) Hamburger menu toggle
  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navMenu.classList.toggle('show');
  });
  navMenu.addEventListener('click', () => {
    hamburgerMenu.classList.remove('active');
    navMenu.classList.remove('show');
  });

  // 2) Hero button scroll
  heroAction.addEventListener('click', () => {
    document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
  });

  // 3) Action button scroll
  actionButton.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  });

  const sliderContainer = document.querySelector('.slider-container');
 
  let currentIndex = 1; // We'll start on index 1 after clones
  let autoSlideInterval;

  // --- 1) Setup function: inserts clones (if not already), and positions slider
  function setupSlider() {
    // Clear any existing clones from previous mode
    const existingFirstClone = slider.querySelector('#first-clone');
    const existingLastClone = slider.querySelector('#last-clone');
    if (existingFirstClone) existingFirstClone.remove();
    if (existingLastClone) existingLastClone.remove();

    // Re-get slides after removing old clones
    slides = Array.from(document.querySelectorAll('.slide'));

    // Clone first & last
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';

    // Insert them
    slider.insertBefore(lastClone, slides[0]);
    slider.appendChild(firstClone);

    // Re-query slides to include clones
    slides = Array.from(document.querySelectorAll('.slide'));

    // Start on index 1 => the first real slide
    currentIndex = 1;
    updateSlider(false);
  }

  // --- 2) updateSlider: do transform logic (desktop vs mobile)
  function updateSlider(useTransition = true) {
    // If we turn off transition, remove style
    if (!useTransition) {
      slider.style.transition = 'none';
    } else {
      slider.style.transition = 'transform 0.4s ease-in-out';
    }

    const viewportWidth = window.innerWidth;
    // We'll measure actual container width
    const containerWidth = sliderContainer.clientWidth;

    if (viewportWidth < 1200) {
      // ========== <1200px => single, full-width slides ==========

      // Each slide is basically containerWidth wide
      const offset = -currentIndex * containerWidth;
      slider.style.transform = `translateX(${offset}px)`;

    } else {
      // ========== ≥1200px => partial slides, center offset ==========

      // The container is 1280px (set in CSS), each slide is 820px total if 800px + 20 margin
      const slideWidthWithMargins = 820; 
      const centerOffset = (1200 - slideWidthWithMargins) / 2; // e.g. 230
      const offset = centerOffset - (currentIndex * slideWidthWithMargins);
      slider.style.transform = `translateX(${offset}px)`;
    }
  }

  // --- 3) On transitionend, if we land on a clone, jump to the real slide
  slider.addEventListener('transitionend', () => {
    if (slides[currentIndex].id === 'first-clone') {
      // We moved forward from last real slide => jump to real first
      currentIndex = 1;
      updateSlider(false);
    } else if (slides[currentIndex].id === 'last-clone') {
      // We moved backward from first real slide => jump to real last
      currentIndex = slides.length - 2; 
      updateSlider(false);
    }
  });

  // --- 4) Arrow logic
  leftArrow.addEventListener('click', () => {
    currentIndex--;
    updateSlider(true);
  });
  rightArrow.addEventListener('click', () => {
    currentIndex++;
    updateSlider(true);
  });

  // --- 5) Auto Slide
  function startAutoSlide() {
    stopAutoSlide(); // Clear if already running
    autoSlideInterval = setInterval(() => {
      currentIndex++;
      updateSlider(true);
    }, 3000);
  }
  function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  }

  // --- 6) On resize, we may need to re-build the slider if crosses 1200 px
  let isMobileMode = (window.innerWidth < 1200);
  window.addEventListener('resize', () => {
    const nowMobileMode = (window.innerWidth < 1200);
    // If we cross the threshold 1200 <-> 1199, re-setup
    if (isMobileMode !== nowMobileMode) {
      isMobileMode = nowMobileMode;
      setupSlider(); // re-insert clones, reset index
    } else {
      // Otherwise, just recalc position but don't rebuild clones
      updateSlider(false);
    }
  });

  // --- 7) Initialize everything
  setupSlider();
  startAutoSlide();
});



