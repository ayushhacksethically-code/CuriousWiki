---
title: "🛡️ Acme.sh - Zero Dependency SSL/TLS Let's Encrypt Client"
date: 2026-07-10
tags: ["acme","acme.sh","ssl","tls","letsencrypt","certificate","cloudflare","nginx"]
---

**acme.sh** एक zero-dependency, pure Unix shell script-based ACME client protocol execution tool है। यह base ACME protocol standards (जैसे Let's Encrypt, ZeroSSL, Buypass) का use करके automatic domain SSL certificates issue, verify, install और renew कर सकता है। इसके लिए Certbot की तरह massive dependencies (जैसे Python binaries) install करने की need नहीं होती।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Non-root Privileges Installation

</div>

Certbot को system settings access करने के लिए root/sudo privilege level mandatory होता है। acme.sh easily **non-root normal user directories** (`~/.acme.sh/`) में standalone execute हो सकता है, जिससे server architecture secure रहती है।

</div>

</div>

## 1. Installation

acme.sh को curl script hook के through install करने का complete process:

``` bash
# Online script install trigger karein (replace email with your own)
curl https://get.acme.sh | sh -s email=myemail@example.com

# Terminal reload karein taaki alias path update ho jaye
source ~/.bashrc
```

## 2. Issuing SSL Certificates

Certificate verify करने के two major methods (Webroot mode और DNS API challenge) हैं:

### Method A: Webroot Mode (For Running Servers)

अगर domain server live है (जैसे Nginx/Apache run हो रहा है) और local folder path access-enabled है:

``` bash
# Webroot verify logic issue command
acme.sh --issue -d mydomain.com -d www.mydomain.com -w /var/www/html/
```

### Method B: DNS API Challenge (For Cloudflare, etc.)

अगर domain points direct server ip पर configuration update नहीं है (Private network targets), या wildcards certificate (`*.domain.com`) build करना चाहते हैं, तो API variables setup करें:

``` bash
# Cloudflare API keys parameters declare
export CF_Key="your_global_api_key_here"
export CF_Email="your_cloudflare_email@example.com"

# Issue wildcard certificate using Cloudflare DNS verification
acme.sh --issue --dns dns_cf -d mydomain.com -d *.mydomain.com
```

⚠️ **Tip**: Verification token successful build होने के बाद, API credentials background directory (`~/.acme.sh/account.conf`) में save हो जाते हैं ताकि future auto-renewals seamless रहें।

## 3. Copying/Installing SSL to Web Servers

चूंकि certificates generated parameters internal directory inside store होते हैं, इन्हें dynamic server config targets पर correct method install commands के along clone link किया जाता है:

### Nginx Configuration Example:

``` bash
# Create directory structure for SSL target keys
sudo mkdir -p /etc/nginx/ssl/mydomain.com/

# Install/Copy keys automatically (Nginx restart command will run after auto-renewals)
acme.sh --install-cert -d mydomain.com \
--key-file       /etc/nginx/ssl/mydomain.com/key.pem \
--fullchain-file /etc/nginx/ssl/mydomain.com/cert.pem \
--reloadcmd     "sudo systemctl reload nginx"
```

## 4. Automatic Cron Renewal Check

Installation phase के during acme.sh automatically crontab scheduler setup append कर देता है:

``` bash
# Check active user crontab tasks
crontab -l
```

output lines display details like:

``` text
10 0 * * * "/home/user/.acme.sh"/acme.sh --cron --home "/home/user/.acme.sh" > /dev/null
```

यह task हर दिन check करता है कि certificate update require-state (older than 60 days) में है या नहीं, और update execution run करता है।


