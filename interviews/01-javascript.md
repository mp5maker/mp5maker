## Javascript Fundamentals

1. Execution Context, Scope, Lexical Environment, Closures

- Execution Context
  - It is an execution is the environment in which Javascript Code runs
    - Global execution context
    - Function execution context
    - Eval context

- Global Execution Context
  - This is a base context, Any code not wrapped inside a function or module belongs here. It sets up the global scope

```javascript
// Running in global execution context
const globalUsername = "Alice";

function displayUser() {
  // This is defined globally
  console.log(globalUsername);
}

// In a browser environment, "this" points to the global window object
console.log(this === window);
```

- Function Execution Context
  - A brand new context is spawned only when a function is called, not when it is defined. Each invocation receives its own temporary workspacke on the call stack

```javascript
function caclulateTotal(price, tax) {
  // -- New Function Execution Context Created Here ---
  // It creates an implicit 'arguments' object containing [price, tax]
  const total = price + tax;
  return total;
  // -- context Destroyed and popped off call stack here
}

calculateTotal(100, 15);
calculateTotal(50, 5);
```

- Eval Execution Context
  - This context executes code passed inside a string literal to the eval() function. It is treated as rarely relevant because it is unsafe, bad for performance optimizations.

```javascript
// Not strict Mode
eval("var dynamicValue = 20; console.log(staticValue + dynamicValue);");
console.log(dynamicValue); // 20 (leaked out to global/parent context)

("use strict");
eval("var isolatedValue = 40;");
// console.log(isolatedValue); // ReferenceError: isolatedValue is not defined
```

2. Scope

- It determines where a variable can be accessed
  - Global Scope
    - variables declared outside any function or block
    - accessible from absolutely anwhere in our script
  - Function Scope
    - variables declared inside a function
    - accessible only within that specific function
    - created using `var`, `let` or `const`
      - var is function scoped and its declaration is hoisted and initialized with undefined
      - let, const are block scoped, remain in temporal dead zone
  - Block Scope
    - variables declared inside curly braces `{}`
    - accessible only inside those specific braces.
    - created strictly using `let` and `const`
  - Lexical Scope (JavaScript)
    - Scope is based on location at compile time.
  - Dynamic Scope (Rare)
    - Scope is based on the call stack at runtime.

```javascript
const globalVar = "I am everywhere"; // Global Scope

function myFunction() {
  const functionVar = "I am only in this function"; // Function Scope

  if (true) {
    const blockVar = "I am trapped in this block"; // Block Scope
    console.log(globalVar); // ✅ Works (looks outward)
    console.log(functionVar); // ✅ Works (looks outward)
  }

  console.log(blockVar); // ❌ Error! (cannot look inside the block)
}

function outer() {
  const candy = "Chocolate";

  function inner() {
    // Looks outward to its physical parent (outer)
    console.log(candy);
  }

  return inner;
}

const eatCandy = outer();
eatCandy(); // ✅ Prints "Chocolate"
```

3. Closure

- A closure happens when a function remembers variables from its outer scope even after the outer function has finished
- It allows a function to retain access to variables from its lexical scope after the outer function has finished.
- Commonly used: data encapsulation, callbacks, event handlers, function factories

```javascript
function counter() {
  let count = 0;
  return () => ++count;
}

const increment = counter();

increment(); // 1
increment(); // 2
increment(); // 3
```

4. var, let, const & hoisting

|           | `var`    | `let` | `const` |
| --------- | -------- | ----- | ------- |
| Scope     | Function | Block | Block   |
| Reassign  | ✅       | ✅    | ❌      |
| Redeclare | ✅       | ❌    | ❌      |
| Hoisted   | Yes      | Yes\* | Yes\*   |

- Hoisting
  - It is javascript's default behaviour of moving declarations to the top of their current scope before code execution
  - It is the browser scanning code for variable declarations before running a single line

```javascript
console.log(a); // undefined
var a = 10;

console.log(b); // ReferenceError
let b = 10;
```

5. this, bind, call, apply

