// Shared by the interactive homepage and the lightweight, pre-rendered pages.
// With JavaScript disabled, the mobile links remain visible and scroll normally.
(() => {
  const mobile = window.matchMedia('(max-width: 820px)');
  const getNav = () => document.querySelector('.site-nav');
  const getButton = () => getNav()?.querySelector('.mobile-nav-toggle');
  const getMore = () => getNav()?.querySelector('.nav-more');

  function closeNavigation() {
    getNav()?.classList.remove('is-open');
    getButton()?.setAttribute('aria-expanded', 'false');
    const more = getMore();
    if (more) more.open = false;
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const nav = getNav();
    if (!nav) return;
    if (event.target.closest('.mobile-nav-toggle')) {
      const open = !nav.classList.contains('is-open');
      closeNavigation();
      nav.classList.toggle('is-open', open);
      getButton()?.setAttribute('aria-expanded', String(open));
    } else if (event.target.closest('.site-nav a')) {
      closeNavigation();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (event.target instanceof Node && !getNav()?.contains(event.target)) closeNavigation();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const nav = getNav();
    const more = getMore();
    const expanded = mobile.matches && nav?.classList.contains('is-open');
    if (!expanded && !more?.open) return;
    closeNavigation();
    if (expanded) getButton()?.focus();
    else more?.querySelector('summary')?.focus();
    event.preventDefault();
  });

  document.addEventListener('focusin', (event) => {
    if (event.target instanceof Node && !getNav()?.contains(event.target)) closeNavigation();
  });

  mobile.addEventListener('change', closeNavigation);
  window.addEventListener('pageshow', closeNavigation);
  // Set this only after the controls are wired, preserving a usable fallback.
  document.documentElement.classList.add('nav-ready');
})();
