document.addEventListener('DOMContentLoaded', () => {
    // --- PATH RESOLUTION FOR STATIC WIKI ---
    function getRootPrefix() {
        const path = window.location.pathname;
        const pagesIndex = path.indexOf('/pages/');
        if (pagesIndex === -1) {
            return '';
        }
        const subPath = path.substring(pagesIndex + 7);
        const slashCount = (subPath.match(/\//g) || []).length;
        let prefix = '../';
        for (let i = 0; i < slashCount; i++) {
            prefix += '../';
        }
        return prefix;
    }

    const rootPrefix = getRootPrefix();
    
    function getRelativeUrl(targetPath) {
        if (targetPath === 'index.html') {
            return rootPrefix + 'index.html';
        }
        if (targetPath.startsWith('pages/')) {
            return rootPrefix + targetPath;
        }
        return rootPrefix + 'pages/' + targetPath;
    }

    // --- NATIVE EMOJI/UNICODE FALLBACK FOR LUCIDE ICONS (Y2K / Zero-dependency) ---
    function replaceLucideWithEmojis() {
        const iconMap = {
            'brain': '🧠',
            'sun': '☀️',
            'moon': '🌙',
            'search': '🔍',
            'layout-dashboard': '📊',
            'book-open': '📖',
            'book': '📚',
            'pocket': '📂',
            'terminal': '💾',
            'terminal-square': '💻',
            'keyboard': '⌨️',
            'scroll': '📜',
            'git-branch': '🌿',
            'globe': '🌐',
            'cpu': '🔌',
            'book-marked': '📑',
            'clock': '⏰',
            'calendar': '📆',
            'folder': '📁',
            'folder-open': '📂',
            'user': '👤',
            'info': 'ℹ️',
            'chevron-left': '◀',
            'menu': '☰',
            'github': '🐙',
            'copy': '📋',
            'check': '✅',
            'tag': '🏷️',
            'file-text': '📄'
        };

        const icons = document.querySelectorAll('[data-lucide]');
        icons.forEach(icon => {
            const name = icon.getAttribute('data-lucide');
            if (iconMap[name]) {
                icon.textContent = iconMap[name];
                icon.style.fontStyle = 'normal';
                icon.style.display = 'inline-block';
                icon.style.marginRight = '2px';
            }
        });
    }

    // Run emoji replacement
    replaceLucideWithEmojis();

    // --- THEME SWITCHER ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light'; // Default to Windows 2000 light look
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        if (theme === 'dark') {
            themeToggleBtn.textContent = '☀️ Light';
        } else {
            themeToggleBtn.textContent = '🌙 Dark';
        }
    }

    // --- RESPONSIVE & COLLAPSIBLE SIDEBAR TOGGLE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const app = document.getElementById('app');

    if (mobileMenuBtn && sidebar && app) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth > 768) {
                app.classList.toggle('sidebar-collapsed');
            } else {
                sidebar.classList.toggle('active');
            }
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
                    sidebar.classList.remove('active');
                }
            }
        });

        // Inject the collapse button inside the sidebar-header
        const sidebarHeader = sidebar.querySelector('.sidebar-header');
        if (sidebarHeader) {
            const collapseBtn = document.createElement('button');
            collapseBtn.id = 'sidebar-collapse-btn';
            collapseBtn.className = 'theme-toggle-btn'; // Use matching Y2K button styles
            collapseBtn.title = 'Sidebar';
            collapseBtn.textContent = '◀';
            collapseBtn.style.marginRight = '4px';
            
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                sidebarHeader.insertBefore(collapseBtn, themeToggle);
            } else {
                sidebarHeader.appendChild(collapseBtn);
            }
            
            collapseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.innerWidth > 768) {
                    app.classList.add('sidebar-collapsed');
                } else {
                    sidebar.classList.remove('active');
                }
            });
        }
    }

    // --- ACTIVE SIDEBAR LINK ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentFilename = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const originalHref = link.getAttribute('href');
        let resolvedHref = '';
        if (originalHref === 'index.html') {
            resolvedHref = rootPrefix + 'index.html';
        } else if (originalHref.startsWith('pages/')) {
            resolvedHref = rootPrefix + originalHref;
        } else {
            resolvedHref = rootPrefix + 'pages/' + originalHref;
        }
        link.setAttribute('href', resolvedHref);
        
        const linkFilename = originalHref.split('/').pop();
        if (currentFilename === linkFilename) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- EDIT ON GITHUB BUTTON DYNAMIC URL ---
    const editBtn = document.getElementById('edit-btn');
    if (editBtn) {
        const githubUsername = 'ayushhacksethically-code';
        const githubRepo = 'CuriousWiki';
        const githubBranch = 'main';
        
        let filepath = '';
        const path = window.location.pathname;
        const pagesIndex = path.indexOf('/pages/');
        if (pagesIndex !== -1) {
            filepath = path.substring(pagesIndex + 1);
        } else {
            filepath = 'index.html';
        }
        
        const githubEditUrl = `https://github.com/${githubUsername}/${githubRepo}/edit/${githubBranch}/${filepath}`;
        editBtn.setAttribute('href', githubEditUrl);
    }

    // --- CODE BLOCKS COPY FUNCTIONALITY ---
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(block => {
        const codeElement = block.querySelector('code');
        if (!codeElement) return;

        let lang = 'code';
        const classes = codeElement.className.split(' ');
        classes.forEach(c => {
            if (c.startsWith('language-')) {
                lang = c.replace('language-', '').toUpperCase();
            }
        });

        const header = document.createElement('div');
        header.className = 'code-header';
        
        const langSpan = document.createElement('span');
        langSpan.textContent = lang;
        header.appendChild(langSpan);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '📋 Copy';
        
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeElement.textContent);
                copyBtn.textContent = '✅ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });

        header.appendChild(copyBtn);
        block.insertBefore(header, codeElement);
    });

    // --- CLIENT-SIDE SHARDED SEARCH ENGINE (No Node.js, No SQLite WASM, Extremely Lightweight) ---
    const indexCache = new Map();
    const metaCache = new Map();
    const ChunkSize = 100;

    function stringToHex(str) {
        const bytes = new TextEncoder().encode(str);
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function fetchJson(url) {
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            return await res.json();
        } catch (e) {
            console.error("Error fetching search shard:", url, e);
            return null;
        }
    }

    function tokenize(text) {
        const normalized = text.toLowerCase();
        // Match both English words and Hindi characters
        const regex = /[a-z0-9\u0900-\u097f]+/g;
        const matches = normalized.match(regex);
        return matches ? matches.filter(w => w.length >= 2) : [];
    }

    async function getMetaChunk(chunkIdx) {
        let chunk = metaCache.get(chunkIdx);
        if (!chunk) {
            chunk = await fetchJson(`${rootPrefix}search/meta/${chunkIdx}.json`);
            if (!chunk) chunk = [];
            metaCache.set(chunkIdx, chunk);
        }
        return chunk;
    }

    async function searchWiki(query) {
        if (!query || query.trim() === '') {
            // Default: fetch and display the first metadata chunk (pages 0-99)
            const firstChunk = await getMetaChunk(0);
            return firstChunk || [];
        }

        const tokens = tokenize(query);
        if (tokens.length === 0) return [];

        const pageMatchCounts = new Map();
        const pageTotalScores = new Map();

        // Process all search tokens
        for (const t of tokens) {
            const prefix = t.substring(0, 2);
            const prefixHex = t.length < 2 ? "short" : stringToHex(prefix);

            let shard = indexCache.get(prefixHex);
            if (shard === undefined) {
                shard = await fetchJson(`${rootPrefix}search/idx/${prefixHex}.json`);
                if (!shard) shard = {};
                indexCache.set(prefixHex, shard);
            }

            const seenInToken = new Set();
            for (const word in shard) {
                if (word.startsWith(t)) {
                    const isExact = (word === t);
                    const pids = shard[word];
                    pids.forEach(pid => {
                        if (!seenInToken.has(pid)) {
                            seenInToken.add(pid);
                            pageMatchCounts.set(pid, (pageMatchCounts.get(pid) || 0) + 1);
                            pageTotalScores.set(pid, (pageTotalScores.get(pid) || 0) + (isExact ? 10 : 3));
                        }
                    });
                }
            }
        }

        // Rank the matching page IDs
        const matchedPageIds = Array.from(pageMatchCounts.keys());
        if (matchedPageIds.length === 0) return [];

        matchedPageIds.sort((a, b) => {
            const matchesA = pageMatchCounts.get(a);
            const matchesB = pageMatchCounts.get(b);
            if (matchesA !== matchesB) {
                return matchesB - matchesA; // Prioritize pages matching more query terms
            }
            return pageTotalScores.get(b) - pageTotalScores.get(a); // Then by score
        });

        // Limit results to top 50
        const topPageIds = matchedPageIds.slice(0, 50);

        // Batch fetch needed metadata chunks
        const neededChunks = new Set();
        topPageIds.forEach(pid => {
            neededChunks.add(Math.floor(pid / ChunkSize));
        });

        await Promise.all(Array.from(neededChunks).map(chunkIdx => getMetaChunk(chunkIdx)));

        // Compile results list
        const results = [];
        for (const pid of topPageIds) {
            const chunkIdx = Math.floor(pid / ChunkSize);
            const chunk = metaCache.get(chunkIdx);
            if (chunk) {
                const page = chunk.find(p => p.id === pid);
                if (page) {
                    results.push({
                        title: page.title,
                        path: page.path,
                        tags: page.tags,
                        snippet: page.snippet
                    });
                }
            }
        }

        return results;
    }

    const searchTrigger = document.getElementById('search-trigger');
    const searchModal = document.getElementById('search-modal');
    const searchModalClose = document.getElementById('search-modal-close');
    const searchInput = document.getElementById('search-input');
    const searchResultsList = document.getElementById('search-results');

    if (searchTrigger && searchModal && searchInput && searchResultsList) {
        const openSearch = () => {
            searchModal.classList.add('active');
            searchInput.value = '';
            renderSearchResults('');
            setTimeout(() => searchInput.focus(), 50);
        };

        const closeSearch = () => {
            searchModal.classList.remove('active');
        };

        searchTrigger.addEventListener('click', openSearch);
        if (searchModalClose) searchModalClose.addEventListener('click', closeSearch);

        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                closeSearch();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSearch();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }
        });

        searchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value.trim());
        });

        let latestSearchQuery = "";

        async function renderSearchResults(query) {
            latestSearchQuery = query;
            const results = await searchWiki(query);
            if (results === null) return;
            if (query !== latestSearchQuery) return; 

            searchResultsList.innerHTML = '';
            
            if (query === '') {
                const allLabel = document.createElement('li');
                allLabel.style.padding = '4px 6px';
                allLabel.style.fontSize = '10px';
                allLabel.style.color = 'var(--text-muted)';
                allLabel.style.textTransform = 'uppercase';
                allLabel.style.fontWeight = 'bold';
                allLabel.textContent = 'All Pages';
                searchResultsList.appendChild(allLabel);
            }

            if (results.length === 0) {
                if (query !== '') {
                    const empty = document.createElement('div');
                    empty.className = 'search-no-results';
                    empty.innerHTML = `No results found for "<strong>${query}</strong>"`;
                    searchResultsList.appendChild(empty);
                }
                return;
            }

            results.forEach(result => {
                searchResultsList.appendChild(createResultItem(result));
            });

            replaceLucideWithEmojis();
        }

        function createResultItem(page) {
            const li = document.createElement('li');
            li.className = 'search-result-item';

            const relativeUrl = getRelativeUrl(page.path);
            const tagsHTML = page.tags.filter(t => t.trim() !== '').map(t => `<span class="result-tag">${t}</span>`).join('');

            li.innerHTML = `
                <a href="${relativeUrl}">
                    <div class="result-title">
                        <i data-lucide="file-text"></i>
                        <span>${page.title}</span>
                    </div>
                    <div class="result-snippet">${page.snippet}</div>
                    <div class="result-tags">${tagsHTML}</div>
                </a>
            `;
            return li;
        }
    }

    // --- DYNAMIC MARKDOWN PARSER (marked.js) ---
    function initMarkdownParser() {
        const mdElements = document.querySelectorAll('.markdown-content, [data-markdown="true"]');
        if (mdElements.length === 0) return; 
        
        const markedScript = document.createElement('script');
        markedScript.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
        markedScript.onload = () => {
            mdElements.forEach(elem => {
                const rawMarkdown = elem.textContent || elem.innerText;
                if (window.marked) {
                    elem.innerHTML = window.marked.parse(rawMarkdown);
                    initializeCodeBlocks(elem);
                }
            });
            replaceLucideWithEmojis();
        };
        document.head.appendChild(markedScript);
    }

    function initializeCodeBlocks(container) {
        const codeBlocks = container.querySelectorAll('pre');
        codeBlocks.forEach(block => {
            if (block.querySelector('.code-header')) return;
            const codeElement = block.querySelector('code');
            if (!codeElement) return;

            let lang = 'code';
            const classes = codeElement.className.split(' ');
            classes.forEach(c => {
                if (c.startsWith('language-')) {
                    lang = c.replace('language-', '').toUpperCase();
                }
            });

            const header = document.createElement('div');
            header.className = 'code-header';
            
            const langSpan = document.createElement('span');
            langSpan.textContent = lang;
            header.appendChild(langSpan);

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '📋 Copy';
            
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeElement.textContent);
                    copyBtn.textContent = '✅ Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = '📋 Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            });

            header.appendChild(copyBtn);
            block.insertBefore(header, codeElement);
        });
    }

    // --- DYNAMIC KATEX LOADER ---
    function loadKaTeX() {
        // Only load KaTeX if we detect math content on the page (saves bandwidth on 3G)
        const hasMath = document.body.innerText.includes('$$') || 
                        document.querySelector('.math-block') || 
                        document.body.innerText.match(/\$[^\$]+\$/);
        if (!hasMath) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
        document.head.appendChild(link);

        const scriptKaTeX = document.createElement('script');
        scriptKaTeX.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
        scriptKaTeX.defer = true;
        
        scriptKaTeX.onload = () => {
            const scriptAutoRender = document.createElement('script');
            scriptAutoRender.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js';
            scriptAutoRender.defer = true;
            
            scriptAutoRender.onload = () => {
                if (window.renderMathInElement) {
                    window.renderMathInElement(document.body, {
                        delimiters: [
                            {left: '$$', right: '$$', display: true},
                            {left: '$', right: '$', display: false},
                            {left: '\\(', right: '\\)', display: false},
                            {left: '\\[', right: '\\]', display: true}
                        ],
                        throwOnError: false
                    });
                }
            };
            document.head.appendChild(scriptAutoRender);
        };
        document.head.appendChild(scriptKaTeX);
    }

    initMarkdownParser();
    loadKaTeX();
});
