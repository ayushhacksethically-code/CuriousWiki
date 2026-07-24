---
title: "📁 Linux Files & Directories Guide"
date: 2026-07-01
tags: ["linux","bash","files","directories","permissions","chmod","chown","fhs","find","symlinks"]
---

Linux and BASH environments में files and directory structures management, permissions settings, standards layouts, और advanced links/searching operations की specifications।

## 1. Filesystem Hierarchy Standard (FHS)

Linux directory tree root (`/`) से start होता है। FHS standards के base पर directories का purpose structured होता है:

| Directory Path | Primary Purpose |
|----|----|
| `/` | **Root Directory:** System filesystem का base entry point. |
| `/bin` \| `/sbin` | Standard binary executables (commands) और system admin commands (superuser binaries). |
| `/boot` | Boot-loader files, kernel images, और configuration systems details. |
| `/dev` | **Device files:** physical and virtual hardware references (e.g. `/dev/null`, `/dev/sda`). |
| `/etc` | **Configurations:** System level custom config settings (e.g., `/etc/passwd`, `/etc/fstab`). |
| `/home` \| `/root` | Users' home folders directories (regular users home path vs root superuser home path). |
| `/var` | Variable files changing sizes: log folders (`/var/log`), databases, emails. |
| `/tmp` | Temporary storage location (typically cleared automatically on system reboot). |

## 2. Core Directory Operations (मूल निर्देशिका संचालन)

Terminal navigation और folder management commands:

- **<a href="pwd.html" class="wiki-link">pwd</a> / <a href="cd.html" class="wiki-link">cd</a>:** Print working directory (इसके options `-L` / `-P` और symlink resolution के लिए <a href="pwd.html" class="wiki-link">pwd Guide</a> देखें) और directory बदलने के controls (CDPATH और navigation hooks के लिए <a href="cd.html" class="wiki-link">cd Guide</a> देखें)।

  ``` bash
  # Go to user home
  cd ~

  # Go to previous directory
  cd -
  ```

- **<a href="ls.html" class="wiki-link">ls</a> flags:** Working folder content listing (sorting, formats, columns, और classification flags के लिए <a href="ls.html" class="wiki-link">ls Guide</a> देखें)।

  ``` bash
  ls -lah # List all details with hidden files and human-readable sizes
  ```

- **<a href="mkdir.html" class="wiki-link">mkdir</a> / <a href="rmdir.html" class="wiki-link">rmdir</a>:** Directories folders generation और empty directories removal (recursive parent directory creation parameters के लिए <a href="mkdir.html" class="wiki-link">mkdir Guide</a> और deletion details के लिए <a href="rmdir.html" class="wiki-link">rmdir Guide</a> देखें)।

  ``` bash
  mkdir -p /tmp/parent/child/grandchild # Create nested folders recursively
  ```

## 3. Core File Operations (मूल फ़ाइल संचालन)

फ़ाइलें बनाने, हटाने, कॉपी करने और स्थानांतरित करने की मुख्य commands:

- **<a href="touch.html" class="wiki-link">touch</a>:** Empty file creation या times updating (custom timestamp parsing details के लिए <a href="touch.html" class="wiki-link">touch Guide</a> देखें)।
- **<a href="rm.html" class="wiki-link">rm</a>:** Files/Directories deletion (force delete `-rf` और safeguards options के लिए <a href="rm.html" class="wiki-link">rm Guide</a> देखें)।
- **<a href="cp.html" class="wiki-link">cp</a>:** Files replication (recursive copying और archive modes configurations के लिए <a href="cp.html" class="wiki-link">cp Guide</a> देखें)।
- **<a href="mv.html" class="wiki-link">mv</a>:** Transfer or renaming operations (safe update validation flags के लिए <a href="mv.html" class="wiki-link">mv Guide</a> देखें)।
- **<a href="cat.html" class="wiki-link">cat</a> / <a href="less.html" class="wiki-link">less</a> / <a href="tail.html" class="wiki-link">tail</a> / <a href="echo.html" class="wiki-link">echo</a>:** Content displays/printing, interactive paging, output redirection, real-time logging, और merging (<a href="cat.html" class="wiki-link">cat Guide</a>, <a href="less.html" class="wiki-link">less Guide</a>, <a href="tail.html" class="wiki-link">tail Guide</a> और <a href="echo.html" class="wiki-link">echo Guide</a> देखें)।

## 4. Soft Links vs Hard Links (लिंक्स के प्रकार)

Linux files references link settings commands:

- **Hard Links:** Target file के dynamic physical inode block को point करता है। यदि source file delete हो जाए, तब भी hard link data readable रहता है। (ये cross-filesystem work नहीं कर सकते)।

  ``` bash
  ln source.txt hardlink.txt
  ```

- **Soft Links (Symbolic Link / Symlink):** Windows shortcuts की तरह text path references store करता है। यदि target file delete हो जाए, तो link broken (invalid) हो जाता है।

  ``` bash
  ln -s /var/log/syslog ~/syslog_shortcut
  ```

## 5. File Permissions and Ownership (अनुमतियां और स्वामित्व)

Linux security architecture permissions bits `-rwxrwxrwx` (Read, Write, Execute) पर काम करती है, जो 3 categories (Owner, Group, Others) in divided होती है:

### Permission Octal Representation:

`Read (r) = 4`, `Write (w) = 2`, `Execute (x) = 1`.

``` bash
# Set Owner=Full(7), Group=Read/Execute(5), Others=Read(4)
chmod 754 backup.sh

# Change owner and group
sudo chown admin:devgroup config.json
```

### 🚨 Special Permissions (SUID, SGID, Sticky Bit)

| Special Bit | Octal Value | Behavior Details | Example Command |
|----|----|----|----|
| **SUID** (Set Owner ID) | `4000` | File run होने पर user को owner level privileges privileges permissions मिलती हैं (जैसे `passwd` tool). | `chmod u+s file` |
| **SGID** (Set Group ID) | `2000` | Folder में generated new files automatically parent folder's group adopt करती हैं। | `chmod g+s dir` |
| **Sticky Bit** | `1000` | Folder (जैसे `/tmp`) में user केवल अपनी बनाई हुई files ही delete कर सकता है। | `chmod +t dir` |

## 6. Advanced Finding & Searching (फाइल खोजना)

Large directories tree structures में files tracking commands:

- **<a href="find.html" class="wiki-link">find</a> command:** System directory level runtime search calculations (size, time, name rules और execute actions के details के लिए <a href="find.html" class="wiki-link">find Guide</a> देखें)।

  ``` bash
  # Find .log files modified in the last 24 hours
  find /var/log -name "*.log" -mtime -1

  # Find files larger than 100MB and list details
  find /home -type f -size +100M -exec ls -lh {} \;
  ```

- **`locate` command:** Database index cached search (fast lookup).

  ``` bash
  # Update search database index
  sudo updatedb

  # Locate path references
  locate passwd
  ```


