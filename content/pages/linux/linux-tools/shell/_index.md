---
title: "🐚 Command-Line Shells Guide"
date: 2026-07-01
tags: ["linux","shell","bash","zsh","fish","dash","tcsh","ksh","cmd","powershell","terminal"]
---

Linux, macOS, और Windows operating systems में commands execute करने और scripting workflows configure करने के लिए उपयोग होने वाले प्रमुख **Shells** की विस्तृत जानकारी।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Shell क्या है?

</div>

Shell एक interface/program है जो user से inputs (commands) लेता है, उन्हें OS Kernel को भेजता है, और outcome/output display करता. Terminal Window सिर्फ एक host/container wrapper है, जिसके अंदर actual shell (जैसे Bash, Zsh) चलता है।

</div>

</div>

## 1. Core Unix/Linux Shells

### ⚫ sh (Bourne Shell)

यह Unix system का मूल (original) shell है, जिसे Steve Bourne ने Bell Labs में विकसित किया था। यह बहुत basic है और आज की तारीख में mostly interactive use के बजाय compatibility scripts चलाने के काम आता है।

### ⚫ <a href="dash.html" class="wiki-link">dash (Debian Almquist Shell)</a>

यह POSIX standard का पालन करने वाला एक अत्यंत fast और lightweight shell है। इसके background इतिहास और development details के बारे में जानने के लिए <a href="dash.html" class="wiki-link">Almquist / Debian Almquist Shell (DASH) Guide</a> देखें। Debian/Ubuntu में non-interactive system scripts चलाने के लिए default shell `/bin/sh` असल में `dash` को ही point करता है।

### ⚫ <a href="bash.html" class="wiki-link">bash (Bourne Again Shell)</a>

GNU project का हिस्सा और दुनिया का सबसे लोकप्रिय shell. इसके development history, license policy, editor shortcuts, और execution security modes की detail information के लिए <a href="bash.html" class="wiki-link">GNU Bash Shell Guide</a> देखें। अधिकांश Linux distros (जैसे Ubuntu, Debian, Fedora) में default interactive shell `bash` ही होता है। यह command completion, history search, और syntax scaling support करता है।

``` bash
# Check your current shell
echo $0

# Switch to bash
exec bash
```

### ⚫ <a href="zsh.html" class="wiki-link">zsh (Z Shell)</a>

Bash का एक advanced version जो interactive use के लिए बहुत feature-rich है। इसके creation history, advanced parameters, right-side prompts, और plugin ecosystems के बारे में जानने के लिए <a href="zsh.html" class="wiki-link">Z Shell (Zsh) Guide</a> देखें। macOS Catalina के बाद से यह Apple devices पर default shell बन गया है। **Oh My Zsh** plugins/themes ecosystem के कारण यह developers का पसंदीदा shell है।

### ⚫ fish (Friendly Interactive Shell)

यह "out of the box" user-friendly shell है। इसमें custom configurations के बिना ही automatic syntax highlighting, path auto-suggestions, और tab selection lists मिल जाती हैं। *(Note: यह POSIX standard को direct follow नहीं करता, इसलिए standard bash code directly fish में नहीं चलता।)*

### ⚫ ksh (Korn Shell)

David Korn द्वारा developed, यह C Shell (csh) के features और Bourne Shell (sh) की compatibility को मिलाता है। Enterprise systems और traditional scripts में यह काफ़ी लोकप्रिय है।

### ⚫ tcsh (TENEX C Shell)

यह `csh` (C Shell) का compatible extension है। इसका syntax 'C programming language' से बहुत मिलता-जुलता है। FreeBSD जैसे BSD systems में यह बहुत आम है।

## 2. Windows Shells

### ⚫ <a href="cmd.html" class="wiki-link">cmd (Command Prompt)</a>

Windows का traditional standard shell जो MS-DOS commands पर आधारित है। इसके launch parameters, file completions, registry AutoRun options, और dynamic environment variables के details के लिए <a href="cmd.html" class="wiki-link">Command Prompt (cmd) Guide</a> देखें। यह `.bat` / `.cmd` scripts support करता है।

### ⚫ <a href="powershell.html" class="wiki-link">PowerShell</a>

Microsoft का modern shell और task automation framework. इसके architecture features, Monad Manifesto history, profile/module configurations, और multi-distro Linux installation guidelines के लिए <a href="powershell.html" class="wiki-link">PowerShell (pwsh) Guide</a> देखें। यह **.NET Core** engine पर काम करता है और objects flow pipeline utilize करता है।

``` powershell
# Get process list as object and filter by CPU usage in PowerShell
Get-Process | Where-Object {$_.CPU -gt 10}
```

## 3. Shells Comparison (तुलना)

| Shell Name | Target OS | POSIX Compliant? | Output Type | Main Use-Case |
|----|----|----|----|----|
| **sh / dash** | Unix / Linux | 🟢 Yes | Text Stream | Fast system bootstrap / low memory scripts |
| **bash** | Linux / macOS / Windows WSL | 🟢 Yes | Text Stream | Default terminal usage & deployment scripting |
| **zsh** | macOS / Linux | 🟢 Yes | Text Stream | Developer theme customization & fast plugins |
| **fish** | Linux / macOS | 🔴 No | Text Stream | Friendly interactive shell autocompletions |
| **ksh / tcsh** | Unix / BSD / Enterprise Linux | 🟢 / 🔴 (Variable) | Text Stream | Legacy scripts and specific shell workflows |
| **cmd** | Windows | 🔴 No | Text Stream | Legacy Windows configuration batch commands |
| **PowerShell** | Windows / Linux / macOS | 🔴 No | **Objects (.NET)** | Enterprise system administration & automation |

## 4. Installing Shells on Famous OSes (शेल इंस्टॉलेशन गाइड)

सभी प्रमुख shells को अलग-अलग operating systems पर install करने की instructions:

### ⚫ Debian / Ubuntu (Linux)

``` bash
# Update package list
sudo apt update

# Install Bash, Zsh, and Fish
sudo apt install bash zsh fish -y

# Install Dash (usually pre-installed)
sudo apt install dash -y

# Install PowerShell Core (pwsh)
# (Needs Microsoft repository keys registered first - see PowerShell Guide)
sudo apt install powershell -y
```

### ⚫ Fedora / RHEL (Linux)

``` bash
# Update package list
sudo dnf check-update

# Install Bash, Zsh, and Fish
sudo dnf install bash zsh fish -y

# Install Dash
sudo dnf install dash -y

# Install PowerShell Core
sudo dnf install powershell -y
```

### ⚫ Arch Linux

``` bash
# Install Bash, Zsh, and Fish
sudo pacman -S/Syu bash zsh fish

# Install Dash
sudo pacman -S dash

# Install PowerShell Core (from AUR)
yay -S powershell-bin
```

### ⚫ macOS (using Homebrew)

macOS पर default रूप से Zsh pre-installed रहता है। Brew package manager के ज़रिये अन्य shells install करने की commands:

``` bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install latest Bash 5 and Fish
brew install bash fish

# Install PowerShell Core
brew install --cask powershell
```

### ⚫ Windows (using winget / WSL)

Windows 10/11 में default रूप से cmd.exe और Windows PowerShell 5.1 रहता है। Modern version shells install करने की CLI commands:

``` powershell
# Install Git Bash (contains modern Bash)
winget install Git.Git

# Install latest PowerShell 7 (Core)
winget install Microsoft.PowerShell

# Install Windows Subsystem for Linux (WSL) to run Zsh/Bash/Fish natively
wsl --install
```


