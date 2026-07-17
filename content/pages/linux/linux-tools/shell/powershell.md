---
title: "🐚 Microsoft PowerShell (pwsh)"
date: 2026-07-01
tags: ["linux","shell","powershell","pwsh",".net objects","windows","mono manifesto","dsc","install powershell"]
---

**PowerShell** Microsoft द्वारा विकसित एक cross-platform task automation framework, command shell, और scripting language है। यह Windows, Linux और macOS पर चलता है और traditional shells की तरह plain text streams के बजाय **.NET Objects** flow पर काम करता है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

The Monad Manifesto

</div>

PowerShell के आविष्कारक **Jeffrey Snover** ने 2002 में "Monad Manifesto" लिखा था। इसमें उन्होंने UNIX pipelines की utility को .NET platform के object flow concept के साथ मिलाकर modern scripting engine की blueprint पेश की थी।

</div>

</div>

## 1. Architectural Features (प्रमुख विशेषताएँ)

- **Object-Oriented Pipelines:** Outputs text data stream नहीं होते, बल्कि Structured .NET Objects होते हैं। आपको user profile या list columns filter करने के लिए `grep`, `awk`, या `sed` जैसी parsing commands की आवश्यकता नहीं होती।
- **Extensible Configuration Management (DSC):** PowerShell Desired State Configuration (DSC) के ज़रिये infrastructure as code declarative configs repeatable deployments run कर सकता है।
- **Structured Formats Support:** JSON, CSV, XML, और XML parsing structures के लिए direct native parsing functionality built-in मिलती है।

## 2. Directory Structure on Linux (लिनक्स पर डायरेक्टरी)

Linux distros पर packages install होने पर default profile और module paths इस प्रकार configure होते हैं:

**PowerShell Home:** `/opt/microsoft/powershell/7/`

**User Modules Path:** `~/.local/share/powershell/Modules`

**System Shared Modules:** `/usr/local/share/powershell/Modules`

**Profiles Configuration Scripts:**

AllUsersAllHosts: `$PSHOME/profile.ps1`

CurrentUserAllHosts: `~/.config/powershell/profile.ps1`

**Readline Command History:** `~/.local/share/powershell/PSReadLine/ConsoleHost_history.txt`

## 3. Linux Installation Scripts (लिनक्स पर इंस्टॉलेशन)

Linux distributions systems पर PowerShell 7 (Stable LTS release) install करने के repository scripts:

### ⚫ Ubuntu (using APT)

``` bash
# Update package index and install dependencies
sudo apt-get update
sudo apt-get install -y wget apt-transport-https software-properties-common

# Download the Microsoft repository GPG keys
source /etc/os-release
wget -q https://packages.microsoft.com/config/ubuntu/$VERSION_ID/packages-microsoft-prod.deb

# Register Microsoft prod source keys
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Install PowerShell 7
sudo apt-get update
sudo apt-get install -y powershell

# Start PowerShell shell
pwsh
```

### ⚫ Debian (using APT)

``` bash
sudo apt-get update
sudo apt-get install -y wget

# Fetch GPG keys package
source /etc/os-release
wget -q https://packages.microsoft.com/config/debian/$VERSION_ID/packages-microsoft-prod.deb

# Register keys
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Install PowerShell
sudo apt-get update
sudo apt-get install -y powershell
```

### ⚫ Red Hat Enterprise Linux (RHEL 8 / 9 using DNF)

``` bash
# Get major version dynamically
source /etc/os-release
if [ ${VERSION_ID%.*} -ge 8 ]; then majorver=8;
elif [ ${VERSION_ID%.*} -ge 9 ]; then majorver=9; fi

# Download and register repo keys
curl -sSL -O https://packages.microsoft.com/config/rhel/$majorver/packages-microsoft-prod.rpm
sudo rpm -i packages-microsoft-prod.rpm
rm packages-microsoft-prod.rpm

# Install packages
sudo dnf update
sudo dnf install powershell -y
```

### ⚫ Alpine Linux (musl-x64 binary tarball method)

Alpine Linux dynamically linked library features uses static package archives method:

``` bash
# Install dependencies
sudo apk add --no-cache \
    ca-certificates less ncurses-terminfo-base krb5-libs libgcc \
    libintl libssl3 libstdc++ tzdata userspace-rcu zlib icu-libs curl

# Fetch musl package
curl -L https://github.com/PowerShell/PowerShell/releases/download/v7.6.3/powershell-7.6.3-linux-musl-x64.tar.gz -o /tmp/powershell.tar.gz

# Extract to opt folder location
sudo mkdir -p /opt/microsoft/powershell/7
sudo tar zxf /tmp/powershell.tar.gz -C /opt/microsoft/powershell/7
sudo chmod +x /opt/microsoft/powershell/7/pwsh

# Symlink to bin path
sudo ln -s /opt/microsoft/powershell/7/pwsh /usr/bin/pwsh
```

## 4. Execution Policy & Unsigned Scripts (स्क्रिप्ट्स रन करने की अनुमति)

Windows पर सुरक्षा कारणों से, PowerShell डिफ़ॉल्ट रूप से केवल digitally signed scripts को ही चलाने की अनुमति देता है। लेकिन **Linux पर यह नियम भिन्न है**:

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Linux पर Execution Policy सीमाएँ (Platform Difference)

</div>

Linux और macOS पर PowerShell Core (pwsh) डिफ़ॉल्ट रूप से **Unrestricted** मोड में चलता है। Linux पर स्क्रिप्ट सिग्नेचर की जाँच नहीं होती है। यदि आप Linux पर `Set-ExecutionPolicy` चलाने की कोशिश करेंगे, तो यह निम्नलिखित एरर देगा:

``` none
Set-ExecutionPolicy: Operation is not supported on this platform.
```

</div>

</div>

आप Linux पर वर्तमान विभिन्न स्कोप्स की नीतियों को देखने के लिए निम्न कमांड चला सकते हैं (सभी डिफ़ॉल्ट रूप से Unrestricted दिखाएंगे):

``` powershell
Get-ExecutionPolicy -List
```

## 5. Aliases & Output Streams (कस्टम शार्टकट्स और आउटपुट स्ट्रीम्स)

PowerShell में एक ही काम को करने के कई तरीके होते हैं। इसे हम **Write-Host** और **Write-Output** के उदाहरण से समझ सकते हैं:

### ⚫ Write-Host vs Write-Output

- **Write-Host:** यह सीधे कंसोल (stdout/screen) पर टेक्स्ट लिखता है। इसका उपयोग केवल डिस्प्ले के लिए होता है, इसे किसी वेरिएबल में कैप्चर या पाइप नहीं किया जा सकता।
- **Write-Output:** यह स्क्रीन पर लिखने के साथ-साथ आउटपुट को \*\*Success Stream\*\* में भी भेजता है, जिससे यह पाइपलाइन या वेरिएबल असाइनमेंट के लिए उपलब्ध रहता है।

``` powershell
# Success Stream में आउटपुट भेजें और वेरिएबल में स्टोर करें
$message = Write-Output "Hello World"
$message  # "Hello World" आउटपुट करेगा (चूंकि यह स्ट्रीम में स्टोर था)

# Write-Host से वेरिएबल खाली (null) रहेगा क्योंकि आउटपुट स्ट्रीम में नहीं जाता
$messageHost = Write-Host "Hello World"
if ($messageHost -eq $null) {
    "Message is null"  # यह प्रिंट होगा!
}
```

`Write-Output` का डिफ़ॉल्ट एलियास (Alias) `Echo` या `Write` है, या फिर आप बिना किसी कमांड के केवल स्ट्रिंग लिखकर भी आउटपुट दे सकते हैं:

``` powershell
Echo 'Hello world'
Write 'Hello world'
'Hello world' # direct string evaluation
```

### ⚫ Common Cross-Platform Aliases

PowerShell विंडोज और लिनक्स के पुराने डेवलपर्स की सुविधा के लिए कई कमांड्स को पहले से ही मैप (Alias) करके रखता है। जैसे डायरेक्टरी लिस्टिंग के लिए नीचे दिए गए तीनों कमांड्स एक ही परिणाम देंगे:

``` powershell
dir            # Old Windows CMD style (PowerShell maps it internally)
ls             # Bash/Linux style
Get-ChildItem  # Native PowerShell Cmdlet
```

### ⚫ Custom Aliases बनाना (Set-Alias)

आप `Set-Alias` का उपयोग करके अपनी पसंद के शॉर्टकट्स बना सकते हैं।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Linux-specific Command Behavior

</div>

विंडोज़ पर सामान्यतः `Test-NetConnection` को "ping" एलियास दिया जाता है, लेकिन **Linux पर Test-NetConnection Cmdlet उपलब्ध नहीं होता है**। इसके अलावा, Linux पर `ping` कमांड चलाने से सीधे नेटिव लिनक्स बाइनरी `/usr/bin/ping` एग्जीक्यूट होती है।

</div>

</div>

इसलिए, Linux पर एलियास बनाने का सही प्रैक्टिकल उदाहरण निम्न प्रकार है (जहाँ `listdir` शॉर्टकट को `Get-ChildItem` पर मैप किया गया है):

