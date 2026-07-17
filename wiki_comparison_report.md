# CuriousWiki Architecture Comparison Report

This report compares the original custom-compiled architecture of **CuriousWiki** with the newly migrated **Hugo-based** version.

---

## 📊 Overview Table

| Feature / Metric | Original CuriousWiki | Migrated CuriousWiki (Hugo) |
| :--- | :--- | :--- |
| **Core Architecture** | Custom-built static generator compiled via Nim or Node.js. | Industry-standard Go-based static site generator (Hugo). |
| **Source Content Format** | Hand-written `.html` files + compiled `.md` files in `content/`. | Pure Markdown `.md` files under `content/` with standard frontmatter. |
| **Layout & Templating** | String replacement over `pages/template.html` via regex/custom parser. | Powerful Go templating engine (`layouts/`, partials, and blocks). |
| **Build System** | `build.nim` (compiled Nim) or `build.js` (Node.js). | Built-in Hugo compilation pipeline. |
| **Build Time** | ~1-2 seconds (Nim compilation + file operations). | **~400-500 ms** (GPU-like compilation speed of Go). |
| **Routing / URL Schema** | Static relative file paths (e.g., `getting-started.html`). | Configurable routing (`uglyURLs = true` keeps the exact same `.html` URLs). |
| **Breadcrumbs & Navigation** | Dynamic URL modification in the browser using client-side JS (`main.js`). | Dynamic, server-side structure rendering (`.Ancestors` loop) + client-side JS hooks. |
| **Search Engine** | Sharded index generator + custom client-side search script. | Same high-performance client-side sharded index, loaded as static assets. |
| **Development Server** | Custom Nim server (`server.nim`) or python/pnpm static servers. | Hugo's high-speed built-in server with **Hot Reloading / Live Reload**. |
| **Taxonomies (Tags/Categories)**| Hardcoded metadata in files. | Dynamic taxonomy pages automatically generated (e.g. `/tags/bash`). |

---

## ⚖️ Storage & Size Comparison (वजन/साइज़)

* **Original CuriousWiki (Static Output):** **~6.6 MB**
  - इसमें केवल 55 एक्टिव HTML पेज, एसेट्स (CSS/JS) और सर्च इंडेक्स शामिल हैं।
* **Migrated CuriousWiki (Hugo Output `public/`):** **~11 MB**
  - **साइज़ बढ़ने का कारण:** Hugo प्रत्येक Tag (जैसे `bash`, `git`, आदि) के लिए ऑटोमैटिकली अलग लिस्टिंग पेजों (Taxonomies) और RSS XML फ़ीड्स को जनरेट करता है (~240 अतिरिक्त HTML पेजों का निर्माण)।
  - **ब्राउज़र लोड साइज़ (Page Weight):** एक सिंगल पेज को ब्राउज़र में लोड करने का साइज़ (Page Weight) दोनों में लगभग समान है (~15-20 KB)। इसलिए यूजर के लिए लोडिंग स्पीड में कोई अंतर नहीं आएगा।

---

## 🚀 Future Scalability & Loading Performance (भविष्य में स्केलेबिलिटी)

भविष्य में जब आपका नॉलेज बेस 100+ या 1000+ पेजों तक बढ़ेगा, तब Hugo निम्नलिखित कारणों से बहुत आसानी से और बिना किसी परेशानी के लोड होगा:

1. **सेंट्रलाइज्ड लेआउट (No Duplicate code):**
   - मूल विकी में साइडबार की नेविगेशन लिंक हर HTML पेज में कॉपी-पेस्ट थी। नए पेज जोड़ने पर सभी पेजों में बदलाव करना पड़ता था।
   - Hugo में लेआउट (`baseof.html`) और साइडबार (`sidebar.html`) केवल एक स्थान पर परिभाषित हैं। भविष्य में 10,000 पेज होने पर भी साइडबार अपडेट करने में केवल 1 सेकंड लगेगा।
2. **ऑफ़लाइन और बिना JS के लोडिंग:**
   - मूल विकी में लिंक्स और ब्रेडक्रम्ब्स को ब्राउज़र के रनटाइम JS (`main.js`) पर निर्भर रहना पड़ता था।
   - Hugo वर्शन में सभी लिंक्स और ब्रेडक्रम्ब्स बिल्ड टाइम पर ही स्टैटिकली जनरेट हो जाते हैं। अगर ब्राउज़र में जावास्क्रिप्ट बंद भी हो, तब भी वेबसाइट बिना किसी परेशानी के लोड होगी।
3. **इंक्रीमेंटल और फ़ास्ट बिल्ड स्पीड:**
   - Hugo दुनिया का सबसे तेज़ स्टैटिक साइट जनरेटर है। भविष्य में हज़ारों पेज होने पर भी यह 1 सेकंड से कम समय में पूरी साइट को कंपाइल कर देगा।

---

## 🔍 Detailed Comparison

### 1. Developer Workflow & Content Management
* **Original CuriousWiki:** Adding a new page required creating a `.html` page manually (by copying `template.html`) or placing a `.md` file in `content/` and compiling it. If creating a `.html` page by hand, sidebar navigation had to be updated manually on every page (or rely entirely on runtime JS to patch it).
* **Hugo Version:** The workflow is purely Markdown-centric. Authors create simple `.md` files in `content/` with standard YAML frontmatter. Hugo takes care of compiling the content, wrapping it in the master layouts, and rendering it uniformly.

### 2. Layouts, Reuse, and DRY (Don't Repeat Yourself)
* **Original CuriousWiki:** Layouts were duplicated. Any changes to the sidebar navigation, layout styles, or headers required manual replication or complex regex replacement rules during compile time.
* **Hugo Version:** The sidebar is defined exactly once in `layouts/partials/sidebar.html`, and the overall HTML layout shell is defined once in `layouts/_default/baseof.html`. Hugo injects page-specific content into the layout dynamically.

### 3. Dynamic Navigation & Page Hierarchy
* **Original CuriousWiki:** Relied heavily on client-side JS (`main.js`) to parse paths, generate prefixes (`../../`), and modify sidebar URL links in the DOM at runtime.
* **Hugo Version:** Generates exact absolute or relative links during build time using helper functions (`relURL`, `RelPermalink`). Breadcrumbs are generated server-side dynamically via the `.Ancestors` structure, ensuring search engines can crawl the hierarchy easily without running Javascript.

---

## ⚖️ Pros and Cons

### Original CuriousWiki (Custom Nim/Node Compiler)
> [!TIP]
> **Pros:**
> - Zero external framework dependencies; highly transparent codebase.
> - Hand-tuned JS-based client-side prefix search index.
> - Light footprint for pure static distribution.
>
> **Cons:**
> - High code duplication in templates.
> - Hard to maintain sidebar navigation when adding new folders/pages.
> - Limited markdown parsing features (doesn't support clean syntax extensions out of the box).

### Hugo Version
> [!NOTE]
> **Pros:**
> - **Zero layout duplication:** Sidebar, header, footer are centralized.
> - **Live Reload:** Automatic browser updates on save during development.
> - **Clean Markdown Source:** All documents are stored as standard, portable `.md` files.
> - **Robust SEO:** Standard HTML tags, meta keywords, and proper heading hierarchies are fully automated.
>
> **Cons:**
> - Requires learning Hugo template syntax (Go templates) for complex layout changes.
> - Generates index pages for taxonomies (categories, tags) by default, increasing build file count (though highly beneficial for navigation).
