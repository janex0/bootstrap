// script.js - site behaviors for Festival hrane 2025

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form validation and submit handling
(function() {
  const form = document.getElementById('reservationForm');
  const alertBox = document.getElementById('formAlert');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    alertBox.classList.remove('d-none','alert-danger');
    alertBox.classList.add('alert','alert-success');
    alertBox.textContent = 'Hvala! Rezervacija je bila poslana.';
    form.reset();
    form.classList.remove('was-validated');
  });
})();

// Highlight active nav link using IntersectionObserver
(function() {
  const navLinks = document.querySelectorAll('nav .nav-link');

  // Mark link active by comparing absolute hrefs to current location
  const current = location.href.split('#')[0];
  navLinks.forEach(a => {
    // Normalize
    const linkHref = a.href.split('#')[0];
    if (linkHref === current || (linkHref.endsWith(location.pathname) && linkHref !== '')) {
      a.classList.add('active');
      a.setAttribute('aria-current','page');
    }
  });

  // For same-page hash links, use IntersectionObserver to update active state
  const hashLinks = Array.from(navLinks).filter(a => a.getAttribute('href') && a.getAttribute('href').startsWith('#'));
  const sections = Array.from(document.querySelectorAll('main section, section')).filter(s => s.id && hashLinks.some(h => h.getAttribute('href') === '#' + s.id));
  if (sections.length) {
    const setActiveHash = (id) => {
      navLinks.forEach(a => {
        if (a.getAttribute('href') === ('#' + id)) {
          a.classList.add('active');
          a.setAttribute('aria-current','page');
        } else if (!a.href.split('#')[0].endsWith(location.pathname)) {
          a.classList.remove('active');
          a.removeAttribute('aria-current');
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveHash(entry.target.id);
      });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });
    sections.forEach(s => observer.observe(s));
  }

  // Click handler gives instant feedback
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });
})();
