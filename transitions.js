/* TFSS DECA — Transition + Scroll Engine */
(function() {
  const pt = document.getElementById('pt');
  if (!pt) return;

  /* PAGE REVEAL on load */
  function reveal() {
    pt.classList.remove('in');
    pt.classList.add('out');
    setTimeout(() => { pt.style.display = 'none'; }, 700);
  }

  window.addEventListener('load', () => setTimeout(reveal, 80));

  /* INTERCEPT local links */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http') || a.target === '_blank') return;
    e.preventDefault();
    pt.style.display = 'flex';
    pt.classList.remove('out');
    void pt.offsetWidth;
    pt.classList.add('in');
    setTimeout(() => { window.location.href = href; }, 620);
  });

  /* NAV SCROLL STATE */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* SCROLL REVEAL */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* MOBILE NAV */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  if (burger && navLinks) burger.addEventListener('click', () => navLinks.classList.toggle('open'));
})();
