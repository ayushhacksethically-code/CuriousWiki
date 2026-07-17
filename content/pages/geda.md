---
title: "🔌 gEDA Project (Electronic Design Automation)"
date: 2026-07-03
tags: ["geda","eda","pcb","layout","circuit","schematic","simulation","electronica"]
---

gEDA project ne ek complete GPL-licensed suite aur toolkit banayi hai (aur ispe kaam chal raha hai) jo **Electronic Design Automation (EDA)** tools ke liye hai. In tools ka use electrical circuit design, schematic capture, simulation, prototyping, aur production ke liye kiya jata hai. Filhal, gEDA project electronics design ke liye free software applications ka ek mature suite offer karta hai, jisme schematic capture, attribute management, bill of materials (BOM) generation, 20 se zyada netlist formats me netlisting, analog aur digital simulation, aur printed circuit board (PCB) layout shamil hain.

gEDA project ki shuruat POSIX systems ke liye free EDA tools ki kami ki wajah se hui thi, jiska primary purpose free hardware ya open-source hardware ko promote karna tha. Yeh suite mainly GNU/Linux platform par develop kiya jata hai, lekin is baat ka bhi dhyan rakha jata hai ki ye tools baki platforms par bhi sahi se chal sakein.

Source: <a href="http://www.gpleda.org/" target="_blank" rel="noopener noreferrer">gEDA Homepage</a>

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

gEDA Scope

</div>

Yeh toolkit full electronic workflow ko handle karti hai: Schematic sketch karne se lekar PCB production aur gerber generation tak.

</div>

</div>

## ⚙️ Installation (इन्स्टॉलेशन)

gEDA Tools ko setup karne ke liye standard packages ko install karna hoga:

- AUR se `geda-gaf` install karne se aapko schematic editor aur attribute editor mil jayenge.
- Font scaling ko sahi rakhne ke liye `ttf-dejavu` aur `ttf-liberation` install karna zaroori ho sakta hai.
- AUR se `pcb` install karne se aapko PCB layout editor mil jayega.

``` bash
# geda-gaf aur pcb ko AUR helper (jaise yay) se install karein:
yay -S geda-gaf pcb ttf-dejavu ttf-liberation
```

## 🛠️ First PCB (पहला पीसीबी)

### 1. Schematic Symbol Create Karein (सिंबल बनाना)

Aap naye symbol bilkul waise hi bana sakte hain jaise aap schematics banate hain. Sabse pehle ek empty file open karein:

``` bash
gschem mysymbol.sym
```

Aur pins add karne ke liye <span class="kbd">ap</span> aur attributes edit karne ke liye <span class="kbd">aa</span> shortcut ka use karein. Attributes ki details ke liye <a href="http://wiki.geda-project.org/geda:master_attributes_list" target="_blank" rel="noopener noreferrer">gEDA Master Attributes List</a> check karein.

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Absolute Zero Alignments

</div>

Kaam khatam hone ke baad, apne symbol ko absolute zero coordinates par translate karna na bhoolein (shortcut: <span class="kbd">et</span>). Agar aap aisa nahi karte, toh jab aap ise schematic me place karenge toh symbol viewport se bahar gayab ho jayega.

</div>

</div>

Symbol ko save karne ke liye <span class="kbd">fs</span> dabayein aur is command se validation check karein:

``` bash
gsymcheck -vv mysymbol.sym
```

#### Schematic Search Path Config

Apne local symbol ko `gschem` ke search path me add karna zaroori hai. Iske liye project folder me ek file banayein jiska naam `gafrc` ho, aur usme ye line likhein:

``` scheme
(component-library "./symbols")
```

Iske baad apne saare custom components/symbols ko `symbols` subfolder ke andar copy kar dein.

### 2. Schematic Create Karein (स्केमैटिक बनाना)

Schematic editor ko open karne ke liye command run karein:

``` bash
gschem
```

Naye circuits ko design aur connect karne ke liye workspace use karein. Zyada details ke liye <a href="http://wiki.geda-project.org/geda:faq-gschem" target="_blank" rel="noopener noreferrer">gschem FAQ page</a> check karein.

### 3. PCB Create aur Route Karein (पीसीबी रूटिंग)

Jab aap schematic complete kar lein aur PCB routing shuru karni ho, toh ek `gsch2pcb` project set up karein. Ek nayi file banayein jiska naam **`firstpcb.prj`** ho aur usme ye configure karein:

``` text
schematics firstpcb.sch
empty-footprint nofootprint
output-name firstpcb
```

Yeh project setup `firstpcb.sch` file ko parse karega, 'nofootprint' wale elements ko ignore karega, aur ye output files generate karega:

- **`firstpcb.pcb`**: Layout aur routing file
- **`firstpcb.net`**: Connections netlist
- **`firstpcb.cmd`**: Pin name commands

Agar local directories load karni hain toh `.prj` file me ye lines zaroor add karein:

``` text
elements-dir footprints
elements-dir symbols
```

Ab design synchronise karne ke liye command run karein:

``` bash
gsch2pcb -f firstpcb.prj
```

Iske baad `gsch2pcb` aapko feedback dega ya required netlist update kar dega.


