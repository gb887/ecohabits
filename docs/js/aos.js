/**
 * AOS - Animate On Scroll
 * Biblioteca simples para animações ao fazer scroll
 */

(function() {
    'use strict';
    
    const AOS = {
        init: function(options = {}) {
            this.options = {
                duration: options.duration || 800,
                offset: options.offset || 120,
                delay: options.delay || 0,
                once: options.once !== undefined ? options.once : false
            };
            
            this.elements = document.querySelectorAll('[data-aos]');
            this.initObserver();
            this.refresh();
        },
        
        initObserver: function() {
            const observerOptions = {
                root: null,
                rootMargin: `0px 0px -${this.options.offset}px 0px`,
                threshold: 0.1
            };
            
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateElement(entry.target);
                    } else if (!this.options.once) {
                        this.resetElement(entry.target);
                    }
                });
            }, observerOptions);
        },
        
        animateElement: function(element) {
            const delay = element.dataset.aosDelay || this.options.delay;
            
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, delay);
        },
        
        resetElement: function(element) {
            element.classList.remove('aos-animate');
        },
        
        refresh: function() {
            this.elements.forEach(element => {
                const duration = element.dataset.aosDuration || this.options.duration;
                element.style.transitionDuration = `${duration}ms`;
                this.observer.observe(element);
            });
        }
    };
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            AOS.init({
                duration: 800,
                offset: 100,
                once: true
            });
        });
    } else {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });
    }
    
    // Exportar para uso global
    window.AOS = AOS;
})();