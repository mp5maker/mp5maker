## Typescript

1. type vs interface

- Both can describe object shapes

```typescript
interface User {
  id: number;
  name: string;
}

type User {
  id: number;
  name: string;
}
```

- interfaces are extendable

```typescript
interface Admin extends User {
  permissions: string[];
}
```

- types are more flexible for composing types

```typescript
type Status = "active" | "inactive";

type Admin = User & {
  permissions: string[];
}
```

- Interfaces are mainly useful for defining and extending object contracts, while type aliases are
  - more flexible and can represent unions, intersections, primitives, tuples, and other type compositions

- Both can describe object shapes. I prefer interface for object contracts and extension, while type is more flexible when I need unions, intersections, tuples, or more complex type composition.

2. Union Types

- A union means one of several possible types.

```typescript
let id: string | number;

id = "abc";
id = 123
```

```typescript
type Status = "loading" | "success" | "error";
let status: Status = "loading";

status = "success"; // ✅
status = "failed";  // ❌
```

3. Intersection Types

```typescript
type User = {
  name: string
};

type Employee - {
  employeeId: number;
}

type EmployeeUser = User & Employee;

const user: EmployeeUser = {
  name: "Photon",
  employeeId: 123
};
```

4. Generics
  - It allows use to write reusuable code while preserving type information

```typescript
function identity<T>(value: T) {
  return value
}

const name = identity("Photon");
//    ^ string

const age = identity(30);
//    ^ number

interface ApiResponse<T> {
  data: T;
  success: boolean;
}

interface User {
  id: number;
  name: string;
}

const response: ApiResponse<User> = {
  data: {
    id: 1,
    name: "Photon"
  },
  success: true
};
```

5. Type Narrowing

```typescript
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed());
  }
}
```

6. Type Guards

```typescript
interface User {
  name: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value
  );
}
```

7. Discriminated Unions

- Typescript automatically knows which properties exist in each case
- This is particularly useful
  - Redux Actions
  - API States
  - UI States
  - Event Handling

```typescript
type Result =
  | { type: "success"; data: string }
  | { type: "error"; message: string }
  | { type: "loading" };

function handleResult(result: Result) {
  switch (result.type) {
    case "success":
      console.log(result.data);
      break;

    case "error":
      console.log(result.message);
      break;

    case "loading":
      console.log("Loading...");
  }
}
```

8. Partial

- Makes everything partial

```typescript
type User = {
  name: string;
  age: number;
};

type UpdateUser = Partial<User>;

// {
//   name?: string;
//   age?: number;
// }
```


9. Pick

- Select Specific Properties

```typescript
type UserPreview = Pick<User, "name">;

// {
//   name: string;
// }
```


10. Omit

- Remove Properties


```typescript
type PublicUser = Omit<User, "age">;

// {
//   name: string;
// }
```

11. Record

- Creates an object type with known key/value type

```typescript
type UserRoles = Record<string, string>;

const roles: UserRoles = {
  photon: "admin",
  john: "user"
};


type Status = "loading" | "success" | "error";
type StatusMessages = Record<Status, string>;
```

12. Required

- Make everything required

```typescript
type Config = {
  host?: string;
  port?: number;
};

type RequiredConfig = Required<Config>;
// Now both properties are mandatory
```

13. `strict` mode

- It enables a collection of stronger type-checking options

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

- "strictNullChecks": true
  - dont allow variables to be null
  - strictNullChecks → null/undefined are handled explicitly
  - noImplicitAny → prevents accidental any
  - strictFunctionTypes → stricter function parameter checking
  - strictPropertyInitialization → class properties must be properly initialized
  - noImplicitThis → catches unsafe this usage