``` powershell
# कस्टम एलियास 'listdir' बनाएं
Set-Alias -Name listdir -Value Get-ChildItem

# अब आप सीधे listdir टाइप करके डायरेक्टरी देख सकते हैं
listdir
```

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

सेशन का ध्यान रखें

</div>

कस्टम एलियास केवल वर्तमान सेशन के एक्टिव रहने तक ही जीवित रहता है। सेशन बंद होने पर यह डिलीट हो जाता है। इसे स्थायी बनाने के लिए आप इसे अपने `$PROFILE` स्क्रिप्ट (उदा. `~/.config/powershell/profile.ps1`) में जोड़ सकते हैं।

</div>

</div>

## 6. The Pipeline & Variable Flow (पाइपलाइन और वेरिएबल फ्लो)

PowerShell की सबसे बड़ी शक्ति इसका \*\*Pipeline (\`\|\`)\*\* है। यह टेक्स्ट के बजाय सीधे ऑब्जेक्ट्स को एक कमांड से दूसरी कमांड में भेजता है।

उदाहरण के लिए, फ़ाइलों की केवल नाम (Name) प्रॉपर्टी फ़िल्टर करना:

``` powershell
# Native Cmdlet Pipeline
Get-ChildItem | Select-Object Name

# इसका शार्टकट वर्ज़न (gci = Get-ChildItem, Select = Select-Object)
gci | Select Name
```

पाइपलाइन का उपयोग करके आप फ़ाइलों की सूची पर लूप चला सकते हैं, जहाँ `$_` या `$PSItem` वर्तमान पाइपलाइन ऑब्जेक्ट को दर्शाता है:

``` powershell
# प्रत्येक फ़ाइल को /tmp/NewDirectory/ फ़ोल्डर में कॉपी करने के लिए Foreach लूप
Get-ChildItem -File | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination "/tmp/NewDirectory/"
}

# शार्टकट रूप (Foreach-Object का एलियास % है)
gci -File | % { Copy $_.FullName "/tmp/NewDirectory/" }
```

## 7. Calling .NET Library Methods (डॉटनेट लाइब्रेरी मेथड्स)

चूँकि PowerShell पूरी तरह .NET पर आधारित है, आप इसके स्टेटिक (Static) और नॉन-स्टेटिक क्लास मेथड्स को सीधे एक्सेस कर सकते हैं।

### ⚫ Static Methods

स्टेटिक मेथड्स को क्लास को बिना इनिशियलाइज़ किए सीधे `[ClassName]::MethodName()` का उपयोग करके कॉल किया जा सकता है:

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Linux vs Windows Path Separators

</div>

Linux पर बैकस्लैश (`\`) डायरेक्टरी सेपरेटर नहीं होता, बल्कि उसे फ़ाइल नाम का हिस्सा माना जाता है। इसलिए:

- `[System.IO.Path]::GetFileName('C:\Windows\explorer.exe')` -\> Linux पर `C:\Windows\explorer.exe` ही रिटर्न करेगा।
- सही लिनक्स सिंटैक्स: `[System.IO.Path]::GetFileName('/etc/passwd')` -\> `passwd` रिटर्न करेगा।

</div>

</div>

``` powershell
# Linux फ़ाइल पाथ से फ़ाइल नाम निकालना
[System.IO.Path]::GetFileName('/etc/passwd')  # "passwd" आउटपुट करेगा
[System.IO.Path]::GetFileName('/usr/bin/pwsh')  # "pwsh" आउटपुट करेगा

# वर्तमान दिनांक और समय (DateTime Static Property)
[System.DateTime]::Now
```

### ⚫ Instance Methods (Non-Static)

नॉन-स्टेटिक मेथड्स को सीधे क्लास पर कॉल नहीं किया जा सकता (जैसे `[System.DateTime]::AddHours(15)` एरर देगा)। इसके लिए पहले ऑब्जेक्ट का एक इंस्टेंस (Instance) बनाना होगा:

``` powershell
# 1. पहले एक डेटटाइम ऑब्जेक्ट वेरिएबल में स्टोर करें
$Object = [System.DateTime]::Now

# 2. अब इंस्टेंस मेथड को ऑब्जेक्ट के ऊपर कॉल करें
$Object.AddHours(15)  # लिनक्स पर सही फॉर्मेट में नई डेट/टाइम रिटर्न करेगा
```

## 8. Commenting Code (कमेंट्स लिखने का तरीका)

PowerShell स्क्रिप्ट में कोड को समझाने या डिबग करते समय कमेंट्स करने के लिए निम्न सिंटैक्स हैं:

``` powershell
# यह एक सिंगल-लाइन कमेंट है (Single Line Comment)
Get-ChildItem

<#
यह एक मल्टी-लाइन कमेंट है (Multi-line Comment)
इसमें आप कितनी भी लाइन्स लिख सकते हैं।
#>
Get-ChildItem
```

## 9. Creating Custom Objects (कस्टम ऑब्जेक्ट्स बनाना)

डेटा स्टोर करने, एक्सपोर्ट करने या पाइपलाइन में आगे भेजने के लिए कस्टम ऑब्जेक्ट्स बनाना बेहद सामान्य है।

### ⚫ Method 1: New-Object का उपयोग करके

``` powershell
# DateTime ऑब्जेक्ट बनाना
$var = New-Object System.DateTime

# Argument List के साथ StreamReader ऑब्जेक्ट बनाना (Linux path का उपयोग करते हुए)
$sr = New-Object System.IO.StreamReader -ArgumentList "/etc/hostname"

# प्रॉपर्टीज के साथ एक खाली कस्टम ऑब्जेक्ट बनाना
$newObject = New-Object -TypeName PSObject -Property @{
    ComputerName = "SERVER1"
    Role = "Interface"
    Environment = "Production"
}
```

### ⚫ Method 2: \[PSCustomObject\] का उपयोग करके (शॉर्टकट और फ़ास्ट)

यह कस्टम ऑब्जेक्ट बनाने का सबसे छोटा, साफ़ और तेज़ तरीका माना जाता है:

``` powershell
$newObject = [PSCustomObject]@{
    ComputerName = 'SERVER1'
    Role = 'Interface'
    Environment = 'Production'
}
```

### ⚫ Method 3: Select-Object से रनटाइम पर एक्स्ट्रा प्रॉपर्टीज़ जोड़ना

यदि आपके पास पहले से कोई ऑब्जेक्ट है, and आप उसमें एक्स्ट्रा कैलकुलेटेड प्रॉपर्टीज़ जोड़ना चाहते हैं:

``` powershell
# फ़ाइलों के साथ रनटाइम पर 'DateTime' और 'CustomValue' प्रॉपर्टी जोड़ना
Get-ChildItem -File | Select-Object FullName, Name,
    @{Name='DateTime'; Expression={Get-Date}},
    @{Name='PropertyName'; Expression={'CustomValue'}}
```

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

एक महत्वपूर्ण टिप

</div>

ऑब्जेक्ट्स को CSV में सहेजने के लिए `Export-Csv` और वापस ऑब्जेक्ट बनाने के लिए `Import-Csv` का उपयोग करें। ध्यान रखें कि `Format-*` (जैसे Format-Table या Format-List) कमांड्स ऑब्जेक्ट्स को टेक्स्ट स्ट्रीम में बदल देते हैं, इसलिए इनका उपयोग डेटा प्रोसेसिंग के बिल्कुल अंत में ही करें।

</div>

</div>

## 10. Variables in PowerShell (वेरिएबल्स गाइड)

PowerShell में डेटा या वैल्यूज को स्टोर करने के लिए वेरिएबल्स का उपयोग किया जाता है। वेरिएबल के नाम हमेशा डॉलर साइन (**`$`**) से शुरू होते हैं, जैसे: `$Variable1`। वेरिएबल में टेक्स्ट (String), नंबर (Integer), ऐरे (Array), या यहाँ तक कि एडवांस .NET टाइप्स को स्टोर किया जा सकता है।

### ⚫ 10.1 Simple Variables (साधारण वेरिएबल्स)

एक साधारण वेरिएबल घोषित (declare) करने के लिए `=` ऑपरेटर का उपयोग होता है:

``` powershell
# string type value स्टोर करना
$foo = "bar"

# integer type value स्टोर करना
$count = 101
```

### ⚫ 10.2 Arrays (ऐरे डिक्लेरेशन और ऑपरेशन्स)

ऐरे घोषित करने का सिंटैक्स भी सामान्य वेरिएबल जैसा ही है, बस वैल्यूज को कॉमा (`,`) से अलग किया जाता है:

``` powershell
# इंटीजर्स का ऐरे (Array of Integers)
$myArrayOfInts = 1,2,3,4

