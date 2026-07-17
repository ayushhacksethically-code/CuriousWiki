---
title: "📁 mkdir (make directories) Command"
date: 2026-07-01
tags: ["linux","bash","mkdir","commands","files","directories"]
---

**`mkdir` (Make Directory)** command का काम Linux filesystem में नए empty folders (directories) create करना है। आप एक साथ एक या कई folders बना सकते हैं।

## 1. Syntax

``` bash
mkdir [options] directory_name(s)
```

## 2. Key Options & Flags

- `-p`, `--parents`: **यह सबसे महत्वपूर्ण flag है।** इसकी मदद से आप nested directories (जैसे `folder1/folder2/folder3`) को एक ही बार में recursively create कर सकते हैं। अगर parent directory पहले से मौजूद नहीं होगी, तो यह बिना कोई error दिए उसे खुद बना देगा।
- `-m`, `--mode`: Directory बनाते समय ही उसकी permissions (जैसे `755`, `700` octal permission values) set करने के लिए।
- `-v`, `--verbose`: creation process की detail logs console पर दिखाता है (verbose mode)।

## 3. Real-world Examples

### Example 1: Create a simple folder

``` bash
mkdir app_scripts
```

### Example 2: Recursive parent structure (Super Useful)

अगर आप `-p` के बिना `mkdir a/b/c` चलाएंगे, तो shell error देगा ("No such file or directory") क्योंकि `a` और `b` पहले से नहीं बने हैं। `-p` इसे fix करता है:

``` bash
mkdir -p src/assets/images/portraits
```

### Example 3: Create directory with secure permissions

अगर आप चाहते हैं कि बनने वाला folder केवल आपके user के लिए readable/writable हो (private directory):

``` bash
mkdir -m 700 secret_keys
```

### Example 4: Verbose creation check

``` bash
mkdir -pv project/libs
# Output:
# mkdir: created directory 'project'
# mkdir: created directory 'project/libs'
```


