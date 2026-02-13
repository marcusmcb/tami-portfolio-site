(() => {
  const STORAGE_KEY = 'theme';

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getSavedTheme() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }

    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    document.querySelectorAll('[data-theme-toggle]').forEach((el) => {
      el.setAttribute('aria-label', label);
      el.setAttribute('title', label);
    });
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Keep the theme in sync if user hasn't explicitly chosen one.
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  if (media && media.addEventListener) {
    media.addEventListener('change', () => {
      if (getSavedTheme() === null) setTheme(getSystemTheme());
    });
  }

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest('[data-theme-toggle]');
    if (!button) return;

    event.preventDefault();
    toggleTheme();
  });

  // Ensure aria-labels are correct on load.
  const initial = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  setTheme(getSavedTheme() ?? initial);
})();
