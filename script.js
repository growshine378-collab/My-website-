// Theme toggle (dark/light) with localStorage
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? '' : 'light';
    if (next) root.setAttribute('data-theme', next); else root.removeAttribute('data-theme');
    localStorage.setItem('theme', next);
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.getAttribute('data-open') === 'true';
    navMenu.setAttribute('data-open', String(!open));
    navToggle.setAttribute('aria-expanded', String(!open));
  });
  // Close on link click (mobile)
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navMenu.removeAttribute('data-open'); navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Back to top button
const toTop = document.querySelector('.to-top');
window.addEventListener('scroll', () => {
  toTop?.setAttribute('data-show', window.scrollY > 600 ? 'true' : 'false');
});
toTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, {rootMargin: "0px 0px -10% 0px"});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form validation (frontend only)
const form = document.getElementById('contactForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = form.querySelector('.form__status');
  const name = form.name, email = form.email, message = form.message;
  let ok = true;

  // Simple validations
  const fields = [
    {el:name, rule: v => v.trim().length >= 2, msg:'اكتب اسمًا صحيحًا'},
    {el:email, rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg:'بريد غير صالح'},
    {el:message, rule: v => v.trim().length >= 10, msg:'الرسالة قصيرة جدًا'},
  ];

  fields.forEach(({el, rule, msg}) => {
    const small = el.parentElement.querySelector('.error');
    if (!rule(el.value)) { small.textContent = msg; ok = false; }
    else { small.textContent = ''; }
  });

  if (!ok) { status.textContent = 'تحقّق من الحقول باللون الأحمر.'; return; }

  // Demo: simulate send (استبدلي هذا باستدعاء حقيقي)
  status.textContent = 'جاري الإرسال...';
  await new Promise(r => setTimeout(r, 900));
  status.textContent = 'تم الاستلام! سنعود إليك قريبًا.';
  form.reset();
});

// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();
