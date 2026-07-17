---
title: "🐚 GNU Bash (Bourne Again Shell)"
date: 2026-07-01
tags: ["linux","shell","bash","gnu","brian fox","chet ramey","shellshock","keybindings","emacs mode"]
---

**GNU Bash (Bourne Again Shell)** Unix-like operating systems के लिए एक command interpreter और command language shell है। इसे 1989 में **Brian Fox** ने GNU Project के लिए Bourne shell (`sh`) के open-source replacement के रूप में develop किया था। वर्तमान में इसके development maintainer **Chet Ramey** हैं।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Timeline Trivia

</div>

1991 में, Linux kernel development के शुरुआती दिनों में **Linus Torvalds** ने GCC compiler के साथ जिन चुनिंदा programs को सबसे पहले Linux पर port किया था, उनमें BASH प्रमुख था।

</div>

</div>

## 1. Core Specifications & Variables (मूल विशेषताएँ)

- **Dynamically Typed & Case-Sensitive:** Bash script variable name, filename, और parameter processing structural स्तर पर completely case-sensitive होती है।
- **Zero-based Numbering:** Arrays और internal lists data parsing default 0-index parameter पर आधारित होती है।
- **Syntactical Superset:** Bash, Bourne shell (`sh`) का superset है। इसलिए, regular `sh` scripts बिना किसी modifications के directly Bash interpreter पर run हो सकती हैं।

## 2. Readline Keybindings (कंट्रोल की-कॉम्बिनेशन)

Interactive shells में cursor movement और command history tracking के लिए custom short-cuts default रूप से **Emacs configuration** को use करते हैं:

### Cursor Movement & Search Hooks

| Keypress Short-cut | Emacs Default Action |
|----|----|
| <span class="kbd">Tab</span> | Programmable autocomplete suggestion activate करना। |
| <span class="kbd">Ctrl</span> + <span class="kbd">R</span> | Command history database में reverse search (खोज) करना। |
| <span class="kbd">Ctrl</span> + <span class="kbd">A</span> | Cursor को current commandline के **शुरुआत (beginning)** में ले जाना। |
| <span class="kbd">Ctrl</span> + <span class="kbd">E</span> | Cursor को current commandline के **अंत (end)** में ले जाना। |
| <span class="kbd">Ctrl</span> + <span class="kbd">B</span> | Cursor को एक character **पीछे (left)** ले जाना। |
| <span class="kbd">Ctrl</span> + <span class="kbd">F</span> | Cursor को एक character **आगे (right)** ले जाना। |
| <span class="kbd">Alt</span> + <span class="kbd">B</span> | Cursor को एक शब्द (word) **पीछे (left)** ले जाना। |
| <span class="kbd">Alt</span> + <span class="kbd">F</span> | Cursor को एक शब्द (word) **आगे (right)** ले जाना। |
| <span class="kbd">Ctrl</span> + <span class="kbd">W</span> | Cursor के बाईं (left) तरफ के एक पूरे word को erase/cut करना। |

यदि आप **Vi text editor styles** use करना चाहते हैं, तो terminal runtime पर configuration set कर सकते हैं:

``` bash
# Enable Vi keys in interactive Bash
set -o vi

# Switch back to default Emacs keys
set -o emacs
```

## 3. Shell Execution Modes (शेल मोड्स)

Bash standard features के अतिरिक्त runtime environments security constraints apply करने के लिए separate execution modes support करता है:

### ⚫ 1. Restricted Mode

यह user activity monitoring और system environment security को lock down करने के काम आता है। इसे `set -r` या shell executable `rbash` के ज़रिये run किया जाता है। इसके enabled होने पर निम्न activities block हो जाती हैं:

- `cd` command का use करके current directory change करना।
- `$PATH`, `$SHELL`, या `$ENV` variables की values modify करना।
- Command options में absolute paths या `/` (slash characters) specify करना।
- Output redirection operators (`>`, `>>`) का block होना।

### ⚫ 2. Privileged Mode

इसे `set -p` flag से activate किया जाता है। इस mode में Bash startup profiles (`$BASH_ENV`) को read नहीं करता, environment level function configurations को bypass करता है, और user ID manipulation hooks check करता है।

### ⚫ 3. Compatibility Modes

अलग-अलग bash versions (जैसे version 3.1, 4.0, आदि) के behaviors maintain करने के लिए `shopt` (shell options) configuration switch use की जाती है:

``` bash
# Enable compatibility behavior for version 4.0
shopt -s compat40
```

## 4. The Shellshock Vulnerability (CVE-2014-6271)

सितंबर 2014 में Bash parsing engine में एक critical security bug खोजा गया, जिसे **Shellshock** नाम दिया गया।

- **The Core Issue:** यह bug environment variables processing level पर function definitions के processing logic में था। Bash environment variables में function headers के बाद parse होने वाले arbitrary raw command syntax को evaluate कर देता था।
- **Risk Impact:** इसके कारण remote system exploitation vectors (जैसे HTTP Apache CGI scripts, OpenSSH connections, DHCP scripts) पर **arbitrary code execution** की गंभीर vulnerability उत्पन्न हुई।
- यह bug version 1.03 (1989) से source base में मौजूद था और version 4.3 (2014) में patch release के ज़रिये resolve किया गया।

## 5. Licensing Shifts & macOS Migration

GNU Project ने Bash 4.0 (2009) release से software license policy बदलकर **GPL-3.0-or-later** कर दी थी।

Apple computers (macOS) traditional licenses standard compatibility के कारण macOS Mojave तक केवल पुराने Bash version 3.2 (GPL-2.0) को default backend terminal में use करते रहे। जून 2019 (macOS Catalina) में Apple ने security licensing constraints के कारण terminal transition command structure redirect करके **Z Shell (zsh)** को default login shell बना दिया।


