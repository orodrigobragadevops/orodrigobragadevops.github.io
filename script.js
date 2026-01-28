// ========== SCROLL SPY - Destaca o link da navegação conforme o usuário rola ========== 
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ========== NAVBAR SCROLLED EFFECT ========== 
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ========== MENU MOBILE ========== 
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ========== SCROLL TO TOP BUTTON ========== 
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========== INTERSECTION OBSERVER - Animações ao entrar na viewport ========== 
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar cards e elementos
document.querySelectorAll('.card, .skill-category, .stat-card, .contact-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// ========== EFEITO PARALLAX SUAVE ========== 
const floatingShapes = document.querySelectorAll('.floating-shape');

window.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  floatingShapes.forEach((shape, index) => {
    const moveX = (x - 0.5) * 50 * (index + 1);
    const moveY = (y - 0.5) * 50 * (index + 1);
    shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// ========== SMOOTH SCROLL PARA LINKS INTERNOS ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Não fazer smooth scroll para links vazios ou "#"
    if (href === '#' || href === '') return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const offsetTop = target.offsetTop - 80; // Offset para a navbar fixa
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========== EFEITO HOVER NOS CARDS ========== 
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// ========== ANIMAÇÃO DE CONTADORES (Stats) ========== 
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Observar stats e animar quando visível
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counterElement = entry.target.querySelector('.counter');
      if (counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'));
        if (!isNaN(target)) {
          animateCounter(counterElement, target);
        }
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
  statsObserver.observe(card);
});

// ========== EFEITO DE CLIQUE NOS BOTÕES ========== 
// Removido ripple dinâmico para evitar bugs de layout.
// A animação agora é tratada puramente via CSS (:active).

// ========== PRELOAD DE IMAGENS ========== 
function preloadImages() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', preloadImages);

// ========== DARK MODE TOGGLE (Opcional) ========== 
function initDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  
  if (!darkModeToggle) return;

  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isNowDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isNowDark);
    darkModeToggle.textContent = isNowDark ? '☀️' : '🌙';
  });
}

// ========== ANALYTICS E TRACKING (Opcional) ========== 
function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
}

// Rastrear cliques em links externos
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', () => {
    trackEvent('external_link_click', {
      link_url: link.href,
      link_text: link.textContent
    });
  });
});

// ========== PERFORMANCE - Lazy Loading ========== 
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========== INICIALIZAR TUDO ========== 
document.addEventListener('DOMContentLoaded', () => {
  console.log('✨ Portfólio carregado com sucesso!');
  initDarkMode();
});

// ========== LOG DE PERFORMANCE ========== 
window.addEventListener('load', () => {
  if (performance && performance.timing) {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('⚡ Tempo de carregamento: ' + pageLoadTime + 'ms');
  }
});
