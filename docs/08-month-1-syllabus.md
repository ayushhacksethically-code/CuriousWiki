# 📚 08. Month 1: GNU/Linux Administration & Bash CLI Mastery (डे-बाई-डे सिलेबस)

यह syllabus Month 1 (Day 001 - 030) के लिए एक विस्तृत दैनिक कार्यक्रम (day-by-day plan) है। इसका मुख्य उद्देश्य आपको **GNU/Linux Systems, Command Line Interface (CLI), File Permissions, Text Processing Tools (Grep, Awk, Sed), Systemd Services, Network Configurations,** और **Security Jails (Chroot)** का master बनाना है।

प्रत्येक दिन के लिए **Topic**, **Daily Challenge (व्यावहारिक कार्य)**, और **Mastery Check** दिए गए हैं।

---

## 📅 Week 1: Linux Basics, Command Line Utilities & File Operations (डे 001 - 007)

### Day 001: Introduction to Linux, Directory Structure & Shell Basics
* **Topic**: What is Linux (Kernel vs Distribution), Terminal vs Shell (Bash, Zsh), Standard Directory Structure (`/etc`, `/var`, `/home`, `/bin`, `/usr`, `/tmp`), basic navigation (`pwd`, `cd`, `ls` options like `-l`, `-a`, `-h`, `-t`).
* **Daily Challenge**: Root `/` directory में जाकर सभी subdirectories को explore करें। `ls -lah` का उपयोग करके hidden files को देखें और अपने user home directory का absolute path find करें।
* **Mastery Check**: `/bin` और `/usr/bin` के बीच क्या अंतर है? absolute path और relative path में मुख्य अंतर क्या होता है?

### Day 002: File and Directory Operations (फ़ाइल और डायरेक्टरी ऑपरेशन्स)
* **Topic**: Creating, deleting, copying, and moving files/directories (`mkdir` with `-p` nested option, `touch`, `cp` with `-r` recursive flag, `mv`, `rm` with `-r` and `-f`).
* **Daily Challenge**: एक nested structure `project/src/components` बनाएं। उसमें एक custom configuration dummy file बनाएं, उसे copy करके backup folder में रखें और source folder को delete करें।
* **Mastery Check**: `rm -rf` कमांड क्यों खतरनाक है? deletion से पहले configuration dynamic lists preview करने के लिए क्या use करेंगे?

### Day 003: Text Files Viewers & Editing Basics (फ़ाइल रीडर्स और एडिटर्स)
* **Topic**: Reading files in terminal (`cat` options like `-n`, `tac`, `less`, `more`, `head`, `tail` with `-f` live monitoring), basic text editor (Nano, Vim interactive mode, or Helix editor).
* **Daily Challenge**: System logs file (जैसे `/var/log/syslog` या custom file) को `less` में open करके search operator `?` or `/` का use करें, `tail -f` से real-time update track करें।
* **Mastery Check**: `tail -f` का production logs monitor करते समय क्या utility (उपयोग) है?

### Day 004: Terminal Keyboard Shortcuts & CLI Editing
* **Topic**: GNU Readline shell line-editing shortcuts (जैसे `Ctrl+A` to start, `Ctrl+E` to end, `Ctrl+U` to clear line, `Ctrl+K` to cut to end, `Ctrl+W` to delete word, `Ctrl+Y` to paste, `Ctrl+R` reverse-i-search), command history configurations (`history`).
* **Daily Challenge**: Terminal पर एक बड़ी complex command line type करें। Keyboard shortcuts का use करके cursor को front पर लाएं, characters change करें और cursor back ले जाएं। `Ctrl+R` से historical check search करें।
* **Mastery Check**: Last command के final argument/parameter को dynamic paste करने का shortest shortcut क्या है? (जैसे `!$` या `Alt+.`)

### Day 005: Environment Variables & Shell Configurations
* **Topic**: Shell and Environment Variables (`env`, `printenv`, `export`, `unset`), Shell interactive files initialization paths (`.bashrc`, `.bash_profile`, `.profile`), custom PATH additions.
* **Daily Challenge**: `.bashrc` file में जाकर एक custom environment variable `DEV_ENV="production"` और dynamic path command aliases add करें। File save करके `source ~/.bashrc` runtime apply करें।
* **Mastery Check**: Local variable और exported environment variable में क्या dynamic properties constraints होते हैं?

### Day 006: File Metadata & Permissions (chmod/chown)
* **Topic**: Linux Permission Model (Read `r`=4, Write `w`=2, Execute `x`=1), User (u), Group (g), Others (o). Symbolic representations vs Octal representations (e.g. 755, 644, 700), changing ownerships (`chown`, `chgrp`).
* **Daily Challenge**: एक `.sh` format script create करें। permissions view करें। इसे executable only for owner configure करें (`chmod 700`) और non-root checks execute verification करें।
* **Mastery Check**: File permissions `750` का user level permissions layout specifications क्या है?

