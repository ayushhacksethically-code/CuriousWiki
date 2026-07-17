---
title: "⏰ Cron Jobs & Scheduling Automation Guide"
date: 2026-07-10
tags: ["cron","crontab","automation","scheduling","tasks","background","daemon"]
---

Linux Operating System में tasks को predefined intervals (जैसे daily database backups, log rotation, updates sync) पर automated execution के लिए **Cron Daemon** का use किया जाता है। Cron schedules को configure करने वाली list table को **Crontab** (Cron Table) कहा जाता है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Daemon Execution

</div>

Cron background में daemon service (`crond`) की तरह runtime execution checks करता रहता है। System startup के समय systemd configuration इसे automatic load कर देती है।

</div>

</div>

## 1. Crontab Syntax Breakdown

Crontab में schedules define करने के लिए 5-asterisks (stars) syntax configuration का use होता है:

``` text
*     *     *     *     *    command_to_execute
-     -     -     -     -
|     |     |     |     +----- Day of week (0 - 6) (Sunday=0 or 7)
|     |     |     +------- Month (1 - 12)
|     |     +--------- Day of month (1 - 31)
|     +----------- Hour (0 - 23)
+------------- Minute (0 - 59)
```

### Common Scheduling Examples:

| Schedule Syntax | Timing Description (Hinglish) | Real-world Use Case |
|----|----|----|
| `0 * * * *` | हर घंटे की 0th मिनट पर (Hourly) | Sync local temp cache files |
| `30 2 * * *` | हर रात 2:30 AM पर (Daily) | Database system backup |
| `0 0 * * 1` | हर Monday की मध्यरात्रि 12:00 AM पर (Weekly) | SSL certificates check & renew |
| `*/15 * * * *` | हर 15 minutes के interval पर | Health-check API ping server |

## 2. Crontab Management Commands

Schedules manage करने के primary terminal commands:

``` bash
# Current user ki active crontab lists print karein
crontab -l

# User cron editor open karein (tasks list write/modify karne ke liye)
crontab -e

# Current user crontab delete/remove karein
crontab -r

# Root ya kisi aur user ki crontab customize edit karein
sudo crontab -u username -e
```

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Important: PATH Environmental Trap

</div>

Cron jobs execute होते समय shell variables load नहीं होते। Cron runtime shell env setup बहुत minimal (`/usr/bin:/bin`) होता है। इसलिए scripts/commands लिखते समय हमेशा **Absolute Paths** का use करें:  
❌ `python myscript.py` (Fail हो सकता है)  
`/usr/bin/python3 /home/user/myscript.py` (Recommended)

</div>

</div>

## 3. Troubleshooting & Checking Logs

चूंकि cron jobs background processes हैं, इसलिए error output directly terminal पर visual display नहीं होती। Diagnostics check करने का correct process:

### Systemd Logs Monitor:

``` bash
# systemd journal logs se cron task executions view karein
journalctl -u cron.service -n 50 --no-pager
# ya syslog filter check karein
tail -f /var/log/syslog | grep CRON
```

### Output Redirecting (Logging target):

Cron job error diagnostics check करने के लिए standard output (stdout) और standard error (stderr) logs को target file में route करें:

``` bash
# Standard outputs and errors log.txt me append automatically
30 2 * * * /home/user/backup.sh >> /home/user/logs/backup.log 2>&1
```


