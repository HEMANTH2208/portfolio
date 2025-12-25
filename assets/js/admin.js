// Professional Admin Panel
let currentAdminTab = 'profile';

// Open admin panel
function openAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) {
        panel.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        console.log('Admin panel opened');
    } else {
        console.error('Admin panel not found');
    }
}

// Close admin panel
function closeAdminPanel() {
    const panel = document.getElementById('adminPanel');
    if (panel) {
        panel.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Admin panel closed');
    }
}

// Switch between tabs
function switchAdminTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Hide all tabs
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'AdminTab');
    if (selectedTab) {
        selectedTab.classList.add('active');
        console.log('Tab activated:', tabName);
    } else {
        console.error('Tab not found:', tabName + 'AdminTab');
    }
    
    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    currentAdminTab = tabName;
}

// Save profile changes
function saveProfile() {
    console.log('Saving profile...');
    
    const name = document.getElementById('quickName')?.value || '';
    const title = document.getElementById('quickTitle')?.value || '';
    const email = document.getElementById('quickEmail')?.value || '';
    
    console.log('Profile data:', { name, title, email });
    
    // Update main page content
    const heroTitle = document.querySelector('.hero-title .typing-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && name) {
        heroTitle.textContent = `Hi, I'm ${name}`;
        console.log('Updated hero title');
    }
    if (heroSubtitle && title) {
        heroSubtitle.textContent = title;
        console.log('Updated hero subtitle');
    }
    
    // Update email links
    if (email) {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${email}`;
        });
        console.log('Updated email links');
    }
    
    showNotification('Profile updated successfully!', 'success');
}

// Add new project
function addProject() {
    console.log('Adding project...');
    
    const name = document.getElementById('projectName')?.value || '';
    const url = document.getElementById('projectUrl')?.value || '';
    
    if (name.trim() === '') {
        showNotification('Please enter a project name', 'error');
        return;
    }
    
    const projectsList = document.getElementById('projectsList');
    if (projectsList) {
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.innerHTML = `
            <div class="item-info">
                <span class="item-title">${name}</span>
                <small>${url || 'No URL provided'}</small>
            </div>
            <div class="item-actions">
                <button onclick="editProject(this)" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="removeItem(this)" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        projectsList.appendChild(newItem);
        
        // Clear inputs
        document.getElementById('projectName').value = '';
        document.getElementById('projectUrl').value = '';
        
        showNotification('Project added successfully!', 'success');
        console.log('Project added:', name);
    }
}

// Add new certificate
function addCertificate() {
    console.log('Adding certificate...');
    
    const name = document.getElementById('certName')?.value || '';
    const issuer = document.getElementById('certIssuer')?.value || '';
    
    if (name.trim() === '' || issuer.trim() === '') {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const certsList = document.getElementById('certificatesList');
    if (certsList) {
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.innerHTML = `
            <div class="item-info">
                <span class="item-title">${name}</span>
                <small>${issuer}</small>
            </div>
            <div class="item-actions">
                <button onclick="editCertificate(this)" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="removeItem(this)" title="Remove">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        certsList.appendChild(newItem);
        
        // Clear inputs
        document.getElementById('certName').value = '';
        document.getElementById('certIssuer').value = '';
        
        showNotification('Certificate added successfully!', 'success');
        console.log('Certificate added:', name);
    }
}

// Edit project
function editProject(button) {
    const item = button.closest('.item');
    const titleElement = item.querySelector('.item-title');
    const currentName = titleElement.textContent;
    
    const newName = prompt('Edit project name:', currentName);
    if (newName && newName.trim() !== '') {
        titleElement.textContent = newName;
        showNotification('Project updated successfully!', 'success');
    }
}

// Edit certificate
function editCertificate(button) {
    const item = button.closest('.item');
    const titleElement = item.querySelector('.item-title');
    const issuerElement = item.querySelector('small');
    const currentName = titleElement.textContent;
    const currentIssuer = issuerElement.textContent;
    
    const newName = prompt('Edit certificate name:', currentName);
    const newIssuer = prompt('Edit issuer:', currentIssuer);
    
    if (newName && newName.trim() !== '') {
        titleElement.textContent = newName;
    }
    if (newIssuer && newIssuer.trim() !== '') {
        issuerElement.textContent = newIssuer;
    }
    
    showNotification('Certificate updated successfully!', 'success');
}

// Remove item
function removeItem(button) {
    const item = button.closest('.item');
    if (item) {
        item.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            item.remove();
            showNotification('Item removed', 'info');
        }, 300);
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    console.log('Notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.admin-notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = 'admin-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10002;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Add icon based on type
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    notification.innerHTML = `<span style="margin-right: 8px;">${icon}</span>${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add enhanced CSS animations
const adminStyle = document.createElement('style');
adminStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .simple-admin-panel {
        animation: fadeIn 0.3s ease;
    }
    
    .admin-card {
        animation: slideInFromBottom 0.4s ease;
    }
    
    @keyframes slideInFromBottom {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(adminStyle);

// Enhanced event listeners
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('admin-overlay')) {
        closeAdminPanel();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const panel = document.getElementById('adminPanel');
        if (panel && panel.style.display === 'flex') {
            closeAdminPanel();
        }
    }
});

// Initialize admin panel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin panel initialized');
    
    // Check if admin panel exists
    const panel = document.getElementById('adminPanel');
    if (panel) {
        console.log('Admin panel found in DOM');
    } else {
        console.error('Admin panel not found in DOM');
    }
    
    // Check if admin button exists
    const adminBtn = document.querySelector('.admin-btn');
    if (adminBtn) {
        console.log('Admin button found');
    } else {
        console.error('Admin button not found');
    }
});

console.log('Professional admin panel loaded successfully!');