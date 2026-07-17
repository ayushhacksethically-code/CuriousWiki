---
title: "🐱 cat (concatenate and display) Command"
date: 2026-07-01
tags: ["linux","bash","cat","commands","files","directories"]
---

**`cat` (Concatenate)** command Linux utility का एक core tool है। इसका प्राथमिक काम files के contents को terminal screen (standard output) पर print करना है, लेकिन इसका उपयोग multiple files को merge करने और quick files creation के लिए भी किया जाता है।

## 1. Syntax

``` bash
cat [options] [file_name(s)]
```

## 2. Key Formatting Flags

- `-n`, `--number`: Output की सभी lines के आगे line numbers print करता है (खाली lines को भी count करता है)।
- `-b`, `--number-nonblank`: केवल occupied/non-empty lines के आगे ही numbers print करता है।
- `-s`, `--squeeze-blank`: लगातार आने वाली multiple blank lines को merge करके single empty line block compile कर देता है।
- `-T`, `--show-tabs`: File में tabs configurations (indentation spaces) को `^I` format में print करता है.
- `-E`, `--show-ends`: lines के end boundary boundary limits validations details trace करने के लिए dollar parameters (`$`) prints करता है.

## 3. Terminal Examples

### Example 1: Read file contents in terminal

``` bash
cat package.json
```

### Example 2: Display occupied lines indexes only

``` bash
cat -b server.js
```

### Example 3: Merging files together (Concatenation)

multiple text segments को merge करके new file save mapping redirection:

``` bash
cat header.html body.html footer.html > index.html
```

### Example 4: Quick file writing from Terminal

यदि आप nano/vim open किए बिना quick script config write details console commands use करना चाहते हैं:

``` bash
cat > test.txt
Write some lines here
Press Ctrl+D to save and exit
```


