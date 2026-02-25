/**
 * Enotech Smart Computer World
 * Core Application Logic
 * Architecture: ES6 Modules, Modern DOM APIs
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initIntersectionObservers();
    initMobileMenu();

    // Premium UI Enhancements
    initCustomCursor();
    initMagneticElements();
    init3DTiltCards();
    initParallax();
    initTextReveal();
});

/**
 * Handle header styling on scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.js-header');

    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    }, { passive: true });
}

/**
 * Handle scroll animations using IntersectionObserver
 */
function initIntersectionObservers() {
    // Select all elements to animate
    const elementsToObserve = document.querySelectorAll('.js-observe, .fade-in-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element comes into view
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Unobserve after animating once
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToObserve.forEach(el => observer.observe(el));

    // Immediately trigger elements already in view on load
    setTimeout(() => {
        const viewportHeight = window.innerHeight;
        elementsToObserve.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 100);
}

/**
 * Handle Mobile Menu Toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.js-hamburger');
    const nav = document.querySelector('.js-nav');

    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        // Toggle logic for mobile menu
        hamburger.classList.toggle('is-active');
        // If we wanted fully responsive mobile menu expansion:
        // document.body.classList.toggle('nav-open');
    });
}

/**
 * --- PREMIUM UI ENHANCEMENTS ---
 */

/**
 * Advanced Custom Cursor
 */
function initCustomCursor() {
    const cursor = document.querySelector('.js-cursor');
    const follower = document.querySelector('.js-cursor-follower');
    const hoverTargets = document.querySelectorAll('a, button, .js-hover-target, .card');

    // Only init if not on a touch device
    if (!cursor || !follower || (('ontouchstart' in window) || (navigator.maxTouchPoints > 0))) {
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Direct update for the main dot for immediate response
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    // Animate follower with a slight delay using requestAnimationFrame
    function renderFollower() {
        // Linear interpolation (lerp) for smooth following
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(renderFollower);
    }
    renderFollower();

    // Hover effects
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('is-hovering');
            follower.classList.add('is-hovering');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('is-hovering');
            follower.classList.remove('is-hovering');
        });
    });
}

/**
 * Magnetic Pull for Buttons
 */
function initMagneticElements() {
    const magnets = document.querySelectorAll('.js-magnetic');

    // Skip on touch devices
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) return;

    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle pull
            magnet.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        magnet.addEventListener('mouseleave', () => {
            magnet.style.transform = 'translate(0px, 0px)';
            // Smooth return is handled by CSS transition
        });
    });
}

/**
 * 3D Tilt Effect for Product Cards
 */
function init3DTiltCards() {
    const cards = document.querySelectorAll('.card');

    // Skip on touch devices
    if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

            // Adjust glare
            const glare = card.querySelector('.card__glare');
            if (glare) {
                glare.style.transform = `translate(${x * -0.2}px, ${y * -0.2}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            const glare = card.querySelector('.card__glare');
            if (glare) {
                glare.style.transform = 'translate(0, 0)';
            }
        });
    });
}

/**
 * Subtle Background Parallax
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.js-parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.2;
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }, { passive: true });
}

/**
 * Staggered Text Reveal
 */
function initTextReveal() {
    const elements = document.querySelectorAll('.js-text-reveal');

    elements.forEach(element => {
        // Only process h1/h2 text specifically
        const htmlContent = element.innerHTML;
        // Simple regex to split text while keeping HTML tags intact
        // For a more robust production setup, consider using a library like SplitType

        // As a simple vanilla approach for this specific layout:
        if (element.classList.contains('hero__title')) {
            const parts = [
                "Redefine", "Your", "<br>",
                '<span class="text-gradient">Digital</span>',
                '<span class="text-gradient">Experience</span>'
            ];

            element.innerHTML = parts.map((part, index) => {
                if (part === "<br>") return part;
                return `<span class="char" style="transition-delay: ${index * 100}ms">${part}</span>\u00A0`;
            }).join('');

            // Trigger animation immediately for hero
            setTimeout(() => {
                element.classList.add('is-visible');
            }, 100);
        }
    });
}
