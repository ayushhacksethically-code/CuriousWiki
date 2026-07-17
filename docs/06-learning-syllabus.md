# 📚 06. Developer to Systems Engineer Syllabus (सीखने का सिलेबस)

यह syllabus (पाठ्यक्रम) एक beginner को **Basic programming** से लेकर **Systems Engineering, Database compilation, Client-side WASM application** और **Cybersecurity** तक का master बनाने के लिए design किया गया है. 

यह पूरी तरह से **FREE** tools पर आधारित है और इसे low-end/standard hardware computer (जैसे Linux operating system, 4GB RAM) पर बिना किसी lag के चलाया जा सकता है.

---

## 🛠️ Hardware & Free Tool Setup (सिस्टम सेटअप)

सीखने के लिए आपको किसी paid software की आवश्यकता नहीं है. निम्नलिखित tools का उपयोग करें:
* **Operating System**: Linux (जैसे Linux Mint, Alpine Linux, या Ubuntu) - यह Windows से बहुत fast और open-source है.
* **Text Editor**: Visual Studio Code, Vim (Terminal based) या Helix (Rust based fast terminal editor) - 100% Free.
* **Compilers & Interpreters**: GCC (C के लिए), Python 3, Node.js (JavaScript के लिए), और Nim Compiler - सभी command line packages के रूप में मुफ्त में उपलब्ध हैं.
* **Database**: SQLite3 command-line client.

---

## 📅 Step-by-Step Learning Syllabus (चरण-दर-चरण पाठ्यक्रम)

### 🔵 Module 1: GNU/Linux Administration & Bash CLI Mastery (लिनक्स और बैश शेल)
* **Target**: Linux operating system, files permissions models, commands directories traversal, services controllers (Systemd), user management, local networking rules, shell automation scripting master करना.
* **Syllabus Topics**:
  1. **Linux Command Utilities**: navigation (`cd`, `pwd`), files manipulation (`mkdir`, `rm`, `ls` options).
  2. **Script Shebang & CLI editing**: terminal keyboard shortcuts, environment variables bindings (`env`).
  3. **Text processing CLI**: standard files printing (`cat` options), regex pattern matching searches (`grep`).
  4. **Output Redirections**: streams routing (`stdout/stderr`), named pipes (`mkfifo`).
  5. **OS Distributions**: identifying Debian/RHEL/Systemd versions, coreutils info `uname`.
  6. **Disk & Hardware info**: investigating usage sizes (`df`, `du`), CPU specs (`lscpu`), processes tracking.
  7. **Service Diagnostics**: Systemd controllers, diagnostic logs, starting/stopping services, package managers (`apt`, `pacman`, `yum`).
  8. **Network Settings**: Resolving local DNS (`/etc/hosts`), ip routes manipulations, network interfaces.
  9. **Security Jails**: User directories groups setup, chroot (change root environments sandbox), SSH server keys, SCP transfers, GPG keys configurations.

---

### 🔵 Module 2: PowerShell Core (pwsh) Object Scripting (पॉवरशेल)
* **Target**: Type-safe, object-based scripting, cmdlet pipeline automation, .NET bindings, और cross-platform shells management सीखना.
* **Syllabus Topics**:
  1. **Cmdlet Architecture**: verbs-nouns structures (`Get-Service`), command aliases, Execution Policies.
  2. **Object Pipeline**: passing complete object parameters inside pipeline streams (not raw text).
  3. **.NET Libraries integration**: calling static class libraries (`[System.Math]`, `[System.Guid]`).
  4. **Custom Objects**: dynamic creations (`[PSCustomObject]`, `New-Object`).
  5. **Operators & Coercions**: type comparisons (`-eq`, `-gt`, case-sensitive `-ceq`), logical operators, left-operand coercion trap.
  6. **Loops & Switch blocks**: foreach loop keywords vs `ForEach-Object` pipeline scripts, switch wildcard parameters, regex switch matching.
  7. **Calculated Properties**: format table outputs headers calculations.
  8. **Advanced Functions & Modules**: CmdletBinding validations parameter attributes, modules manifest (`.psd1`), automatic variables (`$error`, `$PSScriptRoot`).

