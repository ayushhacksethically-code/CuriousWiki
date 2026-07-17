---
title: "🚚 mv (move / rename files) Command"
date: 2026-07-01
tags: ["linux","bash","mv","commands","files","directories"]
---

**`mv` (Move)** command का उपयोग Linux में दो मुख्य कामों के लिए किया जाता है: 1) files और directories का नाम बदलने (Rename) के लिए, और 2) उन्हें एक directory से दूसरी directory में Transfer (Move) करने के लिए।

## 1. Syntax

``` bash
# Rename files
mv SOURCE DEST

# Move files to a directory
mv SOURCE... DIRECTORY
```

## 2. Key Options & Flags

- `-i`, `--interactive`: Overwrite safeguard. यदि destination directory में same name की file पहले से मौजूद है, तो overwriting से पहले prompt validation confirmation पूछता है।
- `-f`, `--force`: Overwrite warnings bypass. Prompt validation warnings disable करके without confirmation updates.
- `-n`, `--no-clobber`: Safe block. Same file references target paths पर existing files को replace नहीं करता (overwriting disable).
- `-u`, `--update`: **Conditional update:** केवल तभी overwrite करता है जब source file, destination path file से **नई (newer)** हो, या file missing हो।

## 3. Renaming & Moving Examples

### Example 1: Renaming a File

Linux में file rename करने की कोई separate command नहीं होती; `mv` ही यह काम करता है:

``` bash
mv script.sh run_backup.sh
```

### Example 2: Moving Multiple Files to a folder

``` bash
mv index.html styles.css main.js public/
```

### Example 3: Safe interactive moves

``` bash
mv -i config.json database/
# Prompt (if config.json already exists in database/):
# mv: overwrite 'database/config.json'? y/n
```

### Example 4: Update only (Newer files migration)

``` bash
mv -u source_docs/* backup_docs/
```


