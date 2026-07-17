# 📚 11. Month 4: Python Automation & SQLite Databases (डे-बाई-डे सिलेबस)

यह syllabus Month 4 (Day 091 - 120) के लिए एक विस्तृत दैनिक कार्यक्रम (day-by-day plan) है। इसका मुख्य उद्देश्य आपको **Python Core & Automation, GIL Concurrency, Sockets & Web Server Basics, SQLite Indexing, Full-Text Search (FTS5) & Database Administration** का master बनाना है।

प्रत्येक दिन के लिए **Topic**, **Daily Challenge (व्यावहारिक कार्य)**, और **Mastery Check** दिए गए हैं।

---

## 📅 Week 13: Core Python, Destructuring & Stacks (डे 091 - 097)

### Day 091: Interpreter & Datatypes
* **Topic**: Python compilation vs execution model (CPython compiler, `.pyc` bytecode), standard dynamic types, list comprehension logic, and set collection operations performance.
* **Daily Challenge**: Python interpreter compile properties check करें। List comprehensions and sets operations build करें, duplicate items filter checks execute करें।
* **Mastery Check**: Python lists और sets के index matching operations access speed (O(N) vs O(1)) में execution differences क्या हैं?

### Day 092: Destructuring & packing/unpacking
* **Topic**: Python variables destructuring techniques (`a, *b, c = list`), arguments packing/unpacking parameters (`*args`, `**kwargs`), function scopes mappings.
* **Daily Challenge**: एक complex function write करें जो dynamic configuration arguments lists accept करे, arguments packing parameters process करके key values parse करें।
* **Mastery Check**: Python dynamic collections arguments list parameter mappings में `*` vs `**` operator parameters evaluate syntax checks difference specs?

### Day 093: Files Traversals OS
* **Topic**: Local filesystem directory recursive scanning operations using `os.walk` and modern `pathlib.Path`, stats evaluation.
* **Daily Challenge**: Workspace directories scan करने के लिए custom script write करें। 1MB से large size configuration files extract करें, files metrics summary compile करें।
* **Mastery Check**: `os.walk` generator iteration dynamics and recursion memory performance limits?

### Day 094: Regex Engine
* **Topic**: Python regular expressions parsing engine (`re` module), regex compiled patterns matches (`re.compile`), capture groupings, match matches flags.
* **Daily Challenge**: Server configurations file parsed lines read validation regex pattern compile: extract IP addresses, logs status levels, timestamps strings data mappings.
* **Mastery Check**: difference parameters between `re.match()` and `re.search()` matching patterns limits?

### Day 095: Tempfiles & File persistence
* **Topic**: Writing temporary buffers/files safely using `tempfile.NamedTemporaryFile` configurations, file read/write locks, context cleanup states.
* **Daily Challenge**: Temporary diagnostic data file create write parameters process checks execute logic wrapper: write contents, execute calculations, verify auto-delete on script exit.
* **Mastery Check**: Why `tempfile` modules is safer for background file transformations compared to writing hardcoded `/tmp` files?

### Day 096: Compression archives
* **Topic**: Code processing libraries archiving files: `zipfile` compressions, `tarfile` packages management, streaming extraction buffers using `gzip` libraries.
* **Daily Challenge**: System logs directory archiving process tools write: scan current logs folders, compress all `.log` files into `.tar.gz` format verifying zip files checksum integrity.
* **Mastery Check**: difference metrics memory usages when extracting massive files archives directly on filesystem vs buffering memory streams?

### Day 097: Stacks & brackets parsers (Mini-Project)
* **Topic**: Datastructures concepts: Stack implementations (Push/Pop operations), sequence matching logic arrays parsing.
* **Daily Challenge**: Write custom parser class evaluating brackets layouts configuration (`[]`, `{}`, `()`) verify code source balances properties logic.
* **Mastery Check**: compiler parser matching balancing evaluations में stacks properties structures why mandatory?

---

## 📅 Week 14: GIL, Concurrency & Networking (डे 098 - 104)

### Day 098: Global Interpreter Lock (GIL) & multiprocessing pool
* **Topic**: Python Global Interpreter Lock (GIL) thread execution constraints, CPU-bound vs I/O-bound bottlenecks, bypassing GIL using `multiprocessing` processes pool.
* **Daily Challenge**: Compute heavy primes arrays lists. Measure speed comparisons of multi-threaded runtime loops versus multi-process concurrent mapping loops.
* **Mastery Check**: GIL checks under Multi-threading: how can multi-threading speed up network call queues but fail on CPU intensive algorithms?

### Day 099: Socket programming (TCP/UDP socket servers)
* **Topic**: TCP/IP sockets network programming socket API, listening socket bindings (`socket.socket`), accept loops, client/server message loops.
* **Daily Challenge**: Minimal TCP socket echo server build compile run: bind local port, accept external connection strings, reverse messages, return outputs.
* **Mastery Check**: blocking sockets listen call logic locks: how non-blocking sockets models handles multi connections concurrency?

