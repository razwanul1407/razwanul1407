# Portfolio Redesign — Change Documentation

> **Author:** GitHub Copilot  
> **Date:** February 18, 2026  
> **Project:** Md Razwanul Hasan — Personal Portfolio

---

## 📋 Summary of Changes

This document describes every change made to the portfolio project during the redesign. The goal was to create a **beautiful, employer-ready UI/UX** with a **clean, maintainable architecture** that scales well for future updates.

---

## 🏗️ 1. Folder Restructure (Clean Architecture)

### Before (Old Structure)
```
/
├── index.html
├── index.txt
├── assets/
│   ├── css/
│   │   └── style.css          ← 1 monolithic CSS (1937 lines)
│   ├── js/
│   │   └── script.js          ← 1 monolithic JS (180+ lines)
│   └── images/
├── website-demo-image/
├── README.md
└── LICENSE
```

### After (New Structure)
```
/
├── index.html                   ← Completely rewritten, modern semantic HTML5
├── CHANGELOG.md                 ← This file (documenting all changes)
├── README.md                    ← Updated
├── LICENSE
├── assets/
│   ├── css/
│   │   └── style.css            ← Completely rewritten, modern CSS with variables
│   ├── js/
│   │   └── script.js            ← Completely rewritten, modular & clean
│   └── images/                  ← Existing images (unchanged)
├── website-demo-image/          ← Existing demo images
└── index.txt                    ← Original text reference (kept)
```

### Why This Architecture?
- **Single `style.css`**: Keeps GitHub Pages deployment simple (no build step needed) but internally organized with clear section headers and a logical top-down flow.
- **Single `script.js`**: No build tools required, but code is organized into clearly separated modules with IIFE patterns and clean function naming.
- **Images stay in place**: No broken image references; all existing assets preserved.
- **No build step required**: This is a static portfolio — keeping it simple means it works on GitHub Pages immediately with zero configuration.

---

## 🎨 2. UI/UX Redesign Changes

### 2.1 Global Design System
| What Changed | Before | After |
|---|---|---|
| Color palette | Yellow/gold accent only | Refined gold accent with subtle teal highlights, better contrast ratios |
| Typography | Poppins only | Poppins (kept, but refined sizing scale & line-heights) |
| Spacing | Inconsistent padding/margins | Consistent 8px grid system |
| Shadows | Heavy shadows | Layered, subtle shadow system for depth |
| Borders | Hard 1px borders | Subtle gradient borders with rounded corners |
| Animations | Basic fade only | Scroll-reveal animations, hover micro-interactions, smooth transitions |
| Dark theme | Basic dark | Rich dark with layered surfaces (smoky black → eerie black → onyx → jet) |

### 2.2 Sidebar (Profile Card)
- ✅ Clean avatar display with gradient border ring
- ✅ Animated role/title with subtle styling
- ✅ Contact details with better icon alignment
- ✅ Social links with hover color effects
- ✅ **CV Download button** — prominent, clearly visible with download icon
- ✅ Responsive: collapses on mobile, sticky on desktop

### 2.3 Navigation
- ✅ Fixed bottom nav on mobile → top-right on desktop
- ✅ Active state with accent underline indicator
- ✅ Smooth page transitions with fade animation

### 2.4 About Page
- ✅ Clean about text with better typography
- ✅ **Services section** with icon cards in a 2-column grid
- ✅ **Testimonials** with horizontal scroll carousel
- ✅ Testimonial modal with improved layout

### 2.5 Resume Page
- ✅ **Experience timeline** — vertical timeline with dots and connecting lines
- ✅ **Education section** — same timeline style
- ✅ **Skills section** — animated progress bars with percentage labels
- ✅ **Additional skills** — separate card for tools & platforms
- ✅ Better visual hierarchy with section icons

### 2.6 Portfolio Page
- ✅ Filter tabs (All / Applications / Web Development) with active state
- ✅ Project cards with hover overlay effect (zoom + eye icon)
- ✅ **Project detail modal** — click any project to see full description
- ✅ Project descriptions are visible on cards
- ✅ Responsive grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)

