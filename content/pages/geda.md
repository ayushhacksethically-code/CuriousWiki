---
title: "🔌 gEDA Project (Electronic Design Automation)"
date: 2026-07-03
tags: ["geda","eda","pcb","layout","circuit","schematic","simulation","electronica"]
---

gEDA project ने एक complete GPL-licensed suite और toolkit बनायी है (और इसपे काम चल रहा है) जो **Electronic Design Automation (EDA)** tools के लिए है। इन tools का use electrical circuit design, schematic capture, simulation, prototyping, और production के लिए किया जाता है। फ़िलहाल, gEDA project electronics design के लिए free software applications का एक mature suite offer करता है, जिसमें schematic capture, attribute management, bill of materials (BOM) generation, 20 से ज़्यादा netlist formats में netlisting, analog और digital simulation, और printed circuit board (PCB) layout शामिल हैं।

gEDA project की शुरुआत POSIX systems के लिए free EDA tools की कमी की वजह से हुई थी, जिसका primary purpose free hardware या open-source hardware को promote करना था। यह suite mainly GNU/Linux platform पर develop किया जाता है, लेकिन इस बात का भी ध्यान रखा जाता है कि ये tools बाकी platforms पर भी सही से चल सकें।

Source: <a href="http://www.gpleda.org/" target="_blank" rel="noopener noreferrer">gEDA Homepage</a>

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

gEDA Scope

</div>

यह toolkit full electronic workflow को handle करती है: Schematic sketch करने से लेकर PCB production और gerber generation तक।

</div>

</div>

## ⚙️ Installation (इन्स्टॉलेशन)

gEDA Tools को setup करने के लिए standard packages को install करना होगा:

- AUR से `geda-gaf` install करने से आपको schematic editor और attribute editor मिल जायेंगे।
- Font scaling ko sahi rakhne ke liye `ttf-dejavu` aur `ttf-liberation` install karna zaroori ho sakta hai.
- AUR से `pcb` install करने से आपको PCB layout editor मिल जायेगा।

``` bash
# geda-gaf और pcb को AUR helper (जैसे yay) से install करें:
yay -S geda-gaf pcb ttf-dejavu ttf-liberation
```

## 🛠️ First PCB (पहला पीसीबी)

### 1. Schematic Symbol Create करें (सिंबल बनाना)

आप नये symbol बिल्कुल वैसे ही बना सकते हैं जैसे आप schematics बनाते हैं। सबसे पहले एक empty file open करें:

``` bash
gschem mysymbol.sym
```

और pins add करने के लिए <span class="kbd">ap</span> और attributes edit करने के लिए <span class="kbd">aa</span> shortcut का use करें। Attributes की details के लिए <a href="http://wiki.geda-project.org/geda:master_attributes_list" target="_blank" rel="noopener noreferrer">gEDA Master Attributes List</a> check करें।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Absolute Zero Alignments

</div>

काम खत्म होने के बाद, अपने symbol को absolute zero coordinates पर translate करना ना भूलें (shortcut: <span class="kbd">et</span>)। अगर आप ऐसा नहीं करते, तो जब आप इसे schematic में place करेंगे तो symbol viewport से बाहर गायब हो जायेगा।

</div>

</div>

Symbol को save करने के लिए <span class="kbd">fs</span> दबाएं और इस command से validation check करें:

``` bash
gsymcheck -vv mysymbol.sym
```

#### Schematic Search Path Config

अपने local symbol को `gschem` के search path में add करना ज़रूरी है। इसके लिए project folder में एक file बनाएं जिसका नाम `gafrc` हो, और उसमें ये line लिखें:

``` scheme
(component-library "./symbols")
```

इसके बाद अपने सारे custom components/symbols को `symbols` subfolder के अंदर copy कर दें।

### 2. Schematic Create करें (स्केमैटिक बनाना)

Schematic editor को open करने के लिए command run करें:

``` bash
gschem
```

नये circuits को design और connect करने के लिए workspace use करें। ज़्यादा details के लिए <a href="http://wiki.geda-project.org/geda:faq-gschem" target="_blank" rel="noopener noreferrer">gschem FAQ page</a> check करें।

### 3. PCB Create और Route करें (पीसीबी रूटिंग)

जब आप schematic complete कर लें और PCB routing शुरू करनी हो, तो एक `gsch2pcb` project set up करें। एक नयी file बनाएं जिसका नाम **`firstpcb.prj`** हो और उसमें ये configure करें:

``` text
schematics firstpcb.sch
empty-footprint nofootprint
output-name firstpcb
```

यह project setup `firstpcb.sch` file को parse करेगा, 'nofootprint' वाले elements को ignore करेगा, और ये output files generate करेगा:

- **`firstpcb.pcb`**: Layout और routing file
- **`firstpcb.net`**: Connections netlist
- **`firstpcb.cmd`**: Pin name commands

अगर local directories load करनी हैं तो `.prj` file में ये lines ज़रूर add करें:

``` text
elements-dir footprints
elements-dir symbols
```

अब design synchronise करने के लिए command run करें:

``` bash
gsch2pcb -f firstpcb.prj
```

इसके बाद `gsch2pcb` आपको feedback देगा या required netlist update कर देगा।
