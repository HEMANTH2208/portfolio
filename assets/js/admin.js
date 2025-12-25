// Horizontal Admin Panel System
(() => {
    "use strict";

    /* ---------- HORIZONTAL ADMIN PANEL ---------- */

    window.openAdminPanel = () => {
        const panel = document.getElementById("adminPanel");
        if (!panel) return console.error("Admin panel not found");

        panel.style.display = "block";
        setTimeout(() => {
            panel.classList.add("active");
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = "hidden";
        console.log("Horizontal admin panel opened");
    };

    window.closeAdminPanel = () => {
        const panel = document.getElementById("adminPanel");
        if (!panel) return;

        panel.classList.remove("active");
        setTimeout(() => {
            panel.style.display = "none";
            document.body.style.overflow = "auto";
        }, 400);
        console.log("Horizontal admin panel closed");
    };

    /* ---------- HORIZONTAL TAB SWITCHING ---------- */

    window.switchAdminTab = (tabName, clickedItem) => {
        // Remove active from all nav tabs
        document.querySelectorAll(".nav-tab").forEach(tab =>
            tab.classList.remove("active")
        );

        // Remove active from all content tabs
        document.querySelectorAll(".admin-panel-tab").forEach(tab =>
            tab.classList.remove("active")
        );

        // Add active to clicked nav tab
        if (clickedItem) {
            clickedItem.classList.add("active");
        }

        // Show target content tab
        const targetTab = document.getElementById(`${tabName}AdminTab`);
        if (targetTab) {
            targetTab.classList.add("active");
            console.log(`Switched to ${tabName} tab`);
        } else {
            console.error(`Tab ${tabName}AdminTab not found`);
        }
    };

    /* ---------- PROFILE MANAGEMENT ---------- */

    window.saveProfile = () => {
        const name = document.getElementById("quickName")?.value || "";
        const title = document.getElementById("quickTitle")?.value || "";
        const email = document.getElementById("quickEmail")?.value || "";
        const linkedin = document.getElementById("quickLinkedin")?.value || "";
        const location = document.getElementById("quickLocation")?.value || "";

        // Update main page content
        const heroTitle = document.querySelector(".hero-title .typing-text");
        const heroSubtitle = document.querySelector(".hero-subtitle");

        if (heroTitle && name) {
            heroTitle.textContent = `Hi, I'm ${name}`;
        }
        if (heroSubtitle && title) {
            heroSubtitle.textContent = title;
        }

        // Update email links
        if (email) {
            const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
            emailLinks.forEach(link => {
                link.href = `mailto:${email}`;
                if (link.textContent.includes('@')) {
                    link.textContent = email;
                }
            });
        }

        // Update LinkedIn links
        if (linkedin) {
            const linkedinLinks = document.querySelectorAll('a[href*="linkedin.com"]');
            linkedinLinks.forEach(link => {
                link.href = linkedin;
            });
        }

        // Update location
        if (location) {
            const locationElements = document.querySelectorAll('.about-text .location p, .contact-item p');
            locationElements.forEach(element => {
                if (element.textContent.includes('Chennai') || element.textContent.includes('Sriperumbudur')) {
                    element.textContent = location;
                }
            });
        }

        showNotification("Profile updated successfully!", "success");
        console.log("Profile saved:", { name, title, email, linkedin, location });
    };

    /* ---------- PROJECT MANAGEMENT ---------- */

    window.addProject = () => {
        const name = document.getElementById("projectName")?.value || "";
        const url = document.getElementById("projectUrl")?.value || "";

        if (name.trim() === "") {
            showNotification("Please enter a project name", "error");
            return;
        }

        const projectsList = document.getElementById("projectsList");
        if (projectsList) {
            const newItem = document.createElement("div");
            newItem.className = "project-item";
            newItem.innerHTML = `
                <div class="project-info">
                    <div class="project-title">${name}</div>
                    <div class="project-desc">${url || "No URL provided"}</div>
                </div>
                <div class="project-actions">
                    <button class="action-icon-btn" onclick="editProject(this)" title="Edit Project">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-icon-btn delete" onclick="removeItem(this)" title="Delete Project">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            projectsList.appendChild(newItem);

            // Clear inputs
            document.getElementById("projectName").value = "";
            document.getElementById("projectUrl").value = "";

            showNotification("Project added successfully!", "success");
            console.log("Project added:", name);
        }
    };

    window.editProject = (button) => {
        const item = button.closest(".project-item");
        const titleElement = item.querySelector(".project-title");
        const descElement = item.querySelector(".project-desc");
        
        const currentName = titleElement.textContent;
        const currentUrl = descElement.textContent === "No URL provided" ? "" : descElement.textContent;

        const newName = prompt("Edit project name:", currentName);
        if (newName && newName.trim() !== "") {
            titleElement.textContent = newName;
        }

        const newUrl = prompt("Edit project URL:", currentUrl);
        if (newUrl !== null) {
            descElement.textContent = newUrl || "No URL provided";
        }

        if (newName && newName.trim() !== "") {
            showNotification("Project updated successfully!", "success");
        }
    };

    /* ---------- SKILL MANAGEMENT ---------- */

    window.addSkill = () => {
        const name = document.getElementById("skillName")?.value || "";
        const level = document.getElementById("skillLevel")?.value || "";
        const category = document.getElementById("skillCategory")?.value || "Programming";

        if (name.trim() === "" || level.trim() === "") {
            showNotification("Please fill in all skill fields", "error");
            return;
        }

        const skillLevel = Math.min(Math.max(parseInt(level), 0), 100);
        const skillsList = document.getElementById("skillsList");
        
        if (skillsList) {
            const newItem = document.createElement("div");
            newItem.className = "skill-item";
            newItem.innerHTML = `
                <div class="skill-info">
                    <div class="skill-name">${name}</div>
                    <div class="skill-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${skillLevel}%"></div>
                        </div>
                        <span class="skill-percent">${skillLevel}%</span>
                    </div>
                    <div class="skill-category">${category}</div>
                </div>
                <div class="skill-actions">
                    <button class="action-icon-btn" onclick="editSkill(this)" title="Edit Skill">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-icon-btn delete" onclick="removeItem(this)" title="Delete Skill">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            skillsList.appendChild(newItem);

            // Clear inputs
            document.getElementById("skillName").value = "";
            document.getElementById("skillLevel").value = "";
            document.getElementById("skillCategory").value = "Programming";

            showNotification("Skill added successfully!", "success");
            console.log("Skill added:", name);
        }
    };

    window.editSkill = (button) => {
        const item = button.closest(".skill-item");
        const nameElement = item.querySelector(".skill-name");
        const progressFill = item.querySelector(".progress-fill");
        const percentElement = item.querySelector(".skill-percent");
        const categoryElement = item.querySelector(".skill-category");
        
        const currentName = nameElement.textContent;
        const currentLevel = parseInt(percentElement.textContent);
        const currentCategory = categoryElement.textContent;

        const newName = prompt("Edit skill name:", currentName);
        if (newName && newName.trim() !== "") {
            nameElement.textContent = newName;
        }

        const newLevel = prompt("Edit skill level (0-100):", currentLevel);
        if (newLevel !== null && !isNaN(newLevel)) {
            const level = Math.min(Math.max(parseInt(newLevel), 0), 100);
            progressFill.style.width = `${level}%`;
            percentElement.textContent = `${level}%`;
        }

        const newCategory = prompt("Edit skill category:", currentCategory);
        if (newCategory && newCategory.trim() !== "") {
            categoryElement.textContent = newCategory;
        }

        if (newName && newName.trim() !== "") {
            showNotification("Skill updated successfully!", "success");
        }
    };

    /* ---------- CERTIFICATE MANAGEMENT ---------- */

    window.addCertificate = () => {
        const name = document.getElementById("certName")?.value || "";
        const issuer = document.getElementById("certIssuer")?.value || "";
        const date = document.getElementById("certDate")?.value || "";

        if (name.trim() === "" || issuer.trim() === "") {
            showNotification("Please fill in certificate name and issuer", "error");
            return;
        }

        const certsList = document.getElementById("certificatesList");
        if (certsList) {
            const newItem = document.createElement("div");
            newItem.className = "certificate-item";
            newItem.innerHTML = `
                <div class="cert-info">
                    <div class="cert-title">${name}</div>
                    <div class="cert-issuer">${issuer}</div>
                    <div class="cert-date">${date || new Date().getFullYear()}</div>
                </div>
                <div class="cert-actions">
                    <button class="action-icon-btn" onclick="editCertificate(this)" title="Edit Certificate">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-icon-btn" onclick="viewCertificate(this)" title="View Certificate">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-icon-btn delete" onclick="removeItem(this)" title="Delete Certificate">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            certsList.appendChild(newItem);

            // Clear inputs
            document.getElementById("certName").value = "";
            document.getElementById("certIssuer").value = "";
            document.getElementById("certDate").value = "";

            showNotification("Certificate added successfully!", "success");
            console.log("Certificate added:", name);
        }
    };

    window.editCertificate = (button) => {
        const item = button.closest(".certificate-item");
        const titleElement = item.querySelector(".cert-title");
        const issuerElement = item.querySelector(".cert-issuer");
        const dateElement = item.querySelector(".cert-date");
        
        const currentName = titleElement.textContent;
        const currentIssuer = issuerElement.textContent;
        const currentDate = dateElement.textContent;

        const newName = prompt("Edit certificate name:", currentName);
        if (newName && newName.trim() !== "") {
            titleElement.textContent = newName;
        }

        const newIssuer = prompt("Edit issuer:", currentIssuer);
        if (newIssuer && newIssuer.trim() !== "") {
            issuerElement.textContent = newIssuer;
        }

        const newDate = prompt("Edit date:", currentDate);
        if (newDate && newDate.trim() !== "") {
            dateElement.textContent = newDate;
        }

        if (newName && newName.trim() !== "") {
            showNotification("Certificate updated successfully!", "success");
        }
    };

    window.viewCertificate = (button) => {
        const item = button.closest(".certificate-item");
        const title = item.querySelector(".cert-title").textContent;
        
        // Use the existing certificate modal system
        if (typeof openCertificate === 'function') {
            // Try to find matching certificate ID
            const certId = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            openCertificate(certId);
        } else {
            showNotification("Certificate viewer not available", "error");
        }
    };

    /* ---------- ITEM REMOVAL ---------- */

    window.removeItem = (button) => {
        const item = button.closest(".project-item, .skill-item, .certificate-item");
        if (item) {
            if (confirm("Are you sure you want to delete this item?")) {
                item.style.animation = "slideOutLeft 0.3s ease";
                setTimeout(() => {
                    item.remove();
                    showNotification("Item removed", "info");
                }, 300);
            }
        }
    };

    /* ---------- NOTIFICATION SYSTEM ---------- */

    function showNotification(message, type = "info") {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll(".admin-notification");
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement("div");
        notification.className = "admin-notification";
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10003;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;

        // Add icon based on type
        const icon = type === "success" ? "✓" : type === "error" ? "✗" : "ℹ";
        notification.innerHTML = `<span style="margin-right: 8px;">${icon}</span>${message}`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = "slideOutRight 0.3s ease";
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);

        console.log("Notification:", message, type);
    }

    /* ---------- GLOBAL EVENTS ---------- */

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            const panel = document.getElementById("adminPanel");
            if (panel && panel.classList.contains("active")) {
                closeAdminPanel();
            }
        }
    });

    // Close admin panel when clicking outside
    document.addEventListener("click", e => {
        const panel = document.getElementById("adminPanel");
        const panelContainer = document.querySelector(".admin-panel-container");
        
        if (panel && panel.classList.contains("active") && 
            e.target === panel && !panelContainer.contains(e.target)) {
            closeAdminPanel();
        }
    });

    /* ---------- INITIALIZATION ---------- */

    document.addEventListener("DOMContentLoaded", () => {
        console.log("=== HORIZONTAL ADMIN PANEL DEBUG ===");
        
        const panel = document.getElementById("adminPanel");
        console.log("Admin panel element:", panel ? "FOUND" : "NOT FOUND");
        
        const adminBtn = document.querySelector(".admin-btn");
        console.log("Admin button:", adminBtn ? "FOUND" : "NOT FOUND");
        
        const tabs = ["overviewAdminTab", "profileAdminTab", "projectsAdminTab", "skillsAdminTab", "certificatesAdminTab", "analyticsAdminTab", "settingsAdminTab"];
        tabs.forEach(tabId => {
            const tab = document.getElementById(tabId);
            console.log(`Tab ${tabId}:`, tab ? "FOUND" : "NOT FOUND");
        });
        
        const navTabs = document.querySelectorAll(".nav-tab");
        console.log("Navigation tabs found:", navTabs.length);
        
        // Set default active tab
        const defaultTab = document.querySelector(".nav-tab.active");
        if (defaultTab) {
            const tabName = defaultTab.onclick.toString().match(/switchAdminTab\('(\w+)'/);
            if (tabName) {
                switchAdminTab(tabName[1], defaultTab);
            }
        }
        
        console.log("=== HORIZONTAL ADMIN PANEL READY ===");
    });

    // Make showNotification globally available
    window.showNotification = showNotification;

    console.log("Horizontal admin panel system loaded successfully!");
})();