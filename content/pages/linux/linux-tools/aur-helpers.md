---
title: "📦 AUR Helpers (yay & paru) - Arch User Repository Guide"
date: 2026-07-10
tags: ["aur","yay","paru","pacman","arch","compilation","dependencies","aur-helpers"]
---

Arch Linux में official repositories के अलावा, user-submitted packages का एक बहुत बड़ा repository है जिसे **Arch User Repository (AUR)** कहा जाता है। AUR packages को easily search, build, install और update करने के लिए **AUR Helpers** (जैसे `yay` और `paru`) का use किया जाता है।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Security Alert: Verify PKGBUILDs

</div>

चूंकि AUR packages community-submitted होते हैं, इसलिए safety के लिए package install करने से पहले उसके **PKGBUILD** script को review करना important है। कभी भी blindly root permission (sudo) के साथ compile commands run न करें।

</div>

</div>

## 1. Manual Build (How AUR Works Under the Hood)

AUR helper install करने से पहले, आपको manual workflow पता होना चाहिए। AUR setup करने और clone build compile करने का step-by-step process:

``` bash
# Essential development compile packages install karein
sudo pacman -S --needed base-devel git

# AUR se package source code clone karein
git clone https://aur.archlinux.org/yay.git

# Package directory me enter karein
cd yay

# PKGBUILD check karein
less PKGBUILD

# Make and install package (dependencies automatically resolve ho jayengi)
makepkg -si
```

## 2. yay vs paru (Popular AUR Helpers Comparison)

Arch community में दो सबसे popular helpers `yay` (Go language में लिखित) और `paru` (Rust language में लिखित) हैं।

| Feature | yay (Yet Another Yaourt) | paru (Rust-based helper) |
|----|----|----|
| **Language** | Go | Rust |
| **PKGBUILD Review** | Optional (can prompt) | Interactive preview (built-in file viewer) |
| **Speed** | Very fast (Go compiled binary) | Blazing fast (Rust compiled runtime optimizations) |
| **Syntax compatibility** | Strictly matches `pacman` options | Matches `pacman` with extra custom features |

## 3. Essential Commands & Workflows

Official and AUR packages को manage करने के common commands:

### Search & Install Packages

AUR helpers base pacman parameters को full support करते हैं:

``` bash
# AUR and Official Database me keyword search karein
yay -Ss spotify
# ya
paru -Ss spotify

# Search dynamically and select package from interactive list
yay google-chrome

# Package install command
yay -S google-chrome-stable
```

### System Upgrade & Maintenance

Pure pacman commands package dependency compilation sync नहीं करते। AUR Helpers system packages upgrade perform करते हैं:

``` bash
# Official and AUR system upgrade sync & run
yay -Syu
# ya simply run
yay

# Check current AUR updates list
yay -Qua

# Unused dependency compile clean karein (Orphans clean)
yay -Yc
```

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Reflector System Synchronization

</div>

अगर download speed slow है, तो base database update करने से पहले `reflector` utility का use करके mirrors optimize करें:  
`sudo reflector --latest 5 --protocol https --sort rate --save /etc/pacman.d/mirrorlist`

</div>

</div>


