---
id: cstest
title: 'Gillian-C: Symbolic Testing'
---

## Writing Symbolic Tests

The whole-program symbolic testing aspect of Gillian-C works in a close way to [Klee](https://klee.github.io)'s.

### Declaring Symbolic Variables

In order to declare symbolic variables, we hijack the `__builtin_annot_intval` function of CompCert. An symbolic integer is declared in the following way:

```c
int a = __builtin_annot_intval("symb_int", a)
```

As Gillian-C is in its very early stage, it is impossible to declare variables that have undefined size in memory.

It is possible to declare a symbolic string of fixed size by declaring all of its components one by one. For example, for a string that contains one character:
```c
int a = __builtin_annot_intval("symb_int", a);
ASSUME(-128 <= a );ASSUME( a <= 127);
char c_a = (char) a;
char str_a[] = { c_a, '\0' };
```

### Assumptions and Assertions

For any `C` boolean expression `e`, it is possible to write:

```c
ASSUME(e);
ASSERT(e);
```

The expression `e` is compiled to commands (since C expressions can have side-effects but GIL expressions cannot).
Then, a final GIL expression will contain a <q>serialised C integer</q> (since `C` booleans are actually integers that have value 0 or 1).
A serialized C integer is a list of the form `{{ "int", x }}` where `x` is a GIL number.
`ASSUME` will call the internal GIL `assume` in the form `assume(e = {{ "int", 1 }})` which means <q>check that the obtained boolean expression is True</q>, otherwise, cut the branch.
`ASSERT` does the same as assume but calls the internal GIL `assert` instead.

As opposed to [Gillian-JS](../js/stest.md#assumptions-and-assertions), we use C expressions directly, and not custom expressions. This benefits is that one does not have to learn a new syntax for writing tests. However, this causes the execution to branch a lot for. `ASSUME` will then cut any branch that we do not want. In Gillian-JS, given the complex control flow of JavaScript, there is a lot more branching happening, which can become quite difficult to handle. Also, in JavaScript, the very complex semantics of expressions can lead to behaviours that are not desired by the used, and providing a simpler expression syntax is more straightforward.


## Symbolic Testing of Collection-C

### Test results

We symbolically test [Collection-C](https://github.com/srdja/Collections-C), a real-world C data-structure library for C.
The results are presented in the table below, with each row containing:

- The name of the folder being tested, which also indicates the data structure in question
- The number of tests
- The total number of GIL commands executed during these tests
- The total testing time (in seconds)

| Data Structure  | Tests | GIL Commands | Time (s) |
| :-------------: | :---: | :----------: | :------: |
|    **array**    |       |              |          |
|   **dequeue**   |       |              |          |
|    **list**     |       |              |          |
|   **pqueue**    |       |              |          |
| **ring_buffer** |       |              |          |
|    **slist**    |       |              |          |
|    **stack**    |       |              |          |
|   **treeset**   |       |              |          |
|  **treetable**  |       |              |          |
|    **Total**    | **x** |    **x**     |  **x**   |


### Fixes

Symbolically testing Collection-C let to the following bug-fixing pull requests. They fix previously unknown bugs and usage of undefined behaviours:
- [Fix buffer overflow](https://github.com/srdja/Collections-C/pull/119) (bug)
- [Remove the usage of cc_comp_ptr](https://github.com/srdja/Collections-C/pull/122) (undefined behaviour)
- [Test coincidentally passing while they should not](https://github.com/srdja/Collections-C/pull/123) (bugs and undefined behaviours)
- [Fix overallocation](https://github.com/srdja/Collections-C/pull/125) (bug)
- [Fix hashing function](https://github.com/srdja/Collections-C/pull/126) (performance-reducing bug)



### Reproducing the Results
For license reason, we do not include the Collection-C code in the Gillian repository.
There is an [external repository](https://github.com/giltho/collection-c-for-gillian) that contains the Collection-C code adapted to testing in Gillian-C and Klee.

In order to clone it, simply run, from the Gillian folder:
```bash
cd ..
git clone git@github.com:giltho/collection-c-for-gillian.git collection-c
cd Gillian
```

There are two ways of launching the tests:
- Using the `bulk-wpst` command of Gillian-C which has a nicer output (using Rely), but cannot run the tests in parallel.
- Using a bash script that will call `gillian-c wpst` as many times as there are files to test, but supports parallel mode (this is the one we used for measures).

#### Using bulk-wpst

From the Gillian folder run:

```bash
esy x gillian-c bulk-wpst ../collection-c/for-gillian
```

You will see every test suites executing one by one. Two tests will fail, this is intended. They represent two of the bugs we've found and are explained [here](#bug-tests).


#### Using the bash script

From the Gillian folder, for each folder you want to test, use:
```bash
Gillian-C/scripts/testFolder.sh ../collection-c/for-gillian/folder
```

For example, to run the test suite related to singly-linked lists, run:
```bash
Gillian-C/scripts/testFolder.sh ../collection-c/for-gillian/slist
```



### The array_test_remove.c buffer overflow bug

This test corresponds to this pull request: [Fix buffer overflow](https://github.com/srdja/Collections-C/pull/119).
It is particularly interesting: the original test suite did not catch it. We thought that a concrete test with the right values would catch it, but it didn't. The reason is that it overflowed but did not fail. It is therefore a *security issue*. However, our symbolic memory model cannot overflow, and the bug was caught.


### The list_test_zipIterAdd.c flawed test

This test is also interesting but for different reasons. The code it is testing (the `list_zip_iter_add` function) does not contain any bug.
However, the test itself did contain a bug but still passed. Here is why:

The test added two elements (`"h"` and `"i"`) in two separate lists at the index 2. It then tested that the elements actually appeared at the second index of their respective lists, in the following way:

```c
list_index_of(list1, "h", zero_if_ptr_eq, &index);
CHECK_EQUAL_C_INT(2, index);

list_index_of(list1, "i", zero_if_ptr_eq, &index);
CHECK_EQUAL_C_INT(2, index);
```

However, note that both tests are executed on `list1`! What happened then is that `list_index_of` was not finding `"i"` in `list1` because it wasn't there, and therefore did not modify `index`. Since the first check was correct, the value of `index` was still `2` and the test passed anyway.

Our symbolic tests however, use symbolic 1-character strings, and assume **the bare minimum about the input values** to make them pass, in order to explore as many possible paths as possible.

Here, we replaced every one-character strings `"X"` with one-character symbolic string `str_X`. For the test to pass, it should be *enough* for `str_h` to be different from every element in `list1` and for `str_i` to be different from every element in `list2`. And this is exactly what we assumed. However, we never assume that `str_i` has to be different from every element in `list1` because it is not necessary for the test to pass.

However, here, the equality between every element of `list1` and `str_i` is tested. There is no indication as to the result of this test, so the execution branches. Therefore, there is a path created where `list_index_of(list1, str_i, zero_if_ptr_eq, &index)` will assign `0` to index, and the test will fail.

This shows how symbolic testing helps writing *more robust* tests.

### Detailed Per-Folder Breakdown: Collection-C

|     **array**     |  add  | addAt2 | contains | deepCopy | getAt | indexOf | iterAdd | iterRemove | iterReplace | reduce | remove | removeAll | removeAt | reverse | shallowCopy | subarray | zipIterAdd | zipIterNext | zipIterRemove | zipIterReplace | **Total** |
| :---------------: | :---: | :----: | :------: | :------: | :---: | :-----: | :-----: | :--------: | :---------: | :----: | :----: | :-------: | :------: | :-----: | :---------: | :------: | :--------: | :---------: | :-----------: | :------------: | :-------: |
| **GIL Commands**  |       |        |          |          |       |         |         |            |             |        |        |           |          |         |             |          |            |             |               |                |           |
|   **Time (s)**    |       |        |          |          |       |         |         |            |             |        |        |           |          |         |             |          |            |             |               |                |           |
| **Klee Time (s)** |       |        |          |          |       |         |         |            |             |        |        |           |          |         |             |          |            |             |               |                |           |


|    **dequeue**    | addAt1 | addAt2 | addAt3 | addAt4 | addAt5 | addFirst | addLast | bufferExpansion | capacity | contains | copyDeep | copyShallow | filter1 | filter2 | filter3 | filterMut1 | filterMut2 | filterMut3 | getAt | getFirst | getLast | iterAdd | iterNext | iterRemove | removeAll | removeFirst | removeLast | reverse | size  | trimCapacity | zipIterAdd | zipIterNext | zipIterRemove | zipIterReplace | **Total** |
| :---------------: | :----: | :----: | :----: | :----: | :----: | :------: | :-----: | :-------------: | :------: | :------: | :------: | :---------: | :-----: | :-----: | :-----: | :--------: | :--------: | :--------: | :---: | :------: | :-----: | :-----: | :------: | :--------: | :-------: | :---------: | :--------: | :-----: | :---: | :----------: | :--------: | :---------: | :-----------: | :------------: | :-------: |
| **GIL Commands**  |        |        |        |        |        |          |         |                 |          |          |          |             |         |         |         |            |            |            |       |          |         |         |          |            |           |             |            |         |       |              |            |             |               |                |           |
|    **Time(s)**    |        |        |        |        |        |          |         |                 |          |          |          |             |         |         |         |            |            |            |       |          |         |         |          |            |           |             |            |         |       |              |            |             |               |                |           |
| **Klee Time (s)** |        |        |        |        |        |          |         |                 |          |          |          |             |         |         |         |            |            |            |       |          |         |         |          |            |           |             |            |         |       |              |            |             |               |                |           |

|     **list**      |  add  | addAll | addAllAt | addAt | addFirst | addLast | contains | copyDeep | copyShallow | filter1 | filter2 | getAt | getLast | indexOf | iterAdd | iterDescAdd | iterDescRemove | iterRemove | mutFilter1 | mutFilter2 |  new  | remove | removeAll | removeAt | removeFirst | removeLast | replaceAt | reverse | splice | spliceAt | sublist | toArray | zipIterAdd | zipIterNext | zipIterRemove | zipIterReplace | **Total** |
| :---------------: | :---: | :----: | :------: | :---: | :------: | :-----: | :------: | :------: | :---------: | :-----: | :-----: | :---: | :-----: | :-----: | :-----: | :---------: | :------------: | :--------: | :--------: | :--------: | :---: | :----: | :-------: | :------: | :---------: | :--------: | :-------: | :-----: | :----: | :------: | :-----: | :-----: | :--------: | :---------: | :-----------: | :------------: | :-------: |
| **GIL Commands**  |       |        |          |       |          |         |          |          |             |         |         |       |         |         |         |             |                |            |            |            |       |        |           |          |             |            |           |         |        |          |         |         |            |             |               |                |     0     |
|    **Time(s)**    |       |        |          |       |          |         |          |          |             |         |         |       |         |         |         |             |                |            |            |            |       |        |           |          |             |            |           |         |        |          |         |         |            |             |               |                |     0     |
| **Klee Time (s)** |       |        |          |       |          |         |          |          |             |         |         |       |         |         |         |             |                |            |            |            |       |        |           |          |             |            |           |         |        |          |         |         |            |             |               |                |     0     |

|    **pqueue**     | enqueue |  pop  | **Total** |
| :---------------: | :-----: | :---: | :-------: |
| **GIL Commands**  |         |       |     0     |
|    **Time(s)**    |         |       |     0     |
| **Klee Time (s)** |         |       |     0     |

|     **queue**     | enqueue | iter  | poll  | zipIterNext | **Total** |
| :---------------: | :-----: | :---: | :---: | :---------: | :-------: |
| **GIL Commands**  |         |       |       |             |     0     |
|    **Time(s)**    |         |       |       |             |     0     |
| **Klee Time (s)** |         |       |       |             |     0     |

|  **ring_buffer**  | capacity | enqueue | dequeue | **Total** |
| :---------------: | :------: | :-----: | :-----: | :-------: |
| **GIL Commands**  |          |         |         |     0     |
|    **Time(s)**    |          |         |         |     0     |
| **Klee Time (s)** |          |         |         |     0     |

|     **slist**     |  add  | addAll | addAllAt | addAt | addFirst | addLast | contains | copyDeep | copyShallow | filter1 | filter2 | filter3 | filterMut1 | filterMut2 | filterMut3 |  get  | getFirst | getLast | indexOf | iterAdd | iterRemove |  new  | remove | removeAll | removeAt | removeFirst | removeLast | replaceAt | reverse | splice | spliceAt | sublist | toArray | zipIterAdd | zipIterNext | zipIterRemove | zipIterReplace | **Total** |
| :---------------: | :---: | :----: | :------: | :---: | :------: | :-----: | :------: | :------: | :---------: | :-----: | :-----: | :-----: | :--------: | :--------: | :--------: | :---: | :------: | :-----: | :-----: | :-----: | :--------: | :---: | :----: | :-------: | :------: | :---------: | :--------: | :-------: | :-----: | :----: | :------: | :-----: | :-----: | :--------: | :---------: | :-----------: | :------------: | :-------: |
| **GIL Commands**  |       |        |          |       |          |         |          |          |             |         |         |         |            |            |            |       |          |         |         |         |            |       |        |           |          |             |            |           |         |        |          |         |         |            |             |               |                |     0     |
|    **Time(s)**    |       |        |          |       |          |         |          |          |             |         |         |         |            |            |            |       |          |         |         |         |            |       |        |           |          |             |            |           |         |        |          |         |         |            |             |               |                |     0     |
| **Klee Time (s)** |       |        |          |       |          |         |          |          |             |         |         |         |            |            |            |       |          |         |         |         |            |       |        |           |          |             |            |           |         |        |          |         |         |            |             |               |                |     0     |

|     **stack**     |  pop  | push  | **Total** |
| :---------------: | :---: | :---: | :-------: |
| **GIL Commands**  |       |       |     0     |
|    **Time(s)**    |       |       |     0     |
| **Klee Time (s)** |       |       |     0     |

|    **treeset**    |  add  | iterNext | iterRemove | remove | removeAll | size  | **Total** |
| :---------------: | :---: | :------: | :--------: | :----: | :-------: | :---: | :-------: |
| **GIL Commands**  |       |          |            |        |           |       |     0     |
|    **Time(s)**    |       |          |            |        |           |       |     0     |
| **Klee Time (s)** |       |          |            |        |           |       |     0     |

|   **treetable**   |  add  |  get  | getFirst | getGreaterThan | getLast | getLessThan | iterNext | iterRemove | remove | removeAll | removeFirst | removeLast | size  | **Total** |
| :---------------: | :---: | :---: | :------: | :------------: | :-----: | :---------: | :------: | :--------: | :----: | :-------: | :---------: | :--------: | :---: | :-------: |
| **GIL Commands**  |       |       |          |                |         |             |          |            |        |           |             |            |       |     0     |
|    **Time(s)**    |       |       |          |                |         |             |          |            |        |           |             |            |       |     0     |
| **Klee Time (s)** |       |       |          |                |         |             |          |            |        |           |             |            |       |     0     |