"use strict";

/* ===================================================================
   Md Razwanul Hasan — Portfolio JavaScript
   Architecture: Utility → Data Loading → Rendering → Sidebar →
                 Navigation → Testimonials → Portfolio Filter →
                 Project Modal → EmailJS Contact → CV Download →
                 Theme Toggle → Animations → Stats Counter → Init
   
   ✅ JSON-driven content (edit JSON files, not HTML)
   ✅ EmailJS integration (contact form sends real emails)
   ✅ Dark/Light theme toggle with localStorage
   ✅ Zero backend required — works on GitHub Pages
   
   Updated: February 2026
   =================================================================== */


/* ─────────────────────────────────────────────
   §1. UTILITY FUNCTIONS
   ───────────────────────────────────────────── */

const toggleActive = (el) => el.classList.toggle("active");
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* ─────────────────────────────────────────────
   §2. JSON DATA LOADER
   ───────────────────────────────────────────── */

/**
 * Fetch JSON data from the /data/ folder.
 * Falls back gracefully if file not found.
 */
async function loadJSON(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn(`⚠️ Could not load ${path}:`, err.message);
    return null;
  }
}


/* ─────────────────────────────────────────────
   §3. RENDER RESUME (from data/resume.json)
   ───────────────────────────────────────────── */

function renderResume(data) {
  if (!data) return;

  // Experience
  const expList = $("#experienceList");
  if (expList && data.experience) {
    expList.innerHTML = data.experience.map((job) => `
      <li class="timeline-item reveal">
        <h4 class="h4 timeline-item-title">${job.title}</h4>
        <span class="timeline-company">${job.company}</span>
        <span class="timeline-date">${job.date}</span>
        ${job.location ? `<span class="timeline-location">
          <ion-icon name="location-outline"></ion-icon> ${job.location}
        </span>` : ""}
        <p class="timeline-text">${job.description}</p>
      </li>
    `).join("");
  }

  // Education
  const eduList = $("#educationList");
  if (eduList && data.education) {
    eduList.innerHTML = data.education.map((edu) => `
      <li class="timeline-item reveal">
        <h4 class="h4 timeline-item-title">${edu.title}</h4>
        <span class="timeline-date">${edu.date}</span>
        <p class="timeline-text">${edu.description}</p>
      </li>
    `).join("");
  }

  // Technical Skills
  const techList = $("#technicalSkillsList");
  if (techList && data.technicalSkills) {
    techList.innerHTML = data.technicalSkills.map((skill) => `
      <li class="skills-item">
        <div class="title-wrapper">
          <h5 class="h5">${skill.name}</h5>
          <data value="${skill.level}">${skill.level}%</data>
        </div>
        <div class="skill-progress-bg">
          <div class="skill-progress-fill" data-width="${skill.level}"></div>
        </div>
      </li>
    `).join("");
  }

  // Tools & Platforms
  const toolsList = $("#toolsSkillsList");
  if (toolsList && data.toolsSkills) {
    toolsList.innerHTML = data.toolsSkills.map((skill) => `
      <li class="skills-item">
        <div class="title-wrapper">
          <h5 class="h5">${skill.name}</h5>
          <data value="${skill.level}">${skill.level}%</data>
        </div>
        <div class="skill-progress-bg">
          <div class="skill-progress-fill" data-width="${skill.level}"></div>
        </div>
      </li>
    `).join("");
  }
}


/* ─────────────────────────────────────────────
   §4. RENDER PROJECTS (from data/projects.json)
   ───────────────────────────────────────────── */

let projectsData = []; // Store globally for filter + modal

function renderProjects(data) {
  if (!data || !Array.isArray(data)) return;
  projectsData = data;

  const projectList = $("#projectList");
  if (!projectList) return;

  projectList.innerHTML = data.map((project) => `
    <li class="project-item active" data-filter-item data-category="${project.category}">
      <a href="#" class="project-link" data-project-id="${project.id}">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </figure>
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.categoryLabel}</p>
        </div>
      </a>
    </li>
  `).join("");

  // Re-bind filter & modal after render
  bindPortfolioFilter();
  bindProjectModal();
}


