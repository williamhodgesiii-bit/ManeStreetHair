/* Mane Street Hair — Main JS */
(() => {
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  // Navbar scroll + hide scroll indicator
  const nav = $('.nav');
  const scrollEl = $('.hero__scroll');
  if (nav && !nav.classList.contains('nav--dark')) {
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', scrollY > 50);
      if (scrollEl) scrollEl.style.opacity = scrollY > 30 ? '0' : '';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Hamburger + mobile menu
  const burger = $('.nav__hamburger');
  const mobileMenu = $('.mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('nav__hamburger--open');
      mobileMenu.classList.toggle('mobile-menu--open');
      document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--open') ? 'hidden' : '';
    });
    $$('.mobile-menu__link, .mobile-menu__book', mobileMenu).forEach(l =>
      l.addEventListener('click', () => {
        burger.classList.remove('nav__hamburger--open');
        mobileMenu.classList.remove('mobile-menu--open');
        document.body.style.overflow = '';
      })
    );
  }

  // Scroll reveal
  const reveals = $$('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('reveal--visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  }

  // Smooth anchor scroll
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = $(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
})();