### Day 100: Simple HTTP servers
* **Topic**: Python basic built-in web services routing classes (`http.server.BaseHTTPRequestHandler`), handling standard GET/POST methods requests, headers mappings.
* **Daily Challenge**: Create dynamic diagnostic service HTTP listening port: handle request GET API `/status` returning system status details formatted JSON records.
* **Mastery Check**: differences between custom built `BaseHTTPRequestHandler` web listener vs production ready WSGI servers?

### Day 101: WSGI specifications
* **Topic**: Web Server Gateway Interface (WSGI) standards PEP 3333 specs, WSGI applications functions structures, WSGI servers environment mappings.
* **Daily Challenge**: Write raw compliant python WSGI application handler function matching specs, host it using `wsgiref.simple_server`, process queries strings parameters.
* **Mastery Check**: WSGI standards compatibility: why does python web frameworks (like Django or Flask) require standard WSGI mappings specification?

### Day 102: Flask basics & routing
* **Topic**: Lightweight Flask web framework routing configurations, parameters mapping variables, request body json parsers.
* **Daily Challenge**: Simple web service routing app write: define endpoints to create/delete local JSON file data, read input JSON data payload, format output maps.
* **Mastery Check**: Flask runtime routing lookup: how to handle URL variable type coercion parameters (e.g. `<int:id>`)?

### Day 103: Pillow image operations
* **Topic**: Image parsing library Pillow (PIL), resizing files buffers, converting formats extensions, applying compression filters.
* **Daily Challenge**: Load workspace target image, apply dimensions resizing transformations, generate optimized thumbnail formats, compress image file sizes.
* **Mastery Check**: Image byte streams properties check: how to process image manipulations inline memory buffers without saving files locally?

### Day 104: Logging exceptions
* **Topic**: System tracking logs setups `logging` modules, formatting error tracebacks, handler configs (file, console logging), custom logger adapters.
* **Daily Challenge**: Write exception monitoring logger system: execute bad calculations, catch errors traceback inside catch blocks, format logs details to file stream.
* **Mastery Check**: logger configurations file levels: why logging output should print to both standard output and files with different verbosity constraints?

---

## 📅 Week 15: Python 3 migration, AST & Database Access (डे 105 - 111)

### Day 105: Python 2 vs Python 3 incompatibilities
* **Topic**: Historical syntax difference parameters: integer division, byte array strings vs unicode strings literals, removal of `xrange`, migrating code engines utilizing automated syntax conversion compiler tools `2to3`.
* **Daily Challenge**: Parse classic legacy python 2 script files, analyze syntax warnings issues, compile them using `2to3` convertor tools to clean python 3 executions formats.
* **Mastery Check**: Unicode models: why python 3 string separation model (bytes vs str) prevents silent errors compared to legacy python 2 formats?

### Day 106: AST code objects
* **Topic**: Abstract Syntax Tree (AST) compilation models inside Python, using `ast` parser parsing modules, introspecting bytecodes tokens layout structure.
* **Daily Challenge**: Write small validator script: parse custom Python source script using `ast.parse`, inspect variables and function definitions structures in code AST tree representations.
* **Mastery Check**: how compiler processes source code AST parser parameters into compiled runtime bytecodes?

### Day 107: SQLite3 direct integration
* **Topic**: Local database engines SQLite interface configurations (`sqlite3` module), cursor transaction query cycles, SQL injection safety parameters.
* **Daily Challenge**: Create local sqlite db file: CREATE TABLE users schema layout, implement prepared statements parameters queries inserting data arrays securely, fetch contents.
* **Mastery Check**: Prepared statements query parameters: why passing params as tuples prevents SQL injection risks compared to formatting strings directly?

### Day 108: MySQL/Postgres drivers
* **Topic**: Enterprise databases drivers architectures: MySQL drivers connectivity, Postgres drivers (psycopg2), connections pooling settings.
* **Daily Challenge**: Mock databases connection pooling structure write: build config function loading target credentials files, instantiate database pools parameters simulation checks.
* **Mastery Check**: why connection pooling databases models are preferred in high-concurrency environments over opening connections per query?

### Day 109: SQLAlchemy models
* **Topic**: Object Relational Mapping (ORM) database designs, SQLAlchemy declarative models mappings, handling relationships, executing CRUD operators.
* **Daily Challenge**: Define database schema mapping (e.g. Products and Categories tables) using SQLAlchemy, insert records, run relational queries using ORM session calls.
* **Mastery Check**: difference constraints: lazy loading vs eager loading in ORM database models relationships query patterns?

### Day 110: Excel sheet automation
* **Topic**: Reading and writing spreadsheet data formats using `openpyxl`, updating cell coordinates, formatting sheets properties.
* **Daily Challenge**: Read data stats report source, generate custom excel document: write values to columns rows, apply custom column styles, evaluate averages, save sheet.
* **Mastery Check**: openpyxl memory optimizations: how to process massive excel files using read-only streaming modes?

### Day 111: Design Patterns in Python
* **Topic**: Standard design patterns: Thread-safe Singleton patterns, custom Context Managers scopes (`__enter__` and `__exit__` methods).
* **Daily Challenge**: Create thread-safe database connection pool Singleton class. Write custom context manager timing executing blocks, printing elapsed intervals.
* **Mastery Check**: how do context manager scope variables handle runtime errors inside `__exit__` execution method signatures?

