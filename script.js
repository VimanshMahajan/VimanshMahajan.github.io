// ==========================================
// ULTIMATE PORTFOLIO - VIMANSH MAHAJAN
// Advanced Interactive Features
// ==========================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    delay: 100
});

// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (cursorDot && cursorOutline && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .magnetic, .btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(1.5)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// ==========================================
// PARTICLE BACKGROUND
// ==========================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==========================================
// MOBILE NAVIGATION
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
        navbar.style.background = 'rgba(10, 14, 26, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.5)';
    }

    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ACTIVE NAV LINK ON SCROLL
// ==========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, #hero');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 150)) {
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

// ==========================================
// TERMINAL TYPING EFFECT
// ==========================================
const typedTextElement = document.getElementById('typed-text');
if (typedTextElement) {
    const commands = [
        'whoami',
        'cat about.txt',
        'ls skills/',
        'git log --projects',
        'echo "Welcome to my portfolio!"'
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeCommand() {
        const currentCommand = commands[commandIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentCommand.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typeSpeed = 500;
        }

        setTimeout(typeCommand, typeSpeed);
    }

    setTimeout(typeCommand, 1000);
}

// ==========================================
// ROLE TEXT ROTATION
// ==========================================
const roleTextElement = document.getElementById('role-text');
if (roleTextElement) {
    const roles = [
        'Software Engineer',
        'ML | NLP Enthusiast',
        'Full Stack Developer',
        'Problem Solver',
        'Tech Innovator'
    ];

    let roleIndex = 0;

    function rotateRole() {
        roleTextElement.style.opacity = '0';
        roleTextElement.style.transform = 'translateY(-10px)';

        setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleTextElement.textContent = roles[roleIndex];
            roleTextElement.style.opacity = '1';
            roleTextElement.style.transform = 'translateY(0)';
        }, 300);
    }

    roleTextElement.style.transition = 'all 0.3s ease';
    setInterval(rotateRole, 3000);
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');

    counters.forEach(counter => {
        const target = counter.getAttribute('data-count');

        // Skip if no data-count attribute (for non-numeric values like "Fortune", "IIITD")
        if (!target) {
            return;
        }

        const targetNum = parseInt(target);
        let count = 0;
        const increment = targetNum / 100;

        const updateCounter = () => {
            if (count < targetNum) {
                count += increment;
                const displayValue = Math.ceil(count);
                // Add + for numbers except 3 (for "3 Research @ IIITD")
                counter.textContent = targetNum === 3 ? displayValue : displayValue + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = targetNum === 3 ? targetNum : targetNum + '+';
            }
        };

        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const heroSection = document.getElementById('hero');
if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(heroSection);
}

// ==========================================
// SKILL PROGRESS BARS
// ==========================================
const skillSection = document.getElementById('skills');
if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = document.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    bar.style.width = progress + '%';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillSection);
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        element.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
    });
});

// ==========================================
// CARD GLOW EFFECT FOLLOWS MOUSE
// ==========================================
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cardGlow = card.querySelector('.card-glow');
        if (cardGlow) {
            cardGlow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.2) 0%, transparent 50%)`;
        }
    });
});

// ==========================================
// PARALLAX EFFECT FOR SECTIONS
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for hero elements
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Parallax for floating icons
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        const speed = 0.1 + (index * 0.05);
        icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top magnetic';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: var(--bg-primary);
    border: none;
    cursor: none;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(360deg)';
    this.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.6)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
    this.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.4)';
});

// ==========================================
// PROJECT CARDS HOVER EFFECT (SIMPLIFIED)
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    // Removed 3D tilt for better readability
    // Cards now only have subtle hover effects via CSS
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ==========================================
// DYNAMIC YEAR IN FOOTER
// ==========================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('footer p');
if (footerText) {
    footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
}

// ==========================================
// PAGE LOAD ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// EASTER EGG - CONSOLE MESSAGE
// ==========================================
console.log('%c🚀 Welcome to Vimansh\'s Portfolio! ', 'background: linear-gradient(135deg, #00d4ff, #00ffaa); color: #0a0e1a; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
console.log('%c💼 Looking for a passionate developer?', 'color: #8b949e; font-size: 14px; padding: 5px;');
console.log('%c📧 Let\'s connect: vimansh22572@iiitd.ac.in', 'color: #00d4ff; font-size: 14px; padding: 5px;');
console.log('%c⚡ Fun fact: This portfolio has custom cursor, particle effects, and magnetic interactions!', 'color: #00ffaa; font-size: 12px; padding: 5px; font-style: italic;');

// ==========================================
// KONAMI CODE EASTER EGG
// ==========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);

    if (konamiCode.join('').includes(konamiPattern.join(''))) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create rainbow effect
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    alert('🎉 You found the secret! Here\'s a virtual high-five! ✋');

    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// ==========================================
// PREVENT CONTEXT MENU (OPTIONAL - for protection)
// ==========================================
// Uncomment if you want to prevent right-click
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
}

// ==========================================
// ACCESSIBILITY - REDUCED MOTION SUPPORT
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ==========================================
// SERVICE WORKER REGISTRATION (PWA - Optional)
// ==========================================
if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA features
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}

