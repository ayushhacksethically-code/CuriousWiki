---
title: "⚡ BASH Builtins & Custom Aliases"
date: 2026-07-05
tags: ["linux","bash","alias","unalias","builtins","commands","shell","source"]
---

BASH shell के अंदर functions और programs को fast execute करने के लिए **Builtin Commands** और custom shortcuts (**Aliases**) का use किया जाता है। यह guide `alias.txt` file के essential controls को simple language में describe करती है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

What are Builtin Commands?

</div>

Builtin commands सीधे shell memory से run होते हैं। इनके लिए file system से external application load नहीं करनी पड़ती, इसलिए ये fast execute होते हैं (जैसे `cd`, `alias`, `source`)।

</div>

</div>

## 1. Aliases Setup (शॉर्टकट बनाना)

Long terminal commands को brief name assign करने के लिए `alias` utility का use होता है:

``` bash
# All defined aliases check करें
alias -p

# एक नया custom shortcut/alias create करें
alias ll="ls -la --color=auto"
alias gs="git status"
alias update="sudo apt update && sudo apt upgrade -y"
```

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Temporary vs Permanent Aliases

</div>

Terminal में check-in किया हुआ alias session close होते ही clear हो जाता है। इसे permanently preserve करने के लिए `~/.bashrc` file के end में link/command add करें और `source ~/.bashrc` command से shell refresh करें।

</div>

</div>

### Alias को Delete करना (Unalias)

किसी defined alias shortcut को drop/remove करने के लिए `unalias` command run करें:

``` bash
# Single alias remove करें
unalias gs

# सारे active aliases clean करें
unalias -a
```

## 2. Key BASH Builtin Reference

नीचे primary built-in utilities और उनके parameters describe किये गए हैं:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr>
<th>Command Syntax</th>
<th>Purpose (Hinglish Detail)</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>: [arguments]</code></td>
<td>Null command/Noop handler. कुछ काम नहीं करता, हमेशा exit status <code>0</code> देता है।</td>
</tr>
<tr>
<td><code>. filename</code> or<br />
<code>source filename</code></td>
<td>Current shell environment में configuration या function files को read और execute करने के लिए use होता है।</td>
</tr>
<tr>
<td><code>bg [jobspec]</code></td>
<td>Suspended/stopped jobs को background worker mode में process करने के लिए run करें।</td>
</tr>
<tr>
<td><code>fg [jobspec]</code></td>
<td>Background में run होने वाली processes को foreground task view में वापस resume/drag करता है।</td>
</tr>
<tr>
<td><code>declare [options]</code></td>
<td>Variables के type attribute define करने के लिए use होता है (जैसे arrays या read-only status)।</td>
</tr>
<tr>
<td><code>eval [args]</code></td>
<td>Arguments को compile/build करके shell command बनाता है और execute करता है।</td>
</tr>
<tr>
<td><code>exec [command]</code></td>
<td>Current shell process window को replace करके input program run करता है (Command exit होने पर Shell tab बंद हो जाता है)।</td>
</tr>
</tbody>
</table>

## 3. Readline Keyboard Configuration (bind)

Keyboard inputs और sequences को internal functions या macro strings से link करने के लिए `bind` control use होता है:

``` bash
# List all readline functions
bind -l

# Active key bindings mappings check करें
bind -p

# Key sequence script bind syntax
bind '"\C-x\C-r": re-read-init-file' # Ctrl+x Ctrl+r दबाने पर configuration file reload होगी
```

## 4. Variables Handling (export, readonly)

Shell parameters define करने और sub-processes में pass करने के shortcuts:

``` bash
# Variable parameters को sub-shells (Environment) के लिए mark करें
export PATH="$PATH:/usr/local/bin"

# Variable read-only status create करें (constant assignment check)
readonly MaxAttempts=5
# MaxAttempts=10 -> Bash error: MaxAttempts: readonly variable
```


