function initTheme() {
  const html = document.documentElement;

  const themeToggles = document.querySelectorAll('[data-theme-toggle], #themeToggle');
  const themeIcons = document.querySelectorAll('[data-theme-icon], #themeIcon');

  let currentTheme = html.getAttribute('data-theme') || 'dark';
  try {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      currentTheme = storedTheme;
    }
  } catch {
    // ignore
  }

  html.setAttribute('data-theme', currentTheme);
  updateThemeIcons(themeIcons, currentTheme);

  themeToggles.forEach((toggle) => {
    if (!toggle || toggle.__themeToggleBound) return;
    toggle.__themeToggleBound = true;

    toggle.addEventListener('click', () => {
      const activeTheme = html.getAttribute('data-theme') || 'dark';
      const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', nextTheme);
      try {
        localStorage.setItem('theme', nextTheme);
      } catch {
        // ignore
      }
      updateThemeIcons(themeIcons, nextTheme);
    });
  });
}

function updateThemeIcons(themeIcons, theme) {
  if (!themeIcons || !themeIcons.length) return;
  themeIcons.forEach((icon) => {
    if (!icon) return;
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function onClick(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  if (!sections.length || !navLinks.length) return;

  function update() {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#') && href.slice(1) === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSmoothScroll();
  initActiveNav();
});
