# 🟢 01. Architecture Overview (वास्तुकला विवरण)

CuriousWiki एक **High-Performance Developer Wiki** है, जो static architectures और browser client-side logic पर structured है. इस page में हम इसकी basic files structure, static rendering approach और design guidelines को detail में समझेंगे.

---

## 🏗️ 1. Static Architecture Choice (स्टेटिक आर्किटेक्चर क्यों?)

CuriousWiki को backend processing server के बिना deploy करने के लिए design किया गया है. इसकी प्रमुख विशेषताएं निम्नलिखित हैं:
* **Zero Backend Dependency**: Server-side processing के लिए PHP, Node.js express server या python flask app की ज़रूरत नहीं होती.
* **Super-Fast Page Loading**: Browser direct statically cached HTML, CSS और Javascript bundle को render करता है, जिससे render latency close to zero हो जाती है.
* **Zero Client-Side Database Overhead**: Search database load (जैसे SQLite WASM file size MBs) को avoid करने के लिए prefix-sharded lightweight static JSON schema use किया गया है। Client browser सिर्फ query terms के relative prefix file और content chunk load करता है, जिससे bandwidth overhead zero हो जाता है।
* **Easy Hosting**: इसे GitHub Pages, Netlify या normal Nginx/Apache simple file hosting servers पर instantly deployment किया जा सकता है.

---

## 📁 2. File and Directory Structure (फ़ाइल और फ़ोल्डर संरचना)

CuriousWiki का codebase organized directory layout structure follow करता है:

```text
CuriousWiki/
├── index.html                   # Home Dashboard (Wiki Entrypoint)
├── package.json                 # Node dependencies configuration
├── search/                      # Prefix-Sharded Search Index Directory
│   ├── idx/                     # 2-letter Hex Word Index Shards (e.g. 7072.json)
│   ├── meta/                    # 100-page content metadata chunks (0.json)
│   └── config.json              # Search index basic configurations
├── serve.sh                     # Launch and compiler wrapper bash script
│
├── content/                     # Markdown source files (.md)
│   ├── hello-world.md           # Welcome source post
│   └── juliach1.md              # Julia chapter 1 source file
│
├── pages/                       # Compiled HTML outputs (compiled from content/)
│   ├── template.html            # Core Base HTML skeleton
│   ├── dictionary.html          # Dual-language Developer Dictionary
│   ├── git-cheatsheet.html      # Git developer guidelines
│   ├── javascript-cheatsheet.html
│   ├── nim-cheatsheet.html
│   ├── vim-cheatsheet.html
│   └── linux/                   # Deeply nested linux modules folder
│       ├── bash/
│       ├── linux-bible/
│       └── linux-tools/
│
├── css/
│   └── style.css                # Global Custom Premium CSS Stylesheet
│
├── js/
│   └── main.js                  # Main Client JavaScript UI controller (handles sharded search)
│
└── images/
    └── logo.png                 # Brain graphic asset for header/sidebar
```

---

## 🔑 3. Key Components Functionality (मुख्य घटकों का कार्य)

### A. content/ (Source Content)
यह folder wiki का primary data source है. Developers plain **Markdown format (.md)** में articles लिखते हैं. इस structure में **YAML Frontmatter** syntax का use किया जाता है, जैसे:
```markdown
---
title: My Guide
tags: guide, custom
date: 2026-07-02
---
# Document Body here
```

### B. pages/template.html (The Blueprint)
यह CuriousWiki की standard skeleton file है. Static compilers (`build.nim` या `build.js`) templates placeholders को read करते हैं और Markdown html convert body और values से fill (inject) करके target location पर compiled `.html` files save करते हैं.

### C. css/style.css (Design System)
यह standard modular CSS file CSS custom variables, glassmorphic layout designs, custom animations और dark/light state themes contain करती है. responsive breakpoints breakpoints standard dynamic viewport sizing standards update करते हैं.

### D. js/ (Runtime Execution)
Main thread optimization के लिए search engine directly query prefix files dynamically loads and parses करता है, जिससे zero latency search functionality मिलती है।

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
* **[02. Compilation & Build Systems (नेक्स्ट लेवल)](file:///home/narayanas/Documents/CuriousWiki/docs/02-compilation-build.md)**
* **[05. Frontend & UI/UX Features](file:///home/narayanas/Documents/CuriousWiki/docs/05-frontend-ux.md)**
