---
title: "👑 Nim Programming Cheatsheet"
date: 2026-06-30
tags: ["nim","programming","types","variables","loops","procedures","async"]
---

Compiled performance programs बनाने के लिए Nim language में essential code formulas, type declarations, loops, procedures, और async blocks.

## 1. Variables & Declarations

Mutable variables, read-only values, और compile-time constants:

``` nim
# Mutable variables (value change kar sakte hain)
var ginti = 10
ginti = 20

# Read-only variables (runtime par evaluate hoti hain)
let sandesh = "Hello from Nim"

# Compile-time constants (compile time par evaluate hoti hain)
const PortNumber = 8080
```

## 2. Procedures (Functions)

Typing, parameters, return declarations, और implicit results के साथ procedures create करना:

``` nim
# Standard procedure declaration
proc addNumbers(pehliSankhya: int, doosriSankhya: int): int =
  return pehliSankhya + doosriSankhya

# Implicit 'result' variable ke sath procedure (no return keyword required)
proc squareVal(sankhya: int): int =
  result = sankhya * sankhya

# calling procedures
let jod = addNumbers(5, 10)
let varg = squareVal(4)
```

## 3. Control Flow & Loops

Conditionals evaluate करना और sequences या number intervals पर loop करना:

``` nim
# Conditionals
let umar = 18
if umar < 18:
  echo "Underage"
elif umar == 18:
  echo "Just adult"
else:
  echo "Adult"

# For loops (intervals)
for i in 0 .. 4:
  echo i # 0, 1, 2, 3, 4 (inclusive)

for i in 0 ..< 5:
  echo i # 0, 1, 2, 3, 4 (exclusive)

# sequences iterate karna
let falonKiList = @["apple", "banana", "cherry"] # sequences
for kram, fal in falonKiList:
  echo kram, ": ", fal
```

## 4. Custom Object Types

Basic data structs declare करना और object parameters initialize करना:

``` nim
type
  User = object
    sadasyaNaam: string
    pehchanId: int
    kyaAdminHai: bool

# Object initialize karein
let prashashakUpabhokta = User(sadasyaNaam: "narayanas", pehchanId: 1, kyaAdminHai: true)
echo prashashakUpabhokta.sadasyaNaam
```
