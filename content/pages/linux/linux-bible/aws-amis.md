---
title: "☁️ AWS के लिए Linux AMIs (Amazon Machine Images)"
date: 2026-06-30
tags: ["aws","ami","ec2","cloud","arch","fedora","ubuntu","debian","gentoo","systemd"]
---

AWS EC2 instances को spin-up करने के लिए Amazon Machine Images (AMIs) की आवश्यकता होती है। यह guide दुनिया के सबसे लोकप्रिय Linux distributions (Arch, Fedora, Ubuntu, Debian, Gentoo) के AWS AMIs, उनके default settings, login usernames और initialization steps को cover करती है।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

SSH Login Constraints

</div>

सुरक्षा के लिए, AWS official AMIs पर default रूप से password login और direct `root` login disabled होते हैं। आपको हमेशा key-pair authentication (.pem/.ppk file) का उपयोग करना होगा।

</div>

</div>

## Default AWS Usernames Comparison

EC2 instance से SSH connect करते समय उपयोग किए जाने वाले default usernames:

| Distribution | Default Username | Official / Community support |
|----|----|----|
| **Ubuntu Server** | `ubuntu` | Official (Canonical) |
| **Fedora Cloud** | `fedora` (या `ec2-user`) | Official (Fedora Project) |
| **Debian Cloud** | `admin` (या `debian`) | Official (Debian Project) |
| **Arch Linux** | `arch` | Community driven |
| **Gentoo Linux** | `gentoo` (या `root` / `ec2-user`) | Community / User bootstrapped |

------------------------------------------------------------------------

## 1. Arch Linux AMIs

Arch Linux की कोई आधिकारिक (Official) AWS AMI उपलब्ध नहीं है। इन्हें Community के द्वारा maintain किया जाता है।

- **List of AMIs**: <a href="http://arch-ami-list.drzee.net/" target="_blank">arch-ami-list.drzee.net</a>
- **REST API**: <a href="https://arch-ami-api.drzee.net/latest" target="_blank">arch-ami-api.drzee.net/latest</a> (JSON structure)
- **Kernels**: std (Standard Arch Kernel) और lts (Long Term Support Kernel) के रूप में उपलब्ध।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Important: Key compatibility & systemd

</div>

- इन AMIs पर cloud-init को elliptic curve SSH keys (ECDSA/Ed25519) के साथ काम करने में दिक्कत हो सकती है, इसलिए **RSA keys** का ही उपयोग करें।
- systemd v259 boot delay bug को cloud-init 26.1 patch के ज़रिए resolved कर दिया गया है।

</div>

</div>

#### Initialization Steps:

Boot होने के बाद, mirror lists को customize करने और pacman database sync करने के लिए:

``` bash
# Initialize pacman keys
sudo pacman-key --init
sudo pacman-key --populate

# Generate optimal local mirror lists based on your region
sudo reflector --country "US" --protocol https,http --score 20 --sort rate --save /etc/pacman.d/mirrorlist

# Perform full upgrade
sudo pacman -Syu
```

या फिर default AMI में दी गई automated script run करें: `sudo /etc/pacman.d/pacman_init.sh`

------------------------------------------------------------------------

## 2. Fedora Cloud AMIs

Fedora Project आधिकारिक रूप से cloud-optimized AMIs (Fedora Cloud, Fedora CoreOS) provide करता है।

- **Default User**: `fedora`
- **Update Package Manager**: DNF

#### First-run Setup commands:

``` bash
# Fetch updates and apply security patches
sudo dnf upgrade --refresh -y

# Install essential development tools
sudo dnf groupinstall "Development Tools" -y
```

------------------------------------------------------------------------

## 3. Ubuntu Server AMIs

Canonical के द्वारा build की गई AMIs जो AWS Marketplace पर standard और minimal configurations में available हैं।

- **Default User**: `ubuntu`
- **Update Package Manager**: APT

#### Initialization and Upgrades:

``` bash
# Update local repositories
sudo apt update

# Upgrade all installed packages
sudo apt upgrade -y

# Clean up local cache
sudo apt autoremove -y
```

------------------------------------------------------------------------

## 4. Debian Cloud AMIs

Debian Project की official cloud images standard Debian configurations के साथ आती हैं।

- **Default User**: `admin` (कुछ पुराने versions पर `debian`)
- **Update Package Manager**: APT

#### First System Update:

``` bash
sudo apt update && sudo apt upgrade -y
```

------------------------------------------------------------------------

## 5. Gentoo Linux AMIs

Gentoo की कोई standard official AWS image नहीं होती है। इन्हें community images के ज़रिए या bootstrap builder scripts का उपयोग करके build किया जाता है।

- **Default User**: `gentoo` या `root` (Community build पर निर्भर)
- **System Model**: Source compilation based rolling-release model.

#### Gentoo initialization and world upgrades:

``` bash
# Sync portage software tree
sudo emerge --sync

# Update installed packages (@world set) along with dependencies
sudo emerge --ask --verbose --update --newuse --deep @world

# Clean obsolete dependencies
sudo emerge --ask --depclean

# Merge configuration changes (if any)
sudo dispatch-conf
```


