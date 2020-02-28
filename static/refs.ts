const jose = "José Fragoso Santos";
const petar = "Petar Maksimović";
const gaby = "Gabriela Sampaio";
const sacha = "Sacha-Élie Ayoun";
const philippa = "Philippa Gardner";
const thomas = "Thomas Wood";
const daiva = "Daiva Naudžiūnienė";


interface Identifier {
  name: string;
  link: string
};


interface Publication {
  title: string;
  authors: string[];
  abstract: string;
  venue: string;
  date: string | number;
  identifiers: {
    [key: string]: Identifier;
  };
}

export const javert : Publication = {
  title: "JaVerT: JavaScript Verification Toolchain",
  authors: [jose, petar, daiva, thomas, philippa ],
  abstract: "The dynamic nature of JavaScript and its complex semantics make it a difficult target for logic-based verification. We introduce JaVerT, a semi-automatic JavaScript Verification Toolchain, based on separation logic and aimed at the specialist developer wanting rich, mechanically verified specifications of critical JavaScript code. To specify JavaScript programs, we design abstractions that capture its key heap structures (for example, prototype chains and function closures), allowing the developer to write clear and succinct specifications with minimal knowledge of the JavaScript internals. To verify JavaScript programs, we develop JaVerT, a verification pipeline consisting of: JS-2-JSIL, a well-tested compiler from JavaScript to JSIL, an intermediate goto language capturing the fundamental dynamic features of JavaScript; JSIL Verify, a semi-automatic verification tool based on a sound JSIL separation logic; and verified axiomatic specifications of the JavaScript internal functions. Using JaVerT, we verify functional correctness properties of: data-structure libraries (key-value map, priority queue) written in an object-oriented style; operations on data structures such as binary search trees (BSTs) and lists; examples illustrating function closures; and test cases from the official ECMAScript test suite. The verification times suggest that reasoning about larger, more complex code using JaVerT is feasible.",
  venue: "PACMPL, vol. 2(POPL), pp. 50:1–50:33",
  date: "2019",
  identifiers: {
    "DOI": {
      name: "doi:10.1145/3158138",
      link: "http://dx.doi.org/10.1145/3158138" 
    }
  }
}