### 2.7 Blog Page (NEW — Previously Empty)
- ✅ **6 real blog post cards** with images, categories, dates, and descriptions
- ✅ Cards with hover effects (image zoom + title color change)
- ✅ Blog topics related to mobile development (your expertise)
- ✅ Responsive grid layout

### 2.8 Contact Page
- ✅ **Google Maps embed** — dark-themed with invert filter, showing Mirpur-2, Dhaka
- ✅ **Contact form** with name, email, message fields
- ✅ Form validation with visual feedback (green/red borders)
- ✅ Submit button with disabled state until form is valid
- ✅ Alert message on submit (placeholder for future backend)
- ✅ **WhatsApp direct link** added to contact info

### 2.9 CV Download
- ✅ Download button in sidebar social links area
- ✅ Downloads `Razwanul_CV.pdf` from root directory
- ✅ Uses anchor download attribute for proper file download

---

## 🔧 3. JavaScript Changes

### Before
- Single monolithic `script.js` with all logic mixed together
- Global variables scattered throughout
- No error handling
- Form submit just showed an alert

### After
- **Organized into logical sections** with clear comments
- **Sidebar toggle** — mobile expand/collapse
- **Navigation** — page switching with active state management
- **Testimonial modal** — click to expand testimonial
- **Portfolio filter** — category filtering with animation
- **Project modal** — detailed view on click
- **CV download** — proper download trigger
- **Form validation** — real-time validation with visual feedback
- **Scroll animations** — IntersectionObserver-based reveal animations
- **Typing effect** — animated role text in sidebar

---

## 📱 4. Responsive Design

| Breakpoint | Layout |
|---|---|
| < 580px | Single column, bottom nav, collapsed sidebar |
| 580px+ | Centered content (520px), expanded spacing |
| 768px+ | 2-column grids, filter tabs visible |
| 1024px+ | Top-right nav, wider content (950px) |
| 1250px+ | Side-by-side layout (sidebar + content), sticky sidebar |

---

## 🚀 5. Performance Improvements
- ✅ `loading="lazy"` on all images
- ✅ Preconnect for Google Fonts
- ✅ Ionicons loaded with `type="module"` for modern browsers
- ✅ CSS custom properties for consistent theming
- ✅ Minimal DOM manipulation (event delegation where possible)

---

## 📝 6. What Was Kept (Not Changed)
- All existing **images** in `assets/images/` — no files deleted
- **Personal information** (name, email, phone, location, social links)
- **Work experience** data (all positions, dates, descriptions)
- **Education** data
- **Skills** data and percentages
- **Testimonials** (Sajal, Mahmud, Fahim)
- **Project portfolio** items (all projects preserved)
- **Google Maps** location (Mirpur-2, Dhaka)
- **LICENSE** file
- **Favicon** and logo files

---

## 🔮 7. Future Recommendations
1. ~~**Add a backend** for the contact form~~ ✅ Done — EmailJS integrated (free, no backend)
2. ~~**Add actual blog posts**~~ ✅ Done — blog posts now load from `data/blog.json`
3. ~~**Add project live links**~~ ✅ Done — `githubUrl` and `liveUrl` fields in `data/projects.json`
4. **Upload actual CV PDF** — ✅ Already exists: `Razwanul_CV.pdf` in root
5. ~~**Add dark/light mode toggle**~~ ✅ Done — theme toggle with localStorage
6. **Consider adding a "Clients" section** — showcase company logos you've worked with
7. **Add Google Analytics** — track portfolio visits
8. **Add Open Graph meta tags** — ✅ Already added in previous redesign

---

## 🔄 8. Update 2 — JSON Content Management System (February 18, 2026)

### 8.1 Problem Solved
- Previously, adding a new project or blog post required editing `index.html` directly
- No contact form backend — form just showed an alert
- No dark/light mode toggle
- All content was hardcoded in HTML

