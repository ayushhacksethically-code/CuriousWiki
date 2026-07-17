# 📚 CuriousWiki Technical Documentation Hub

Welcome to **CuriousWiki** Technical Documentation index. यहाँ CuriousWiki को design और develop करने में उपयोग की गई सभी technologies, design patterns, directory structures और advanced features को विस्तार (detail) में समझाया गया है।

यह documentation **Basic से Advanced** levels में structure किया गया है, ताकि आप इसके static site engine को आसानी से समझ सकें और ज़रूरत पड़ने पर customize कर सकें।

---

## 📁 Table of Contents (विषय सूची)

### 🟢 1. Basic Level: Architecture & UI/UX
* **[00. Absolute Beginner's Guide](file:///home/narayanas/Documents/CuriousWiki/docs/00-beginner-guide.md)**: 
  Coding के basic terms (HTML, CSS, JS, Markdown), terminal commands, और बिना coding के नया page add करने का step-by-step tutorial.
* **[01. Architecture Overview](file:///home/narayanas/Documents/CuriousWiki/docs/01-architecture-overview.md)**: 
  CuriousWiki का high-level design philosophy, file and folder structure, और index templates का description.
* **[05. Frontend & UI/UX Features](file:///home/narayanas/Documents/CuriousWiki/docs/05-frontend-ux.md)**: 
  Theme toggling (Light/Dark mode), LocalStorage state persistent design, Lucide Icons, KaTeX engine (for rendering mathematical equations), auto-generating Table of Contents (TOC), और copy-to-clipboard functionality.

### 🟡 2. Intermediate Level: Compilers & Paths
* **[02. Compilation & Build Systems](file:///home/narayanas/Documents/CuriousWiki/docs/02-compilation-build.md)**: 
  Markdown files को static HTML pages में compile करने की process. Nim custom compiler (`build.nim`) और Node.js fallback compiler (`build.js`) कैसे काम करते हैं.
* **[03. Dynamic Path Resolution](file:///home/narayanas/Documents/CuriousWiki/docs/03-path-resolution.md)**: 
  Deeply nested sub-directories (जैसे `pages/linux/linux-tools/shell/`) में link broken होने की समस्या (link breaking issue) को JavaScript runtime depth resolution (`rootPrefix` method) द्वारा dynamic resolve करना.

### 🔴 3. Advanced Level: Search Engines & Sharding
* **[04. Prefix-Sharded Static Search Engine](file:///home/narayanas/Documents/CuriousWiki/docs/04-search-engine.md)**: 
  Client-side database size और page load overhead को शून्य (zero) करने के लिए, build-time पर search index को tiny prefix shards (JSON files) में split करने और client-side runtime on-demand search fetching structure का implementation।
* **[06. Systems Developer Syllabus](file:///home/narayanas/Documents/CuriousWiki/docs/06-learning-syllabus.md)**: 
  C, Python, SQLite, JavaScript, Nim, और Intermediate Cybersecurity सीखने का complete roadmap (syllabus).
* **[07. 180-Day Day-by-Day Syllabus](file:///home/narayanas/Documents/CuriousWiki/docs/07-day-by-day-syllabus.md)**: 
  180-day (6-month) structured mastery calendar. हर दिन के लिए exact topic, daily coding challenge, और self-evaluation checklist.
* **[08. Month 1 Day-by-Day Syllabus](file:///home/narayanas/Documents/CuriousWiki/docs/08-month-1-syllabus.md)**: 
  GNU/Linux Administration & Bash CLI Mastery (डे 001 - 030) का विस्तृत daily learning syllabus.
* **[09. Month 2 Day-by-Day Syllabus](file:///home/narayanas/Documents/CuriousWiki/docs/09-month-2-syllabus.md)**: 
  PowerShell Core (pwsh) Object Scripting (डे 031 - 060) का विस्तृत daily learning syllabus.
* **[10. Month 3 Day-by-Day Syllabus](file:///home/narayanas/Documents/CuriousWiki/docs/10-month-3-syllabus.md)**: 
  Systems Foundations: C Programming & Memory Management (डे 061 - 90) का विस्तृत daily learning syllabus.
* **[11. Month 4 Day-by-Day Syllabus](file:///home/narayanas/Documents/CuriousWiki/docs/11-month-4-syllabus.md)**: 
  Python Automation & SQLite Databases (डे 091 - 120) का विस्तृत daily learning syllabus.
* **[12. Month 5 Day-by-Day Syllabus](file:///home/narayanas/Documents/CuriousWiki/docs/12-month-5-syllabus.md)**: 
  Web Engineering: HTML5, CSS3, JS & Browser WASM (डे 121 - 150) का विस्तृत daily learning syllabus.

---

## 🚀 Quick Execution Guide (त्वरित मार्गदर्शिका)

यदि आप CuriousWiki को compile और serve करना चाहते हैं, तो निम्नलिखित commands का उपयोग करें:

1. **Serve locally & Auto-rebuild**:
   ```bash
   chmod +x serve.sh
   ./serve.sh
   ```
   यह script:
   - Nim compiler का उपयोग करके Markdown source codes को compiles करता है.
   - HTML documents को update करके prefix-sharded search index rebuild करता है.
   - Lightweight built-in local static server (Python 3 HTTP server, pnpm, या Node.js static fallback server) host करता है.

2. **Access URL**:
   Browser में [http://localhost:8585](http://localhost:8585) open करें.
