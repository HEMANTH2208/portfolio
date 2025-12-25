// Project Management System
class ProjectManager {
    constructor() {
        this.projects = {
            'outpass-pro': {
                name: 'OutPass Pro',
                description: 'A comprehensive web-based student outpass management system built with Python Flask, featuring QR code scanning, automated SMS notifications, and multi-level authentication.',
                longDescription: 'OutPass Pro revolutionizes student outpass management with cutting-edge technology. The system features real-time QR code scanning for entry/exit tracking, automated SMS notifications to parents, multi-level user authentication, and comprehensive reporting. Built with scalability in mind, it handles thousands of students efficiently while maintaining security and user experience.',
                technologies: ['Python Flask', 'SQLite/PostgreSQL', 'Firebase', 'Twilio'],
                features: [
                    'QR Code scanning for real-time tracking',
                    'Automated SMS notifications to parents',
                    'Multi-level user authentication system',
                    'Comprehensive reporting and analytics',
                    'Mobile-responsive design',
                    'Real-time database synchronization',
                    'Secure API endpoints',
                    'Admin dashboard for management'
                ],
                status: 'completed',
                demoUrl: null, // Will be set by admin
                codeUrl: null, // Will be set by admin
                images: [], // Will be set by admin
                stats: {
                    rating: '4.8/5',
                    users: '500+ Users',
                    performance: '99.9% Uptime'
                },
                icon: 'fas fa-qrcode',
                color: '#00d4ff',
                category: 'Web Application'
            },
            'linkedin-automation': {
                name: 'LinkedIn Automation',
                description: 'Automated LinkedIn post generation system using MCP and Cursor AI for streamlined content creation with zero manual input.',
                longDescription: 'This innovative automation system leverages the power of MCP (Model Context Protocol) and Cursor AI to create engaging LinkedIn content automatically. The system analyzes trends, generates relevant posts, schedules content, and maintains consistent engagement across professional networks. It represents the future of social media automation with AI-driven content creation.',
                technologies: ['AI/ML', 'Automation', 'MCP', 'Cursor AI'],
                features: [
                    'AI-powered content generation',
                    'Trend analysis and topic suggestion',
                    'Automated post scheduling',
                    'Engagement tracking and analytics',
                    'Multi-account management',
                    'Content optimization algorithms',
                    'Real-time performance monitoring',
                    'Custom content templates'
                ],
                status: 'active',
                demoUrl: 'https://www.linkedin.com/posts/hemanthb22_nxtwave-ccbp4academy-fullstackdevelopment-activity-7353095776916439041-kszJ',
                codeUrl: null, // Will be set by admin
                images: [],
                stats: {
                    efficiency: '300% Efficiency',
                    status: '24/7 Active',
                    engagement: '150% Increase'
                },
                icon: 'fas fa-robot',
                color: '#8b5cf6',
                category: 'AI/Automation'
            }
        };
        
        this.currentProject = null;
        this.init();
    }
    
    init() {
        // Load projects from localStorage if available
        const savedProjects = localStorage.getItem('portfolioProjects');
        if (savedProjects) {
            this.projects = { ...this.projects, ...JSON.parse(savedProjects) };
        }
    }
    
