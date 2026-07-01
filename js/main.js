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
    const isSubpage = rootPrefix !== '';
    
    function getRelativeUrl(targetPath) {
        if (targetPath === 'index.html') {
            return rootPrefix + 'index.html';
        }
        if (targetPath.startsWith('pages/')) {
            return rootPrefix + targetPath;
        }
        return rootPrefix + 'pages/' + targetPath;
    }

    // --- INITIALIZE LUCIDE ICONS ---
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // --- THEME SWITCHER ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark mode for premium look
    
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
        const icon = themeToggleBtn.querySelector('i');
        if (!icon) return;
        
        if (theme === 'dark') {
            icon.setAttribute('data-lucide', 'sun');
            icon.className = 'lucide lucide-sun';
        } else {
            icon.setAttribute('data-lucide', 'moon');
            icon.className = 'lucide lucide-moon';
        }
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // --- RESPONSIVE SIDEBAR TOGGLE ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const app = document.getElementById('app');

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                if (!sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
                    sidebar.classList.remove('active');
                }
            }
        });
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
        
        // Active tab detection
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

        // Get language class
        let lang = 'code';
        const classes = codeElement.className.split(' ');
        classes.forEach(c => {
            if (c.startsWith('language-')) {
                lang = c.replace('language-', '').toUpperCase();
            }
        });

        // Create header
        const header = document.createElement('div');
        header.className = 'code-header';
        
        const langSpan = document.createElement('span');
        langSpan.textContent = lang;
        header.appendChild(langSpan);

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i data-lucide="copy"></i> Copy';
        
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeElement.textContent);
                copyBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
                copyBtn.style.color = 'var(--accent-success)';
                copyBtn.style.borderColor = 'var(--accent-success)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i data-lucide="copy"></i> Copy';
                    copyBtn.style.color = '';
                    copyBtn.style.borderColor = '';
                    if (window.lucide) window.lucide.createIcons();
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            if (window.lucide) window.lucide.createIcons();
        });

        header.appendChild(copyBtn);
        block.insertBefore(header, codeElement);
    });

    if (window.lucide) {
        window.lucide.createIcons();
    }

    // --- CLIENT-SIDE LIVE SEARCH ENGINE (MiniSearch) ---
    let miniSearchInstance = null;
    let searchIndexLoaded = false;
    let rawIndexData = [];

    // Dynamically inject MiniSearch library from CDN
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/minisearch@7.1.1/dist/umd/index.min.js";
    script.onload = () => {
        initMiniSearch();
    };
    document.head.appendChild(script);

    // Fetch the generated search index
    async function loadSearchIndex() {
        try {
            const indexUrl = rootPrefix + 'search-index.json';
            const response = await fetch(indexUrl);
            rawIndexData = await response.json();
            searchIndexLoaded = true;
            initMiniSearch();
        } catch (err) {
            console.error("Failed to load search-index.json: ", err);
        }
    }

    function initMiniSearch() {
        if (!window.MiniSearch || !searchIndexLoaded || miniSearchInstance) return;
        
        // Add ID field for MiniSearch (MiniSearch requires unique 'id')
        const documents = rawIndexData.map((doc, idx) => ({
            id: idx,
            title: doc.title,
            path: doc.path,
            tags: doc.tags.join(' '),
            snippet: doc.snippet,
            content: doc.content
        }));

        miniSearchInstance = new window.MiniSearch({
            fields: ['title', 'tags', 'snippet', 'content'], // fields to index
            storeFields: ['title', 'path', 'tags', 'snippet'], // fields to return with search results
            searchOptions: {
                boost: { title: 3, tags: 2, snippet: 1 },
                fuzzy: 0.2,
                prefix: true
            }
        });

        miniSearchInstance.addAll(documents);
        console.log("⚡ MiniSearch initialized with", documents.length, "documents!");
    }

    // Call loadSearchIndex immediately
    loadSearchIndex();

    // Search Trigger Modal Elements
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

        function renderSearchResults(query) {
            searchResultsList.innerHTML = '';
            
            if (query === '') {
                // Show all pages by default
                const allLabel = document.createElement('li');
                allLabel.style.padding = '0.5rem 1.25rem';
                allLabel.style.fontSize = '0.75rem';
                allLabel.style.color = 'var(--text-muted)';
                allLabel.style.textTransform = 'uppercase';
                allLabel.style.fontWeight = '600';
                allLabel.textContent = 'All Pages';
                searchResultsList.appendChild(allLabel);

                rawIndexData.forEach(page => {
                    searchResultsList.appendChild(createResultItem(page));
                });
                if (window.lucide) window.lucide.createIcons();
                return;
            }

            if (!miniSearchInstance) {
                // Fallback to simple scan if MiniSearch is still loading
                const lowerQuery = query.toLowerCase();
                const filtered = rawIndexData.filter(page => {
                    return page.title.toLowerCase().includes(lowerQuery) || 
                           page.snippet.toLowerCase().includes(lowerQuery) ||
                           page.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
                });
                filtered.forEach(page => {
                    searchResultsList.appendChild(createResultItem(page));
                });
                if (window.lucide) window.lucide.createIcons();
                return;
            }

            const results = miniSearchInstance.search(query);

            if (results.length === 0) {
                const empty = document.createElement('div');
                empty.className = 'search-no-results';
                empty.innerHTML = `No results found for "<strong>${query}</strong>"`;
                searchResultsList.appendChild(empty);
                return;
            }

            results.forEach(result => {
                const tagsList = typeof result.tags === 'string' ? result.tags.split(' ') : result.tags;
                const page = {
                    title: result.title,
                    path: result.path,
                    tags: tagsList || [],
                    snippet: result.snippet
                };
                searchResultsList.appendChild(createResultItem(page));
            });

            if (window.lucide) window.lucide.createIcons();
        }

        function createResultItem(page) {
            const li = document.createElement('li');
            li.className = 'search-result-item';

            const relativeUrl = getRelativeUrl(page.path);
            
            const tagsHTML = page.tags.map(t => `<span class="result-tag">${t}</span>`).join('');

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
                    if (window.lucide) {
                        window.lucide.createIcons();
                    }
                    initializeCodeBlocks(elem);
                }
            });
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
            copyBtn.innerHTML = '<i data-lucide="copy"></i> Copy';
            
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeElement.textContent);
                    copyBtn.innerHTML = '<i data-lucide="check"></i> Copied!';
                    copyBtn.style.color = 'var(--accent-success)';
                    copyBtn.style.borderColor = 'var(--accent-success)';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i data-lucide="copy"></i> Copy';
                        copyBtn.style.color = '';
                        copyBtn.style.borderColor = '';
                        if (window.lucide) window.lucide.createIcons();
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            });

            header.appendChild(copyBtn);
            block.insertBefore(header, codeElement);
        });
        if (window.lucide) window.lucide.createIcons();
    }

    initMarkdownParser();
});
