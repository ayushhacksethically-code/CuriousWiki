---
title: "📟 Commands Index"
date: 2026-07-13
tags: ["commands","index","bash","linux","reference"]
---

CuriousWiki में उपलब्ध सभी commands के individual guides का index। आप नीचे दिए गए search bar या tabs का उपयोग करके commands को filter कर सकते हैं।

<div class="cmd-search-container">
    <input type="text" id="cmd-search" class="cmd-search-input" placeholder="Commands filter करें...">
</div>

<div class="cmd-filter-tabs">
    <button class="cmd-filter-tab active" data-category="all">All</button>
    <button class="cmd-filter-tab" data-category="file">File Operation (फ़ाइल संचालन)</button>
    <button class="cmd-filter-tab" data-category="search">Search & Filter (खोज और फ़िल्टर)</button>
    <button class="cmd-filter-tab" data-category="system">System & Auto (सिस्टम और स्वचालन)</button>
</div>

<div class="dashboard-grid">

  <div class="dashboard-card" data-name="pwd" data-category="file" data-desc="Linux directory tree में current active path/folder का location print करता है।">
    <div class="card-icon"><i data-lucide="folder"></i></div>
    <div class="card-title">pwd</div>
    <p class="card-desc">Linux directory tree में current active path/folder का location print करता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/pwd.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="ls" data-category="file" data-desc="Current या specified directory के अंदर की files और folders की list दिखाता है।">
    <div class="card-icon"><i data-lucide="list"></i></div>
    <div class="card-title">ls</div>
    <p class="card-desc">Current या specified directory के अंदर की files और folders की list दिखाता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/ls.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="cd" data-category="file" data-desc="Directory navigation को संभालता है, यानी एक folder से दूसरे folder में जाने के काम आता है।">
    <div class="card-icon"><i data-lucide="arrow-right-left"></i></div>
    <div class="card-title">cd</div>
    <p class="card-desc">Directory navigation को संभालता है, यानी एक folder से दूसरे folder में जाने के काम आता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/cd.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="echo" data-category="file" data-desc="Terminal screen (standard output) पर text या variable values को print करने के लिए use होता है।">
    <div class="card-icon"><i data-lucide="terminal"></i></div>
    <div class="card-title">echo</div>
    <p class="card-desc">Terminal screen (standard output) पर text या variable values को print करने के लिए use होता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/echo.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="mkdir" data-category="file" data-desc="Filesystem में नए empty folders (directories) create करने के काम आता है।">
    <div class="card-icon"><i data-lucide="folder-plus"></i></div>
    <div class="card-title">mkdir</div>
    <p class="card-desc">Filesystem में नए empty folders (directories) create करने के काम आता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/mkdir.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="touch" data-category="file" data-desc="खाली फ़ाइलें (empty files) बनाने और timestamps (modify/access times) को update करने के लिए।">
    <div class="card-icon"><i data-lucide="file-plus"></i></div>
    <div class="card-title">touch</div>
    <p class="card-desc">खाली फ़ाइलें (empty files) बनाने और timestamps (modify/access times) को update करने के लिए।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/touch.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="rm" data-category="file" data-desc="Operating system से files और folders को permanently delete करने के लिए use होता है।">
    <div class="card-icon"><i data-lucide="trash-2"></i></div>
    <div class="card-title">rm</div>
    <p class="card-desc">Operating system से files और folders को permanently delete करने के लिए use होता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/rm.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="rmdir" data-category="file" data-desc="केवल खाली folders (empty directories) को filesystem से सुरक्षित हटाने के काम आता है।">
    <div class="card-icon"><i data-lucide="folder-minus"></i></div>
    <div class="card-title">rmdir</div>
    <p class="card-desc">केवल खाली folders (empty directories) को filesystem से सुरक्षित हटाने के काम आता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/rmdir.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="mv" data-category="file" data-desc="Files/folders का नाम बदलने (Rename) या उन्हें एक जगह से दूसरी जगह transfer करने के लिए।">
    <div class="card-icon"><i data-lucide="move"></i></div>
    <div class="card-title">mv</div>
    <p class="card-desc">Files/folders का नाम बदलने (Rename) या उन्हें एक जगह से दूसरी जगह transfer करने के लिए।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/mv.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="cp" data-category="file" data-desc="Files और folders का duplication/replica create करने के लिए उपयोग किया जाता है।">
    <div class="card-icon"><i data-lucide="copy"></i></div>
    <div class="card-title">cp</div>
    <p class="card-desc">Files और folders का duplication/replica create करने के लिए उपयोग किया जाता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/cp.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="cat" data-category="file" data-desc="Files के content को screen पर print करने, files merge करने और file create करने में use होता है।">
    <div class="card-icon"><i data-lucide="file-text"></i></div>
    <div class="card-title">cat</div>
    <p class="card-desc">Files के content को screen पर print करने, files merge करने और file create करने में use होता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/cat.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="less" data-category="file" data-desc="Files के contents को screen by screen/page by page interactively view करने के काम आता है।">
    <div class="card-icon"><i data-lucide="book-open"></i></div>
    <div class="card-title">less</div>
    <p class="card-desc">Files के contents को screen by screen/page by page interactively view करने के काम आता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/less.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="tail" data-category="file" data-desc="Files के आखिरी हिस्से (अंतिम 10 lines) या real-time dynamic logs को read करने के काम आता है।">
    <div class="card-icon"><i data-lucide="file-text"></i></div>
    <div class="card-title">tail</div>
    <p class="card-desc">Files के आखिरी हिस्से (अंतिम 10 lines) या real-time dynamic logs को read करने के काम आता है।</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/tail.html">Guide खोलें →</a>
      <span>File Operation</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="find" data-category="search" data-desc="Expression rules (size, time, name pattern) के base पर file search करने का शक्तिशाली tool.">
    <div class="card-icon"><i data-lucide="search"></i></div>
    <div class="card-title">find</div>
    <p class="card-desc">Expression rules (size, time, name pattern) के base पर file search करने का शक्तिशाली tool.</p>
    <div class="card-footer">
      <a href="linux/bash/files-directories/find.html">Guide खोलें →</a>
      <span>Search & Filter</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="grep" data-category="search" data-desc="Files के content के अंदर specific words या regular expressions (patterns) find करता है।">
    <div class="card-icon"><i data-lucide="search"></i></div>
    <div class="card-title">grep</div>
    <p class="card-desc">Files के content के अंदर specific words या regular expressions (patterns) find करता है।</p>
    <div class="card-footer">
      <a href="linux/linux-tools/grep.html">Guide खोलें →</a>
      <span>Search & Filter</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="awk" data-category="search" data-desc="Logs analysis और tabular data formatting के लिए records/fields parse करने वाला scripting engine।">
    <div class="card-icon"><i data-lucide="terminal"></i></div>
    <div class="card-title">awk</div>
    <p class="card-desc">Logs analysis और tabular data formatting के लिए records/fields parse करने वाला scripting engine।</p>
    <div class="card-footer">
      <a href="linux/linux-tools/awk.html">Guide खोलें →</a>
      <span>Search & Filter</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="cron" data-category="system" data-desc="Predefined intervals पर scripts को background execution (cron jobs) के लिए configure करता है।">
    <div class="card-icon"><i data-lucide="clock"></i></div>
    <div class="card-title">cron</div>
    <p class="card-desc">Predefined intervals पर scripts को background execution (cron jobs) के लिए configure करता है।</p>
    <div class="card-footer">
      <a href="linux/linux-tools/cron.html">Guide खोलें →</a>
      <span>System & Auto</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="alias" data-category="system" data-desc="BASH shell के अंदर long commands के लिए shortcuts (aliases) और builtins configure करने की विधि।">
    <div class="card-icon"><i data-lucide="terminal"></i></div>
    <div class="card-title">alias</div>
    <p class="card-desc">BASH shell के अंदर long commands के लिए shortcuts (aliases) और builtins configure करने की विधि।</p>
    <div class="card-footer">
      <a href="linux/linux-tools/alias.html">Guide खोलें →</a>
      <span>System & Auto</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="yay / paru" data-category="system" data-desc="Arch User Repository (AUR) packages को easily search, build, install और update करने के helpers.">
    <div class="card-icon"><i data-lucide="pocket"></i></div>
    <div class="card-title">yay / paru</div>
    <p class="card-desc">Arch User Repository (AUR) packages को easily search, build, install और update करने के helpers.</p>
    <div class="card-footer">
      <a href="linux/linux-tools/aur-helpers.html">Guide खोलें →</a>
      <span>System & Auto</span>
    </div>
  </div>

  <div class="dashboard-card" data-name="acme.sh" data-category="system" data-desc="Pure Unix shell script-based Let's Encrypt client जो domain SSL certificates automate करता है।">
    <div class="card-icon"><i data-lucide="shield-check"></i></div>
    <div class="card-title">acme.sh</div>
    <p class="card-desc">Pure Unix shell script-based Let's Encrypt client जो domain SSL certificates automate करता है।</p>
    <div class="card-footer">
      <a href="linux/linux-tools/acme-sh.html">Guide खोलें →</a>
      <span>System & Auto</span>
    </div>
  </div>

</div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('cmd-search');
        const filterTabs = document.querySelectorAll('.cmd-filter-tab');
        const cmdCards = document.querySelectorAll('.dashboard-card');

        function filterCommands() {
            const query = searchInput.value.toLowerCase().trim();
            const activeTabElement = document.querySelector('.cmd-filter-tab.active');
            const activeTab = activeTabElement ? activeTabElement.dataset.category : 'all';

            cmdCards.forEach(card => {
                const name = card.dataset.name.toLowerCase();
                const desc = card.dataset.desc.toLowerCase();
                const category = card.dataset.category;

                const matchesSearch = name.includes(query) || desc.includes(query);
                const matchesTab = activeTab === 'all' || category === activeTab;

                if (matchesSearch && matchesTab) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', filterCommands);
        }

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                filterCommands();
            });
        });
    });
</script>