    openProject(projectId) {
        const project = this.projects[projectId];
        if (!project) {
            this.showNotification('Project not found', 'error');
            return;
        }
        
        this.currentProject = projectId;
        const modal = document.getElementById('projectModal');
        
        // Populate modal content
        this.populateProjectModal(project);
        
        // Show modal with animation
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    populateProjectModal(project) {
        // Set title and status
        document.getElementById('projectTitle').textContent = project.name;
        const statusBadge = document.getElementById('projectStatusBadge');
        statusBadge.textContent = project.status.charAt(0).toUpperCase() + project.status.slice(1);
        statusBadge.className = `project-status-badge ${project.status}`;
        
        // Set description
        document.getElementById('projectDescription').textContent = project.longDescription || project.description;
        
        // Set technologies
        const techStack = document.getElementById('projectTechStack');
        techStack.innerHTML = project.technologies.map(tech => 
            `<span class="tech-tag-large">${tech}</span>`
        ).join('');
        
        // Set features
        const featuresList = document.getElementById('projectFeatures');
        featuresList.innerHTML = project.features.map(feature => 
            `<li><i class="fas fa-check"></i>${feature}</li>`
        ).join('');
        
        // Set project images
        this.displayProjectImages(project);
        
        // Set project buttons
        this.setupProjectButtons(project);
    }
    
    displayProjectImages(project) {
        const mainImage = document.getElementById('projectMainImage');
        const thumbnails = document.getElementById('projectThumbnails');
        
        if (project.images && project.images.length > 0) {
            // Display main image
            mainImage.innerHTML = `
                <img src="${project.images[0]}" alt="${project.name}" class="project-main-img">
                <div class="image-overlay">
                    <button class="zoom-btn" onclick="zoomImage('${project.images[0]}')">
                        <i class="fas fa-search-plus"></i>
                    </button>
                </div>
            `;
            
            // Display thumbnails
            if (project.images.length > 1) {
                thumbnails.innerHTML = project.images.slice(1).map((img, index) => `
                    <div class="thumbnail" onclick="switchMainImage('${img}')">
                        <img src="${img}" alt="${project.name} ${index + 2}">
                    </div>
                `).join('');
            } else {
                thumbnails.innerHTML = '';
            }
        } else {
            // Show placeholder
            mainImage.innerHTML = `
                <div class="project-placeholder-large">
                    <i class="${project.icon}" style="color: ${project.color}"></i>
                    <p>Project Screenshot</p>
                    <small>Images will be available soon</small>
                </div>
            `;
            thumbnails.innerHTML = '';
        }
    }
    
    setupProjectButtons(project) {
        const demoBtn = document.getElementById('projectDemoBtn');
        const codeBtn = document.getElementById('projectCodeBtn');
        
        // Demo button
        if (project.demoUrl) {
            demoBtn.style.display = 'inline-flex';
            demoBtn.onclick = () => window.open(project.demoUrl, '_blank');
        } else {
            demoBtn.style.display = 'none';
        }
        
        // Code button
        if (project.codeUrl) {
            codeBtn.style.display = 'inline-flex';
            codeBtn.onclick = () => window.open(project.codeUrl, '_blank');
        } else {
            codeBtn.style.display = 'none';
        }
    }
    
    closeProjectModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    viewProjectDemo(projectId) {
        const project = this.projects[projectId];
        if (project && project.demoUrl) {
            window.open(project.demoUrl, '_blank');
        } else {
            this.showNotification('Demo not available for this project', 'info');
        }
    }
    
    viewProjectCode(projectId) {
        const project = this.projects[projectId];
        if (project && project.codeUrl) {
            window.open(project.codeUrl, '_blank');
        } else {
            this.showNotification('Source code not available for this project', 'info');
        }
    }
    
    switchMainImage(imageSrc) {
        const mainImage = document.getElementById('projectMainImage');
        const img = mainImage.querySelector('img');
        if (img) {
            img.src = imageSrc;
            // Add transition effect
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 150);
        }
    }
    
