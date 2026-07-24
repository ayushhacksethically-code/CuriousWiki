---
title: "📂 Filesystem Hierarchy Standard (FHS)"
date: 2026-07-24
tags: ["linux","fhs","directories","structure","filesystem"]
---

# Filesystem Hierarchy Standard (FHS) Guide

यहाँ Unix aur Linux systems ke standard directory tree layout ke content aur purpose ki simple explanation di gayi hai. Har directory ka detail exact 5 points mein detailed hai.

---

### `/afs` (Andrew File System)
- Andrew File System ek **distributed network file system** hai jo global file sharing ke liye use hota hai.
- Yeh remote server ke files ko local directory paths par automatically **mount** aur sync karta hai.
- Isme access permissions ko manage karne ke liye **secure, token-based authentication** ka use kiya jata hai.
- Yeh mostly academic, research institutes, aur bade corporate networks mein use hota hai.
- Yeh local storage space ko save karta hai kyunki files remote storage servers par store hoti hain.

### `/bin` (Essential User Binaries)
- Isme standard binary executables (executable commands) hote hain jinhe sabhi users use kar sakte hain.
- Yahan core terminal commands jaise `ls`, `cp`, `mv`, `rm`, aur `cat` ki files store hoti hain.
- System ko repair aur single-user mode mein boot karne ke liye yeh programs zaroori hain.
- Isme subdirectories nahi hotin, sirf core executable files aur command scripts hote hain.
- Modern Linux distributions mein yeh `/usr/bin` ka ek **symbolic link** (symlink) hota hai.

### `/boot` (Boot Loader Files)
- Isme system startup aur booting process ke liye sabhi zaroori files store hoti hain.
- Yahan Linux kernel image (`vmlinuz`) aur core booting RAM scripts (`initramfs`) hotey hain.
- Isme bootloader (jaise GRUB) ke settings parameters aur system configurations hotey hain.
- Startup sequence ke dauran BIOS/UEFI firmware sabse pehle yahan ki files ko read karta hai.
- Protection ke liye, isko hard disk partition par ek alag dedicated disk partition mein rakha jata hai.

### `/dev` (Device Files)
- Isme hardware devices ko represent karne wali special **device files** hoti hain.
- Physical components jaise disks (`/dev/sda`), terminal consoles (`/dev/tty`), aur ports yahan files ke roop mein hote hain.
- Isme virtual devices bhi hote hain jaise `/dev/null` (jo saare data ko clean/discard kar deta hai).
- Yeh directory application softwares ko direct physical hardware se communication karne ka interface deti hai.
- Operating system aur kernel daemon `udev` in files ko dynamically detect aur manage karte hain.

### `/etc` (Host-Specific System Configurations)
- Isme system-wide configurations settings aur applications startup scripts hoti hain.
- Yahan text-only settings files jaise `/etc/passwd` aur `/etc/fstab` save rehti hain.
- Isme binary executable programs nahi hote, isliye iska backup aur tracking bahut aasan hai.
- In files ko edit karke system administrator server configurations aur global settings ko change kar sakte hain.
- Iska full form historically "Editable Text Configuration" ya basic etcetera settings folder hai.

### `/home` (User Home Directories)
- Yeh system ke sabhi standard users ke personal files aur setups ka storage path hai.
- Isme users ke personal documents, downloads, desktop files, aur private configurations save rehti hain.
- Har user ki apni specific subdirectory hoti hai, jaise `/home/username`.
- Users ke paas apne home directories ke andar files par full read, write, aur execute permissions hoti hain.
- Yeh security ke liye personal data ko core operating system files se completely separate rakhta hai.

### `/lib` (Essential Shared Libraries)
- Isme binaries (jo `/bin` aur `/sbin` mein hain) ke liye zaroori **shared library files** hoti hain.
- Library files ka format standard `.so` format (Windows ke DLL files jaise) hota hai.
- Yeh kernel modules aur systems startup ke liye core dependency libraries provide karta hai.
- Yahan device driver files aur kernel modules `/lib/modules` path par store hote hain.
- Modern Linux distributions builds mein yeh folder `/usr/lib` se symbolic link hota hai.

