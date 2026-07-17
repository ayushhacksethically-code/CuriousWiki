# 📚 12. Month 5: Web Engineering: HTML5, CSS3, JS & Browser WASM (डे-बाई-डे सिलेबस)

यह syllabus Month 5 (Day 121 - 150) के लिए एक विस्तृत दैनिक कार्यक्रम (day-by-day plan) है। इसका मुख्य उद्देश्य आपको **Semantic HTML5 structures, CSS3 Layouts & Animation systems, JavaScript Event Loop, Web Workers threads, and Client-side WebAssembly SQLite (SQL.js) Search Engines** का master बनाना है।

प्रत्येक दिन के लिए **Topic**, **Daily Challenge (व्यावहारिक कार्य)**, और **Mastery Check** दिए गए हैं।

---

## 📅 Week 17: HTML5 Semantic Layouts, Forms & Accessibility (डे 121 - 127)

### Day 121: Semantic HTML5 Layouts & Web Page Structure
* **Topic**: HTML5 semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), SEO value of layout hierarchies, using proper document outlines.
* **Daily Challenge**: एक complete web page outline structures document skeleton build करें semantic tags का use करके, outline layout details inspect करें browser developer tools में.
* **Mastery Check**: Why are semantic tags preferred over generic `<div>` tag containers for web layouts?

### Day 122: Advanced Web Forms & Client-side Validation
* **Topic**: HTML5 input types, constraints attributes (`required`, `pattern`, `min`/`max`), CSS pseudo-classes for validations (`:valid`, `:invalid`), and Javascript Constraint Validation API (`checkValidity()`).
* **Daily Challenge**: Custom user registration form build करें: email matches validation, strong password requirements matching regex pattern validation, error indicators render paths mapping parameters.
* **Mastery Check**: Client-side input validation safety level vs server-side validation checks importance?

### Day 123: Canvas API Drawing & Visual Rendering
* **Topic**: Canvas 2D rendering context, basic shape coordinates, path mappings, drawing methods, and image data manipulation.
* **Daily Challenge**: Canvas element initialize context: draw basic grid layouts systems, render dynamic shapes, write text.
* **Mastery Check**: Canvas rendering system and SVG elements performance differences under heavy data?

### Day 124: SVG Paths & Scalable Visuals
* **Topic**: Scalable Vector Graphics (SVG) structures, vector path commands (`M`, `L`, `C`, `Z`), vector styling, embedding SVGs, and optimizing icons.
* **Daily Challenge**: Create custom vector icon using path XML markup in SVG file, embed code inline HTML, style shapes with CSS hover properties.
* **Mastery Check**: SVG inline vector styling advantages over external image file dependencies?

### Day 125: Accessibility (a11y) & Tabindex Focus Flow
* **Topic**: Web Accessibility standards, WAI-ARIA roles/attributes, tabindex levels (`-1`, `0`, positive numbers), focus styles, keyboard controls.
* **Daily Challenge**: Custom dropdown list component construct: configure tabindex keyboard navigation selectors allowing focus loops via Tab / Arrow key options.
* **Mastery Check**: positive tabindex values why considered anti-patterns in general accessibility architectures?

### Day 126: Document Metadata & SEO Specifications
* **Topic**: Document metadata tags, OpenGraph attributes tags, schema JSON-LD schemas, robots instructions.
* **Daily Challenge**: Build SEO page configurations headers: set up metadata parameters, dynamic social sharing links templates configurations.
* **Mastery Check**: Schema markup structural benefits on search engine index representations?

### Day 127: Week 17 Review & Mini-Project: Interactive Dashboard Template
* **Topic**: Semantic HTML layout compilation, canvas data visual rendering, keyboard controls navigation options.
* **Daily Challenge**: Build interactive data monitoring landing page dashboard including accessibility focus controls, vector graphics icons templates.
* **Mastery Check**: Web accessibility checklist verifying elements outlines focus status.

---

## 📅 Week 18: CSS3 Layout Systems, Variables & Themes (डे 128 - 134)

### Day 128: CSS Box Model & Layout Flow
* **Topic**: Box sizing adjustments (`border-box`), margins folding rules, positioning schemas (absolute, relative, fixed, sticky), overflow controls.
* **Daily Challenge**: Sticky sidebar panel layout design template: construct header, sidebar scrolling alongside content blocks.
* **Mastery Check**: differences between absolute positioning offsets references vs relative offsets scopes?

### Day 129: Flexbox Multi-dimensional Layout Alignment
* **Topic**: CSS Flexbox axis configurations, justify content parameters, align items options, flex properties scaling metrics (`flex-grow`, `flex-shrink`, `flex-basis`).
* **Daily Challenge**: Responsive navigation bar layout creation: distribute child items, align elements vertically, adjust layout order.
* **Mastery Check**: Flex-basis parameter properties: how it affects initial layout sizing calculation?

