---
title: "☁️ VPS पर Linux: विस्तृत इंस्टॉलेशन गाइड"
date: 2026-06-30
tags: ["linux","vps","cloud","qcow2","digitalocean","hetzner","linode","ovh","proxmox","cloud-init","virtualization","hypervisor"]
---

## भूमिका: Virtualization और Virtual Private Server (VPS) क्या है?

तकनीकी शब्दावली में, **Virtual Private Server (VPS)** एक ऐसी तकनीक है जिसके द्वारा एक भौतिक सर्वर (Physical Server) को virtualization सॉफ्टवेयर (जिसे **Hypervisor** कहा जाता है) की मदद से कई छोटे, स्वतंत्र वर्चुअल कंप्यूटर्स में विभाजित कर दिया जाता है।

यह प्रक्रिया मुख्य रूप से दो प्रकार के Hypervisors के माध्यम से होती है:

- **Type 1 Hypervisor (Bare-Metal)**: यह सीधे भौतिक सर्वर के हार्डवेयर पर चलता है। इसके उदाहरण हैं **KVM (Kernel-based Virtual Machine)**, VMware ESXi, और Proxmox VE (KVM आधारित)। यह बेहद कुशल और हाई-परफॉर्मेंस होता है।
- **Type 2 Hypervisor (Hosted)**: यह एक पहले से मौजूद ऑपरेटिंग सिस्टम के ऊपर एप्लीकेशन के रूप में चलता है, जैसे VirtualBox या VMware Workstation।

VPS सेवाएं (जैसे DigitalOcean, Linode, Hetzner, या OVH) मुख्य रूप से KVM या Xen जैसे bare-metal virtualization तकनीकों का उपयोग करती हैं। इससे हर उपभोक्ता (customer) को अपना एक स्वतंत्र, सुरक्षित और dedicated वातावरण मिलता है, जहाँ वे अपनी इच्छानुसार रूट एक्सेस (root access), कस्टम कर्नेल (custom kernel), और पैकेजों को कॉन्फ़िगर कर सकते हैं।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Cloud Images बनाम Standard ISO: बुनियादी अंतर

</div>

पारंपरिक रूप से, जब हम कंप्यूटर पर लिनक्स इंस्टॉल करते हैं, तो हम ISO इमेज को बूट करते हैं और एक ग्राफिकल या टेक्स्ट इंस्टॉलर (जैसे Anaconda या Calamares) के ज़रिए मैनुअल पार्टीशनिंग, यूजर क्रिएशन और सेटिंग्स चुनते हैं।

लेकिन क्लाउड इन्फ्रास्ट्रक्चर में यह प्रक्रिया बहुत धीमी होगी। इसलिए क्लाउड प्रोवाइडर्स **Cloud Images** (आमतौर पर QCOW2 या RAW फॉर्मेट) का उपयोग करते हैं। ये पहले से इंस्टॉल और कॉन्फ़िगर की गई डिस्क इमेजेस होती हैं, जो बूट होते ही **cloud-init** टूल के माध्यम से प्रोवाइडर के Metadata API से कनेक्ट होकर होस्टनेम, नेटवर्क आईपी, और SSH चाबियों को खुद-ब-खुद कॉन्फ़िगर कर लेती हैं।

</div>

</div>

------------------------------------------------------------------------

## 1. cloud-init क्या है और यह कैसे काम करता है?

जब आप क्लाउड पर एक नया VPS बनाते हैं, तो वह सर्वर बूट होते ही आपके SSH keys, hostname और network को कैसे पहचानता है? इसका उत्तर है **cloud-init**।

cloud-init एक multi-distribution package है जो लिनक्स क्लाउड इमेज के पहले बूट के दौरान रन होता है। इसके कार्य करने की प्रक्रिया कुछ इस प्रकार है:

1.  **Metadata Discovery**: बूट होते ही cloud-init क्लाउड प्रोवाइडर के लोकल लिंक-लोकल आईपी एड्रेस (आमतौर पर `169.254.169.254`) पर HTTP रिक्वेस्ट भेजता है।
2.  **Data Fetching**: इस API एंडपॉइंट से यह इंस्टेंस की विशिष्ट जानकारी (SSH Public Key, Hostname, Network Interfaces configuration, UserData) डाउनलोड करता है।
3.  **Configuration Execution**: इसके बाद cloud-init स्थानीय सिस्टम पर निम्न बदलाव करता है:
    - `/etc/hostname` को अपडेट करता है।
    - `~/.ssh/authorized_keys` में यूजर की SSH पब्लिक की लिखता है।
    - यूजर के द्वारा दिए गए कस्टम स्क्रिप्ट्स (जैसे `bootcmd` या `runcmd`) को चलाता है।

