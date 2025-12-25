// Certificate Management System
class CertificateManager {
    constructor() {
        this.certificates = {
            'hackfinity': {
                name: 'HACKFINITY 2025',
                issuer: 'SIMATS Engineering College',
                date: '2025',
                type: 'Competition',
                description: 'Participated in competitive hackathon, developing innovative solutions under time constraints.',
                file: null, // Will be set by admin
                link: null, // Will be set by admin
                icon: 'fas fa-trophy',
                color: '#FFD700'
            },
            'design-thinking': {
                name: 'Design Thinking A Primer',
                issuer: 'NPTEL',
                date: '2024',
                type: 'Course',
                description: 'Comprehensive course on design thinking principles and methodologies.',
                file: null,
                link: null,
                icon: 'fas fa-lightbulb',
                color: '#00d4ff'
            },
            'microsoft-productivity': {
                name: 'Microsoft Digital Productivity',
                issuer: 'NSDC',
                date: '2024',
                type: 'Certification',
                description: 'Digital productivity tools and techniques certification.',
                file: null,
                link: null,
                icon: 'fab fa-microsoft',
                color: '#0078d4'
            },
            'ieee-xtreme': {
                name: 'IEEEXtreme Programming',
                issuer: 'IEEE',
                date: '2024',
                type: 'Competition',
                description: 'Global programming competition organized by IEEE.',
                file: null,
                link: null,
                icon: 'fas fa-code',
                color: '#8b5cf6'
            }
        };
        
        this.currentCertificate = null;
        this.init();
    }
    
    init() {
        // Load certificates from localStorage if available
        const savedCertificates = localStorage.getItem('portfolioCertificates');
        if (savedCertificates) {
            this.certificates = { ...this.certificates, ...JSON.parse(savedCertificates) };
        }
    }
    
    openCertificate(certId) {
        const certificate = this.certificates[certId];
        if (!certificate) {
            this.showNotification('Certificate not found', 'error');
            return;
        }
        
        this.currentCertificate = certId;
        const modal = document.getElementById('certificateModal');
        const title = document.getElementById('certificateTitle');
        const name = document.getElementById('certName');
        const issuer = document.getElementById('certIssuer');
        const date = document.getElementById('certDate');
        const viewer = document.getElementById('certificateViewer');
        
        // Set certificate details
        title.textContent = certificate.name;
        name.textContent = certificate.name;
        issuer.textContent = certificate.issuer;
        date.textContent = certificate.date;
        
        // Display certificate content
        this.displayCertificateContent(viewer, certificate);
        
        // Show modal with animation
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    displayCertificateContent(viewer, certificate) {
        viewer.innerHTML = '';
        
        if (certificate.file) {
            // Display file (PDF, image, etc.)
            const fileExtension = certificate.file.split('.').pop().toLowerCase();
            
            if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
                // Display image
                const img = document.createElement('img');
                img.src = certificate.file;
                img.alt = certificate.name;
                img.className = 'certificate-image';
                img.onload = () => {
                    viewer.appendChild(img);
                    this.addImageZoomFeature(img);
                };
                img.onerror = () => {
                    this.showCertificatePlaceholder(viewer, certificate);
                };
            } else if (fileExtension === 'pdf') {
                // Display PDF
                const iframe = document.createElement('iframe');
                iframe.src = certificate.file;
                iframe.className = 'certificate-pdf';
                iframe.onload = () => {
                    viewer.appendChild(iframe);
                };
                iframe.onerror = () => {
                    this.showCertificatePlaceholder(viewer, certificate);
                };
            } else {
                this.showCertificatePlaceholder(viewer, certificate);
            }
        } else if (certificate.link) {
            // Display external link preview
            const linkPreview = document.createElement('div');
            linkPreview.className = 'certificate-link-preview';
            linkPreview.innerHTML = `
                <div class="link-preview-content">
                    <i class="${certificate.icon}"></i>
                    <h3>${certificate.name}</h3>
                    <p>External Certificate Link</p>
                    <button class="cyber-btn primary" onclick="window.open('${certificate.link}', '_blank')">
                        <i class="fas fa-external-link-alt"></i>
                        <span>View Certificate</span>
                    </button>
                </div>
            `;
            viewer.appendChild(linkPreview);
        } else {
            // Show placeholder
            this.showCertificatePlaceholder(viewer, certificate);
        }
    }
    
    showCertificatePlaceholder(viewer, certificate) {
        viewer.innerHTML = `
            <div class="certificate-placeholder">
                <i class="${certificate.icon}" style="color: ${certificate.color}"></i>
                <h3>${certificate.name}</h3>
                <p>${certificate.description}</p>
                <small>Certificate file not available. Please contact admin to upload.</small>
            </div>
        `;
    }
    