/* ─────────────────────────────────────────────
   §5. RENDER BLOG POSTS (from data/blog.json)
   ───────────────────────────────────────────── */

function renderBlogPosts(data) {
  if (!data || !Array.isArray(data)) return;

  const blogList = $("#blogPostsList");
  if (!blogList) return;

  blogList.innerHTML = data.map((post) => `
    <li class="blog-post-item reveal">
      <a href="${post.url || '#'}">
        <figure class="blog-banner-box">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </figure>
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${post.dateFormatted}</time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
          <p class="blog-text">${post.excerpt}</p>
        </div>
      </a>
    </li>
  `).join("");
}


/* ─────────────────────────────────────────────
   §5b. RENDER ABOUT PAGE (from data/about.json)
   ───────────────────────────────────────────── */

function renderAbout(data) {
  if (!data) return;

  // About Text
  const aboutText = $("#aboutText");
  if (aboutText && data.aboutText) {
    aboutText.innerHTML = data.aboutText.map((p) => `<p>${p}</p>`).join("");
  }

  // Stats
  const statsSection = $("#statsSection");
  if (statsSection && data.stats) {
    statsSection.innerHTML = data.stats.map((stat) => `
      <div class="stat-card reveal">
        <h3 class="stat-number" data-count="${stat.count}">0</h3>
        <p class="stat-label">${stat.label}</p>
      </div>
    `).join("");
  }

  // Services
  const serviceList = $("#serviceList");
  if (serviceList && data.services) {
    serviceList.innerHTML = data.services.map((svc) => `
      <li class="service-item reveal">
        <div class="service-icon-box">
          <img src="${svc.icon}" alt="${svc.title}" width="40">
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${svc.title}</h4>
          <p class="service-item-text">${svc.description}</p>
        </div>
      </li>
    `).join("");
  }

  // Testimonials
  const testimonialsList = $("#testimonialsList");
  if (testimonialsList && data.testimonials) {
    testimonialsList.innerHTML = data.testimonials.map((t) => `
      <li class="testimonials-item">
        <div class="content-card" data-testimonials-item>
          <figure class="testimonials-avatar-box">
            <img src="${t.avatar}" alt="${t.name}" width="60" data-testimonials-avatar>
          </figure>
          <h4 class="h4 testimonials-item-title" data-testimonials-title>${t.name}</h4>
          <p class="testimonials-item-role">${t.role}</p>
          <div class="testimonials-text" data-testimonials-text>
            <p>${t.text}</p>
          </div>
        </div>
      </li>
    `).join("");

    // Re-bind testimonials modal after dynamic render
    bindTestimonialsModal();
  }
}


/* ─────────────────────────────────────────────
   §5c. RENDER BUSINESS SERVICES (from data/services.json)
   ───────────────────────────────────────────── */

function renderBusinessServices(data) {
  if (!data || !Array.isArray(data)) return;

  const list = $("#businessServiceList");
  if (!list) return;

  list.innerHTML = data.map((svc) => `
    <li class="biz-service-card reveal">
      <div class="biz-card-header">
        <div class="biz-card-icon">
          <ion-icon name="${svc.icon}"></ion-icon>
        </div>
        <div class="biz-card-title-group">
          <h4 class="biz-card-title">${svc.title}</h4>
          <p class="biz-card-tagline">${svc.tagline}</p>
        </div>
      </div>
      <p class="biz-card-outcome">${svc.outcome}</p>
      <ul class="biz-card-deliverables">
        ${svc.deliverables.map((d) => `<li>${d}</li>`).join("")}
      </ul>
      <div class="biz-card-footer">
        <span class="biz-timeline">
          <ion-icon name="time-outline"></ion-icon> ${svc.timeline}
        </span>
        <div class="biz-tech-tags">
          ${svc.techTags.map((t) => `<span class="biz-tech-tag">${t}</span>`).join("")}
        </div>
      </div>
    </li>
  `).join("");
}


