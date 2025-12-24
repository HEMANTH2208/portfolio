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
    
    // Initialize particle system
    createAdvancedParticleSystem();
    
    // Initialize scroll-triggered animations
    initializeScrollAnimations();
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

// Enhanced Admin Panel Functionality
const adminModal = document.getElementById('adminModal');
const adminLogin = document.getElementById('adminLogin');
const adminDashboard = document.getElementById('adminDashboard');
const adminPassword = 'King@1212';
let attemptCount = 0;
let currentTab = 'overview';

function openAdminPanel() {
    adminModal.style.display = 'block';
    adminLogin.style.display = 'block';
    adminDashboard.style.display = 'none';
    document.body.style.overflow = 'hidden';
    
    // Reset attempt count
    attemptCount = 0;
    updateAttemptCount();
    
    // Focus on password input
    setTimeout(() => {
        document.getElementById('adminPassword').focus();
    }, 300);
}

function closeAdminPanel() {
    adminModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetAdminPanel();
}

function resetAdminPanel() {
    adminLogin.style.display = 'block';
    adminDashboard.style.display = 'none';
    document.getElementById('adminPassword').value = '';
    attemptCount = 0;
    updateAttemptCount();
}

function updateAttemptCount() {
    const attemptElement = document.getElementById('attemptCount');
    if (attemptElement) {
        attemptElement.textContent = attemptCount;
    }
}

// Enhanced admin login with security features
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    
    if (password === adminPassword) {
        // Successful login animation
        adminLogin.style.transform = 'scale(0.9)';
        adminLogin.style.opacity = '0.5';
        
        setTimeout(() => {
            adminLogin.style.display = 'none';
            adminDashboard.style.display = 'flex';
            showNotification('Access Granted! Welcome to Control Center', 'success');
            initializeAdminDashboard();
        }, 300);
        
        attemptCount = 0;
        updateAttemptCount();
    } else {
        attemptCount++;
        updateAttemptCount();
        
        // Security lockout after 3 attempts
        if (attemptCount >= 3) {
            showNotification('Access Denied! Too many failed attempts. Try again later.', 'error');
            setTimeout(() => {
                closeAdminPanel();
            }, 2000);
            return;
        }
        
        // Shake animation for failed login
        adminLogin.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            adminLogin.style.animation = '';
        }, 500);
        
        showNotification(`Access Denied! ${3 - attemptCount} attempts remaining.`, 'error');
        document.getElementById('adminPassword').value = '';
    }
});

// Initialize admin dashboard
function initializeAdminDashboard() {
    loadAdminData();
    initializeNavigation();
    animateStatCounters();
    loadRecentActivity();
    initializeCharts();
}

// Enhanced navigation system
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabName = item.getAttribute('data-tab');
            switchTab(tabName);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update breadcrumb
            document.getElementById('currentSection').textContent = 
                item.querySelector('span').textContent;
        });
    });
}

// Enhanced tab switching with animations
function switchTab(tabName) {
    const currentPanel = document.querySelector('.tab-panel.active');
    const newPanel = document.getElementById(tabName + 'Tab');
    
    if (currentPanel) {
        currentPanel.style.opacity = '0';
        currentPanel.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            currentPanel.classList.remove('active');
            newPanel.classList.add('active');
            newPanel.style.opacity = '0';
            newPanel.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                newPanel.style.opacity = '1';
                newPanel.style.transform = 'translateX(0)';
            }, 50);
        }, 150);
    } else {
        newPanel.classList.add('active');
    }
    
    currentTab = tabName;
    
    // Load tab-specific data
    switch(tabName) {
        case 'overview':
            animateStatCounters();
            break;
        case 'projects':
            loadProjectsManager();
            break;
        case 'skills':
            loadSkillsManager();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

// Animate stat counters with enhanced effects
function animateStatCounters() {
    const statValues = document.querySelectorAll('.stat-value[data-target]');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
                
                // Add completion effect
                stat.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    stat.style.transform = 'scale(1)';
                }, 200);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Load recent activity with real-time updates
function loadRecentActivity() {
    const activities = [
        {
            icon: 'fas fa-eye',
            text: 'Portfolio viewed from India',
            time: '2 minutes ago'
        },
        {
            icon: 'fas fa-envelope',
            text: 'New contact form submission',
            time: '15 minutes ago'
        },
        {
            icon: 'fas fa-download',
            text: 'Resume downloaded',
            time: '1 hour ago'
        },
        {
            icon: 'fas fa-user-plus',
            text: 'New LinkedIn connection',
            time: '3 hours ago'
        },
        {
            icon: 'fas fa-star',
            text: 'Project starred on GitHub',
            time: '5 hours ago'
        }
    ];
    
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <span>${activity.text}</span>
                    <small>${activity.time}</small>
                </div>
            </div>
        `).join('');
    }
}

// Enhanced profile form handling
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('editName').value,
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value,
        email: document.getElementById('editEmail').value,
        linkedin: document.getElementById('editLinkedin').value,
        location: document.getElementById('editLocation').value
    };
    
    // Simulate API call with loading state
    const submitBtn = this.querySelector('.cyber-btn.primary');
    const originalText = submitBtn.querySelector('span').textContent;
    
    submitBtn.querySelector('span').textContent = 'UPDATING...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Update the main page content
        updateMainPageContent(formData);
        
        // Reset button
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.disabled = false;
        
        showNotification('Profile updated successfully!', 'success');
    }, 1500);
});

// Update main page content
function updateMainPageContent(data) {
    // Update hero section
    const heroTitle = document.querySelector('.hero-title .typing-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle) heroTitle.textContent = `Hi, I'm ${data.name}`;
    if (heroSubtitle) heroSubtitle.textContent = data.title;
    if (heroDescription) heroDescription.textContent = data.description;
    
    // Update contact information
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.href = `mailto:${data.email}`;
        if (link.textContent.includes('@')) {
            link.textContent = data.email;
        }
    });
    
    const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
    linkedinLinks.forEach(link => {
        link.href = data.linkedin;
    });
}

