---
title: "📖 less (interactive file pager) Command"
date: 2026-07-21
tags: ["linux","bash","less","commands","files","directories"]
---

**`less`** command Linux environment में text files के contents को page-by-page या screen-by-screen interactively view करने के लिए उपयोग किया जाता है। यह `more` command का एक advanced version है। `less` की सबसे बड़ी खासियत यह है कि यह file open करने से पहले पूरी file को memory में load नहीं करता, जिससे बहुत बड़ी files (जैसे log files) भी instant open हो जाती हैं।

## 1. Syntax

``` bash
less [options] [file_name]
```

यदि आप pipelined output को read करना चाहते हैं:

``` bash
command | less
```

## 2. Interactive Navigation Shortcuts (इन-टूल शॉर्टकट्स)

जब आप `less` के ज़रिए कोई file open करते हैं, तो navigation के लिए नीचे दिए गए keyboard shortcuts का उपयोग कर सकते हैं:

| Shortcut | Description / Behavior |
|----|----|
| **Space** / **Page Down** | एक page आगे (नीचे) scroll करें। |
| **b** / **Page Up** | एक page पीछे (ऊपर) scroll करें। |
| **Enter** / **Down Arrow** / **j** | एक line नीचे scroll करें। |
| **Up Arrow** / **k** | एक line ऊपर scroll करें। |
| **g** | File की पहली line (beginning) पर जाएँ। |
| **G** | File की आखिरी line (end) पर जाएँ। |
| **/pattern** | Forward search: नीचे की तरफ `pattern` को खोजें। |
| **?pattern** | Backward search: ऊपर की तरफ `pattern` को खोजें। |
| **n** | Search direction में next search query match पर जाएँ। |
| **N** | Search direction के विपरीत (previous) match पर जाएँ। |
| **h** / **H** | Help screen open करें (सारे shortcuts देखने के लिए)। |
| **q** | `less` viewer से बाहर निकलें (Quit)। |

## 3. Key Command Flags

`less` command run करते समय useful options/flags:

- `-N`, `--LINE-NUMBERS`: Output की सभी lines के आगे line numbers display करता है।
- `-S`, `--chop-long-lines`: Long lines को screen wraps करने के बजाय side-scrollable बनाता है (horizontal scrolling के लिए left/right arrows का use करें)।
- `-i`, `--ignore-case`: Search करते समय case-sensitivity को ignore करता है (अगर keyword small letters में है)।
- `-m`, `--long-prompt`: Screen के bottom prompt पर file coordinates, line percentage, और info दिखाता है।
- `-X`, `--no-init`: Exit करने पर text screen clear नहीं करता, जिससे screen पर last view content visible रहता है।
- `+F`: File को realtime follow mode में open करता है (जैसे `tail -f`)। normal view पर return करने के लिए `Ctrl+C` दबाएँ।

## 4. Terminal Examples

### Example 1: Basic interactive reading

``` bash
less system.log
```

### Example 2: Line numbers के साथ file open करना

``` bash
less -N config.toml
```

### Example 3: Side-scrolling mode में long lines file open करना

``` bash
less -S long-lines.txt
```

### Example 4: Output pipeline reading (जैसे `dmesg` या complex outputs)

``` bash
dmesg | less -N
```

### Example 5: Real-time file follow (Log monitoring)

``` bash
less +F /var/log/nginx/error.log
```