/* ─────────────────────────────────────────────
   §6. SIDEBAR TOGGLE (Mobile)
   ───────────────────────────────────────────── */

const sidebar = $("[data-sidebar]");
const sidebarBtn = $("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => toggleActive(sidebar));
}


/* ─────────────────────────────────────────────
   §7. PAGE NAVIGATION
   ───────────────────────────────────────────── */

const navigationLinks = $$("[data-nav-link]");
const pages = $$("[data-page]");

navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    pages.forEach((page, i) => {
      if (targetPage === page.dataset.page) {
        page.classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);

        setTimeout(() => initScrollReveal(), 100);
        if (targetPage === "resume") {
          setTimeout(() => animateSkillBars(), 300);
        }
        if (targetPage === "about") {
          setTimeout(() => animateStats(), 300);
        }
      } else {
        page.classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    });
  });
});


/* ─────────────────────────────────────────────
   §8. TESTIMONIALS MODAL (re-bindable)
   ───────────────────────────────────────────── */

const modalContainer = $("[data-modal-container]");
const overlay = $("[data-overlay]");

const toggleTestimonialsModal = () => {
  if (modalContainer) toggleActive(modalContainer);
  if (overlay) toggleActive(overlay);
};

function bindTestimonialsModal() {
  const items = $$("[data-testimonials-item]");
  const modalCloseBtn = $("[data-modal-close-btn]");
  const modalImg = $("[data-modal-img]");
  const modalTitle = $("[data-modal-title]");
  const modalText = $("[data-modal-text]");

  items.forEach((item) => {
    item.addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (modalImg && avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }
      if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
      if (modalText && text) modalText.innerHTML = text.innerHTML;

      toggleTestimonialsModal();
    });
  });

  if (modalCloseBtn) {
    // Clone to remove duplicate listeners
    const newBtn = modalCloseBtn.cloneNode(true);
    modalCloseBtn.parentNode.replaceChild(newBtn, modalCloseBtn);
    newBtn.addEventListener("click", toggleTestimonialsModal);
  }

  if (overlay) {
    overlay.onclick = toggleTestimonialsModal;
  }
}


/* ─────────────────────────────────────────────
   §9. PORTFOLIO FILTER (re-bindable)
   ───────────────────────────────────────────── */

function bindPortfolioFilter() {
  const select = $("[data-select]");
  const selectItems = $$("[data-select-item]");
  const selectValue = $("[data-select-value]");
  const filterBtns = $$("[data-filter-btn]");
  const filterItems = $$("[data-filter-item]");

  if (select) {
    // Remove existing listeners by cloning
    const newSelect = select.cloneNode(true);
    select.parentNode.replaceChild(newSelect, select);
    newSelect.addEventListener("click", function () { toggleActive(this); });
  }

  const filterFunc = (selectedValue) => {
    filterItems.forEach((item) => {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const value = this.innerText.toLowerCase();
      const sv = $("[data-select-value]");
      const sel = $("[data-select]");
      if (sv) sv.innerText = this.innerText;
      if (sel) toggleActive(sel);
      filterFunc(value);
    });
  });

  let lastActiveFilterBtn = filterBtns[0];

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const value = this.innerText.toLowerCase();
      const sv = $("[data-select-value]");
      if (sv) sv.innerText = this.innerText;
      filterFunc(value);

      if (lastActiveFilterBtn) lastActiveFilterBtn.classList.remove("active");
      this.classList.add("active");
      lastActiveFilterBtn = this;
    });
  });
}


/* ─────────────────────────────────────────────
   §10. PROJECT DETAIL MODAL (JSON-aware)
   ───────────────────────────────────────────── */