### `/lib64` (64-bit Shared Libraries)
- Isme 64-bit binaries ko run karne ke liye zaroori 64-bit **shared library files** store hoti hain.
- Yeh folder multi-architecture execution (32-bit aur 64-bit dono) ko support karne ke liye hota hai.
- Isme 64-bit processors par executable tools aur programs ko build karne ki libraries hoti hain.
- Yeh compatibility bugs aur architecture-related program crashes ko prevent karta.
- Modern Linux distributions configurations mein yeh `/usr/lib64` ka symlink hota hai.

### `/media` (Mount Point for Removable Media)
- Yeh removable storage devices ke liye ek temporary **mount directory** hai.
- USB flash keys, CDs, DVDs aur external backup drives yahan automatically mount hote hain.
- Jab bhi koi device system mein connect hota hai, OS yahan uske liye auto folder create karta hai.
- Standard users ke liye external storage readable/writable access ko simple aur secure banata hai.
- Desktop environments (jaise GNOME/KDE) is folder path ke metadata ko directly read karte hain.

### `/mnt` (Temporarily Mounted Filesystems)
- Yeh system administrators ko filesystems manually mount karne ke liye target path deta hai.
- Ise backup restore karne ya troubleshooting ke samay temporary filesystems connect karne ke liye use karte hain.
- Removable media ki tarah yahan automatic plug-and-play mounting nahi hoti.
- Sysadmins manual command run karke external storage ya network drives ko is folder se link karte hain.
- Yeh ek empty folder template hai jo clean state system operations ke liye reserve rehta hai.

### `/nix` (Nix Package Store)
- Yeh Nix package management system ka core package storage store space hai.
- Sabhi software tools aur applications dependencies yahan secure aur isolated state mein rehte hain.
- Har package ke liye unique cryptographic hashes ke sath directory paths generate hote hain.
- Yeh dynamic isolated dependencies mapping dependency conflicts ("dependency hell") ko zero karti hai.
- Ek hi computer par bina system config crash kiye ek application ke multiple versions run ho sakte hain.

### `/opt` (Optional Add-on Packages)
- Yeh optional, third-party software packages ko install karne ke liye use kiya jata hai.
- proprietary softwares jaise Google Chrome, Zoom, ya custom databases yahan install hote hain.
- Har application resources aur binaries ko apne dedicated subdirectory ke andar isolated rakhti hai.
- Yeh manual/external programs ko system-wide library folders se clean aur separate rakhta hai.
- Iska name stands for "Optional" application code storage locations.

### `/proc` (Process Virtual Filesystem)
- Yeh running processes aur system resources status check karne ka **virtual pseudo-filesystem** hai.
- Yeh RAM mein dynamically load hota hai aur physical disk space par 0 byte consumption karta hai.
- Isme active runtime processes directory (jaise pid folders `/proc/123`) hoti hain.
- System metrics jaise memory status, CPU usage details aur specs read karne ke parameters deta hai.
- Administrators yahan ki dynamic settings ko edit karke kernel parameters runtime modify kar sakte hain.

### `/root` (Root User Home Directory)
- Yeh system ke master user (System Administrator Root) ki personal home directory space hai.
- Security aur safety reasons ke liye ise main user `/home` path partition se separate rakha jata hai.
- Ordinary system users ko is directory records ko read ya write karne ka access nahi hota.
- Root user ke customization profiles settings files aur backups yahan store hote hain.
- Core system partitions crash hone par recovery commands execute karne ke liye zaroori hai.

### `/run` (Runtime Transient Data)
- Yeh system startup se lekar abhi tak chal rahe active processes ka temporary data folder hai.
- Yeh RAM (tmpfs) mein dynamically mount hota hai jo system reboot par completely clean ho jata hai.
- Isme dynamic process IDs (`.pid` files), software sockets, aur system locks save hote hain.
- Iski madad se daemons aur background services run status coordinate aur share karte hain.
- Yeh ek modern standardized path layout hai jisne older `/var/run` directories ko replace kiya hai.

### `/sbin` (System binaries)
- Isme root user/system administrator ke use ke liye essential system binary programs hote hain.
- Administrative commands jaise `fdisk` (partitioning), `iptables` (firewall), `reboot`, aur `fsck` yahan store hote hain.
- Normal system users ko yahan se direct execution configurations permissions run karne ka access nahi hota.
- System maintenance, repair operations, bootstrap, aur systems recovery tasks ke liye critical hai.
- Modern Linux directories updates mein ise `/usr/sbin` ke sath symlink mapping di jati hai.

