/* -----------------------------
   Aryan Portfolio - script.js
   -----------------------------
   - Smooth typing (no vertical jitter)
   - Scroll reveal using IntersectionObserver
   - Contact form client-side handling
   - Smooth nav scrolling
--------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  /* ==== TYPING: smooth, stable height ==== */
  const typingEl = document.querySelector('.typing');
  const roles = [
    'Full Stack Developer',
    'Salesforce',
    'Problem Solver',
    'AI & Backend Enthusiast'
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;

  // Ensure the container keeps a fixed height to avoid layout shift
  function setTypingHeight(){
    const maxLen = Math.max(...roles.map(r => r.length));
    typingEl.style.minWidth = (maxLen * 8) + 'px'; // crude but stable
  }
  setTypingHeight();

  function tick(){
    const current = roles[roleIndex];
    if(!deleting){
      typingEl.textContent = current.slice(0, ++charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, 900); // pause when done typing
        return;
      }
      setTimeout(tick, 80);
    } else {
      typingEl.textContent = current.slice(0, --charIndex);
      if(charIndex === 0){
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
      if(e.isIntersecting) {
        e.target.classList.add('active');
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.18});
  revealEls.forEach(el => obs.observe(el));

  /* ==== NAV SMOOTH SCROLL ==== */
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  /* Add smooth anchor for hero 'Hire Me' button */
  document.querySelectorAll('a.btn[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const id = a.getAttribute('href');
      if(!id) return;
      document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  /* ==== CONTACT FORM HANDLING (client-side) ==== */
  const form = document.getElementById('contactForm');
  const resp = document.getElementById('response');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple client-side validation
      const name = form.querySelector('#name') ? form.querySelector('#name').value.trim() : '';
      const email = form.querySelector('#email') ? form.querySelector('#email').value.trim() : '';
      const message = form.querySelector('#message') ? form.querySelector('#message').value.trim() : '';
      if(!name || !email || !message){
        resp.style.color = '#ff7b7b';
        resp.textContent = 'Please fill all fields before sending.';
        setTimeout(()=> resp.textContent = '', 3000);
        return;
      }

      // Mock sending (replace with backend integration later)
      resp.style.color = 'var(--accent)';
      resp.textContent = 'Sending...';
      form.querySelector('button[type="submit"]').disabled = true;

      // Simulate a send + success
      setTimeout(() => {
        resp.textContent = '✅ Message sent. I will get back to you within 48 hours.';
        form.reset();
        form.querySelector('button[type="submit"]').disabled = false;
      }, 900);
    });
  }

  /* ==== Make project cards clickable (open link on whole card) ==== */
  document.querySelectorAll('.project-card').forEach(card => {
    const link = card.querySelector('a.btn');
    if(link){
      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        // prevent double-activation if user actually clicked the button itself
        if(e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') return;
        window.open(link.href, '_blank');
      });
    }
  });

}); // DOMContentLoaded end