---

## 📅 Week 16: SQLite Advanced Indexing & Automations (डे 112 - 120)

### Day 112: Tables schemas DDL
* **Topic**: Database definition statements schemas DDL, foreign key cascade constraints, unique indices creations.
* **Daily Challenge**: Build database schema with cascade deletion constraints: drop database objects safely on related deletions, check references integrity.
* **Mastery Check**: index usage metrics: how to analyze query indexes utilization profiles using `EXPLAIN QUERY PLAN` prefix commands?

### Day 113: SELECT WHERE JOIN querying
* **Topic**: Database manipulation SQL syntax: multi JOIN operations, aggregations grouping operations (`GROUP BY`, `HAVING`), sub-queries evaluations.
* **Daily Challenge**: Compile database queries: compute average sales products details grouping by month metrics, filter lists whose group stats exceed value bounds.
* **Mastery Check**: `WHERE` clauses filters and `HAVING` clauses filters execution sequence difference parameters?

### Day 114: FTS5 virtual tables setup
* **Topic**: SQLite Full-Text Search (FTS5) virtual tables engine, tokenizers configs (Unicode61, Porter stemmer), full-text indexes builds.
* **Daily Challenge**: Build virtual table using FTS5: import large text paragraphs document logs, execute full text matching lookups utilizing `MATCH` syntax patterns.
* **Mastery Check**: standard database table string matching (`LIKE '%word%'`) execution speed vs FTS5 virtual index matching speed?

### Day 115: BM25 search ranking
* **Topic**: BM25 search ranking relevance algorithms calculations, sorting matched query records based on keywords frequency relevance indicators.
* **Daily Challenge**: Build search application utilizing SQLite FTS5 `bm25()` functions, rank returned matching records lists, sort queries results relevance descending.
* **Mastery Check**: How BM25 ranking algorithm scales scores dynamically based on document term frequencies constraints?

### Day 116: Snippet highlights API
* **Topic**: SQLite FTS5 auxiliary helpers: `snippet()` highlight API, isolating search keywords context fragments, customizing HTML highlight tags.
* **Daily Challenge**: Customize search application: return matching text snippet fragments matching query word, wrap keywords in bold styling tags (`<b>word</b>`), output summaries.
* **Mastery Check**: `snippet()` API parameter arguments definition constraints settings?

### Day 117: Transaction databases locks
* **Topic**: Database locks concurrency modes, Write-Ahead Logging (WAL) state controls, handling database busy errors timeout parameters.
* **Daily Challenge**: Configure database connection pool to operate under WAL mode (`PRAGMA journal_mode=WAL;`), verify concurrent writes locks profiles.
* **Mastery Check**: WAL (Write-Ahead Logging) database execution mode concurrency advantages?

### Day 118: Dump restore database
* **Topic**: SQLite database administration tasks, backup API hooks, dumping database files objects to SQL text lists scripts, restore processes.
* **Daily Challenge**: Write Python script that captures complete SQLite database dump structure file schema records, writes to backup script, and runs clean restore verification.
* **Mastery Check**: SQLite built-in online backup API advantages over manual file system copy commands?

### Day 119: Automated backup cron scheduling
* **Topic**: Writing system cron tasks, backup automation pipelines, cron schedule syntax variables settings.
* **Daily Challenge**: Build system execution script: package directory contents and database dump exports, schedule cron configuration task checking system status on specified daily intervals.
* **Mastery Check**: shell script cron environment paths differences troubleshooting rules?

### Day 120: Module 4 graduation project: Multi-threaded / Database Document indexer
* **Topic**: Complete Python module integration: multi-directory file scanning, database table creation DDL, FTS5 virtual index compiling, BM25 query rankings, Exception logging.
* **Daily Challenge**: Implement final project tool: scan target documentation folders recursively, parse metadata, write to SQLite FTS5 tables database, construct interactive search prompt ranking search results by BM25 relevance displaying matches snippets.
* **Mastery Check**: Zero errors execution under multiple parallel documentation directory scans, verifying index synchronization.

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[06. Systems Developer Syllabus (संक्षिप्त सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/06-learning-syllabus.md)**
* **[07. 180-Day Day-by-Day Syllabus (पूरा सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/07-day-by-day-syllabus.md)**
* **[08. Month 1 Day-by-Day Syllabus (डे 1 - 30)](file:///home/narayanas/Documents/CuriousWiki/docs/08-month-1-syllabus.md)**
* **[09. Month 2 Day-by-Day Syllabus (डे 31 - 60)](file:///home/narayanas/Documents/CuriousWiki/docs/09-month-2-syllabus.md)**
* **[10. Month 3 Day-by-Day Syllabus (डे 61 - 90)](file:///home/narayanas/Documents/CuriousWiki/docs/10-month-3-syllabus.md)**
* **[12. Month 5 Day-by-Day Syllabus (डे 121 - 150)](file:///home/narayanas/Documents/CuriousWiki/docs/12-month-5-syllabus.md)**
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
