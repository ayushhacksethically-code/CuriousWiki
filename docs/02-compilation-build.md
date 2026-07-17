# 🟡 02. Compilation & Build Systems (कंपाइलेशन और बिल्ड सिस्टम)

CuriousWiki एक **Static Site Generator (SSG)** model पर काम करता है. इसका मतलब यह है कि source Markdown content direct client को serve नहीं की जाती, बल्कि compilation stage के दौरान structural HTML pages में convert की जाती है. 

इस page में हम **Nim compiler** और **Node.js script compiler** के internal algorithms और working workflow को details में समझेंगे.

---

## 🛠️ 1. Compilers की तुलना (Nim vs Node.js)

CuriousWiki में compilation के दो separate modes provide किए गए हैं:
1. **Nim compiler (`build.nim`)**: यह primary fast compiler है। यह बिना किसी node runtime dependency के static pages compile करता है और automatic search index (`search/` dynamic shards) rebuild करता है।
2. **Node.js script (`build.js`)**: यह lightweight fallback build script है जो Node ecosystem libraries (`marked`, `gray-matter`) का utilization करके static HTML pages compile करता है (लेकिन search index sharding केवल Nim compiler द्वारा handle होती है)।

---

## 🚀 2. Nim Compiler (`build.nim`) Implementation

`build.nim` file clean compiled execution provide करती है. इसके core stages निम्नलिखित हैं:

### A. Custom Markdown Parser (`markdownToHtml` proc)
Nim code में lightweight state-machine parser implement किया गया है. यह line-by-line reading करके text structures को dynamic tokenize करता है:
* **Code Blocks (```)**: `inCode: bool` state trigger करके `<pre><code class="language-xyz">` inject करता है.
* **Math Blocks ($$)**: `inMath: bool` state maintain करके KaTeX supported blocks configure करता है.
* **Lists (- )**: unordered list (`<ul>` and `<li>`) create करता है.
* **Headers (#, ##, ###)**: headings structures (`<h1>`, `<h2>`, `<h3>`) create करता है.

### B. Frontmatter Extraction
Markdown content separator `---` का utilization करके headers meta-data variables parse किए जाते हैं. key-value splitting के ज़रिये `title`, `tags` और `date` parameters dynamically compile किए जाते हैं.

### C. Prefix-Sharded Search Index Generation (`buildSearchIndex` proc)
Compilation के बाद, code search directories को recreate करता है और custom sharded JSON files compile करता है:
* **Tokenization**: `wikiTokenize` proc के ज़रिये HTML tags strip (`stripHtml`) करके keywords extract किए जाते हैं और lowercase matching tokens generate होते हैं (including full Hindi Unicode support)। Common stop words को ignore किया जाता है।
* **Index Sharding**: 2-rune prefixes को hex-encoded filename string में convert करके tiny static JSON files (e.g. `search/idx/7072.json` for "pr") write की जाती हैं।
* **Metadata Chunking**: Pages की information (title, path, tags, snippet) को 100 pages per file chunks में `search/meta/` directory के अंदर save किया जाता है, ताकि client-side on-demand matching details load हो सकें।

---

## 🟢 3. Node.js Compiler (`build.js`) Fallback System

अगर local machine पर Nim compiler configured नहीं है, तब `build.js` compile scripts trigger की जा सकती है:
* **Robust Markdown Engine**: यह standard `marked` community parser use करता है जो markdown specification tables, callouts, shortcuts elements support करता है.
* **gray-matter parser**: Frontmatter block parsing standard object format map करता है.
* **Interactive CLI Organization (TTY Prompt)**:
  अगर raw directory structure (`content/`) root space में unstructured Markdown page detected होता है, तो TTY command-line check default folder placement structure options generate करता है. Developer target directory index selection interactive commands setup से control कर सकता है.
* **Fallback compilation**: SQLite FTS5 या JSON generator overheads के बिना, यह standalone simple page compilation tool का काम करता है।

---

## ⚙️ 4. Unified Server Setup (`serve.sh`)

Local dev-workflow maintain करने के लिए shell server script deploy किया गया है:
1. **Auto Rebuild check**: `serve.sh` run करने पर system first check करता है कि `nim` installation available है या नहीं. Available होने पर, automatically release compilation build `nim c -r --verbosity:0 build.nim` execute करता है.
2. **Server Port Selection**: port `8585` reserve किया जाता है.
3. **Lightweight Fallback Server Stack**:
   * **Option 1**: Python 3 runtime interpreter (`python3 -m http.server 8585`).
   * **Option 2**: pnpm node runtime package execution manager (`pnpm dlx http-server -p 8585`).
   * **Option 3**: Pure native Node.js HTTP server. `http.createServer` callback code custom dynamic MIME type definitions maps execute करता है ताकि `.html` extension paths lookup easily correct respond कर सकें.

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
* **[03. Dynamic Path Resolution (अगला चरण)](file:///home/narayanas/Documents/CuriousWiki/docs/03-path-resolution.md)**
* **[04. Client-Side SQLite WASM Search](file:///home/narayanas/Documents/CuriousWiki/docs/04-search-engine.md)**
