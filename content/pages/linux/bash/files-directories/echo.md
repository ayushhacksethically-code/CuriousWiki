---
title: "🗣️ echo (display line of text) Command"
date: 2026-07-01
tags: ["linux","bash","echo","commands","files","directories"]
---

**`echo`** command का उपयोग shell scripting और terminal usage के दौरान screen (standard output) पर text या variable values को print करने के लिए किया जाता है।

## 1. Syntax

``` bash
echo [OPTION]... [STRING]...
```

## 2. Key Options & Flags

- `-n`: Output के अंत में default newline character (`\n`) को print होने से रोकता है। (यानी cursor अगला text उसी line में print करेगा)।
- `-e`: Backslash escape characters (जैसे `\n`, `\t`) की parsing को **enable** करता है।
- `-E`: Backslash escape characters की interpretation को **disable** रखता है (यह default setting है)।

## 3. Common Escape Sequences (used with -e)

| Escape Sequence | Action / Output                              |
|-----------------|----------------------------------------------|
| `\n`            | New line (लाइन बदलें)                          |
| `\t`            | Tab character space                          |
| `\\`            | Backslash (`\`) को print करने के लिए           |
| `\e`            | Escape character (colors text styling के लिए) |

## 4. Beautiful Examples

### Example 1: Basic Variables Printing

``` bash
echo "Hello, $USER!" # Current loggged-in user's name printed
```

### Example 2: Output without Newline

``` bash
echo -n "Connecting to server..."
# ... perform tasks ...
echo " DONE!"
# Output on same line: Connecting to server... DONE!
```

### Example 3: ANSI Colors printing in Terminal

Terminal output को premium feel देने के लिए ANSI color format का उपयोग करें:

``` bash
# Print error in Red color
echo -e "\e[1;31mError: Connection failed!\e[0m"

# Print success in Green color
echo -e "\e[1;32mSuccess: Database connected!\e[0m"
```


