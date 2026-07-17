# 📚 10. Month 3: Systems Foundations: C Programming & Memory Management (डे-बाई-डे सिलेबस)

यह syllabus Month 3 (Day 061 - 090) के लिए एक विस्तृत दैनिक कार्यक्रम (day-by-day plan) है। इसका मुख्य उद्देश्य आपको **C Language Compilation Toolchain, Memory Allocation, Pointer Arithmetic, Data Structures, Concurrency (Threads), compiler optimizations, safety constraints, Undefined Behavior (UB),** और **Memory Audits (Valgrind)** का master बनाना है।

प्रत्येक दिन के लिए **Topic**, **Daily Challenge (व्यावहारिक कार्य)**, और **Mastery Check** दिए गए हैं।

---

## 📅 Week 9: Compiler Stages & Core Operators (डे 061 - 067)

### Day 061: Hello World, Preprocessor Blocks & Trigraphs
* **Topic**: GCC compiler toolchain stages, K&R C vs C11 standard differences, block-out code sections using preprocessor (`#if 0`), trigraph pitfalls (`??/` resolves to `\`).
* **Daily Challenge**: Compile hello world using gcc compilation output phases (`-E`, `-S`, `-c`), write code with block-out sections.
* **Mastery Check**: what are trigraph sequences and why can they cause unexpected comments execution?

### Day 062: Fixed-Width Integers & Declarations
* **Topic**: Fixed width integer types (`stdint.h` since C99 like `int32_t`, `uint64_t`), literal suffixes (`L`, `ULL`), right-left/spiral rules to decipher complex declarations (e.g. pointer to array of function pointers).
* **Daily Challenge**: Write program printing exact bytes sizing limits of types, decode complex declaration strings.
* **Mastery Check**: Explain difference between `int_fast8_t` and `int_least8_t`.

### Day 063: Bitwise & Arithmetic Operators
* **Topic**: Operators relational/arithmetic, bitwise manipulation (`&`, `|`, `^`, `~`, `<<`, `>>`), Logical operators short-circuit evaluation trap, sizeof operator rules.
* **Daily Challenge**: Swap two numbers using bitwise XOR without additional variable allocations, test short-circuit logical triggers.
* **Mastery Check**: what is the return type of `sizeof` operator?

### Day 064: Type Qualifiers & Alignments
* **Topic**: Volatile variables preventing compiler optimization, const constraints, `_Alignof` and structure alignment offsets rules.
* **Daily Challenge**: Declare volatile pointers to verify register read constraints, print variables offset alignments.
* **Mastery Check**: explain why modifying a const variable using pointers results in undefined behavior.

### Day 065: Boolean Models & Conditions
* **Topic**: `stdbool.h` C99 bool representations, `_Bool` intrinsic type, typedef bool models, selection statements nested ladders.
* **Daily Challenge**: Implement validation functions evaluating pointers and integers inside Boolean checks.
* **Mastery Check**: evaluate expressions truth values in C where pointer is non-null but value is zero.

### Day 066: Loops, Control flow & Duff's Device
* **Topic**: Loops (for, while, do-while), loop unrolling logic, Duff's Device loop optimization technique, goto statement jump out nested loops.
* **Daily Challenge**: Implement high-speed block data copying routine using Duff's Device array index increments.
* **Mastery Check**: explain flow of execution inside Duff's Device switch-case loop wrapper.

### Day 067: Command Arguments & getopt
* **Topic**: Argument count/vector parsing (`argc`, `argv`), positional parameters parsing using GNU `getopt` tools.
* **Daily Challenge**: Create command-line compiler configuration utility parsing flags (`-c`, `-o`, `-v`) with `getopt`.
* **Mastery Check**: parsing argv returns correct flag parameters validation.

---

## 📅 Week 10: Strings, Literals & Complex Arrays (डे 068 - 074)

### Day 068: Strings basics & calculation
* **Topic**: character arrays vs string literals, strlen calculation, copying strings safely.
* **Daily Challenge**: Write custom dynamic string length calculator loop.
* **Mastery Check**: String literal write access violation check.

### Day 069: String Tokenization & Comparison
* **Topic**: strtok, strtok_r thread-safe tokenization, strcmp, strcasecmp comparisons.
* **Daily Challenge**: Tokenize comma-separated configs file inputs strings lists.
* **Mastery Check**: strtok internal state pointers modifications rules.

### Day 070: Safe String conversions
* **Topic**: strtoX conversion routines (strtol, strtof), avoiding dangerous functions (atoi, atof).
* **Daily Challenge**: Parse dirty numeric strings inputs catch overflows errors with `errno`.
* **Mastery Check**: why is `atoi` considered unsafe for system programming?

### Day 071: Compound Literals & Numeric Literals
* **Topic**: Floating point literals formats, compound literals initialization syntax (`(struct Point){x, y}`).
* **Daily Challenge**: Pass inline initialized structures parameters directly functions.
* **Mastery Check**: compound literal scoping lifetimes.

### Day 072: Arrays & Memory layouts
* **Topic**: arrays allocation, row-major memory efficiency layout iteration, clearing array (memset).
* **Daily Challenge**: Build matrix transposing iterator parsing 2D blocks.
* **Mastery Check**: caching cache-miss effects of traversing arrays column-major vs row-major.

### Day 073: Multi-dimensional Arrays decay
* **Topic**: pass arrays to functions, array decay rules, passing flat arrays as 2D arrays.
* **Daily Challenge**: Write procedure computing values in flattened array mapping indices to 2D matrix structure.
* **Mastery Check**: pointer conversion array decayed behaviors.

### Day 074: Bit-fields configurations
* **Topic**: Struct bit-fields layouts, variable sizing alignments rules.
* **Daily Challenge**: Define system structure packing flags state values inside small bit-fields verify size constraints.
* **Mastery Check**: bitfield address-of operator restrictions (why cannot you take address of bitfield?).

---

## 📅 Week 11: Dynamic Memory & Advanced Pointers (डे 075 - 081)

### Day 075: Pointers Basics & Addresses
* **Topic**: Address-of operator `&`, pointer dereferencing `*`, pointers assignments.
* **Daily Challenge**: Modify variables contents using indirect pointer offsets.
* **Mastery Check**: dereferenced value check.

### Day 076: Const Pointers variations
* **Topic**: const int* vs int* const vs const int* const, pointer parameters modification restrictions.
* **Daily Challenge**: Compile configurations proving type constraint violations.
* **Mastery Check**: syntax differentiation values check.

### Day 077: Pointer Arithmetic & decays
* **Topic**: pointer increments offsets math, array element offsets, pointer comparison checks.
* **Daily Challenge**: Parse array elements sequential loops using raw pointer arithmetic.
* **Mastery Check**: offset scaling matching types.

### Day 078: Double pointers
* **Topic**: Pointer to pointer assignments, dynamic arrays allocations.
* **Daily Challenge**: Modify dynamic arrays target allocations inside function using double pointer.
* **Mastery Check**: allocation updates check.

### Day 079: Dynamic Allocations (malloc/calloc)
* **Topic**: stack vs heap allocations, malloc heap sizes, calloc zero initialization allocations.
* **Daily Challenge**: Allocate dynamic memory strings buffers verify contents initialization states.
* **Mastery Check**: return null validations on memory full.

### Day 080: Resizing & leaks (realloc/free)
* **Topic**: realloc, memory leaks, free deallocations, Valgrind memory leak checks.
* **Daily Challenge**: Write dynamically expanding string array resizing buffers using realloc, audit memory leaks with Valgrind.
* **Mastery Check**: realloc returns temp memory check.

### Day 081: Polymorphic void pointers
* **Topic**: generic data passing void pointers `void*`, explicit castings.
* **Daily Challenge**: Write generic swap function using void* parameters and memcpy.
* **Mastery Check**: polymorphic type castings validation.

---

## 📅 Week 12: Structs, UB, Advanced Preprocessors & Threads (डे 082 - 090)

### Day 082: Structs padding, packing & Flexible Array Members
* **Topic**: struct padding offsets calculations, `#pragma pack` directives, structs containing flexible arrays (`type[]`).
* **Daily Challenge**: Create dynamically sized struct payload structure packing metadata.
* **Mastery Check**: sizeof calculation checks.

### Day 083: Linked Lists (Doubly Linked)
* **Topic**: doubly linked list node allocations, list reversals, node insertion targets.
* **Daily Challenge**: Implement complete doubly linked lists add search delete nodes reverse list.
* **Mastery Check**: node link pointers checks.

### Day 084: File IO streams
* **Topic**: File pointer stream controls, binary read/write structures, dynamic reading lines (`getline`).
* **Daily Challenge**: Write database serializer saving loaded structures direct binary streams.
* **Mastery Check**: file pointer validations.

### Day 085: Undefined Behavior (UB) & Sequence Points
* **Topic**: Sequence points constraints, Undefined Behaviors rules (free twice, deref freed, signed integer overflow, data race, null pointer deref).
* **Daily Challenge**: Write test cases showing variables states modifications violating sequence rules.
* **Mastery Check**: sequence points triggers.

### Day 086: Preprocessors & Function-like Macros
* **Topic**: Include guards (`#ifndef`), token pasting (`##`), macro expansion, predefined macros (`__LINE__`, `__FILE__`).
* **Daily Challenge**: Build custom print logger macro injecting filename and line number to print stream.
* **Mastery Check**: macro replacement pitfalls.

### Day 087: Varargs & Generic Selections
* **Topic**: variable arguments `va_list` functions parsing, `_Generic` compile-time type selections.
* **Daily Challenge**: Write dynamic generic type printer function using `_Generic` selection macro templates.
* **Mastery Check**: compile generic selectors outputs.

### Day 088: Inline Assembly & C11 Threads
* **Topic**: `__asm__` inline assembly block insertion rules, multithreading using standard `threads.h` (C11 threads), atomics (`stdatomic.h`).
* **Daily Challenge**: Write parallel numbers generator tracking output count using atomic variables.
* **Mastery Check**: thread safety parameters.

### Day 089: IPC Semaphores & Testing Frameworks
* **Topic**: Interprocess communication (IPC semaphores), unit testing in C (Unity/CMocka testing frameworks).
* **Daily Challenge**: Write automated CMocka test suite testing custom data structure functions.
* **Mastery Check**: test assert configurations checks.

### Day 090: Module 3 graduation project
* **Topic**: Build custom memory database engine in C parsing commands, validating bounds, showing zero leaks in Valgrind.
* **Daily Challenge**: Complete final database memory engine build test.
* **Mastery Check**: zero memory leaks reported, zero UB flags.

---

## 🔗 Related Documentation (संबंधित दस्तावेज़)
* **[06. Systems Developer Syllabus (संक्षिप्त सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/06-learning-syllabus.md)**
* **[07. 180-Day Day-by-Day Syllabus (पूरा सिलेबस)](file:///home/narayanas/Documents/CuriousWiki/docs/07-day-by-day-syllabus.md)**
* **[08. Month 1 Day-by-Day Syllabus (डे 1 - 30)](file:///home/narayanas/Documents/CuriousWiki/docs/08-month-1-syllabus.md)**
* **[09. Month 2 Day-by-Day Syllabus (डे 31 - 60)](file:///home/narayanas/Documents/CuriousWiki/docs/09-month-2-syllabus.md)**
* **[11. Month 4 Day-by-Day Syllabus (डे 91 - 120)](file:///home/narayanas/Documents/CuriousWiki/docs/11-month-4-syllabus.md)**
* **[12. Month 5 Day-by-Day Syllabus (डे 121 - 150)](file:///home/narayanas/Documents/CuriousWiki/docs/12-month-5-syllabus.md)**
* **[README Index (मुख्य निर्देशिका)](file:///home/narayanas/Documents/CuriousWiki/docs/README.md)**
