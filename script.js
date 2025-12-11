// ==================== NAVBAR GLASSMORPHISM SCROLL EFFECT ====================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        navbar.style.backdropFilter = 'blur(16px) saturate(200%)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)';
    } else {
        navbar.style.background = 'rgba(17, 24, 39, 0.8)';
        navbar.style.backdropFilter = 'blur(12px) saturate(180%)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// ==================== SCROLL PARALLAX ULTRA AVANZADO ====================

let scrollY = 0;
let windowHeight = window.innerHeight;

window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
}, { passive: true });

// ==================== BURBUJAS INTERACTIVAS EN HERO ====================

function createBubbles() {
    const container = document.getElementById('bubblesContainer');
    if (!container) return;

    const bubbleCount = 12;
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 80 + 50; // Entre 50px y 130px
        const left = Math.random() * 100;
        const top = Math.random() * 100; // En toda la altura
        const delay = Math.random() * 2;
        
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = left + '%';
        bubble.style.top = top + '%';
        bubble.style.animationDelay = delay + 's';
        
        bubble.addEventListener('click', (e) => {
            e.stopPropagation();
            burstBubble(bubble);
        });
        
        container.appendChild(bubble);
    }
}

function burstBubble(bubble) {
    if (bubble.classList.contains('burst')) return;
    
    bubble.classList.add('burst');
    
    // Crear partículas al reventar
    const rect = bubble.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createBurstEffect(x, y);
    
    // Remover burbuja después de animación
    setTimeout(() => {
        bubble.remove();
        // Crear nueva burbuja
        createNewBubble();
    }, 600);
}

function createNewBubble() {
    const container = document.getElementById('bubblesContainer');
    if (!container) return;
    
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 80 + 40;
    const left = Math.random() * 100;
    const top = Math.random() * 80;
    const delay = 0;
    
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = left + '%';
    bubble.style.top = top + '%';
    bubble.style.animationDelay = delay + 's';
    
    bubble.addEventListener('click', (e) => {
        e.stopPropagation();
        burstBubble(bubble);
    });
    
    container.appendChild(bubble);
}

