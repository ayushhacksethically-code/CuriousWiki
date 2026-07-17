---
title: "⚙️ BASH Logic, Loops & Custom Functions"
date: 2026-07-01
tags: ["bash","loops","conditionals","functions","error handling","trap","set strict mode"]
---

यह chapter scripts में logic branching (conditionals), iterations (loops), functions implementation, और professional shell exit configurations (strict flags, signal trapping) को cover करता है।

## 1. Conditionals (निर्णय नियंत्रण)

BASH में conditionals check करने के लिए `[[ ... ]]` (advanced brackets syntax) का use किया जाता है।

``` bash
declare -i age=20

# 1. Standard If-Elif-Else Statement
if [[ $age -ge 18 ]]; then
    echo "You can vote!"
elif [[ $age -gt 15 ]]; then
    echo "Teenager"
else
    echo "Child"
fi

# 2. Case Statement (Switch-Case Pattern)
status_code="404"
case "$status_code" in
    "200") echo "Success OK" ;;
    "404") echo "Page Not Found" ;;
    "500"|"502") echo "Server Error" ;;
    *) echo "Unknown Status" ;;
esac
```

### 📁 File & Path Conditionals (फ़ाइल तुलना ऑपरेटर)

| Operator | Check Condition | Usage Example |
|----|----|----|
| `-f "$file"` | True यदि path एक normal file है और exists करती है। | `[[ -f "config.json" ]]` |
| `-d "$dir"` | True यदि path एक valid directory है। | `[[ -d "/var/log" ]]` |
| `-r "$file"` | True यदि file read-accessible (पढ़ने योग्य) है। | `[[ -r "/etc/hosts" ]]` |
| `-w "$file"` | True यदि file write-accessible (लिखने योग्य) है। | `[[ -w "/var/log/syslog" ]]` |
| `-s "$file"` | True यदि file exists करती है और empty (खाली) नहीं है (size \> 0)। | `[[ -s "output.log" ]]` |

## 2. Loops (लूप संरचनाएं)

### ⚫ For Loops (लिस्ट पर इटरेशन)

``` bash
# Standard list loop
for fruit in "Apple" "Banana" "Orange"; do
    echo "Fruit: $fruit"
done

# C-Style structure loop
for ((i=1; i<=5; i++)); do
    echo "Counter: $i"
done
```

### ⚫ While & Until Loops (कंडीशन आधारित लूप)

``` bash
# While Loop: जब तक condition true है, तब तक चलेगा
declare -i count=1
while [[ $count -le 3 ]]; do
    echo "Count: $count"
    count+=1
done

# Until Loop: जब तक condition true नहीं होती (यानी false है), तब तक चलेगा
declare -i port=8000
until ss -tulpn | grep -q "$port"; do
    echo "Waiting for port $port to start..."
    sleep 1
done
```

## 3. Functions (कस्टम फंक्शन्स)

Code readability और clean scope maintain करने के लिए functions define किए जाते हैं:

``` bash
# Defining a function
function initialize_backup() {
    # Local variable (सिर्फ function scope में accessible)
    local dest_dir=$1
    local src_dir=$2
    
    echo "Backing up from $src_dir to $dest_dir"
    
    # Return code / Success status check
    if [[ -d "$src_dir" ]]; then
        return 0 # Success exit
    else
        return 1 # Failure code
    fi
}

# Calling a function with arguments
initialize_backup "/var/backups" "/home/user/data"
status=$? # exit status save करें
echo "Backup Status: $status"
```

## 4. Strict Mode and Error Handling (त्रुटि प्रबंधन)

Standard shell default behavior पर command failure होने पर भी script continue कर देता है। Production-ready scripts को robust बनाने के लिए **Strict Mode flags** configure करें:

``` bash
#!/bin/bash
set -e  # किसी भी command के fail (non-zero exit) होने पर script execution तुरंत रोकें।
set -u  # Unset (non-declared) variables use करने पर script exit करें।
set -o pipefail # Pipeline (|) के बीच में कोई command fail होने पर भी error return करें।

# --- Combined Strict Mode ---
set -euo pipefail
```

### 🚨 Signal Trapping (सिग्नल्स और क्लीनअप)

जब user execution के बीच में <span class="kbd">Ctrl+C</span> (SIGINT) दबाए, या script abnormal exit हो, तो temporary files clean-up करने के लिए `trap` command का use किया जाता है:

``` bash
# Temporary file initialize करें
temp_log="/tmp/sys-status.tmp"

# Cleanup function
function cleanup() {
    echo "🧹 Cleaning up temporary files..."
    rm -f "$temp_log"
    echo "Done."
}

# Trap signal hooks (Exit, Interrupt or Terminate होने पर cleanup call करें)
trap cleanup EXIT SIGINT SIGTERM

# Logic execution simulating delay
echo "Processing records..." > "$temp_log"
sleep 5 # User can interrupt with Ctrl+C here to test cleanup
```