# स्ट्रिंग्स का ऐरे (Array of Strings)
$myArrayOfStrings = "1","2","3","4"
```

#### ऐरे में नए आइटम्स जोड़ना (Adding to Array)

आप `+` ऑपरेटर का उपयोग करके ऐरे में नए आइटम्स जोड़ सकते हैं:

``` powershell
# ऐरे में 5 नंबर जोड़ना
$myArrayOfInts = $myArrayOfInts + 5  # अब ऐरे में: 1, 2, 3, 4, 5 होगा
```

#### ऐरे को आपस में जोड़ना (Combining Arrays)

दो ऐरे को आपस में मर्ज (Combine) करना भी बेहद आसान है:

``` powershell
$myArrayOfInts = 1,2,3,4
$myOtherArrayOfInts = 5,6,7

# दोनों को जोड़ना
$myArrayOfInts = $myArrayOfInts + $myOtherArrayOfInts  # अब ऐरे में: 1,2,3,4,5,6,7 होगा
```

### ⚫ 10.3 List Assignment of Multiple Variables (मल्टीपल वेरिएबल असाइनमेंट)

PowerShell में आप एक साथ कई वेरिएबल्स को एक ऐरे या लिस्ट से वैल्यू असाइन कर सकते हैं।

पुराने लंबे तरीके के बजाय:

``` powershell
$input = "foo.bar.baz"
$parts = $input.Split(".")
$foo = $parts[0]
$bar = $parts[1]
$baz = $parts[2]
```

आप सीधे एक सिंगल लाइन में असाइनमेंट कर सकते हैं:

``` powershell
# एक साथ तीन वेरिएबल्स में वैल्यू स्प्लिट करना
$foo, $bar, $baz = $input.Split(".")
```

अगर लिस्ट में वेरिएबल्स से ज़्यादा वैल्यूज़ हैं, तो आख़िरी वेरिएबल एक ऐरे बन जाता है और उसमें बची हुई सारी वैल्यूज़ स्टोर हो जाती हैं:

``` powershell
# $foo में "foo" जाएगा, और $leftover में ["bar", "baz"] का ऐरे जाएगा
$foo, $leftover = $input.Split(".")

$bar = $leftover[0]  # "bar"
$baz = $leftover[1]  # "baz"
```

### ⚫ 10.4 Scope (वेरिएबल स्कोप)

डिफ़ॉल्ट रूप से वेरिएबल अपने एंक्लोजिंग कंटेनर (जैसे फंक्शन) के अंदर लोकल रहता है। यदि कंटेनर से बाहर है, तो उसका स्कोप **Global** होता है। स्कोप को स्पेसिफाई करने के लिए `$scope:varname` सिंटैक्स का उपयोग करते हैं:

``` powershell
# ग्लोबल स्कोप में वेरिएबल
$foo = "Global Scope"

function myFunc {
    # फंक्शन (लोकल) स्कोप में वेरिएबल
    $foo = "Function (local) scope"
    
    Write-Host $global:foo  # "Global Scope" प्रिंट करेगा
    Write-Host $local:foo   # "Function (local) scope" प्रिंट करेगा
    Write-Host $foo         # "Function (local) scope" प्रिंट करेगा
}

myFunc
Write-Host $foo             # "Global Scope" प्रिंट करेगा
```

### ⚫ 10.5 Removing a Variable (वेरिएबल डिलीट करना)

मेमोरी से किसी वेरिएबल को हटाने (Delete करने) के दो प्रमुख तरीके हैं:

#### विधि 1: Remove-Item Cmdlet का उपयोग (Variable Provider)

चूँकि PowerShell वेरिएबल स्टोर को फ़ाइल सिस्टम की तरह एक प्रोवाइडर मानता है, आप `Remove-Item` का उपयोग कर सकते हैं। **ध्यान दें कि इसमें वेरिएबल के आगे `$` नहीं लगाया जाता:**

``` powershell
Remove-Item Variable:\foo
```

#### विधि 2: Remove-Variable Cmdlet (या इसका एलियास rv) का उपयोग

``` powershell
# वेरिएबल परिभाषित करें
$var = "Some Variable"

# Remove-Variable से डिलीट करें (variable name के आगे $ नहीं लगाएं)
Remove-Variable -Name var

# शार्टकट एलियास 'rv' का उपयोग
$anotherVar = "Test"
rv anotherVar
```

## 11. Operators in PowerShell (ऑपरेटर्स गाइड)

ऑपरेटर्स (Operators) वे सिम्बल या कीवर्ड्स होते हैं जो कंपाइलर/इंटरप्रेटर को गणितीय (mathematical), तुलनात्मक (comparison) या तार्किक (logical) गणनाएं करने का निर्देश देते हैं। PowerShell में सामान्य अरिथमेटिक ऑपरेटर्स के साथ-साथ कई शक्तिशाली स्पेशल ऑपरेटर्स (जैसे `-like`, `-match`, `-replace`) भी उपलब्ध हैं जो कोडिंग को आसान बनाते हैं।

### ⚫ 11.1 Comparison Operators (तुलना करने वाले ऑपरेटर्स)

PowerShell में तुलना करने वाले ऑपरेटर्स के आगे एक डैश (`-`) लगा होता है, जैसे `-eq` (equal के लिए), `-gt` (greater than के लिए) आदि।

डिफ़ॉल्ट रूप से ये ऑपरेटर्स **Case-Insensitive (अपर/लोअर केस में अंतर न करने वाले)** होते हैं। व्यवहार को बदलने के लिए आप निम्न प्रीफिक्स लगा सकते हैं:

- `i` : Case-Insensitive Explicit (उदा. `-ieq`)
- `c` : Case-Sensitive Explicit (उदा. `-ceq`)

``` powershell
# डिफ़ॉल्ट रूप से Case-Insensitive है
"a" -eq "A"   # True रिटर्न करेगा
"a" -ceq "A"  # False रिटर्न करेगा (क्योंकि यह केस सेंसिटिव है)
```

#### साधारण तुलना ऑपरेटर्स (Simple Comparison Operators)

``` powershell
2 -eq 2   # Equal to (==) -> True
2 -ne 4   # Not equal to (!=) -> True
5 -gt 2   # Greater-than (>) -> True
5 -ge 5   # Greater-than or equal to (>=) -> True
5 -lt 10  # Less-than (<) -> True
5 -le 5   # Less-than or equal to (<=) -> True
```

#### स्ट्रिंग तुलना ऑपरेटर्स (String Comparison Operators)

स्ट्रिंग्स को वाइल्डकार्ड या रेगुलर एक्सप्रेशन (Regex) के साथ मैच करने के लिए:

``` powershell
# वाइल्डकार्ड (*) का उपयोग करके मैच करें
"MyString" -like "*String"     # True रिटर्न करेगा
"MyString" -notlike "Other*"   # True रिटर्न करेगा

# रेगुलर एक्सप्रेशन (Regex) का उपयोग करके मैच करें
"MyString" -match '^My.*$'     # True रिटर्न करेगा
"MyString" -notmatch '^Other$' # True रिटर्न करेगा
```

#### कलेक्शन तुलना ऑपरेटर्स (Collection Comparison Operators)

किसी ऐरे या लिस्ट के अंदर वैल्यू खोजने के लिए:

``` powershell
# ऐरे (Left) में वैल्यू (Right) मौजूद है या नहीं
"abc", "def" -contains "def"     # True रिटर्न करेगा
"abc", "def" -notcontains "123"  # True रिटर्न करेगा

# वैल्यू (Left) ऐरे (Right) के अंदर है या नहीं
"def" -in "abc", "def"           # True रिटर्न करेगा
"123" -notin "abc", "def"        # True रिटर्न करेगा
```

### ⚫ 11.2 Arithmetic Operators (अंकगणितीय ऑपरेटर्स)

नंबरों पर गणितीय गणना करने के लिए इनका उपयोग किया जाता है:

``` powershell
1 + 2    # Addition (जोड़) -> 3
1 - 2    # Subtraction (घटाव) -> -1
-1       # ऋणात्मक मान निर्धारित करना (Negative Value)
1 * 2    # Multiplication (गुणा) -> 2
1 / 2    # Division (भाग) -> 0.5
1 % 2    # Modulus (शेषफल) -> 1
100 -shl 2  # Bitwise Shift-left -> 400
100 -shr 1  # Bitwise Shift-right -> 50
```

### ⚫ 11.3 Assignment Operators (असाइनमेंट ऑपरेटर्स)

वेरिएबल्स में वैल्यूज असाइन करने और साथ ही साथ गणना करने के लिए:

``` powershell
$var = 1    # Variable में वैल्यू असाइन करना
$var += 2   # Addition: वैल्यू को 2 बढ़ाना ($var = $var + 2)
$var -= 1   # Subtraction: वैल्यू को 1 घटाना
$var *= 2   # Multiplication: वैल्यू को 2 से गुणा करना
$var /= 2   # Division: वैल्यू को 2 से भाग देना
$var %= 2   # Modulus: 2 से भाग देकर शेषफल असाइन करना

