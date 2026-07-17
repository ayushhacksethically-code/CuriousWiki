---
title: "🔧 Linux Maintenance Guide"
date: 2026-06-30
tags: ["linux","maintenance","pacman","dnf","apt","systemd","aur","copr","ppa","terminal"]
---

यह guide विभिन्न Linux distributions (Fedora, Arch, Debian/Ubuntu) के रखरखाव (maintenance), package updates, service management और system logging के लिए एक comprehensive reference guide है।

## 1. Package Managers (पैकेज प्रबंधक)

अलग-अलग distributions में packages को manage और update करने के लिए commands:

<div class="tabs-container" style="margin-top: 1rem;">

<div style="margin-bottom: 1.5rem; border-left: 3px solid var(--accent-primary); padding-left: 1rem;">

###  Arch Linux (Pacman)

``` bash
# System upgrade (db sync & update)
sudo pacman -Syu

# Install a package
sudo pacman -S package_name

# Remove package & unused dependencies
sudo pacman -Rns package_name

# Complete clean package cache
sudo pacman -Scc
```

</div>

<div style="margin-bottom: 1.5rem; border-left: 3px solid var(--accent-secondary); padding-left: 1rem;">

###  Fedora (DNF)

``` bash
# System upgrade & sync
sudo dnf upgrade --refresh

# Install a package
sudo dnf install package_name

# Remove package & orphan dependencies
sudo dnf autoremove package_name

# Clean download package cache
sudo dnf clean all
```

</div>

<div style="margin-bottom: 1rem; border-left: 3px solid var(--accent-success); padding-left: 1rem;">

###  Debian/Ubuntu (APT)

``` bash
# System upgrade
sudo apt update && sudo apt upgrade

# Install a package
sudo apt install package_name

# Purge package & remove dependency
sudo apt purge --autoremove package_name

# Clean cache lists
sudo apt clean
```

</div>

</div>

## 2. Systemd Services Management (सर्विस प्रबंधन)

लगभग सभी आधुनिक Linux distros (Fedora, Arch, Debian, Ubuntu) systemd का उपयोग करते हैं। Services को control करने के लिए standard systemctl commands:

``` bash
# service status check
systemctl status service_name

# service start (current session only)
sudo systemctl start service_name

# service check default active status
systemctl is-active service_name

# service boot startup par enable karein
sudo systemctl enable service_name

# service restart
sudo systemctl restart service_name
```

## 3. User / Custom Repositories

Community driven custom programs compile करना और install करना:

<div style="margin-bottom: 1.5rem; padding-left: 1rem; border-left: 2px dashed var(--border-color);">

#### Arch User Repository (AUR)

``` bash
git clone https://aur.archlinux.org/yay-bin.git
cd yay-bin
makepkg -si
```

</div>

<div style="margin-bottom: 1.5rem; padding-left: 1rem; border-left: 2px dashed var(--border-color);">

#### Fedora COPR (Community Repositories)

``` bash
# COPR repository enable karein
sudo dnf copr enable copr_username/repo_name
sudo dnf install package_name
```

</div>

<div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 2px dashed var(--border-color);">

#### Ubuntu PPA (Personal Package Archive)

``` bash
# PPA add & install karein
sudo add-apt-repository ppa:ppa_name
sudo apt update && sudo apt install package_name
```

</div>

## 4. System Logs (Journald Debugging)

Kernel logs और runtime status check करने के systemd logger commands:

``` bash
# real-time live logs tail show karein
journalctl -f

# current boot process debug logs extract karein
journalctl -b

# specific service runtime error codes list
journalctl -u service_name --since "1 hour ago"

# kernel-only errors aur warnings print
journalctl -k -p 3 -b
```


