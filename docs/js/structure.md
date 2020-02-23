---
id: structure
title: "Gillian-JS: Folder Structure"
---

`Gillian-JS` can be found in the `Gillian-JS` folder of the repository. Its implementation consists of the following:

- **Gillian-JS**
  - `bin`: The Gillian-JS binary
  - `environment`: Execution environment, not part of the repository, created using `esy init:env`. All analyses are normally run from within this folder.
  - `examples`: Various examples
    - `Fantine`: Bi-abduction examples (out of scope)
    - `Cosette`: Symbolic testing examples
      - `buckets`: Tests for the Buckets.js library
      - `case_studies`: Data structures used for initial evaluation (not reported)
    - `JaVerT`: Verification examples (out of scope)
  - `lib`: The core of Gillian-JS
    - `compiler`: The JS-2-GIL compiler
    - `JSIL`: Syntax of JSIL and related constructs
    - `JSLogic`: Verification-related constructs (assertions, predicates, specifications, etc.) (out of scope)
    - `parsing`: JSIL parsing (programs, annotations, etc.)
    - `semantics`: Implementation of concrete and symbolic memory models
      - `CObject.ml`: Concrete objects
      - `CHeap.ml`: Concrete heaps
      - `JSILCMemory.ml`: Concrete memory
      - `SFVL.ml`: Symbolic field-value lists
      - `SHeap.ml`: Symbolic heaps
      - `JSILSMemory.ml`: Symbolic memory
    - `test262`: Bulk testing for the Test262 test suite
    - `utils`: Various utilities (configuration, I/O, etc.)
  - `runtime`: JS-2-GIL compiler runtime (JSIL implementations of JavaScript internal and built-in functions)
  - `scripts`: Various scripts used for setting up the environment and running the analyses