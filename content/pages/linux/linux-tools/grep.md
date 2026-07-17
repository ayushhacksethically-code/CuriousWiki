---
title: "🔍 Grep: Pattern Searching & Text Filtering"
date: 2026-07-05
tags: ["linux","grep","search","pattern","regex","regex","tools"]
---

Linux systems में files के contents के अंदर specific words या regular expressions (patterns) find करने के लिए **grep (Global Regular Expression Print)** command का use किया जाता है। यह guide `grep.txt` manual पर based है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Grep Synopsis

</div>

`grep [OPTIONS] PATTERNS [FILE...]`  
अगर कोई FILE parameter skip किया जाए या `-` provide किया जाए, तो grep automatically standard input (stdin) से read करता है।

</div>

</div>

## 1. Core Operations (बेसिक कमांड्स)

Normal pattern matching के लिए standard syntax:

``` bash
# Single file में exact text search करें
grep "failed" /var/log/auth.log

# Case-insensitive matching (Capital & Small characters ignore करें)
grep -i "error" /var/log/syslog

# Reverse/Invert search (जो text "success" match नहीं करते)
grep -v "success" database.csv
```

## 2. Regex Matching Modes (पैटर्न सिंटैक्स)

Grep complex patterns solve करने के लिए multiple syntax systems support करता है:

| Option | Name | Purpose & Behavior |
|----|----|----|
| `-G`, `--basic-regexp` | BRE (Basic) | Default parsing model. Special operators (`?`, `+`, `{`, `|`, `(`, `)`) को escape `\` करना पड़ता है। |
| `-E`, `--extended-regexp` | ERE (Extended) | बिना backslashes escape किये pattern matching (जैसे `+` or `|` directly work करते हैं)। Equivalent to `egrep`. |
| `-F`, `--fixed-strings` | Fixed Strings | Regex characters को parse नहीं करता, direct literal match search करता है (सबसे fast execution)। Equivalent to `fgrep`. |
| `-P`, `--perl-regexp` | PCRE (Perl) | Perl compatible advanced regex options enable करता है। |

## 3. Context Control (मैच के आगे-पीछे का डेटा)

Debug logs verify करते समय, match coordinate line के context line parameters capture करने के options:

``` bash
# Match line के बाद की 3 lines display करें (After)
grep -A 3 "NullPointerException" server.log

# Match line के पहले की 2 lines display करें (Before)
grep -B 2 "api_token_failure" auth.log

# आगे और पीछे दोनों side की lines fetch करें (Context - 2 lines)
grep -C 2 "database_reconnect" syslog
```

## 4. Output Customization (आउटपुट मोडिफायर)

Output results clean और short करने के helpers:

``` bash
# Print matches count (केवल total count number show करेगा)
grep -c "connection resets" nginx.log

# Matches के साथ file line numbers automatically print करें
grep -n "TODO" source_code.py

# केवल matching part highlight करके extract करें (पूरी line skip)
grep -o "http[s]*://[^ ]*" index.html

# सिर्फ file names print करें जिसमें pattern available है
grep -l "secret_key" config/
```

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Recursive Search (Direct Directory Scanning)

</div>

पूरा workspace folder scan करने के लिए `-r` (follow symlinks path recursively) या `-R` (follow all symlinks) flag use करें:  
`grep -rn "API_URL" ./src/`

</div>

</div>


