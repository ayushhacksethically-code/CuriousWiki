---
title: "🐕 tail (output the last part of files) Command"
date: 2026-07-13
tags: ["linux","bash","tail","commands","files","directories","logs"]
---

**`tail`** command Linux environment में files के आखिरी भाग (default रूप से अंतिम 10 lines) को output करने के लिए उपयोग किया जाता है। विशेष रूप से growing log files को real-time में monitor करने के लिए यह एक अत्यंत महत्वपूर्ण command है।

## 1. Syntax

``` bash
tail [OPTION]... [FILE]...
```

अगर कोई file specify नहीं की जाती है या `-` दिया जाता है, तो यह standard input (stdin) से read करता है।

## 2. Key Formatting Flags

| Option | Alternative | Purpose & Behavior |
|----|----|----|
| `-n NUM` | `--lines=NUM` | अंतिम 10 lines के बजाय अंतिम NUM lines output करता है। `-n +NUM` का उपयोग करके file की start से lines skip भी की जा सकती हैं। |
| `-c NUM` | `--bytes=NUM` | अंतिम NUM bytes output करता है। |
| `-f` | `--follow` | जैसे-जैसे file में data append होता है, उसे real-time में update करता रहता है। Logs monitoring के लिए सबसे उपयोगी option. |
| `-F` | -- | `--follow=name --retry` के समान है। यदि log file rotate या rename हो जाती है, तब भी यह उसे track करता रहता है। |
| `-q` | `--quiet` | Multiple files reading के समय filename header output नहीं करता। |
| `-v` | `--verbose` | हमेशा files के names header के रूप में output करता है। |

## 3. Terminal Examples

### Example 1: File की अंतिम 10 lines देखें

``` bash
tail system.log
```

### Example 2: File की अंतिम 50 lines देखें

``` bash
tail -n 50 system.log
```

### Example 3: Line number 15 से start करते हुए आगे का content देखें

``` bash
tail -n +15 config.cfg
```

### Example 4: Real-time logs monitoring (अत्यंत महत्वपूर्ण)

जैसे-जैसे server logs write करता है, terminal पर automatically details output होते रहते हैं:

``` bash
tail -f /var/log/nginx/access.log
```

### Example 5: Multiple files को header के साथ monitor करना

``` bash
tail -n 5 error.log access.log
```


