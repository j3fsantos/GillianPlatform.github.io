---
id: structure
title: 'Gillian-C: Folder Structure'
---

<!-- prettier-ignore-start -->
:::info
Folders marked with the (:x:PLDI20) annotation are out of scope of the PLDI 2020 Gillian Paper.
:::
<!-- prettier-ignore-end -->

`Gillian-C` can be found in the `Gillian-C` folder of the repository. Its implementation implementation consists of the following:

- **Gillian-C**
  - `bin`: Contains the source of the `gillian-c` executable.
  - `environment`: Execution environment, not part of the repository, created using `esy init:env`. It contains useful scripts for testing Gillian-C, and examples are copied in it so that they can be safely modified.
  - `examples`: Various examples
    - `concrete`: Small data-structure examples for concrete execution
    - `symbolic`: Small data-structure examples for symbolic testing
    - `klee`: Same small data-structure examples as in `symbolic` but written for usage with Klee.
    - `verification`: Small data-structure examples for verification mode (:x:PLDI20)
    - `act`: Small data-structure examples for Automatic Compositional Testing mode (:x:PLDI20)
  - `lib`: The core of Gillian-C
    - `gilgen.ml/mli`: Compiler for C#m to GIL
    - `gil_logic_gen.ml`, `annot_lexer.mll`, `annot_parser.mly`, `cLogic.ml`: Utils for handling a small annotation language for C (:x:PLDI20)
    - `valueTranslation.ml/mli`: Serialisation and deserialisation of CompCert values into GIL values
    - `semantics.ml/mli`: Symbolic Memory model and Concrete memory model
    - `cRunner.ml`, `sRunner.ml`: Configuration for the symbolic and concrete bulk testers (`gillian-c bulk-wpst` and `gillian-c bulk-exec`)
    - Other files: Utils such as name generators or configuration flags.
  - `runtime`: Implementation of the internals and part of the C standard lib in GIL
  - `scripts`: Various scripts for setting up the environment and executing analyses
