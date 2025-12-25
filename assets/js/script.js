// Loading Screen with enhanced animation
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(1.1)';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            // Initialize page animations
            initializePageAnimations();
        }, 800);
    }, 2500);
});

// Initialize sophisticated page animations
function initializePageAnimations() {
    // Stagger animation for hero elements
    const heroElements = [
        '.hero-title',
        '.hero-subtitle', 
        '.hero-description',
        '.hero-buttons',
        '.social-links'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        }
    });
    
    // Initialize advanced particle systems
    createAdvancedParticleSystem();
    createNeuralNetwork();
    createQuantumDots();
    
    // Initialize scroll-triggered animations
    initializeScrollAnimations();
    
    // Initialize custom cursor
    initializeCustomCursor();
    
    // Initialize magnetic effects
    initializeMagneticEffects();
}

// Enhanced Navigation with smooth transitions
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Advanced navbar scroll effect with parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero background
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Update floating orbs position
    updateFloatingOrbs(scrolled);
});

// Update floating orbs based on scroll
function updateFloatingOrbs(scrolled) {
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = scrolled * speed;
        orb.style.transform = `translateY(${yPos}px) scale(${1 + scrolled * 0.0005})`;
    });
}

// Enhanced mobile menu with animations
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate menu items
    const menuItems = navMenu.querySelectorAll('.nav-link');
    menuItems.forEach((item, index) => {
        if (navMenu.classList.contains('active')) {
            item.style.animation = `slideInRight 0.3s ease forwards ${index * 0.1}s`;
        } else {
            item.style.animation = '';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced typing animation
function advancedTypeWriter(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? deleteSpeed : speed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize advanced typing animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const texts = [
                "Hi, I'm Hemanth B",
                "Data Scientist",
                "AI Enthusiast", 
                "Problem Solver"
            ];
            advancedTypeWriter(typingElement, texts, 120, 80, 2000);
        }
    }, 3000);
});

// Advanced particle system
function createAdvancedParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'advanced-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    // Create different types of particles
    for (let i = 0; i < 30; i++) {
        createParticle(particleContainer, 'dot');
    }
    
    for (let i = 0; i < 15; i++) {
        createParticle(particleContainer, 'line');
    }
    
    for (let i = 0; i < 10; i++) {
        createParticle(particleContainer, 'triangle');
    }
    
    document.body.appendChild(particleContainer);
}