### Day 007: Review & Mini-Project: Automation Script Skeleton
* **Topic**: Script Shebang lines configurations (`#!/bin/bash` vs `#!/usr/bin/env bash`), system path parameters checks, script validation check.
* **Daily Challenge**: एक bash script build करें जो backup folder create करे, system specifications outputs logs standard log format template file write करें।
* **Mastery Check**: `#!/usr/bin/env bash` interpreter call standard paths resolve check standard path compatibility metrics क्यों optimal है?

---

## 📅 Week 2: Input/Output Redirection & Text Processing (डे 008 - 015)

### Day 008: Standard Input, Output, and Error Streams
* **Topic**: Three standard system files streams descriptor: `stdin` (0), `stdout` (1), `stderr` (2). Stream redirections (`>`, `>>`), standard error routing (`2>`, `2>&1`, `&>`).
* **Daily Challenge**: एक command run करें जो stdout error code emit करती है। output stream outputs को separate log paths (`success.log` and `error.log`) handle redirection trace करें।
* **Mastery Check**: Outputs and errors logs silently discard dynamic blackhole paths (जैसे `/dev/null`) redirect constraints mappings?

### Day 009: Piping & Filter Utilities
* **Topic**: The pipe operator (`|`), chain filter parameters utilities (`wc` line word count, `sort` unique sort metrics, `uniq` unique extraction filters).
* **Daily Challenge**: Running system logs details list compile commands, system processes name extract process unique processes sorting alphabetically print unique count trace counts.
* **Mastery Check**: `uniq` check run filter से पहले database parameters sort patterns target execute criteria parameters checks why needed?

### Day 010: Regular Expressions and Pattern Matching (grep)
* **Topic**: System text files searching utility `grep`, extended regex engines `grep -E` (egrep), target options (`-i` ignore case, `-v` invert match, `-r` recursive search, `-n` line numbers, `-c` count matching, `-o` matches only).
* **Daily Challenge**: App log directory `/var/log` (or dynamic texts) nested files subfolder matching keyword structures verify specific counts trace error patterns locations file line.
* **Mastery Check**: Difference between `grep` and `grep -v` logical operators matching filter flow controls.

### Day 011: Text Columns Slicing & Inline Translations (cut/tr/sed)
* **Topic**: Stream inline text processing selectors: `cut` columns split (`-d` delimiter, `-f` fields list parameters), `tr` translate character changes, `sed` stream modifications utility regex substitutions (`s/pattern/replacement/g`).
* **Daily Challenge**: `/etc/passwd` file read logic write, user list and execution shell target extract using `cut`, change system output tabs structure capitalize outputs values checks.
* **Mastery Check**: File replace parameters `sed` inline update (`sed -i`) safety execution guidelines rules trace.

### Day 012: Structural Line Data Parsing (awk basics)
* **Topic**: Awk programming parser base constructs syntax, fields allocations variables (`$1`, `$2`, ..., `$NF`), blocks formats (`BEGIN`, `END`, patterns checks), custom logs variables loops.
* **Daily Challenge**: Web servers mock logs files read process list extraction target: select columns values evaluate dynamic responses status counts filter.
* **Mastery Check**: System built-in keywords `NR` (Number of Records) and `NF` (Number of Fields) difference definitions.

### Day 013: Searching Files on Filesystem (find/locate)
* **Topic**: Command search engines: `find` parameter paths checks (`-name`, `-type` file/dir, `-size` bounds limits, `-mtime` modifications timestamps), executing scripts filters on matching elements (`-exec` parameter binding).
* **Daily Challenge**: Custom local folder scan operations write: Find files ending `.log` larger than 5MB modified last 3 days execute dynamic cleanup target compression.
* **Mastery Check**: `find` vs `locate` db engines file indexing update cycle latency checks.

### Day 014: Named Pipes & Process Inter-connections (mkfifo)
* **Topic**: Linux named pipe queues `mkfifo`, stream buffering models, IPC blocks pipelines across terminals shell sessions.
* **Daily Challenge**: Named pipe create run queue `mkfifo /tmp/logpipe`. Setup terminal A read loop listening queue stream. Terminal B push records parameters trace actions.
* **Mastery Check**: Writer processes why wait/block inside named pipes files streams structures until reader opens connections?

