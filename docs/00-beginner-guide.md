# 🟢 00. Absolute Beginner's Guide (शुरुआती मार्गदर्शिका)

यदि आप coding नहीं जानते हैं लेकिन web development सीखना चाहते हैं, तो **CuriousWiki** आपके सीखने के लिए एक बेहतरीन शुरुआत है! यह project दर्शाता है कि कैसे simple text files को एक fully functional, fast search index website में बदला जाता है.

इस guide में हम बुनियादी बातें (basics) बहुत ही सरल शब्दों में समझेंगे.

---

## 💡 1. Core Web Concepts (वेब की बुनियादी बातें)

एक website मुख्य रूप से तीन चीजों से मिलकर बनती है:

| Technology (तकनीक) | Real-World Analogy (सरल उदाहरण) | CuriousWiki में इसका काम |
| :--- | :--- | :--- |
| **HTML** (HyperText Markup Language) | **घर की दीवारें और ढांचा (Skeleton)** | Website का structure (जैसे headings, paragraphs, buttons) तय करना. |
| **CSS** (Cascading Style Sheets) | **घर का पेंट और इंटीरियर डिज़ाइन (Paint/Clothes)** | Website को सुंदर बनाना (जैसे colors, margins, fonts, light/dark mode design). |
| **JavaScript** (JS) | **घर के बिजली के उपकरण और स्विच (Brain/Action)** | Interactive features handle करना (जैसे theme बदलना, search popup खोलना, text copy करना). |
| **Markdown** (.md) | **सादा पाठ (Plain Notepad text)** | आसान फॉर्मेट में content लिखना (बिना complex HTML tags लिखे). |

---

## 📝 2. Markdown क्या है और इसे कैसे लिखें?

HTML में एक heading बनाने के लिए `<h1>Heading</h1>` लिखना पड़ता है, जो नए लोगों के लिए थकाऊ हो सकता है. **Markdown** इसका एक आसान shortcut है.

* **Heading (शीर्षक)** बनाने के लिए बस `#` का उपयोग करें:
  ```markdown
  # यह सबसे बड़ी Heading है (HTML में h1)
  ## यह उससे छोटी Heading है (HTML में h2)
  ### यह तीसरी Heading है (HTML में h3)
  ```
* **Bold (गाढ़ा)** करने के लिए text के दोनों तरफ `**` लगाएं: `**यह महत्वपूर्ण है**`.
* **Bullet Points (सूची)** बनाने के लिए dash `-` लगाएं:
  ```markdown
  - पहला बिंदु (Point 1)
  - दूसरा बिंदु (Point 2)
  ```

CuriousWiki आपके लिखे इसी simple text को automatic code के ज़रिए dynamic web pages में बदल देता है.

---

## 🖥️ 3. Terminal (कमांड लाइन) क्या है?

आमतौर पर हम कंप्यूटर में माउस से double-click करके folders खोलते हैं या files edit करते हैं. इसे **GUI (Graphical User Interface)** कहते हैं.
लेकिन programmers कंप्यूटर से बात करने के लिए text commands का उपयोग करते हैं, जिसे **Terminal** या **CLI (Command Line Interface)** कहा जाता है.

CuriousWiki में serve करने के लिए हम इस terminal command का उपयोग करते हैं:
```bash
./serve.sh
```
इसका मतलब है: *"कंप्यूटर जी, इस `serve.sh` नाम की script को चलाओ, ताकि हमारी website compile होकर browser में चालू हो सके."*

---

## 🚀 4. बिना कोडिंग के नया Page कैसे जोड़ें? (Your First Hands-on)

यदि आप web development सीखना चाहते हैं, तो यह practical steps ज़रूर follow करें:

1. **फाइल बनाएं (Create File)**:
   `/home/narayanas/Documents/CuriousWiki/content/` folder में जाएं. वहाँ एक नई text file बनाएं और उसका नाम `my-first-page.md` रखें.
   *(ध्यान रखें कि file extension `.md` होना चाहिए).*

2. **कंटेंट लिखें (Write Content)**:
   उस file को open करें और उसमें निम्नलिखित text copy-paste करें:
   ```markdown
   ---
   title: मेरी पहली कोडिंग पोस्ट
   tags: welcome, beginner, learning
   date: 2026-07-11
   ---
   # नमस्कार कोडिंग की दुनिया!
   
   यह मेरा **पहला static page** है जिसे मैंने बिना HTML सीखे Markdown से बनाया है.
   
   ## मुझे क्या सीखना है:
   - Command Line का उपयोग करना.
   - HTML और CSS का ढांचा.
   - Static Web servers कैसे चलते हैं.
   ```
   *(ऊपर दिए गए `---` वाले section को **Frontmatter** कहते हैं, जो website को बताता है कि आपके page का नाम (Title) और Tags क्या हैं).*

3. **वेबसाइट रीबिल्ड करें (Rebuild & Run)**:
   अपने terminal में CuriousWiki folder में जाकर `./serve.sh` run करें.
   
4. **परिणाम देखें (Check Results)**:
   Browser में `http://localhost:8585` खोलें. अब Search bar में `कोडिंग` type करें. आपका नया page instant search results में दिखाई देगा!

इस प्रकार, CuriousWiki आपको कोडिंग के basic mechanics (लिखना, कंपाइल करना, डेटाबेस इंडेक्सिंग, और लोकल होस्टिंग) को व्यावहारिक रूप (practically) से सिखाती है.

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
* **[01. Architecture Overview (वास्तुकला विवरण)](file:///home/narayanas/Documents/CuriousWiki/docs/01-architecture-overview.md)**
