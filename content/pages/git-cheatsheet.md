---
title: "🔧 Git Version Control Cheatsheet"
date: 2026-06-30
tags: ["git","branch","merge","commit","repository","setup"]
---

Developer repositories में commits, stash management, branch operations, merging, और sync operations के लिए आवश्यक Git commands और workflows.

## 1. Core Config & Committing

User properties setup करना और local project snapshots save करना:

``` bash
# Global Identity settings
git config --global user.name "Aapka Naam"
git config --global user.email "aapka.email@example.com"

# Repository state check करें
git status

# descriptive messages के साथ changes save करें
git add .
git commit -m "feat: responsive sidebar navigation implement kiya"
```

## 2. Branch Management

Local git branches को create, list, merge, और clean करना:

``` bash
# सभी local branches list करें
git branch

# switch करके new branch create करें
git checkout -b feature/search-engine

# feature branch को current branch (जैसे main) में merge करें
git checkout main
git merge feature/search-engine

# काम खत्म होने पर local branch delete करें
git branch -d feature/search-engine
```

## 3. Stashing Changes

स्थायी (permanent) commit किए बिना progress में चल रहे काम को temporary रूप से save करना:

``` bash
# Active changes stash करें (working copy clean हो जाती है)
git stash -u

# सभी stashed changes list करें
git stash list

# सबसे recent stash list से हटाकर re-apply करें
git stash pop

# stashed changes को discard करें
git stash clear
```

## 4. Sync & Remote Pushing

Local changes को push करना और remote source repositories से updates को pull करना:

``` bash
# Remote metadata retrieve करके updates merge करें
git pull origin main

# commits को remote origin repository पर send करें
git push origin main
```