------------------------------------------------------------------------

## 2. DigitalOcean पर Custom Linux Image इंस्टॉल करना

DigitalOcean आपको आधिकारिक लिनक्स डिस्ट्रोज़ के अलावा अपनी खुद की बनाई हुई या इंटरनेट से डाउनलोड की गई कस्टम QCOW2/RAW इमेजेस को अपलोड करके Droplet बनाने की अनुमति देता है।

### कदम-दर-कदम (Step-by-Step) निर्देश:

#### स्टेप A: इमेज लिंक खोजना और डाउनलोड करना

सबसे पहले अपने पसंदीदा ऑपरेटिंग सिस्टम की आधिकारिक क्लाउड इमेज ढूंढें। उदाहरण के लिए, Fedora Cloud, Arch Linux, या Debian Cloud की इमेजेस।

``` text
Fedora Cloud Image: https://download.fedoraproject.org/pub/fedora/linux/releases/40/Cloud/x86_64/images/Fedora-Cloud-Base-Generic.x86_64-40-1.14.qcow2
Debian Cloud Image: https://cloud.debian.org/images/cloud/bookworm/latest/debian-12-genericcloud-amd64.qcow2
Arch Cloud Image: https://fastly.mirror.pkgbuild.com/images/latest/Arch-Linux-x86_64-cloudimg.qcow2
```

#### स्टेप B: DigitalOcean में इमेज इम्पोर्ट करना

1.  अपने **DigitalOcean Control Panel** में लॉग इन करें।
2.  बाएँ साइडबार से **Images** पर क्लिक करें, फिर **Custom Images** टैब चुनें।
3.  **Add Image** बटन पर क्लिक करें। आपके पास दो विकल्प होंगे: या तो अपने कंप्यूटर से फाइल अपलोड करें, या सीधे किसी URL से इम्पोर्ट करें। (URL विकल्प ज़्यादा तेज़ है क्योंकि DO के सर्वर्स सीधे इमेज को डाउनलोड करते हैं)।
4.  इमेज का URL पेस्ट करें, उसे एक नाम दें (जैसे `Debian-12-Custom`), डिस्ट्रो का नाम चुनें (जैसे `Debian`), और वह क्षेत्र (Region) चुनें जहाँ आप सर्वर बनाना चाहते हैं।
5.  **Upload Image** पर क्लिक करें। DigitalOcean इसे डाउनलोड और डीकंप्रेस करेगा। प्रक्रिया पूरी होने पर इमेज की स्थिति "Active" हो जाएगी।

#### स्टेप C: Droplet बनाना

1.  कस्टम इमेज की लाइन में दाईं ओर **More** (तीन डॉट्स) बटन पर क्लिक करें और **Create Droplet** चुनें।

2.  droplet का साइज़ (CPU/RAM) चुनें।

3.  अपनी **SSH Key** का चयन करें। (यह बहुत महत्वपूर्ण है क्योंकि क्लाउड इमेज में कोई डिफ़ॉल्ट पासवर्ड सेट नहीं होता है)।

4.  **Create Droplet** पर क्लिक करें। DigitalOcean क्लाउड-इनिट के माध्यम से आपकी चुनी हुई SSH की को Droplet के अंदर इंजेक्ट कर देगा।

5.  अब अपने टर्मिनल से कनेक्ट करें:

    ``` bash
    # यदि आपने Fedora इमेज यूज़ की है:
    ssh fedora@your_droplet_ip

    # यदि आपने Debian इमेज यूज़ की है:
    ssh admin@your_droplet_ip

    # यदि आपने Arch Linux इमेज यूज़ की है:
    ssh arch@your_droplet_ip
    ```

------------------------------------------------------------------------

## 3. Hetzner Cloud पर Custom QCOW2/RAW बूट इंस्टॉलेशन

Hetzner Cloud में डिफ़ॉल्ट रूप से कस्टम इमेज डायरेक्ट अपलोड करने का विकल्प कुछ क्षेत्रों में सीमित हो सकता है, लेकिन हम Hetzner के **Rescue System** का उपयोग करके किसी भी कस्टम इमेज को सीधे VPS की हार्ड ड्राइव पर लिख (flash) सकते हैं।

