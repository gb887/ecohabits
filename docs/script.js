/**
 * Eco Habits - Website Principal
 * JavaScript para funcionalidades e interatividade
 */

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
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
};

// ===================================
// MODAL DE INSTALAÇÃO
// ===================================
const initModal = () => {
    const modal = document.getElementById('installModal');
    const installBtn = document.getElementById('installBtn');
    const installAppBtn = document.getElementById('installAppBtn');
    const closeModal = document.getElementById('closeModal');
    
    if (!modal) return;
    
    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    const closeModalFunc = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (installBtn) installBtn.addEventListener('click', openModal);
    if (installAppBtn) installAppBtn.addEventListener('click', openModal);
    if (closeModal) closeModal.addEventListener('click', closeModalFunc);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
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
    
    const savedLang = localStorage.getItem('ecoHabitsLang');
    if (savedLang) {
        currentLang = savedLang;
        currentLangSpan.textContent = currentLang.toUpperCase();
        updateContent();
    }
    
    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        currentLangSpan.textContent = currentLang.toUpperCase();
        localStorage.setItem('ecoHabitsLang', currentLang);
        updateContent();
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
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
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
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// ===================================
// INICIALIZAÇÃO
// ===================================
const init = () => {
    console.log('🌱 Eco Habits - Website carregado!');
    
    initMobileMenu();
    initModal();
    initLanguageSystem();
    initNavbarScroll();
    initSmoothScroll();
    initActiveNav();
};

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}