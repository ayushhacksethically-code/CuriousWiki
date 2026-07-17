---
title: "🛠️ Linux CLI Power Tools"
date: 2026-06-30
tags: ["linux","terminal","tools","curl","htop","grep","network","shells"]
---

system resources monitor करने, network logs check करने, और text manipulate करने के लिए essential command-line tools की reference bible.

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Interactive Shells Guide

</div>

Linux, Windows और macOS में उपयोग होने वाले अलग-अलग shells (जैसे Bash, Zsh, PowerShell, Fish, dash, ksh) के बारे में विस्तार से जानने के लिए <a href="shell/index.html" class="wiki-link">Shells Guide</a> देखें।

</div>

</div>

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Specialized Tool Guides

</div>

BASH utilities, system automation, and setup scripts ko check aur customize karne ke liye humari interactive guides padhein:

- <a href="alias.html" class="wiki-link">⚡ BASH Builtins &amp; Aliases</a>
- <a href="grep.html" class="wiki-link">🔍 Grep Pattern Matching</a>
- <a href="awk.html" class="wiki-link">📊 AWK Text Processing</a>
- <a href="aur-helpers.html" class="wiki-link">📦 AUR Helpers (yay &amp; paru)</a>
- <a href="cron.html" class="wiki-link">⏰ Cron Jobs Automation</a>
- <a href="alacritty.html" class="wiki-link">🖥️ Alacritty Terminal Setup</a>
- <a href="acme-sh.html" class="wiki-link">🛡️ Acme.sh Let's Encrypt SSL</a>

</div>

</div>

## 1. System Monitoring (Resource Checks)

CPU, memory, processes, और startup diagnostics monitor करने के tools:

``` bash
# interactive process viewer open karein
htop

# current system hardware details check karein
fastfetch

# disk space storage distribution list show karein
df -h

# free RAM capacity check karein
free -m
```

## 2. Searching & Text Filtering (grep, ripgrep)

Directories, text database records, aur config files search करने के modern commands:

``` bash
# pattern files me check karein
grep "error_code" /var/log/syslog

# compile folder path files search recursively (ripgrep)
rg --files-with-matches "import"

# fast filename search inside directories (fd)
fd "style.css"
```

## 3. Networking Utilities (Ports & Connections)

Active ports identify करने, server connect testing, और sockets check करने के commands:

``` bash
# active socket connections state list karein (network ports)
ss -tulpn

# ip configuration list show karein
ip a

# target network url response print fetch
curl -I https://github.com
```


