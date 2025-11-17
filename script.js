// ==================== SCROLL PARALLAX ULTRA AVANZADO ====================

let scrollY = 0;
let windowHeight = window.innerHeight;

window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
}, { passive: true });

// ==================== INTERSECTION OBSERVER AVANZADO ====================

const observerConfig = {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    rootMargin: '-50px'
};

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            const ratio = entry.intersectionRatio;
            entry.target.style.opacity = Math.min(ratio * 1.5, 1);
            entry.target.style.transform = `translateY(${(1 - ratio) * 30}px)`;
        }
    });
}, observerConfig);

// ==================== EFECTO PARALLAX CON SCROLL ====================

function updateParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
        const offset = scrollY * speed;
        element.style.transform = `translateY(${offset}px)`;
    });

    // Actualizar shapes del hero
    const heroShapes = document.querySelectorAll('.shape');
    heroShapes.forEach((shape, index) => {
        const parallaxSpeed = 0.05 + (index * 0.03);
        const movement = scrollY * parallaxSpeed;
        shape.style.transform = `translate(${Math.sin(movement * 0.01) * 20}px, ${movement}px)`;
    });
}

// Usar requestAnimationFrame para mejor performance
function animationLoop() {
    updateParallax();
    requestAnimationFrame(animationLoop);
}
animationLoop();

// ==================== EFECTO REVEAL AVANZADO ====================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.style.animation = `staggerReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.tarjeta, .gallery-item, .doc-card, .team-card').forEach((el, index) => {
    el.style.animation = `none`;
    el.style.animationDelay = `${index * 0.1}s`;
    revealObserver.observe(el);
});

// ==================== STAGGER ANIMATION ====================

const staggerStyle = document.createElement('style');
staggerStyle.textContent = `
    @keyframes staggerReveal {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    @keyframes glitchFlicker {
        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: -2px 0 #D4AF37, 2px 0 #FF6B6B;
        }
        20%, 24%, 55% {
            text-shadow: 2px 0 #D4AF37, -2px 0 #FF6B6B;
        }
    }
    
    @keyframes smoothReveal {
        from {
            opacity: 0;
            filter: blur(10px);
        }
        to {
            opacity: 1;
            filter: blur(0);
        }
    }
    
    .revealed {
        opacity: 1 !important;
    }
`;
document.head.appendChild(staggerStyle);

// ==================== SMOOTH SCROLL LINKS ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== EFECTO MOUSE GLOW AVANZADO ====================

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Crear efectos visuales en movimiento del mouse
    if (Math.random() > 0.95) {
        createMouseTrail(mouseX, mouseY);
    }
});

