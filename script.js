/* -----------------------------
   Aryan Portfolio - script.js
   -----------------------------
   - Smooth typing (no vertical jitter)
   - Scroll reveal using IntersectionObserver
   - Real working contact form using Formspree
   - Smooth nav scrolling
--------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  /* ==== TYPING EFFECT ==== */
  const typingEl = document.querySelector('.typing');
  const roles = [
    'Full Stack Developer',
    'Salesforce AMTS Aspirant',
    'Problem Solver',
    'AI & Backend Enthusiast'
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function setTypingHeight() {
    const maxLen = Math.max(...roles.map(r => r.length));
    typingEl.style.minWidth = (maxLen * 8) + 'px';
  }
  setTypingHeight();

  function tick() {
    const current = roles[roleIndex];
    if (!deleting) {
      typingEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
      setTimeout(tick, 80);
    } else {
      typingEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, 40);
    }
  }
  tick();

  /* ==== SCROLL REVEAL ==== */
  const revealEls = document.querySelectorAll('.reveal, .project-card, .timeline-item, .testimonial');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  revealEls.forEach(el => obs.observe(el));

  /* ==== NAV SMOOTH SCROLL ==== */
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ==== SMOOTH SCROLL for "Hire Me" ==== */
  document.querySelectorAll('a.btn[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const id = a.getAttribute('href');
      if (!id) return;
      document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });


  /* ==== CONTACT FORM (Formspree Integration) ==== */
const form = document.getElementById('contactForm');
const resp = document.getElementById('response');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      resp.style.color = '#ff7b7b';
      resp.textContent = '⚠️ Please fill all fields before sending.';
      setTimeout(() => resp.textContent = '', 3000);
      return;
    }

    resp.style.color = 'var(--accent)';
    resp.textContent = '📤 Sending your message...';
    form.querySelector('button[type="submit"]').disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        resp.style.color = '#00ff99';
        resp.textContent = '✅ Message sent successfully! I’ll get back to you soon.';
        form.reset();
      } else {
        resp.style.color = '#ff7b7b';
        resp.textContent = '❌ Oops! Something went wrong. Please try again later.';
      }
    } catch (error) {
      resp.style.color = '#ff7b7b';
      resp.textContent = '⚠️ Network error. Please check your internet and try again.';
    } finally {
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });
}


  /* ==== CLICKABLE PROJECT CARDS ==== */
  document.querySelectorAll('.project-card').forEach(card => {
    const link = card.querySelector('a.btn');
    if (link) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') return;
        window.open(link.href, '_blank');
      });
    }
  });

}); // DOMContentLoaded end

