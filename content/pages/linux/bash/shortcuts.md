---
title: "⌨️ BASH Keyboard Shortcuts Cheat Sheet"
date: 2026-07-11
tags: ["linux","bash","shortcuts","keyboard","commands","history"]
---

Linux Terminal पर BASH shell का उपयोग करते समय keyboard shortcuts का उपयोग करके आप अपनी command-line execution speeds और productivity को 10x बढ़ा सकते हैं। यहाँ navigation (cursor movement), line editing, history control, और job management के सभी important shortcuts की list दी गई है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Readline Library Configuration

</div>

BASH shell keyboard bindings को control करने के लिए internally **Readline Library** का use करता है। Defaults modes `emacs` style key-bindings पर config होते हैं। अगर आप Vim keyboard mode prefer करते हैं, तो terminal पर `set -o vi` toggle कर सकते हैं।

</div>

</div>

## 1. Moving (Cursor Navigation)

Terminal input cursor को command line में character-by-character या word-by-word shift करने के shortcuts:

| Command | Description (Hinglish / Hindi) |
|----|----|
| <span class="kbd">Ctrl</span> + <span class="kbd">A</span> | Command line के **beginning (शुरुआत)** पर cursor ले जाने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">E</span> | Command line के **end (आखिर)** पर cursor ले जाने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">B</span> | Cursor को **एक character पीछे** ले जाने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">F</span> | Cursor को **एक character आगे** ले जाने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">F</span> | Cursor को **एक word आगे (forward)** le जाने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">B</span> | Cursor को **एक word पीछे (backward)** le जाने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">X</span> <span class="kbd">Ctrl</span> + <span class="kbd">X</span> | Line की शुरुआत और cursor की current position के बीच **toggle** (बदलने) के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">\]</span> + <span class="kbd">x</span> | Cursor को line में आगे मौजूद character `x` की location पर ले जाने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">Ctrl</span> + <span class="kbd">\]</span> + <span class="kbd">x</span> | Cursor को line in back direction में `x` character की location पर ले जाने के लिए। |

## 2. Edit / Other Operations

Line edit करने, text cut/paste करने, और terminal buffer clear करने के operations:

