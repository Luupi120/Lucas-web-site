document.addEventListener('DOMContentLoaded', () => {
    // Fade-in on page load
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    });

    // ── NAV: glass effect on scroll ─────────────────────────────────
    const nav = document.getElementById('main-nav');
    if (nav) {
        const updateNav = () => {
            if (window.scrollY > 60) {
                nav.classList.remove('nav-transparent');
                nav.classList.add('nav-scrolled');
            } else {
                nav.classList.add('nav-transparent');
                nav.classList.remove('nav-scrolled');
            }
        };
        updateNav();
        window.addEventListener('scroll', updateNav, { passive: true });
        
        // Mobile Menu Toggle
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle Navigation');
        menuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        const navContainer = nav.querySelector('.nav-container');
        const navLinks = nav.querySelector('.nav-links');
        const navCtaBtn = nav.querySelector('.nav-cta-btn');
        
        // Create a wrapper for mobile controls to group button and toggle neatly
        const mobileControls = document.createElement('div');
        mobileControls.className = 'nav-mobile-controls';
        
        // Place CTA and toggle inside the controls wrapper
        navContainer.insertBefore(mobileControls, navCtaBtn);
        mobileControls.appendChild(navCtaBtn);
        mobileControls.appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // If menu is transparent and we open it at top, make it opaque
            if (navLinks.classList.contains('active') && window.scrollY <= 60) {
                nav.classList.remove('nav-transparent');
                nav.classList.add('nav-scrolled');
            } else if (!navLinks.classList.contains('active') && window.scrollY <= 60) {
                nav.classList.add('nav-transparent');
                nav.classList.remove('nav-scrolled');
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ── SCROLL REVEAL ────────────────────────────────────────────────
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.12 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.hidden-section, .service-card, .hidden-fade-up').forEach(el => observer.observe(el));

    // ── ANIMATED COUNTERS ────────────────────────────────────────────
    function animateCounter(el, target, duration = 1600) {
        let start = 0;
        const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };
        requestAnimationFrame(step);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                if (!isNaN(target)) animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.metric-num[data-target]').forEach(el => counterObserver.observe(el));

    // ── TESTIMONIALS SPOTLIGHT ───────────────────────────────────────
    const directoryItems = document.querySelectorAll('.directory-item');
    const stageContents  = document.querySelectorAll('.stage-content');

    if (directoryItems.length > 0) {
        directoryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                if (item.classList.contains('active')) return;
                directoryItems.forEach(d => d.classList.remove('active'));
                stageContents.forEach(s => s.classList.remove('active'));
                item.classList.add('active');
                const targetId = item.getAttribute('data-target');
                const targetStage = document.getElementById(targetId);
                if (targetStage) targetStage.classList.add('active');
            });
        });
    }

    // ── PAGE TRANSITIONS ─────────────────────────────────────────────
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const isInternal = this.hostname === window.location.hostname;
            const href = this.getAttribute('href') || '';
            const isHash  = href.startsWith('#') || !!this.hash;
            const isNewTab = this.target === '_blank';
            if (isInternal && !isHash && !isNewTab) {
                e.preventDefault();
                const targetUrl = this.href;
                document.body.style.transition = 'opacity 0.35s ease-out';
                document.body.style.opacity = '0';
                setTimeout(() => window.location.href = targetUrl, 350);
            }
        });
    });
});