    zoomImage(imageSrc) {
        // Create zoom overlay
        const zoomOverlay = document.createElement('div');
        zoomOverlay.className = 'image-zoom-overlay';
        zoomOverlay.innerHTML = `
            <div class="zoom-container">
                <img src="${imageSrc}" alt="Zoomed image">
                <button class="close-zoom" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(zoomOverlay);
        
        // Close on click outside
        zoomOverlay.addEventListener('click', (e) => {
            if (e.target === zoomOverlay) {
                zoomOverlay.remove();
            }
        });
    }
    
    // Admin functions
    updateProject(projectId, data) {
        if (this.projects[projectId]) {
            this.projects[projectId] = { ...this.projects[projectId], ...data };
            this.saveProjects();
            this.showNotification('Project updated successfully', 'success');
        }
    }
    
    addProject(projectId, data) {
        this.projects[projectId] = {
            name: data.name || 'New Project',
            description: data.description || 'Project description',
            longDescription: data.longDescription || data.description || 'Detailed project description',
            technologies: data.technologies || [],
            features: data.features || [],
            status: data.status || 'active',
            demoUrl: data.demoUrl || null,
            codeUrl: data.codeUrl || null,
            images: data.images || [],
            stats: data.stats || {},
            icon: data.icon || 'fas fa-project-diagram',
            color: data.color || '#00d4ff',
            category: data.category || 'Web Application'
        };
        this.saveProjects();
        this.showNotification('Project added successfully', 'success');
    }
    
    deleteProject(projectId) {
        if (this.projects[projectId]) {
            delete this.projects[projectId];
            this.saveProjects();
            this.showNotification('Project deleted successfully', 'success');
        }
    }
    
    saveProjects() {
        localStorage.setItem('portfolioProjects', JSON.stringify(this.projects));
        // Update the main page projects
        this.updateMainPageProjects();
    }
    
    updateMainPageProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = '';
            Object.keys(this.projects).forEach(projectId => {
                const project = this.projects[projectId];
                const projectElement = document.createElement('div');
                projectElement.className = 'project-card';
                projectElement.setAttribute('onclick', `openProject('${projectId}')`);
                projectElement.setAttribute('data-project', projectId);
                
                const statsHtml = Object.entries(project.stats).map(([key, value]) => 
                    `<div class="stat"><i class="fas fa-${this.getStatIcon(key)}"></i><span>${value}</span></div>`
                ).join('');
                
                projectElement.innerHTML = `
                    <div class="project-image">
                        <div class="project-overlay">
                            <div class="project-links">
                                <button class="project-link" onclick="event.stopPropagation(); viewProjectDemo('${projectId}')">
                                    <i class="fas fa-external-link-alt"></i>
                                </button>
                                <button class="project-link" onclick="event.stopPropagation(); viewProjectCode('${projectId}')">
                                    <i class="fab fa-github"></i>
                                </button>
                            </div>
                        </div>
                        <div class="project-placeholder">
                            <i class="${project.icon}"></i>
                        </div>
                        <div class="project-tech-overlay">
                            <div class="tech-icons">
                                ${this.getTechIcons(project.technologies)}
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <div class="project-header">
                            <h3>${project.name}</h3>
                            <div class="project-status ${project.status}">${project.status.charAt(0).toUpperCase() + project.status.slice(1)}</div>
                        </div>
                        <p>${project.description}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="project-stats">
                            ${statsHtml}
                        </div>
                    </div>
                `;
                projectsGrid.appendChild(projectElement);
            });
        }
    }
    
    getTechIcons(technologies) {
        const iconMap = {
            'Python Flask': 'fab fa-python',
            'Python': 'fab fa-python',
            'JavaScript': 'fab fa-js',
            'React': 'fab fa-react',
            'Node.js': 'fab fa-node-js',
            'Firebase': 'fas fa-fire',
            'Database': 'fas fa-database',
            'AI/ML': 'fas fa-brain',
            'Automation': 'fas fa-cogs',
            'API': 'fas fa-plug'
        };
        
        return technologies.slice(0, 4).map(tech => {
            const icon = iconMap[tech] || 'fas fa-code';
            return `<i class="${icon}" title="${tech}"></i>`;
        }).join('');
    }
    
    getStatIcon(statKey) {
        const iconMap = {
            'rating': 'star',
            'users': 'users',
            'performance': 'tachometer-alt',
            'efficiency': 'chart-line',
            'status': 'clock',
            'engagement': 'heart'
        };
        
        return iconMap[statKey.toLowerCase()] || 'info';
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

// Initialize project manager
let projectManager;

// Global functions
function openProject(projectId) {
    if (!projectManager) {
        projectManager = new ProjectManager();
    }
    projectManager.openProject(projectId);
}

function closeProjectModal() {
    if (projectManager) {
        projectManager.closeProjectModal();
    }
}

function viewProjectDemo(projectId) {
    if (!projectManager) {
        projectManager = new ProjectManager();
    }
    projectManager.viewProjectDemo(projectId);
}

function viewProjectCode(projectId) {
    if (!projectManager) {
        projectManager = new ProjectManager();
    }
    projectManager.viewProjectCode(projectId);
}

function openProjectDemo() {
    if (projectManager && projectManager.currentProject) {
        projectManager.viewProjectDemo(projectManager.currentProject);
    }
}

function openProjectCode() {
    if (projectManager && projectManager.currentProject) {
        projectManager.viewProjectCode(projectManager.currentProject);
    }
}

function switchMainImage(imageSrc) {
    if (projectManager) {
        projectManager.switchMainImage(imageSrc);
    }
}

function zoomImage(imageSrc) {
    if (projectManager) {
        projectManager.zoomImage(imageSrc);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    projectManager = new ProjectManager();
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('projectModal');
            if (modal && modal.style.display === 'block') {
                closeProjectModal();
            }
        }
    });
});