### Day 130: CSS Grid System layouts
* **Topic**: CSS Grid template columns/rows, gap options, grid-area assignments, responsive grid templates utilizing autofit/autofill mechanisms.
* **Daily Challenge**: Compile 12-column template layout system using CSS grid templates, configure grid elements mapping grid areas configurations.
* **Mastery Check**: CSS Grid layout advantages over Flexbox layout systems in complex two-dimensional web layouts?

### Day 131: CSS Custom Properties & Dynamic Themes
* **Topic**: CSS variables scoping parameters (`--var-name`), root variables, dynamic variable overriding runtime styles, themes toggle togglers.
* **Daily Challenge**: Dark/Light theme toggler system structure: declare custom color variables, write theme class variables override layouts, trigger theme swaps.
* **Mastery Check**: CSS variables runtime performance over pre-processor variables (e.g. SASS)?

### Day 132: CSS Micro-Animations & Transitions
* **Topic**: CSS transitions triggers, timing functions (cubic-bezier), CSS keyframes animations, hardware acceleration triggers.
* **Daily Challenge**: CSS loading spinner design: create rotation animations loops, configure button hover animations.
* **Mastery Check**: GPU acceleration benefits: how CSS transforms (`translate3d`) avoid page reflow latency?

### Day 133: CSS Media Queries & Mobile First Layouts
* **Topic**: Mobile first layout philosophy, breakpoint layout definitions, media orientation checks, fluid typography.
* **Daily Challenge**: Responsive portfolio page: write CSS rules scaling layouts from phone grids to large screens.
* **Mastery Check**: Mobile first media queries syntax checks: min-width constraints vs max-width boundaries?

### Day 134: Week 18 Review & Mini-Project: Dark-Mode Portfolio Layout
* **Topic**: CSS Grid layouts setups, CSS variables themes, micro-animations loops.
* **Daily Challenge**: Create modern portfolio page featuring smooth CSS layout variables transition toggling, grid layouts, responsive breakpoints.
* **Mastery Check**: Testing CSS variables overrides across multiple browsers engines compatibility.

---

## 📅 Week 19: JavaScript Runtime, DOM Events & Asynchronous Loops (डे 135 - 141)

### Day 135: JS Data Structures & JSON parsing
* **Topic**: Javascript Object arrays methods (Map, Filter, Reduce, Sort), JSON serializers (`JSON.stringify`, `JSON.parse` safe wrappers).
* **Daily Challenge**: Read raw database array data: compute total items counts, filter status indicators, sort values using custom comparator closures.
* **Mastery Check**: JSON serialization pitfalls (e.g. date formatting conversions, circular references traps)?

### Day 136: DOM Selection & Dynamic Nodes manipulation
* **Topic**: Document query selectors (`querySelector`, `querySelectorAll`), creating nodes (`createElement`), batch modifications using DocumentFragments.
* **Daily Challenge**: Render search listing dynamically: create UI cards, append list to document using document fragment optimizing rendering pipelines.
* **Mastery Check**: Why using `DocumentFragment` is better than appending nodes inside loop iterations directly to DOM?

### Day 137: DOM Event Bubbling & Event Delegation
* **Topic**: Event propagation phases (capturing, target, bubbling), stopping propagation (`stopPropagation`), event delegation patterns.
* **Daily Challenge**: List card actions selector: bind single event handler on parent list node container, route clicks based on clicked child element metadata.
* **Mastery Check**: Event Delegation advantages in lists having dynamically added child nodes?

### Day 138: Event Loop, Macro-tasks & Micro-tasks
* **Topic**: Javascript single-threaded execution runtime, Call Stack, Callback Queue, Microtask Queue, event loop cycles.
* **Daily Challenge**: Write execution order test logs script: verify execution precedence between `setTimeout`, `Promise.resolve`, and synchronous calls.
* **Mastery Check**: execution order precedence between Microtask queue items and Macrotask queue items?

### Day 139: Asynchronous Flows (Promises & Async/Await)
* **Topic**: Promises states lifecycle, chaining promises, async/await wrappers, catching rejected promises safely.
* **Daily Challenge**: API fetching wrapper structure write: fetch resources urls parallelly utilizing `Promise.all`, catch failures cleanly.
* **Mastery Check**: `Promise.all` error handling: what happens to other queries if one promise fails?

### Day 140: Client-side Storage (LocalStorage & IndexedDB)
* **Topic**: Key-value client-side databases, LocalStorage lifetime limits, SessionStorage scopes, serializing nested objects to strings.
* **Daily Challenge**: Custom state saver class build: save page settings values local storage, load configurations state on page startup events.
* **Mastery Check**: LocalStorage space capacity limits and security restrictions?

### Day 141: Week 19 Review & Mini-Project: Asynchronous Task Manager
* **Topic**: DOM creation loops, async promise loops, LocalStorage caching, Event delegation targets.
* **Daily Challenge**: Create task manager application: allow task addition dynamically, store listings in LocalStorage, handle updates using event delegation.
* **Mastery Check**: Verify state updates persistence after page refresh events.

