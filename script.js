// ===== LOADER =====
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const page   = document.getElementById('page');

  // Remover o loader depois de ~2.8s (loader bar dura 2.4s + margem)
  setTimeout(() => {
    loader.classList.add('fade-out');

    // Após o fade-out do loader, mostrar a página
    setTimeout(() => {
      loader.style.display = 'none';
      page.classList.remove('hidden');

      // Pequeno delay antes de aplicar opacity 1 (para a transição funcionar)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          page.classList.add('visible');
          initReveal();
        });
      });
    }, 800);
  }, 2800);
});

// ===== SCROLL REVEAL =====
function initReveal() {
  const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay para cards adjacentes
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 120);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach(item => observer.observe(item));
}

// ===== NAVBAR ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
    // "HOME" fica ativo no topo
    if (window.scrollY < 80) {
      navLinks[0].classList.add('active');
    }
  });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(0,0,0,0.92)';
  } else {
    navbar.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)';
  }
});

// ===== MODAL GENÉRICO =====
function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add('open');
    });
  });
}

function closeModal(id, e) {
  const modal = document.getElementById(id);
  if (e.target === modal || e.currentTarget.classList.contains('modal-close')) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { modal.style.display = 'none'; }, 500);
  }
}

// Manter compatibilidade com o Level 0 antigo
function openLevel0() { openModal('modal-level0'); }
function closeLevel0(e) { closeModal('modal-level0', e); }

// Fechar qualquer modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(modal => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { modal.style.display = 'none'; }, 500);
    });
  }
});

// ===== FLICKER EFFECT NO TITULO HERO =====
const heroTitle = document.querySelector('.hero-title');
function randomFlicker() {
  if (!heroTitle) return;
  const delay = 4000 + Math.random() * 8000;
  setTimeout(() => {
    heroTitle.style.opacity = '0.3';
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      setTimeout(() => {
        heroTitle.style.opacity = '0.6';
        setTimeout(() => {
          heroTitle.style.opacity = '1';
          randomFlicker();
        }, 80);
      }, 60);
    }, 80);
  }, delay);
}

// Inicia flicker depois que a página aparecer
setTimeout(randomFlicker, 4000);