### कदम-दर-कदम (Step-by-Step) निर्देश:

#### स्टेप A: नया VM बनाते समय UserData बदलना

Hetzner का अपना इन-हाउस क्लाउड-इनिट इन्फ्रास्ट्रक्चर होता है, जो कुछ डिफ़ॉल्ट सेटिंग्स को ओवरराइड कर देता है। इसे रोकने के लिए, जब आप Hetzner Console पर सर्वर बनाएं, तो नीचे **User Data** सेक्शन में यह YAML कॉन्फ़िगरेशन पेस्ट करें:

``` yaml
#cloud-config
vendor_data: {'enabled': false}
```

यह महत्वपूर्ण है क्योंकि अन्यथा Hetzner का `vendor_data` आपके बूट सेटअप में रूट एक्सेस को ब्लॉक कर सकता है जिससे आप लॉग इन नहीं कर पाएंगे।

#### स्टेप B: Rescue Mode में बूट करना

1.  Hetzner Cloud Console में अपने सर्वर पर क्लिक करें।

2.  बाएँ मेनू से **Rescue** पर क्लिक करें।

3.  **Enable Rescue Mode** पर क्लिक करें, अपनी SSH की चुनें, और **Reset Server** बटन दबाकर सर्वर को रीबूट करें।

4.  अब आपका सर्वर रैम-डिस्क (RAM Disk) वाले रेस्क्यू मोड में बूट होगा। रेस्क्यू मोड में अपने टर्मिनल से कनेक्ट करें:

    ``` bash
    ssh root@your_server_ip
    ```

#### स्टेप C: डिस्क की पहचान करना और इमेज लिखना

1.  रेस्क्यू मोड में डिस्क का नाम पता करें:

    ``` bash
    lsblk
    # आमतौर पर आपकी मुख्य हार्ड ड्राइव /dev/sda या /dev/nvme0n1 होगी।
    ```

2.  क्लाउड इमेज को रेस्क्यू रैम के अंदर डाउनलोड करें:

    ``` bash
    # Fedora Cloud Image download:
    curl -O https://download.fedoraproject.org/pub/fedora/linux/releases/40/Cloud/x86_64/images/Fedora-Cloud-Base-Generic.x86_64-40-1.14.qcow2
    ```

3.  Qemu यूटिलिटी का उपयोग करके इमेज को डिस्क पर लिखें। यह कमांड QCOW2 फ़ाइल को अनपैक करके सीधे वास्तविक हार्ड ड्राइव पर रॉ बाइनरी में लिख देगी:

    ``` bash
    # यदि आपकी मुख्य डिस्क /dev/sda है:
    qemu-img convert -f qcow2 -O raw Fedora-Cloud-Base-Generic.x86_64-40-1.14.qcow2 /dev/sda
    ```

4.  डिस्क पर लिखने के बाद, कैश को रैम से सिंक करें:

    ``` bash
    sync
    ```

5.  अब Hetzner Cloud Panel से रेस्क्यू मोड को डिसेबल करें और सर्वर को रीबूट करें।

6.  रीबूट के बाद सर्वर आपकी नई लिनक्स इमेज से सामान्य रूप से बूट होगा। अब आप कनेक्ट कर सकते हैं:

    ``` bash
    ssh fedora@your_server_ip
    ```

------------------------------------------------------------------------

## 4. Linode पर Custom Disk Image Setup (Lish Console)

Linode (Akamai) पर कस्टम बूट करने के लिए हमें Linode के इंटरनल बूट मैनेजर को "Direct Disk" मोड पर सेट करना होता है, ताकि वह खुद का कर्नेल लोड करने के बजाय हमारी डिस्क इमेज के अंदर मौजूद GRUB बूटलोडर और लिनक्स कर्नेल का उपयोग करे।

### कदम-दर-कदम (Step-by-Step) निर्देश:

#### स्टेप A: रेस्क्यू मोड एक्टिवेट करना

1.  Linode Manager में जाकर एक नया **Linode** इंस्टेंस बनाएं (आप किसी भी डिफ़ॉल्ट ओएस का चयन कर सकते हैं, क्योंकि हम इसे पूरी तरह से मिटाने वाले हैं)।
2.  इंस्टेंस बनने के बाद, सर्वर को पावर ऑफ (Power Off) करें।
3.  ऊपर दाईं ओर **Rescue** टैब पर क्लिक करें।
4.  Linode डिस्क डिवाइस को डिफ़ॉल्ट असाइनमेंट के साथ रेस्क्यू मोड में बूट करने की पुष्टि करें (आमतौर पर आपकी डिस्क `/dev/sda` पर माउंट होगी)।

