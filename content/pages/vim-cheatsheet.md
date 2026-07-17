---
title: "⌨️ Vim Text Editor Cheatsheet"
date: 2026-06-30
tags: ["vim","vi","editor","shortcuts","keyboard","commands"]
---

Vim modes के अंदर files को efficiently edit करने के लिए essential keyboard shortcuts, cursor movements, deletion macros, text search commands, और registers.

## 1. Cursor Movement (Normal Mode)

Arrow keys या mouse का उपयोग किए बिना text को जल्दी navigate करना:

- <span class="kbd">h</span>: cursor को एक character left ले जाएं
- <span class="kbd">j</span>: cursor को एक line down ले जाएं
- <span class="kbd">k</span>: cursor को एक line up ले जाएं
- <span class="kbd">l</span>: cursor को एक character right ले जाएं
- <span class="kbd">w</span>: अगले word के start पर jump करें
- <span class="kbd">b</span>: पिछले word के start पर jump करें
- <span class="kbd">0</span>: current line के start पर जाएं
- <span class="kbd">\$</span>: current line के end पर जाएं
- <span class="kbd">G</span>: document की last line पर jump करें
- <span class="kbd">gg</span>: document की first line पर jump करें

## 2. Mode Switching

Insert, Visual, और Command-Line modes के बीच transition करना:

- <span class="kbd">i</span>: cursor से पहले Insert mode में enter करें
- <span class="kbd">a</span>: cursor के बाद Insert mode में enter करें
- <span class="kbd">o</span>: नीचे एक new line open करें और Insert mode में enter करें
- <span class="kbd">v</span>: character-by-character text select करने के लिए Visual mode में enter करें
- <span class="kbd">V</span>: entire lines select करने के लिए Visual line mode में enter करें
- <span class="kbd">Esc</span>: Normal mode में वापस लौटें

## 3. Editing, Yanking & Deleting

Text blocks को yank (copy), delete (cut), और paste करना:

``` text
x   - cursor पर single character delete करें
dw  - अगले word तक delete करें
dd  - current line delete करें (cut)
d$  - line के end तक delete करें
yy  - current line yank (copy) करें
yw  - next word तक yank करें
p   - copy/cut text को cursor के बाद paste करें
u   - last action undo करें
Ctrl+r - last undone action redo करें
```

## 4. Search and Save Commands

Patterns ढूंढना, strings substitute करना, और Vim editor से exit करना:

``` text
/pattern    - forward search "pattern" के लिए
?pattern    - backward search "pattern" के लिए
n           - matches को forward direction में navigate करें
N           - matches को backward direction में navigate करें
:w          - file save करें (write)
:q          - editor exit करें (quit)
:wq         - save और exit करें
:q!         - bina save kiye exit करें
```
