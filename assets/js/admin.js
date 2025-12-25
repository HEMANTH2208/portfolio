// Modern Sidebar Admin Panel
(() => {
    "use strict";

    /* ---------- SIDEBAR ADMIN PANEL ---------- */

    window.openAdminPanel = () => {
        const panel = document.getElementById("adminPanel");
        if (!panel) return console.error("Admin panel not found");

        panel.style.display = "block";
        setTimeout(() => {
            panel.classList.add("active");
        }, 10);
        console.log("Sidebar admin panel opened");
    };

    window.closeAdminPanel = () => {
        const panel = document.getElementById("adminPanel");
        if (!panel) return;

        panel.classList.remove("active");
        setTimeout(() => {
            panel.style.display = "none";
        }, 400);
        console.log("Sidebar admin panel closed");
    };

    /* ---------- SIDEBAR TAB SWITCHING ---------- */

    window.switchAdminTab = (tabName, clickedItem) => {
        // Remove active from all nav items
        document.querySelectorAll(".nav-item").forEach(item =>
            item.classList.remove("active")
        );

        // Remove active from all content tabs
        document.querySelectorAll(".admin-content-tab").forEach(tab =>
            tab.classList.remove("active")
        );

        // Add active to clicked nav item
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
            });
        }

        showNotification("Profile updated successfully!", "success");
        console.log("Profile saved:", { name, title, email });
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
            newItem.className = "list-item";
            newItem.innerHTML = `
                <div class="item-content">
                    <div class="item-title">${name}</div>
                    <div class="item-subtitle">${url || "No URL provided"}</div>
                </div>
                <div class="item-actions">
                    <button class="icon-btn" onclick="editProject(this)" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="icon-btn delete" onclick="removeItem(this)" title="Delete">
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
        const item = button.closest(".list-item");
        const titleElement = item.querySelector(".item-title");
        const subtitleElement = item.querySelector(".item-subtitle");
        
        const currentName = titleElement.textContent;
        const currentUrl = subtitleElement.textContent === "No URL provided" ? "" : subtitleElement.textContent;

        const newName = prompt("Edit project name:", currentName);
        const newUrl = prompt("Edit project URL:", currentUrl);

        if (newName && newName.trim() !== "") {
            titleElement.textContent = newName;
            subtitleElement.textContent = newUrl || "No URL provided";
            showNotification("Project updated successfully!", "success");
        }
    };

    /* ---------- CERTIFICATE MANAGEMENT ---------- */

    window.addCertificate = () => {
        const name = document.getElementById("certName")?.value || "";
        const issuer = document.getElementById("certIssuer")?.value || "";

        if (name.trim() === "" || issuer.trim() === "") {
            showNotification("Please fill in all fields", "error");
            return;
        }

        const certsList = document.getElementById("certificatesList");
        if (certsList) {
            const newItem = document.createElement("div");
            newItem.className = "list-item";
            newItem.innerHTML = `
                <div class="item-content">
                    <div class="item-title">${name}</div>
                    <div class="item-subtitle">${issuer}</div>
                </div>
                <div class="item-actions">
                    <button class="icon-btn" onclick="editCertificate(this)" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="icon-btn delete" onclick="removeItem(this)" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

            certsList.appendChild(newItem);

            // Clear inputs
            document.getElementById("certName").value = "";
            document.getElementById("certIssuer").value = "";

            showNotification("Certificate added successfully!", "success");
            console.log("Certificate added:", name);
        }
    };

    window.editCertificate = (button) => {
        const item = button.closest(".list-item");
        const titleElement = item.querySelector(".item-title");
        const subtitleElement = item.querySelector(".item-subtitle");
        
        const currentName = titleElement.textContent;
        const currentIssuer = subtitleElement.textContent;

        const newName = prompt("Edit certificate name:", currentName);
        const newIssuer = prompt("Edit issuer:", currentIssuer);

        if (newName && newName.trim() !== "") {
            titleElement.textContent = newName;
        }
        if (newIssuer && newIssuer.trim() !== "") {
            subtitleElement.textContent = newIssuer;
        }

        showNotification("Certificate updated successfully!", "success");
    };

    /* ---------- ITEM REMOVAL ---------- */

    window.removeItem = (button) => {
        const item = button.closest(".list-item");
        if (item) {
            item.style.animation = "slideOutLeft 0.3s ease";
            setTimeout(() => {
                item.remove();
                showNotification("Item removed", "info");
            }, 300);
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

    /* ---------- ANIMATIONS ---------- */

    const adminStyle = document.createElement("style");
    adminStyle.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes slideOutLeft {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
        }
    `;
    document.head.appendChild(adminStyle);

    /* ---------- GLOBAL EVENTS ---------- */

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            const panel = document.getElementById("adminPanel");
            if (panel && panel.classList.contains("active")) {
                closeAdminPanel();
            }
        }
    });

    /* ---------- INITIALIZATION ---------- */

    document.addEventListener("DOMContentLoaded", () => {
        console.log("=== SIDEBAR ADMIN PANEL DEBUG ===");
        
        const panel = document.getElementById("adminPanel");
        console.log("Admin panel element:", panel ? "FOUND" : "NOT FOUND");
        
        const adminBtn = document.querySelector(".admin-btn");
        console.log("Admin button:", adminBtn ? "FOUND" : "NOT FOUND");
        
        const tabs = ["profileAdminTab", "projectsAdminTab", "certificatesAdminTab"];
        tabs.forEach(tabId => {
            const tab = document.getElementById(tabId);
            console.log(`Tab ${tabId}:`, tab ? "FOUND" : "NOT FOUND");
        });
        
        const navItems = document.querySelectorAll(".nav-item");
        console.log("Navigation items found:", navItems.length);
        
        console.log("=== SIDEBAR ADMIN PANEL READY ===");
    });

    console.log("Modern sidebar admin panel loaded successfully!");
})();