#### स्टेप B: Lish (Linode Shell) का उपयोग करके कनेक्ट करना

1.  Linode में रेस्क्यू मोड शुरू होने के बाद, **Launch LISH Console** बटन पर क्लिक करें। यह एक वेब-बेस्ड टर्मिनल खोलेगा जो सर्वर के सीरियल कंसोल से सीधा कनेक्शन देता है।

2.  रेस्क्यू मोड में, नेटवर्क इनेबल्ड होने के बाद, रेस्क्यू एपीटी कैश को अपडेट करें और Qemu टूल्स इंस्टॉल करें:

    ``` bash
    apt update && apt install qemu-utils curl -y
    ```

3.  कस्टम लिनक्स क्लाउड इमेज को डाउनलोड करें:

    ``` bash
    curl -O https://fastly.mirror.pkgbuild.com/images/latest/Arch-Linux-x86_64-basic.qcow2
    ```

4.  इसे वास्तविक वर्चुअल डिस्क (`/dev/sda`) पर लिखें:

    ``` bash
    qemu-img convert -f qcow2 -O raw Arch-Linux-x86_64-basic.qcow2 /dev/sda
    ```

5.  सिंक कमांड चलाकर आश्वस्त करें कि सारा डेटा डिस्क पर लिखा जा चुका है:

    ``` bash
    sync
    ```

#### स्टेप C: Linode Configuration बदलना (Direct Disk Configuration)

1.  LISH बंद करें और Linode Manager इंटरफेस पर वापस आएं।

2.  **Configurations** टैब में जाएं, और अपने बूट प्रोफ़ाइल के आगे **Edit** पर क्लिक करें।

3.  **Kernel** सेटिंग्स के अंतर्गत, डिफ़ॉल्ट रूप से "Linode Kernel" चयनित होगा। इसे बदलकर **Direct Disk** (या GRUB2) कर दें। यह लिनोड को निर्देश देता है कि वह आपके द्वारा डिस्क पर फ्लैश किए गए वास्तविक GRUB बूटलोडर को बूट करे।

4.  सेटिंग्स सेव करें और सर्वर को **Reboot** करें।

5.  बूट होने के बाद आप अपने टर्मिनल से कनेक्ट कर सकते हैं:

    ``` bash
    ssh arch@your_linode_ip
    ```

------------------------------------------------------------------------

## 5. OVH Eco (Kimsufi) पर Custom Image (BYOI) बूट करना

OVH Cloud और उसके इको-ब्रांड्स (जैसे Kimsufi) पर **Bring Your Own Image (BYOI)** सुविधा मिलती है। इसके माध्यम से आप बिना किसी रेस्क्यू मोड के मैनुअल झंझट के, सीधे कंट्रोल पैनल से किसी बाहरी HTTP लिंक से इमेज फ़्लैश करवा सकते हैं।

### कदम-दर-कदम (Step-by-Step) निर्देश:

#### स्टेप A: इमेज का Hash/Checksum वैल्यू पता करना

OVH सुरक्षा कारणों से केवल वही इमेजेस फ्लैश करता है जिनका SHA256 चेकसम पहले से सत्यापित हो।

1.  अपने लोकल टर्मिनल पर अपनी चुनी हुई क्लाउड इमेज का SHA256 चेकसम निकालें:

    ``` bash
    sha256sum Arch-Linux-x86_64-cloudimg.qcow2
    # यह आपको एक लंबी हेक्साडेसिमल स्ट्रिंग (checksum hash) देगा। इसे कॉपी कर लें।
    ```

#### स्टेप B: OVH Control Panel में कॉन्फ़िगरेशन सबमिट करना

