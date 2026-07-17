# Plan: Beautiful Static Personal Wiki

We are going to build a premium, multi-page static wiki (knowledge base) designed to run entirely in the browser using HTML, CSS, and JS, featuring a responsive, clean, and immersive design (Dark/Light mode, custom fonts, glassmorphism, and responsive sidebar navigation). It will include "Edit on GitHub" buttons for every page to facilitate simple updates on GitHub.

## 📁 File Structure

We will organize the wiki in `/home/narayanas/projects/Web/personal-wiki/`:

```text
personal-wiki/
├── index.html                  # Home Dashboard
├── css/
│   └── style.css               # Premium CSS (Typography, CSS Vars, Animations, Markdown Style)
├── js/
│   └── main.js                 # Shared functionality (Theme, Search, Sidebar, Code copy)
└── pages/
    ├── getting-started.html    # Intro wiki page
    ├── markdown-guide.html     # Markdown & Callouts cheatsheet
    ├── javascript-cheatsheet.html # Developer cheat sheet
    └── productivity.html       # Sample topic page
```

## 🎨 Design & Aesthetic Choices

1. **Typography**: Google Fonts - **Outfit** (for headings, modern and sleek) and **Inter** (for body text, clean and readable).
2. **Color Palette (CSS Variables)**:
   - *Dark Mode*: Deep space slate/gray (`#0b0f19`), glass card panels, vibrant blue/violet accents, neon teal highlights.
   - *Light Mode*: Warm soft white/gray background, clean card borders, sharp indigo/indigo-violet accents.
3. **Animations**: Subtle scale-up on hover, smooth sidebar transitions, fade-in for page content, search result highlights.
4. **Icons**: Lucide Icons CDN for minimalist vector icons.
5. **Key Features**:
   - **Interactive Live Search**: Quick search modal/dropdown in the sidebar scanning titles and tags.
   - **Collapsible Sidebar Tree**: Hierarchy that works natively across all pages.
   - **"Edit on GitHub" Buttons**: Configurable buttons linking directly to the page's GitHub source file.
   - **Beautiful Content Styles**: Custom classes for callouts (`.callout-info`, `.callout-warning`), tables, keyboard inputs (`<kbd>`), and code blocks with Copy buttons.
   - **Active Navigation States**: Highlights the current page in the sidebar automatically.

## 🚀 Execution Steps

1. **Step 1**: Create the core stylesheet `css/style.css` containing the complete CSS variables, resets, responsive layout, sidebar styles, layout grid, dark/light theme definitions, and markdown-like content formatting.
2. **Step 2**: Create the shared script `js/main.js` which handles:
   - Theme switching (Light/Dark) with localStorage persistence.
   - Sidebar responsiveness toggle.
   - Client-side site index for live search.
   - Code copy-to-clipboard buttons.
   - Active page highlights.
3. **Step 3**: Create the Home Page (`index.html`) featuring a dashboard layout with category cards, search bar, and recent pages.
4. **Step 4**: Create sample content pages under `pages/` (e.g., `getting-started.html`, `markdown-guide.html`, etc.) demonstrating formatting like code blocks, callouts, lists, and wiki-links.
5. **Step 5**: Test and serve locally.