# इनक्रीमेंट और डिक्रीमेंट (Increment & Decrement)
$var++      # वैल्यू में 1 जोड़ना ($var = $var + 1)
$var--      # वैल्यू से 1 घटाना
```

### ⚫ 11.4 Redirection Operators (रीडायरेक्शन ऑपरेटर्स)

विभिन्न आउटपुट स्ट्रीम्स (जैसे Success, Error, Warning) को फ़ाइलों या अन्य स्ट्रीम्स में रीडायरेक्ट करने के लिए:

#### 1. Success Output Stream (सफलता स्ट्रीम - 1)

``` powershell
# आउटपुट को फाइल में भेजें (फाइल ओवरराइट होगी)
Get-ChildItem > files-list.txt

# आउटपुट को फाइल के अंत में जोड़ें (Append करें)
Get-ChildItem >> files-list.txt

# सफलता (1) और एरर (2) दोनों को एरर स्ट्रीम में भेजें
Get-ChildItem 1>&2
```

#### 2. Error Output Stream (एरर स्ट्रीम - 2)

``` powershell
# एरर को फ़ाइल में ओवरराइट करके भेजें
Get-ChildItem -Path "/invalid-dir" 2> error.log

# एरर को सफलता (Success) स्ट्रीम में मर्ज करें
Get-ChildItem -Path "/invalid-dir" 2>&1
```

#### 3. अन्य महत्वपूर्ण स्ट्रीम्स (Warning-3, Verbose-4, Debug-5, Info-6)

``` powershell
cmdlet 3> warning.log  # Warning output को फ़ाइल में भेजें
cmdlet 3>&1            # Warnings को Success स्ट्रीम में भेजें
cmdlet *> all.log      # सभी 6 स्ट्रीम्स को एक फ़ाइल में भेजें (Overwriting)
cmdlet *>> all.log     # सभी 6 स्ट्रीम्स को फ़ाइल में जोड़ें (Appending)
```

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

पाइपलाइन (\`\|\`) और रीडायरेक्शन (\`\>\`) में अंतर

</div>

रीडायरेक्शन ऑपरेटर्स केवल स्ट्रीम्स को फ़ाइलों में या स्ट्रीम्स को स्ट्रीम्स में भेजते हैं। इसके विपरीत, पाइपलाइन (Pipe) ऑपरेटर पूरे के पूरे ऑब्जेक्ट्स को अगले कमांड या Cmdlet में इनपुट के रूप में भेजता है।

</div>

</div>

### ⚫ 11.5 Mixing Operand Types (मिश्रित डेटा टाइप्स और बायां ऑपरेटर व्यवहार)

PowerShell में जब आप अलग-अलग डेटा टाइप्स (जैसे String और Number) को जोड़ते या गुणा करते हैं, तो \*\*बाईं ओर (Left-side) स्थित ऑपरेंड का डेटा टाइप पूरे ऑपरेशन का व्यवहार तय करता है\*\*:

#### जोड़ (Addition) के समय:

``` powershell
# बायीं तरफ String होने पर यह टेक्स्ट जोड़ (Concatenation) करेगा:
"4" + 2  # आउटपुट: "42" (String)

# बायीं तरफ Number होने पर यह गणितीय जोड़ (Mathematical Add) करेगा:
4 + "2"  # आउटपुट: 6 (Integer)

# ऐरे में स्ट्रिंग जोड़ना:
1,2,3 + "Hello"  # आउटपुट: 1, 2, 3, "Hello" (Array)

# स्ट्रिंग में ऐरे जोड़ना (PowerShell ऐरे को स्पेस के साथ स्ट्रिंग में बदल देता है):
"Hello" + (1,2,3)  # आउटपुट: "Hello1 2 3"
```

#### गुणा (Multiplication) के समय:

``` powershell
# बायीं तरफ String होने पर यह टेक्स्ट को दोहराएगा:
"3" * 2  # आउटपुट: "33"

# बायीं तरफ Number होने पर यह सामान्य गुणा करेगा:
2 * "3"  # आउटपुट: 6

# ऐरे को गुणा करना (ऐरे को दोहराएगा):
1,2,3 * 2  # आउटपुट: 1, 2, 3, 1, 2, 3

# एरर केस (बायीं तरफ नंबर और दायीं तरफ ऐरे होने पर op_Multiply एरर आएगा):
2 * (1,2,3)  # एरर: [System.Object[]] does not contain a method named 'op_Multiply'
```

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Read-Host का गुप्त प्रभाव (Hidden Trap)

</div>

`Read-Host` से लिया गया इनपुट हमेशा एक **String** होता है। यदि आप इसकी तुलना नंबर से करेंगे, तो परिणाम गलत आ सकता है:

``` powershell
$a = Read-Host "Enter a number" # इनपुट मान 33 दें
# $a का मान "33" (String) है
$a -gt 5 # False रिटर्न करेगा (क्योंकि स्ट्रिंग "33" कैरेक्टर "5" से वर्णानुक्रम (alphabetically) में छोटा है)

# सही तरीका: इंटीजर में कास्ट करें
[int]$a -gt 5 # True रिटर्न करेगा
```

</div>

</div>

### ⚫ 11.6 Logical Operators (तार्किक ऑपरेटर्स)

मल्टीपल कंडीशंस का मूल्यांकन करने के लिए:

- `-and` : Logical AND (दोनों कंडीशंस का सच होना ज़रूरी है)
- `-or` : Logical OR (किसी एक कंडीशन का सच होना ज़रूरी है)
- `-xor` : Logical Exclusive OR (केवल एक कंडीशन सच होनी चाहिए)
- `-not` या `!` : Logical NOT (कंडीशन का उल्टा सत्य)

### ⚫ 11.7 String Manipulation Operators (स्ट्रिंग हेरफेर ऑपरेटर्स)

#### 1. Replace ऑपरेटर (-replace)

यह ऑपरेटर रेगुलर एक्सप्रेशन (Regex) का उपयोग करके टेक्स्ट को बदलता है:

``` powershell
# साधारण प्रतिस्थापन
"The rain in Seattle" -replace 'rain','hail'  # आउटपुट: "The hail in Seattle"

# Regex और कैप्चरिंग ग्रुप्स का उपयोग (Email से Domain निकालना)
# $1 पहले मैचिंग ग्रुप (.+) को दर्शाता है
"kenmyer@contoso.com" -replace '^[\w]+@(.+)', '$1'  # आउटपुट: "contoso.com"
```

#### 2. Split और Join ऑपरेटर्स (-split और -join)

स्ट्रिंग को ऐरे में तोड़ने और ऐरे को वापस स्ट्रिंग में जोड़ने के लिए:

``` powershell
# -split ऑपरेटर (स्पेस के आधार पर ऐरे में बदलना)
"A B C" -split " "  # आउटपुट: @("A", "B", "C") ऐरे

# -join ऑपरेटर (कोलन ":" के साथ जोड़ना)
"E","F","G" -join ":"  # आउटपुट: "E:F:G" स्ट्रिंग
```

## 12. Special Operators in PowerShell (विशेष ऑपरेटर्स)

PowerShell में कुछ विशेष ऑपरेटर्स (Special Operators) होते हैं जो एक्सेक्यूशन फ्लो (execution flow) को कंट्रोल करने और डेटा का स्वरूप बदलने में मदद करते हैं:

### ⚫ 12.1 Array Expression Operator (ऐरे एक्सप्रेशन ऑपरेटर - \`@(...)\`)

यह ऑपरेटर किसी भी एक्सप्रेशन के आउटपुट को जबरन (forcefully) एक ऐरे (Array) के रूप में रिटर्न करता है, भले ही उसमें 0 या केवल 1 आइटम हो।

यदि हम सामान्य रूप से लिनक्स की किसी सिंगल फ़ाइल की जानकारी प्राप्त करें, तो वह एक सिंगल ऑब्जेक्ट रिटर्न करता है:

``` powershell
# यह System.IO.FileInfo ऑब्जेक्ट रिटर्न करेगा
$file = Get-ChildItem /etc/passwd
$file.GetType().FullName  # आउटपुट: System.IO.FileInfo
```

लेकिन यदि हम इसे `@(...)` से रैप (wrap) कर दें, तो यह ऐरे बन जाता है:

``` powershell
# यह System.Object[] (Array) रिटर्न करेगा भले ही इसमें केवल 1 आइटम हो
$fileArray = @(Get-ChildItem /etc/passwd)
$fileArray.GetType().FullName  # आउटपुट: System.Object[] (Array)
$fileArray.Count               # आउटपुट: 1
```

यदि किसी डायरेक्टरी में कई आइटम्स हैं, तो यह सामान्य रूप से सभी का ऐरे रिटर्न करता है:

``` powershell
# डायरेक्टरी की सभी फ़ाइलों का ऐरे रिटर्न करेगा
$dirArray = @(Get-ChildItem /etc)
```

### ⚫ 12.2 Call Operator (कॉल ऑपरेटर - \`&\`)

यदि किसी वेरिएबल में कोई कमांड नाम, पाथ, या स्क्रिप्ट ब्लॉक (Script block) स्ट्रिंग के रूप में स्टोर है, तो उसे निष्पादित (execute) करने के लिए `&` ऑपरेटर का उपयोग किया जाता है:

``` powershell
# स्ट्रिंग वेरिएबल में कमांड नाम स्टोर करें
$command = 'Get-ChildItem'

