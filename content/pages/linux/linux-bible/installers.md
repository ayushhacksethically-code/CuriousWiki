---
title: "🔧 Linux Auto-Installers (Archinstall, Anaconda, Calamares)"
date: 2026-07-01
tags: ["linux","installation","archinstall","anaconda","calamares","kickstart","preseed","debian","fedora","ubuntu","arch","cockpit","webui"]
---

पारंपरिक लिनक्स इंस्टॉलेशन में डिस्क विभाजन (partitioning), फ़ाइल सिस्टम निर्माण, बूटलोडर कॉन्फ़िगरेशन और बेसिक यूज़र सेटअप करने में समय और तकनीकी ज्ञान की आवश्यकता होती है। इस प्रक्रिया को सरल और स्वचालित (automated) करने के लिए विभिन्न distributions अलग-अलग **Auto-installers** का उपयोग करते हैं।

यह guide लिनक्स इकोसिस्टम के तीन सबसे लोकप्रिय auto-installers (Archinstall, Anaconda, Calamares) की नवीनतम कार्यप्रणाली, उनके उपयोग और unattended (स्वचालित) इंस्टॉलेशन सेटिंग्स को समझाती है।

------------------------------------------------------------------------

## 1. Archinstall (Arch Linux Guided Auto-installer)

**Archinstall** एक Python-based guided installer और helper library है जो Arch Linux live ISO के साथ pre-installed आता है। यह उन यूज़र्स के लिए बेहतरीन टूल है जो Arch के मैन्युअल कमांड्स के बिना एक त्वरित और मानक इंस्टॉलेशन चाहते हैं।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

महत्वपूर्ण चेतावनी (Warnings)

</div>

- **अलग डिफ़ॉल्ट्स (Different Defaults)**: यह इंस्टॉलर रेगुलर मैनुअल इंस्टॉलेशन गाइड से थोड़े alag defaults का उपयोग करता है। इसलिए जब भी आप Arch community से support मांगें, तो यह ज़रूर बताएं कि आपने सिस्टम `archinstall` के ज़रिए इंस्टॉल किया है और `/var/log/archinstall/install.log` फ़ाइल ज़रूर प्रदान करें।
- **मैन्युअल विभाजन (Manual Partitioning)**: इसका मैन्युअल विभाजन टूल ओवरलैपिंग पार्टिशन्स (overlapping partitions), गलत तरीके से संरेखित पार्टिशन्स (misaligned partitions) या बैकअप GPT हेडर के साथ ओवरलैप होने वाली अंतिम विभाजन त्रुटियों से सुरक्षा प्रदान नहीं करता है।
- **खाली रूट पासवर्ड (Root Password)**: यदि आप रूट पासवर्ड को खाली छोड़ देते हैं, तो रूट अकाउंट डिसेबल हो जाएगा और एडमिनिस्ट्रेटर प्रिविलेज के लिए `sudo` का उपयोग होगा।

</div>

</div>

### मुख्य विशेषताएं (Archinstall 4.4 Updates):

- **Color-Coded Validation**: नए 4.4+ वर्जन्स में इंस्टॉलेशन से ठीक पहले एक कॉम्प्रिहेंसिव चेक रन होता है:
  - <span style="color: var(--accent-danger); font-weight: bold;">Red Warning</span>: बूटलोडर त्रुटियों जैसे क्रिटिकल इश्यूज जो बूटिंग रोक सकते हैं (इंस्टॉलेशन ब्लॉक हो जाता है)।
  - <span style="color: var(--accent-warning); font-weight: bold;">Yellow Warning</span>: नेटवर्क कॉन्फ़िगरेशन या नॉन-क्रिटिकल एरर्स की चेतावनी।
  - <span style="color: var(--accent-success); font-weight: bold;">Green Status</span>: सिस्टम सुरक्षित तरीके से इंस्टॉल होने के लिए तैयार है।
- **New Profiles support**: Shipped desktop profiles में अब **Niri DankMaterialShell** का सपोर्ट और Plymouth boot-splash सेटिंग्स उपलब्ध हैं।
- **Scriptable profiles**: यह python helper library के रूप में भी काम कर सकता है जिससे custom automated python configurations run की जा सकें।

#### कैसे चलाएं (Running the Installer):

1.  आधिकारिक Arch ISO बूट करें।

2.  **(वैकल्पिक) Live ISO पर Archinstall अपडेट करें** (यदि ISO बनने के बाद कोई नया अपडेट आया हो):

    ``` bash
    sudo pacman -Sy archinstall
    ```

3.  टर्मिनल पर इंस्टॉलर रन करें:

    ``` bash
    archinstall
    ```

4.  दिए गए विकल्पों का पालन करें, और इंस्टॉलेशन पूरा होने के बाद रीबूट करें।

#### Network & Mirror configuration notes:

- यह लाइव ISO पर कॉन्फ़िगर की गई वायर्ड या वायरलेस (जैसे `iwctl`) सेटिंग्स और वाईफाई पासवर्ड्स को ऑटोमैटिक रूप से टारगेट सिस्टम में कॉपी कर लेता है।
- अतिरिक्त पैकेज डालने के लिए आप `Write additional packages to install` प्रॉम्प्ट के आगे पैकेजेस के नाम स्पेस देकर लिख सकते हैं।

#### Unattended/Silent installation (कस्टम स्क्रिप्ट):

