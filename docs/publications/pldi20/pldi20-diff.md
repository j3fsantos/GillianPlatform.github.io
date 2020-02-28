---
id: pldi20-diff
title: "Differences between Paper and Implementation"
---

:::info
The information contained in the section is valid for the version Gillian that is tagged `pldi-20`. The implementation may change in the future and implementation might get further away or closer to what the paper says in the future.
:::

This page describes how **Petar** will write this sentence himself.


## The GIL Syntax

The GIL Syntax in the implementation are slightly different from the one described in the paper. 

$$

$$



## Allocators


<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
  integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
  crossOrigin="anonymous"
/>

In the paper allocators have the following definition:

> An allocator $AL \in \mathbb{A}\mathbb{L}$ is a triple $\langle|AL|, \mathsf Y, \mathsf{alloc}\rangle$, consisting of: **(1)** a set $|AL|\ni \xi$ of allocation records; **(2)** a set $Y$ of all values that are allowed to be allocated; and **(3)** an allocation function:
>$$
>\mathsf{alloc}: |AL| \rightarrow \mathbb{N} \rightarrow \wp(\mathsf Y) \rightharpoonup |AL|\times V
>$$
>pretty-printed as $\xi.\mathsf{alloc}(j)\rightharpoonup_{\mathsf Y}(\xi', y)$, which takes an allocation record $\xi$, a, allocation site $j$, and an allocation range $Y \subseteq \mathsf Y$, and returns a fresh value $y \in Y$, together with the appropriately updated allocation record $\xi'$.
>
>Intuitively, an allocation record maintains information about already allocated values. This apporach is complementary to [the free set approach](https://doi.org/10.1007/978-3-540-78499-9_15), where information is maintained about values that can still be allocated. An allocation site $j$ is the program point associated with either the $\mathsf{uSym}_j$ or the $\mathsf{iSym}_j$ command.

This could be interpreted in terms of OCaml module signature as:

```ocaml
module type Allocator = sig
  type t    (** Type of allocation records     *)
  type us_t (** Type of uninterpreted symbols **)
  type is_t (**  Type of interpreted symbols   *)

  val alloc_us : t -> int -> t * us_t
  val alloc_is : t -> int -> t * is_t
end
```

However, for efficiency, we chose this implementation:

```ocaml
(* Allocator.ml *)
module type S = sig
  type t                   (** Type of value to allocate *)

  val alloc : unit -> t    (** Allocation function *)
  val dealloc : t -> unit  (** Deallocation function *)
  val eq : t -> t -> bool  (** Equality of values to allocate *)
  val reset : unit -> unit (** Reset this allocator *)
end
```
The `reset` function is useful for bulk-testing. When running a new test, every allocator is reset.

The Abstract location allocator (in `ALoc.ml`), which corresponds to uninterpreted symbols, are then initiated like this:
```ocaml
include Allocators.Make_with_prefix
          (Basic ())
          (struct
            let prefix = Names.aloc_prefix
          end)
```

Where `Make_with_prefix` is a functor that takes:
- An abstract Allocator `AL` that produces values which can be stringified.
- A string prefix

and it returns an Allocator that allocates strings of the form `PREFIX_A` where `PREFIX` is the given prefix and `A` is a stringification of the allocated by `AL`. 

In this case, as the `AL` parameter, we use `Basic ()` which instantiates an abstract allocator module that internally just allocates integers.