function createBurstEffect(x, y) {
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        
        const element = document.createElement('div');
        element.className = 'burst-particle-element';
        particle.appendChild(element);
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 5 + Math.random() * 3;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        let life = 1;
        
        function animate() {
            life -= 0.02;
            vx *= 0.98;
            vy *= 0.98;
            vy += 0.1; // Gravedad
            
            x += vx;
            y += vy;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = life;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        animate();
    }
}

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
            {src: 'assets/actividad 1/particion.png', desc: 'particion del disco en xubuntu'},
            {src: 'assets/actividad 1/login.png', desc: 'primer logeo en nuestra vm despues de la instalacion'},
            {src: 'assets/actividad 1/google.png', desc: 'navegadores: chromium instalado en el proceso de instalacion'},
            {src: 'assets/actividad 1/firefox.png', desc: 'navegadores: firefox instalado por defecto'},
            {src: 'assets/actividad 1/visuals.png', desc: 'editores de codigo: visual studio code'},
            {src: 'assets/actividad 1/vim.png', desc: 'editores de codigo: vim en la terminal'},
            {src: 'assets/actividad 1/exito.png', desc: 'instalacion correcta de alma linux y reinicio del sistema'},
            {src: 'assets/actividad 1/partialma.png', desc: 'particion del disco alma linux'},
            {src: 'assets/actividad 1/ins.png', desc: 'instalacion de las herramientas en alma linux'},
            {src: 'assets/actividad 1/ping.png', desc: 'alma linux: hacemos ping y verificamos todo instalado correctaamente git y curl'}
        ]
    },
    2: {
        title: 'Instalacion de los editores de texto vim y nano',
        description: 'Guia paso a paso de como hacer la instalacion y configuracion de los editores de texto vim y nano',
        images: [
            {src: 'assets/actividad 1/actividad 2/cap1.png', desc: 'Abrimos la consola o la terminal de nuestra maquina virtual y ejecutamos el comando sudo apt install nano para instalar el editor nano pones tu contraseña para confirmar'},
            {src: 'assets/actividad 1/actividad 2/cap2.png', desc: 'Aplicando el paso anterior escribimos sudo apt install vim para instalar el editor vim'},
            {src: 'assets/actividad 1/actividad 2/Cap3.png', desc: 'Antes de hacer la instalacion de los plugins para vim debemos instalar git con el comando sudo apt install git'},
            {src: 'assets/actividad 1/actividad 2/cap4.png', desc: 'Una vez instalado git procedemos a clonar el repositorio de vim que se llama VundleVim con el comando "git clone https//github.com/VundleVim/Vundle.vim ~/.vim/bundle/Vundle.vim"'},
            {src: 'assets/actividad 1/actividad 2/cap5.png', desc: 'Una vez ya tenemos el repositorio clonado escribimos nano ~/.vimrc para abrir el archivo de configuracion de vim y agregar las configuraciones necesarias para que vundle funcione correctamente'},
            {src: 'assets/actividad 1/actividad 2/cap6.png', desc: 'Por defecto, Vim no trae plugins instalados, así que los set se usan para activar funciones básicas como números de línea, auto-indentación y resaltado de sintaxis. Para extender sus capacidades se usa Vundle, un gestor que permite instalar plugins fácilmente. En el bloque entre vundle#begin() y vundle#end() se declaran los plugins: gmarik/Vundle.vim instala Vundle, preservim/nerdtree añade un explorador de archivos visual para navegar el proyecto y itchyny/lightline.vim mejora la barra de estado mostrando información útil como el número de línea o el tipo de archivo. Finalmente, filetype plugin indent on activa la detección automática del tipo de archivo y una indentación adecuada según el lenguaje.'},
            {src: 'assets/actividad 1/actividad 2/cap7.png', desc: 'Ahora vamos a los archivos de configuracion de nano con el comando nano ~/.nanorc para aplicar los ajustes para añadir funciones adicionales en todos nuestros archivos de nano'},
            {src: 'assets/actividad 1/actividad 2/cap8.png', desc: 'En este archivo de configuración de nano, se están habilitando varias características útiles para mejorar la experiencia de edición. La línea set linenumbers activa la numeración de líneas, lo que facilita la navegación y referencia dentro del archivo. La línea set tabsize 4 establece el tamaño de las tabulaciones a 4 espacios, promoviendo una indentación consistente. La línea set autoindent habilita la auto-indentación, haciendo que las nuevas líneas comiencen con la misma indentación que la línea anterior. Finalmente, la línea include "/usr/share/nano/*.nanorc" incluye configuraciones adicionales desde archivos externos, permitiendo soporte para resaltado de sintaxis y otras funcionalidades específicas para diferentes tipos de archivos lo malo de esta identacion es que no lo hace de forma automatica y toca presionar las teclas ctrl + i.'},
            {src: 'assets/actividad 1/actividad 2/cap9.png', desc: 'Creamos un archivo de prueba llamado HolaMundo.java en este caso para nano se crearia con el comando nano HolaMundo.java para crear un archivo con la extension .java'},
            {src: 'assets/actividad 1/actividad 2/cap10.png', desc: 'Una vez se crea el archivo procedemos a escribir un simple codigo en java para probar el editor nano y sus funciones como cambia de color las letras como cada vez que pasamos de linea se enumera sola y cuando ponemos palabras reservadas de java como public static void main cambia de color automaticamente si queremos guardar el archivo precionamos ctrl + x y decimos que si queremos guardar los archivos y con el mismo nombre o solamente das enter luego de que digas que si.'},
            {src: 'assets/actividad 1/actividad 2/cap11.png', desc: 'Ahora probaremos el edittor vim con el mismo nombre HolaMundo pero con la extension de python que es .py para hacer el ensayo en vim y para crear el archivo en vim es vim HolaMundo.py'},
            {src: 'assets/actividad 1/actividad 2/cap12.png', desc: 'Una vez entramos al archivo tocamos la tecla i para poder entrar en modo de insercion para editarlo'},
            {src: 'assets/actividad 1/actividad 2/cap13.png', desc: 'Probamos con diferentes palabras reservadas para ver si cambia de color o tambien que si enumera las lineas automaticamente y efectivamente lo hace al igual que nano para guardar el archivo en vim tocamos la tecla esc y luego escribimos :wq para guardar y salir del archivo o una forma mas facil es con :x! que sale y guarda.'},
            {src: 'assets/actividad 1/actividad 2/cap14.png', desc: 'Y para finalizar progamos la autoindentacion para ver si se hace de forma automatica y una vez funciona ya podemos cerrar los archivos y felicidades has instalado y configurado los editores de texto vim y nano exitosamente con algunos plugins y hightliths.'}
        ]
    },
    3: {
    title: 'Gestión de Memoria Virtual',
    description: 'Implementación de memoria virtual con paginación, tablas de páginas y algoritmos de reemplazo.',
    images: [
        {src: 'assets/Actividad 3/Funcionalidad_Script.png', desc: 'Captura de la ejecución del script de automatización: muestra las entradas, el procesamiento paso a paso y la salida final con códigos de retorno, útil para verificar que las tareas programadas se ejecutaron correctamente.'},
        {src: 'assets/Actividad 3/Diferencia_GraficavsConsola.png', desc: 'Comparación entre la representación gráfica y la salida en consola para el mismo conjunto de datos; ilustra cómo la visualización facilita la interpretación y cómo la consola aporta trazabilidad y detalles técnicos.'},
        {src: 'assets/Actividad 3/htop.png', desc: 'Salida de htop mostrando procesos ordenados por uso de CPU y consumo de memoria, con columnas interactivas y desglose de hilos; útil para identificar procesos que consumen recursos en tiempo real.'},
        {src: 'assets/Actividad 3/top.png', desc: 'Salida de top con un resumen en tiempo real de procesos, uso de CPU, load average y memoria, ideal para detectar rápidamente picos de carga y procesos sospechosos.'},
        {src: 'assets/Actividad 3/ls_proc.png', desc: 'Listado del sistema de archivos /proc mostrando entradas de procesos y parámetros del kernel (cmdline, status, uptime); sirve para inspeccionar el estado interno del sistema y la información expuesta por cada PID.'},
        {src: 'assets/Actividad 3/Ps_aux.png', desc: 'Ejemplo de `ps aux` mostrando todos los procesos con columnas completas (USER, %CPU, %MEM, VSZ, RSS, COMMAND); útil para auditorías y para obtener una foto estática del estado de los procesos.'},
        {src: 'assets/Actividad 3/ps_aux_grepZ.png', desc: 'Uso de `ps aux` combinado con `grep` para filtrar procesos por nombre o patrón; la captura muestra cómo localizar procesos específicos evitando resultados falsos positivos mediante patrones más precisos.'},
        {src: 'assets/Actividad 3/ps_aux_head.png', desc: 'Combinación `ps aux | head` para obtener un resumen rápido (primeras líneas) del listado de procesos; práctica útil en scripts y cuando se necesita una inspección inicial veloz.'},
        {src: 'assets/Actividad 3/pkill.png', desc: 'Demostración de `pkill` para enviar señales a procesos por nombre; muestra cómo finalizar (o señalizar) procesos sin conocer su PID exacto, conveniente para gestionar grupos de procesos.'},
        {src: 'assets/Actividad 3/pgrep.png', desc: 'Salida de `pgrep` mostrando los PIDs que coinciden con un patrón; ideal en pipelines y scripts para obtener PIDs de forma programática y fiable.'},
        {src: 'assets/Actividad 3/pgtree.png', desc: 'Visualización en forma de árbol de procesos (pstree/pgtree) que muestra las relaciones padre-hijo entre procesos, muy útil para entender dependencias y la estructura de ejecución.'},
        {src: 'assets/Actividad 3/pkill.png', desc: 'Ejemplo adicional de `pkill` mostrando variantes de uso (por ejemplo señales diferentes o coincidencias más específicas), para ilustrar opciones avanzadas y precauciones al enviar señales por nombre.'},
        {src: 'assets/Actividad 3/kill.png', desc: 'Uso de `kill PID` para enviar señales a un proceso específico (por defecto SIGTERM); la captura muestra el envío de la señal y el efecto esperado de terminación ordenada.'},
        {src: 'assets/Actividad 3/kill_STOP.png', desc: 'Ejemplo de `kill -STOP PID` (SIGSTOP) para suspender la ejecución de un proceso sin terminarlo; útil para pausar tareas problemáticas y analizarlas posteriormente.'},
        {src: 'assets/Actividad 3/killall.png', desc: 'Demostración de `killall` para enviar señales a todos los procesos que coincidan por nombre; práctico para detener múltiples instancias de un servicio, con la advertencia de usarlo con cuidado.'},
        {src: 'assets/Actividad 3/nice.png', desc: 'Ejemplo de `nice` al lanzar un comando con una prioridad ajustada (niceness), mostrando cómo bajar la prioridad de procesos intensivos para mejorar la responsividad del sistema.'},
        {src: 'assets/Actividad 3/renice.png', desc: 'Uso de `renice` para modificar la prioridad de procesos ya en ejecución; la captura muestra el cambio del valor NI y su efecto observable en la planificación del CPU.'},
        {src: 'assets/Actividad 3/Jps_xubuntu.png', desc: 'Salida de `jps` (Java Virtual Machine Process Status Tool) en Xubuntu, listando procesos Java activos con su identificador y nombre principal; útil para administradores de aplicaciones Java.'},
        {src: 'assets/Actividad 3/Jps_proceso_ejecucion_alma.png', desc: 'Ejemplo de `jps` en Alma Linux mostrando un proceso Java en ejecución, usado aquí para comparar la salida entre distribuciones y verificar que los servicios Java se detectan correctamente.'}
    ]
},
    4: {
        title: 'Sistema de Archivos',
        description: 'Estructura del sistema de archivos con inodes, bloques de datos, directorios y sistema de permisos.',
        images: [
            {src: 'assets/actividad 4/cap 1.png', desc: 'actualizar docker'},
            {src: 'assets/actividad 4/cap2 comlementos.png', desc: 'Complementos necesarios para docker'},
            {src: 'assets/actividad 4/cap3 aggg repo.png', desc: 'agregando el repositorio de docker'},
            {src: 'assets/actividad 4/cap4 engine.png', desc: 'instalacion docker engine'},
            {src: 'assets/actividad 4/cap5 serviciodocker.png', desc: 'iniciando servicio de docker'},
            {src: 'assets/actividad 4/cap6 dockerversion.png', desc: 'verificando la version de docker instalada'},
            {src: 'assets/actividad 4/cap7 dockerinfo.png', desc: 'comando docker info para verificar la instalacion'},
            {src: 'assets/actividad 4/cap8 dockerrun.png', desc: 'ejecutando contenedor de prueba'},
            {src: 'assets/actividad 4/cap9_dockerfile.png', desc: 'Creacion del Dockerfile'},
            {src: 'assets/actividad 4/cap 10 contruimagen.png', desc: 'Construcción de imagen Docker'},
            {src: 'assets/actividad 4/cap11 imagenes creadas.png', desc: 'Imágenes Docker creadas y disponibles'},
            {src: 'assets/actividad 4/cap12 contenedor ejecutando.png', desc: 'Contenedor en ejecución'},
            {src: 'assets/actividad 4/cap13 entrandocont.png', desc: 'Acceso al contenedor Docker'},
            {src: 'assets/actividad 4/cap14 docker inspect.png', desc: 'Inspección detallada del contenedor'}
        ]
    },
    5: {
        title: 'Sincronización de Hilos',
        description: 'Mecanismos de sincronización: semáforos, mutex, monitores y control de concurrencia entre hilos.',
        images: [
            {src: 'assets/actividad 5/cap1_script.png', desc: 'Script para ejecutar comandos del sistema'},
            {src: 'assets/actividad 5/cap2_permisos.png', desc: 'Asignación de permisos al script'},
            {src: 'assets/actividad 5/cap3_dockerfile.png', desc: 'Creación del Dockerfile para la imagen'},
            {src: 'assets/actividad 5/cap4_construction.png', desc: 'Construcción de la imagen Docker'},
            {src: 'assets/actividad 5/cap5_dockerimages.png', desc: 'Verificación de imágenes Docker creadas'},
            {src: 'assets/actividad 5/cap6_script.png', desc: 'Script funcionando correctamente'},
            {src: 'assets/actividad 5/cap7_login.png', desc: 'Autenticación en Docker Hub'},
            {src: 'assets/actividad 5/cap8_etiqueta.png', desc: 'Etiquetado de imagen y preparación para subir'},
            {src: 'assets/actividad 5/cap9_imagen.png', desc: 'Imagen subida exitosamente a Docker Hub'},
            {src: 'assets/actividad 5/cap10 pull.png', desc: 'Descarga de imagen desde Docker Hub'}
        ]
    },
    6: {
        title: ' Instalación y Despliegue de Kubernetes',
        description: 'Instalación de Kubernetes y despliegue de una imagen desde Docker Hub.',
        images: [
            {src: 'assets/actividad_6/actividad_6-1/cap_1.png', desc: ''},
            {src: 'assets/actividad_6/actividad_6-1/cap_2.png', desc: ''},
            {src: 'assets/actividad_6/actividad_6-1/cap_3.png', desc: ''},
            {src: 'assets/actividad_6/actividad_6-2/cap_1.png', desc: ''},
            {src: 'assets/actividad_6/actividad_6-2/cap_2.png', desc: ''},
            {src: 'assets/actividad_6/actividad_6-2/cap_3.png', desc: ''},
            {src: 'assets/actividad_6/actividad_6-2/cap_4.png', desc: ''},
            {src: 'assets/actividad_6/actividad_6-2/cap_5.png', desc: ''},
            {src: 'assets/actividad_6/actividad_6-2/cap_6.png', desc: ''},
        ]
    },

  
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

//Carga las imagenes de la actividad 6 xd
const loadActivityImages = (activityNumber) => {
    
    const activity = activityData[activityNumber];
    if (!activity) return;

    console.log('Cargando imágenes para la actividad', activityNumber);
    const card = document.querySelector(`.gallery-card[data-activity="${activityNumber}"]`);
    if (!card) return;

    const imagesContainer = card.querySelector('.carousel-images');
    imagesContainer.innerHTML = ''; 

    activity.images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.desc;
        imgElement.classList.add('carousel-image');
        imagesContainer.appendChild(imgElement);
    });
    
}


loadActivityImages(6);

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
    
    // Crear burbujas interactivas en el hero
    createBubbles();


    
    // Inicializar partículas
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: ['#EF4444', '#d4af37'] },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
                opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
                size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                line_linked: { enable: true, distance: 150, color: '#d4af37', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
            },
            retina_detect: true
        });
    }

   
});
