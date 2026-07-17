# 🟡 03. Dynamic Path Resolution (डायनामिक पाथ रेजोल्यूशन)

एक standard static website builder में सबसे बड़ी समस्या (challenge) pages की **Directory Depth** होती है. उदाहरण के लिए:
* Home Dashboard `index.html` root directory (`/`) पर स्थित है.
* Getting Started guide `pages/getting-started.html` एक level deep (`/pages/`) है.
* BASH script page `pages/linux/bash/scripting.html` तीन level deep (`/pages/linux/bash/`) है.

यदि हम links में absolute path (जैसे `/css/style.css`) hardcode करते हैं, तो system local system directory या sub-folder structure deployment (जैसे GitHub Pages `https://username.github.io/CuriousWiki/`) पर completely break हो जाता है. 

इस guide में हम सीखेंगे कि CuriousWiki **Compile-Time** और **Client-Side Runtime** दोनों levels पर relative paths को dynamic resolving कैसे करता है.

---

## ⚙️ 1. Compile-Time Depth Resolution (कंपाइल-टाइम पाथ प्रीफिक्स)

जब compiler (`build.nim` या `build.js`) markdown to HTML rendering execution process trigger करता है, तो वह target directory depth identify करता है:

### algorithm logic:
1. `content/` source directory से dynamic file path parse किया जाता है.
2. File path depth calculate की जाती है (कितने sub-folders nested हैं).
3. **`relativePrefix` generation pattern**:
   ```javascript
   function getRelativePrefix(depth) {
       return '../'.repeat(depth + 1);
   }
   ```
4. HTML template render variables replace किए जाते हैं:
   - `href="../css/style.css"` replace होकर `${prefix}css/style.css` बनता है.
   - `src="../js/main.js"` replace होकर `${prefix}js/main.js` बनता है.
   - Logo references और images references custom dynamically set reference path adjust करते हैं.

---

## 💻 2. Client-Side Runtime Resolution (क्लाइंट-साइड पाथ रेजोल्यूशन)

Browser layout rendering के समय JavaScript module `js/main.js` core dynamically client path calculates executes करता है. इससे navigation sidebar runtime links active setup control correct direction में routes updates calculate करता है:

### `getRootPrefix()` function details:
```javascript
function getRootPrefix() {
    const path = window.location.pathname;
    const pagesIndex = path.indexOf('/pages/');
    if (pagesIndex === -1) {
        return ''; // Root files (like index.html) handle custom links direct
    }
    const subPath = path.substring(pagesIndex + 7);
    const slashCount = (subPath.match(/\//g) || []).length;
    let prefix = '../';
    for (let i = 0; i < slashCount; i++) {
        prefix += '../';
    }
    return prefix;
}
```

### runtime evaluation example:
अगर path `/CuriousWiki/pages/linux/linux-tools/shell/powershell.html` है:
* `/pages/` check pass हो जाता है. index find sequence start content `linux/linux-tools/shell/powershell.html` parse करता है.
* Slashes count calculation: `linux/linux-tools` first slashes, `linux-tools/shell` second slashes, `shell/powershell.html` third slashes. Total `/` count (slashCount) = 3.
* Prefix loops run target count repeat values return `../../../../` dynamic.
* This returns absolute link paths dynamically and references load flawlessly!

---

## 🚀 3. Dynamic URLs & Assets Resolved

Dynamic relative `rootPrefix` variable calculation sequence runtime UI elements update variables handle करता है:

1. **Logo Image injection**:
   ```javascript
   logoImg.src = rootPrefix + 'images/logo.png';
   ```
2. **Navigation Sidebar links resolution (`getRelativeUrl`)**:
   ```javascript
   function getRelativeUrl(targetPath) {
       if (targetPath === 'index.html') {
           return rootPrefix + 'index.html';
       }
       if (targetPath.startsWith('pages/')) {
           return rootPrefix + targetPath;
       }
       return rootPrefix + 'pages/' + targetPath;
   }
   ```
3. **Web Worker module execution mapping**:
   ```javascript
   const workerPath = rootPrefix + 'js/search-worker.js';
   searchWorker = new Worker(workerPath);
   ```

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
* **[01. Architecture Overview](file:///home/narayanas/Documents/CuriousWiki/docs/01-architecture-overview.md)**
* **[04. Client-Side SQLite WASM Search (नेक्स्ट लेवल)](file:///home/narayanas/Documents/CuriousWiki/docs/04-search-engine.md)**
