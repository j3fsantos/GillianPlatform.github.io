---
id: developing
title: Developing Gillian
---

This page describes our workflow when developing Gillian, if you are interested in contributing, or if you want to play with the source code.

### Executing a command in the test environment

`esy` lets you execute a command in a [test environment](https://esy.sh/docs/en/environment.html#test-environment) where every built binaries and installed files are correctly in your path. In particular, Gillian-JS, Gillian-C and Wisl export some environment variable that allow them to properly find their respective runtime files.

To run any command under this environment, run

```shell
esy x CMD
```

In particular, to access the different manuals, you can use:

```shell
esy x gillian-js --help
esy x gillian-c --help
```

To get more precise help on the verification mode of Gillian-JS in particular for example, use:

```shell
esy x gillian-js verify --help
```

### Rebuilding after modifications

As we use `esy` as our package manager / build system, after every modification, running the `esy` command without argument is enough to rebuild the project.

<!-- prettier-ignore-start -->
:::info
Due to a bug in the current version of esy, the `esy` command has to called from the root of the workspace for the modifications to apply properly.
:::
<!-- prettier-ignore-end -->