# & ऑपरेटर का उपयोग करके इसे रन करें
& $command -Path /etc/hosts  # यह /etc/hosts फ़ाइल की जानकारी दिखाएगा
```

### ⚫ 12.3 Dot Sourcing Operator (डॉट सोर्सिंग ऑपरेटर - \`.\`)

यह ऑपरेटर किसी स्क्रिप्ट फ़ाइल को वर्तमान स्कोप (Current Scope) में रन करता है। इसका मतलब है कि स्क्रिप्ट के अंदर घोषित किए गए सभी वेरिएबल्स और फंक्शन्स रन होने के बाद भी आपके वर्तमान कंसोल सेशन में उपयोग के लिए उपलब्ध रहते हैं।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Linux Path Syntax

</div>

विंडोज़ पर सामान्यतः बैकस्लैश का उपयोग करके `. .\myScript.ps1` लिखा जाता है, लेकिन **Linux पर फॉरवर्ड स्लैश का उपयोग करके `. ./myScript.ps1` लिखा जाना चाहिए।** ध्यान रहे कि पहले डॉट (`.`) और `./` के बीच एक **स्पेस** होना आवश्यक है।

</div>

</div>

``` powershell
# myScript.ps1 को वर्तमान कंसोल स्कोप में रन करें
. ./myScript.ps1
```

## 13. Basic Set Operations (कलेक्शन और सेट ऑपरेशन्स)

PowerShell में किसी ऐरे या कलेक्शन के ऊपर अलग-अलग ऑपरेशन्स जैसे फ़िल्टरिंग, सॉर्टिंग, ग्रुपिंग और प्रोजेक्टिंग करना बेहद आसान है। इन सभी ऑपरेशन्स को \*\*Set Operations\*\* कहा जाता है:

### ⚫ 13.1 Filtering (फ़िल्टरिंग: Where-Object / where / ?)

किसी भी कलेक्शन को दी गई कंडीशन के आधार पर फ़िल्टर करने के लिए `Where-Object` का उपयोग किया जाता है। इसके तीन समानार्थी (Synonyms) शब्द हैं:

- `Where-Object` (पूर्ण नाम)
- `where` (एलियास)
- `?` (शॉर्टकट एलियास)

``` powershell
# नाम की एक लिस्ट
$names = @("Aaron", "Albert", "Alphonse", "Bernie", "Charlie", "Danny", "Ernie", "Frank")

# केवल वे नाम फ़िल्टर करें जो "A" से शुरू होते हैं (तीनों तरीके एक ही रिज़ल्ट देंगे)
$names | Where-Object { $_ -like "A*" }
$names | where { $_ -like "A*" }
$names | ? { $_ -like "A*" }

# आउटपुट:
# Aaron
# Albert
# Alphonse
```

### ⚫ 13.2 Ordering (सॉर्टिंग: Sort-Object / sort)

कलेक्शन के आइटम्स को बढ़ते (Ascending) या घटते (Descending) क्रम में सॉर्ट करने के लिए `Sort-Object` (शॉर्टकट: `sort`) का उपयोग किया जाता है:

``` powershell
$names = @("Aaron", "Aaron", "Bernie", "Charlie", "Danny")

# डिफ़ॉल्ट रूप से Ascending (बढ़ता क्रम) सॉर्ट होगा:
$names | Sort-Object
$names | sort
# आउटपुट: Aaron, Aaron, Bernie, Charlie, Danny

# Descending (घटता क्रम) में सॉर्ट करने के लिए:
$names | Sort-Object -Descending
$names | sort -Descending
# आउटपुट: Danny, Charlie, Bernie, Aaron, Aaron

# किसी कस्टम एक्सप्रेशन के आधार पर सॉर्ट करना (जैसे अक्षरों की लंबाई/Length के आधार पर):
$names | Sort-Object { $_.Length }
# आउटपुट: Aaron, Aaron, Danny, Bernie, Charlie (छोटे शब्दों से बड़े शब्दों की ओर)
```

### ⚫ 13.3 Grouping (ग्रुपिंग: Group-Object / group)

कलेक्शन के आइटम्स को किसी विशिष्ट गुण (Property) या एक्सप्रेशन के आधार पर अलग-अलग ग्रुप्स में विभाजित करने के लिए `Group-Object` (शॉर्टकट: `group`) का उपयोग किया जाता है।

उदाहरण के लिए, अक्षरों की लम्बाई (Length) के आधार पर नाम लिस्ट को ग्रुप करना:

``` powershell
$names = @("Aaron", "Albert", "Alphonse", "Bernie", "Charlie", "Danny", "Ernie", "Frank")

$names | Group-Object -Property Length

# आउटपुट रिस्पॉन्स:
# Count Name                      Group
# ----- ----                      -----
#     4 5                         {Aaron, Danny, Ernie, Frank}
#     2 6                         {Albert, Bernie}
#     1 7                         {Charlie}
#     1 8                         {Alphonse}
```

### ⚫ 13.4 Projecting (प्रोजेक्टिंग: Select-Object / select)

प्रोजेक्टिंग का मतलब है किसी ऑब्जेक्ट में से केवल चुनिंदा प्रॉपर्टीज़ (जैसे फ़ाइल का केवल नाम और पाथ) को एक्सट्रैक्ट करना या नई कस्टम प्रॉपर्टीज़ की गणना करना। इसके लिए `Select-Object` (शॉर्टकट: `select`) का उपयोग किया जाता है।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Linux-specific Object Properties

</div>

विंडोज़ पर फ़ाइलों में `Attributes` जैसी प्रॉपर्टीज़ होती हैं, लेकिन **Linux पर फ़ाइल ऑब्जेक्ट्स में Unix-specific प्रॉपर्टीज़** (जैसे `UnixMode`, `User`, `Group`, `Size`, `UnixFileMode`) मौजूद होती हैं।

</div>

</div>

लिनक्स डायरेक्टरी की फाइलों से केवल विशिष्ट प्रॉपर्टीज फ़िल्टर करना:

``` powershell
# लिनक्स पर फ़ाइलों की सूची लें
$dir = Get-ChildItem "/etc" | Select-Object -First 3

# केवल Name, FullName, और UnixMode प्रॉपर्टीज को प्रोजेक्ट करें
$dir | Select-Object Name, FullName, UnixMode

# आउटपुट रिज़ल्ट:
# Name      FullName     UnixMode
# ----      --------     --------
# abrt      /etc/abrt    drwxr-xr-x
# adjtime   /etc/adjtime -rw-r--r--
# aliases   /etc/aliases -rw-r--r--
```

किसी फ़ाइल ऑब्जेक्ट की पहली एंट्री लेकर उसकी **सभी प्रॉपर्टीज़ (All Properties)** को लिस्ट के रूप में देखना (जिसमें Linux-specific प्रॉपर्टीज़ भी शामिल होंगी):

``` powershell
Get-ChildItem "/etc" | Select-Object -First 1 *

# आउटपुट:
# PSPath              : Microsoft.PowerShell.Core\FileSystem::/etc/abrt
# PSIsContainer       : True
# UnixMode            : drwxr-xr-x
# User                : root
# Group               : root
# Size                : 126
# Exists              : True
# FullName            : /etc/abrt
# UnixFileMode        : UserRead, UserWrite, UserExecute, GroupRead, GroupExecute...
# Attributes          : ReadOnly, Directory
```

## 14. Conditional Logic (शर्त और निर्णय निर्धारण)

अन्य प्रोग्रामिंग भाषाओं की तरह, PowerShell भी कोड के निर्णय प्रवाह (Decision Flow) को नियंत्रित करने के लिए विभिन्न कंडीशनल स्टेटमेंट्स (जैसे `if`, `else`, और `elseif`) का समर्थन करता है।

### ⚫ 14.1 if, else, और elseif

यदि `if((कंडीशन))` सच होती है, तो कर्ली ब्रैकेट्स `{...}` के अंदर का कोड निष्पादित होता है।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

समानता जाँच सिंटैक्स (Equality Operator)

</div>

ध्यान रखें कि PowerShell में समानता जांचने के लिए `=` या `==` का उपयोग नहीं किया जाता। यहाँ **`-eq` (Equality Cmdlet)** का उपयोग करना अनिवार्य है।

</div>

</div>

``` powershell
# 1. साधारण if स्टेटमेंट
$test = "test"
if ($test -eq "test") {
    Write-Host "if condition met"  # यह प्रिंट होगा
}

# 2. if-else स्टेटमेंट (यदि कंडीशन पूरी नहीं होती)
if ($test -eq "test2") {
    Write-Host "if condition met"
} else {
    Write-Host "if condition not met"  # यह प्रिंट होगा
}

