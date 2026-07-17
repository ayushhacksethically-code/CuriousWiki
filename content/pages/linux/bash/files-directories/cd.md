---
title: "🚀 cd (change directory) Command"
date: 2026-07-01
tags: ["linux","bash","cd","commands","files","directories"]
---

**`cd` (Change Directory)** command का काम terminal navigation को संभालना है, यानी एक folder से दूसरे folder में जाना। चूँकि यह command आपके current shell session के environment को directly affect करती है, इसलिए इसे **Shell Built-in** के रूप में built किया गया है (इसका कोई independent binary executable file `/bin/cd` नहीं होता)।

## 1. Syntax & Core Shortcuts

``` bash
cd [options] [directory]
```

### Quick Shortcuts (शॉर्टकट्स):

- `cd` (बिना किसी argument के): आपको सीधे आपके **Home Directory** (`~`) में ले जाता है।
- `cd ~`: यह भी आपको Home directory में ले जाता है।
- `cd -`: आपको **पिछली directory** (previous folder) में वापस भेज देता है। (यह command line पर काम करते समय बहुत समय बचाता है)।
- `cd ..`: Directory tree में एक step ऊपर (parent directory) जाता है।

## 2. Options for Symlinks

जैसे `pwd` में होता है, `cd` में भी path resolution के लिए flags होते हैं:

- `cd -L [path]`: **Logical path** follow करता है (symlinks shortcuts को preserve रखता है, default behavior)।
- `cd -P [path]`: **Physical path** follow करता है (symlink को resolve करके उसकी actual source directory location पर ले जाता है)।

## 3. CDPATH: Navigation Speed-up

क्या आप बार-बार `cd /var/www/my-project` या `cd /home/user/workspace/app` लिखते-लिखते थक गए हैं?

आप `CDPATH` environment variable का उपयोग कर सकते हैं। यह shell को बताता है कि जब आप `cd folder_name` चलाएं और वह current directory में न मिले, तो उसे किन directories में search करना चाहिए:

``` bash
# इसे अपने ~/.bashrc में जोड़ें:
export CDPATH=".:/var/www:/home/user/workspace"

# अब आप terminal पर कहीं भी हों, सीधे project folder में cd कर सकते हैं:
cd my-project
# Shell automatically इसे /var/www/my-project या /home/user/workspace/my-project में खोजकर स्विच कर देगा!
```

## 4. Common Examples

``` bash
# Go to projects directory
cd /var/www/html/projects

# Go up two folders
cd ../..

# Switch back and forth between two directories
cd -
```


