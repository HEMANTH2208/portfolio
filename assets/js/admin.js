// Clean Admin Panel Implementation
class AdminPanel {
    constructor() {
        this.adminPassword = 'admin123';
        this.attemptCount = 0;
        this.currentTab = 'overview';
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }
    
    setupEventListeners() {
        // Setup login form
        const loginForm = document.getElementById('adminLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Setup modal close events
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('adminModal');
            if (e.target === modal) {
                this.closePanel();
            }
        });
        
        // Setup keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('adminModal');
            if (modal && modal.style.display === 'block' && e.key === 'Escape') {
                this.closePanel();
            }
        });
        
        this.isInitialized = true;
    }
    
    openPanel() {
        const modal = document.getElementById('adminModal');
        const login = document.getElementById('adminLogin');
        const dashboard = document.getElementById('adminDashboard');
        
        if (modal && login && dashboard) {
            modal.style.display = 'block';
            login.style.display = 'block';
            dashboard.style.display = 'none';
            document.body.style.overflow = 'hidden';
            
            this.attemptCount = 0;
            this.updateAttemptCount();
            
            // Focus password input
            setTimeout(() => {
                const passwordInput = document.getElementById('adminPassword');
                if (passwordInput) {
                    passwordInput.focus();
                }
            }, 300);
        }
    }
    
    closePanel() {
        const modal = document.getElementById('adminModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.resetPanel();
        }
    }
    
    resetPanel() {
        const login = document.getElementById('adminLogin');
        const dashboard = document.getElementById('adminDashboard');
        const passwordInput = document.getElementById('adminPassword');
        
        if (login) {
            login.style.display = 'block';
            login.style.transform = '';
            login.style.opacity = '';
            login.style.animation = '';
        }
        
        if (dashboard) {
            dashboard.style.display = 'none';
        }
        
        if (passwordInput) {
            passwordInput.value = '';
        }
        
        this.attemptCount = 0;
        this.updateAttemptCount();
    }
    
    updateAttemptCount() {
        const attemptElement = document.getElementById('attemptCount');
        if (attemptElement) {
            attemptElement.textContent = this.attemptCount;
        }
    }
    
    handleLogin(e) {
        e.preventDefault();
        const passwordInput = document.getElementById('adminPassword');
        const password = passwordInput ? passwordInput.value : '';
        
        if (password === this.adminPassword) {
            this.successfulLogin();
        } else {
            this.failedLogin();
        }
    }
    
    successfulLogin() {
        const login = document.getElementById('adminLogin');
        const dashboard = document.getElementById('adminDashboard');
        
        if (login && dashboard) {
            // Login animation
            login.style.transform = 'scale(0.9)';
            login.style.opacity = '0.5';
            
            setTimeout(() => {
                login.style.display = 'none';
                dashboard.style.display = 'flex';
                this.showNotification('Access Granted! Welcome to Control Center', 'success');
                this.initializeDashboard();
            }, 300);
            
            this.attemptCount = 0;
            this.updateAttemptCount();
        }
    }
    
    failedLogin() {
        this.attemptCount++;
        this.updateAttemptCount();
        
        const login = document.getElementById('adminLogin');
        const passwordInput = document.getElementById('adminPassword');
        
        if (this.attemptCount >= 3) {
            this.showNotification('Access Denied! Too many failed attempts. Try again later.', 'error');
            setTimeout(() => {
                this.closePanel();
            }, 2000);
            return;
        }
        
        // Shake animation
        if (login) {
            login.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                login.style.animation = '';
            }, 500);
        }
        
        this.showNotification(`Access Denied! ${3 - this.attemptCount} attempts remaining.`, 'error');
        
        if (passwordInput) {
            passwordInput.value = '';
        }
    }
    
    initializeDashboard() {
        this.setupNavigation();
        this.loadOverviewData();
        this.setupProfileForm();
        this.switchTab('overview');
    }
    
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const tabName = item.getAttribute('data-tab');
                if (tabName) {
                    this.switchTab(tabName);
                    
                    // Update active nav item
                    navItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                    
                    // Update breadcrumb
                    const currentSection = document.getElementById('currentSection');
                    const spanElement = item.querySelector('span');
                    if (currentSection && spanElement) {
                        currentSection.textContent = spanElement.textContent;
                    }
                }
            });
        });
    }
    
    switchTab(tabName) {
        const currentPanel = document.querySelector('.tab-panel.active');
        const newPanel = document.getElementById(tabName + 'Tab');
        
        if (!newPanel) {
            console.error(`Tab panel ${tabName}Tab not found`);
            return;
        }
        
        // Hide current panel
        if (currentPanel && currentPanel !== newPanel) {
            currentPanel.classList.remove('active');
        }
        
        // Show new panel
        newPanel.classList.add('active');
        newPanel.style.opacity = '1';
        newPanel.style.transform = 'translateX(0)';
        
        this.currentTab = tabName;
        
        // Load tab-specific data
        setTimeout(() => {
            switch(tabName) {
                case 'overview':
                    this.loadOverviewData();
                    break;
                case 'projects':
                    this.loadProjectsData();
                    break;
                case 'skills':
                    this.loadSkillsData();
                    break;
                case 'certificates':
                    this.loadCertificatesData();
                    break;
                case 'analytics':
                    this.loadAnalyticsData();
                    break;
            }
        }, 100);
    }
    
    loadOverviewData() {
        this.animateCounters();
        this.loadRecentActivity();
        this.loadSystemMetrics();
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-value[data-target]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 20);
        });
    }
    
    loadRecentActivity() {
        const activities = [
            { icon: 'fas fa-eye', text: 'Portfolio viewed from India', time: '2 minutes ago' },
            { icon: 'fas fa-envelope', text: 'New contact form submission', time: '15 minutes ago' },
            { icon: 'fas fa-download', text: 'Resume downloaded', time: '1 hour ago' },
            { icon: 'fas fa-user-plus', text: 'New LinkedIn connection', time: '3 hours ago' },
            { icon: 'fas fa-star', text: 'Project starred on GitHub', time: '5 hours ago' }
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
    
    loadSystemMetrics() {
        const metrics = document.querySelectorAll('.metric-fill');
        metrics.forEach(metric => {
            const width = metric.style.width;
            metric.style.width = '0%';
            setTimeout(() => {
                metric.style.width = width;
            }, 500);
        });
    }
    
    setupProfileForm() {
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        }
    }
    
    handleProfileUpdate(e) {
        e.preventDefault();
        
        const formData = {
            name: this.getInputValue('editName'),
            title: this.getInputValue('editTitle'),
            description: this.getInputValue('editDescription'),
            email: this.getInputValue('editEmail'),
            linkedin: this.getInputValue('editLinkedin'),
            location: this.getInputValue('editLocation')
        };
        
        const submitBtn = e.target.querySelector('.cyber-btn.primary');
        if (submitBtn) {
            const span = submitBtn.querySelector('span');
            const originalText = span ? span.textContent : 'UPDATE PROFILE';
            
            // Loading state
            if (span) span.textContent = 'UPDATING...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                this.updateMainPageContent(formData);
                
                // Reset button
                if (span) span.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.disabled = false;
                
                this.showNotification('Profile updated successfully!', 'success');
            }, 1500);
        }
    }
    
    getInputValue(id) {
        const input = document.getElementById(id);
        return input ? input.value : '';
    }
    
    updateMainPageContent(data) {
        try {
            // Update hero section
            const heroTitle = document.querySelector('.hero-title .typing-text');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroDescription = document.querySelector('.hero-description');
            
            if (heroTitle && data.name) heroTitle.textContent = `Hi, I'm ${data.name}`;
            if (heroSubtitle && data.title) heroSubtitle.textContent = data.title;
            if (heroDescription && data.description) heroDescription.textContent = data.description;
            
            // Update contact links
            if (data.email) {
                const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
                emailLinks.forEach(link => {
                    link.href = `mailto:${data.email}`;
                    if (link.textContent.includes('@')) {
                        link.textContent = data.email;
                    }
                });
            }
            
            if (data.linkedin) {
                const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
                linkedinLinks.forEach(link => {
                    link.href = data.linkedin;
                });
            }
        } catch (error) {
            console.error('Error updating main page content:', error);
        }
    }
    
    loadProjectsData() {
        const projects = [
            {
                id: 1,
                name: 'OutPass Pro',
                description: 'A comprehensive web-based student outpass management system built with Python Flask',
                technologies: ['Python Flask', 'SQLite/PostgreSQL', 'Firebase', 'Twilio'],
                status: 'Completed'
            },
            {
                id: 2,
                name: 'LinkedIn Automation',
                description: 'Automated LinkedIn post generation system using MCP and Cursor AI',
                technologies: ['AI/ML', 'Automation', 'MCP', 'Cursor AI'],
                status: 'Active'
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
                        <button class="cyber-btn secondary" onclick="adminPanel.editProject(${project.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="cyber-btn secondary" onclick="adminPanel.viewProject(${project.id})">
                            <i class="fas fa-external-link-alt"></i> View
                        </button>
                        <button class="cyber-btn secondary" onclick="adminPanel.deleteProject(${project.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    loadSkillsData() {
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
                        <button class="cyber-btn secondary" onclick="adminPanel.editSkill('${skill.name}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="cyber-btn secondary" onclick="adminPanel.deleteSkill('${skill.name}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    loadAnalyticsData() {
        // Animate metric bars
        const metricFills = document.querySelectorAll('.metric-fill');
        metricFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 300);
        });
        
        // Initialize charts
        this.initializeCharts();
    }
    
    initializeCharts() {
        const charts = ['viewsChart', 'visitorsChart', 'contactsChart', 'downloadsChart'];
        
        charts.forEach(chartId => {
            const canvas = document.getElementById(chartId);
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    this.drawChart(ctx, canvas.width, canvas.height);
                }
            }
        });
    }
    
    drawChart(ctx, width, height) {
        try {
            const data = Array.from({length: 7}, () => Math.random() * height * 0.8);
            const barWidth = width / data.length;
            
            ctx.clearRect(0, 0, width, height);
            
            data.forEach((value, index) => {
                const gradient = ctx.createLinearGradient(0, 0, 0, height);
                gradient.addColorStop(0, '#00d4ff');
                gradient.addColorStop(1, '#8b5cf6');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(index * barWidth, height - value, barWidth - 2, value);
            });
        } catch (error) {
            console.error('Error drawing chart:', error);
        }
    }
    
    loadCertificatesData() {
        const certificates = certificateManager ? certificateManager.certificates : {};
        const certificatesList = document.getElementById('certificatesList');
        
        if (certificatesList) {
            certificatesList.innerHTML = Object.keys(certificates).map(certId => {
                const cert = certificates[certId];
                return `
                    <div class="certificate-manager-card">
                        <div class="cert-manager-icon">
                            <i class="${cert.icon}"></i>
                        </div>
                        <div class="cert-manager-info">
                            <h4>${cert.name}</h4>
                            <p>${cert.issuer}</p>
                            <small>${cert.type} • ${cert.date}</small>
                        </div>
                        <div class="cert-manager-actions">
                            <button class="cyber-btn secondary" onclick="adminPanel.editCertificate('${certId}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="cyber-btn secondary" onclick="adminPanel.viewCertificate('${certId}')">
                                <i class="fas fa-eye"></i> View
                            </button>
                            <button class="cyber-btn secondary" onclick="adminPanel.deleteCertificate('${certId}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
    
    // Certificate management methods
    editCertificate(certId) {
        const cert = certificateManager ? certificateManager.certificates[certId] : null;
        if (!cert) {
            this.showNotification('Certificate not found', 'error');
            return;
        }
        
        const newName = prompt('Certificate Name:', cert.name);
        const newIssuer = prompt('Issuing Organization:', cert.issuer);
        const newDate = prompt('Date:', cert.date);
        const newFile = prompt('Certificate File URL (optional):', cert.file || '');
        const newLink = prompt('Certificate Link (optional):', cert.link || '');
        
        if (newName && newIssuer && newDate) {
            const updatedData = {
                name: newName,
                issuer: newIssuer,
                date: newDate,
                file: newFile || null,
                link: newLink || null
            };
            
            if (certificateManager) {
                certificateManager.updateCertificate(certId, updatedData);
                this.loadCertificatesData();
            }
        }
    }
    
    viewCertificate(certId) {
        if (certificateManager) {
            certificateManager.openCertificate(certId);
        }
    }
    
    deleteCertificate(certId) {
        if (confirm('Are you sure you want to delete this certificate?')) {
            if (certificateManager) {
                certificateManager.deleteCertificate(certId);
                this.loadCertificatesData();
            }
        }
    }
    
    // Project management methods (enhanced)
    editProject(id) {
        const project = projectManager ? projectManager.projects[id] : null;
        if (!project) {
            this.showNotification('Project not found', 'error');
            return;
        }
        
        const newName = prompt('Project Name:', project.name);
        const newDescription = prompt('Project Description:', project.description);
        const newDemoUrl = prompt('Demo URL (optional):', project.demoUrl || '');
        const newCodeUrl = prompt('GitHub Repository URL (optional):', project.codeUrl || '');
        
        if (newName && newDescription) {
            const updatedData = {
                name: newName,
                description: newDescription,
                demoUrl: newDemoUrl || null,
                codeUrl: newCodeUrl || null
            };
            
            if (projectManager) {
                projectManager.updateProject(id, updatedData);
                this.loadProjectsData();
            }
        }
    }
    
    viewProject(id) {
        if (id === 2) {
            window.open('https://www.linkedin.com/posts/hemanthb22_nxtwave-ccbp4academy-fullstackdevelopment-activity-7353095776916439041-kszJ', '_blank');
        } else {
            this.showNotification('Demo URL not available', 'info');
        }
    }
    
    deleteProject(id) {
        if (confirm('Are you sure you want to delete this project?')) {
            this.showNotification(`Project ${id} deleted successfully!`, 'success');
            setTimeout(() => {
                this.loadProjectsData();
            }, 1000);
        }
    }
    
    // Skill management methods
    editSkill(name) {
        this.showNotification(`Edit skill ${name} functionality would be implemented here`, 'info');
    }
    
    deleteSkill(name) {
        if (confirm(`Are you sure you want to delete ${name} skill?`)) {
            this.showNotification(`${name} skill deleted successfully!`, 'success');
            setTimeout(() => {
                this.loadSkillsData();
            }, 1000);
        }
    }
    
    // Utility methods
    logout() {
        this.showNotification('Logging out...', 'info');
        setTimeout(() => {
            this.resetPanel();
            this.showNotification('Logged out successfully', 'success');
        }, 1000);
    }
    
    showNotification(message, type = 'info') {
        // Use the existing notification system
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }
}

// Initialize admin panel
let adminPanel;

// Global functions for backward compatibility
function openAdminPanel() {
    if (!adminPanel) {
        adminPanel = new AdminPanel();
    }
    adminPanel.openPanel();
}

function closeAdminPanel() {
    if (adminPanel) {
        adminPanel.closePanel();
    }
}

function logoutAdmin() {
    if (adminPanel) {
        adminPanel.logout();
    }
}

function openCertificateManager() {
    const certName = prompt('Certificate Name:');
    const certIssuer = prompt('Issuing Organization:');
    const certDate = prompt('Date:');
    const certFile = prompt('Certificate File URL (optional):');
    const certLink = prompt('Certificate Link (optional):');
    
    if (certName && certIssuer && certDate) {
        const certId = certName.toLowerCase().replace(/\s+/g, '-');
        const certData = {
            name: certName,
            issuer: certIssuer,
            date: certDate,
            file: certFile || null,
            link: certLink || null,
            type: 'Certificate',
            description: `${certName} from ${certIssuer}`,
            icon: 'fas fa-certificate',
            color: '#00d4ff'
        };
        
        if (certificateManager) {
            certificateManager.addCertificate(certId, certData);
            if (adminPanel) {
                adminPanel.loadCertificatesData();
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    adminPanel = new AdminPanel();
});