### `/srv` (Service Data)
- Yeh system ke dwara external clients ko serve kiye jane wale dynamic website templates aur files ki space hai.
- Web server HTTP documents ya FTP file packages yahan configure ho sakte hain.
- Web platforms files ka path jaise `/srv/www` default setup parameters space define karta hai.
- Service data records ko users files aur logging folders se properly separate rakhta hai.
- Servers updates setups ko cleaner layouts aur single path database control deta hai.

### `/sys` (System Virtual Filesystem)
- Yeh device interfaces aur driver config configurations properties ka **virtual pseudo-filesystem** hai.
- Kernel objects aur hardware device tree structures properties ko RAM memory mein dynamic map karta hai.
- User-space applications software tools ko hardware settings aur configurations read aur adjust karne ki API deta hai.
- Hardware specifications metrics, ports properties aur configurations yahan dynamic update hoti hain.
- `/proc` ki tarah hi system parameters structure detail expose karta hai par specialized devices details ke liye hai.

### `/tmp` (Temporary Files)
- Applications programs aur standard users ke dynamic temporary files storage folder location hai.
- Auto-save text drafts, compiling files packages aur installation caches yahan save hote hain.
- System update configurations automatic periodic schedules par is target path storage files delete karta hai.
- Super-fast execution speeds read-write latency optimization ke liye RAM (tmpfs) storage standard use.
- Operating system ke sabhi active users bina security restrictions ke yahan write kar sakte hain.

### `/usr` (User System Resources)
- Yeh user utility programs, graphics, dynamic packages aur manual docs ka core resources directory index hai.
- Isme major executable application paths `/usr/bin` aur libraries directories `/usr/share` files store hain.
- Stands for "User System Resources" ya historical system binary packages locations index folder.
- Sabhi system users ke beech yahan ka data read-only state share options format.
- Operating system update installations package dependencies files ka primary base installation target path.

### `/var` (Variable Files)
- System run execution ke during size badalne wale files (logs, databases) ki variable data folder location hai.
- System log directories (`/var/log`), mail boxes system, aur dynamic database cache parameters yahan store hote hain.
- Yeh scaling growth files ko default system files se isolated path space backup control deta hai.
- Active logins tracking metrics status updates aur server health monitoring parameters.
- Administrators regular checkups se yahan storage limit log levels optimize rakhte hain taaki disk control full na ho.

---

## 📝 Important Notes: Universal vs Optional Directories

Linux and Unix systems ke design mein sabhi directories har system par compulsory nahi hotin. Yahan unka classification diya gaya hai:

### 1. Universally Present Directories (जो हर System पर ज़रूर होंगी)
Yeh directories basic operation ke liye core components hain aur har standard Linux/Unix distro mein by default milti hain:
- `/` (Root): System filesystem ka main entry point.
- `/bin` & `/sbin`: System utilities aur binaries.
- `/etc`: Configuration files (e.g., configurations settings, accounts database).
- `/dev`: Hardware device nodes.
- `/lib` & `/lib64`: Executables run karne ke liye libraries.
- `/tmp`: Temporary runtime caching files.
- `/usr`: Installed software packages aur user utilities.
- `/var`: Changing system state files aur error log directories.
- `/root`: Master superuser home settings.
- `/mnt`: Manual drive mount paths standard directory.

### 2. Optional or Distro-Specific Directories (जो System-Specific या Option-based होती हैं)
Yeh directories custom systems, specific packages ya networking setups ke according create hoti hain aur minimal setups mein missing ho sakti hain:
- `/afs` (Optional): Sirf tabhi present hogi jab aapke system mein **Andrew File System** (distributed network storage) client installed aur configured ho.
- `/nix` (Optional): Nix package manager ya NixOS use karne par hi yahan package directories aur isolated dependency state files save hongi.
- `/opt` (Optional): Third-party software packages install karne ke liye hoti hai. Agar system mein custom external apps (like Google Chrome, Zoom) install nahi hain, toh yeh blank ya absent ho sakti hai.
- `/srv` (Optional): FTP servers ya Web servers (Apache/Nginx) serve files settings ke liye service storage. Minimal Linux distros ise bypass kar dete hain.
- `/run` (System-Specific): Modern systems mein run-time sockets and locks storage ke liye tmpfs standard location hai. Bahut purane Linux or legacy Unix servers iski jagah `/var/run` use karte hain.