function bindProjectModal() {
  const projectModal = $("#projectModal");
  const projectModalClose = $("#projectModalClose");
  const modalImgEl = $("#modalImg");
  const modalTitleEl = $("#modalTitle");
  const modalDescEl = $("#modalDesc");
  const modalTechEl = $("#modalTech");
  const modalLinksEl = $("#modalLinks");
  const modalHighlightsEl = $("#modalHighlights");
  const modalHighlightsListEl = $("#modalHighlightsList");
  const modalCompanionEl = $("#modalCompanion");
  const modalCompanionLabelEl = $("#modalCompanionLabel");
  const modalCompanionNameEl = $("#modalCompanionName");
  const modalCompanionDescEl = $("#modalCompanionDesc");
  const modalCompanionLinksEl = $("#modalCompanionLinks");

  const projectLinks = $$(".project-link");

  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const projectId = this.dataset.projectId;
      const project = projectsData.find((p) => p.id === projectId);

      if (project) {
        if (modalImgEl) modalImgEl.src = project.image;
        if (modalTitleEl) modalTitleEl.textContent = project.fullTitle || project.title;
        if (modalDescEl) modalDescEl.textContent = project.description;

        // Key Features / Highlights
        if (modalHighlightsEl && modalHighlightsListEl) {
          if (project.highlights && project.highlights.length) {
            modalHighlightsListEl.innerHTML = project.highlights
              .map((h) => `<li>${h}</li>`).join("");
            modalHighlightsEl.style.display = "block";
          } else {
            modalHighlightsEl.style.display = "none";
          }
        }

        // Companion App
        if (modalCompanionEl) {
          if (project.companionApp) {
            const c = project.companionApp;
            if (modalCompanionLabelEl) modalCompanionLabelEl.textContent = c.label || "Companion App";
            if (modalCompanionNameEl) modalCompanionNameEl.textContent = c.name;
            if (modalCompanionDescEl) modalCompanionDescEl.textContent = c.description;
            if (modalCompanionLinksEl) {
              modalCompanionLinksEl.innerHTML = "";
              if (c.playstoreUrl) {
                modalCompanionLinksEl.innerHTML += `<a href="${c.playstoreUrl}" class="companion-link playstore" target="_blank" rel="noopener">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M3.18 23.76c.31.17.67.19 1 .08l11.62-6.71L13.1 14.4l-9.92 9.36zm-1.12-21C2.03 3.1 2 3.44 2 3.8v16.4c0 .36.03.7.06 1.04L13.5 12 2.06 2.76zM20.1 9.27l-2.42-1.4-3.03 2.85 3.03 2.85 2.44-1.41c.7-.4.7-1.49-.02-1.89zM4.18.16L15.8 6.87 13.1 9.6 1.48.24C1.8.1 2.15.1 2.47.24l1.71-.08z"/></svg>
                  Play Store</a>`;
              }
              if (c.appstoreUrl) {
                modalCompanionLinksEl.innerHTML += `<a href="${c.appstoreUrl}" class="companion-link appstore" target="_blank" rel="noopener">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store</a>`;
              }
            }
            modalCompanionEl.style.display = "block";
          } else {
            modalCompanionEl.style.display = "none";
          }
        }

        // Build tech tags
        if (modalTechEl) {
          modalTechEl.innerHTML = "";
          project.tech.forEach((t) => {
            const tag = document.createElement("span");
            tag.className = "tech-tag";
            tag.textContent = t;
            modalTechEl.appendChild(tag);
          });
        }

        // Build links (GitHub + Live + Play Store + App Store)
        if (modalLinksEl) {
          modalLinksEl.innerHTML = "";
          if (project.playstoreUrl) {
            modalLinksEl.innerHTML += `
              <a href="${project.playstoreUrl}" class="project-modal-link playstore" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3.18 23.76c.31.17.67.19 1 .08l11.62-6.71L13.1 14.4l-9.92 9.36zm-1.12-21C2.03 3.1 2 3.44 2 3.8v16.4c0 .36.03.7.06 1.04L13.5 12 2.06 2.76zM20.1 9.27l-2.42-1.4-3.03 2.85 3.03 2.85 2.44-1.41c.7-.4.7-1.49-.02-1.89zM4.18.16L15.8 6.87 13.1 9.6 1.48.24C1.8.1 2.15.1 2.47.24l1.71-.08z"/></svg>
                Play Store
              </a>`;
          }
          if (project.appstoreUrl) {
            modalLinksEl.innerHTML += `
              <a href="${project.appstoreUrl}" class="project-modal-link appstore" target="_blank" rel="noopener">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>`;
          }
          if (project.githubUrl) {
            modalLinksEl.innerHTML += `
              <a href="${project.githubUrl}" class="project-modal-link github" target="_blank" rel="noopener">
                <ion-icon name="logo-github"></ion-icon> GitHub
              </a>`;
          }
          if (project.liveUrl) {
            modalLinksEl.innerHTML += `
              <a href="${project.liveUrl}" class="project-modal-link live" target="_blank" rel="noopener">
                <ion-icon name="open-outline"></ion-icon> Live Demo
              </a>`;
          }
        }
      }

      if (projectModal) {
        projectModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  const closeProjectModal = () => {
    if (projectModal) {
      projectModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  if (projectModalClose) {
    projectModalClose.addEventListener("click", closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectModal();
      if (modalContainer?.classList.contains("active")) {
        toggleTestimonialsModal();
      }
    }
  });
}


/* ─────────────────────────────────────────────
   §11. EMAILJS CONTACT FORM
   ───────────────────────────────────────────── 
   
   HOW TO SET UP EmailJS (FREE — 200 emails/month):
   
   1. Go to https://www.emailjs.com/ and create a free account
   2. Add your email service (Gmail, Outlook, etc.)
      → You'll get a SERVICE_ID (e.g. "service_abc123")
   3. Create an email template with these variables:
      {{from_name}}, {{from_email}}, {{message}}
      → You'll get a TEMPLATE_ID (e.g. "template_xyz789")
   4. Go to Account → General → Copy your PUBLIC_KEY
   5. Replace the 3 values below:
   ───────────────────────────────────────────── */

const EMAILJS_CONFIG = {
  publicKey: "m5UzEmRVh_j6ugPDX",       // ← Replace with your EmailJS Public Key
  serviceId: "service_nbw3p4c",       // ← Replace with your EmailJS Service ID
  templateId: "template_blakxj7",     // ← Replace with your EmailJS Template ID
};

function initContactForm() {
  const form = $("#contactForm");
  const formInputs = $$("[data-form-input]");
  const formBtn = $("[data-form-btn]");
  const formStatus = $("#formStatus");

  if (!form || !formBtn) return;

  // Enable/disable button based on validation
  form.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });

  // Handle submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name    = form.fullname.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // ── 1. Try EmailJS silently in the background ──────────────────
    if (typeof emailjs !== "undefined" && EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY") {
      emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        { from_name: name, from_email: email, message, reply_to: email }
      ).catch(() => {}); // silent — WhatsApp is the primary channel
    }

    // ── 2. Open WhatsApp with pre-filled message ───────────────────
    const waText = encodeURIComponent(
      `Hi Razwanul! 👋\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const waUrl = `https://wa.me/8801749237060?text=${waText}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank", "noopener");

    // Show success feedback & reset form
    showFormStatus("success", "✅ WhatsApp opened with your message — just hit Send!");
    form.reset();
    formBtn.setAttribute("disabled", "");
  });
}

