---
title: "📂 Filesystem Hierarchy Standard (FHS)"
date: 2026-07-24
tags: ["linux","fhs","directories","structure","filesystem"]
---

# Filesystem Hierarchy Standard (FHS) Guide

Standard Unix/Linux directory tree structure, directories का purpose, और details. हर directory का behaviour 5 point checklist के रूप में।

---

### `/afs` (Andrew File System)
- Andrew File System एक **distributed network file system** है जो global file sharing के लिए use होता है।
- यह remote server के files को local directory paths पर automatically **mount** और sync करता है।
- इसमें access permissions को manage करने के लिए **secure, token-based authentication** का use किया जाता है।
- यह mostly academic, research institutes, और बड़े corporate networks में use होता है।
- यह local storage space को save करता है क्योंकि files remote storage servers पर store होती हैं।

### `/bin` (Essential User Binaries)
- इसमें standard binary executables (executable commands) होते हैं जिन्हें सभी users use कर सकते हैं।
- यहाँ core terminal commands जैसे `ls`, `cp`, `mv`, `rm`, और `cat` की files store होती हैं।
- System को repair और single-user mode में boot करने के लिए ये programs ज़रूरी हैं।
- इसमें subdirectories नहीं होतीं, सिर्फ core executable files और command scripts होते हैं।
- Modern Linux distributions में यह `/usr/bin` का एक **symbolic link** (symlink) होता है।

### `/boot` (Boot Loader Files)
- इसमें system startup और booting process के लिए सभी ज़रूरी files store होती हैं।
- यहाँ Linux kernel image (`vmlinuz`) और core booting RAM scripts (`initramfs`) होते हैं।
- इसमें bootloader (जैसे GRUB) के settings parameters और system configurations होते हैं।
- Startup sequence के दौरान BIOS/UEFI firmware सबसे पहले यहाँ की files को read करता है।
- Protection के लिए, इसको hard disk partition पर एक अलग dedicated disk partition में रखा जाता है।

### `/dev` (Device Files)
- इसमें hardware devices को represent करने वाली विशेष **device files** होती हैं।
- Physical components जैसे disks (`/dev/sda`), terminal consoles (`/dev/tty`), और ports यहाँ files के रूप में होते हैं।
- इसमें virtual devices भी होते हैं जैसे `/dev/null` (जो सारे data को discard कर देता है)।
- यह directory application softwares को direct physical hardware से communication करने का interface देती है।
- Operating system और kernel daemon `udev` इन files को dynamically detect और manage करते हैं।

### `/etc` (Host-Specific System Configurations)
- इसमें system-wide configurations settings और applications startup scripts होती हैं।
- यहाँ text-only settings files जैसे `/etc/passwd` और `/etc/fstab` save रहती हैं।
- इसमें binary executable programs नहीं होते, इसलिए इसका backup और tracking बहुत आसान है।
- इन files को edit करके system administrator server configurations और global settings को change कर सकते हैं।
- इसका full form historically "Editable Text Configuration" या basic etcetera settings folder है।

### `/home` (User Home Directories)
- यह system के सभी standard users के personal files और setups का storage path है।
- इसमें users के personal documents, downloads, desktop files, और private configurations save रहती हैं।
- हर user की अपनी विशिष्ट subdirectory होती है, जैसे `/home/username`।
- Users के पास अपने home directories के अंदर files पर full read, write, और execute permissions होती हैं।
- यह security के लिए personal data को core operating system files से completely separate रखता है।

### `/lib` (Essential Shared Libraries)
- इसमें binaries (जो `/bin` और `/sbin` में हैं) के लिए ज़रूरी **shared library files** होती हैं।
- Library files का format standard `.so` format (Windows के DLL files जैसे) होता है।
- यह kernel modules और systems startup के लिए core dependency libraries provide करता है।
- यहाँ device driver files और kernel modules `/lib/modules` path पर store होते हैं।
- Modern Linux distributions builds में यह folder `/usr/lib` से symbolic link होता है।

### `/lib64` (64-bit Shared Libraries)
- इसमें 64-bit binaries को run करने के लिए ज़रूरी 64-bit **shared library files** store होती हैं।
- यह folder multi-architecture execution (32-bit और 64-bit दोनों) को support करने के लिए होता है।
- इसमें 64-bit processors पर executable tools और programs को build करने की libraries होती हैं।
- यह compatibility bugs और architecture-related program crashes को prevent करता है।
- Modern Linux distributions configurations में यह `/usr/lib64` का symlink होता है।

