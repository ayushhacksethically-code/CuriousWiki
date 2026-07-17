---
title: "⚡ JavaScript Cheat Sheet"
date: 2026-06-30
tags: ["javascript","programming","js","cheatsheet"]
---

Developer workspaces में quick reference के लिए आवश्यक modern JavaScript code structures, helpers, और syntax formulas का एक collection.

## 1. Array Methods का उपयोग

List values को filter, transform, या aggregate करने के लिए common functions:

``` javascript
const upabhokta = [
    { pehchanId: 1, naam: 'Alice', pad: 'admin', ank: 120 },
    { pehchanId: 2, naam: 'Bob', pad: 'user', ank: 90 },
    { pehchanId: 3, naam: 'Charlie', pad: 'user', ank: 200 }
];

// 1. Filter: admin users (prashashak) को extract करें
const prashashak = upabhokta.filter(ekUpabhokta => ekUpabhokta.pad === 'admin');

// 2. Map: names की list (naamKiList) इकट्ठा करें
const naamKiList = upabhokta.map(ekUpabhokta => ekUpabhokta.naam); // ['Alice', 'Bob', 'Charlie']

// 3. Reduce: total points (kulAnk) calculate करें
const kulAnk = upabhokta.reduce((jod, ekUpabhokta) => jod + ekUpabhokta.ank, 0); // 410

// 4. Find: id = 2 वाले user (bablu) को select करें
const bablu = upabhokta.find(ekUpabhokta => ekUpabhokta.pehchanId === 2);
```

## 2. Promises & Async/Await

Asynchronous network requests या delay states को clean और readable तरीके से handle करना:

``` javascript
// Standard Promise-based delay helper
const delay = (miliSecond) => new Promise(pooraKarein => setTimeout(pooraKarein, miliSecond));

// Async function dummy network fetch perform करने के लिए
async function fetchUserData(sadasyaId) {
    try {
        console.log('Loading database records...');
        await delay(1000); // 1 second database latency simulating
        
        const uttar = await fetch(`https://api.example.com/users/${sadasyaId}`);
        if (!uttar.ok) {
            throw new Error(`HTTP error! status: ${uttar.status}`);
        }
        
        const jaankari = await uttar.json();
        return jaankari;
    } catch (galti) {
        console.error('Fetch execution failed: ', galti);
        throw galti;
    }
}
```

## 3. DOM Selector & Click Handlers

Page items को select करना, event interactions को bind करना, और dynamically styling classes को toggle करना:

``` javascript
// Specific elements select करें
const mukhyaCard = document.querySelector('.card-element');
const sabhiTags = document.querySelectorAll('.tag');

// click पर class toggle करें
if (mukhyaCard) {
    mukhyaCard.addEventListener('click', (ghatna) => {
        // active status class toggle करें
        mukhyaCard.classList.toggle('active');
        console.log('Card state toggle triggered at:', ghatna.clientX);
    });
}

// multiple tag nodes पर clicks bind करें
sabhiTags.forEach(ekTag => {
    ekTag.addEventListener('click', () => {
        const tagKaText = ekTag.textContent;
        console.log(`Tag selected: ${tagKaText}`);
    });
});
```

<div class="callout callout-warning">
<i data-lucide="alert-triangle"></i>
<div class="callout-content">

<div class="callout-title">

Notice: ES6+ Syntax

</div>

यह cheatsheet modern Arrow Functions और Destructuring elements का उपयोग करती है। यदि target browsers basic ES6 features का support नहीं करते हैं, तो browser compatibility tables की जांच करना सुनिश्चित करें।

</div>

</div>

## 4. Local Storage Configuration

Page reloads के बाद भी persistent रहने वाले data को read और write करना:

``` javascript
// Preferences save करें (configurations याद रखता है)
localStorage.setItem('theme', 'dark');
localStorage.setItem('userId', '10984');

// Preferences वापस load करें
const bachayaHuaTheme = localStorage.getItem('theme') || 'light';
const bachayaHuaSadasya = localStorage.getItem('userId');

// Target item delete करें या सभी local records clean करें
localStorage.removeItem('userId');
localStorage.clear(); // pure localStorage domain empty करें
```