function showFormStatus(type, message) {
  const formStatus = $("#formStatus");
  if (!formStatus) return;

  formStatus.className = "form-status show " + type;
  formStatus.textContent = message;

  // Auto-hide after 8 seconds
  setTimeout(() => {
    formStatus.className = "form-status";
  }, 8000);
}


/* ─────────────────────────────────────────────
   §12. CV DOWNLOAD
   ───────────────────────────────────────────── */

const downloadBtn = $("#downloadPdfBtn");

if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    const pdfUrl = "./Razwanul_CV.pdf";
    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.download = "Razwanul_Hasan_CV.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  });
}


/* ─────────────────────────────────────────────
   §12b. SERVICES PAGE & ABOUT CTA BINDINGS
   ───────────────────────────────────────────── */

function bindServicesPage() {
  const startBtn = $("#bizStartProject");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const contactNavLink = Array.from($$("[data-nav-link]")).find(
        (el) => el.textContent.trim().toLowerCase() === "contact"
      );
      if (contactNavLink) contactNavLink.click();
    });
  }
}

function bindAboutCTA() {
  const viewServicesBtn = $("#viewServicesBtn");
  if (viewServicesBtn) {
    viewServicesBtn.addEventListener("click", () => {
      const servicesNavLink = Array.from($$("[data-nav-link]")).find(
        (el) => el.textContent.trim().toLowerCase() === "services"
      );
      if (servicesNavLink) servicesNavLink.click();
    });
  }
}