1.  **OVHcloud Manager** में लॉग इन करें।
2.  **Dedicated Servers** सेक्शन में जाएं और अपना सर्वर सिलेक्ट करें।
3.  दाहिनी ओर **OS Installation** विकल्प के बगल में स्थित डॉट्स पर क्लिक करें और **Install** चुनें।
4.  यहाँ **Bring Your Own Image (BYOI)** विकल्प चुनें।
5.  निम्न फ़ील्ड्स को सावधानीपूर्वक भरें:
    - **Image URL**: आपकी इमेज का सीधा HTTP/HTTPS लिंक (जैसे: `https://fastly.mirror.pkgbuild.com/images/latest/Arch-Linux-x86_64-cloudimg.qcow2`)।
    - **Image Type**: `qcow2` या `raw` (जो भी फ़ॉर्मेट हो)।
    - **Checksum Type**: `sha256`
    - **Image Checksum**: स्टेप A में निकाला गया SHA256 हैश पेस्ट करें।
    - **Path of the EFI bootloader**: यदि इमेज UEFI बूट सपोर्ट करती है, तो EFI फाइल का पाथ लिखें: `\efi\boot\bootx64.efi`
6.  **Config Drive UserData** सेक्शन में जाकर अपनी SSH पब्लिक की इनपुट करें ताकि बूट होते ही आपका क्रेडेंशियल सेट हो सके।
7.  **Install the system** पर क्लिक करें। OVH का बैकएंड सर्वर को बूट करेगा, डिस्क को आपके दिए गए URL से ओवरराइट करेगा और आपको ईमेल के ज़रिए सूचित करेगा।

------------------------------------------------------------------------

## 6. Proxmox VE पर KVM Cloud-init VM बनाना (CLI Method)

Proxmox VE (PVE) पर कस्टम क्लाउड इमेजेस का उपयोग करके वर्चुअल मशीन बनाने के लिए वेब इंटरफेस से ज़्यादा तेज और कुशल तरीका Proxmox का कमांड लाइन इंटरफेस (CLI) है।

### कदम-दर-कदम (Step-by-Step) निर्देश:

#### स्टेप A: Proxmox Host पर क्लाउड इमेज डाउनलोड करना

1.  अपने Proxmox नोड पर SSH के माध्यम से लॉग इन करें (या Proxmox Shell खोलें)।

2.  इमेज डाउनलोड करें:

    ``` bash
    wget https://fastly.mirror.pkgbuild.com/images/latest/Arch-Linux-x86_64-cloudimg.qcow2
    ```

#### स्टेप B: VM का निर्माण और डिस्क इम्पोर्ट

1.  कमांड लाइन से एक नई वर्चुअल मशीन बनाएं (मान लेते हैं VM ID `100` है):

    ``` bash
    qm create 100 --name Linux-Cloud-Template --memory 2048 --cores 2 --net0 virtio,bridge=vmbr0
    ```

2.  QCOW2 इमेज को Proxmox के स्टोरेज वॉल्यूम में इम्पोर्ट करें (मान लें आपका लोकल डिस्क पूल `local-lvm` नाम से है):

    ``` bash
    qm disk import 100 Arch-Linux-x86_64-cloudimg.qcow2 local-lvm
    ```

    *(यह कमांड इमेज को कन्वर्ट करके Proxmox VM के डिस्क वॉल्यूम में रजिस्टर कर देगी)*

3.  अब उस इम्पोर्टेड डिस्क को VM से कनेक्ट करें:

    ``` bash
    qm set 100 --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-100-disk-0
    ```

#### स्टेप C: Cloud-init Drive जोड़ना और बूट आर्डर सेट करना

1.  Cloud-init डेटा भेजने के लिए एक वर्चुअल CD-ROM ड्राइव (Cloud-Init drive) जोड़ें:

    ``` bash
    qm set 100 --ide2 local-lvm:cloudinit
    ```

2.  VM को बूट करने के लिए इम्पोर्टेड डिस्क को प्राइमरी बूट डिवाइस बनाएं:

    ``` bash
    qm set 100 --boot order=scsi0
    ```

3.  पॉइंटर और रीबूट डिस्प्ले सेटिंग्स को ऑप्टिमाइज़ करें:

    ``` bash
    qm set 100 --serial0 socket --vga serial0
    ```

4.  अब Proxmox GUI में जाएं, VM 100 पर क्लिक करें, और **Cloud-Init** सेक्शन में अपनी SSH Keys, IP configurations (DHCP/Static IP), और DNS भरें।

5.  VM को स्टार्ट करें। बूट के दौरान cloud-init डेटा को डिस्क से रीड करके सर्वर को स्टार्ट कर देगा।

<div class="backlinks-container" style="margin-top: 3rem;">

<div class="backlinks-title">

Linked References (Backlinks)

</div>



</div>
