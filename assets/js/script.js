"use strict";

/* ===================================================================
   Md Razwanul Hasan — Portfolio JavaScript
   Architecture: Utility → Sidebar → Navigation → Testimonials →
                 Portfolio Filter → Project Modal → Contact Form →
                 CV Download → Animations → Stats Counter → Init
   Redesigned: February 2026
   =================================================================== */


/* ─────────────────────────────────────────────
   §1. UTILITY FUNCTIONS
   ───────────────────────────────────────────── */

/** Toggle 'active' class on an element */
const toggleActive = (el) => el.classList.toggle("active");

/** Safely query a single element */
const $ = (selector) => document.querySelector(selector);

/** Safely query all matching elements */
const $$ = (selector) => document.querySelectorAll(selector);


/* ─────────────────────────────────────────────
   §2. SIDEBAR TOGGLE (Mobile)
   ───────────────────────────────────────────── */

const sidebar = $("[data-sidebar]");
const sidebarBtn = $("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => toggleActive(sidebar));
}


/* ─────────────────────────────────────────────
   §3. PAGE NAVIGATION
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

        // Re-trigger reveal animations on the new page
        setTimeout(() => initScrollReveal(), 100);
        // Animate skill bars if Resume page
        if (targetPage === "resume") {
          setTimeout(() => animateSkillBars(), 300);
        }
        // Animate stats if About page
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
   §4. TESTIMONIALS MODAL
   ───────────────────────────────────────────── */

const testimonialsItems = $$("[data-testimonials-item]");
const modalContainer = $("[data-modal-container]");
const modalCloseBtn = $("[data-modal-close-btn]");
const overlay = $("[data-overlay]");
const modalImg = $("[data-modal-img]");
const modalTitle = $("[data-modal-title]");
const modalText = $("[data-modal-text]");

const toggleTestimonialsModal = () => {
  if (modalContainer) toggleActive(modalContainer);
  if (overlay) toggleActive(overlay);
};

testimonialsItems.forEach((item) => {
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

if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleTestimonialsModal);
if (overlay) overlay.addEventListener("click", toggleTestimonialsModal);


/* ─────────────────────────────────────────────
   §5. PORTFOLIO FILTER
   ───────────────────────────────────────────── */

const select = $("[data-select]");
const selectItems = $$("[data-select-item]");
const selectValue = $("[data-select-value]");
const filterBtns = $$("[data-filter-btn]");
const filterItems = $$("[data-filter-item]");

// Mobile select dropdown
if (select) {
  select.addEventListener("click", function () { toggleActive(this); });
}

// Filter logic
const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};

// Mobile select items
selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) toggleActive(select);
    filterFunc(value);
  });
});

// Desktop filter buttons
let lastActiveFilterBtn = filterBtns[0];

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const value = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(value);

    if (lastActiveFilterBtn) lastActiveFilterBtn.classList.remove("active");
    this.classList.add("active");
    lastActiveFilterBtn = this;
  });
});


/* ─────────────────────────────────────────────
   §6. PROJECT DETAIL MODAL
   ───────────────────────────────────────────── */

const projectModal = $("#projectModal");
const projectModalClose = $("#projectModalClose");
const modalImgEl = $("#modalImg");
const modalTitleEl = $("#modalTitle");
const modalDescEl = $("#modalDesc");
const modalTechEl = $("#modalTech");

// Open modal on project click
const projectLinks = $$(".project-link");

projectLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const imgSrc = this.querySelector("img")?.src || "";
    const title = this.dataset.projectTitle || "";
    const desc = this.dataset.projectDesc || "";
    const tech = this.dataset.projectTech || "";

    if (modalImgEl) modalImgEl.src = imgSrc;
    if (modalTitleEl) modalTitleEl.textContent = title;
    if (modalDescEl) modalDescEl.textContent = desc;

    // Build tech tags
    if (modalTechEl) {
      modalTechEl.innerHTML = "";
      tech.split(",").forEach((t) => {
        const trimmed = t.trim();
        if (trimmed) {
          const tag = document.createElement("span");
          tag.className = "tech-tag";
          tag.textContent = trimmed;
          modalTechEl.appendChild(tag);
        }
      });
    }

    if (projectModal) {
      projectModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close project modal
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


/* ─────────────────────────────────────────────
   §7. CONTACT FORM VALIDATION
   ───────────────────────────────────────────── */

const form = $("[data-form]");
const formInputs = $$("[data-form-input]");
const formBtn = $("[data-form-btn]");

if (form && formBtn) {
  form.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });

  formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Thank you for your interest! This form is being set up.\n\nPlease contact me via WhatsApp or LinkedIn for now. 😊");
  });
}


/* ─────────────────────────────────────────────
   §8. CV DOWNLOAD
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
   §9. SCROLL REVEAL ANIMATION
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
    // Reset if not already revealed
    if (!el.classList.contains("revealed")) {
      observer.observe(el);
    }
  });
}


/* ─────────────────────────────────────────────
   §10. ANIMATED SKILL BARS
   ───────────────────────────────────────────── */

function animateSkillBars() {
  const skillFills = $$(".skill-progress-fill");

  skillFills.forEach((fill) => {
    const width = fill.dataset.width;
    if (width) {
      // Reset first for re-animation
      fill.style.width = "0%";
      setTimeout(() => {
        fill.style.width = width + "%";
      }, 100);
    }
  });
}


/* ─────────────────────────────────────────────
   §11. STATS COUNTER ANIMATION
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
   §12. TYPING EFFECT (Sidebar Title)
   ───────────────────────────────────────────── */

function initTypingEffect() {
  const titleEl = $("#typingTitle");
  if (!titleEl) return;

  const roles = [
    "Mobile App Developer",
    "Android Developer",
    "Flutter Developer",
    "React Native Developer",
    "Web Developer",
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
      // Pause at end of word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  // Start after a brief delay
  setTimeout(type, 1000);
}


/* ─────────────────────────────────────────────
   §13. INITIALIZATION
   ───────────────────────────────────────────── */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initTypingEffect();
  animateStats();
});