# 3. if-elseif-else स्टेटमेंट
if ($test -eq "test2") {
    Write-Host "if condition met"
} elseif ($test -eq "test") {
    Write-Host "ifelse condition met"  # यह प्रिंट होगा
} else {
    Write-Host "no conditions met"
}
```

### ⚫ 14.2 Negation (शर्त को नकारना)

कई बार हम चाहते हैं कि ब्लॉक तब चले जब कंडीशन \*\*गलत (False)\*\* हो। इसके लिए निम्न विधियों का उपयोग होता है:

#### विधि 1: -not ऑपरेटर का उपयोग करके

``` powershell
$test = "test"
if (-not ($test -eq "test2")) {
    Write-Host "if condition not met"  # यह प्रिंट होगा
}
```

#### विधि 2: ! सिम्बल (Logical NOT) का उपयोग करके

``` powershell
# ! का उपयोग कर पूरे एक्सप्रेशन को इनवर्ट करें
if (!($test -eq "test2")) {
    Write-Host "if condition not met"  # यह प्रिंट होगा
}
```

#### विधि 3: -ne (Not Equal) ऑपरेटर का उपयोग करके

यह सबसे सरल और पठनीय (readable) तरीका है:

``` powershell
if ($test -ne "test2") {
    Write-Host "variable test is not equal to 'test2'"  # यह प्रिंट होगा
}
```

### ⚫ 14.3 If Conditional Shorthand (शार्टहैंड मूल्यांकन)

PowerShell में आप सीधे किसी ऑब्जेक्ट या स्ट्रिंग को `if` कंडीशन में रख सकते हैं। PowerShell इसे बूलियन वैल्यू की तरह इवैल्यूएट करता है:

- **खाली स्ट्रिंग (\`""\`)**, **\`0\`**, और **\`\$null\`** हमेशा **False** में इवैल्यूएट होते हैं।
- **गैर-शून्य लंबाई वाली स्ट्रिंग** या **ऑब्जेक्ट** हमेशा **True** इवैल्यूएट होते हैं।

``` powershell
$boolean = $false
$string = "false"     # यह एक नॉन-एम्प्टी स्ट्रिंग है
$emptyString = ""     # शून्य-लंबाई वाली स्ट्रिंग
$nullVar = $null      # नल ऑब्जेक्ट

if ($boolean) {
    # यह रन नहीं होगा क्योंकि वैल्यू $false है
    Write-Host "Boolean false"
}

if ($string) {
    # यह रन होगा! क्योंकि "false" एक स्ट्रिंग ऑब्जेक्ट है जिसकी लेंथ 0 से अधिक है
    Write-Host "string exists and evaluates to true"
}

if ($emptyString) {
    # यह रन नहीं होगा क्योंकि स्ट्रिंग खाली (zero-length) है
    Write-Host "Empty string"
}

if ($nullVar) {
    # यह रन नहीं होगा क्योंकि वेरिएबल की वैल्यू $null है
    Write-Host "Null check"
}
```

## 15. Loops in PowerShell (लूप्स गाइड)

लूप (Loop) निर्देशों का एक समूह होता है जो किसी विशिष्ट शर्त (condition) के पूरे होने तक लगातार दोहराया जाता है। किसी कोड ब्लॉक को बार-बार दोहराना प्रोग्रामिंग का एक बुनियादी लेकिन महत्वपूर्ण हिस्सा है।

### ⚫ 15.1 Foreach (लूप कीवर्ड)

ध्यान रखें कि PowerShell में \*\*Foreach\*\* शब्द के दो अर्थ होते हैं: एक तो `foreach` स्टेटमेंट (लूप कीवर्ड) और दूसरा `ForEach-Object` Cmdlet का एलियास। यहाँ हम `foreach` कीवर्ड लूप के बारे में बात कर रहे हैं:

``` powershell
# 1. ऐरे के आइटम्स को लूप में प्रिंट करना
$Names = @('Amy', 'Bob', 'Celine', 'David')
ForEach ($Name in $Names) {
    Write-Host "Hi, my name is $Name!"
}

# 2. Foreach लूप का आउटपुट सीधे वेरिएबल में कैप्चर करना
$Numbers = ForEach ($Number in 1..20) {
    $Number  # या Write-Output $Number
}

# 3. लूप के अंदर पहले से बने ऐरे में डेटा जोड़ना
$Numbers = @()
ForEach ($Number in 1..20) {
    $Numbers += $Number
}
```

### ⚫ 15.2 For (फ़ॉर लूप)

यदि आप किसी ऐरे के एक विशिष्ट इंडेक्स रेंज पर लूप चलाना चाहते हैं, तो `for` लूप सबसे बेहतर है:

``` powershell
for ($i = 0; $i -le 5; $i++) {
    "$i"  # 0 से 5 तक नंबर्स प्रिंट करेगा
}
```

### ⚫ 15.3 ForEach() Method (ऑब्जेक्ट ऐरे मेथड)

PowerShell 4.0+ से आप सीधे किसी ऑब्जेक्ट ऐरे के ऊपर `.ForEach()` मेथड कॉल कर सकते हैं (यह पाइपलाइन से कहीं अधिक तेज़ होता है):

``` powershell
# 1 से 10 तक संख्याओं का वर्ग (Square) निकालना (दोनों तरीके सही हैं):
(1..10).ForEach({ $_ * $_ })
(1..10).ForEach{ $_ * $_ }

# आउटपुट: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100
```

### ⚫ 15.4 ForEach-Object (पाइपलाइन आधारित लूप)

`ForEach-Object` पाइपलाइन से आने वाले इनपुट ऑब्जेक्ट्स पर लूप चलाने के लिए बना है। इसके डिफ़ॉल्ट एलियास `foreach` और `%` (शॉर्टकट) हैं:

``` powershell
# पाइपलाइन के ज़रिए नामों को लूप करना
$names = @("Amy", "Bob", "Celine", "David")
$names | ForEach-Object { "Hi, my name is $_!" }

# % (शॉर्टकट एलियास) का उपयोग करके (यह सबसे ज्यादा लोकप्रिय है):
$names | % { "Hi, my name is $_!" }
```

#### एडवांस उपयोग (-Begin, -Process, -End)

पाइपलाइन आधारित होने के कारण, इसमें आप तीन ब्लॉक घोषित कर सकते हैं जो लूप की विभिन्न स्थितियों पर काम करते हैं:

- **-Begin:** लूप शुरू होने से पहले केवल एक बार चलता है (उदा. डेटाबेस या कनेक्शन खोलने के लिए)।
- **-Process:** पाइपलाइन से आने वाले प्रत्येक आइटम के लिए चलता है (यह मुख्य लूप है)।
- **-End:** सभी आइटम्स प्रोसेस होने के बाद अंत में केवल एक बार चलता है (उदा. कनेक्शन बंद करने या रिपोर्ट बनाने के लिए)।

``` powershell
"Amy", "Bob", "Celine", "David" | ForEach-Object -Begin {
    $results = @()  # ऐरे को इनिशियलाइज़ करें
} -Process {
    $results += "Hi, my name is $_!"  # प्रत्येक आइटम को जोड़ें
} -End {
    Write-Host "Total messages: $($results.Count)"
    $results  # अंत में सारा आउटपुट रिटर्न करें
}
```

### ⚫ 15.5 Continue और Break

#### Continue ऑपरेटर (स्किप करना)

यह वर्तमान इटरेशन को स्किप करके लूप के सबसे ऊपर चला जाता है।

``` powershell
$i = 0
while ($i -lt 10) {
    $i++
    if ($i -eq 7) { continue }  # 7 होने पर आगे का कोड स्किप करें
    Write-Host $i
}
# आउटपुट: 1 से 10 तक संख्याएं प्रिंट होंगी लेकिन 7 नहीं दिखेगा
```

*नोट: पाइपलाइन लूप (ForEach-Object) के अंदर `continue` की जगह `return` का उपयोग करना चाहिए।*

#### Break ऑपरेटर (बाहर निकलना)

यह किसी भी लूप से तुरंत बाहर निकल जाता है।

``` powershell
$i = 0
while ($i -lt 10) {
    $i++
    if ($i -eq 7) { break }  # 7 होने पर लूप से बाहर निकलें
    Write-Host $i
}
# आउटपुट: केवल 1 से 6 तक प्रिंट करेगा
```

#### Break Labels (लेबल ब्रेक)

यदि आपके पास नेस्टेड लूप्स (nested loops) हैं, तो आप लेबल का उपयोग करके सीधे बाहरी लूप को ब्रेक कर सकते हैं:

``` powershell
$i = 0
:mainLoop While ($i -lt 15) {
    $j = 0
    While ($j -lt 15) {
        $k = $i * $j
        if ($k -gt 100) {
            break mainLoop  # सीधे मुख्य लूप (mainLoop) से बाहर निकल जाएगा
        }
        $j++
    }
    $i++
}
```

### ⚫ 15.6 While (व्हाइल लूप)

यह लूप तब तक चलता है जब तक दी गई शर्त (condition) सत्य (true) रहती है।

``` powershell
# 10 से 0 तक उलटी गिनती (Countdown)
$i = 10
while ($i -ge 0) {
    $i
    $i--
}
```

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Linux-specific Process Monitor Example

</div>

विंडोज़ गाइड में `notepad.exe` को मॉनिटर करने का उदाहरण दिया जाता है, लेकिन **Linux पर हम `sleep` जैसी प्रक्रिया (Process) को मॉनिटर करते हैं**।

</div>

</div>

लिनक्स पर किसी बैकग्राउंड प्रोसेस को मॉनिटर करने का व्यावहारिक उदाहरण:

``` powershell
# 2 सेकंड के लिए बैकग्राउंड में लिनक्स 'sleep' प्रोसेस शुरू करें
Start-Process sleep -ArgumentList "2" -NoNewWindow

