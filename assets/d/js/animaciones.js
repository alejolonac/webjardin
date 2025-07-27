document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');
    const nav = document.querySelector('.nav');

    // Detectar scroll para cambiar el fondo del nav
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Toggle menú
    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.setAttribute('aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // Función de scroll suave personalizada
    function smoothScroll(target, duration) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 300;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Scroll suave para los enlaces del nav con animación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hash) {
                e.preventDefault();
                const targetSection = document.querySelector(link.hash);
                
                if (targetSection) {
                    document.querySelectorAll('section').forEach(section => {
                        section.classList.remove('section-active');
                    });

                    targetSection.classList.add('section-active');
                    
                    smoothScroll(targetSection, 1500);
                }
            }
            
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navList.contains(event.target);
        if (!isClickInsideNav && navList.classList.contains('active')) {
            navList.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