सुरक्षित और ऑटोमैटेड इंस्टॉलेशन के लिए आप JSON कॉन्फ़िगरेशन फाइल्स का उपयोग कर सकते हैं:

``` bash
archinstall --config user_configuration.json --creds user_credentials.json
```

------------------------------------------------------------------------

## 2. Anaconda Installer (Fedora, RHEL & CentOS)

**Anaconda** रेड हैट (Red Hat) और फेडोरा (Fedora) द्वारा उपयोग किया जाने वाला आधिकारिक, शक्तिशाली और एडवांस सिस्टम इंस्टॉलर है। यह पारंपरिक रूप से GTK-based GUI और TUI मोड्स में काम करता रहा है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Modern Update: Web UI / Cockpit Integration

</div>

Fedora और RHEL के नए संस्करणों में, Anaconda को एक आधुनिक **Web-based User Interface (Web UI)** में ट्रांजिशन किया जा रहा है। यह नया इंटरफ़ेस **Cockpit** तकनीक और PatternFly डिज़ाइन टोकन्स पर आधारित है, जो HTML/CSS/JS के माध्यम से एक बेहद साफ और उत्तरदायी (responsive) स्थानीय तथा रिमोट इंस्टॉलेशन अनुभव प्रदान करता है।

</div>

</div>

### मुख्य विशेषताएं:

- **Kickstart Files (ऑटोमेशन)**: Anaconda का सबसे शक्तिशाली पहलू **Kickstart** है। यह एक साधारण टेक्स्ट फ़ाइल होती है जिसमें इंस्टॉलेशन के सभी उत्तर (पार्टीशन, पैकेजेस, यूज़र, टाइमज़ोन) पहले से लिखे होते हैं।
- **Anaconda-ks.cfg**: हर बार जब आप Fedora मैन्युअली इंस्टॉल करते हैं, तो Anaconda आपके द्वारा चुने गए विकल्पों के आधार पर `/root/anaconda-ks.cfg` फ़ाइल ऑटो-जेनरेट करता है, जिसे आप भविष्य में क्लोन बनाने के लिए उपयोग कर सकते हैं।

#### Kickstart Script का उदाहरण (Basic kickstart configuration):

``` text
# System authorization information
auth --enableshadow --passalgo=sha512

# Use graphical install
graphical

# Keyboard layouts, language & timezone
keyboard --vckeymap=us --layout=us
lang en_US.UTF-8
timezone Asia/Kolkata --isUtc

# Root password
rootpw --plaintext supersecretpassword

# Partitioning configuration (Automatic partition)
autopart --type=lvm

# Packages to install
%packages
@core
neofetch
git
%end
```

#### Kickstart बूट करने का कमांड:

Fedora बूट मेनू पर जाकर `Tab` या `e` दबाएं और बूट पैरामीटर्स के अंत में अपनी किकस्टार्ट फ़ाइल का HTTP URL जोड़ें:

``` bash
linux inst.ks=http://192.168.1.100/ks.cfg
```

------------------------------------------------------------------------

## 3. Calamares (Distribution Independent Installer Framework)

**Calamares** एक ओपन-सोर्स, सिस्टम-स्वतंत्र (distribution agnostic) ग्राफical installer framework है। इसका उपयोग Manjaro, Debian Live, EndeavourOS, NixOS, KDE Neon और अन्य सौ से अधिक डिस्ट्रोज़ द्वारा किया जाता है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Calamares 3.4.x Updates (Codeberg Migration)

</div>

Calamares प्रोजेक्ट अब आधिकारिक रूप से **Codeberg** पर माइग्रेट हो चुका है। 3.4.x सीरीज़ में मुख्य सुधार NVMe और MMC फ़्लैश ड्राइव्स पर पार्टीशन एलाइनमेंट (partition alignment forcing 4K blocks) को लेकर हैं। इसके अलावा KDE Plasma और डिस्प्ले मैनेजर्स के कॉन्फ़िगरेशन को सिंक्रोनाइज़ करने की क्षमता में सुधार किया गया है।

</div>

</div>

### मुख्य विशेषताएं:

- **Highly Modular**: Calamares को पूरी तरह से C++ और Python मॉड्यूल्स के ज़रिए कस्टमाइज़ किया जा सकता है।
- **Branding Integration**: डिस्ट्रो डेवलपर्स बहुत आसानी से इसकी थीम, लोगो, slides और बैकएंड ऑपरेशन्स को XML/YAML फाइलों द्वारा बदल सकते हैं।
- **Luks Encryption & Btrfs support**: बूट-सपोर्ट के साथ डिस्क पर LUKS encryption और Btrfs subvolumes को सेट करने के लिए एडवांस पार्टीशनिंग विजेट्स प्रदान करता है।

#### कस्टम मॉड्यूल्स और कॉन्फ़िगरेशन:

Calamares की मुख्य सेटिंग्स `/etc/calamares/settings.conf` में होती हैं। डेवलपर यहाँ तय करते हैं कि कौन से मॉड्यूल्स किस क्रम में चलेंगे:

``` yaml
# /etc/calamares/settings.conf example snippet
sequence:
    - show:
        - welcome
        - locale
        - keyboard
        - partition
        - users
    - exec:
        - partition
        - mount
        - unpackfs
        - bootloader
    - show:
        - finished
```


