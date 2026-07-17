---
title: "🛠️ BASH Fundamentals & Stream Redirections"
date: 2026-07-01
tags: ["bash","shell","fundamentals","redirection","streams","stdin","stdout","stderr","pipe","alias"]
---

यह chapter Linux Shell execution के foundations को cover करता है, जिसमें essential commands, documentation, aliases, execution control, redirections, और pipes शामिल हैं।

## 1. Essential CLI Commands (मूल एवं उन्नत कमांड्स)

फ़ाइलें और directories navigate करने और manipulate करने के standard commands:

| Command | Syntax / Use Case | Description |
|----|----|----|
| `pwd` | `pwd` | Print Working Directory (वर्तमान पथ दिखाता है)। |
| `ls` | `ls -lah` | छुपी हुई फाइलों (hidden) और file size के साथ सूची दिखाता है। |
| `mkdir` | `mkdir -p projects/bash` | Parents folders के साथ recursive path directories बनाता है। |
| `find` | `find . -name "*.log"` | पूरे directory path में specific patterns खोजता है। |
| `xargs` | `find . -name "*.tmp" | xargs rm` | Standard output को दूसरे command के arguments में convert करता है। |

### 🔁 Repeat Commands & History Shortcuts

- **`watch`**: किसी command को regular intervals पर auto-repeat करने के लिए (जैसे resource update track करना):

  ``` bash
  # हर 2 second में active network ports refresh करें
  watch -n 2 ss -tulpn
  ```

- **`!!`**: ठीक पिछला command वापस run करने के लिए (अक्सर `sudo` भूलने पर useful):

  ``` bash
  apt update  # Permission denied error
  sudo !!     # Execs: sudo apt update
  ```

- **`!$`**: पिछले command के आखिरी argument को reuse करने के लिए:

  ``` bash
  mkdir new_folder
  cd !$  # cd new_folder
  ```

## 2. Getting Help (दस्तावेज़ और सहायता)

Linux में commands का syntax समझने के multiple options हैं:

- `man <command>`: Command का off-line user manual दिखाता है (पढ़ने के लिए <span class="kbd">space</span> और quit करने के लिए <span class="kbd">Q</span> दबाएं)।
- `info <command>`: GNU commands की hypertext links वाली detail doc configuration दिखाता है।
- `<command> --help`: Command का संक्षिप्त summary display करता है।
- `help <builtin>`: Shell built-in commands (जैसे `cd`, `history`, `alias`) की documentation के लिए।

## 3. Bash Aliases (कस्टम शार्टकट्स)

बार-बार टाइप किए जाने वाले लंबे commands को एक keyword (alias) में save किया जा सकता है।

``` bash
# Temporary Alias (वर्तमान session के लिए)
alias ll='ls -lah'
alias gs='git status'

# Permanent Aliases
# इसे अपनी ~/.bashrc फ़ाइल के अंत में लिखें, फिर 'source ~/.bashrc' चलाएं।
```

## 4. Stopping Execution (कमांड बंद या सस्पेंड करना)

Terminal execution के control commands:

- <span class="kbd">Ctrl</span> + <span class="kbd">C</span>: Active running command को **SIGINT** signal भेजकर तुरंत kill/terminate करता है।
- <span class="kbd">Ctrl</span> + <span class="kbd">Z</span>: Program को foreground से **SIGTSTP** भेजकर suspend (pause) करता है। (आप `fg` से foreground, या `bg` से background में वापस resume कर सकते हैं)।
- <span class="kbd">Ctrl</span> + <span class="kbd">D</span>: **EOF** (End of File) भेजता है। Active input shell session को log out करने के लिए इसका use होता है।

## 5. Standard Streams & Redirection

Linux में हर process के पास 3 standard communication channels होते हैं:

| Descriptor ID | Stream Name | Standard Device | Redirection Operators |
|----|----|----|----|
| `0` | **stdin** (Standard Input) | Keyboard | `<`, `<<`, `<<<` |
| `1` | **stdout** (Standard Output) | Monitor (Terminal Screen) | `>` (overwrite), `>>` (append) |
| `2` | **stderr** (Standard Error) | Monitor (Terminal Screen) | `2>`, `2>>` |

### 📤 Output & Error Redirection Examples

``` bash
# Standard output को file में save (overwrite) करें
echo "Hello Wiki" > output.txt

# Append output (बिना पुरानी data हटाए)
echo "Line 2" >> output.txt

# Error stream को file में redirect करें (2>)
ls non_existent_folder 2> error.log

# Output (1) और Errors (2) दोनों को एक ही file में भेजें (&>)
compile-project &> build.log

# Errors को silent/discard करने के लिए null device में भेजें (/dev/null)
find / -name "*.conf" 2> /dev/null
```

### 📥 Input Redirection (Here-Docs & Here-Strings)

``` bash
# File से input redirect करना
wc -l < output.txt

# Here-Document (<<): Multiple lines input script को direct pass करना
cat << EOF > script.config
db_port=3306
db_user=root
EOF

# Here-String (<<<): Single string block input pass करना
bc <<< "5 + 10"  # Computes math operation directly
```

## 6. Pipes, Command and Process Substitution

### ⚫ Pipes (`|`)

एक command के stdout stream को सीधे दूसरे command के stdin input में chain करने की process:

``` bash
# active configurations को grep से filter करके count करें
ss -tulpn | grep "8000" | wc -l
```

### ⚫ Command Substitution (`$()`)

किसी command के output को string value की तरह use करना:

``` bash
# Current Date variable folder path बनाना
mkdir -p "backup-$(date +%Y-%m-%d)"
```

### ⚫ Process Substitution (`<()`)

किसी command के output को एक virtual read-only file structure pointer की तरह evaluate करना (multiple commands outputs compare करने के लिए helpful):

``` bash
# दो directories की index listings compare करें
diff <(ls folder1) <(ls folder2)
```


