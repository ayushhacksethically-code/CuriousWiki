---
title: "🔍 find (search filesystem hierarchy) Command"
date: 2026-07-01
tags: ["linux","bash","find","commands","files","directories"]
---

**`find`** command Linux directories hierarchy में dynamic evaluations rules (files details like size, modification time, name expressions, owner types) के base पर targeted search operations perform करने का सबसे comprehensive tool है।

## 1. Syntax structure

``` bash
find [starting-point...] [search-conditions] [actions]
```

*(starting-point default current folder `.` assume करता है यदि empty हो।)*

## 2. Filters and Evaluator Tests (खोजने के तरीके)

आप rules combinations dynamically join operators variables configuration parameters set कर सकते हैं:

- `-name "pattern"`: Filenames matching search (e.g. `"*.sh"`). Case-insensitive search के लिए `-iname` का use करें।
- `-type [f|d|l|s]`: File type selection logic: `f` (regular file), `d` (directory), `l` (symlink).
- `-size [+/-]n`: Sizes filters setup: `+50M` (greater than 50 Megabytes), `-2k` (less than 2 Kilobytes).
- `-mtime [+/-]n`: Modification time constraints: `-7` (modified in last 7 days), `+30` (modified more than 30 days ago).
- `-perm [mode]`: Permissions bits octal validation (e.g. `-perm 644`).

## 3. Shell Executions Actions (खोजने के बाद क्या करें?)

फ़ाइलें मिलने के बाद `find` उनके साथ directly operations configure कर सकता है:

- `-print`: Default behavior - results output to stdout display.
- `-delete`: Found items को directly permanently delete logic trigger.
- `-exec [command] {} \;`: प्रत्येक output match pattern details context path replace variables (`{}`) parameters पर command execute context updates.
- `-execdir [command] {} \;`: (Highly Secure) matched subdirectory workspace path से command context launch करता है, (insecure permissions script injection points block करने के लिए recommended)।

## 4. Real-world Automation Examples

### Example 1: Find and delete temporary logs

सभी log folder matches patterns empty templates cleanup:

``` bash
find /var/log -name "*.tmp" -type f -delete
```

### Example 2: Find executable scripts in a folder

सभी shell files details checks permissions octal sets:

``` bash
find ~/scripts -type f -name "*.sh" -perm /111
```

### Example 3: Find massive files and print details

50MB से बड़ी फ़ाइलों की details dynamic console print updates:

``` bash
find /var/www -type f -size +50M -exec ls -lh {} \;
```

### Example 4: Search files changed today

``` bash
find /etc -type f -mtime 0
```


