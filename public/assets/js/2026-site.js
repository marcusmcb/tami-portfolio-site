function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  let currentTheme = 'dark';
  try {
    currentTheme = localStorage.getItem('theme') || 'dark';
  } catch {
    // ignore
  }

  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeIcon, currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = html.getAttribute('data-theme') || 'light';
      const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', nextTheme);
      try {
        localStorage.setItem('theme', nextTheme);
      } catch {
        // ignore
      }
      updateThemeIcon(themeIcon, nextTheme);
    });
  }
}

function updateThemeIcon(themeIcon, theme) {
  if (!themeIcon) return;
  themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
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