### `/media` (Mount Point for Removable Media)
- यह removable storage devices के लिए एक temporary **mount directory** है।
- USB flash keys, CDs, DVDs और external backup drives यहाँ automatically mount होते हैं।
- जब भी कोई device system में connect होता है, OS यहाँ उसके लिए auto folder create करता है।
- Standard users के लिए external storage readable/writable access को simple और secure बनाता है।
- Desktop environments (जैसे GNOME/KDE) इस folder path के metadata को directly read करते हैं।

### `/mnt` (Temporarily Mounted Filesystems)
- यह system administrators को filesystems manually mount करने के लिए target path देता है।
- इसे backup restore करने या troubleshooting के समय temporary filesystems connect करने के लिए use करते हैं।
- Removable media की तरह यहाँ automatic plug-and-play mounting नहीं होती।
- Sysadmins manual command run करके external storage या network drives को इस folder से link करते हैं।
- यह एक empty folder template है जो clean state system operations के लिए reserve रहता है।

### `/nix` (Nix Package Store)
- यह Nix package management system का core package storage store space है।
- सभी software tools और applications dependencies यहाँ secure और isolated state में रहते हैं।
- हर package के लिए unique cryptographic hashes के साथ directory paths generate होते हैं।
- यह dynamic isolated dependencies mapping dependency conflicts ("dependency hell") को zero करती है।
- एक ही computer पर बिना system config crash किए एक application के multiple versions run हो सकते हैं।

### `/opt` (Optional Add-on Packages)
- यह optional, third-party software packages को install करने के लिए use किया जाता है।
- Proprietary softwares जैसे Google Chrome, Zoom, या custom databases यहाँ install होते हैं।
- हर application resources और binaries को अपने dedicated subdirectory के अंदर isolated रखती है।
- यह manual/external programs को system-wide library folders से clean और separate रखता है।
- इसका name stands for "Optional" application code storage locations है।

### `/proc` (Process Virtual Filesystem)
- यह running processes aur system resources status check करने का **virtual pseudo-filesystem** है।
- यह RAM में dynamically load होता है और physical disk space पर 0 byte consumption करता है।
- इसमें active runtime processes directory (जैसे pid folders `/proc/123`) होती हैं।
- System metrics जैसे memory status, CPU usage details और specs read करने के parameters देता है।
- Administrators यहाँ की dynamic settings को edit करके kernel parameters runtime modify कर सकते हैं।

### `/root` (Root User Home Directory)
- यह system के master user (System Administrator Root) की personal home directory space है।
- Security और safety reasons के लिए इसे main user `/home` path partition से separate रखा जाता है।
- Ordinary system users को इस directory records को read या write करने का access नहीं होता है।
- Root user के customization profiles settings files और backups यहाँ store होते हैं।
- Core system partitions crash होने पर recovery commands execute करने के लिए ज़रूरी है।

### `/run` (Runtime Transient Data)
- यह system startup से लेकर अभी तक चल रहे active processes का temporary data folder है।
- यह RAM (tmpfs) में dynamically mount होता है जो system reboot पर completely clean हो जाता है।
- इसमें dynamic process IDs (`.pid` files), software sockets, और system locks save होते हैं।
- इसकी मदद से daemons और background services run status coordinate और share करते हैं।
- यह एक modern standardized path layout है जिसने older `/var/run` directories को replace किया है।

### `/sbin` (System binaries)
- इसमें root user/system administrator के use के लिए essential system binary programs होते हैं।
- Administrative commands जैसे `fdisk` (partitioning), `iptables` (firewall), `reboot`, और `fsck` यहाँ store होते हैं।
- Normal system users को यहाँ से direct execution configurations permissions run करने का access नहीं होता।
- System maintenance, repair operations, bootstrap, और systems recovery tasks के लिए critical है।
- Modern Linux directories updates में इसे `/usr/sbin` के साथ symlink mapping दी जाती है।

