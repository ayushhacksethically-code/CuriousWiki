# 📚 09. Month 2: PowerShell Core (pwsh) Object Scripting (डे-बाई-डे सिलेबस)

यह syllabus Month 2 (Day 031 - 060) के लिए एक विस्तृत दैनिक कार्यक्रम (day-by-day plan) है। इसका मुख्य उद्देश्य आपको **PowerShell Core (pwsh), Type-Safe Object Pipeline, .NET Core Integration, Custom Objects Creation, Error Handling Streams, Advanced Functions, Script Security & Signing** का master बनाना है।

प्रत्येक दिन के लिए **Topic**, **Daily Challenge (व्यावहारिक कार्य)**, और **Mastery Check** दिए गए हैं।

---

## 📅 Week 5: Cmdlet Architecture, Pipeline Basics & Help System (डे 031 - 037)

### Day 031: Introduction to PowerShell Core (pwsh) & Command Architecture
* **Topic**: What is PowerShell Core (cross-platform, open-source), Verb-Noun command structure, command discovery with `Get-Command`, object metadata inspection using `Get-Member`, and command syntax variations.
* **Daily Challenge**: pwsh console launch करें। `Get-Command` का उपयोग करके `Get` verb and `Process` noun वाले cmdlets खोजें। `Get-Process` cmdlets को `Get-Member` में pipe करके returned object properties and methods list inspect करें।
* **Mastery Check**: PowerShell और traditional Linux Bash shell execution model में pipelined content (raw text streams vs type-safe object streams) का मुख्य अंतर क्या है?

### Day 032: Execution Policies & Script Security
* **Topic**: Execution Policies concept (`Restricted`, `RemoteSigned`, `AllSigned`, `Unrestricted`, `Bypass`), execution policy scopes (`Process`, `CurrentUser`, `LocalMachine`), script blocks security verification.
* **Daily Challenge**: Current environment execution policy check करें (`Get-ExecutionPolicy -List`)। Current shell process scope के लिए policy को `Bypass` set करें (`Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process`) और custom parameters verify करें।
* **Mastery Check**: `RemoteSigned` policy locally written scripts and internet downloaded scripts पर execution signature checks कैसे apply करती है?