function createParticle(container, type) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 10;
    
    let particleStyle = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: floatParticle ${duration}s linear infinite ${delay}s;
    `;
    
    switch(type) {
        case 'dot':
            particleStyle += `
                background: radial-gradient(circle, var(--neon-blue), transparent);
                border-radius: 50%;
                filter: blur(1px);
            `;
            break;
        case 'line':
            particleStyle += `
                background: linear-gradient(45deg, var(--neon-purple), var(--neon-pink));
                width: ${size * 3}px;
                height: 1px;
                filter: blur(0.5px);
            `;
            break;
        case 'triangle':
            particleStyle += `
                width: 0;
                height: 0;
                border-left: ${size/2}px solid transparent;
                border-right: ${size/2}px solid transparent;
                border-bottom: ${size}px solid var(--neon-green);
                filter: blur(1px);
            `;
            break;
    }
    
    particle.style.cssText = particleStyle;
    container.appendChild(particle);
}

// Enhanced scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('skill-progress')) {
                    animateSkillBar(entry.target);
                }
                
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.about-text, .education-item, .stat-item, .timeline-item, .project-card, .skill-category, .contact-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Enhanced skill bar animation
function animateSkillBar(skillBar) {
    const width = skillBar.getAttribute('data-width');
    const duration = 2000;
    let currentWidth = 0;
    const increment = parseInt(width) / (duration / 16);
    
    const animate = () => {
        currentWidth += increment;
        if (currentWidth >= parseInt(width)) {
            currentWidth = parseInt(width);
            skillBar.style.width = width;
            return;
        }
        skillBar.style.width = currentWidth + '%';
        requestAnimationFrame(animate);
    };
    
    setTimeout(() => {
        animate();
    }, 300);
}

// Enhanced project card animation
function animateProjectCard(card) {
    const delay = Array.from(card.parentNode.children).indexOf(card) * 200;
    setTimeout(() => {
        card.style.transform = 'translateY(0) rotateX(0)';
        card.style.opacity = '1';
    }, delay);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add slide animations to timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('slide-in-left');
        } else {
            item.classList.add('slide-in-right');
        }
        observer.observe(item);
    });
    
    // Add scale animation to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('scale-in');
        observer.observe(card);
    });
    
    // Add fade animation to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });
    
    // Observe skill progress bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
    });
    
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
});

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.reset();
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Theme switcher (bonus feature)
function createThemeSwitcher() {
    const themeSwitcher = document.createElement('button');
    themeSwitcher.innerHTML = '🌙';
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    let isDark = false;
    
    themeSwitcher.addEventListener('click', () => {
        isDark = !isDark;
        document.body.classList.toggle('dark-theme', isDark);
        themeSwitcher.innerHTML = isDark ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('darkTheme', isDark);
    });
    
    // Load saved preference
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        isDark = true;
        document.body.classList.add('dark-theme');
        themeSwitcher.innerHTML = '☀️';
    }
    
    document.body.appendChild(themeSwitcher);
}

// Initialize theme switcher
document.addEventListener('DOMContentLoaded', createThemeSwitcher);

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add tilt effect to cards
    const cards = document.querySelectorAll('.project-card, .stat-item, .cert-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
});

// Console easter egg
console.log(`
    🚀 Welcome to Hemanth B's Portfolio!
    
    ╔══════════════════════════════════════╗
    ║  Thanks for checking out the code!   ║
    ║                                      ║
    ║  Try the Konami code for a surprise: ║
    ║  ↑ ↑ ↓ ↓ ← → ← → B A               ║
    ║                                      ║
    ║  Contact: bhemanth2221@gmail.com     ║
    ╚══════════════════════════════════════╝
    
    Built with ❤️ and lots of ☕
