// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Navigation
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
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

// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            typeWriter(typingElement, "Hi, I'm Hemanth B", 100);
        }
    }, 2500);
});

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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

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

// Admin Panel Functionality
const adminModal = document.getElementById('adminModal');
const adminLogin = document.getElementById('adminLogin');
const adminDashboard = document.getElementById('adminDashboard');
const adminPassword = 'admin123'; // In a real application, this would be handled securely

function openAdminPanel() {
    adminModal.style.display = 'block';
    adminLogin.style.display = 'block';
    adminDashboard.style.display = 'none';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    adminModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === adminModal) {
        adminModal.style.display = 'none';
    }
});

// Admin login
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    if (password === adminPassword) {
        adminLogin.style.display = 'none';
        adminDashboard.style.display = 'block';
        showNotification('Welcome to Admin Panel!', 'success');
        loadAdminData();
    } else {
        showNotification('Invalid password!', 'error');
    }
});

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// Load admin data
function loadAdminData() {
    loadProjects();
    loadSkills();
}

// Profile form handling
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('editName').value;
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    
    // Update the main page content
    document.querySelector('.hero-title .typing-text').textContent = `Hi, I'm ${name}`;
    document.querySelector('.hero-subtitle').textContent = title;
    document.querySelector('.hero-description').textContent = description;
    
    showNotification('Profile updated successfully!', 'success');
});

// Projects management
function loadProjects() {
    const projectsList = document.getElementById('projectsList');
    const projects = [
        {
            id: 1,
            name: 'OutPass Pro',
            description: 'A comprehensive web-based student outpass management system',
            technologies: ['Python Flask', 'SQLite/PostgreSQL', 'Firebase', 'Twilio']
        },
        {
            id: 2,
            name: 'LinkedIn Automation',
            description: 'Automated LinkedIn post generation system using MCP and Cursor AI',
            technologies: ['AI/ML', 'Automation', 'MCP', 'Cursor AI']
        }
    ];
    
    projectsList.innerHTML = projects.map(project => `
        <div class="admin-project-item">
            <h5>${project.name}</h5>
            <p>${project.description}</p>
            <div class="project-actions">
                <button class="btn btn-secondary" onclick="editProject(${project.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function addProject() {
    showNotification('Add Project functionality would be implemented here', 'info');
}

function editProject(id) {
    showNotification(`Edit Project ${id} functionality would be implemented here`, 'info');
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        showNotification(`Project ${id} deleted successfully!`, 'success');
        loadProjects();
    }
}

// Skills management
function loadSkills() {
    const skillsList = document.getElementById('skillsList');
    const skills = [
        { name: 'Python', level: 90 },
        { name: 'C', level: 75 },
        { name: 'SQL', level: 85 },
        { name: 'HTML', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'Excel', level: 80 }
    ];
    
    skillsList.innerHTML = skills.map(skill => `
        <div class="admin-skill-item">
            <span>${skill.name}</span>
            <span>${skill.level}%</span>
            <div class="skill-actions">
                <button class="btn btn-secondary" onclick="editSkill('${skill.name}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteSkill('${skill.name}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function addSkill() {
    showNotification('Add Skill functionality would be implemented here', 'info');
}

function editSkill(name) {
    showNotification(`Edit Skill ${name} functionality would be implemented here`, 'info');
}

function deleteSkill(name) {
    if (confirm(`Are you sure you want to delete ${name} skill?`)) {
        showNotification(`${name} skill deleted successfully!`, 'success');
        loadSkills();
    }
}

// Floating particles animation
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add CSS for particle animation
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .admin-project-item,
    .admin-skill-item {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .project-actions,
    .skill-actions {
        display: flex;
        gap: 10px;
    }
    
    .btn-danger {
        background: #dc3545;
        color: white;
    }
    
    .btn-danger:hover {
        background: #c82333;
    }
`;
document.head.appendChild(particleStyles);

// Initialize floating particles
document.addEventListener('DOMContentLoaded', function() {
    createFloatingParticles();
});

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        showNotification('🎉 Easter egg activated! You found the secret!', 'success');
        
        // Add rainbow animation
        const rainbowStyles = document.createElement('style');
        rainbowStyles.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyles);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyles.remove();
        }, 10000);
        
        konamiCode = [];
    }
});

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

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

// Add dark theme styles
const darkThemeStyles = document.createElement('style');
darkThemeStyles.textContent = `
    .dark-theme {
        --bg-color: #1a1a1a;
        --text-color: #ffffff;
        --card-bg: #2d2d2d;
        --border-color: #404040;
    }
    
    .dark-theme body {
        background-color: var(--bg-color);
        color: var(--text-color);
    }
    
    .dark-theme .navbar {
        background: rgba(26, 26, 26, 0.95);
    }
    
    .dark-theme .about,
    .dark-theme .projects,
    .dark-theme .contact {
        background: var(--bg-color);
    }
    
    .dark-theme .about-text,
    .dark-theme .project-card,
    .dark-theme .skill-category,
    .dark-theme .certifications,
    .dark-theme .contact-form,
    .dark-theme .contact-item,
    .dark-theme .education-item,
    .dark-theme .stat-item,
    .dark-theme .timeline-content {
        background: var(--card-bg);
        color: var(--text-color);
    }
    
    .dark-theme .form-group input,
    .dark-theme .form-group textarea {
        background: var(--card-bg);
        color: var(--text-color);
        border-color: var(--border-color);
    }
`;
document.head.appendChild(darkThemeStyles);

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