---

## 📅 Week 20: Web Workers, WASM & Client-side Database (डे 142 - 150)

### Day 142: Web Workers Concurrency & PostMessage
* **Topic**: Background thread execution using Web Workers, `Worker` constructor initialization, messaging passing API (`postMessage`, `onmessage`).
* **Daily Challenge**: Heavy primes list calculation thread delegation: compute numbers arrays inside Web Worker script file, update main UI progress indicators.
* **Mastery Check**: main thread memory and Worker thread memory isolation constraints?

### Day 143: WebAssembly (WASM) Loader & AssemblyScript
* **Topic**: WebAssembly binary compiler format, compiled WASM code injection runtime loading interfaces (`WebAssembly.instantiateStreaming`), calling compiled functions.
* **Daily Challenge**: Load simple precompiled WASM calculation module, configure imports exports, run intensive computations.
* **Mastery Check**: WASM memory layouts: how memory buffers are shared between JS and WebAssembly?

### Day 144: Client-side Databases (IndexedDB basics)
* **Topic**: Structured client-side databases IndexedDB, object stores setups, database opening events loops, transactions cycles.
* **Daily Challenge**: Write transactional data storage script: open connection to IndexedDB database store, insert logs, fetch records matching filters.
* **Mastery Check**: IndexedDB asynchronous database transaction mechanisms advantages over LocalStorage blocks?

### Day 145: SQL.js Loader (Client-side SQLite WASM)
* **Topic**: SQL.js library (SQLite database engine compiled to WASM), opening databases in-memory, importing precompiled SQLite db buffers.
* **Daily Challenge**: Load SQLite database engine WASM runtime: import local database binary files arrays, run SELECT queries on documentation tables.
* **Mastery Check**: SQL.js database buffer serialization: how to export database modifications from memory to file?

### Day 146: MATCH Queries & Text Search sorting
* **Topic**: SQLite FTS5 matching on the client-side, running FTS queries through WASM SQL.js, ranking search results.
* **Daily Challenge**: Setup documentation search matching: run SQLite WASM match queries on database rows, sort search results list by relevance.
* **Mastery Check**: Client-side SQL.js memory buffers performance limits under heavy database sizing?

### Day 147: Browser Same-Origin Security Policy (SOP)
* **Topic**: Same-Origin Policy constraints, Cross-Origin Resource Sharing (CORS) header configuration, iframe sandboxing scopes.
* **Daily Challenge**: Build fetch calls verifying CORS policy parameters, inspect console security violation messages.
* **Mastery Check**: SOP details: what determines if two URLs have the same origin?

### Day 148: Web Performance Metrics & Lighthouse audits
* **Topic**: Core Web Vitals (LCP, FID, CLS), network waterfall charts optimizations, JS bundles tree-shaking, caching strategies.
* **Daily Challenge**: Run local Lighthouse audit reports on workspace page: analyze performance issues, optimize script loading parameters.
* **Mastery Check**: `async` and `defer` attributes on script tags: how do they alter HTML parser execution?

### Day 149: DOM Cryptography API (SubtleCrypto)
* **Topic**: Web Cryptography API, generating digests hash values, symmetric encryption, encryption/decryption keys management.
* **Daily Challenge**: File integrity verification application: hash custom string values using SHA-256 APIs in browser console, display hex signatures.
* **Mastery Check**: SubtleCrypto dynamic promise results: why are Web Crypto operations designed as asynchronous promises?

### Day 150: Module 5 graduation project: Complete Static Site Search Engine
* **Topic**: Semantic layouts markup, client-side SQLite WASM (SQL.js), FTS5 queries, LocalStorage caching, Web Worker background searches, Web Cryptography.
* **Daily Challenge**: Complete graduation project: write integrated search app loading prefix-sharded SQLite databases, run searches on target documentation databases, display matches with highlighted snippet fragments, rank query records using WASM, and cache settings.
* **Mastery Check**: Verify zero UI thread blocking when running queries on large datasets, testing responsive styles.

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[06. Systems Developer Syllabus (संक्षिप्त सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/06-learning-syllabus.md)**
* **[07. 180-Day Day-by-Day Syllabus (पूरा सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/07-day-by-day-syllabus.md)**
* **[08. Month 1 Day-by-Day Syllabus (डे 1 - 30)](file:///home/narayanas/Documents/CuriousWiki/docs/08-month-1-syllabus.md)**
* **[09. Month 2 Day-by-Day Syllabus (डे 31 - 60)](file:///home/narayanas/Documents/CuriousWiki/docs/09-month-2-syllabus.md)**
* **[10. Month 3 Day-by-Day Syllabus (डे 61 - 90)](file:///home/narayanas/Documents/CuriousWiki/docs/10-month-3-syllabus.md)**
* **[11. Month 4 Day-by-Day Syllabus (डे 91 - 120)](file:///home/narayanas/Documents/CuriousWiki/docs/11-month-4-syllabus.md)**
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
