/**
 * Eco Habits - Website Principal
 * JavaScript para funcionalidades e interatividade
 */

// ===================================
// CONFIGURAÇÃO GLOBAL
// ===================================
let currentLang = 'pt';

// ===================================
// MENU MOBILE
// ===================================
const initMobileMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animar as linhas do hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Fechar menu ao clicar num link
    document.querySelectorAll('.nav-menu a:not(.lang-btn)').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
};

// ===================================
// SISTEMA DE IDIOMAS
// ===================================
const initLanguageSystem = () => {
    const langBtn = document.getElementById('langBtn');
    const currentLangSpan = document.getElementById('currentLang');
    
    if (!langBtn || !currentLangSpan) return;
    
    // Carregar idioma guardado
    const savedLang = localStorage.getItem('ecoHabitsLang');
    if (savedLang) {
        currentLang = savedLang;
        currentLangSpan.textContent = currentLang.toUpperCase();
        updateContent();
    }
    
    // Trocar idioma
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        currentLangSpan.textContent = currentLang.toUpperCase();
        localStorage.setItem('ecoHabitsLang', currentLang);
        updateContent();
        
        // Animação do botão
        langBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            langBtn.style.transform = 'scale(1)';
        }, 150);
    });
};

const updateContent = () => {
    document.querySelectorAll('[data-pt]').forEach(element => {
        const text = currentLang === 'pt' 
            ? element.getAttribute('data-pt') 
            : element.getAttribute('data-en');
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.tagName === 'IMG') {
            element.alt = text;
        } else {
            element.textContent = text;
        }
    });
};

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
};

// ===================================
// CONTADORES ANIMADOS
// ===================================
const initCounters = () => {
    const counters = document.querySelectorAll('.impact-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('pt-PT');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('pt-PT');
            }
        };
        
        updateCounter();
    };
    
    // Observer para iniciar contadores quando ficam visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
};

// ===================================
// SMOOTH SCROLL
// ===================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ===================================
// NAVEGAÇÃO ATIVA
// ===================================
const initActiveNav = () => {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="pages/"]');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href.split('/').pop())) {
            link.classList.add('active');
        }
    });
};

// ===================================
// EFEITOS DE INTERAÇÃO
// ===================================
const initInteractionEffects = () => {
    // Efeito ripple nos botões
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Adicionar animação ripple ao CSS
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// ===================================
// PARALLAX SUAVE
// ===================================
const initParallax = () => {
    const heroShapes = document.querySelectorAll('.hero-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        heroShapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

// ===================================
// MELHORAR ACESSIBILIDADE
// ===================================
const initAccessibility = () => {
    // Adicionar navegação por teclado
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                element.click();
            }
        });
    });
    
    // Indicador de foco visível
    const style = document.createElement('style');
    style.textContent = `
        *:focus-visible {
            outline: 3px solid #10b981;
            outline-offset: 2px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
    
    // Anunciar mudanças de idioma para leitores de tela
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = currentLang === 'pt' 
                ? 'Idioma alterado para Português' 
                : 'Language changed to English';
            document.body.appendChild(announcement);
            
            setTimeout(() => announcement.remove(), 1000);
        });
    }
    
    // Adicionar classe sr-only para leitores de tela
    const srStyle = document.createElement('style');
    srStyle.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(srStyle);
};

// ===================================
// LAZY LOADING PARA IMAGENS
// ===================================
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ===================================
// PREVENIR SCROLL DURANTE MENU ABERTO
// ===================================
const initScrollLock = () => {
    const navMenu = document.getElementById('navMenu');
    
    if (!navMenu) return;
    
    const observer = new MutationObserver(() => {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
};

// ===================================
// PERFORMANCE: DEBOUNCE
// ===================================
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Otimizar eventos de scroll
window.addEventListener('scroll', debounce(() => {
    // Eventos de scroll otimizados
}, 10));

// ===================================
// INICIALIZAÇÃO
// ===================================
const init = () => {
    console.log('🌱 Eco Habits - Website carregado com sucesso!');
    console.log('📱 Versão: 2.0');
    console.log('🌍 Idioma atual:', currentLang);
    
    // Inicializar todos os módulos
    initMobileMenu();
    initLanguageSystem();
    initNavbarScroll();
    initCounters();
    initSmoothScroll();
    initActiveNav();
    initInteractionEffects();
    initParallax();
    initAccessibility();
    initLazyLoading();
    initScrollLock();
    
    // Remover loader se existir
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 500);
    }
};

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Adicionar serviço de notificações para feedback do utilizador
const notify = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Adicionar animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Exportar funções úteis
window.ecoHabits = {
    notify,
    currentLang: () => currentLang,
    setLang: (lang) => {
        if (lang === 'pt' || lang === 'en') {
            currentLang = lang;
            document.getElementById('currentLang').textContent = lang.toUpperCase();
            updateContent();
            localStorage.setItem('ecoHabitsLang', lang);
        }
    }
};