---

### 🔵 Module 3: C Programming & Memory Management (सी लैंग्वेज)
* **Target**: C compilation chain, memory layouts, pointer addresses indirection calculations, type alignments, standard structure arrays, stack scopes vs heap allocations, undefined behaviors safety (UB), and debugging multithreaded systems.
* **Syllabus Topics**:
  1. **GCC Compiler Toolchain**: compiler stages (preprocessor, compilation, assembly, linking), K&R C vs standard C11.
  2. **Data Sizing & Formats**: fixed-width integer types (`int32_t`, `uint64_t`), literal suffixes, complex declaration spiral rules.
  3. **Operators & Alignments**: bitwise operations, logical short-circuits, `sizeof`, `_Alignof` struct alignments.
  4. **Type Qualifiers**: volatile pointers registers, const variables constraint limits.
  5. **Arrays & Matrices**: row-major layout efficiency, multi-dimensional array decays, flat arrays as 2D matrices.
  6. **Strings processing**: strtok_r tokenization, copying boundaries, string to number safety (strtol, strtof vs atoi/atof).
  7. **Data Structures & Memory**: dynamic linked lists node operations, Structs flexible array members, padding/packing.
  8. **Pointers Depth**: double pointers, const pointers variations, function pointers, generic `void*` polymorphic actions.
  9. **Language Constraints & UB**: Sequence points, Undefined Behaviors checklist (free twice, deref freed, signed integer overflows, data races), random numbers (Xorshift, PCG).
  10. **Preprocessors & Generics**: function-like macros, token pasting (`##`), variable arguments `va_list`, generic selection templates (`_Generic` select), X-macros.
  11. **Concurrency & Tests**: C11 thread spawn, atomic counters, IPC semaphores, CMocka unit testing framework, Valgrind memory auditing leaks checks.

---

### 🔵 Module 4: Python for Automation (पायथन)
* **Target**: Scripting automations, logging exceptions, subprocess pipe executions, files compressions, parallel GIL workarounds, AST bytecode checks, database ORM integrations, and dynamic Excel parsers.
* **Syllabus Topics**:
  1. **Core Data Structures**: list comprehensions, destructuring tuple/list packing unpacking (`*args`).
  2. **OS Operations**: tempfiles configurations, directory parsing, zip/tar archives manipulation, gzip decompression streams.
  3. **Concurrency & Network**: Global Interpreter Lock (GIL) multiprocessing workarounds, Cython nogil, TCP/UDP sockets connections.
  4. **Web Servers**: BaseHTTPRequestHandler sockets handlers, WSGI standard servers, Flask dynamic routing url setups.
  5. **Advanced Python**: Mixins classes, Pillow image formats transformations, logging configs exceptions logs dumps, abstract base classes (abc), AST bytecode introspection.
  6. **Python 2 vs 3**: core syntax modifications, unicode differences, code converters tools (`2to3`).
  7. **Databases**: Prepared statements bindings SQLite, PostgreSQL drivers (psycopg2), MySQL configurations, SQLAlchemy database ORM models.
  8. **External Integrations**: openpyxl excel sheets parsing/writing, persistence serializers, CLI argparse subcommands formatter styles.

---

### 🟡 Module 5: SQLite & Structured Data (डेटाबेस इंजन)
* **Target**: Binary format database schemas create करना, FTS index tables और queries structure सीखना.
* **Syllabus Topics**:
  1. **SQL basics**: Relational model, Tables creation, INSERT, SELECT, UPDATE, DELETE queries.
  2. **Database Schema Design**: Primary Keys, Foreign Keys, data normalization, Indexes.
  3. **SQLite Virtual Tables**: FTS5 (Full-Text Search) module integration and BM25 ranking algorithm usage.
  4. **Embedded Database Logic**: Client connection, transactional query safety (`BEGIN TRANSACTION` and `COMMIT`).
  5. **Optimization**: `VACUUM` and `ANALYZE` syntax to compress DB size.

