/* ===============================
   PROFESSIONAL ADMIN PANEL
   FIXED + OPTIMIZED
   =============================== */

(() => {
    "use strict";

    let currentAdminTab = "profile";

    /* ---------- PANEL OPEN / CLOSE ---------- */

    window.openAdminPanel = () => {
        const panel = document.getElementById("adminPanel");
        if (!panel) return console.error("Admin panel not found");

        panel.style.display = "block";
        console.log("Admin panel opened - no overlay mode");
    };

    window.closeAdminPanel = () => {
        const panel = document.getElementById("adminPanel");
        if (!panel) return;

        panel.style.display = "none";
        console.log("Admin panel closed");
    };

    /* ---------- TAB SWITCHING (FIXED) ---------- */

    window.switchAdminTab = (tabName, btn) => {
        document.querySelectorAll(".admin-tab").forEach(tab =>
            tab.classList.remove("active")
        );

        document.querySelectorAll(".tab-btn").forEach(b =>
            b.classList.remove("active")
        );

        const targetTab = document.getElementById(`${tabName}AdminTab`);
        if (!targetTab) return console.error("Tab not found:", tabName);

        targetTab.classList.add("active");
        if (btn) btn.classList.add("active");

        currentAdminTab = tabName;
    };

    /* ---------- PROFILE SAVE ---------- */

    window.saveProfile = () => {
        const name = document.getElementById("quickName")?.value.trim();
        const title = document.getElementById("quickTitle")?.value.trim();
        const email = document.getElementById("quickEmail")?.value.trim();

        const heroTitle = document.querySelector(".hero-title .typing-text");
        const heroSubtitle = document.querySelector(".hero-subtitle");

        if (heroTitle && name) heroTitle.textContent = `Hi, I'm ${name}`;
        if (heroSubtitle && title) heroSubtitle.textContent = title;

        if (email) {
            document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
                link.href = `mailto:${email}`;
            });
        }

        showNotification("Profile updated successfully", "success");
    };

    /* ---------- PROJECTS ---------- */

    window.addProject = () => {
        const name = document.getElementById("projectName")?.value.trim();
        const url = document.getElementById("projectUrl")?.value.trim();

        if (!name) return showNotification("Project name required", "error");

        addItem("projectsList", name, url);
        clearInputs("projectName", "projectUrl");

        showNotification("Project added", "success");
    };

    window.editProject = btn => editItem(btn, "Edit project name");

    /* ---------- CERTIFICATES ---------- */

    window.addCertificate = () => {
        const name = document.getElementById("certName")?.value.trim();
        const issuer = document.getElementById("certIssuer")?.value.trim();

        if (!name || !issuer)
            return showNotification("All fields required", "error");

        addItem("certificatesList", name, issuer);
        clearInputs("certName", "certIssuer");

        showNotification("Certificate added", "success");
    };

    window.editCertificate = btn =>
        editItem(btn, "Edit certificate name", true);

    /* ---------- ITEM HELPERS ---------- */

    function addItem(containerId, title, subtitle) {
        const list = document.getElementById(containerId);
        if (!list) return;

        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = `
            <div class="item-info">
                <span class="item-title">${title}</span>
                <small>${subtitle || ""}</small>
            </div>
            <div class="item-actions">
                <button onclick="editProject(this)">✎</button>
                <button onclick="removeItem(this)">🗑</button>
            </div>
        `;
        list.appendChild(item);
    }

    function editItem(btn, msg, dual = false) {
        const item = btn.closest(".item");
        const title = item.querySelector(".item-title");
        const small = item.querySelector("small");

        const newTitle = prompt(msg, title.textContent);
        if (newTitle) title.textContent = newTitle;

        if (dual) {
            const newSmall = prompt("Edit issuer:", small.textContent);
            if (newSmall) small.textContent = newSmall;
        }

        showNotification("Updated successfully", "success");
    }

    window.removeItem = btn => {
        const item = btn.closest(".item");
        if (!item) return;

        item.style.opacity = "0";
        setTimeout(() => item.remove(), 300);
        showNotification("Item removed", "info");
    };

    function clearInputs(...ids) {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = "";
        });
    }

    /* ---------- NOTIFICATIONS ---------- */

    function showNotification(msg, type = "info") {
        document.querySelectorAll(".admin-notification").forEach(n => n.remove());

        const colors = {
            success: "#4CAF50",
            error: "#f44336",
            info: "#2196F3"
        };

        const n = document.createElement("div");
        n.className = "admin-notification";
        n.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: #fff;
            padding: 14px 18px;
            border-radius: 8px;
            z-index: 9999;
            font-weight: 500;
        `;
        n.textContent = msg;
        document.body.appendChild(n);

        setTimeout(() => n.remove(), 2500);
    }

    /* ---------- GLOBAL EVENTS ---------- */

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeAdminPanel();
    });

    console.log("✅ Admin panel loaded without errors");
})();
