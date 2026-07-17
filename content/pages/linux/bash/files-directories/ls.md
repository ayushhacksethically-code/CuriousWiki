---
title: "📂 ls (list directory contents) Command"
date: 2026-07-01
tags: ["linux","bash","ls","commands","files","directories"]
---

**`ls`** command Linux में सबसे ज़्यादा इस्तेमाल होने वाली commands में से एक है। इसका काम current या specified directory के अंदर की files और folders की list दिखाना है।

## 1. Syntax

``` bash
ls [OPTION]... [FILE]...
```

## 2. Useful Options & Flags (उपयोगी विकल्प)

बिना किसी flags के `ls` सिर्फ filenames को simple columns में दिखाता है। इसके behavior को customize करने के लिए ये flags बहुत काम आते हैं:

| Option Flag | Description / Behavior |
|----|----|
| `-a`, `--all` | **Hidden files:** उन सभी files को भी दिखाता है जो `.` से शुरू होती हैं (जैसे `.bashrc`)। |
| `-A`, `--almost-all` | Hidden files दिखाता है, पर `.` (current directory) और `..` (parent directory) को skip कर देता है। |
| `-l` | **Long Listing:** detailed view दिखाता है (permissions, links count, owner, group, file size, modification date, and filename)। |
| `-h`, `--human-readable` | File sizes को bytes के बजाय readable format (जैसे 4K, 250M, 1.2G) में दिखाता है (इसे `-l` के साथ combine किया जाता है)। |
| `-t` | Files को **Modification Time** के हिसाब से sort करता है (हाल ही में modified files सबसे ऊपर)। |
| `-S` | Files को **Size** के हिसाब से sort करता है (सबसे बड़ी file सबसे ऊपर)। |
| `-F`, `--classify` | फ़ाइलों के प्रकार को पहचानने के लिए अंत में symbols जोड़ता है (जैसे directories के लिए `/`, executable files के लिए `*`, symlinks के लिए `@`)। |
| `-R`, `--recursive` | Subdirectories के अंदर की फ़ाइलों को भी recursively list करता है। |

## 3. Hand-on Command Examples

### Example 1: Detailed Hidden File List (The Developer Special)

ज़्यादातर developers terminal खोलते ही यह command चलाते हैं ताकि hidden configurations और sizes को human-readable format में detailed देख सकें:

``` bash
ls -lah
```

### Example 2: Sort Files by Size to Find Big Files

अगर आपकी disk space full हो रही है और आप देखना चाहते हैं कि current folder में कौन सी files सबसे भारी हैं:

``` bash
ls -lhS
```

### Example 3: Inspect Folder Permissions (Not Contents)

अगर आप किसी folder के अंदर की फ़ाइलों को नहीं, बल्कि खुद उस folder की metadata/permissions देखना चाहते हैं, तो `-d` flag का उपयोग करें:

``` bash
ls -ld /var/www/html
```