---

### 🟡 Module 6: Web Engineering: HTML5, CSS3, JS & Browser WASM (वेब इंजीनियरिंग)
* **Target**: Browser responsive structures compile design systems build, CSS variables dynamic variables manipulation, dynamic client-side JS logic, async actions, Web Worker and WebAssembly search integrations.
* **Syllabus Topics**:
  1. **HTML5 Semantic elements**: headings, anchors hyperlinks navigation, structured tables list formats.
  2. **Forms & Inputs**: validations rules checkbox/radio button options selection controllers.
  3. **Media & Canvas**: audio/video embeds backgrounds canvas drawing inline SVGs paths.
  4. **Accessibilities (ARIA)**: tabindex focus rules role assignments alerts.
  5. **CSS Layout Designs**: external styling sheets combinators checked sibling hacks selectors, Box Model constraints box-sizing padding margins.
  6. **Centering methods**: Flexbox grid layouts, absolute layout positioning transform centers.
  7. **Dynamic JS DOM logic**: async processes promises chaining fetch ArrayBuffer load binary data Web Workers threads configurations SQLite WASM virtual schema searches BM25 sorting snippet highlights.

---

### 🔴 Module 7: Nim Systems Programming (निम लैंग्वेज)
* **Target**: Nim language features सीखना (जो C की speed और Python जैसी readable syntax प्रदान करती है).
* **Syllabus Topics**:
  1. **Type System**: Strongly typed compiler, variables, sequences (`seq`), tuples, procs (procedures).
  2. **Memory Models**: Garbage Collection options (`--gc:arc`, `--mm:orc`).
  3. **String & Path utilities**: `os`, `strutils` modules, string splitting, recursive directories traversal.
  4. **C Interoperability**: Nim compiles to C logic (interop with native library modules using `{.header, importc.}`).
  5. **Static Site Generator Project**: HTML template files placeholders read, parse Markdown structure, custom parsing state machines design.

---

### 🔴 Module 8: Intermediate Cybersecurity & Secure Coding (सुरक्षा)
* **Target**: Security vulnerabilities को समझना और code को hacker-proof (secure) बनाना.
* **Syllabus Topics**:
  1. **Input Sanitization (SQL Injection mitigation)**: SQL commands में dynamic concat variables pass करने की जगह pre-compiled queries (`stmt.bind`) का use करना.
  2. **XSS (Cross-Site Scripting) Prevention**: User inputs HTML strip tags (`replace(/<[^>]*>/g, '')`) logic apply करना.
  3. **Secure Path Traversal**: URLs parameters validation check dynamic paths directories access block (restrict mapping files relative path jumps like `../../etc/passwd`).
  4. **Network Protocol security**: SSL/TLS certificate configurations (acme.sh/Let's Encrypt) और HTTPS secure communication configuration settings.
  5. **OS & User Permissions**: Linux permission models (chmod, chown, sudo contexts), secure scripting rules.

---

## 🏆 Graduation Project: Build Your Own Engine (खुद का प्रोजेक्ट बनाएं)

इस syllabus को complete करने के बाद, आप निम्नलिखित project scratch से बना सकते हैं:
1. **Python script** लिखिए जो markdown content directories create करे.
2. **Nim compiler tool** build कीजिए जो raw markdown को clean structural HTML pages in parse करे.
3. Converted pages metadata information read करके automatic binary format **SQLite database index table** (`FTS5`) generate करे.
4. UI **HTML template** write कीजिए. CSS styling custom design variable load values control theme updates handles persistent.
5. Search bar input events triggers call a client **Web Worker** which uses **SQLite WASM library** to query database, output results locally inside browser without any network API requests!

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
* **[00. Absolute Beginner's Guide](file:///home/narayanas/Documents/CuriousWiki/docs/00-beginner-guide.md)**