### Day 033: Command Aliases, Providers & Navigation
* **Topic**: Built-in and custom aliases (`Get-Alias`, `New-Alias`), PowerShell Providers (`Get-PSProvider`), virtual filesystem mounts (`Get-PSDrive`), navigating Windows Registry or Environment variables using standard path navigation keys (`cd`, `dir`).
* **Daily Challenge**: `Get-ChildItem` cmdlet के primary aliases check list compile करें (जैसे `ls`, `dir`, `gci`)। Environment drive (`Env:\`) navigate करें और list values print करें।
* **Mastery Check**: PSDrive concept क्या है and non-filesystem database keys/registries को structure interface list mapping values retrieve करने में इसका क्या advantage है?

### Day 034: Object Pipeline vs Text Streams
* **Topic**: Core pipeline mechanism (`|`), passing complete objects across pipeline stages instead of plain string buffers, property metadata introspection.
* **Daily Challenge**: Bash के `ls -la | grep "error"` structure configuration को equivalent pwsh command chain (`Get-ChildItem | Where-Object`) से map करें, objects properties filter testing verification execute करें।
* **Mastery Check**: Pipeline strings parsing (e.g. awk/sed patterns) की जगह typed properties selection models implementation system performance and reliability क्यों improve करता है?

### Day 035: Filtering Pipeline Objects (Where-Object)
* **Topic**: Pipeline filter matching `Where-Object` (alias `?`), script block syntax `? { $_.Property -eq Value }` vs simplified direct matching syntax `? Property -eq Value`, automatic collection item variables reference (`$PSItem` or `$_`).
* **Daily Challenge**: Running system services get list compile: write dynamic filters to select services whose status is running (`Get-Service | Where-Object Status -eq Running`), evaluate outputs.
* **Mastery Check**: Filter scripts code elements inside `$PSItem` and `$_` evaluation sequences mappings difference details.

### Day 036: Projecting & Formatting Pipeline Objects
* **Topic**: Slicing specific attributes using `Select-Object`, formatting layouts (`Format-Table`, `Format-List`), custom ordering options (`Sort-Object`).
* **Daily Challenge**: Current processes listing compile structure: Fetch processes (`Get-Process`), select only Name, Id, and CPU fields, sort by CPU usage descending, and format as table view output.
* **Mastery Check**: Why formatting cmdlets (`Format-Table`, `Format-List`) must always be called at the absolute end of the command pipeline pipeline sequence?

### Day 037: Week 5 Review & Mini-Project: Pipeline Log Analyzer
* **Topic**: Composing pipelines pipelines structures, data filtering, objects transformations, files metrics aggregation.
* **Daily Challenge**: Mini-Project: Parse simulated systems error logs files (or active EventLog records systems): extract error levels, group records by EventId/source keyword metrics, sort occurrences counts.
* **Mastery Check**: `Group-Object` cmdlet pipe inputs parameters matching count mappings compute structures layout internally कैसे calculate करता है?

---

## 📅 Week 6: Operators, Variables, Scopes & Objects (डे 038 - 044)

### Day 038: PowerShell Variables, Scopes & Auto-Variables
* **Topic**: Creating dynamic variables (`$var`), scope rules (Global, Local, Script, Private), default automatic variables (`$null`, `$OFS`, `$PSScriptRoot`, `$Home`).
* **Daily Challenge**: Local scopes validation trace: build nested script structures trying to update parent script scope variable values from child function scopes, verify dynamic modifiers constraints (e.g. `$script:var`).
* **Mastery Check**: `$PSScriptRoot` automatic variables relative paths file configurations load operations runtime paths checks में dynamic advantage.

### Day 039: Type System & Coercions
* **Topic**: Strongly-typed object system, type-checking operators (`-is`, `-isnot`), type casting modifiers (`[int]`, `[string]`), comparison evaluations (`-eq`, `-gt`, `-lt`, case-sensitive variants `-ceq`, `-cgt`).
* **Daily Challenge**: Execute values comparisons testing type coercion engine: evaluate comparisons between string representation numbers (`"10"`) and numerical limits (`10`), test matches behavior.
* **Mastery Check**: PowerShell dynamic comparison type coercion models evaluation left-operand type target matching resolution sequence?

### Day 040: The Left-Operand Coercion Trap
* **Topic**: Behavior of comparison operators when the left-hand operand is a collection (filtering mode) vs a scalar (standard boolean comparison), type casting pitfalls.
* **Daily Challenge**: Run collection evaluations: compare array collection `1,2,3,4,2 -eq 2` and analyze outputs. Contrast with `2 -eq 1,2,3,4,2` scalar comparisons execution paths.
* **Mastery Check**: Explain why `$array -eq $val` returns an array of matched elements instead of a boolean value.

### Day 041: Custom Objects (PSCustomObject)
* **Topic**: Declaring custom property data structures (`[PSCustomObject]`), syntax shortcuts using hashtables literal wrappers `[PSCustomObject]@{Key=Value}`, legacy `New-Object -TypeName PSObject` comparison.
* **Daily Challenge**: Build dynamic asset info inventory block: collect details about active folder, count items, compute average size, compile properties into a single `PSCustomObject`, output details.
* **Mastery Check**: Key design efficiency differences between `New-Object PSObject` creation latency vs `[PSCustomObject]@{}` type accelerator literals.

### Day 042: Custom Properties & Calculated Properties
* **Topic**: Adding dynamic members to existing structures (`Add-Member`), calculated properties syntax arrays `@{Name="Header"; Expression={...}}` in `Select-Object` or `Format-Table`.
* **Daily Challenge**: Generate detailed processes status log: fetch processes using `Get-Process`, add a dynamic property calculated field showing CPU usage in MB instead of raw CPU seconds counters.
* **Mastery Check**: Calculated property key-value structure configuration keys names variants (`Label`/`Name` and `Expression`/`hash`).

### Day 043: Splatting Hashtables
* **Topic**: Clean cmdlets parameter passing via Splatting `@params` syntax, compiling parameters maps inside hashtables keys, passing parameters clean readability.
* **Daily Challenge**: Define multiple arguments configuration parameters for `Get-ChildItem` (e.g. Filter, Path, Recurse, Depth) inside a hashtable. Call cmdlet executing splatting parameters, test result.
* **Mastery Check**: Splatting execute parameter indicators syntax differences: why we use `@parameter` symbol instead of standard variable indicator `$` during call invocation?

### Day 044: Week 6 Review & Mini-Project: System Status Object Compiler
* **Topic**: Custom objects compile pipelines, parameters maps splatting, object conversions.
* **Daily Challenge**: Build hardware diagnostics profile script: get system OS details, disk space info, memory limits, group metrics into structured PSCustomObject using splatted queries, print structured results format.
* **Mastery Check**: How do you convert a `PSCustomObject` into a standard clean formatted JSON file using pwsh built-in cmdlets?

---

## 📅 Week 7: Advanced Flow Control, Strings, Hashtables & Arrays (डे 045 - 051)

### Day 045: Loops & Foreach Controls
* **Topic**: The `foreach` programming loop keyword syntax vs `ForEach-Object` pipeline process cmdlet, execution speed variations, memory allocations traps.
* **Daily Challenge**: Process large list array items (e.g. 10,000 integers). Run benchmark timers using `Measure-Command` comparing `foreach ($item in $collection)` block versus `$collection | ForEach-Object { ... }`.
* **Mastery Check**: Why does pipeline `ForEach-Object` run slower but consume significantly less RAM when processing massive streams?

### Day 046: Advanced Switch Statements
* **Topic**: Power of `switch` blocks in PowerShell: processing collection values, matching wildcards `-Wildcard`, regex patterns `-Regex`, processing files lines directly `-File`.
* **Daily Challenge**: Process system server lines config files (or mock records array text lines): evaluate strings using regex switch matching server ports mappings, print logs categories dynamic status.
* **Mastery Check**: How does switch execution change when passing multiple items array collection directly to switch arguments inputs?

### Day 047: Arrays, ArraySlicing & Performance Optimization
* **Topic**: Fixed size array default collections, array index slices (`$array[0..3]`), performance penalties of list growth via `+=` operators, utilizing dynamic lists generic type bindings (`[System.Collections.Generic.List[Object]]`).
* **Daily Challenge**: Verify execution speed comparison: build list size 20,000 using standard `+=` array appends. Re-run execution block utilizing generic dotnet List append `Add()` method. Compare runtimes.
* **Mastery Check**: Why `+=` operator creates a complete new array allocation behind the scenes under memory engine?

### Day 048: Hashtables vs Ordered Hashtables
* **Topic**: Key-value store maps syntax (`@{}`, keys/values iteration), unordered default hash tables keys hashing layouts, ordered hashtables specifications using type casting tag `[ordered]@{}`.
* **Daily Challenge**: Create standard lookup map mapping system error codes to messages. Create another ordered map layout. Verify items order alignment outputs printing keys sequence logs.
* **Mastery Check**: `Ordered` casting indicator constraints limits: why we must define `[ordered]` modifier only at literal hashtables creations declarations instead of casting existing maps?

### Day 049: String Manipulation & Sub-Expressions
* **Topic**: Double-quoted strings interpolation parameters, sub-expression syntax wrappers `"$($object.property)"`, Here-Strings multi-line texts formatting syntax `@""@`, operator helper strings: `-join`, `-split`, regex `-replace`.
* **Daily Challenge**: Create multi-line email alert template using Here-Strings mapping variables data fields dynamically resolved inside template interpolation blocks, output final strings logs.
* **Mastery Check**: Difference between single-quoted strings and double-quoted strings regarding variables rendering.

### Day 050: Regular Expressions and Matches Variable
* **Topic**: Integration of regex patterns inside pwsh, using `-match` operator, automatic results storage variable `$Matches`, extracting named regex captures patterns.
* **Daily Challenge**: Read system network IP configs/regex text lines: write pattern extracting dynamic segments, match pattern, inspect `$Matches` hashtables indexes fields values.
* **Mastery Check**: `$Matches` array automatic variable scopes limits: does it preserve match values after running a different subsequent match?

### Day 051: Week 7 Review & Mini-Project: Config File Parser
* **Topic**: Structural loops parsing, hashtables nesting, regex text segmenting.
* **Daily Challenge**: Create text-based settings parser: read multi-line `.ini` configuration structure, isolate sections fields headers, map keys into nested ordered hashtables properties blocks.
* **Mastery Check**: How does `System.IO.File` static methods read speeds contrast with standard `Get-Content` cmdlet logs reads?

---

## 📅 Week 8: Functions, Modules, Error Handling & .NET Integration (डे 052 - 060)

### Day 052: Basic Functions & Parameter Declarations
* **Topic**: Declaring custom functions syntax, parameter lists definitions using `param()` blocks, configuring type constraints, setting default parameters values.
* **Daily Challenge**: Create a clean function `Get-BackupReport` accepting target logs paths parameters, outputting simple processed files counts details.
* **Mastery Check**: How does parameter parsing work when calling custom functions vs calling .NET method arguments?

### Day 053: Advanced Functions & CmdletBinding validations
* **Topic**: Custom cmdlets attributes declarations `[CmdletBinding()]`, advanced input validations constraints (`[ValidateNotNullOrEmpty()]`, `[ValidateSet()]`, `[ValidateRange()]`), mandatory options (`[Parameter(Mandatory=$true)]`).
* **Daily Challenge**: Write advanced utility function `Restart-AppService` requiring a Validated ServiceName parameter restricted to specific sets inputs, support verbose output logging logs.
* **Mastery Check**: What changes when adding `[CmdletBinding()]` indicator to standard parameter declarations (e.g. enabling `-Verbose`, `-Debug` default systems flags)?

### Day 054: Advanced Functions & Pipeline Inputs
* **Topic**: Function pipeline integrations, mapping pipeline properties (`ValueFromPipeline`, `ValueFromPipelineByPropertyName`), lifecycle execution blocks `begin {}`, `process {}`, `end {}`.
* **Daily Challenge**: Build a pipeline script processor: create function processing list of system assets, run core logic inside `process` block to handle streamed objects sequentially, output properties results.
* **Mastery Check**: Why processing data array collections inside `process` block is mandatory for pipeline functions?

### Day 055: PowerShell Modules and Manifests
* **Topic**: Creating script modules files (`.psm1`), exporting commands functions using `Export-ModuleMember`, defining module manifest files configuration (`.psd1`) metadata, modules path locations.
* **Daily Challenge**: Package custom functions written during previous days inside module folder `MySystemTools`. Create manifest details file, import module runtime verify active operations.
* **Mastery Check**: What is the lookup precedence path array listed inside `$env:PSModulePath` environment variable?

### Day 056: Error Handling Streams & Try/Catch
* **Topic**: Troubleshooting systems errors, inspecting the `$error` automatic collection array database, executing try-catch-finally script blocks, reading error information logs with `$_.Exception.Message` or `$PSItem`.
* **Daily Challenge**: Write a filesystem path check script wrap within Try-Catch blocks: access protected files directories triggering permissions exceptions, catch issues, print customized logs.
* **Mastery Check**: How does `$error[0]` array references tracking evaluate historical error logs entries sequence?

### Day 057: Non-Terminating Errors vs Terminating Errors
* **Topic**: Understanding error severity types: non-terminating (cmdlet failures that don't stop loops) vs terminating (fatal failures halting script), using `-ErrorAction Stop` argument modifier to elevate errors, `throw` statements.
* **Daily Challenge**: Test `Get-Content` on non-existent file path: verify default error handling, apply `-ErrorAction Stop` override parameter inside Try-Catch to force catch execution.
* **Mastery Check**: What is the global default variable `$ErrorActionPreference` utility configurations default settings?

### Day 058: .NET Integration & Class Library Loading
* **Topic**: Accessing complete .NET runtime assemblies from pwsh, static class members methods syntax (`[System.Math]::PI`, `[System.Guid]::NewGuid()`), instantiating custom dotnet classes using `New-Object` or `[Type]::new()` constructors.
* **Daily Challenge**: Call cryptographic dotnet methods class packages: generate unique hash values from file stream data bytes utilizing `[System.Security.Cryptography.SHA256]` APIs.
* **Mastery Check**: How do you dynamically load external third-party compiled Assemblies dll files using `Add-Type` cmdlet?

### Day 059: Cryptographic Script Signing & Security
* **Topic**: Security controls of executable scripts, checking authenticity signature `Get-AuthenticodeSignature`, signing script files command layout `Set-AuthenticodeSignature`, using certificate authority stores paths (`cert:\`).
* **Daily Challenge**: Create local testing self-signed code-signing certificate (or mock certificates paths configurations maps): verify signing command syntax steps, trace verification processes.
* **Mastery Check**: If execution policy is configured to `AllSigned`, what happens when a script is modified by even one character after signing?

### Day 060: Module 2 Capstone Project: Multi-threaded Process & Disk Audit System
* **Topic**: Full scope integration: advanced cmdlets pipeline inputs, PSCustomObjects compile, dotnet class methods, try-catch handlers, output formatting files.
* **Daily Challenge**: Write a PowerShell script that parses system configurations properties, runs parallel performance query audit tasks (using Background Jobs `Start-Job` or thread pool helpers), evaluates memory/disk states, logs exceptions to files, exports clean data to JSON, and executes under signed/secure constraints configurations.
* **Mastery Check**: Run and verify the Capstone audit tool under execution policies, testing error catches on illegal file accesses.

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[06. Systems Developer Syllabus (संक्षिप्त सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/06-learning-syllabus.md)**
* **[07. 180-Day Day-by-Day Syllabus (पूरा सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/07-day-by-day-syllabus.md)**
* **[08. Month 1 Day-by-Day Syllabus (डे 1 - 30)](file:///home/narayanas/Documents/CuriousWiki/docs/08-month-1-syllabus.md)**
* **[10. Month 3 Day-by-Day Syllabus (डे 61 - 90)](file:///home/narayanas/Documents/CuriousWiki/docs/10-month-3-syllabus.md)**
* **[11. Month 4 Day-by-Day Syllabus (डे 91 - 120)](file:///home/narayanas/Documents/CuriousWiki/docs/11-month-4-syllabus.md)**
* **[12. Month 5 Day-by-Day Syllabus (डे 121 - 150)](file:///home/narayanas/Documents/CuriousWiki/docs/12-month-5-syllabus.md)**
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
