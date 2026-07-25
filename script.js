/* ==========================================================
   UNMASK — SCRIPT
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky navbar ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Hamburger / mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = target.offsetTop - (document.getElementById('navbar').offsetHeight - 1);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Play button -> scroll to purpose ---------- */
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const target = document.getElementById('purpose');
      if (target) {
        const offset = target.offsetTop - (navbar.offsetHeight - 1);
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  }

  /* ---------- Newsletter form (demo submit) ---------- */
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Welcome to Unmask ✓';
      form.reset();
      setTimeout(() => { btn.textContent = original; }, 2500);
    });
  }

});






// form model javascript 


/* ---------- Join Modal ---------- */
const joinModalOverlay = document.getElementById('joinModalOverlay');
const joinModalClose = document.getElementById('joinModalClose');
const joinTriggers = document.querySelectorAll('[data-open-join]');
const joinForm = document.getElementById('joinForm');

const openJoinModal = (e) => {
  e.preventDefault();
  joinModalOverlay.classList.add('active');
  document.body.classList.add('modal-open');
  closeMenu(); // closes mobile nav if open
};
const closeJoinModal = () => {
  joinModalOverlay.classList.remove('active');
  document.body.classList.remove('modal-open');
};

joinTriggers.forEach(btn => btn.addEventListener('click', openJoinModal));
joinModalClose.addEventListener('click', closeJoinModal);
joinModalOverlay.addEventListener('click', (e) => {
  if (e.target === joinModalOverlay) closeJoinModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeJoinModal();
});

joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = joinForm.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Submitted ✓';
  joinForm.reset();
  setTimeout(() => {
    btn.textContent = original;
    closeJoinModal();
  }, 1500);
});







/* ---------- Profile Read More ---------- */
const profileBio = document.getElementById('profileBio');
const profileToggle = document.getElementById('profileToggle');
if (profileBio && profileToggle) {
  profileToggle.addEventListener('click', () => {
    const isExpanded = profileBio.classList.toggle('expanded');
    profileToggle.classList.toggle('expanded', isExpanded);
    profileToggle.innerHTML = isExpanded
      ? 'Show Less <span aria-hidden="true">&uarr;</span>'
      : 'Read Full Story <span aria-hidden="true">&darr;</span>';
  });
}