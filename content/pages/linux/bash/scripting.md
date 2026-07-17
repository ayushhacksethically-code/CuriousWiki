---
title: "🐚 BASH Script Anatomy & Data Types"
date: 2026-07-01
tags: ["bash","scripting","variables","arrays","associative","shebang","exit codes","strings","operators"]
---

यह chapter BASH scripts के build structure, variable assignment protocols, basic/advanced data types, operators, input-output, positional arguments, and exit codes को cover करता है।

## 1. BASH Script Anatomy (स्क्रिप्ट की शारीरिक रचना)

एक standard BASH script की structure इस तरह दिखती है:

``` bash
#!/bin/bash
# (Shebang) -> OS को बताता है कि script चलाने के लिए Bash interpreter का use करें।

# --- GLOBAL CONFIGURATIONS & VARIABLES ---
readonly APP_NAME="CuriousWiki Backup Tool"
VERSION="1.0"

# --- MAIN FUNCTIONS ---
function print_header() {
    echo "=== $APP_NAME ($VERSION) ==="
}

# --- SCRIPT EXECUTION ---
print_header
echo "Starting process..."
```

### 🚀 Script चलाना (Running Shell Scripts)

BASH script file (जैसे `backup.sh`) को run करने के 2 main तरीके हैं:

1.  **Execution Permission देकर (Recommended):**

    ``` bash
    chmod +x backup.sh # Execute permission grant करें
    ./backup.sh        # Run the script directly
    ```

2.  **Interpreter call करके (बिना execution permission के):**

    ``` bash
    bash backup.sh
    ```

## 2. Variables (वेरिएबल्स)

BASH dynamically-typed shell है। Variable name और value assignment के बीच **कोई space नहीं होना चाहिए** (`var=value` सही है, `var = value` गलत है)।

``` bash
# Regular Variable
username="narayanas"

# Read-only Variable (Const)
readonly DB_PORT=3306

# Local Variable (सिर्फ custom functions के अंदर scoped)
function demo() {
    local index=5
    echo "Index: $index"
}

# Environment Variable (Exported for child processes)
export BUILD_DIR="/var/www/dist"

# Unset / Clear Variable
unset username
```

## 3. BASH Data Types (डेटा प्रकार)

Bash variables internally standard strings की तरह handle होते हैं, लेकिन declaration style से dynamic behavior customize किया जा सकता है:

### ⚫ 1. Strings

डेटा स्टोर करने का सबसे आम तरीका. double-quotes variables evaluation support करते हैं, single-quotes standard plaintext structure maintain करते हैं:

``` bash
name="Alice"
echo "Hello $name"  # Evaluates: Hello Alice
echo 'Hello $name'  # Prints literal: Hello $name
```

### ⚫ 2. Numeric Variables

BASH variables default strings होते हैं। Arithmetic features clear रखने के लिए `declare -i` से variables initialize करें:

``` bash
declare -i score=10
score=score+5  # Evaluates: 15 (No need to use let/expr)
```

### ⚫ 3. Indexed / Numeric Arrays

डेटा values की numerical-ordered key list:

``` bash
# Array initialize करना
declare -a fruits=("Apple" "Banana" "Mango")

# Element Access (0-indexed)
echo ${fruits[0]}  # Apple

# Array के सभी elements access करना
echo ${fruits[@]}  # Apple Banana Mango

# Array length (कुल elements)
echo ${#fruits[@]} # 3

# Array में element append (जोड़ना)
fruits+=("Orange")
```

### ⚫ 4. Associative Arrays (Key-Value Dictionary)

यह dictionary की तरह काम करता है जहाँ index number के बजाय custom text keys (strings) होते हैं: *(Note: इसके लिए `declare -A` mandatory है)*

``` bash
# Declare Associative Array
declare -A db_config

# Set values
db_config[host]="localhost"
db_config[user]="admin"
db_config[pass]="secret"

# Access value
echo "Database Host: ${db_config[host]}" # localhost
echo "All keys: ${!db_config[@]}"       # host user pass
```

## 4. Positional Arguments (स्क्रिप्ट आर्गुमेंट्स)

Script launch करते समय pass किए गए parameters access करने के standard variable flags:

| Argument Flag | Description | Example Usage |
|----|----|----|
| `$0` | Script का filename path | `./backup.sh` |
| `$1` - `$9` | पहला argument से लेकर नौवें positional parameter तक | `$1` (First argument) |
| `$#` | Total number of arguments passed (आर्गुमेंट्स की संख्या) | `if [ $# -lt 1 ]; then ...` |
| `$@` | All arguments as separate quotes values (Recommended) | `for arg in "$@"; do ...` |
| `$*` | All arguments formatted as a single combined string | `echo "$*"` |

## 5. Exit Codes (एग्जिट कोड्स)

हर command या script execute होने पर OS को exit status code return करती है।

- `$?`: यह last executed command का status return करता है।

  ``` bash
  ping -c 1 google.com
  echo $?  # Outputs: 0 (Success)

  ping -c 1 invalidurl.xyz
  echo $?  # Outputs: 2 (Non-zero indicates Failure)
  ```

- Custom scripts में code flow control के लिए direct exit code explicitly define करें:

  ``` bash
  if [ ! -f "config.json" ]; then
      echo "Configuration file missing!"
      exit 1  # Standard error exit status
  fi
  exit 0      # Clean completion
  ```

## 6. String Manipulation (स्ट्रिंग हेरफेर)

String slice, replace, और size calculation directly shell parser variable expansion level पर किया जा सकता है:

``` bash
msg="hello world"

# 1. String length (लंबाई)
echo ${#msg}       # 11

# 2. Substring / Slice (${var:start:length})
echo ${msg:6:5}    # world

# 3. Search and Replace (${var/search/replace})
echo ${msg/world/bash} # hello bash

# 4. Remove prefix / suffix patterns
filepath="/var/log/syslog"
echo ${filepath##*/} # syslog (Only filename extracted)
```


