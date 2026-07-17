---
title: "📁 rmdir (remove empty directories) Command"
date: 2026-07-01
tags: ["linux","bash","rmdir","commands","files","directories"]
---

**`rmdir` (Remove Directory)** command का काम केवल **खाली फोल्डर्स (empty directories)** को filesystem से हटाना है। यह directories को clear करने का एक safe method है क्योंकि अगर folder में कोई भी data/file होगी, तो यह error देगा और deletion block कर देगा।

## 1. Syntax

``` bash
rmdir [options] directory_name(s)
```

## 2. Key Options & Flags

- `-p`, `--parents`: Empty nested directory path (जैसे `dir1/dir2/dir3`) को recursive style में auto check validation पर delete करता है।
- `-v`, `--verbose`: Deletion status logs details show.

## 3. Safe deletion vs rm -rf comparison

जब आप `rm -rf folder` चलाते हैं, तो वह बिना पूछे सब कुछ साफ़ कर देता है, जिससे important files उड़ने का ख़तरा रहता है। `rmdir` केवल तभी काम करेगा जब folder खाली हो:

``` bash
# Fails if "app_logs" has files inside
rmdir app_logs
# Output: rmdir: failed to remove 'app_logs': Directory not empty

# Delete nested empty directories safely
rmdir -p backup/january/week1
# This deletes week1, then january, then backup (if all are empty recursively)
```


