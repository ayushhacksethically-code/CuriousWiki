---
title: "🖥️ Windows Command Prompt (cmd.exe)"
date: 2026-07-01
tags: ["windows","cmd","command prompt","dos","cmd.exe","environment variables","scripting","registry autorun"]
---

**cmd.exe (Command Prompt)** Windows Operating Systems (Windows Server 2016-2025, Windows 10/11) का default command-line interpreter है। यह traditional legacy systems compatibility प्रदान करता है और `.bat` / `.cmd` batch scripts handle करने के काम आता है।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Advancement Note

</div>

Modern environments में Microsoft scripting automation tasks के लिए PowerShell या Windows Subsystem for Linux (WSL) utilize करने की सलाह देता है क्योंकि cmd.exe capabilities काफी limited हैं।

</div>

</div>

## 1. Syntax and Execution Parameters (पैरामीटर्स)

``` cmd
cmd [/c|/k] [/s] [/q] [/d] [/a|/u] [/t:{b}{f}] [/e:{on|off}] [/f:{on|off}] [/v:{on|off}] [string]
```

### Key Launch Options:

| Parameter Option | Behavior Description |
|----|----|
| `/c` | दी गई string command run करने के बाद cmd process को automatically terminate (exit) कर देता है। |
| `/k` | दी गई string command run करता है लेकिन console runtime window को **खुला (active)** रखता है। |
| `/q` | Echo display mode off कर देता है (command outputs quiet mode में चलते हैं)। |
| `/d` | Registry configuration AutoRun commands logic block/disable कर देता है। |
| `/a` \| `/u` | Outputs formatting settings: ANSI (`/a`) या Unicode (`/u`) control. |
| `/v:on` | **Delayed Variable Expansion** इनेबल करना (runtime पर runtime parameters evaluate करने के लिए `!var!` syntax का support मिलता है)। |
| `/f:on` | File and directory name tab completion support configuration इनेबल करना। |

## 2. Color Configurations (रंग सेटिंग्स)

`/t:bf` parameter के ज़रिये background (b) और foreground/text (f) colors hex codes के base पर set किए जा सकते हैं:

**Color Codes:** `0`=Black, `1`=Blue, `2`=Green, `3`=Aqua, `4`=Red, `5`=Purple, `6`=Yellow, `7`=White, `8`=Gray, `9`=Light Blue, `A`=Light Green, `B`=Light Aqua, `C`=Light Red, `D`=Light Purple, `E`=Light Yellow, `F`=Bright White.

``` cmd
# Background green (2) with text Bright White (F)
cmd /t:2f
```

## 3. Command Control and Operators (कंट्रोल ऑपरेटर्स)

cmd processes chaining के लिए standard control flags implement करता है:

- **Pipe (`|`):** output to input data forwarding (e.g. `command1 | command2`).
- **AND execution (`&&`):** `command2` तभी run होगा जब `command1` success (0 exit status) return करे।
- **OR execution (`||`):** `command2` तभी run होगा जब `command1` execution fail (non-zero status) हो।
- **Nesting (`&`):** Sequential serial execution बिना outcome checks के (e.g. `command1 & command2`).
- **Escape Character (`^`):** Special operators characters (`&`, `|`, `(`, `)`, `<`, `>`) को plaintext print करने के लिए escape symbol `^` (caret) का use होता है।

## 4. Windows Registry Settings and AutoRun Hooks

Windows Registry tweaks के ज़रिये CMD environment behavior globally change किया जा सकता है:

### AutoRun Path Settings:

जब भी console window खुलती है, AutoRun registry path programs priority logic पर execute होते हैं:

- `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor\AutoRun`
- `HKEY_CURRENT_USER\Software\Microsoft\Command Processor\AutoRun`

### Delayed Variable Expansion:

delayed environment variables update control registry location:

`HKEY_CURRENT_USER\Software\Microsoft\Command Processor\EnableExtensions` (Set to `0x1` for ON, `0x0` for OFF).

## 5. Environment Variables Control (वेरिएबल्स प्रबंधन)

cmd.exe local scope and system level variables commands supports करता है:

### Read / View Variables:

``` cmd
# View all current environment variables
set

# View specific variable
set USERNAME
```

### Add / Modify Variables:

``` cmd
# Create / edit local variable
set MY_VAR=HelloCMD

# Escaping special characters in values
set SPECIAL_VAR=New^&Name
```

### Variable Evaluation (सब्स्टिट्यूशन):

Variables की value access करने के लिए variable name को percent signs (`%VariableName%`) के बीच enclose किया जाता है:

``` cmd
echo User directory is located at: %USERPROFILE%
```

<div class="callout callout-danger">
<i data-lucide="skull"></i>
<div class="callout-content">

<div class="callout-title">

Storage Limits

</div>

Individual environment variable size limit **8,192 bytes** होती है। एक process के लिए combined system environment context variable limit **65,536 characters** होती है।

</div>

</div>


