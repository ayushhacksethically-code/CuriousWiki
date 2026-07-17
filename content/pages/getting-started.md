---
title: "🚀 CuriousWiki के साथ Getting Started"
date: 2026-06-30
tags: ["guide","wiki","intro","setup"]
---

CuriousWiki को एक modular, beautiful, और highly portable knowledge base के रूप में design किया गया है। चूंकि यह पूरी तरह से static HTML files पर चलता है, आप इसे किसी भी web browser में आसानी से पढ़ सकते हैं और sync कर सकते हैं।

## 1. Project Structure

यहाँ बताया गया है कि आपके wiki folder में files को कैसे organize किया गया है:

- **`index.html`**: Home dashboard जो entry point के रूप में काम करता है।
- **`css/style.css`**: Master stylesheet जिसमें variables, dark/light themes, layouts, और markdown rendering elements शामिल हैं।
- **`js/main.js`**: Dynamic functionality को handle करता है, जिसमें code-copy buttons, mobile menu overlays, path adjustments, और search engine शामिल हैं।
- **`pages/`**: सभी individual article/page files के लिए एक directory.

## 2. New Page जोड़ना

CuriousWiki में एक naya page जोड़ने के लिए, इन तीन steps को follow करें:

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Step 1: Page Template को duplicate करें

</div>

`pages/` directory में मौजूद <a href="template.html" class="wiki-link">template.html</a> फ़ाइल को copy करें और उसका name बदलें (जैसे `my-new-topic.html`)।

</div>

</div>

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Step 2: Sidebar में Link जोड़ें

</div>

नए page और `index.html` को खोलें, और `<nav>` element में page link जोड़ें:

``` html
<li class="nav-item">
    <a href="pages/my-new-topic.html" class="nav-link">
        <i data-lucide="file-text"></i>
        <span>My New Topic</span>
    </a>
</li>
```

</div>

</div>

<div class="callout callout-info">
<i data-lucide="info"></i>
<div class="callout-content">

<div class="callout-title">

Step 3: Search Index Automatic Sync

</div>

जब आप `serve.sh` चलाते हैं, तो Nim server (या index script) automatically सभी HTML files को scan करके `search-index.json` database update कर देता है। आपको manual code edit करने की कोई ज़रूरत नहीं है!

</div>

</div>

## 3. Cross-Linking Pages (Obsidian Style)

आप standard HTML का उपयोग करके wiki body में अन्य notes के links बना सकते हैं, लेकिन हमने Obsidian के double-bracket syntax की नकल करने के लिए `.wiki-link` class को pre-style किया है:

उदाहरण के लिए: उदाहरण के लिए: JavaScript Cheat Sheet या Git Cheatsheet पर useful code snippets देखें।

इन्हें लिखने के लिए, निम्न code का उपयोग करें:

``` html
<a href="javascript-cheatsheet.html" class="wiki-link">JavaScript Cheat Sheet</a>
```

## 4. Contributing to CuriousWiki

इस wiki में नए updates, articles और improvements जोड़ने के लिए:

1.  नया content बनाने के लिए sidebar templates और style formats को follow करें।
2.  Changes करने के बाद pull requests open करें या direct issue create करें।
3.  Wiki content को regular intervals पर review किया जाता है ताकि information correct और up-to-date रहे।