function createMouseTrail(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.4), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: trailFade 0.8s ease-out forwards;
    `;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
}

// Agregar animación de trail
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(trailStyle);

// ==================== SCROLL VELOCITY EFFECT ====================

let lastScrollY = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
    scrollVelocity = scrollY - lastScrollY;
    lastScrollY = scrollY;

    // Aplicar transform basado en velocidad
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollVelocity > 5) {
            navbar.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.3)';
        } else {
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }
    }
}, { passive: true });

// ==================== SCROLL PROGRESS BAR ====================

function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #D4AF37, #FF6B6B);
        z-index: 9999;
        transition: width 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = progress + '%';
    }, { passive: true });
}

createScrollProgressBar();

// ==================== EFECTO HOVER AVANZADO EN TARJETAS ====================

document.querySelectorAll('.tarjeta, .gallery-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        card.style.transition = 'none';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

// ==================== RIPPLE EFFECT EN BOTONES ====================

document.querySelectorAll('.boton, .cta-button').forEach(button => {
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
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleExpand 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleExpand {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== EFECTO IMAGEN PARALLAX ====================

document.querySelectorAll('.tarjeta-imagen, .gallery-image').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) * 0.1;
        const moveY = (y - rect.height / 2) * 0.1;

        const imgElement = img.querySelector('img');
        if (imgElement) {
            imgElement.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
            imgElement.style.transition = 'none';
        }
    });

    img.addEventListener('mouseleave', () => {
        const imgElement = img.querySelector('img');
        if (imgElement) {
            imgElement.style.transform = 'scale(1) translate(0, 0)';
            imgElement.style.transition = 'all 0.5s ease';
        }
    });
});

// ==================== CONTADOR ANIMADO ====================

function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;

    const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ==================== ACTIVE NAV LINK ON SCROLL ====================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#D4AF37';
            link.style.fontWeight = '700';
        } else {
            link.style.color = 'white';
            link.style.fontWeight = '500';
        }
    });
}, { passive: true });

// ==================== MOUSE PARALLAX BACKGROUND ====================

document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = (e.clientX / window.innerWidth) * 2;
    const y = (e.clientY / window.innerHeight) * 2;

    shapes.forEach((shape, index) => {
        const offset = (index + 1) * 20;
        shape.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
    });
});

// ==================== LOAD ANIMATION ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Sistema de scroll ultra avanzado activado');

    // Revelar elementos principales
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        el.style.animation = `slideInUp 0.8s ease ${index * 0.2}s both`;
    });

    // Animar stat numbers
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('[data-count]');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) statsObserver.observe(statsSection);
});

// ==================== THROTTLE FOR PERFORMANCE ====================

function throttle(func, limit) {
    let inThrottle;
    return function() {
        if (!inThrottle) {
            func.apply(this, arguments);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Aplicar throttle a eventos pesados
window.addEventListener('resize', throttle(() => {
    windowHeight = window.innerHeight;
}, 250), { passive: true });

// ==================== SMOOTH SCROLL BEHAVIOR ====================

window.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
        document.body.style.scrollBehavior = 'smooth';
    }
}, { passive: true });

// ==================== GALLERY & CAROUSEL FUNCTIONALITY ====================

// Data for each activity
const activityData = {
    1: {
        title: 'Configuración e Instalación de MV',
        description: 'Instalación y configuración de máquinas virtuales: Xubuntu, Alma Linux y Rocky Linux. Proceso completo de setup.',
        images: [
            {src: 'assets/actividad 1/descarga.jpeg', desc: 'imagen uno de ejemplo'},
            {src: 'assets/actividad 1/maxresdefault.jpg', desc: 'soy linux'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+1+Img+3', desc: 'Instalación de Rocky Linux con kernel optimizado'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+1+Img+4', desc: 'Configuración de red y servicios básicos'}
        ]
    },
    2: {
        title: 'Gestión de Procesos',
        description: 'Demostración de la gestión de procesos del kernel, scheduler y distribución de recursos en tiempo real.',
        images: [
            {src: 'https://via.placeholder.com/400x250?text=Actividad+2+Img+1', desc: 'Estructura del planificador de procesos (scheduler)'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+2+Img+2', desc: 'Tabla de procesos y estados de ejecución'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+2+Img+3', desc: 'Distribución de recursos y prioridades'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+2+Img+4', desc: 'Manejo de señales y cambio de contexto'}
        ]
    },
    3: {
        title: 'Gestión de Memoria Virtual',
        description: 'Implementación de memoria virtual con paginación, tablas de páginas y algoritmos de reemplazo.',
        images: [
            {src: 'https://via.placeholder.com/400x250?text=Actividad+3+Img+1', desc: 'Sistema de paginación y traducción de direcciones virtuales'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+3+Img+2', desc: 'Estructura de tablas de páginas multinivel'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+3+Img+3', desc: 'Algoritmos de reemplazo de páginas (LRU, FIFO)'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+3+Img+4', desc: 'Gestión de memoria virtual y swap'}
        ]
    },
    4: {
        title: 'Sistema de Archivos',
        description: 'Estructura del sistema de archivos con inodes, bloques de datos, directorios y sistema de permisos.',
        images: [
            {src: 'https://via.placeholder.com/400x250?text=Actividad+4+Img+1', desc: 'Estructura de inodes y bloques de datos'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+4+Img+2', desc: 'Organización de directorios y árboles de archivos'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+4+Img+3', desc: 'Sistema de permisos Unix y control de acceso'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+4+Img+4', desc: 'Gestión de espacio libre y fragmentación'}
        ]
    },
    5: {
        title: 'Sincronización de Hilos',
        description: 'Mecanismos de sincronización: semáforos, mutex, monitores y control de concurrencia entre hilos.',
        images: [
            {src: 'https://via.placeholder.com/400x250?text=Actividad+5+Img+1', desc: 'Conceptos de semáforos y variables de condición'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+5+Img+2', desc: 'Implementación de mutex y locks'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+5+Img+3', desc: 'Sincronización con monitores y barreras'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+5+Img+4', desc: 'Detección y prevención de deadlocks'}
        ]
    },
    6: {
        title: 'Sistema de I/O',
        description: 'Gestión de entrada/salida, controladores de dispositivos e interrupciones del sistema.',
        images: [
            {src: 'https://via.placeholder.com/400x250?text=Actividad+6+Img+1', desc: 'Arquitectura de entrada/salida y buses de comunicación'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+6+Img+2', desc: 'Manejadores de interrupciones y controladores de dispositivos'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+6+Img+3', desc: 'Gestión de buffers y caché de entrada/salida'},
            {src: 'https://via.placeholder.com/400x250?text=Actividad+6+Img+4', desc: 'Optimización de operaciones de disco'}
        ]
    }
};

// Carousel state
let carouselState = {};

// Initialize carousel state for each card
function initializeCarousels() {
    document.querySelectorAll('.gallery-card').forEach(card => {
        const activity = card.getAttribute('data-activity');
        carouselState[activity] = 0;
        setupCarouselListeners(card, activity);
        
        // Inicializar primer slide como activo
        const images = card.querySelectorAll('.carousel-image');
        const dots = card.querySelectorAll('.dot');
        if (images.length > 0) {
            images[0].classList.add('active');
        }
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
    });
}

// Setup carousel event listeners
function setupCarouselListeners(card, activity) {
    const prevBtn = card.querySelector('.carousel-nav-prev');
    const nextBtn = card.querySelector('.carousel-nav-next');
    const dots = card.querySelectorAll('.dot');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(card, activity, carouselState[activity] - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(card, activity, carouselState[activity] + 1));
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'));
            showSlide(card, activity, slideIndex);
        });
    });
}

// Show specific slide
function showSlide(card, activity, n) {
    const images = card.querySelectorAll('.carousel-image');
    const dots = card.querySelectorAll('.dot');
    
    if (n >= images.length) {
        carouselState[activity] = 0;
    } else if (n < 0) {
        carouselState[activity] = images.length - 1;
    } else {
        carouselState[activity] = n;
    }
    
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (images[carouselState[activity]]) {
        images[carouselState[activity]].classList.add('active');
    }
    if (dots[carouselState[activity]]) {
        dots[carouselState[activity]].classList.add('active');
    }
}

// View details - switch to detail view
document.querySelectorAll('.btn-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activity = btn.getAttribute('data-activity');
        showDetailView(activity);
    });
});

// Show detail view
function showDetailView(activityId) {
    const galleryView = document.getElementById('gallery-view');
    const detailView = document.getElementById('detail-view');
    const data = activityData[activityId];
    
    if (!data) return;
    
    // Hide gallery view, show detail view
    galleryView.classList.remove('active');
    detailView.classList.add('active');
    
    // Populate detail view
    document.getElementById('detail-title').textContent = data.title;
    document.getElementById('detail-description').textContent = data.description;
    
    // Populate gallery grid con cards
    const galleryGrid = document.getElementById('detail-gallery-grid');
    galleryGrid.innerHTML = '';
    
    data.images.forEach((imgData, index) => {
        const detailItem = document.createElement('div');
        detailItem.className = 'detail-image-card';
        const imgSrc = typeof imgData === 'string' ? imgData : imgData.src;
        const imgDesc = typeof imgData === 'string' ? '' : imgData.desc;
        
        detailItem.innerHTML = `
            <div class="detail-card-image">
                <img src="${imgSrc}" alt="${data.title} - Imagen ${index + 1}">
                <div class="detail-image-overlay"></div>
            </div>
            <div class="detail-card-content">
                <h4>Imagen ${index + 1}</h4>
                <p>${imgDesc}</p>
            </div>
        `;
        detailItem.addEventListener('click', () => openLightboxWithArray(data.images.map(img => typeof img === 'string' ? img : img.src), index));
        galleryGrid.appendChild(detailItem);
    });
}

// Back to gallery
document.getElementById('btn-back-to-gallery')?.addEventListener('click', () => {
    document.getElementById('gallery-view').classList.add('active');
    document.getElementById('detail-view').classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== LIGHTBOX FUNCTIONALITY ====================

let lightboxState = {
    currentIndex: 0,
    images: []
};

function openLightbox(images, startIndex = 0) {
    // Convertir array de objetos a array de URLs
    const imageUrls = images.map(img => typeof img === 'string' ? img : img.src);
    lightboxState.images = imageUrls;
    lightboxState.currentIndex = startIndex;
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.classList.add('active');
        updateLightboxImage();
    }
}

function openLightboxWithArray(images, startIndex = 0) {
    lightboxState.images = images;
    lightboxState.currentIndex = startIndex;
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.classList.add('active');
        updateLightboxImage();
    }
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter-current');
    const total = document.getElementById('lightbox-counter-total');
    
    if (img) {
        img.src = lightboxState.images[lightboxState.currentIndex];
    }
    if (counter) {
        counter.textContent = lightboxState.currentIndex + 1;
    }
    if (total) {
        total.textContent = lightboxState.images.length;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

// Lightbox event listeners
const lightboxClose = document.querySelector('.lightbox-close');
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

const lightboxPrev = document.querySelector('.lightbox-nav-prev');
if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
        lightboxState.currentIndex = (lightboxState.currentIndex - 1 + lightboxState.images.length) % lightboxState.images.length;
        updateLightboxImage();
    });
}

const lightboxNext = document.querySelector('.lightbox-nav-next');
if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
        lightboxState.currentIndex = (lightboxState.currentIndex + 1) % lightboxState.images.length;
        updateLightboxImage();
    });
}

const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        lightboxState.currentIndex = (lightboxState.currentIndex - 1 + lightboxState.images.length) % lightboxState.images.length;
        updateLightboxImage();
    } else if (e.key === 'ArrowRight') {
        lightboxState.currentIndex = (lightboxState.currentIndex + 1) % lightboxState.images.length;
        updateLightboxImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ==================== INITIALIZE ON DOM READY ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Galería y carruseles inicializados');
    initializeCarousels();
});