- this
  - It generally referes to the object associated with how a function is called

```javascript
const user = {
  name: "Photon",
  greet() {
    console.log(this.name);
  },
};

user.greet();
```

- call
  - It call immediately with a specific this

```javascript
function greet(city) {
  console.log(this.name, city);
}

greet.call({ name: "Photon" }, "Dhaka");
```

- apply
  - Same as call but arguments are in a array

```javascript
function greet(city) {
  console.log(this.name, city);
}

greet.call({ name: "Photon" }, ["Dhaka"]);
```

- Bind
  - It returns a new function

```javascript
const fn = greet.bind({ name: "Photon" });
fn("Dhaka");
```

- Arrow Function
  - It do not have their own `this`
  - They don't create their own `this`

```javascript
const user = {
  name: "Photon",
  greet() {
    const fn = () => {
      console.log(this.name);
    };

    fn();
  },
};
```

6. Prototype Chain & Classes

- Javascript uses prototypal inheritance
- JavaScript is fundamentally prototype-based. class provides syntactic sugar for working with prototypes and inheritance.

```javascript
const user = {
  greet() {
    console.log("hello");
  },
};

const admin = Object.create(user);
admin.greet();

console.log(admin.hasOwnProperty("greet")); // ❌ False (It doesn't contain it)
console.log(user.hasOwnProperty("greet")); // ✅ True (User actually contains it)
```

- Classes

- Classes are essentially a cleaner syntax over javascript's prototype system

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello ${this.name}`;
  }
}

const user = new User("Photon");
```

7. Promises & async/await

```javascript
const promise = fetch("/api/users");

promise
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
```

- async/await cleaner syntax for promises

```javascript
async function getUsers() {
  try {
    const res = await fetch("/api/users");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
```

- parallel operation
  - Promise.all()
    - Fails when one Promise rejects
  - Promise.allSettled()
    - waits for everything and fives us each result

```javascript
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

8. Event Loop, Call Stack, Queues

- Javascript executes synchronous code using the call stack
- Async callbacks in queues

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");

// A
// D
// C
// B
```

- Why?
  - Call Stack
  - Synchronous code
  - Microtask Queue => Promise callbacks
  - Task Queue -> setTimeout callbacks
- Which runs first: Promise or setTimeout(..., 0)?
  - Usually the Promise callback, because microtasks are processed before the next task.

9. Debouncing & Throttling

- Debounce
  - Execute after the user stops triggering the event

```javascript
function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const search = debounce(queryUsers, 500);
```

- Throttle
  - Execute at most once during a period
  - Useful for: scroll, mouse movement, resize
  - limit executing frequency

```javascript
function throttle(fn, delay) {
  let waiting = false;

  return (...args) => {
    if (waiting) return;

    fn(...args);
    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, delay);
  };
}
```

10. ES Modules

- Modern javascript uses modules
- Why use modules
  - encapsulation
  - dependency management
  - code organization
  - avoiding global variables
  - tree shaking/build optimization

```javascript
// user.js
export function getUser() {
  // ...
}

// app.js
import { getUser } from "./user.js";
export default User;

import User from "./User.js";
```

11. Destricturing

- Extract values easily

```javascript
const user = {
  name: "Photon",
  age: 30,
};

const { name, age } = user;

const numbers = [10, 20];
const [first, second] = numbers;
```

12. Spread & Rest

- It use the same `...` syntax but do different things
- Spread -> Expands

```javascript
const a = [1, 2];
const b = [...a, 3];

console.log(b);
// [1, 2, 3]

const updatedUser = {
  ...user,
  name: "Photon Khan",
};
```

- Rest -> collects

```javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3);
```

13. Higher Order Functions

- A function that takes another function as an argument or returns a function
- They receive a function as an argument

```javascript
function calculate(a, b, operation) {
  return operation(a, b);
}

calculate(2, 3, (a, b) => a + b);

// users.map(...)
// users.filter(...)
// users.reduce(...)
// users.forEach(...)
```