### Day 015: Week 2 Review: Text Processing Script Challenge
* **Topic**: Complex workflow integration of text parsers, pipelines, standard output format conversions.
* **Daily Challenge**: Write a single-line command pipeline that parses a mock web-server request log list, extracts request IPs, sorts by frequency count, and outputs the top 5 IPs with their occurrence count.
* **Mastery Check**: How does the chain `sort | uniq -c | sort -nr` perform key-value extraction?

---

## 📅 Week 3: Processes, Resources & System Administration (डे 016 - 022)

### Day 016: Process States and Monitoring (ps/top/htop)
* **Topic**: System execution tasks: Process IDs (PID, PPID), parent-child tree models, process statuses (running, sleeping, zombie, stopped), process listing command models (`ps aux`, `ps -ef`), interactive top interfaces (`top`, `htop`).
* **Daily Challenge**: Systems activity check trace: Identify CPU consumer running tasks, check their PID, trace complete system paths of running binaries.
* **Mastery Check**: Virtual Memory (VSZ) size and Resident Set (RSS) memory sizes differences in systems memory layouts.

### Day 017: Process Controllers Signals (kill/killall)
* **Topic**: Signals dispatch controls: Background execute setups (`&`), terminal background lists (`jobs`), foreground/background control swaps (`fg`, `bg`), task termination inputs (`kill`, `killall`, `pkill`), signals parameters: `SIGTERM (15)`, `SIGKILL (9)`, `SIGHUP (1)`.
* **Daily Challenge**: Spawn custom background execution process tasks. Pause job, switch context foreground checks, trigger target exit using process signals lists validation.
* **Mastery Check**: Why SIGKILL (9) is discouraged for database processes and standard system daemon signals termination instead uses SIGTERM (15)?

### Day 018: Disk and Hardware diagnostics (df/du/lscpu)
* **Topic**: System limits checks: disk space statistics (`df -h`), individual file size directories analysis (`du -sh`), CPU profiles (`lscpu`), RAM memory profiles (`free -m`, `/proc/meminfo`).
* **Daily Challenge**: Target directory size scanning: Identify top 10 largest folders/files allocations recursively in the workspace.
* **Mastery Check**: In command outputs `free` tool, what is the difference between "Free Memory" metrics and "Available Memory" metrics?

### Day 019: System Init daemon management (Systemd)
* **Topic**: Initialization system architecture: `systemd` controllers, control tools `systemctl` (start, stop, restart, status, enable, disable), system configuration services target units location templates.
* **Daily Challenge**: System logs service details monitor check: Check status of running web service (e.g. Nginx/Apache/SSH), toggle boot levels initialization status metrics, verify configuration changes.
* **Mastery Check**: Difference between `systemctl start service_name` and `systemctl enable service_name` initialization actions.

### Day 020: Diagnostic Log Systems (journalctl)
* **Topic**: Systemd integrated logs logging service `journalctl`, diagnostic log parsing flags (`-u` service name filter, `-f` real-time follow, `-p` severity filters, `-k` kernel messages).
* **Daily Challenge**: Follow SSH authentication events logs parameters dynamically using journalctl filters. Filter only error levels log diagnostics output files.
* **Mastery Check**: Command `dmesg` purpose and kernel ring buffer diagnostics overview.

### Day 021: Software Installation and Repository managers (apt/dpkg)
* **Topic**: Debian package management formats: Package installations lists (`apt`, `dpkg`), packages databases source list path setups (`/etc/apt/sources.list`), packages dependencies tracking.
* **Daily Challenge**: A specific tool package install compile from binary or search dependencies maps. Verify what package contains specific command utilities (`dpkg -S`).
* **Mastery Check**: `apt update` vs `apt upgrade` updates difference.

### Day 022: Cron Scheduling Tasks & Automations
* **Topic**: Cron engine layouts, parameters structure config patterns (`minute hour day month day-of-week command`), local user files configurations `crontab -e`, list schedules `crontab -l`.
* **Daily Challenge**: Schedule script system checking activity load averages append logs every 5 minutes in background cron worker profiles.
* **Mastery Check**: Schedule notation `30 2 * * 1-5` meaning execution timeline mappings.

---

## 📅 Week 4: Network Configurations, Security Jails & SSH (डे 023 - 030)

### Day 023: Networking Interfaces, DNS Resolver Settings
* **Topic**: System network diagnostic models: commands lists (`ip address`, `ip link`, `ip route`), DNS server paths (`/etc/resolv.conf`), local hosts maps overrides (`/etc/hosts`).
* **Daily Challenge**: Add custom host address entries maps redirecting dummy workspace domain to local loops, verify output using diagnostic tools.
* **Mastery Check**: Loopback interface configuration IP addresses (`127.0.0.1`) structure purpose.