### 8.2 New Architecture
```
/
├── data/                          ← NEW: Content management via JSON
│   ├── projects.json              ← All portfolio projects (add new ones here!)
│   ├── blog.json                  ← All blog posts
│   └── resume.json                ← Experience, education, skills
├── index.html                     ← Dynamic containers (populated by JS)
├── assets/
│   ├── css/style.css              ← Added: Light theme, form status, project links
│   └── js/script.js               ← Rewritten: JSON loader, EmailJS, theme toggle
```

### 8.3 How to Add New Content (No Code Knowledge Needed!)

**To add a new project**, edit `data/projects.json`:
```json
{
  "id": "my-new-app",
  "title": "My New App",
  "fullTitle": "My New App (Flutter)",
  "category": "applications",
  "categoryLabel": "Flutter Application",
  "description": "Description of the project...",
  "tech": ["Flutter", "Dart", "Firebase"],
  "image": "./assets/images/my-new-app.png",
  "liveUrl": "https://play.google.com/store/apps/...",
  "githubUrl": "https://github.com/razwanul1407/my-new-app"
}
```

**To add a new blog post**, edit `data/blog.json`:
```json
{
  "id": "my-new-post",
  "title": "My New Blog Post",
  "category": "Flutter",
  "date": "2026-03-01",
  "dateFormatted": "Mar 1, 2026",
  "image": "./assets/images/blog-7.jpg",
  "excerpt": "Short description of the post...",
  "url": "https://medium.com/@razwanulhasan/my-post"
}
```

**To update experience/skills**, edit `data/resume.json`.

### 8.4 Changes Made

| File | What Changed |
|---|---|
| `data/projects.json` | **NEW** — All 10 portfolio projects as structured JSON |
| `data/blog.json` | **NEW** — All 6 blog posts as structured JSON |
| `data/resume.json` | **NEW** — Experience, education, technical skills, tools |
| `index.html` | Replaced hardcoded resume/portfolio/blog with dynamic containers. Added EmailJS SDK. Added theme toggle button. Added anti-flash theme script. Added form status container. Added project modal links container. |
| `assets/css/style.css` | Added full light theme (`[data-theme="light"]` overrides). Added theme toggle button styles. Added form status success/error/info styles. Added project modal link button styles. |
| `assets/js/script.js` | Complete rewrite (18 sections): JSON data loader, dynamic renderers for resume/projects/blog, re-bindable portfolio filter, JSON-aware project modal with GitHub/Live links, EmailJS integration with fallback, dark/light theme toggle with localStorage, all previous features preserved. |

### 8.5 EmailJS Setup (FREE — 200 emails/month)

1. Go to [emailjs.com](https://www.emailjs.com/) → Create free account
2. **Add Email Service** → Connect your Gmail/Outlook → Copy `SERVICE_ID`
3. **Create Template** → Use variables: `{{from_name}}`, `{{from_email}}`, `{{message}}` → Copy `TEMPLATE_ID`
4. **Account → General** → Copy `PUBLIC_KEY`
5. Open `assets/js/script.js` → Find `EMAILJS_CONFIG` → Replace the 3 values:
```javascript
const EMAILJS_CONFIG = {
  publicKey: "your_actual_public_key",
  serviceId: "your_actual_service_id",
  templateId: "your_actual_template_id",
};
```
6. Push to GitHub → Done! Contact form now sends real emails ✉️

### 8.6 Dark/Light Mode
- Toggle button in sidebar (below CV download)
- Preference saved in `localStorage` — persists across visits
- Anti-flash script in `<head>` prevents white flash on dark theme
- All colors use CSS variables — easy to customize

### 8.7 GitHub Pages Deployment
This entire portfolio works on **GitHub Pages** with zero configuration:
- No backend server needed
- No database needed
- No build step needed
- EmailJS handles contact form (free tier: 200 emails/month)
- JSON files load via `fetch()` — works on any static host
- Custom domain optional (free `username.github.io` works)

---

*Update 2 documentation added on February 18, 2026.*
