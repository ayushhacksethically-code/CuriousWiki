---
title: "🖥️ Processes, Package Managers & Networking"
date: 2026-07-01
tags: ["bash","process management","packages","apt","dnf","pacman","compression","networking","curl","tar"]
---

यह chapter Linux administration के parameters को cover करता है, जिसमें active processes control, package commands (apt, dnf, yum, pacman, brew), file compression, और network tools शामिल हैं।

## 1. Process Management (प्रक्रिया प्रबंधन)

Linux में processes को view, modify, background execution, और kill करने के commands:

- **`ps`**: Active processes की snapshot देखना:

  ``` bash
  # CPU/Memory usage details के साथ सभी processes list करें
  ps aux | grep "node"
  ```

- **`top` / `htop`**: System processes को dynamically real-time monitor करना.

- **`kill` / `killall` / `pkill`**: Target process को signal भेजना:

  ``` bash
  kill 1234      # PID 1234 को standard term (SIGTERM) भेजें
  kill -9 1234   # PID 1234 को forcefully kill (SIGKILL) करें
  pkill -f server # 'server' name वाली सभी processes kill करें
  ```

- **`bg` / `fg` / `jobs`**: Background/Foreground management:

  ``` bash
  # Command के अंत में '&' लगाने से वह background job में start होती है
  python3 server.py &
  jobs           # Running background jobs की list देखें
  fg %1          # Job ID 1 को foreground runtime पर लाएं
  ```

- **`nohup`**: User log-out होने के बाद भी process background में running रखना:

  ``` bash
  nohup ./serve.sh > server.log 2>&1 &
  ```

## 2. Package Management (पैकेज प्रबंधन)

अलग-अलग OS architectures में packages install, update, और remove करने की cheatsheet:

| Package Manager | OS Ecosystem | Install Command | Update / Clean Cache |
|----|----|----|----|
| **apt** | Debian / Ubuntu / Mint | `sudo apt install git` | `sudo apt update && sudo apt upgrade` |
| **dnf** | Fedora / RHEL (Modern) | `sudo dnf install git` | `sudo dnf upgrade` |
| **yum** | CentOS / Enterprise Linux (Legacy) | `sudo yum install git` | `sudo yum update` |
| **pacman** | Arch Linux / Manjaro | `sudo pacman -S git` | `sudo pacman -Syu` |
| **brew** | macOS / Homebrew (Linux) | `brew install git` | `brew update && brew upgrade` |

## 3. File Compression & Archiving (संपीड़न और पुरालेख)

Files को compress और extract करने के standard tar/zip formats:

### ⚫ 1. Tarballs (`.tar.gz`)

``` bash
# 1. Compress / Create Archive (z: gzip, c: create, v: verbose, f: file)
tar -zcvf archive.tar.gz /path/to/folder

# 2. Extract / Decompress (x: extract)
tar -zxvf archive.tar.gz -C /target/destination/dir
```

### ⚫ 2. Zip / Unzip (`.zip`)

``` bash
# 1. Compress folder recursively
zip -r archive.zip /path/to/folder

# 2. Extract zip archive
unzip archive.zip -d /target/destination/dir
```

## 4. Network Tools & Monitoring (नेटवर्क टूल्स)

Server connectivity और port binding diagnostics के commands:

- **`ping`**: Remote host connectivity check करना:

  ``` bash
  ping -c 3 google.com
  ```

- **`ss` / `netstat`**: Network socket connections/ports list करना:

  ``` bash
  # TCP/UDP bound ports with PID details list करें
  ss -tulpn
  ```

- **`ip`**: Interfaces और local IP settings देखना:

  ``` bash
  ip a
  ```

- **`curl` / `wget`**: URL endpoint request and downloading:

  ``` bash
  # Fetch response headers only
  curl -I https://github.com

  # Download file direct to custom name
  wget -O setup.sh https://example.com/install.sh
  ```

- **`traceroute`**: Path trace packets mapping route to target:

  ``` bash
  traceroute google.com
  ```

- **`nslookup`**: DNS mapping resolution query:

  ``` bash
  nslookup github.com
  ```