    addImageZoomFeature(img) {
        let isZoomed = false;
        img.style.cursor = 'zoom-in';
        
        img.addEventListener('click', () => {
            if (!isZoomed) {
                img.style.transform = 'scale(1.5)';
                img.style.cursor = 'zoom-out';
                img.style.zIndex = '1000';
                isZoomed = true;
            } else {
                img.style.transform = 'scale(1)';
                img.style.cursor = 'zoom-in';
                img.style.zIndex = 'auto';
                isZoomed = false;
            }
        });
    }
    
    closeCertificateModal() {
        const modal = document.getElementById('certificateModal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    downloadCertificate() {
        const certificate = this.certificates[this.currentCertificate];
        if (!certificate) return;
        
        if (certificate.file) {
            // Create download link
            const link = document.createElement('a');
            link.href = certificate.file;
            link.download = `${certificate.name.replace(/\s+/g, '_')}_Certificate`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            this.showNotification('Certificate download started', 'success');
        } else if (certificate.link) {
            window.open(certificate.link, '_blank');
        } else {
            this.showNotification('Certificate file not available', 'error');
        }
    }
    
    shareCertificate() {
        const certificate = this.certificates[this.currentCertificate];
        if (!certificate) return;
        
        const shareData = {
            title: certificate.name,
            text: `Check out my ${certificate.name} certificate from ${certificate.issuer}`,
            url: certificate.link || window.location.href
        };
        
        if (navigator.share) {
            navigator.share(shareData).then(() => {
                this.showNotification('Certificate shared successfully', 'success');
            }).catch(() => {
                this.fallbackShare(shareData);
            });
        } else {
            this.fallbackShare(shareData);
        }
    }
    
    fallbackShare(shareData) {
        // Copy to clipboard
        const textToCopy = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                this.showNotification('Certificate details copied to clipboard', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Certificate details copied to clipboard', 'success');
        }
    }
    
    // Admin functions
    updateCertificate(certId, data) {
        if (this.certificates[certId]) {
            this.certificates[certId] = { ...this.certificates[certId], ...data };
            this.saveCertificates();
            this.showNotification('Certificate updated successfully', 'success');
        }
    }
    
    addCertificate(certId, data) {
        this.certificates[certId] = {
            name: data.name || 'New Certificate',
            issuer: data.issuer || 'Unknown',
            date: data.date || new Date().getFullYear().toString(),
            type: data.type || 'Certificate',
            description: data.description || '',
            file: data.file || null,
            link: data.link || null,
            icon: data.icon || 'fas fa-certificate',
            color: data.color || '#00d4ff'
        };
        this.saveCertificates();
        this.showNotification('Certificate added successfully', 'success');
    }
    
    deleteCertificate(certId) {
        if (this.certificates[certId]) {
            delete this.certificates[certId];
            this.saveCertificates();
            this.showNotification('Certificate deleted successfully', 'success');
        }
    }
    
    saveCertificates() {
        localStorage.setItem('portfolioCertificates', JSON.stringify(this.certificates));
        // Update the main page certificates
        this.updateMainPageCertificates();
    }
    
    updateMainPageCertificates() {
        const certGrid = document.querySelector('.cert-grid');
        if (certGrid) {
            certGrid.innerHTML = '';
            Object.keys(this.certificates).forEach(certId => {
                const cert = this.certificates[certId];
                const certElement = document.createElement('div');
                certElement.className = 'cert-item';
                certElement.setAttribute('onclick', `openCertificate('${certId}')`);
                certElement.setAttribute('data-cert', certId);
                certElement.innerHTML = `
                    <div class="cert-icon">
                        <i class="${cert.icon}"></i>
                    </div>
                    <div class="cert-content">
                        <h4>${cert.name}</h4>
                        <p>${cert.issuer}</p>
                        <span class="cert-date">${cert.date}</span>
                    </div>
                    <div class="cert-overlay">
                        <i class="fas fa-eye"></i>
                        <span>View Certificate</span>
                    </div>
                `;
                certGrid.appendChild(certElement);
            });
        }
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

// Initialize certificate manager
let certificateManager;

// Global functions
function openCertificate(certId) {
    if (!certificateManager) {
        certificateManager = new CertificateManager();
    }
    certificateManager.openCertificate(certId);
}

function closeCertificateModal() {
    if (certificateManager) {
        certificateManager.closeCertificateModal();
    }
}

function downloadCertificate() {
    if (certificateManager) {
        certificateManager.downloadCertificate();
    }
}

function shareCertificate() {
    if (certificateManager) {
        certificateManager.shareCertificate();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    certificateManager = new CertificateManager();
    
    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('certificateModal');
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('certificateModal');
            if (modal && modal.style.display === 'block') {
                closeCertificateModal();
            }
        }
    });
});