### Day 024: Socket Ports monitoring and Web curl queries
* **Topic**: Networking connection states diagnostics: socket state listing (`ss -tulpn` or `netstat`), tracing routing hops (`traceroute`), checking connection reachability (`ping`), CLI web agent requests (`curl`, `wget`).
* **Daily Challenge**: Verify all open ports actively listening for incoming TCP streams, identify corresponding processes PID, test target remote endpoint payloads headers query using `curl -I`.
* **Mastery Check**: Network socket states `LISTEN`, `ESTABLISHED`, `TIME_WAIT` difference details.

### Day 025: Secure Shell authentication (SSH Configurations)
* **Topic**: SSH security architecture, keypairs generators (`ssh-keygen`), asymmetric security metrics, target machine public key copy helper (`ssh-copy-id`), client configure paths (`~/.ssh/config`).
* **Daily Challenge**: Generate a new secure 4096-bit RSA key pair, write custom configurations host blocks for server ssh connections.
* **Mastery Check**: Security concerns of password authentication settings modifications inside `/etc/ssh/sshd_config`.

### Day 026: Fast File Synchronization over network (scp/rsync)
* **Topic**: Encrypted files copy tool `scp`, delta file sync systems `rsync` configurations (`-a` archive permissions preservation, `-v` verbose, `-z` compression, `--delete` sync target parity).
* **Daily Challenge**: Local directory incremental replica update write task: Synchronize dynamic target directories check updates, test dry-run flags parameters.
* **Mastery Check**: Why `rsync` is vastly superior to `scp` for daily/weekly server backups sync?

### Day 027: User Management Database & Sudo Access Rules
* **Topic**: Linux User records schemas: configuration database (`/etc/passwd`, `/etc/shadow`, `/etc/group`), creating system users (`useradd`), groups additions (`usermod`), configuring super-user permissions sudo tables (`/etc/sudoers` parsed with `visudo`).
* **Daily Challenge**: Create custom system test user. Define sudo policies constraint rules: allow this user to restart only one specific service without prompting passwords validations.
* **Mastery Check**: Why direct edits of files paths `/etc/sudoers` are prohibited and using `visudo` validation compiler is required?

### Day 028: Symmetric & Asymmetric Cryptography (GPG)
* **Topic**: File cryptographic encryption systems (GNU Privacy Guard - GPG), keys generation, export files mechanisms, decryption inputs.
* **Daily Challenge**: Create local GPG key-pair. Encrypt sensitive config files using custom recipient credentials, test decrypt actions.
* **Mastery Check**: Difference between Digital Signature (integrity proof) and Encryption (confidentiality proof).

### Day 029: Chroot Jail Sandboxing
* **Topic**: Systems processes isolations: root path modification `chroot` commands, standard shell dependent binary libraries resolution (`ldd`), jail folders configurations.
* **Daily Challenge**: Build clean minimal sandbox subfolder jail structure. Copy `/bin/bash` shell and all dependent shared libraries returned via `ldd`. Run chroot isolation target verification.
* **Mastery Check**: Does a `chroot` sandbox provide absolute isolation against root escape attempts without kernel namespace constraints?

### Day 030: Module 1 Capstone Project: System Diagnostics Audit & Backup Script
* **Topic**: Comprehensive shell script automation, utilizing variables, checks, loops, redirections, and cron setups.
* **Daily Challenge**: Write a Bash script that checks disk space (`df`), CPU load, and memory usage. If any limits exceed 80%, it collects the last 30 lines of `/var/log/syslog`, archives it in `/backup/diagnostic_logs.tar.gz`, verifies integrity, and schedules cron diagnostics emails simulation logs.
* **Mastery Check**: Execute the capstone script without runtime syntax errors, utilizing exit codes safely (`exit 0`, `exit 1`).

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[06. Systems Developer Syllabus (संक्षिप्त सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/06-learning-syllabus.md)**
* **[07. 180-Day Day-by-Day Syllabus (पूरा सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/07-day-by-day-syllabus.md)**
* **[09. Month 2 Day-by-Day Syllabus (डे 31 - 60)](file:///home/narayanas/Documents/CuriousWiki/docs/09-month-2-syllabus.md)**
* **[10. Month 3 Day-by-Day Syllabus (डे 61 - 90)](file:///home/narayanas/Documents/CuriousWiki/docs/10-month-3-syllabus.md)**
* **[11. Month 4 Day-by-Day Syllabus (डे 91 - 120)](file:///home/narayanas/Documents/CuriousWiki/docs/11-month-4-syllabus.md)**
* **[12. Month 5 Day-by-Day Syllabus (डे 121 - 150)](file:///home/narayanas/Documents/CuriousWiki/docs/12-month-5-syllabus.md)**
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
