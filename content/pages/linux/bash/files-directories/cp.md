---
title: "📋 cp (copy files and directories) Command"
date: 2026-07-01
tags: ["linux","bash","cp","commands","files","directories"]
---

**`cp` (Copy)** command का उपयोग files और folders (directories) का duplication/replications create करने के लिए किया जाता है।

## 1. Syntax

``` bash
cp [options] SOURCE DEST
cp [options] SOURCE... DIRECTORY
```

## 2. Important Options & Flags

- `-r`, `-R`, `--recursive`: Folder को उसके sub-folders और files सहित copy करने के लिए (directories copy करने के लिए यह flag लगाना ज़रूरी है)।
- `-a`, `--archive`: **Backups के लिए बेस्ट flag!** यह recursive copy करता है और file permissions, ownership permissions, timestamps, और symlinks को **exact preserve** रखता है (कोई modifications नहीं)।
- `-i`, `--interactive`: यदि destination path पर same filename match करता है, तो overwriting confirmation prompt windows warning show.
- `-p`: owner, group, permissions, timestamps, mode parameters checks exact preserve.
- `-s`, `--symbolic-link`: data write logic copy करने के बजाय shortcut paths symlinks link commands.

## 3. Copy Operations Examples

### Example 1: Copy file and rename

``` bash
cp config.json config.json.bak
```

### Example 2: Safe Folder backup (Preserving permissions)

जब आप sysadmin या site backups code copy कर रहे हों, तो always use `-a`:

``` bash
cp -a /var/www/myproject /backups/myproject_backup
```

### Example 3: Replicate entire files recursively

``` bash
cp -r src/ public/dist/
```

### Example 4: Alert overwrite validation prompt

``` bash
cp -i update.txt deployment/
# Prompt: cp: overwrite 'deployment/update.txt'? y/n
```


