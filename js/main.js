
'use strict';

/* =================================
   GOLDEN BAKER - MAIN ENGINE
================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. REVEAL ON SCROLL */

    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${(index % 3) * 100}ms`;
        revealObserver.observe(element);
    });


    /* 2. NAVBAR SCROLL EFFECT */

    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 60) {
            navbar.style.position = 'fixed';
            navbar.style.background = 'rgba(8,8,7,.94)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 8px 35px rgba(0,0,0,.25)';
        } else {
            navbar.style.position = 'absolute';
            navbar.style.background = 'rgba(8,8,7,.3)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbar, {
        passive: true
    });

    updateNavbar();


    /* 3. HERO PARALLAX */

    const hero = document.querySelector('.hero');

    if (hero && window.matchMedia('(hover: hover)').matches) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;

            if (scroll < window.innerHeight) {
                hero.style.backgroundPosition =
                    `center ${scroll * 0.3}px`;
            }
        }, {
            passive: true
        });
    }


    /* 4. PRODUCT CARD 3D EFFECT */

    const cards = document.querySelectorAll('.product-card');

    if (window.matchMedia('(hover: hover)').matches) {
        cards.forEach(card => {

            card.addEventListener('mousemove', (event) => {
                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateY = ((x / rect.width) - 0.5) * 8;
                const rotateX = ((0.5 - y / rect.height) * 8);

                card.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });

        });
    }


    /* 5. IMAGE LOADING EFFECT */

    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });

        if (img.complete && img.naturalWidth > 0) {
            img.classList.add('loaded');
        }

        img.addEventListener('error', () => {
            img.classList.add('image-error');
            console.warn('Image not found:', img.src);
        });
    });


    /* 6. SMOOTH NAVIGATION */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener('click', (event) => {

            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

        });

    });


    /* 7. ANIMATED COUNTERS */

    const counters = document.querySelectorAll('.stat-item h3');

    const animateCounter = (element) => {

        const original = element.textContent.trim();
        const match = original.match(/^(\d+)(.*)$/);

        if (!match) return;

        const target = Number(match[1]);
        const suffix = match[2];

        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        function update(time) {
            const progress = Math.min(
                (time - startTime) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 4);

            element.textContent =
                Math.floor(target * eased) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.7
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* 8. IMAGE HOVER MOVEMENT */

    document.querySelectorAll('.gallery-item').forEach(item => {

        item.addEventListener('mouseenter', () => {
            item.style.zIndex = '2';
        });

        item.addEventListener('mouseleave', () => {
            item.style.zIndex = '1';
        });

    });


    /* 9. PAGE LOADING */

    document.body.classList.add('page-ready');

    console.log(
        '%c GOLDEN BAKER ',
        'background:#c59a55;color:#080807;font-size:20px;font-weight:bold;padding:12px;'
    );

    console.log('Golden Baker engine initialized successfully.');

});