# जब तक sleep प्रोसेस एक्टिव है, तब तक शेल को स्लीप रखें
while (Get-Process sleep -ErrorAction SilentlyContinue) {
    Write-Host "Process is still running..."
    Start-Sleep -Milliseconds 500
}
```

### ⚫ 15.7 Do-While और Do-Until

ये लूप हमेशा अपने कोड ब्लॉक को \*\*कम से कम एक बार जरूर चलाते हैं\*\*, क्योंकि शर्त की जाँच ब्लॉक के निष्पादित होने के बाद होती है।

- **Do-While:** जब तक कंडीशन True है, तब तक लूप चलता है।
- **Do-Until:** जब तक कंडीशन True नहीं हो जाती (अर्थात जब तक False है), तब तक लूप चलता है।

``` powershell
# 1. Do-While लूप
$i = 0
Do {
    $i++
    "Number $i"
} while ($i -ne 3)  # आउटपुट: Number 1, Number 2, Number 3

# 2. Do-Until लूप (विपरीत व्यवहार)
$i = 0
Do {
    $i++
    "Number $i"
} until ($i -eq 3)  # आउटपुट: Number 1, Number 2, Number 3
```

## 16. Switch Statement (कंडीशनल स्विच स्टेटमेंट)

स्विच स्टेटमेंट (Switch Statement) किसी वेरिएबल या मान की तुलना कई पूर्व-निर्धारित शर्तों (cases) से करने का एक साफ़ और पठनीय तरीका है। यह कई सारे `if-elseif` स्टेटमेंट्स का एक बेहतरीन विकल्प है।

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

PowerShell Switch का डिफ़ॉल्ट व्यवहार (Fall-through)

</div>

अन्य प्रोग्रामिंग भाषाओं के विपरीत, PowerShell में स्विच स्टेटमेंट मैच मिलने के बाद रुकता नहीं है, बल्कि वह **सभी शर्तों की तुलना करता है**। यदि एक से अधिक शर्ते सत्य हैं, तो वह सभी के कोड ब्लॉक चलाएगा, जब तक कि आप `break` का उपयोग न करें।

</div>

</div>

### ⚫ 16.1 Simple Switch (साधारण स्विच)

यह डिफ़ॉल्ट रूप से Case-Insensitive (केस-सेंसिटिव नहीं) होता है:

``` powershell
$myValue = 'Second Condition'

switch ($myValue) {
    'First Condition'  { 'First Action' }
    'Second Condition' { 'Second Action' }  # यह प्रिंट होगा
}
```

### ⚫ 16.2 Switch with -CaseSensitive Parameter (केस-सेंसिटिव मिलान)

यदि आप चाहते हैं कि स्विच लोअरकेस और अपरकेस में अंतर करे, तो `-CaseSensitive` पैरामीटर का उपयोग करें:

``` powershell
switch -CaseSensitive ('Condition') {
    'condition' { 'First Action' }
    'Condition' { 'Second Action' }  # केवल यह प्रिंट होगा
    'conditioN' { 'Third Action' }
}
```

### ⚫ 16.3 Switch with -Wildcard Parameter (वाइल्डकार्ड मिलान)

यह `*`, `?`, और `[...]` जैसे वाइल्डकार्ड पैटर्न के साथ मिलान करने की अनुमति देता है:

``` powershell
switch -Wildcard ('Condition') {
    'Condition'        { 'Normal match' }              # प्रिंट होगा
    'Condit*'          { 'Zero or more characters' }   # प्रिंट होगा
    'C[aoc]ndit[f-l]on' { 'Range and set of chars' }   # प्रिंट होगा
    'C?ndition'        { 'Single character wildcard' } # प्रिंट होगा
    'Test*'            { 'No match' }
}
```

### ⚫ 16.4 Switch with -File Parameter (फाइल इनपुट मूल्यांकन)

यह पैरामीटर सीधे किसी फाइल से इनपुट प्राप्त करता है और उसकी प्रत्येक लाइन को व्यक्तिगत रूप से स्विच में इवैल्यूएट करता है।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Linux File Path Syntax

</div>

लिनक्स पर विंडोज़ ड्राइव पाथ्स की जगह लिनक्स के स्टैंडर्ड पाथ्स (उदा. `/tmp/input.txt`) का उपयोग किया जाना चाहिए।

</div>

</div>

``` powershell
# मान लें कि /tmp/input.txt में दो लाइन्स हैं:
# condition
# test

switch -File "/tmp/input.txt" {
    'condition' { 'First Action' }   # "condition" लाइन के लिए प्रिंट होगा
    'test'      { 'Second Action' }  # "test" लाइन के लिए प्रिंट होगा
    'fail'      { 'Third Action' }
}
```

### ⚫ 16.5 Simple Switch with Default Condition (डिफ़ॉल्ट क्रिया)

यदि कोई भी केस मैच नहीं होता, तो `Default` ब्लॉक निष्पादित होता है:

``` powershell
switch ('UnknownValue') {
    'Skip Condition' { 'First Action' }
    Default          { 'Default Action' }  # यह प्रिंट होगा
}
```

### ⚫ 16.6 Switch with -Regex Parameter (रेगुलर एक्सप्रेशन मिलान)

यह रेगुलर एक्सप्रेशन (Regex) के पैटर्न के आधार पर मिलान करने की अनुमति देता है:

``` powershell
switch -Regex ('Condition') {
    'Con\D+ion'    { 'One or more non-digits' }            # प्रिंट होगा
    'Conditio*$'   { 'Zero or more "o" at the end' }      # प्रिंट होगा
    'C.ndition'    { 'Any single character' }              # प्रिंट होगा
    '^C\w+ition$'  { 'Anchors and word characters' }      # प्रिंट होगा
    'Test'         { 'No match' }
}
```

### ⚫ 16.7 Simple Switch with Break (ब्रेक का उपयोग)

डिफ़ॉल्ट फॉल-थ्रू व्यवहार को रोकने के लिए आप `break` का उपयोग कर सकते हैं। यह मैच मिलते ही स्विच से बाहर निकल जाता है:

``` powershell
switch ('Condition') {
    'Condition' { 
        'First Action'   # प्रिंट होगा
    }
    'Condition' { 
        'Second Action'  # प्रिंट होगा
        break            # यहीं से स्विच बाहर निकल जाएगा
    }
    'Condition' { 
        'Third Action'   # यह इवैल्यूएट नहीं होगा
    }
}
```

### ⚫ 16.8 Switch with -Exact Parameter (सटीक मिलान)

`-Exact` पैरामीटर सुनिश्चित करता है कि स्ट्रिंग का सटीक, केस-इनसेंसिटिव मिलान हो (इसमें वाइल्डकार्ड या Regex सिम्बल्स साधारण टेक्स्ट की तरह ट्रीट होते हैं):

``` powershell
switch -Exact ('Condition') {
    'condition'  { 'First Action' }   # प्रिंट होगा (क्योंकि केस-इनसेंसिटिव है)
    'Condition'  { 'Second Action' }  # प्रिंट होगा
    'Conditio*'  { 'Fifth Action' }   # प्रिंट नहीं होगा (चूंकि * को वाइल्डकार्ड नहीं माना गया)
}
```

### ⚫ 16.9 Switch with Expressions (कस्टम एक्सप्रेशन्स मिलान)

स्विच कंडीशंस में आप सीधे बूलियन या गणितीय एक्सप्रेशन्स भी रख सकते हैं (जहाँ `$_` वर्तमान इनपुट वैल्यू को दर्शाता है):

``` powershell
$myInput = 0
switch ($myInput) {
    (2+2) { 'True. 2+2 = 4' }                  # 0 != 4 (रन नहीं होगा)
    (2-2) { 'True. 2-2 = 0' }                  # 0 == 0 (रन होगा)
    { $_ -gt -1 -and $_ -lt 1 } { 'Value is 0' } # बूलियन True (रन होगा)
}
```

## 17. Strings in PowerShell (स्ट्रिंग्स गाइड)

PowerShell में स्ट्रिंग (String) टेक्स्ट डेटा को स्टोर और मैनिपुलेट करने का प्राथमिक माध्यम है। यहाँ स्ट्रिंग्स बनाने और उनके साथ काम करने के विभिन्न तरीके दिए गए हैं:

### ⚫ 17.1 Multiline String (बहु-पंक्ति स्ट्रिंग)

PowerShell में कई लाइन्स की स्ट्रिंग्स बनाने के कई तरीके हैं:

#### विधि 1: एस्केप कैरेक्टर्स या NewLine वेरिएबल का उपयोग

``` powershell
# 1. बैक टिक और n (`n) का उपयोग करके (यह केवल डबल-कोटेड स्ट्रिंग्स में काम करता है)
"Hello`nWorld"

