// Carrusel de fondo
document.addEventListener('DOMContentLoaded', () => {
    // Carrusel principal
    const slides = document.querySelectorAll('.carousel__slide');
    const prevButton = document.querySelector('.carousel__arrow--prev');
    const nextButton = document.querySelector('.carousel__arrow--next');
    let currentSlide = 0;
    const interval = 5000; // Cambiar slide cada 5 segundos
    let autoplayInterval;

    function showSlide(index) {
        // Asegurarse de que el índice esté dentro del rango
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Actualizar currentSlide
        currentSlide = index;

        // Remover clase active de todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            // Reiniciar la animación removiendo y volviendo a agregar la clase
            slide.style.animation = 'none';
            slide.offsetHeight; // Forzar un reflow
            slide.style.animation = null;
        });

        // Activar el slide actual
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners para las flechas
    prevButton.addEventListener('click', () => {
        prevSlide();
        // Reiniciar el intervalo automático
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, interval);
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        // Reiniciar el intervalo automático
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, interval);
    });

    // Iniciar el carrusel automático
    autoplayInterval = setInterval(nextSlide, interval);

    // Inicializar Splide para la galería
    new Splide('.splide', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        padding: '2rem',
        arrows: true,
        pagination: false,
        autoplay: true,
        interval: 3000,
        drag: true,
        snap: true,
        dragMinThreshold: 10,
        speed: 3000,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        breakpoints: {
            768: {
                perPage: 2,
                padding: '1rem'
            },
            480: {
                perPage: 1,
                padding: '0.5rem'
            }
        }
    }).mount();
});
