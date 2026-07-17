# 🟢 05. Frontend & UI/UX Features (यूआई/यूएक्स फीचर्स)

CuriousWiki का UI/UX design dynamic, interactive और premium feel देने के लिए optimize किया गया है. इसमें standard design templates, modern fonts (Outfit and Inter), subtle animations और pure client-side javascript interaction hooks का use किया गया है.

इस page में हम frontend functionalities (जैसे Theme Switcher, Copy buttons, LaTeX support, active sidebar links और tree filters) के working algorithms को details में समझेंगे.

---

## 🎨 1. Design System & Theme Switching (थीम स्विचर)

CuriousWiki design **CSS variables (Custom Properties)** और state tracking data-attributes पर build है:

### CSS Custom Properties structure:
* `:root` selector default Light Theme palette define करता है.
* `[data-theme="dark"]` selector Dark Theme variables override करता है (जैसे slate `#090d16` background and neon accents).

### LocalStorage State Persistence algorithm:
1. Local Storage read process check `theme` index (`localStorage.getItem('theme')`). Default preference `dark` set की गई है.
2. `document.documentElement.setAttribute('data-theme', theme)` state load.
3. Theme toggle button click listener setup trigger values state dynamically update theme state:
   ```javascript
   const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
   document.documentElement.setAttribute('data-theme', newTheme);
   localStorage.setItem('theme', newTheme);
   ```
4. Icon update trigger: Lucide icons `sun` और `moon` dynamically updates class details render sequence run features.

---

## 💻 2. Dynamic Code Header & Clipboard integration (कोड कॉपी फ़ंक्शन)

CuriousWiki articles readable clean formatting blocks display code highlight structures represent templates. Browser standard `<pre>` code tags read dynamic headers inject settings:

1. JS scans all `<pre>` blocks inside article scope.
2. Target nested `<code>` tag parsed:
   - Extract language type from class (e.g., `language-BASH` converts language marker string to `"BASH"`).
3. Create new DOM element header `.code-header`:
   - Left side contains language name span.
   - Right side contains dynamic "Copy" button.
4. **Clipboard API Action**:
   ```javascript
   await navigator.clipboard.writeText(codeElement.textContent);
   ```
5. Action completes toggle icons dynamic text change to "Copied!" and border outline highlights to success green color (`--accent-success`), then resets to default template after 2 seconds timeout constraint.

---

## 🚀 3. Math Expression Rendering with KaTeX (गणितीय समीकरण रेंडरर)

Mathematical notes dynamic equations rendering capabilities standard CDN integration standard structures compile setup includes **KaTeX engine**:
1. Javascript load stylesheet dynamic inserts:
   - `https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css`
2. Load scripts in sequence:
   - First loads `katex.min.js`.
   - On completion loads `auto-render.min.js` plugin.
3. **Parsing Delimiters**:
   Browser client auto renders target syntax text sequences check structures:
   - `$$ ... $$` for display equations.
   - `$ ... $` for inline formulas.
   - `\\( ... \\)` and `\\[ ... \\]` fallbacks.

---

## 📱 4. Mobile Menu Drawer & Sidebar Collapse (रिस्पॉन्सिव साइडबार)

User interaction navigation optimization screens width breakpoints dynamically sets control:
* **On Desktop Mode (width > 768px)**:
  Sidebar toggle button click event container element class layout toggles `app.classList.toggle('sidebar-collapsed')`. This collapses the sidebar width to a thin band, giving more whitespace area to read articles.
* **On Mobile Mode (width <= 768px)**:
  Sidebar toggles slide-in mobile navigation menu drawer by tracking class `sidebar.classList.toggle('active')`. In addition, clicks outside the sidebar drawer area dynamically close (collapse) the sidebar drawer immediately.
* **Dynamic Close Button**:
  Script generates a close button (`#sidebar-collapse-btn`) inside the sidebar header, rendering a Lucide icon `chevron-left` dynamically.

---

## 🌲 5. Premium TOC Tree Filtering (विषय फ़िल्टरिंग एल्गोरिथम)

Index pages (जैसे `pages/linux/linux-bible/index.html`) collapsible details list indexes render करते हैं. Tree control interface DOM filtering script maintain करता है:

1. Input keypress trigger parses search queries strings:
   ```javascript
   const query = e.target.value.toLowerCase().trim();
   ```
2. If input is cleared, resets styling display to normal blocks (`el.style.display = ''`).
3. If search terms are active:
   - Hides all leaf list items and details tree nodes.
   - Scans leaf content names `leaf.textContent`.
   - If match found, displays that specific leaf item.
   - **DOM Ancestors traversal**:
     Match leaf find parent details hierarchy tree loops upwards to apply open status and visible display:
     ```javascript
     let parent = leaf.closest('details.toc-node');
     while (parent) {
         parent.style.display = '';
         parent.open = true;
         parent = parent.parentElement.closest('details.toc-node');
     }
     ```
   - यह matched node items को highlight directory structure hierarchy के साथ instantly display करता है, unmatched folders auto hide हो जाते हैं.

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
* **[01. Architecture Overview](file:///home/narayanas/Documents/CuriousWiki/docs/01-architecture-overview.md)**
* **[04. Client-Side SQLite WASM Search](file:///home/narayanas/Documents/CuriousWiki/docs/04-search-engine.md)**