| Command | Description (Hinglish / Hindi) |
|----|----|
| <span class="kbd">Ctrl</span> + <span class="kbd">D</span> | Cursor के स्थान वाले character को **delete** (मिटाने) के लिए। (अगर line empty है, तो shell **exit** हो जाएगा)। |
| <span class="kbd">Ctrl</span> + <span class="kbd">H</span> | Cursor से ठीक पहले वाले character को **delete** करने के लिए (Backspace की तरह)। |
| <span class="kbd">Ctrl</span> + <span class="kbd">U</span> | Cursor position से **पहले (before)** की पूरी command line को **clear** या **cut** करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">K</span> | Cursor position के **बाद (after)** की पूरी command line को **clear** या **cut** करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">W</span> | Cursor से **पहले वाले word** को **delete** या **cut** करने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">D</span> | Cursor point से लेकर **word के अंत तक** का text **delete** या **cut** करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">Y</span> | पहले delete या cut किये गए text को current position पर **paste** करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">I</span> | Command **autocomplete** करने के लिए (Tab key की तरह)। |
| <span class="kbd">Ctrl</span> + <span class="kbd">L</span> | Terminal screen को **clear** (साफ) करने के लिए (clear command की तरह)। |
| <span class="kbd">Ctrl</span> + <span class="kbd">C</span> | अभी चल रहे (running) command या process को **kill** (बंद) करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">Z</span> | Running process को रोककर (suspend) **background** में भेजने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">\_</span> | पिछली editing या बदलाव को **undo** (वापस पहले जैसा) करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">X</span> <span class="kbd">Ctrl</span> + <span class="kbd">U</span> | आखिरी बदलाव को **undo** करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">T</span> | Cursor से ठीक पहले वाले **दो characters को आपस में बदलने (swap)** के लिए। |
| <span class="kbd">Esc</span> + <span class="kbd">T</span> | Cursor से ठीक पहले वाले **दो words को आपस में बदलने (swap)** के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">T</span> | अभी वाले word को पिछले word के साथ **swap** करने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">Backspace</span> | Cursor से ठीक पहले वाले **word को delete** करने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">\<</span> | Command history की **सबसे पहली line** पर जाने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">\></span> | Command history की **सबसे आखिरी line** पर जाने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">?</span> | Command line में files और folders के suggestions (help) देखने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">\*</span> | Current path की सभी files/folders को command line में insert करने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">.</span> | पिछली command के **last argument** (आखिरी शब्द) को insert करने के लिए (e.g. `vim file.txt` execute करने के बाद Alt+. दबाने पर `file.txt` लिखा जाएगा)। |
| <span class="kbd">Alt</span> + <span class="kbd">C</span> | Cursor वाले word के पहले character को **capitalize** (बड़ा) करने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">U</span> | Cursor से लेकर word के अंत तक के text को **uppercase** (CAPITAL) करने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">L</span> | Cursor से लेकर word के अंत तक के text को **lowercase** (small letters) करने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">R</span> | Line में किये गए सभी बदलावों को revert (रद्द) करके command को पहले जैसा करने के लिए। |
| <span class="kbd">Alt</span> + <span class="kbd">Ctrl</span> + <span class="kbd">E</span> | Command line में मौजूद variables और aliases को expand (विस्तार) करने के लिए। |
| `~` + <span class="kbd">TAB</span> + <span class="kbd">TAB</span> | System के सभी **users** की list देखने के लिए। |
| `$` + <span class="kbd">TAB</span> + <span class="kbd">TAB</span> | System के सभी **variables** की list देखने के लिए। |
| `@` + <span class="kbd">TAB</span> + <span class="kbd">TAB</span> | `/etc/hosts` file में मौजूद hosts की list देखने के लिए। |
| <span class="kbd">TAB</span> | Command और paths को **autocomplete** करने के लिए। |
| `cd -` | **पिछली working directory** में वापस जाने के लिए। |

## 3. History Commands

Command history search करने, navigate करने, और commands execute करने के shortcuts:

| Command | Description (Hinglish / Hindi) |
|----|----|
| <span class="kbd">Ctrl</span> + <span class="kbd">R</span> | Command history में पीछे की तरफ **search** करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">S</span> | Command history में आगे की तरफ **search** करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">P</span> | History से **पिछली command** लाने के लिए (Up Arrow key की तरह)। |
| <span class="kbd">Ctrl</span> + <span class="kbd">N</span> | History से **अगली command** लाने के लिए (Down Arrow key की तरह)। |
| <span class="kbd">Ctrl</span> + <span class="kbd">O</span> | Search में मिली command को **execute** (रन) करने के लिए। |
| <span class="kbd">Ctrl</span> + <span class="kbd">G</span> | History search mode से बाहर निकलने (exit) के लिए। |
| `!!` | **ठीक पिछली command** को फिर से run करने के लिए (जैसे `sudo !!`)। |
| `!vi` | History में `vi` से शुरू होने वाली **पिछली command** को run करने के लिए। |
| `!vi:p` | `vi` से शुरू होने वाली पिछली command को run किये बिना केवल **print** करने के लिए। |
| `!n` | History list में से number `n` वाली command को run करने के लिए। |
| `!$` | पिछली command के **आखिरी argument** (शब्द) को run करने के लिए. |
| `!^` | पिछली command के **पहले argument** को run करने के लिए. |
| `^abc^xyz` | पिछली command में `abc` शब्द को `xyz` से बदलकर फिर से run करने के लिए. |

## 4. Job Control (Kill a Job)

Background/foreground jobs को control और terminate (बंद) करने के commands:

चले रहे (running) background jobs की list देखने के लिए:

``` bash
jobs
```

Output का format कुछ ऐसा होता है: `[1]+ Running sleep 100 &`, जहाँ `1` job number है। किसी specific job को kill (बंद) करने के लिए:

``` bash
# Job number 'n' को बंद (kill) करने के लिए
kill %n

# Example: job index 1 को बंद करने के लिए
kill %1
```


