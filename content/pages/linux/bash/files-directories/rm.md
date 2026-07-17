---
title: "🗑️ rm (remove files or directories) Command"
date: 2026-07-01
tags: ["linux","bash","rm","commands","files","directories"]
---

**`rm` (Remove)** command का उपयोग Linux operating system से files और directories को permanent delete करने के लिए किया जाता है।

<div class="callout callout-danger">
<i data-lucide="skull"></i>
<div class="callout-content">

<div class="callout-title">

🚨 WARNING: No Recycle Bin

</div>

Linux CLI/terminal में `rm` से delete की गई files Windows की तरह "Recycle Bin" या "Trash" में नहीं जातीं। ये permanent delete होती हैं, इसलिए इसका उपयोग बहुत सावधानी से करें!

</div>

</div>

## 1. Syntax

``` bash
rm [options] file_name(s)
```

## 2. Key Options & Safety Flags

- `-f`, `--force`: बिना किसी prompt/confirmation के सीधे force delete करता है। अगर फ़ाइल मौजूद नहीं है, तो भी कोई error warning नहीं दिखाता।
- `-i`: **Interactive Mode:** हर एक file को delete करने से पहले user से confirmation (yes/no) मांगता है। (accidental deletions से बचने के लिए उत्तम)।
- `-I`: अगर आप 3 से अधिक files या recursive directories को delete कर रहे हैं, तो केवल **एक बार** confirm prompt पूछेगा (less annoying than `-i`).
- `-r`, `-R`, `--recursive`: Folder को उसके अंदर के सभी contents (files/sub-folders) सहित recursively delete करने के लिए। (directories हटाने के लिए यह flag अनिवार्य है)।
- `--`: Hyphen prefix वाली tricky files (जैसे `-myfile.txt`) को safely delete करने के लिए delimiter mapping.

## 3. Safe Deletion Examples

### Example 1: Safe deletion using interactive checks

गलतियों से बचने के लिए command line पर `-i` use करें:

``` bash
rm -i config.json
# Prompt: rm: remove regular file 'config.json'? y/n
```

### Example 2: Remove a folder recursively (Force delete)

यह command बहुत common है, पर ध्यान से चलाएँ (विशेषकर permissions permissions root levels पर):

``` bash
rm -rf tmp_projects/
```

### Example 3: Tricky filenames starting with hyphen

अगर आपने गलती से `-file.txt` नाम की file बना ली है, तो normal `rm -file.txt` इसे command logic flag समझकर error देगा। इसे ऐसे delete करें:

``` bash
rm -- -file.txt
# OR
rm ./-file.txt
```


