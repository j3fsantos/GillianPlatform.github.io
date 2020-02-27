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
  - `bin`: Contains the Gillian-C binary
  - `environment`: Execution environment, not part of the repository, created using `esy init:env`. It contains useful scripts for testing Gillian-C, and examples are copied in it so that they can be safely modified.
  - `examples`: Various examples
    - `concrete`: Small data-structure examples for concrete execution
    - `symbolic`: Small data-structure examples for symbolic testing
    -