# 2. .NET [environment]::NewLine का उपयोग करके
"Hello{0}World" -f [environment]::NewLine
```

#### विधि 2: सीधे कोट बंद करने से पहले न्यूलाइन एंटर करना

``` powershell
"Hello
World"
```

#### विधि 3: Here-String (सबसे लोकप्रिय और साफ तरीका)

``` powershell
@"
Hello
World
"@
```

### ⚫ 17.2 Here-String (हीर-स्ट्रिंग्स)

हीर-स्ट्रिंग का सबसे बड़ा फ़ायदा यह है कि इसमें आपको डबल या सिंगल कोट्स को एस्केप (जैसे `` `" ``) करने की आवश्यकता नहीं होती।

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Here-String सिंटैक्स नियम

</div>

हीर-स्ट्रिंग की शुरुआत `@"` या `@'` के तुरंत बाद एक line break से होनी चाहिए, और इसका अंत `"@` या `'@` से होना चाहिए। अंत वाला टैग लाइन की बिल्कुल शुरुआत में होना चाहिए (यहाँ तक कि स्पेस या टैब भी नहीं होना चाहिए)।

</div>

</div>

#### विस्तार करने योग्य (Expandable) Here-String:

डबल कोट्स `@" ... "@` के साथ वेरिएबल्स और सब-एक्सप्रेशन्स इवैल्यूएट (expand) हो जाते हैं:

``` powershell
@"
Simple Multiline String
Current Date is: $(Get-Date)
"@
```

#### शाब्दिक (Literal) Here-String:

सिंगल कोट्स `@' ... '@` के साथ कोई वेरिएबल या एक्सप्रेशन एक्सपैंड नहीं होता, वे वैसे के वैसे ही दिखते हैं:

``` powershell
@'
This will not expand:
$(Get-Date)
because this is a literal here-string.
'@
```

### ⚫ 17.3 Concatenating Strings (स्ट्रिंग्स को आपस में जोड़ना)

#### 1. वेरिएबल इंटरपोलेशन (String Interpolation)

डबल-कोटेड स्ट्रिंग के अंदर सीधे वेरिएबल का नाम लिख देने से वैल्यू जुड़ जाती है (यह केवल वेरिएबल्स पर काम करता है, प्रॉपर्टीज़ पर नहीं):

``` powershell
$string1 = "Power"
$string2 = "Shell"
"Greetings from $string1$string2" # आउटपुट: Greetings from PowerShell
```

#### 2. \`+\` ऑपरेटर का उपयोग करके

यह तरीका ऑब्जेक्ट्स की प्रॉपर्टीज़ को जोड़ने के लिए भी काम करता है:

``` powershell
$string1 = "Greetings from"
$string2 = "PowerShell"
$string1 + " " + $string2

# ऑब्जेक्ट प्रॉपर्टी के साथ जोड़ना
"The title of this console is '" + $host.Name + "'"
```

#### 3. सब-एक्सप्रेशन्स \`\$()\` का उपयोग करके

स्ट्रिंग के अंदर ही किसी ऑब्जेक्ट की प्रॉपर्टी या मेथड को एक्सेस करने के लिए `$()` का उपयोग होता है:

``` powershell
"Tomorrow is $((Get-Date).AddDays(1).DayOfWeek)"
```

### ⚫ 17.4 Special Characters (एस्केप कैरेक्टर्स)

डबल-कोटेड स्ट्रिंग्स में बैक टिक (**`` ` ``**) एस्केप कैरेक्टर की तरह काम करता है:

- `` `0 `` : Null मान
- `` `a `` : अलर्ट/बीप साउंड
- `` `b `` : बैकस्पेस (Backspace)
- `` `n `` : नई लाइन (Newline)
- `` `r `` : कैरिज रिटर्न (Carriage return)
- `` `t `` : हॉरिजॉन्टल टैब (Tab)

``` powershell
"This`tuses`ttab`nThis is on a second line"
```

यदि आप किसी ऑपरेटर या कैरेक्टर को साधारण टेक्स्ट की तरह प्रिंट करना चाहते हैं:

``` powershell
`$ # $ को साधारण टेक्स्ट बनाएगा
`` # बैक टिक को साधारण टेक्स्ट बनाएगा
`" # डबल-कोट को साधारण टेक्स्ट बनाएगा
```

### ⚫ 17.5 Double vs Single Quotes (डबल बनाम सिंगल कोट्स)

- **डबल कोट्स (\`"..."\`):** ये वेरिएबल्स और स्पेशल कैरेक्टर्स (जैसे \`n) का मूल्यांकन (evaluation) करते हैं।
- **सिंगल कोट्स (\`'...'\`):** ये शुद्ध शाब्दिक (literal) होते हैं। इनमें लिखे वेरिएबल्स या \`n जैसे कैरेक्टर्स का मूल्यांकन नहीं होता।

``` powershell
# सिंगल कोट्स के अंदर सिंगल कोट एस्केप करने के लिए दो बार सिंगल कोट लिखें:
$myLiteralString = 'Simple string with ''single quotes'' and "double quotes".'
```

### ⚫ 17.6 Format Operator (फॉर्मेट ऑपरेटर - \`-f\`)

यह .NET फॉर्मेटिंग का उपयोग करके स्ट्रिंग बनाने का एक शक्तिशाली और साफ तरीका है:

``` powershell
$hash = @{ city = 'Berlin' }
$result = 'You should really visit {0}' -f $hash.city  # "You should really visit Berlin"
```

## 18. HashTables in PowerShell (हैश टेबल्स)

हैश टेबल (Hash Table या Dictionary) एक डेटा स्ट्रक्चर है जो \*\*की-वैल्यू (Key-Value) पेयर्स\*\* को मैप करने के लिए उपयोग किया जाता है।

### ⚫ 18.1 Creating a Hash Table (हैश टेबल बनाना)

``` powershell
# 1. खाली हैश टेबल बनाना
$hashTable = @{}

# 2. डेटा के साथ हैश टेबल बनाना
$hashTable = @{
    Name1 = 'Value1'
    Name2 = 'Value2'
    Name3 = 'Value3'
}
```

### ⚫ 18.2 Accessing Values (वैल्यू एक्सेस करना)

हैश टेबल से वैल्यू निकालने के दो तरीके हैं:

``` powershell
# सामान्य डॉट सिंटैक्स
$hashTable.Name1  # "Value1" रिटर्न करेगा

# यदि की (Key) के नाम में स्पेस या विशेष कैरेक्टर्स हों:
$specialHash = @{
    'Key 1' = 'Value3'
}
$specialHash.'Key 1'  # "Value3" रिटर्न करेगा
```

### ⚫ 18.3 Adding Key-Value Pairs (नया की-वैल्यू जोड़ना)

#### विधि 1: Add ऑपरेटर (\`+=\`)

``` powershell
$hashTable = @{ Key1 = 'Value1' }
$hashTable += @{ Key2 = 'Value2' }  # नया की-वैल्यू जुड़ जाएगा
```

#### विधि 2: .Add() मेथड

``` powershell
$hashTable = @{ Key1 = 'Value1' }
$hashTable.Add("Key2", "Value2")
```

### ⚫ 18.4 Removing Key-Value Pairs (की-वैल्यू डिलीट करना)

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

HashTable.Remove() पैरामीटर सीमा

</div>

कई सोर्स गाइड्स में `$hashTable.Remove("Key", "Value")` लिखा होता है, लेकिन \*\*PowerShell में यह एक त्रुटि (Error) है\*\*। `Remove()` मेथड केवल \*\*1 पैरामीटर (की/Key)\*\* लेता है। वैल्यू पास करने पर मेथड ओवरलोड एरर आता है।

</div>

</div>

सही सिंटैक्स:

``` powershell
# केवल की (Key) नाम पास करें
$hashTable.Remove("Key1")
```

### ⚫ 18.5 Looping & Enumeration (हैश टेबल पर लूप चलाना)

#### 1. Keys प्रॉपर्टी का उपयोग करके:

``` powershell
$hashTable = @{ Key1 = 'Value1'; Key2 = 'Value2' }

foreach ($key in $hashTable.Keys) {
    $value = $hashTable.$key
    Write-Output "$key : $value"
}
```

#### 2. GetEnumerator() का उपयोग करके (सही पाइपलाइन/ऑब्जेक्ट व्यवहार):

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

GetEnumerator() सिंटैक्स स्पष्टीकरण

</div>

ध्यान रहे कि standard `foreach` लूप में पाइपलाइन वेरिएबल `$_` काम नहीं करता। आपको लूप वेरिएबल (जैसे `$item`) का उपयोग करके `$item.Key` और `$item.Value` को एक्सेस करना चाहिए।

</div>

</div>

``` powershell
# सही तरीका:
foreach ($item in $hashTable.GetEnumerator()) {
    Write-Host "Key: $($item.Key), Value: $($item.Value)"
}
```


