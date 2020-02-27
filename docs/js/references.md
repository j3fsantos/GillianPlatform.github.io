---
id: references
title: 'Gillian-JS: References'
---

## JaVerT: JavaScript Verification Toolchain

### Authors

- José Fragoso Santos
- Petar Maksimović
- Daiva Naudžiūnienė
- Thomas Wood
- Philippa Gardner

### Abstract

The dynamic nature of JavaScript and its complex semantics make it a difficult target for logic-based verification. We introduce JaVerT, a semi-automatic JavaScript Verification Toolchain, based on separation logic and aimed at the specialist developer wanting rich, mechanically verified specifications of critical JavaScript code. To specify JavaScript programs, we design abstractions that capture its key heap structures (for example, prototype chains and function closures), allowing the developer to write clear and succinct specifications with minimal knowledge of the JavaScript internals. To verify JavaScript programs, we develop JaVerT, a verification pipeline consisting of: JS-2-JSIL, a well-tested compiler from JavaScript to JSIL, an intermediate goto language capturing the fundamental dynamic features of JavaScript; JSIL Verify, a semi-automatic verification tool based on a sound JSIL separation logic; and verified axiomatic specifications of the JavaScript internal functions. Using JaVerT, we verify functional correctness properties of: data-structure libraries (key-value map, priority queue) written in an object-oriented style; operations on data structures such as binary search trees (BSTs) and lists; examples illustrating function closures; and test cases from the official ECMAScript test suite. The verification times suggest that reasoning about larger, more complex code using JaVerT is feasible.

### Venue

PACMPL, vol. 2(POPL), pp. 50:1–50:33

### Publication Date

2019

### Identifiers

- DOI:[doi:10.1145/3158138](http://dx.doi.org/10.1145/3158138)

## Cosette: Symbolic Execution For JavaScript

### Authors

- José Fragoso Santos
- Petar Maksimović
- Daiva Naudžiūnienė
- Thomas Wood
- Philippa Gardner

### Abstract

We present a framework for trustworthy symbolic execution of JavaScripts programs, whose aim is to assist developers in the testing of their code: the developer writes symbolic tests for which the framework provides concrete counter-models. We create the framework following a new, general methodology for designing compositional program analyses for dynamic languages. We prove that the underlying symbolic execution is sound and does not generate false positives. We establish additional trust by using the theory to precisely guide the implementation and by thorough testing. We apply our framework to whole-program symbolic testing of real-world JavaScript libraries and compositional debugging of separation logic specifications of JavaScript programs.

### Venue

Proceedings of the 20th International Symposium on Principles and Practice of Declarative Programming, PPDP 2018, Frankfurt am Main, Germany, September 03-05, 2018, pp. 11:1–11:14

### Publication Date

Sep 2018

### Identifiers

- DOI:[doi:10.1145/3236950.3236956](http://dx.doi.org/10.1145/3236950.3236956)

## JaVerT2.0: Compositional Symbolic Execution for JavaScript

### Authors

- José Fragoso Santos
- Petar Maksimović
- Gabriela Sampaio
- Philippa Gardner

### Abstract

We propose a novel, unified approach to the development of compositional symbolic execution tools, bridging the gap between classical symbolic execution and compositional program reasoning based on separation logic. Using this approach, we build JaVerT 2.0, a symbolic analysis tool for JavaScript that follows the language semantics without simplifications. JaVerT 2.0 supports whole-program symbolic testing, verification, and, for the first time, automatic compositional testing based on bi-abduction. The meta-theory underpinning JaVerT 2.0 is developed modularly, streamlining the proofs and informing the implementation. Our explicit treatment of symbolic execution errors allows us to give meaningful feedback to the developer during wholeprogram symbolic testing and guides the inference of resource of the bi-abductive execution. We evaluate the performance of JaVerT 2.0 on a number of JavaScript data-structure libraries, demonstrating: the scalability of our whole-program symbolic testing; an improvement over the state-of-the-art in JavaScript verification; and the feasibility of automatic compositional testing for JavaScript.

### Venue

PACMPL 3(POPL)

### Publication Date

2019

### Identifiers

- DOI:[doi:10.1145/3290379](http://dx.doi.org/10.1145/3290379)