`);

// Add some performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }, 0);
    });
}
// Advanced Neural Network Animation
function createNeuralNetwork() {
    const container = document.getElementById('neuralNetwork');
    if (!container) return;
    
    const nodes = [];
    const connections = [];
    
    // Create nodes
    for (let i = 0; i < 20; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(node);
        nodes.push(node);
    }
    
    // Create connections between nearby nodes
    nodes.forEach((node, index) => {
        const nodeRect = node.getBoundingClientRect();
        nodes.forEach((otherNode, otherIndex) => {
            if (index !== otherIndex) {
                const otherRect = otherNode.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(nodeRect.left - otherRect.left, 2) + 
                    Math.pow(nodeRect.top - otherRect.top, 2)
                );
                
                if (distance < 200) {
                    const connection = document.createElement('div');
                    connection.className = 'neural-connection';
                    connection.style.left = nodeRect.left + 'px';
                    connection.style.top = nodeRect.top + 'px';
                    connection.style.width = distance + 'px';
                    connection.style.transform = `rotate(${Math.atan2(
                        otherRect.top - nodeRect.top,
                        otherRect.left - nodeRect.left
                    )}rad)`;
                    connection.style.animationDelay = Math.random() * 4 + 's';
                    container.appendChild(connection);
                }
            }
        });
    });
}

// Quantum Dots Animation
function createQuantumDots() {
    const container = document.getElementById('quantumDots');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'quantum-dot';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDelay = Math.random() * 8 + 's';
        dot.style.animationDuration = (Math.random() * 4 + 6) + 's';
        container.appendChild(dot);
    }
}

// Custom Cursor Effect
function initializeCustomCursor() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);
    
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);
    
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follow for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        
        cursorOutline.style.left = outlineX - 20 + 'px';
        cursorOutline.style.top = outlineY - 20 + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Hover effects
    document.querySelectorAll('a, button, .project-card, .cert-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Magnetic Effects
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.btn, .project-card, .cert-item');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3;
            el.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}

// Particle Explosion Effect
function createParticleExplosion(x, y, color = '#00d4ff') {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Enhanced Intersection Observer
function initializeAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add appropriate animation class
                if (element.classList.contains('fade-in-up')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('fade-in-left')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('fade-in-right')) {
                    element.classList.add('visible');
                } else if (element.classList.contains('stagger-animation')) {
                    element.classList.add('visible');
                }
                
                // Special effects for specific elements
                if (element.classList.contains('project-card')) {
                    setTimeout(() => {
                        element.classList.add('holographic-card');
                    }, 300);
                }
                
                if (element.classList.contains('cert-item')) {
                    setTimeout(() => {
                        element.classList.add('advanced-hover');
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .stagger-animation').forEach(el => {
        observer.observe(el);
    });
}

// Text Reveal Animation
function initializeTextReveal() {
    const textElements = document.querySelectorAll('.section-title, .hero-title');
    
    textElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('text-reveal');
        }, index * 200);
    });
}

// Advanced Loading States
function showAdvancedLoading(element) {
    element.classList.add('loading');
    
    setTimeout(() => {
        element.classList.remove('loading');
    }, 2000);
}

// Performance Monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        // Monitor FPS
        let fps = 0;
        let lastTime = performance.now();
        
        function measureFPS() {
            const currentTime = performance.now();
            fps = 1000 / (currentTime - lastTime);
            lastTime = currentTime;
            
            // Reduce animations if FPS is low
            if (fps < 30) {
                document.body.classList.add('reduce-animations');
            } else {
                document.body.classList.remove('reduce-animations');
            }
            
            requestAnimationFrame(measureFPS);
        }
        measureFPS();
        
        // Monitor memory usage
        if (performance.memory) {
            setInterval(() => {
                const memoryUsage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
                if (memoryUsage > 0.8) {
                    console.warn('High memory usage detected');
                    // Cleanup particles if memory is high
                    document.querySelectorAll('.particle, .quantum-dot').forEach(el => {
                        if (Math.random() > 0.5) el.remove();
                    });
                }
            }, 5000);
        }
    }
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
    
    // High contrast mode
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // Focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Advanced Scroll Effects
function initializeAdvancedScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax backgrounds
        const parallaxElements = document.querySelectorAll('.liquid-bg, .neural-network');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${rate * 0.3}px)`;
        });
        
        // Update floating orbs
        updateFloatingOrbs(scrolled);
        
        // Update morphing shapes
        const morphingShapes = document.querySelectorAll('.morphing-shape');
        morphingShapes.forEach(shape => {
            shape.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    // Add classes for animations
    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('fade-in-up', 'gpu-accelerated');
    });
    
    document.querySelectorAll('.cert-item').forEach(cert => {
        cert.classList.add('fade-in-up', 'gpu-accelerated');
    });
    
    document.querySelectorAll('.skill-item').forEach(skill => {
        skill.classList.add('fade-in-left');
    });
    
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('fade-in-left');
        } else {
            item.classList.add('fade-in-right');
        }
    });
    
    // Initialize all systems
    setTimeout(() => {
        initializeAdvancedScrollAnimations();
        initializeTextReveal();
        initializePerformanceMonitoring();
        initializeAccessibility();
        initializeAdvancedScrollEffects();
    }, 1000);
});

// Add click effects
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .project-card, .cert-item')) {
        createParticleExplosion(e.clientX, e.clientY);
    }
});

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.classList.add('konami-mode');
        showNotification('🎉 Konami Code Activated! Welcome to the Matrix!', 'success');
        
        // Add special effects
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                createParticleExplosion(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    ['#00d4ff', '#8b5cf6', '#f472b6', '#10b981'][Math.floor(Math.random() * 4)]
                );
            }, i * 50);
        }
        
        konamiCode = [];
    }
});

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}