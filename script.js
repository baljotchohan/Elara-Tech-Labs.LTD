/* ============================================================
   ELARA TECH LABS — Main Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     NAV: scroll state + hamburger
  ---------------------------------------------------------- */
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 24) {
        nav.classList.add('scrolled');
      } else if (!nav.classList.contains('scrolled') || !document.body.classList.contains('inner-page')) {
        nav.classList.toggle('scrolled', window.scrollY > 24);
      }
    };

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------
     NAV: active link
  ---------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     SCROLL ANIMATIONS: Intersection Observer
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-up');

  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ----------------------------------------------------------
     COUNTER ANIMATION
  ---------------------------------------------------------- */
  const counterEls = document.querySelectorAll('.stat-number[data-target]');

  if (counterEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  /* ----------------------------------------------------------
     NEURAL NETWORK CANVAS (hero only)
  ---------------------------------------------------------- */
  const canvas = document.getElementById('neuralCanvas');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 14000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x:    Math.random() * canvas.width,
          y:    Math.random() * canvas.height,
          vx:   (Math.random() - 0.5) * 0.28,
          vy:   (Math.random() - 0.5) * 0.28,
          size: Math.random() * 1.8 + 0.8,
        });
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxDist = 130;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 168, 76, 0.45)';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animId = requestAnimationFrame(drawFrame);
    };

    const start = () => {
      resize();
      initParticles();
      if (animId) cancelAnimationFrame(animId);
      drawFrame();
    };

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    }, { passive: true });

    start();

    /* Pause animation when tab is hidden */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        drawFrame();
      }
    });
  }

  /* ----------------------------------------------------------
     CONTACT FORM
  ---------------------------------------------------------- */
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const original = btn.innerHTML;

      btn.innerHTML  = '<i class="fas fa-check"></i> Message Sent!';
      btn.disabled   = true;
      btn.style.opacity = '0.8';

      setTimeout(() => {
        btn.innerHTML = original;
        btn.disabled  = false;
        btn.style.opacity = '';
        form.reset();
      }, 3500);
    });
  }

  /* ----------------------------------------------------------
     SMOOTH SCROLL for anchor links
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
