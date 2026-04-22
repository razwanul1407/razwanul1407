# Project Document — Razwanul1407 Personal Portfolio

**Developer:** Md. Razwanul Hasan  
**Last Updated:** April 22, 2026  
**Live URL:** https://razwanul1407.github.io/razwanul1407/  
**Repository:** https://github.com/razwanul1407/razwanul1407

---

## 1. Project Overview

এটি Md. Razwanul Hasan-এর একটি **personal portfolio website** — একজন senior mobile application developer-এর professional showcase। এই সাইটটি তার কাজের অভিজ্ঞতা, দক্ষতা, প্রজেক্ট এবং ব্লগ পোস্ট প্রদর্শন করে। সাইটটি সম্পূর্ণ static — কোনো backend server বা database ছাড়াই চলে — এবং GitHub Pages-এ host করা হয়।

**মূল বৈশিষ্ট্য:**
- JSON-driven content management (code ছাড়াই content update করা যায়)
- Dark / Light mode toggle (localStorage-এ save থাকে)
- EmailJS দিয়ে real contact form (কোনো backend ছাড়াই email পাঠায়)
- Mobile-first responsive design (5টি breakpoint)
- Scroll-reveal animations এবং typing effect
- 20+ portfolio project showcase
- 6টি full blog post

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, animations, responsive) |
| Scripting | Vanilla JavaScript (ES6+, IIFE pattern) |
| Icons | Ionicons (ES6 module) |
| Typography | Google Fonts — Poppins |
| Email Service | EmailJS SDK v4 (free tier: 200 emails/month) |
| Map | Google Maps (embedded iframe) |
| Hosting | GitHub Pages (zero build step) |
| Data | JSON files (fetch API) |
| Theme persistence | localStorage |

---

## 3. Directory Structure

```
razwanul1407/
│
├── index.html                    # Main portfolio entry point (813 lines)
├── CHANGELOG.md                  # Redesign documentation
├── PROJECT_DOCUMENT.md           # This file
├── README.md                     # Basic project info
├── LICENSE                       # MIT License
├── Razwanul_CV.pdf               # CV download file
├── scanapp-privacy-policy.html   # ScanApp mobile app privacy policy
│
├── assets/
│   ├── css/
│   │   └── style.css             # Main stylesheet (3,374 lines)
│   ├── js/
│   │   └── script.js             # Main application logic (952 lines)
│   └── images/                   # 51 image files (PNG, JPG, SVG, ICO)
│
├── data/                         # JSON content management
│   ├── projects.json             # 20 portfolio projects
│   ├── blog.json                 # 6 blog post metadata
│   ├── resume.json               # Experience, education, skills
│   ├── services.json             # 4 service offerings
│   └── about.json                # About section + testimonials
│
├── blog/                         # Individual blog post HTML pages
│   ├── react-native-vs-flutter.html
│   ├── clean-architecture-mobile.html
│   ├── flutter-state-management.html
│   ├── app-deployment-guide.html
│   ├── rest-api-best-practices.html
│   └── lessons-from-21-apps.html
│
├── website-demo-image/           # Marketing screenshots
│   ├── desktop.png
│   └── mobile.png
│
└── .github/
    └── FUNDING.yml               # GitHub Sponsors config
```

---

## 4. Architecture

### 4.1 JavaScript Architecture (script.js)

`script.js` 18টি organized section-এ বিভক্ত:

| # | Section | কাজ |
|---|---|---|
| 1 | Utility Functions | DOM selector helper, common utilities |
| 2 | JSON Data Loader | `fetch()` দিয়ে JSON load করে, error handle করে |
| 3 | Render Resume | `data/resume.json` থেকে experience, education, skills render |
| 4 | Render Projects | `data/projects.json` থেকে portfolio grid render |
| 5 | Render Blog Posts | `data/blog.json` থেকে blog cards render |
| 6 | Render About Page | `data/about.json` থেকে about section render |
| 7 | Sidebar Toggle | Mobile-এ sidebar expand/collapse |
| 8 | Navigation System | Page switching, active state management |
| 9 | Testimonial Modal | Click করলে testimonial বড় হয়ে দেখায় |
| 10 | Portfolio Filter | Category (All / Applications / Web) দিয়ে filter |
| 11 | Project Modal | Click করলে project-এর full details দেখায় |
| 12 | EmailJS Contact Form | Real-time validation + email send |
| 13 | CV Download | `Razwanul_CV.pdf` download করে |
| 14 | Theme Toggle | Dark/Light mode + localStorage save |
| 15 | Scroll Animations | IntersectionObserver দিয়ে scroll-reveal |
| 16 | Typing Effect | Sidebar-এ animated role text |
| 17 | Stats Counter | Animated number counters |
| 18 | Initialization | Page load-এ সব module initialize করে |

### 4.2 CSS Design System (style.css)

**Color Variables (Dark Theme):**
```css
--smoky-black       /* deepest background */
--eerie-black       /* card backgrounds */
--onyx              /* borders, dividers */
--jet               /* hover states */
--gold              /* primary accent */
--teal              /* secondary accent */
```

**Typography Scale:** 11px → 24px (8 levels), Poppins font, weight 300–700

**Spacing:** 8px grid system (সব padding/margin 8-এর গুণিতক)

**Shadow System:** 5-level shadow depth + glow effect

**Responsive Breakpoints:**
| Breakpoint | Layout |
|---|---|
| < 580px | Single column, bottom nav, collapsed sidebar |
| 580px+ | Centered (520px), expanded spacing |
| 768px+ | 2-column grids, filter tabs visible |
| 1024px+ | Top-right nav, content width 950px |
| 1250px+ | Side-by-side: sticky sidebar + content |

### 4.3 Content Management (JSON)

