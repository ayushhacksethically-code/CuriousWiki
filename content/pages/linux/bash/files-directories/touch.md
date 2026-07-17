---
title: "✏️ touch (create file & change timestamps) Command"
date: 2026-07-01
tags: ["linux","bash","touch","commands","files","directories"]
---

**`touch`** command का मुख्य रूप से दो कामों के लिए उपयोग किया जाता है: 1) खाली फ़ाइलें (empty files) बनाना, और 2) पहले से मौजूद फ़ाइलों के timestamps (Access Time और Modification Time) को बदलना।

## 1. Syntax

``` bash
touch [OPTION]... FILE...
```

## 2. Key Options & Flags

- **Normal Usage (no options):** अगर फ़ाइल मौजूद नहीं है, तो उसे 0 bytes size के साथ create करता है। अगर फ़ाइल पहले से है, तो उसके timestamps को current system time पर update कर देता है।
- `-a`: केवल **Access Time (atime)** (जब फ़ाइल को आखिरी बार पढ़ा गया) को update करता है।
- `-m`: केवल **Modification Time (mtime)** (जब फ़ाइल में आखिरी बार कुछ बदलाव किया गया) को update करता है।
- `-c`, `--no-create`: फ़ाइल के timestamps तो update करेगा, लेकिन अगर फ़ाइल मौजूद नहीं है, तो उसे **क्रिएट नहीं करेगा**।
- `-d`, `--date`: Current time के बजाय कोई custom time string (जैसे "2 hours ago", "yesterday") फ़ाइल पर apply करने के लिए।
- `-r`, `--reference`: किसी existing reference file के timestamps copy करके target file पर apply करने के लिए।

## 3. Timestamps & Creation Examples

### Example 1: Create multiple files at once

``` bash
touch app.js styles.css index.html
```

### Example 2: Update timestamps without modifying file content

यह backup systems और build automation scripts के लिए बहुत उपयोगी है:

``` bash
touch config.cfg # Set timestamps to current system time
```

### Example 3: Set custom relative date

``` bash
touch -d "yesterday 14:00" index.html # कल दोपहर 2 बजे का timestamp set करें
```

### Example 4: Replicate dates from another file

``` bash
touch -r original.txt copied_file.txt # copied_file का timestamp original.txt जैसा हो जाएगा
```