### `/srv` (Service Data)
- यह system के द्वारा external clients को serve किये जाने वाले dynamic website templates और files की space है।
- Web server HTTP documents या FTP file packages यहाँ configure हो सकते हैं।
- Web platforms files का path जैसे `/srv/www` default setup parameters space define करता है।
- Service data records को users files और logging folders से properly separate रखता है।
- Servers updates setups को cleaner layouts और single path database control देता है।

### `/sys` (System Virtual Filesystem)
- यह device interfaces और driver config configurations properties का **virtual pseudo-filesystem** है।
- Kernel objects और hardware device tree structures properties को RAM memory में dynamic map करता है।
- User-space applications software tools को hardware settings और configurations read और adjust करने की API देता है।
- Hardware specifications metrics, ports properties और configurations यहाँ dynamic update होती हैं।
- `/proc` की तरह ही system parameters structure detail expose करता है पर specialized devices details के लिए है।

### `/tmp` (Temporary Files)
- Applications programs और standard users के dynamic temporary files storage folder location है।
- Auto-save text drafts, compiling files packages और installation caches यहाँ save होते हैं।
- System update configurations automatic periodic schedules पर इस target path storage files delete करता है।
- Super-fast execution speeds read-write latency optimization के लिए RAM (tmpfs) storage standard use किया जाता है।
- Operating system के सभी active users बिना security restrictions के यहाँ write कर सकते हैं।

### `/usr` (User System Resources)
- यह user utility programs, graphics, dynamic packages और manual docs का core resources directory index है।
- इसमें major executable application paths `/usr/bin` और libraries directories `/usr/share` files store हैं।
- Stands for "User System Resources" या historical system binary packages locations index folder है।
- सभी system users के बीच यहाँ का data read-only state share options format में होता है।
- Operating system update installations package dependencies files का primary base installation target path है।

### `/var` (Variable Files)
- System run execution के दौरान size बदलने वाले files (logs, databases) की variable data folder location है।
- System log directories (`/var/log`), mail boxes system, और dynamic database cache parameters यहाँ store होते हैं।
- यह scaling growth files को default system files से isolated path space backup control देता है।
- Active logins tracking metrics status updates और server health monitoring parameters हैं।
- Administrators regular checkups से यहाँ storage limit log levels optimize रखते हैं ताकि disk control full ना हो।

---

## 📝 Important Notes: Universal vs Optional Directories

Linux और Unix systems के design में सभी directories हर system पर compulsory नहीं होतीं। यहाँ उनका classification दिया गया है:

### 1. Universally Present Directories (जो हर System पर ज़रूर होंगी)
ये directories basic operation के लिए core components हैं और हर standard Linux/Unix distro में by default मिलती हैं:
- `/` (Root): System filesystem का main entry point.
- `/bin` & `/sbin`: System utilities और binaries.
- `/etc`: Configuration files (जैसे configurations settings, accounts database).
- `/dev`: Hardware device nodes.
- `/lib` & `/lib64`: Executables run करने के लिए libraries.
- `/tmp`: Temporary runtime caching files.
- `/usr`: Installed software packages और user utilities.
- `/var`: Changing system state files और error log directories.
- `/root`: Master superuser home settings.
- `/mnt`: Manual drive mount paths standard directory.

### 2. Optional or Distro-Specific Directories (जो System-Specific या Option-based होती हैं)
ये directories custom systems, specific packages या networking setups के according create होती हैं और minimal setups में missing हो सकती हैं:
- `/afs` (Optional): सिर्फ तभी present होगी जब आपके system में **Andrew File System** (distributed network storage) client installed और configured हो।
- `/nix` (Optional): Nix package manager या NixOS use करने पर ही यहाँ package directories और isolated dependency state files save होंगी।
- `/opt` (Optional): Third-party software packages install करने के लिए होती है। अगर system में custom external apps (जैसे Google Chrome, Zoom) install नहीं हैं, तो यह blank या absent हो सकती है।
- `/srv` (Optional): FTP servers या Web servers (Apache/Nginx) serve files settings के लिए service storage. Minimal Linux distros इसे bypass कर देते हैं।
- `/run` (System-Specific): Modern systems में run-time sockets और locks storage के लिए tmpfs standard location है। बहुत पुराने Linux या legacy Unix servers इसकी जगह `/var/run` use करते हैं।