// Enhanced projects manager
function loadProjectsManager() {
    const projects = [
        {
            id: 1,
            name: 'OutPass Pro',
            description: 'A comprehensive web-based student outpass management system built with Python Flask',
            technologies: ['Python Flask', 'SQLite/PostgreSQL', 'Firebase', 'Twilio'],
            status: 'Completed',
            github: '#',
            demo: '#'
        },
        {
            id: 2,
            name: 'LinkedIn Automation',
            description: 'Automated LinkedIn post generation system using MCP and Cursor AI',
            technologies: ['AI/ML', 'Automation', 'MCP', 'Cursor AI'],
            status: 'Active',
            github: '#',
            demo: 'https://www.linkedin.com/posts/hemanthb22_nxtwave-ccbp4academy-fullstackdevelopment-activity-7353095776916439041-kszJ'
        }
    ];
    
    const projectsList = document.getElementById('projectsList');
    if (projectsList) {
        projectsList.innerHTML = projects.map(project => `
            <div class="project-manager-card">
                <div class="project-header">
                    <h3>${project.name}</h3>
                    <div class="project-status ${project.status.toLowerCase()}">${project.status}</div>
                </div>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="cyber-btn secondary" onclick="editProject(${project.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="cyber-btn secondary" onclick="viewProject('${project.demo}')">
                        <i class="fas fa-external-link-alt"></i> View
                    </button>
                    <button class="cyber-btn secondary" onclick="deleteProject(${project.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Enhanced skills manager
function loadSkillsManager() {
    const skills = [
        { name: 'Python', level: 90, category: 'Programming' },
        { name: 'C', level: 75, category: 'Programming' },
        { name: 'SQL', level: 85, category: 'Database' },
        { name: 'HTML', level: 95, category: 'Web' },
        { name: 'CSS', level: 90, category: 'Web' },
        { name: 'Excel', level: 80, category: 'Tools' }
    ];
    
    const skillsList = document.getElementById('skillsList');
    if (skillsList) {
        skillsList.innerHTML = skills.map(skill => `
            <div class="skill-manager-item">
                <div class="skill-info">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-category">${skill.category}</div>
                </div>
                <div class="skill-level">
                    <div class="skill-bar">
                        <div class="skill-fill" style="width: ${skill.level}%"></div>
                    </div>
                    <span>${skill.level}%</span>
                </div>
                <div class="skill-actions">
                    <button class="cyber-btn secondary" onclick="editSkill('${skill.name}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="cyber-btn secondary" onclick="deleteSkill('${skill.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Initialize mini charts for analytics
function initializeCharts() {
    // This would integrate with a charting library like Chart.js
    // For now, we'll create simple animated bars
    const charts = ['viewsChart', 'visitorsChart', 'contactsChart', 'downloadsChart'];
    
    charts.forEach(chartId => {
        const canvas = document.getElementById(chartId);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            drawMiniChart(ctx, canvas.width, canvas.height);
        }
    });
}

function drawMiniChart(ctx, width, height) {
    const data = Array.from({length: 7}, () => Math.random() * height);
    const barWidth = width / data.length;
    
    ctx.clearRect(0, 0, width, height);
    
    data.forEach((value, index) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#00d4ff');
        gradient.addColorStop(1, '#8b5cf6');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(index * barWidth, height - value, barWidth - 2, value);
    });
}

// Logout functionality
function logoutAdmin() {
    showNotification('Logging out...', 'info');
    setTimeout(() => {
        resetAdminPanel();
        showNotification('Logged out successfully', 'success');
    }, 1000);
}

// Project management functions
function openProjectModal() {
    showNotification('Project creation modal would open here', 'info');
}

function editProject(id) {
    showNotification(`Edit project ${id} functionality would be implemented here`, 'info');
}

function viewProject(url) {
    if (url && url !== '#') {
        window.open(url, '_blank');
    } else {
        showNotification('Demo URL not available', 'info');
    }
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        showNotification(`Project ${id} deleted successfully!`, 'success');
        setTimeout(() => {
            loadProjectsManager();
        }, 1000);
    }
}

// Skill management functions
function openSkillModal() {
    showNotification('Skill creation modal would open here', 'info');
}

function editSkill(name) {
    showNotification(`Edit skill ${name} functionality would be implemented here`, 'info');
}

function deleteSkill(name) {
    if (confirm(`Are you sure you want to delete ${name} skill?`)) {
        showNotification(`${name} skill deleted successfully!`, 'success');
        setTimeout(() => {
            loadSkillsManager();
        }, 1000);
    }
}

// Analytics functions
function loadAnalytics() {
    // Animate metric bars
    const metricFills = document.querySelectorAll('.metric-fill');
    metricFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = width;
        }, 300);
    });
}

// Load admin data
function loadAdminData() {
    loadProjectsManager();
    loadSkillsManager();
    loadRecentActivity();
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === adminModal) {
        closeAdminPanel();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (adminModal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeAdminPanel();
        }
    }
});

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