/* ─────────────────────────────────────────────
   §13. DARK / LIGHT THEME TOGGLE
   ───────────────────────────────────────────── */

function initThemeToggle() {
  const toggleBtn = $("#themeToggleBtn");
  const themeLabel = $("#themeLabel");
  const html = document.documentElement;

  if (!toggleBtn) return;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  html.setAttribute("data-theme", savedTheme);
  updateThemeLabel(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    updateThemeLabel(newTheme);
  });

  function updateThemeLabel(theme) {
    if (themeLabel) {
      themeLabel.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }
  }
}


/* ─────────────────────────────────────────────
   §14. SCROLL REVEAL ANIMATION
   ───────────────────────────────────────────── */

function initScrollReveal() {
  const revealElements = $$(".reveal");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  revealElements.forEach((el) => {
    if (!el.classList.contains("revealed")) {
      observer.observe(el);
    }
  });
}


/* ─────────────────────────────────────────────
   §15. ANIMATED SKILL BARS
   ───────────────────────────────────────────── */

function animateSkillBars() {
  const skillFills = $$(".skill-progress-fill");

  skillFills.forEach((fill) => {
    const width = fill.dataset.width;
    if (width) {
      fill.style.width = "0%";
      setTimeout(() => {
        fill.style.width = width + "%";
      }, 100);
    }
  });
}


/* ─────────────────────────────────────────────
   §16. STATS COUNTER ANIMATION
   ───────────────────────────────────────────── */

function animateStats() {
  const statNumbers = $$(".stat-number");

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.dataset.count, 10);
    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.max(1, Math.floor(target / 30));
    const duration = 1500;
    const stepTime = duration / (target / increment);

    stat.textContent = "0";

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = current;
    }, stepTime);
  });
}


/* ─────────────────────────────────────────────
   §17. TYPING EFFECT (Sidebar Title)
   ───────────────────────────────────────────── */

function initTypingEffect() {
  const titleEl = $("#typingTitle");
  if (!titleEl) return;

  const roles = [
    "Mobile App Developer",
    "Android Developer",
    "Flutter Developer",
    "React Native Developer",
    "Full-Stack Developer",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      titleEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      titleEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}


/* ─────────────────────────────────────────────
   §18. INITIALIZATION
   ───────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Theme (must be first for no flash)
  initThemeToggle();

  // 2. Initialize EmailJS once
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }

  // 2. Load JSON data and render dynamic content
  const [resumeData, projectsJsonData, blogData, aboutData, servicesData] = await Promise.all([
    loadJSON("./data/resume.json"),
    loadJSON("./data/projects.json"),
    loadJSON("./data/blog.json"),
    loadJSON("./data/about.json"),
    loadJSON("./data/services.json"),
  ]);

  renderAbout(aboutData);
  renderResume(resumeData);
  renderProjects(projectsJsonData);
  renderBlogPosts(blogData);
  renderBusinessServices(servicesData);

  // 3. Initialize interactive features
  initContactForm();
  initScrollReveal();
  initTypingEffect();
  animateStats();
  bindServicesPage();
  bindAboutCTA();
});
