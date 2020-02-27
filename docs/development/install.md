---
id: install
title: Setting up for development
---

This section details how to set up Gillian in order to develop on it. It is useful for:

- People evaluating Gillian as a paper artifact
- People wanting to contribute to the project
- People generally curious about the project

The Gillian development repository contains :

- The GillianCore folder, which is actually the Gillian Library.
- [Gillian-JS](../js/intro)
- [Gillian-C](../c/intro)
- WISL, a small language for teaching and research.

## What type of installation should I chose ?

Gillian **should** work on most Linux and macOS machine, and cannot be installed on Windows machines for now. We do not have a large range of different machines to test it on, so there might also be compatibility issues with some Linux or old versions of macOS. We primarily tested on :

- macOS Catalina - x86_64
- Ubuntu 18.04.4 LTS - x86_64

If your machine is running Linux or macOS, we encourage you to install the development environment directly on your machine. The installation is safe and will not disrupt your current setup (see [sandboxing](#sandboxing)).

If the installation does not work on your machine, or if you are running Windows, please follow the steps for [Docker installation](#docker) or download the proposed virtual machine.

## Linux and macOS

### Sandboxing

We make use of [esy](https://esy.sh) for dependency management, which sandboxes the dependencies. Apart from the very few external dependencies (including esy), installing Gillian's dependency **will not** affect any current environment you have (including your opam switches) and it should therefore be perfectly safe to install the development environment directly on your machine.

### External dependencies

#### Installing esy

Esy is installed through NPM. Therefore, one should first [install NodeJS](https://nodejs.org/en/download/package-manager/). Our project does not use NodeJS or NPM, but for now, it is the only way to install Esy. If you do not already have NodeJS installed and do not want to install it, please use the [Docker installation](#docker) or the Virtual Machine.

To install Esy, run:

```bash
npm install -g esy
```

Some machines may require sudo rights to install esy globally, in that case, run:

```bash
sudo npm install -g esy --unsafe-perm
```

#### Other dependencies

The development environment of Gillian requires the machine to have some basic developer tools installed.

##### On Linux

On Debian or Ubuntu, one should run the following command:

```bash
sudo apt-get update
sudo apt-get install curl git build-essential m4
```

On other Linux distributions, please install similar packages using your favourite package manager or from source directly.

##### On macOS

The XCode command line tools should be installed on your machine. If it is not already done, please run the following command and follow the installation instructions.

```zsh
xcode-select --install
```

Then, make sure that your development tools are up to date.

### Getting the source code

<!-- prettier-ignore-start -->
:::info
If you are evaluating Gillian as an artifact, please use the source code provided to you as part of the artifact submission.
:::
<!-- prettier-ignore-end -->

In your terminal, go into your desired folder and run:

```bash
git clone [insert url] Gillian
cd Gillian
```

### Installing dependencies and building

Thanks to esy, it is extremely simple to build the entire Gillian platform (including Gillian-C and Gillian-JS). In the Gillian folder, simply run :

```bash
esy
```

This may take a while, as it is installing and building sandboxed versions of every dependencies, including OCaml and Z3.

## Docker

We explain how to get the docker container up and ready for development inside a docker environment. Note that the docker images are not persistent.

### Getting the docker image

There are two ways of getting the docker image with the development environment : building it yourself of pulling it from the docker hub.

<!-- prettier-ignore-start -->
:::info
If you are evaluating Gillian as an artifact, please build the image yourself from the provided repository, or pull the docker image with the tag associated to the artifact.
:::
<!-- prettier-ignore-end -->

#### Building the image yourself

You need git to clone the Gillian repository :

```bash
git clone [insert url] Gillian
cd Gillian/.docker
```

Then simply build the docker image :

```bash
docker build -t gillian .
```

This will take a while, because it will install esy, copying the repo and build everything.

#### Pulling the image from Docker Hub

Simply run

```bash
docker pull gillian:[tag]
```

with `[tag]` replaced with the appropriate tag. If you do not know, use `latest` (`gillian:latest`).

### Running the container.

Once the image is built, run:

```bash
docker run -it gillian
```

This will start the container and give you access through a `zsh` shell.

<!-- prettier-ignore-start -->
:::warning
The docker container is not persistent and does not mount any persistent volume. Once you exit the container, all changes will be lost.
:::
<!-- prettier-ignore-end -->

### What it contains

The docker container contains :

- The Gillian repository in `/app/Gillian`
- Our fork of `Test262` in `/app/test262`

## Testing your setup

Once the project is built on your machine, or that you are inside the docker container, try running:

```bash
esy x gillian-js verify Gillian-JS/Examples/JaVerT/BST.js --silent
```

which should yield:

```logs
Obtaining specs to verify.
Obtained 5 symbolic tests
Running symbolic tests: 0.080211
Verifying one spec of procedure makeNode... Success
Verifying one spec of procedure find... Success
Verifying one spec of procedure findMin... Success
Verifying one spec of procedure remove... Success
Verifying one spec of procedure insert... Success
All specs succeeded: [Time]
```

You can also try running:

```bash
esy x gillian-c bulk-exec Gillian-C/examples/concrete
```

which should yield

```logs
Registering tests...
Running 1 test suite
 PASS  .

Test Suites: 0 failed, 1 passed, 1 total
Tests:       0 failed, 6 passed, 6 total
Time:        [Time]
```
