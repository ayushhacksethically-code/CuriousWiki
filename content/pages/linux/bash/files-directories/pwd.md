---
title: "🐚 pwd (print working directory) Command"
date: 2026-07-01
tags: ["linux","bash","pwd","commands","files","directories"]
---

**`pwd` (Print Working Directory)** एक बहुत ही basic और frequently used command है। इसका मुख्य काम यह बताना है कि आप इस समय Linux directory tree में किस directory/folder के अंदर काम कर रहे हैं (यानी आपका Current Path क्या है)।

## 1. Shell Built-in vs System Binary

क्या आप जानते हैं कि Linux में `pwd` नाम की दो चीजें होती हैं?

- **Shell Built-in:** यह BASH या ZSH shell के अंदर का inbuilt tool है। जब आप terminal पर `pwd` लिखते हैं, तो default रूप से यही run होता है। यह सुपर-फास्ट है क्योंकि इसके लिए shell को बाहर कोई नया process create नहीं करना पड़ता।
- **System Binary:** यह hard disk पर store एक independent binary file है, जो आमतौर पर `/bin/pwd` पर होती है।

``` bash
# यह चेक करने के लिए कि आपके terminal में कौन सा pwd चल रहा है:
type -a pwd
# Output:
# pwd is a shell builtin
# pwd is /bin/pwd
```

## 2. Options & Flags

आम तौर पर हम बिना किसी options के `pwd` चलाते हैं, लेकिन इसके दो बहुत महत्वपूर्ण flags हैं जो Symbolic Links (Symlinks) के साथ काम करते समय काम आते हैं:

| Option Flag | Behavior / Description |
|----|----|
| `-L`, `--logical` | **Logical Path:** यह पर्यावरण चर (environment variable) `$PWD` की value दिखाता है। अगर आप किसी symlinked folder के अंदर हैं, तो यह shortcut path ही दिखाएगा। (यह BASH builtin का default behavior है)। |
| `-P`, `--physical` | **Physical Path:** यह सभी symlinks को resolve करके उस directory का **वास्तविक (actual physical) path** दिखाता है। (यह `/bin/pwd` binary का default behavior है)। |

## 3. Live Example: Logical vs Physical Paths

आइए इसे एक practical example से समझते हैं। मान लीजिए हम user home directory में `/var/log` directory का एक symlink (shortcut) बनाते हैं:

``` bash
# Step 1: Symlink (shortcut) क्रिएट करें
ln -s /var/log ~/log_shortcut

# Step 2: Shortcut folder के अंदर जाएँ
cd ~/log_shortcut

# Step 3: बिना flags के pwd चलाएँ (Logical path दिखेगा)
pwd
# Output: /home/username/log_shortcut

# Step 4: -P flag के साथ pwd चलाएँ (Actual physical location दिखेगी)
pwd -P
# Output: /var/log
```

## 4. \$PWD Environment Variable

जब भी आप `cd` command से अपनी directory बदलते हैं, BASH shell automatically backend में `$PWD` और `$OLDPWD` (previous directory path) environment variables को update करता रहता है। आप चाहें तो इन्हें सीधे echo करके भी देख सकते हैं:

``` bash
echo $PWD      # Current folder path
echo $OLDPWD   # Last visited folder path (cd - इसी का उपयोग करता है)
```


