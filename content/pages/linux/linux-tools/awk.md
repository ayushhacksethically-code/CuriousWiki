---
title: "📊 AWK: Pattern Scanning & Text Processing"
date: 2026-07-05
tags: ["linux","awk","gawk","programming","parsing","columns","script"]
---

Linux environments में logs analysis और tabular files formatting के लिए **AWK** language सबसे powerful scripting engine है। यह lines को **Records** और space-separated parameters को **Fields** की form में dynamically parse करता है। यह reference guide `awk.txt` manual पर based है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Basic Syntax Structure

</div>

`awk [options] 'pattern { action }' input-file`  
Default behaviour: हर source line को read करके check करता है कि क्या वह `pattern` criteria satisfy करता है, अगर हाँ तो bracket `{ action }` blocks execute होते हैं।

</div>

</div>

## 1. Core Variables (बिल्ट-इन वैरिएबल्स)

AWK programming flow logic run करने के लिए pre-defined parameters default active रहते हैं:

| Variable | Standard Representation | Description (Hinglish Detail) |
|----|----|----|
| `$0` | Entire Line Record | पूरी string line को single time access/print करने के लिए। |
| `$1, $2, $N` | Fields index columns | Particular lines segment words. `$1` (first column word), `$2` (second) आदि। |
| `NF` | Number of Fields | Current read line में total spaces columns/words कितने हैं। |
| `NR` | Number of Records | System runtime execution में processing count line list number track करने के लिए। |
| `FS` | Field Separator | Words split indicator character. Default `[space/tabs]` होता है। |
| `OFS` | Output Field Separator | Print columns display output के समय use होने वाला separator (Default: space)। |

## 2. Execution Blocks (BEGIN & END blocks)

Files scanning start होने से पहले और process finish होने के बाद alerts/actions handle करने के controls:

``` bash
# BEGIN -> file processing के बिल्कुल शुरू होने से पहले run होता है
# END -> सारी text file parse होने के बाद compute execution करता है
awk 'BEGIN { print "--- REPORT STARTED ---" } { print $1 } END { print "--- DONE ---" }' users.txt
```

## 3. Practical Command Examples (प्रैक्टिकल उदाहरण)

Common logs और configurations processing recipes:

### Field Separator set करना (e.g. CSV or Passwd files)

अगर files fields columns colon `:` or comma `,` value partition parameters use करते हैं:

``` bash
# Custom Separator set करने के लिए parameter flag -F का use करें
awk -F ":" '{ print $1 " uses home " $6 }' /etc/passwd

# Dynamic variables assignments
awk -v FS="," -v OFS=" | " '{ print $1, $3 }' data.csv
```

### Row Filters & Conditions (शर्तें लागू करना)

``` bash
# केवल वही lines read करें जिनकी values column 3 में 100 से बड़ी हैं
awk '$3 > 100 { print $1 " alert " $3 }' stats.txt

# Substring matches verification (logs pattern check)
awk '/ERROR/ { print "Log error on line " NR ": " $0 }' /var/log/syslog
```

### Data Aggregation & Calculation (डेटा की गणना)

``` bash
# Column 2 की सारी numbers value aggregate (total calculation sum) करें
awk '{ sum += $2 } END { print "Total sum: " sum }' accounting.log

# Dynamic lines average calculation filter
awk '{ sum += $2 } END { print "Average: " sum/NR }' telemetry.log
```

## 4. AWK Built-in Functions (बिल्ट-इन फंक्शन्स)

String handling and parsing tasks के main utilities:

``` bash
# String Length calculation
awk '{ print $1 " length=" length($1) }' inputs.txt

# Text cases capitalization conversion
awk '{ print toupper($0) }' lowercase_logs.txt

# Find and replace substrings (gsub - global substitution)
awk '{ gsub("localhost", "127.0.0.1", $0); print }' config.yaml
```


