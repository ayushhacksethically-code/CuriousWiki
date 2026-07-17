---
title: "⌨️ Bash Programmable TAB Completion"
date: 2026-07-01
tags: ["linux","bash","tab-completion","commands","files","directories"]
---

जब आप Linux terminal पर command type करते समय `[TAB]` key दबाते हैं, तो Bash automatically contextual suggestions दिखाने का प्रयास करता है। इसे **Completion Specification (compspec)** कहा जाता है। BASH completion engine developers को custom scripting APIs provide करता है, जिसकी मदद से आप किसी भी command के लिए dynamic auto-completions set कर सकते हैं।

## 1. Simple Static completion using `complete -W`

अगर आपको किसी command के लिए options की एक static list define करनी है, तो `complete -W` (Word list) का उपयोग करें:

``` bash
# Register foo, bar and bAr for echo command context
complete -W "foo bar bAr" echo
```

अब terminal पर type करके verify करें:

``` bash
echo [TAB][TAB]
# Output: bar  bAr  foo (automatically sorted alphabetically)

echo f[TAB]
# Autocompletes to: echo foo
```

## 2. Dynamic completions using Functions (`complete -F`)

जब autocomplete logic complicated हो (जैसे options previous typed words या directory configuration पर depend करें), तो `-F` argument का use किया जाता है। यह autocomplete trigger होने पर shell function execute करता है।

जैसे, हम चाहते हैं कि `echo foo ` के बाद tab press करने पर current directory में मौजूद files की count dynamically check parameters calculate output updates:

``` bash
# Write this in completion-tutorial.sh:
_echo() {
    # If the word before current cursor is "foo"
    if [ "$3" == "foo" ]; then
        COMPREPLY=( $(ls | wc -l) )
    else
        COMPREPLY=( $(compgen -W "foo bar bAr" -- "$2") )
    fi
}
complete -F _echo echo
```

इसे source करके load करें:

``` bash
source completion-tutorial.sh
echo foo [TAB]
# Output: 5 (if there are 5 files in current directory)
```

## 3. Shell Arguments Explained (\$1, \$2, \$3)

BASH completion system execution के समय functions handler parameters mapping logic provide करता है:

- **`$1`:** Command name (e.g., `echo`).
- **`$2`:** वर्तमान typed word (empty check if no characters entered yet).
- **`$3`:** Cursor position से ठीक पहले वाला word (इसे context evaluate करने के लिए use किया जाता है)।

## 4. Dynamic Matches using `compgen`

`compgen` utility list filter करने का काम करती है:

``` bash
COMPREPLY=( $(compgen -W "foo bar bAr" -- "$2") )
```

- **`-- "$2"`:** यह compgen को बताता है कि user ने जो typed characters (`$2`) लिखे हैं, केवल उन्हीं से शुरू होने वाले word suggestions return करे।
- **`$IFS` (Internal Field Separator):** Word splits patterns control delimiters, default settings tabs/newlines use.

## 5. Advanced File Filters & Options (FITS file example)

Gnuastro program `asttable` का complex autocomplete example:

हम चाहते हैं कि जब user `--wcsfile=` option type करे, तो terminal केवल **FITS images (`.fits` / `.FITS`)** ही autocomplete suggestions में दिखाए:

``` bash
_asttable() {
    local word prev
    
    # Handle '=' sign splitting anomalies
    if [ "$2" = "=" ]; then word=""; else word="$2"; fi
    if [ "$3" = "=" ]; then prev="${COMP_WORDS[COMP_CWORD-2]}"; else prev="${COMP_WORDS[COMP_CWORD-1]}"; fi

    case "$prev" in
        --wcsfile)
            # Filter files matching *.fits / *.FITS extension
            COMPREPLY=( $(compgen -f -X "!*.[fF][iI][tT][sS]" -- "$word") )
            ;;
    esac
}
# -o nospace tells shell to avoid adding space after equal sign to allow prefix value
complete -o nospace -F _asttable asttable
```

### Flags configuration:

- `-f`: files search path check.
- `-X "!*.[fF][iI][tT][sS]"`: Excludes files that do NOT match the FITS extension.
- `-o nospace`: prevents adding automatic space character, enabling option values to stick with option name (e.g. `--wcsfile=myfile.fits`).