সমস্ত content JSON file-এ থাকে — HTML বা JS না ছুঁয়েই update করা যায়।

**`data/projects.json` structure:**
```json
{
  "id": "project-id",
  "title": "Project Name",
  "fullTitle": "Project Name (Flutter)",
  "category": "applications",
  "categoryLabel": "Flutter Application",
  "description": "Project description...",
  "tech": ["Flutter", "Dart", "Firebase"],
  "image": "./assets/images/project.png",
  "liveUrl": "https://play.google.com/...",
  "githubUrl": "https://github.com/..."
}
```

**`data/blog.json` structure:**
```json
{
  "id": "post-id",
  "title": "Blog Post Title",
  "category": "Flutter",
  "date": "2026-03-01",
  "dateFormatted": "Mar 1, 2026",
  "image": "./assets/images/blog-1.jpg",
  "excerpt": "Short description...",
  "url": "https://medium.com/@razwanulhasan/..."
}
```

**`data/resume.json` structure:** Experience array, Education array, Technical Skills array (নাম + percentage), Tools array

---

## 5. Third-Party Integrations

| Service | উদ্দেশ্য | Configuration |
|---|---|---|
| **EmailJS** | Contact form → email delivery | `script.js`-এ `EMAILJS_CONFIG` object |
| **Google Maps** | Location embed (Mirpur-2, Dhaka) | iframe embed in `index.html` |
| **Google Fonts** | Poppins typography | Preconnected link in `<head>` |
| **Ionicons** | Icon library | ES6 module `<script type="module">` |
| **GitHub Pages** | Static hosting | `main` branch থেকে auto-deploy |

### EmailJS Configuration (`script.js` line ~619):
```javascript
const EMAILJS_CONFIG = {
  publicKey: "m5UzEmRVh_j6ugPDX",
  serviceId: "service_nbw3p4c",
  templateId: "template_blakxj7",
};
```

---

## 6. Portfolio Content Summary

### Projects (20টি)
- Flutter apps, React Native apps, Native Android/iOS apps, Web apps
- Featured: ScanApp, BIFLE, Hillive, Quality Foods, Ziarah AI
- প্রতিটিতে: tech stack, description, GitHub link, live/store link

### Experience (6টি Position)
- Current: Freelance Full Stack Developer + Mobile Developer at ZIARAH
- 2019 থেকে present পর্যন্ত

### Education
- Master of CSE
- Bachelor of CSE

### Skills (Technical)
| Skill | Proficiency |
|---|---|
| React Native | 90% |
| JavaScript/TypeScript | 85% |
| Native Android | 80% |
| Flutter | 80% |
| Java / Kotlin / Dart | 80% |
| iOS / Swift | 70% |

### Tools
| Tool | Proficiency |
|---|---|
| Git/GitHub | 95% |
| Google Play Console | 95% |
| Postman/REST APIs | 95% |
| Android Studio/Xcode | 90% |
| Apple App Store Connect | 90% |

### Blog Posts (6টি)
1. React Native vs Flutter — কোনটি বেছে নেবেন?
2. Clean Architecture in Mobile Apps
3. Flutter State Management
4. App Deployment Guide (Android + iOS)
5. REST API Best Practices
6. Lessons from Building 21+ Apps

### Services Offered
| Service | Timeline |
|---|---|
| Business Website | 1–2 weeks |
| Custom Web Application | 3–6 weeks |
| Mobile App (iOS + Android) | 4–8 weeks |
| Maintenance & Integration | Ongoing |

---

## 7. How to Update Content

### নতুন Project যোগ করতে:
`data/projects.json` ফাইলে নতুন object add করুন (উপরের structure অনুযায়ী)।

### নতুন Blog Post যোগ করতে:
1. `data/blog.json`-এ metadata add করুন
2. `blog/` folder-এ HTML file তৈরি করুন

### Experience/Skills update করতে:
`data/resume.json` edit করুন।

### About/Testimonials update করতে:
`data/about.json` edit করুন।

---

## 8. EmailJS Setup (নতুন account-এর জন্য)

1. [emailjs.com](https://www.emailjs.com/) → Free account তৈরি করুন
2. Email Service add করুন (Gmail/Outlook) → `SERVICE_ID` copy করুন
3. Template তৈরি করুন (variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`) → `TEMPLATE_ID` copy করুন
4. Account → General → `PUBLIC_KEY` copy করুন
5. `assets/js/script.js`-এ `EMAILJS_CONFIG` update করুন
6. GitHub-এ push করুন — সম্পন্ন!

---

## 9. Deployment

**GitHub Pages (zero config):**
1. Repository settings → Pages → Source: `main` branch, root folder
2. Push করলেই auto-deploy হয়
3. Live URL: `https://razwanul1407.github.io/razwanul1407/`

**অন্য যেকোনো static host-এও কাজ করবে** (Netlify, Vercel, shared hosting) — কোনো build step নেই।

---

## 10. Performance Features

- সব image-এ `loading="lazy"`
- Google Fonts preconnect
- Ionicons module-based loading
- CSS custom properties (file size কম)
- Event delegation যেখানে সম্ভব
- Anti-flash script (`<head>`-এ) — dark theme-এ white flash হয় না

---

## 11. Contact & Social Links

| Platform | Link |
|---|---|
| LinkedIn | https://www.linkedin.com/in/mdrazwanulhasan1407 |
| Twitter | https://twitter.com/RazwanulHasan |
| Facebook | https://www.facebook.com/razwanulhasan/ |
| Instagram | https://www.instagram.com/razwanulhasan/ |
| WhatsApp | +8801749237060 |
| Email | razwanul@ziarah.me |

---

## 12. License

MIT License — Free to use, modify, and distribute with attribution.
